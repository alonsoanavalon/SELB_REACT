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
// 1) enunciado, imagen y cronómetro (lo ve el niño o la niña mientras responde);
// 2) enunciado e imagen + tiempo medido, respuesta abierta y codificación.
// El cronómetro lo controla solo la evaluadora (Iniciar/Detener/Reiniciar); si
// queda corriendo, se detiene al cambiar de slide. No se puede avanzar de un
// slide sin completarlo: tiempo en el 1; respuesta, clasificación y categoría en el 2.

const CATALOG_KEY = 'coding/wally-original/catalog';
const EMPTY_CODING = { classification: null, categories: [] };
const EMPTY_STOPWATCH = { elapsed: 0, startedAt: null };
const FIRST_ITEM_SLIDE = 2; // después del asentimiento y la instrucción

const styles = {
    item: { maxWidth: '900px', margin: '0 auto', padding: '0 1rem', border: 0 },
    image: { display: 'block', maxWidth: '100%', maxHeight: '38vh', margin: '0.5rem auto', objectFit: 'contain' },
    responseImage: { display: 'block', maxWidth: '100%', maxHeight: '16vh', margin: '0.25rem auto', objectFit: 'contain' },
    // Controles para tablet: botones grandes (btn-lg) y campos de 48 px o más.
    stopwatch: { display: 'flex', gap: '0.75rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', margin: '0.5rem 0' },
    seconds: { fontVariantNumeric: 'tabular-nums', fontSize: '1.6rem', minWidth: '5.5rem', textAlign: 'center' },
    time: { margin: '0.25rem 0', fontSize: '1.1rem' },
    answerForm: { width: '100%', maxWidth: '560px', alignItems: 'stretch' },
    // Sin el resaltado al pasar el dedo de .instrument-form label (no es una opción).
    answerLabel: { padding: '0.25rem 0', fontSize: '1.1rem', backgroundColor: 'transparent', color: 'inherit', cursor: 'default' },
    answer: { fontSize: '1.1rem', minHeight: '6rem' },
    warning: { color: '#b45309', marginTop: '0.25rem' },
    missing: { color: '#b42318', fontWeight: 600, marginTop: '0.5rem' },
    coding: { width: '100%', marginTop: '0.25rem' },
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

const elapsedMs = (watch) => (watch.startedAt === null ? watch.elapsed : watch.elapsed + (Date.now() - watch.startedAt));
const stopWatch = (watch) => (watch.startedAt === null ? watch : { elapsed: elapsedMs(watch), startedAt: null });
const isMeasured = (watch) => watch.startedAt !== null || watch.elapsed > 0;

function MissingFields({ missing }) {
    if (missing.length === 0) return null;
    return <p role="alert" style={styles.missing}>Para continuar falta: {missing.join(', ')}.</p>;
}

function Stopwatch({ watch, onChange }) {
    const [, setTick] = useState(0);
    const running = watch.startedAt !== null;

    useEffect(() => {
        if (!running) return undefined;
        const interval = setInterval(() => setTick((tick) => tick + 1), 200);
        return () => clearInterval(interval);
    }, [running]);

    return (
        <div style={styles.stopwatch}>
            <span style={styles.seconds} aria-live="polite">{toSeconds(elapsedMs(watch)).toFixed(1)} s</span>
            <button type="button" className="btn btn-lg btn-success" onClick={() => onChange({ ...watch, startedAt: Date.now() })} disabled={running}>Iniciar</button>
            <button type="button" className="btn btn-lg btn-danger" onClick={() => onChange(stopWatch(watch))} disabled={!running}>Detener</button>
            <button type="button" className="btn btn-lg btn-secondary" onClick={() => onChange(EMPTY_STOPWATCH)} disabled={!isMeasured(watch)}>Reiniciar</button>
        </div>
    );
}

function SituationSlide({ item, folder, watch, onWatchChange, missing }) {
    return (
        <fieldset className="page-item" style={styles.item} aria-label={`Situación ítem ${item.num}`}>
            <h3 className="main-description">{item.title}</h3>
            <img src={pictureOf(item, folder)} alt={`Situación ${item.num}`} style={styles.image} />
            <Stopwatch watch={watch} onChange={onWatchChange} />
            <MissingFields missing={missing} />
        </fieldset>
    );
}

function ResponseSlide({ item, instrumentId, folder, seconds, answer, onAnswerChange, coding, catalog, onCodingChange, missing }) {
    const [removedCharacters, setRemovedCharacters] = useState(false);

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
            <form className="instrument-form" style={styles.answerForm} onSubmit={(event) => event.preventDefault()}>
                <input type="hidden" name="instrument" value={instrumentId} />
                <input type="hidden" name="key" value={item.itemId} />
                <input type="hidden" name="time" value={seconds === null ? '' : seconds} />

                <p style={styles.time}>{seconds === null ? 'Tiempo: sin medir' : `Tiempo: ${seconds.toFixed(1)} s`}</p>

                <label htmlFor={answerId} style={styles.answerLabel}>Respuesta del niño o niña</label>
                <textarea
                    id={answerId}
                    name="answer"
                    className="form-control"
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
            <MissingFields missing={missing} />
        </fieldset>
    );
}

