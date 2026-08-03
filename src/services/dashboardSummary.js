export const DASHBOARD_SUMMARY_KEY = 'dashboardSummary:v1';

export const DASHBOARD_INSTRUMENTS = [
  { id: 1, name: 'Tejas Lee', legacyKey: 'tejasLength' },
  { id: 2, name: 'Cálculo', legacyKey: 'calculoLength' },
  { id: 3, name: 'SDQ', legacyKey: 'sdqLength' },
  { id: 4, name: 'Aces', legacyKey: 'acesLength' },
  { id: 5, name: 'Wally', legacyKey: 'wallyLength' },
  { id: 6, name: 'Corsi', legacyKey: 'corsiLength' },
  { id: 7, name: 'HNF', legacyKey: 'hnfLength' },
  { id: 8, name: 'Fonológico', legacyKey: 'fonoLength' },
  { id: 9, name: 'Torre de Londres', legacyKey: 'torreLength' },
  { id: 10, name: 'ESC', legacyKey: 'escLength' },
  { id: 11, name: 'EML', legacyKey: 'emlLength' },
  { id: 12, name: 'Japi', legacyKey: 'japiLength' },
  { id: 13, name: 'StroopNum', legacyKey: 'stroopnumLength' },
  { id: 14, name: 'StroopCol', legacyKey: 'stroopcolLength' },
  { id: 15, name: 'Autoconcepto', legacyKey: 'autoconceptoLength' },
  { id: 16, name: 'ActMat', legacyKey: 'actMatLength' },
  { id: 17, name: 'Cmasr', legacyKey: 'cmasrLength' },
  { id: 19, name: 'AAH', legacyKey: 'aahLength' },
  { id: 20, name: 'Clpt', legacyKey: 'clptLength' },
  { id: 21, name: 'ListeningSpan', legacyKey: 'listeningSpanLength' },
  { id: 22, name: 'DigitSpan', legacyKey: 'digitSpanLength' },
  { id: 23, name: 'RegEmocional', legacyKey: 'regEmocionalLength' },
  { id: 24, name: 'ActCiencias', legacyKey: 'actCienciasLength' },
  { id: 25, name: 'AnsMat', legacyKey: 'ansMatLength' },
  { id: 26, name: 'CountSpan', legacyKey: 'countSpanLength' },
  { id: 27, name: 'Tarea de cartas', legacyKey: 'countWisconsinLength' },
];

export function normalizeDashboardSummary(payload, updatedAt) {
  if (!payload || !Array.isArray(payload.byInstrument)) {
    throw new Error('INVALID_DASHBOARD_SUMMARY');
  }

  const counts = new Map(
    payload.byInstrument.map(({ instrumentId, total }) => [
      Number(instrumentId),
      Number(total),
    ])
  );

  const byInstrument = DASHBOARD_INSTRUMENTS.map((instrument) => ({
    instrumentId: instrument.id,
    name: instrument.name,
    total: Number.isFinite(counts.get(instrument.id)) ? counts.get(instrument.id) : 0,
  }));

  return {
    version: 1,
    updatedAt,
    total: byInstrument.reduce((sum, instrument) => sum + instrument.total, 0),
    byInstrument,
  };
}

export async function refreshDashboardSummary({
  load,
  persistSummary,
  persistLegacy,
  now = () => new Date().toISOString(),
}) {
  const payload = await load();
  const summary = normalizeDashboardSummary(payload, now());

  await persistSummary(summary);
  await Promise.all(
    DASHBOARD_INSTRUMENTS.map((instrument) => {
      const value = summary.byInstrument.find(
        (entry) => entry.instrumentId === instrument.id
      ).total;
      return persistLegacy(instrument.legacyKey, value);
    })
  );

  return summary;
}
