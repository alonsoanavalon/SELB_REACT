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

const styles = {
    radios: { margin: '0.75rem 0' },
    select: { width: '100%', maxWidth: '480px', fontSize: '1.05rem', padding: '0.3rem' },
};

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
                    <label key={value} style={{ marginRight: '1rem' }}>
                        <input
                            type="radio"
                            name={`classification-${itemId}`}
                            checked={coding.classification === value}
                            onChange={() => setClassification(value)}
                        />{' '}{label}
                    </label>
                ))}
                <label>
                    <input
                        type="radio"
                        name={`classification-${itemId}`}
                        checked={coding.classification === null}
                        onChange={() => setClassification(null)}
                    />{' '}Sin clasificar
                </label>
            </div>

            {coding.classification && (
                <div>
                    <label htmlFor={selectId} style={{ display: 'block', marginBottom: '0.25rem' }}>
                        Categoría ítem {num}
                    </label>
                    <select id={selectId} value={coding.categories[0] || ''} onChange={setCategory} style={styles.select}>
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
