import React, { useMemo, useState } from 'react';
import { DASHBOARD_INSTRUMENTS } from '../services/dashboardSummary';
import '../css/dashboard.css';

function parseLocalDate(value) {
  if (typeof value !== 'string') return null;
  const parts = value.split('/').map(Number);
  if (parts.length !== 3 || parts.some((part) => !Number.isFinite(part))) return null;
  const [year, month, day] = parts;
  const date = new Date(year, month - 1, day);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function buildPendingMetrics(tests = []) {
  const counts = new Map();
  const students = new Set();
  let oldestDate = null;
  let oldestLabel = null;

  tests.forEach((test) => {
    const info = Array.isArray(test) ? test[0] : null;
    if (!info) return;

    const instrumentId = Number(info.instrument);
    counts.set(instrumentId, (counts.get(instrumentId) || 0) + 1);
    if (info.student_id !== undefined && info.student_id !== null) {
      students.add(String(info.student_id));
    }

    const parsedDate = parseLocalDate(info.date);
    if (parsedDate && (!oldestDate || parsedDate < oldestDate)) {
      oldestDate = parsedDate;
      oldestLabel = info.date;
    }
  });

  return {
    total: tests.length,
    students: students.size,
    oldestLabel,
    byInstrument: DASHBOARD_INSTRUMENTS.map((instrument) => ({
      ...instrument,
      total: counts.get(instrument.id) || 0,
    })),
  };
}

function formatUpdatedAt(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleString('es-CL');
}

function MetricCard({ label, value, hint, tone = 'default' }) {
  return (
    <article className={`dashboard-metric dashboard-metric--${tone}`}>
      <span className="dashboard-metric__label">{label}</span>
      <strong className="dashboard-metric__value">{value}</strong>
      {hint && <span className="dashboard-metric__hint">{hint}</span>}
    </article>
  );
}

function InstrumentTable({ rows, emptyMessage }) {
  if (rows.length === 0) {
    return <p className="dashboard-empty">{emptyMessage}</p>;
  }

  return (
    <div className="dashboard-table-scroll">
      <table className="dashboard-table">
        <thead>
          <tr>
            <th scope="col">Instrumento</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.instrumentId || row.id}>
              <th scope="row">{row.name}</th>
              <td>{row.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function DashboardHome({
  username,
  pendingTests,
  recentActivity,
  remoteSummary,
  online,
  onSend,
}) {
  const [showAllRegistered, setShowAllRegistered] = useState(false);
  const pending = useMemo(() => buildPendingMetrics(pendingTests), [pendingTests]);
  const pendingRows = pending.byInstrument.filter((row) => row.total > 0);
  const remoteRows = remoteSummary?.byInstrument || [];
  const visibleRemoteRows = showAllRegistered
    ? remoteRows
    : remoteRows.filter((row) => row.total > 0);
  const updatedAt = formatUpdatedAt(remoteSummary?.updatedAt);

  return (
    <main className="dashboard-home">
      <header className="dashboard-header">
        <div>
          <p className="dashboard-eyebrow">Panel de evaluaciones</p>
          <h1>¡Hola {username}!</h1>
          <p>Controla la actividad de este dispositivo y gestiona los envíos.</p>
        </div>
        <span className={`dashboard-connection ${online ? 'is-online' : 'is-offline'}`}>
          {online ? 'En línea' : 'Sin conexión'}
        </span>
      </header>

      <section className="dashboard-metrics" aria-label="Indicadores principales">
        <MetricCard
          label="Pendientes en este dispositivo"
          value={pending.total}
          hint={pending.total === 1 ? 'evaluación por enviar' : 'evaluaciones por enviar'}
          tone={pending.total > 0 ? 'warning' : 'success'}
        />
        <MetricCard
          label="Alumnos con pendientes"
          value={pending.students}
          hint="conteo local"
        />
        <MetricCard
          label="Pendiente más antiguo"
          value={pending.oldestLabel || '—'}
          hint={pending.oldestLabel ? 'fecha registrada en la tablet' : 'sin pendientes'}
        />
        <MetricCard
          label="Registradas a tu nombre"
          value={remoteSummary ? remoteSummary.total : '—'}
          hint={updatedAt ? `actualizado ${updatedAt}` : 'sin resumen disponible'}
        />
      </section>

      <section className="dashboard-layout">
        <article className="dashboard-panel dashboard-panel--pending">
          <div className="dashboard-panel__header">
            <div>
              <h2>Por enviar</h2>
              <p>Guardadas localmente en este dispositivo.</p>
            </div>
          </div>
          <InstrumentTable
            rows={pendingRows}
            emptyMessage="No hay evaluaciones pendientes en este dispositivo."
          />
          <button
            type="button"
            className="btn btn-primary dashboard-send"
            onClick={onSend}
            disabled={!online || pending.total === 0}
          >
            {online ? 'Enviar evaluaciones' : 'Conéctate para enviar'}
          </button>
        </article>

        <article className="dashboard-panel dashboard-panel--activity">
          <div className="dashboard-panel__header">
            <div>
              <h2>Actividad reciente del dispositivo</h2>
              <p>Últimas evaluaciones conservadas en el respaldo local.</p>
            </div>
          </div>
          {recentActivity.length > 0 ? (
            <div className="dashboard-table-scroll">
              <table className="dashboard-table dashboard-table--activity">
                <thead>
                  <tr>
                    <th scope="col">Estudiante</th>
                    <th scope="col">Instrumento</th>
                    <th scope="col">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivity.map((test, index) => (
                    <tr key={`${test.studentName}-${test.instrumentName}-${test.date}-${index}`}>
                      <td>{test.studentName || 'No disponible'}</td>
                      <td>{test.instrumentName || 'No disponible'}</td>
                      <td>{test.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="dashboard-empty">No hay actividad en el respaldo local.</p>
          )}
        </article>

        <article className="dashboard-panel dashboard-panel--registered">
          <div className="dashboard-panel__header">
            <div>
              <h2>Registradas a tu nombre</h2>
              <p>
                {online
                  ? 'Resumen histórico informado por el servidor.'
                  : 'Último resumen disponible; puede estar desactualizado.'}
              </p>
            </div>
            {remoteRows.length > 0 && (
              <button
                type="button"
                className="dashboard-link-button"
                onClick={() => setShowAllRegistered((current) => !current)}
              >
                {showAllRegistered ? 'Ocultar conteos en cero' : 'Mostrar todos'}
              </button>
            )}
          </div>
          <InstrumentTable
            rows={visibleRemoteRows}
            emptyMessage={
              remoteSummary
                ? 'No hay evaluaciones registradas a tu nombre.'
                : 'Aún no hay un resumen del servidor disponible.'
            }
          />
        </article>
      </section>
    </main>
  );
}
