export const INSTRUMENT_ROUTES = Object.freeze({
  1: '/tejaslee',
  2: '/calculo',
  4: '/aces',
  5: '/wally',
  6: '/corsi',
  7: '/hnf',
  8: '/fonologico',
  9: '/torre',
  10: '/esc',
  11: '/eml',
  12: '/japi',
  13: '/stroopnum',
  14: '/stroopcol',
  15: '/autoconcepto',
  16: '/actMat',
  17: '/cmasr',
  19: '/aah',
  20: '/clpt',
  21: '/listeningSpan',
  22: '/digitSpan',
  23: '/regEmocional',
  24: '/actCiencias',
  25: '/ansMat',
  26: '/countSpan',
  27: '/wisconsin',
});

export function getInstrumentRoute(instrumentId) {
  return INSTRUMENT_ROUTES[Number(instrumentId)] || null;
}
