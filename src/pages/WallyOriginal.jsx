import React, { useEffect, useState } from 'react';
import { get } from 'idb-keyval';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Instruction from '../components/Instruction';
import {
    WALLY_ORIGINAL_VARIANTS,
    collectOpenAnswers,
    sanitizeAnswerText,
    toSeconds,
} from '../services/wallyOriginal';

// INSTR-002 — Toma de Wally Niños / Wally Niñas: por ítem, imagen, situación,
// cronómetro y respuesta abierta. El evaluador no clasifica ni codifica.

const styles = {
    item: { maxWidth: '900px', margin: '0 auto', padding: '0 1rem' },
    image: { display: 'block', maxWidth: '100%', maxHeight: '38vh', margin: '0.5rem auto', objectFit: 'contain' },
    stopwatch: { display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', margin: '0.5rem 0' },
    seconds: { fontVariantNumeric: 'tabular-nums', fontSize: '1.4rem', minWidth: '5rem', textAlign: 'center' },
    answer: { width: '100%', fontSize: '1.1rem' },
    warning: { color: '#b45309', marginTop: '0.25rem' },
};

function OpenAnswerItem({ item, instrumentId, folder }) {
    const [answer, setAnswer] = useState('');
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

    // Como en la aplicación antigua, empezar a escribir detiene el cronómetro.
    const onAnswerChange = (event) => {
        stop();
        const { text, removed } = sanitizeAnswerText(event.target.value);
        setAnswer(text);
        setRemovedCharacters(removed);
    };

    const picture = item.picture || `/instruments/wallyOriginal/${folder}/${item.num}.jpg`;
    const answerId = `wally-original-answer-${item.itemId}`;

    return (
        <div className="page-item" style={styles.item}>
            <h3 className="main-description">{item.title}</h3>
            <img src={picture} alt={`Situación ${item.num}`} style={styles.image} />
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
                    onChange={onAnswerChange}
                    style={styles.answer}
                />
                {removedCharacters && (
                    <p role="alert" style={styles.warning}>Se quitaron caracteres no admitidos (por ejemplo, emojis).</p>
                )}
            </form>
        </div>
    );
}

export default function WallyOriginal({ variant }) {
    const config = WALLY_ORIGINAL_VARIANTS[variant];
    const [items, setItems] = useState(null);
    const [studentName, setStudentName] = useState('');

    useEffect(() => {
        get('selectedStudentName').then((name) => setStudentName(name || ''));
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

    return (
        <div style={{ overflow: 'hidden', height: '100%', paddingTop: '1.5rem' }}>
            <div className="aces-test">
                <Swiper
                    modules={[Navigation, A11y]}
                    slidesPerView={1}
                    navigation
                    spaceBetween={0}
                    allowTouchMove={false}
                >
                    <SwiperSlide>
                        <Instruction title={config.name} instruction={config.assent} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Instruction instruction={config.instruction} />
                    </SwiperSlide>

                    {items.map((item) => (
                        <SwiperSlide key={item.itemId}>
                            <OpenAnswerItem item={item} instrumentId={config.instrumentId} folder={config.folder} />
                        </SwiperSlide>
                    ))}

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