export default function WallyOriginal({ variant }) {
    const config = WALLY_ORIGINAL_VARIANTS[variant];
    const [items, setItems] = useState(null);
    const [catalog, setCatalog] = useState(null);
    const [answers, setAnswers] = useState({});
    const [codings, setCodings] = useState({});
    const [stopwatches, setStopwatches] = useState({});
    const [studentName, setStudentName] = useState('');
    const [activeSlide, setActiveSlide] = useState(0);
    const [blockedSlide, setBlockedSlide] = useState(null);
    const swiperRef = useRef(null);
    const missingRef = useRef([]);
    const activeSlideRef = useRef(0);

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

    const watchOf = (item) => stopwatches[item.itemId] || EMPTY_STOPWATCH;

    // Lo que falta para avanzar desde un slide (vacío si se puede avanzar).
    const missingFor = (slideIndex) => {
        if (!items || slideIndex < FIRST_ITEM_SLIDE) return [];
        const item = items[Math.floor((slideIndex - FIRST_ITEM_SLIDE) / 2)];
        if (!item) return [];
        const timed = isMeasured(watchOf(item));
        if ((slideIndex - FIRST_ITEM_SLIDE) % 2 === 0) return timed ? [] : ['tiempo'];

        const missing = [];
        if (!timed) missing.push('tiempo (vuelve al slide anterior)');
        if (!(answers[item.itemId] || '').trim()) missing.push('respuesta');
        if (catalog) {
            const coding = codings[item.itemId] || EMPTY_CODING;
            if (!coding.classification) missing.push('clasificación');
            if (coding.categories.length === 0) missing.push('categoría');
        }
        return missing;
    };

    const activeMissing = missingFor(activeSlide);
    missingRef.current = activeMissing;
    activeSlideRef.current = activeSlide;

    useEffect(() => {
        if (swiperRef.current) swiperRef.current.allowSlideNext = activeMissing.length === 0;
    });

    // La flecha "siguiente" no avanza si falta algo; al tocarla se muestra el motivo.
    const onSwiper = (swiper) => {
        swiperRef.current = swiper;
        swiper.allowSlideNext = missingRef.current.length === 0;
        const nextEl = swiper.navigation && swiper.navigation.nextEl;
        if (nextEl && nextEl.addEventListener) {
            nextEl.addEventListener('click', () => {
                if (missingRef.current.length > 0) setBlockedSlide(activeSlideRef.current);
            });
        }
    };

    // Al cambiar de slide se detiene cualquier cronómetro que haya quedado corriendo.
    const onSlideChange = (swiper) => {
        setActiveSlide(swiper.activeIndex);
        setBlockedSlide(null);
        setStopwatches((state) => Object.fromEntries(
            Object.entries(state).map(([itemId, watch]) => [itemId, stopWatch(watch)])
        ));
    };

    if (items === null) return null;

    if (items.length === 0) {
        return (
            <div className="page-item" style={styles.item}>
                <h3 className="main-description">{config.name}</h3>
                <p>No se encontraron los ítems de este instrumento en la tablet. Conéctate a internet y vuelve a abrir SELB para descargarlos.</p>
            </div>
        );
    }

    const shownMissing = (slideIndex) => (blockedSlide === slideIndex ? missingFor(slideIndex) : []);

    const slides = [];
    items.forEach((item, index) => {
        const situationIndex = FIRST_ITEM_SLIDE + index * 2;
        const watch = watchOf(item);
        slides.push(
            <SwiperSlide key={`${item.itemId}-situation`}>
                <SituationSlide
                    item={item}
                    folder={config.folder}
                    watch={watch}
                    onWatchChange={(value) => setStopwatches((state) => ({ ...state, [item.itemId]: value }))}
                    missing={shownMissing(situationIndex)}
                />
            </SwiperSlide>
        );
        slides.push(
            <SwiperSlide key={`${item.itemId}-response`}>
                <ResponseSlide
                    item={item}
                    instrumentId={config.instrumentId}
                    folder={config.folder}
                    seconds={isMeasured(watch) ? toSeconds(elapsedMs(watch)) : null}
                    answer={answers[item.itemId] || ''}
                    onAnswerChange={(text) => setAnswers((state) => ({ ...state, [item.itemId]: text }))}
                    coding={codings[item.itemId] || EMPTY_CODING}
                    catalog={catalog}
                    onCodingChange={(value) => setCodings((state) => ({ ...state, [item.itemId]: value }))}
                    missing={shownMissing(situationIndex + 1)}
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
                    onSwiper={onSwiper}
                    onSlideChange={onSlideChange}
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
