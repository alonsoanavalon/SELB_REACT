import React from 'react';

// INSTR-002 — Controles de codificación de un ítem de Wally Niños/Niñas:
// clasificación y hasta `maxCategories` categorías de esa clasificación.
// Los usan la toma (Fase C) y la pantalla /codificacion (Fase B).

export const CLASSIFICATIONS = [
    { value: 'positivo', label: 'Positivo' },
    { value: 'negativo', label: 'Negativo' },
    { value: 'neutro', label: 'Neutro' },
];

const styles = {
    radios: { margin: '0.75rem 0' },
    categories: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.25rem 1rem' },
};

export default function CodingFields({ itemId, num, coding, categories, maxCategories, onChange }) {
    const available = categories.filter((category) => category.classification === coding.classification);
    const selected = coding.categories;
    const full = selected.length >= maxCategories;

    const setClassification = (classification) => onChange({ classification, categories: [] });
    const toggleCategory = (id) => onChange({
        ...coding,
        categories: selected.includes(id) ? selected.filter((value) => value !== id) : [...selected, id],
    });

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
        </>
    );
}
