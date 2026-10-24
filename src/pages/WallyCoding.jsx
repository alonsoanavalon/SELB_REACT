import React, { useEffect, useMemo, useState } from 'react';
import {
    getWallyCodingCatalog,
    getWallyCodingEvaluation,
    listStudies,
    listStudyMoments,
    listWallyCodingEvaluations,
    saveWallyCodingEvaluation,
} from '../services/adminV1Api';
import { WALLY_ORIGINAL_VARIANTS } from '../services/wallyOriginal';

// INSTR-002 Fase B — Codificación posterior de Wally Niños/Niñas (sólo Admin).
// La respuesta y el tiempo registrados en la toma son de solo lectura; aquí se
// asigna una clasificación y hasta 6 categorías de esa clasificación por ítem.

const INSTRUMENTS = [WALLY_ORIGINAL_VARIANTS.ninos, WALLY_ORIGINAL_VARIANTS.ninas];
const CLASSIFICATIONS = [
    { value: 'positivo', label: 'Positivo' },
    { value: 'negativo', label: 'Negativo' },
    { value: 'neutro', label: 'Neutro' },
];
const STATUS_LABELS = { sin_codificar: 'Sin codificar', parcial: 'Parcial', codificada: 'Codificada' };

const styles = {
    page: { maxWidth: '1100px', margin: '0 auto', padding: '1.5rem 1rem' },
    filters: { display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'flex-end', marginBottom: '1rem' },
    field: { display: 'flex', flexDirection: 'column', minWidth: '200px' },
    table: { width: '100%' },
    item: { border: '1px solid #dee2e6', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' },
    itemHeader: { display: 'flex', gap: '1rem', alignItems: 'flex-start', flexWrap: 'wrap' },
    image: { maxWidth: '180px', maxHeight: '140px', objectFit: 'contain' },
    answer: { background: '#f8f9fa', borderRadius: '6px', padding: '0.5rem 0.75rem', whiteSpace: 'pre-wrap' },
    categories: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.25rem 1rem' },
    actions: { display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', position: 'sticky', bottom: 0, background: '#fff', padding: '0.75rem 0' },
};

const formatDate = (value) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString('es-CL');
};

const toCodingState = (items) => Object.fromEntries(items.map((item) => [
    item.itemId,
    { classification: item.classification || null, categories: item.categories || [] },
]));

const errorMessage = (error) => {
    const status = error && error.response && error.response.status;
    if (status === 409) return 'Otra persona modificó esta codificación mientras la editabas. Recarga la toma para ver los cambios; lo que ingresaste sigue en pantalla.';
    if (status === 400) return 'La codificación tiene datos inválidos. Revisa las categorías de cada ítem.';
    if (status === 401 || status === 403) return 'Tu sesión no tiene permisos de administrador. Vuelve a iniciar sesión.';
    if (!navigator.onLine) return 'Sin conexión. No se guardó; lo que ingresaste sigue en pantalla.';
    return 'No fue posible guardar. Intenta nuevamente; lo que ingresaste sigue en pantalla.';
};

function CodingItem({ item, coding, categories, maxCategories, onChange }) {
    const available = categories.filter((category) => category.classification === coding.classification);
    const selected = coding.categories;
    const full = selected.length >= maxCategories;

    const setClassification = (classification) => onChange({ classification, categories: [] });
    const toggleCategory = (id) => onChange({
        ...coding,
        categories: selected.includes(id) ? selected.filter((value) => value !== id) : [...selected, id],
    });

    return (
        <fieldset style={styles.item} aria-label={`Ítem ${item.num}`}>
            <div style={styles.itemHeader}>
                {item.picture && <img src={item.picture} alt={`Situación ${item.num}`} style={styles.image} />}
                <div style={{ flex: 1, minWidth: '240px' }}>
                    <h3 style={{ fontSize: '1.05rem' }}><span>{`${item.num}. `}</span><span>{item.title}</span></h3>
                    <p style={{ marginBottom: '0.25rem' }}><strong>Respuesta</strong> · <span>{item.time ? `${item.time} s` : 'sin tiempo'}</span></p>
                    <div style={styles.answer}>{item.text ? <span>{item.text}</span> : <em>Sin respuesta registrada</em>}</div>
                </div>
            </div>

            <div style={{ margin: '0.75rem 0' }} role="radiogroup" aria-label={`Clasificación ítem ${item.num}`}>
                {CLASSIFICATIONS.map(({ value, label }) => (
                    <label key={value} style={{ marginRight: '1rem' }}>
                        <input
                            type="radio"
                            name={`classification-${item.itemId}`}
                            checked={coding.classification === value}
                            onChange={() => setClassification(value)}
                        />{' '}{label}
                    </label>
                ))}
                <label>
                    <input
                        type="radio"
                        name={`classification-${item.itemId}`}
                        checked={coding.classification === null}
                        onChange={() => setClassification(null)}
                    />{' '}Sin clasificar
                </label>
            </div>

            {coding.classification && (
                <>
                    <p style={{ marginBottom: '0.25rem' }}>{selected.length} de {maxCategories} categorías</p>
                    <div style={styles.categories}>
                        {available.map((category) => (
                            <label key={category.id}>
                                <input
                                    type="checkbox"
                                    checked={selected.includes(category.id)}
                                    disabled={full && !selected.includes(category.id)}
                                    onChange={() => toggleCategory(category.id)}
                                />{' '}{category.name}
                            </label>
                        ))}
                    </div>
                </>
            )}
        </fieldset>
    );
}

export default function WallyCoding() {
    const [instrumentId, setInstrumentId] = useState(INSTRUMENTS[0].instrumentId);
    const [studies, setStudies] = useState([]);
    const [studyId, setStudyId] = useState('');
    const [moments, setMoments] = useState([]);
    const [momentId, setMomentId] = useState('');
    const [catalog, setCatalog] = useState({ categories: [], maxCategoriesPerItem: 6 });
    const [evaluations, setEvaluations] = useState(null);
    const [selected, setSelected] = useState(null);
    const [evaluation, setEvaluation] = useState(null);
    const [codingState, setCodingState] = useState({});
    const [message, setMessage] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        listStudies({ pageSize: 100 }).then((response) => setStudies(response.data || [])).catch(() => setStudies([]));
        getWallyCodingCatalog().then((response) => setCatalog(response.data)).catch(() => {
            setMessage({ type: 'error', text: 'No fue posible cargar el catálogo de categorías.' });
        });
    }, []);

    useEffect(() => {
        setMoments([]);
        setMomentId('');
        if (!studyId) return;
        listStudyMoments(Number(studyId), { pageSize: 100 })
            .then((response) => setMoments(response.data || []))
            .catch(() => setMoments([]));
    }, [studyId]);

    const instrumentName = useMemo(
        () => INSTRUMENTS.find((instrument) => instrument.instrumentId === instrumentId).name,
        [instrumentId]
    );

    const search = async () => {
        setMessage(null);
        setSelected(null);
        setEvaluation(null);
        try {
            const params = { instrumentId, studyId: Number(studyId) };
            if (momentId) params.momentId = Number(momentId);
            const response = await listWallyCodingEvaluations(params);
            setEvaluations(response.data || []);
        } catch (error) {
            setEvaluations(null);
            setMessage({ type: 'error', text: 'No fue posible cargar las tomas.' });
        }
    };

    const open = async (row) => {
        setMessage(null);
        try {
            const response = await getWallyCodingEvaluation(row.instrumentListId);
            // The coding state must exist before the evaluation renders its items.
            setCodingState(toCodingState(response.data.items));
            setSelected(row);
            setEvaluation(response.data);
        } catch (error) {
            setMessage({ type: 'error', text: 'No fue posible abrir la toma.' });
        }
    };

    const save = async () => {
        setSaving(true);
        setMessage(null);
        try {
            const response = await saveWallyCodingEvaluation(selected.instrumentListId, {
                version: evaluation.version,
                items: evaluation.items.map((item) => ({ itemId: item.itemId, ...codingState[item.itemId] })),
            });
            setCodingState(toCodingState(response.data.items));
            setEvaluation(response.data);
            setMessage({ type: 'success', text: 'Codificación guardada.' });
            search().then(() => setMessage({ type: 'success', text: 'Codificación guardada.' }));
        } catch (error) {
            setMessage({ type: 'error', text: errorMessage(error) });
        } finally {
            setSaving(false);
        }
    };

    const feedback = message && (
        <p role={message.type === 'error' ? 'alert' : 'status'} className={`alert ${message.type === 'error' ? 'alert-warning' : 'alert-success'}`}>
            {message.text}
        </p>
    );

    if (evaluation && selected) {
        return (
            <main style={styles.page}>
                <button type="button" className="btn btn-link px-0" onClick={() => { setEvaluation(null); setSelected(null); setMessage(null); }}>
                    ← Volver a la lista
                </button>
                <h1 style={{ fontSize: '1.5rem' }}>Codificar {instrumentName}</h1>
                <p>{selected.studentName} · {selected.course} · {selected.school} · {formatDate(selected.date)}</p>
                {evaluation.items.map((item) => (
                    <CodingItem
                        key={item.itemId}
                        item={item}
                        coding={codingState[item.itemId]}
                        categories={catalog.categories}
                        maxCategories={catalog.maxCategoriesPerItem}
                        onChange={(value) => setCodingState((state) => ({ ...state, [item.itemId]: value }))}
                    />
                ))}
                <div style={styles.actions}>
                    <button type="button" className="btn btn-primary" onClick={save} disabled={saving}>
                        {saving ? 'Guardando…' : 'Guardar codificación'}
                    </button>
                    {feedback}
                </div>
            </main>
        );
    }

    return (
        <main style={styles.page}>
            <p className="text-uppercase text-primary fw-bold" style={{ fontSize: '0.8rem', letterSpacing: '0.08em' }}>Codificación</p>
            <h1 style={{ fontSize: '1.75rem' }}>Wally Niños y Wally Niñas</h1>
            <p>Elige el instrumento, el estudio y el momento para ver las tomas y codificar sus respuestas.</p>

            <div style={styles.filters}>
                <label style={styles.field}>
                    Instrumento
                    <select className="form-select" value={instrumentId} onChange={(event) => setInstrumentId(Number(event.target.value))}>
                        {INSTRUMENTS.map((instrument) => (
                            <option key={instrument.instrumentId} value={instrument.instrumentId}>{instrument.name}</option>
                        ))}
                    </select>
                </label>
                <label style={styles.field}>
                    Estudio
                    <select className="form-select" value={studyId} onChange={(event) => setStudyId(event.target.value)}>
                        <option value="">Selecciona un estudio</option>
                        {studies.map((study) => (
                            <option key={study.id} value={study.id}>{study.name} ({study.year})</option>
                        ))}
                    </select>
                </label>
                <label style={styles.field}>
                    Momento
                    <select className="form-select" value={momentId} onChange={(event) => setMomentId(event.target.value)} disabled={!studyId}>
                        <option value="">Todos los momentos</option>
                        {moments.map((moment) => (
                            <option key={moment.id} value={moment.id}>{formatDate(moment.begin)} – {formatDate(moment.until)}</option>
                        ))}
                    </select>
                </label>
                <button type="button" className="btn btn-primary" onClick={search} disabled={!studyId}>Buscar tomas</button>
            </div>

            {feedback}

            {evaluations && evaluations.length === 0 && <p>No hay tomas de {instrumentName} para este filtro.</p>}

            {evaluations && evaluations.length > 0 && (
                <table className="table" style={styles.table}>
                    <thead>
                        <tr><th>Alumno</th><th>Curso</th><th>Colegio</th><th>Fecha</th><th>Evaluador</th><th>Estado</th><th aria-label="Acciones" /></tr>
                    </thead>
                    <tbody>
                        {evaluations.map((row) => (
                            <tr key={row.instrumentListId}>
                                <td>{row.studentName}</td>
                                <td>{row.course}</td>
                                <td>{row.school}</td>
                                <td>{formatDate(row.date)}</td>
                                <td>{row.evaluator}</td>
                                <td>{STATUS_LABELS[row.status] || row.status}</td>
                                <td>
                                    <button type="button" className="btn btn-sm btn-outline-primary" aria-label={`Codificar ${row.studentName}`} onClick={() => open(row)}>
                                        Codificar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </main>
    );
}
