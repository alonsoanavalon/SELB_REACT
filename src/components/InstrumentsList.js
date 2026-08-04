import React, { useEffect, useMemo, useRef } from 'react'
import ListedInstrument from '../components/ListedInstrument'

export default function InstrumentsList ({ instruments = [], open, selectedStudent, onClose, onSelect, error }) {
    const closeButton = useRef(null);

    useEffect(() => {
        if (!open) return undefined;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        closeButton.current?.focus();

        const closeOnEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', closeOnEscape);
        return () => {
            document.removeEventListener('keydown', closeOnEscape);
            document.body.style.overflow = previousOverflow;
        };
    }, [onClose, open]);

    const visibleInstruments = useMemo(() => instruments
        .filter((instrument) => instrument.instrument_type_id === 1 || Number(instrument.id) <= 26)
        .sort((a, b) => String(a.name).localeCompare(String(b.name), 'es', { sensitivity: 'base' })),
    [instruments]);

    if (!open) return null;

    return (
        <div
            className="instrument-picker"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <section
                className="instrument-picker__dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="instrument-picker-title"
            >
                <header className="instrument-picker__header">
                    <div>
                        <p className="instrument-picker__eyebrow">Estudiante seleccionado</p>
                        <h2 id="instrument-picker-title">{selectedStudent?.displayName}</h2>
                        <p>Elige el instrumento que deseas aplicar.</p>
                    </div>
                    <button ref={closeButton} type="button" className="instrument-picker__close" onClick={onClose} aria-label="Cerrar instrumentos">
                        ×
                    </button>
                </header>

                {error && <p className="instrument-picker__error" role="alert">{error}</p>}

                {visibleInstruments.length > 0 ? (
                    <div className="instrument-picker__grid">
                        {visibleInstruments.map((instrument) => (
                            <ListedInstrument
                                key={instrument.id}
                                instrument={instrument}
                                onSelect={onSelect}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="instrument-picker__empty">No hay instrumentos disponibles.</p>
                )}
            </section>
        </div>
    );
}
