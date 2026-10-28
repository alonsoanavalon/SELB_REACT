import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { get, set } from 'idb-keyval';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Instruction from '../components/Instruction';
import CodingFields from '../components/WallyOriginal/CodingFields';
import {
    WALLY_ORIGINAL_VARIANTS,
    collectOpenAnswers,
    sanitizeAnswerText,
    toSeconds,
} from '../services/wallyOriginal';

// INSTR-002 — Toma de Wally Niños / Wally Niñas. Cada ítem tiene dos slides:
// 1) solo el enunciado y la imagen;
// 2) enunciado e imagen + cronómetro, respuesta abierta y codificación (Fase C).
// El cronómetro lo controla solo la evaluadora (Iniciar/Detener); si queda
// corriendo, se detiene al salir del slide de respuesta.

const CATALOG_KEY = 'coding/wally-original/catalog';
const EMPTY_CODING = { classification: null, categories: [] };

const styles = {
    item: { maxWidth: '900px', margin: '0 auto', padding: '0 1rem', border: 0 },
    image: { display: 'block', maxWidth: '100%', maxHeight: '38vh', margin: '0.5rem auto', objectFit: 'contain' },
    responseImage: { display: 'block', maxWidth: '100%', maxHeight: '20vh', margin: '0.25rem auto', objectFit: 'contain' },
    stopwatch: { display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', margin: '0.5rem 0' },
    seconds: { fontVariantNumeric: 'tabular-nums', fontSize: '1.4rem', minWidth: '5rem', textAlign: 'center' },
    answer: { width: '100%', fontSize: '1.1rem' },
    warning: { color: '#b45309', marginTop: '0.25rem' },
    coding: { textAlign: 'start', maxHeight: '32vh', overflowY: 'auto', marginTop: '0.5rem' },
};

const isCatalog = (value) => Boolean(value && Array.isArray(value.categories));

// El catálogo se precarga al abrir SELB (App.js). Si no está en la tablet y hay
// conexión, se descarga aquí para no depender de un reinicio de la app.
async function loadCatalog() {
    const cached = await get(CATALOG_KEY);
    if (isCatalog(cached)) return cached;
    if (!navigator.onLine) return null;
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/${CATALOG_KEY}`);
        if (!isCatalog(response.data)) return null;
        await set(CATALOG_KEY, response.data);
        return response.data;
    } catch (_error) {
        return null;
    }
}

const pictureOf = (item, folder) => item.picture || `/instruments/wallyOriginal/${folder}/${item.num}.jpg`;

function SituationSlide({ item, folder }) {
    return (
        <fieldset className="page-item" style={styles.item} aria-label={`Situación ítem ${item.num}`}>
            <h3 className="main-description">{item.title}</h3>
            <img src={pictureOf(item, folder)} alt={`Situación ${item.num}`} style={styles.image} />
        </fieldset>
    );
}

function ResponseSlide({ item, instrumentId, folder, isActive, answer, onAnswerChange, coding, catalog, onCodingChange }) {
    const [removedCharacters, setRemovedCharacters] = useState(false);
    const [elapsed, setElapsed] = useState(0);
    const [startedAt, setStartedAt] = useState(null);
    const [, setTick] = useState(0);

    useEffect(() => {
        if (startedAt === null) return undefined;
        const interval = setInterval(() => setTick((tick) => tick + 1), 200);
        return () => clearInterval(interval);
    }, [startedAt]);

    const running = startedAt !== null;
    const currentMs = running ? elapsed + (Date.now() - startedAt) : elapsed;
    const measured = running || elapsed > 0;

    const start = () => {
        if (!running) setStartedAt(Date.now());
    };
    const stop = () => {
        if (!running) return;
        setElapsed((value) => value + (Date.now() - startedAt));
        setStartedAt(null);
    };
    const reset = () => {
        setElapsed(0);
        setStartedAt(null);
    };

    // Si la evaluadora olvidó detenerlo, el cronómetro se detiene al cambiar de slide.
    const wasActive = useRef(isActive);
    useEffect(() => {
        if (wasActive.current && !isActive) stop();
        wasActive.current = isActive;
    });

    const onChange = (event) => {
        const { text, removed } = sanitizeAnswerText(event.target.value);
        onAnswerChange(text);
        setRemovedCharacters(removed);
    };

    const answerId = `wally-original-answer-${item.itemId}`;

    return (
        <fieldset className="page-item" style={styles.item} aria-label={`Respuesta ítem ${item.num}`}>
            <h3 className="main-description">{item.title}</h3>
            <img src={pictureOf(item, folder)} alt={`Situación ${item.num} (respuesta)`} style={styles.responseImage} />
            <form className="instrument-form" onSubmit={(event) => event.preventDefault()}>
                <input type="hidden" name="instrument" value={instrumentId} />
                <input type="hidden" name="key" value={item.itemId} />
                <input type="hidden" name="time" value={measured ? toSeconds(currentMs) : ''} />

                <div style={styles.stopwatch}>
                    <span style={styles.seconds} aria-live="polite">{(currentMs / 1000).toFixed(1)} s</span>
                    <button type="button" className="btn btn-success" onClick={start} disabled={running}>Iniciar</button>
                    <button type="button" className="btn btn-danger" onClick={stop} disabled={!running}>Detener</button>
                    <button type="button" className="btn btn-secondary" onClick={reset} disabled={!measured}>Reiniciar</button>
                </div>

                <label htmlFor={answerId}>Respuesta del niño o niña</label>
                <textarea
                    id={answerId}
                    name="answer"
                    rows={3}
                    maxLength={600}
                    value={answer}
                    onChange={onChange}
                    style={styles.answer}
                />
                {removedCharacters && (
                    <p role="alert" style={styles.warning}>Se quitaron caracteres no admitidos (por ejemplo, emojis).</p>
                )}
            </form>
            <form className="instrument-form" onSubmit={(event) => event.preventDefault()}>
                <input type="hidden" name="codingKey" value={item.itemId} />
                <input type="hidden" name="classification" value={coding.classification || ''} />
                <input type="hidden" name="categories" value={JSON.stringify(coding.categories)} />
            </form>
            <div style={styles.coding}>
                {catalog ? (
                    <CodingFields
                        itemId={item.itemId}
                        num={item.num}
                        coding={coding}
                        categories={catalog.categories}
                        onChange={onCodingChange}
                    />
                ) : (
                    <p style={styles.warning}>
                        El catálogo de codificación no está disponible en esta tablet. Puedes seguir con la toma;
                        la codificación se podrá hacer después desde Codificación, o conéctate a internet y vuelve a abrir SELB para descargarlo.
                    </p>
                )}
            </div>
        </fieldset>
    );
}

export default function WallyOriginal({ variant }) {
    const config = WALLY_ORIGINAL_VARIANTS[variant];
    const [items, setItems] = useState(null);
    const [catalog, setCatalog] = useState(null);
    const [answers, setAnswers] = useState({});
    const [codings, setCodings] = useState({});
    const [studentName, setStudentName] = useState('');
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        get('selectedStudentName').then((name) => setStudentName(name || ''));
        loadCatalog().then(setCatalog);
    }, []);

    useEffect(() => {
        get(`instrument/${config.instrumentId}`).then((cached) => {
            const list = Array.isArray(cached) ? cached : [];
            setItems([...list].sort((a, b) => Number(a.num) - Number(b.num)));
        });
    }, [config.instrumentId]);

    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };
    }, []);

    if (items === null) return null;

    if (items.length === 0) {
        return (
            <div className="page-item" style={styles.item}>
                <h3 className="main-description">{config.name}</h3>
                <p>No se encontraron los ítems de este instrumento en la tablet. Conéctate a internet y vuelve a abrir SELB para descargarlos.</p>
            </div>
        );
    }

    // Orden de slides: asentimiento (0), instrucción (1) y dos por ítem.
    const slides = [];
    items.forEach((item, index) => {
        slides.push(
            <SwiperSlide key={`${item.itemId}-situation`}>
                <SituationSlide item={item} folder={config.folder} />
            </SwiperSlide>
        );
        slides.push(
            <SwiperSlide key={`${item.itemId}-response`}>
                <ResponseSlide
                    item={item}
                    instrumentId={config.instrumentId}
                    folder={config.folder}
                    isActive={activeSlide === 2 + index * 2 + 1}
                    answer={answers[item.itemId] || ''}
                    onAnswerChange={(text) => setAnswers((state) => ({ ...state, [item.itemId]: text }))}
                    coding={codings[item.itemId] || EMPTY_CODING}
                    catalog={catalog}
                    onCodingChange={(value) => setCodings((state) => ({ ...state, [item.itemId]: value }))}
                />
            </SwiperSlide>
        );
    });

    return (
        <div style={{ overflow: 'hidden', height: '100%', paddingTop: '1.5rem' }}>
            <div className="aces-test">
                <Swiper
                    modules={[Navigation, A11y]}
                    slidesPerView={1}
                    navigation
                    spaceBetween={0}
                    allowTouchMove={false}
                    onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
                >
                    <SwiperSlide>
                        <Instruction title={config.name} instruction={config.assent} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Instruction instruction={config.instruction} />
                    </SwiperSlide>

                    {slides}

                    <SwiperSlide>
                        <Instruction
                            checkpoint={true}
                            instruction="Lo hiciste muy bien"
                            collectAnswers={collectOpenAnswers}
                        />
                    </SwiperSlide>
                </Swiper>
            </div>

            <p style={{ position: 'absolute', textAlign: 'start', left: '1rem', bottom: '-4rem', color: '#ddd', opacity: 0.6 }}>
                Estudiante: {studentName}
            </p>
        </div>
    );
}
