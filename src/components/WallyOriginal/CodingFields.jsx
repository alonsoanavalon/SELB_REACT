import React from 'react';

// INSTR-002 — Controles de codificación de un ítem de Wally Niños/Niñas:
// clasificación y una sola categoría, elegida en una lista desplegable que se
// carga según la clasificación (positivo, negativo o neutro).
// Los usan la toma (Fase C) y la pantalla /codificacion (Fase B).

export const CLASSIFICATIONS = [
    { value: 'positivo', label: 'Positivo' },
    { value: 'negativo', label: 'Negativo' },
    { value: 'neutro', label: 'Neutro' },
];

// Pensado para tablet: cada opción es una zona táctil completa (mín. 48 px),
// con el mismo padding, radio de borde y color de selección que .instrument-form.
const styles = {
    radios: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', margin: '0.5rem 0' },
    option: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        minHeight: '48px',
        padding: '0.6rem 1rem',
        border: '1px solid #ced4da',
        borderRadius: '0.5rem',
        fontSize: '1.1rem',
        cursor: 'pointer',
        userSelect: 'none',
    },
    selected: { backgroundColor: '#3aafb9', borderColor: '#3aafb9', color: '#fff' },
    radio: { width: '1.4rem', height: '1.4rem', margin: 0, flexShrink: 0 },
    category: { width: '100%', maxWidth: '520px', margin: '0 auto' },
    label: { display: 'block', marginBottom: '0.25rem', fontSize: '1.1rem' },
};

function ClassificationOption({ itemId, label, checked, onSelect }) {
    return (
        <label style={checked ? { ...styles.option, ...styles.selected } : styles.option}>
            <input
                type="radio"
                className="form-check-input"
                name={`classification-${itemId}`}
                checked={checked}
                onChange={onSelect}
                style={styles.radio}
            />
            {label}
        </label>
    );
}

export default function CodingFields({ itemId, num, coding, categories, onChange }) {
    const available = categories.filter((category) => category.classification === coding.classification);
    const selectId = `coding-category-${itemId}`;

    const setClassification = (classification) => onChange({ classification, categories: [] });
    const setCategory = (event) => {
        const id = Number(event.target.value);
        onChange({ ...coding, categories: id ? [id] : [] });
    };

    return (
        <>
            <div style={styles.radios} role="radiogroup" aria-label={`Clasificación ítem ${num}`}>
                {CLASSIFICATIONS.map(({ value, label }) => (
                    <ClassificationOption
                        key={value}
                        itemId={itemId}
                        label={label}
                        checked={coding.classification === value}
                        onSelect={() => setClassification(value)}
                    />
                ))}
                <ClassificationOption
                    itemId={itemId}
                    label="Sin clasificar"
                    checked={coding.classification === null}
                    onSelect={() => setClassification(null)}
                />
            </div>

            {coding.classification && (
                <div style={styles.category}>
                    <label htmlFor={selectId} style={styles.label}>
                        Categoría ítem {num}
                    </label>
                    <select id={selectId} className="form-select form-select-lg" value={coding.categories[0] || ''} onChange={setCategory}>
                        <option value="">Elige una categoría</option>
                        {available.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
            )}
        </>
    );
}
