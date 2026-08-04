import { getInstrumentRoute, INSTRUMENT_ROUTES } from './instrumentRoutes';

test('preserves every existing instrument route', () => {
  expect(Object.keys(INSTRUMENT_ROUTES)).toHaveLength(25);
  expect(getInstrumentRoute('1')).toBe('/tejaslee');
  expect(getInstrumentRoute(2)).toBe('/calculo');
  expect(getInstrumentRoute(6)).toBe('/corsi');
  expect(getInstrumentRoute(16)).toBe('/actMat');
  expect(getInstrumentRoute(27)).toBe('/wisconsin');
  expect(getInstrumentRoute(999)).toBeNull();
});
