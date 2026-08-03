import {
  DASHBOARD_INSTRUMENTS,
  normalizeDashboardSummary,
  refreshDashboardSummary,
} from './dashboardSummary';

test('normalizes a partial server response and fills missing instruments with zero', () => {
  const summary = normalizeDashboardSummary(
    {
      total: 999,
      byInstrument: [
        { instrumentId: 1, total: 2 },
        { instrumentId: 27, total: '3' },
      ],
    },
    '2026-08-03T20:00:00.000Z'
  );

  expect(summary.total).toBe(5);
  expect(summary.byInstrument).toHaveLength(DASHBOARD_INSTRUMENTS.length);
  expect(summary.byInstrument.find(({ instrumentId }) => instrumentId === 1).total).toBe(2);
  expect(summary.byInstrument.find(({ instrumentId }) => instrumentId === 6).total).toBe(0);
  expect(summary.byInstrument.find(({ instrumentId }) => instrumentId === 27).total).toBe(3);
});

test('persists the summary and compatibility count keys only after a valid response', async () => {
  const persisted = {};

  const summary = await refreshDashboardSummary({
    load: async () => ({ byInstrument: [{ instrumentId: 6, total: 4 }] }),
    persistSummary: async (value) => {
      persisted.summary = value;
    },
    persistLegacy: async (key, value) => {
      persisted[key] = value;
    },
    now: () => '2026-08-03T20:00:00.000Z',
  });

  expect(summary.total).toBe(4);
  expect(persisted.summary).toEqual(summary);
  expect(persisted.corsiLength).toBe(4);
  expect(persisted.tejasLength).toBe(0);
});

test('rejects invalid payloads without replacing the cached summary', async () => {
  const persistSummary = jest.fn();

  await expect(
    refreshDashboardSummary({
      load: async () => ({ total: 3 }),
      persistSummary,
      persistLegacy: jest.fn(),
    })
  ).rejects.toThrow('INVALID_DASHBOARD_SUMMARY');

  expect(persistSummary).not.toHaveBeenCalled();
});
