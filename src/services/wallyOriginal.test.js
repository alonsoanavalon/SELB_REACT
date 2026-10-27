import {
  WALLY_ORIGINAL_VARIANTS,
  collectOpenAnswers,
  sanitizeAnswerText,
  toSeconds,
} from './wallyOriginal';
import { getInstrumentRoute } from './instrumentRoutes';
import { DASHBOARD_INSTRUMENTS } from './dashboardSummary';

function buildForm(fields) {
  const form = document.createElement('form');
  form.className = 'instrument-form';
  Object.entries(fields).forEach(([name, value]) => {
    const input = document.createElement(name === 'answer' ? 'textarea' : 'input');
    input.name = name;
    input.value = value;
    form.appendChild(input);
  });
  return form;
}

describe('Wally Niños / Wally Niñas (INSTR-002)', () => {
  test('variants map instruments 28 and 29 to their routes and image folders', () => {
    expect(WALLY_ORIGINAL_VARIANTS.ninos).toMatchObject({ instrumentId: 28, folder: 'ninos' });
    expect(WALLY_ORIGINAL_VARIANTS.ninas).toMatchObject({ instrumentId: 29, folder: 'ninas' });
    expect(getInstrumentRoute(28)).toBe('/wallyNinos');
    expect(getInstrumentRoute(29)).toBe('/wallyNinas');
    expect(getInstrumentRoute(5)).toBe('/wally');
  });

  test('instructions keep the gendered adjective of the original instrument', () => {
    expect(WALLY_ORIGINAL_VARIANTS.ninos.instruction).toContain('qué tan bueno eres como detective');
    expect(WALLY_ORIGINAL_VARIANTS.ninas.instruction).toContain('qué tan buena eres como detective');
  });

  test('dashboard counts both new instruments', () => {
    expect(DASHBOARD_INSTRUMENTS).toEqual(expect.arrayContaining([
      expect.objectContaining({ id: 28, name: 'Wally Niños' }),
      expect.objectContaining({ id: 29, name: 'Wally Niñas' }),
    ]));
  });

  test('collects answer, time and the coding from the second slide, keyed by item id', () => {
    const forms = [
      buildForm({ instrument: '28', key: '501', answer: "le dije 'para'", time: '7' }),
      buildForm({ codingKey: '501', classification: 'positivo', categories: '[2,45]' }),
      buildForm({ instrument: '28', key: '502', answer: '', time: '' }),
      buildForm({ codingKey: '502', classification: '', categories: '[]' }),
      buildForm({ instrument: '28' }),
    ];
    expect(collectOpenAnswers(forms)).toEqual({
      501: { text: "le dije 'para'", time: 7, classification: 'positivo', categories: [2, 45] },
      502: { text: '', time: null, classification: null, categories: [] },
    });
  });

  test('an item without a coding slide is sent without classification', () => {
    const forms = [buildForm({ instrument: '28', key: '501', answer: 'hola', time: '3' })];
    expect(collectOpenAnswers(forms)).toEqual({
      501: { text: 'hola', time: 3, classification: null, categories: [] },
    });
  });

  test('removes characters the database cannot store and limits length', () => {
    expect(sanitizeAnswerText('hola 😀 niño')).toEqual({ text: 'hola  niño', removed: true });
    expect(sanitizeAnswerText('sin cambios')).toEqual({ text: 'sin cambios', removed: false });
    expect(sanitizeAnswerText('a'.repeat(700)).text).toHaveLength(600);
  });

  test('converts stopwatch milliseconds to whole seconds', () => {
    expect(toSeconds(0)).toBe(0);
    expect(toSeconds(6499)).toBe(6);
    expect(toSeconds(6500)).toBe(7);
  });
});
