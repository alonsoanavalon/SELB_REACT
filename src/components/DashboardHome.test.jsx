import { render, screen } from '@testing-library/react';
import { buildPendingMetrics } from './DashboardHome';
import DashboardHome from './DashboardHome';

test('builds actionable pending metrics without reading answer payloads', () => {
  const metrics = buildPendingMetrics([
    [{ instrument: 2, student_id: 25, date: '2026/8/3' }, { 73: '1' }],
    [{ instrument: 6, student_id: 18, date: '2026/8/1' }, { 230: '1' }],
    [{ instrument: 2, student_id: 25, date: '2026/8/2' }, { 74: '2' }],
  ]);

  expect(metrics.total).toBe(3);
  expect(metrics.students).toBe(2);
  expect(metrics.oldestLabel).toBe('2026/8/1');
  expect(metrics.byInstrument.find(({ id }) => id === 2).total).toBe(2);
  expect(metrics.byInstrument.find(({ id }) => id === 6).total).toBe(1);
  expect(metrics.byInstrument.find(({ id }) => id === 1).total).toBe(0);
});

test('keeps the offline dashboard usable and prevents an unavailable send', () => {
  render(
    <DashboardHome
      username="Evaluador"
      pendingTests={[
        [{ instrument: 6, student_id: 18, date: '2026/8/1' }, { 230: '1' }],
      ]}
      recentActivity={[
        {
          studentName: 'Estudiante de prueba',
          instrumentName: 'Corsi',
          date: '2026/8/1',
        },
      ]}
      remoteSummary={{
        total: 4,
        updatedAt: '2026-08-03T20:00:00.000Z',
        byInstrument: [{ instrumentId: 6, name: 'Corsi', total: 4 }],
      }}
      online={false}
      onSend={jest.fn()}
    />
  );

  expect(screen.getByText('Sin conexión')).toBeInTheDocument();
  expect(screen.getByText('Estudiante de prueba')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Conéctate para enviar' })).toBeDisabled();
  expect(screen.getByText('Último resumen disponible; puede estar desactualizado.'))
    .toBeInTheDocument();
});
