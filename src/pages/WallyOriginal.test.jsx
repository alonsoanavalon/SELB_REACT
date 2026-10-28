import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { get, getMany, set } from 'idb-keyval';
import Swal from 'sweetalert2';
import axios from 'axios';
import WallyOriginal from './WallyOriginal';

jest.mock('axios', () => ({ get: jest.fn() }));

jest.mock('idb-keyval', () => ({
  get: jest.fn(),
  getMany: jest.fn(),
  set: jest.fn(() => Promise.resolve()),
}));
jest.mock('sweetalert2', () => ({ fire: jest.fn(() => Promise.resolve({ isConfirmed: true })) }));
// The Swiper mock renders every slide and exposes a fake instance with its "next" arrow.
let mockSlideChange;
let mockSwiper;
jest.mock('swiper/react', () => {
  const { useEffect } = jest.requireActual('react');
  return {
    Swiper: ({ children, onSlideChange, onSwiper }) => {
      mockSlideChange = onSlideChange;
      useEffect(() => {
        mockSwiper = { allowSlideNext: true, navigation: { nextEl: globalThis.document.createElement('div') } };
        onSwiper(mockSwiper);
      }, []); // eslint-disable-line react-hooks/exhaustive-deps
      return <div>{children}</div>;
    },
    SwiperSlide: ({ children }) => <div>{children}</div>,
  };
});
jest.mock('swiper', () => ({ Navigation: {}, A11y: {} }));
jest.mock('swiper/css', () => ({}), { virtual: true });
jest.mock('swiper/css/navigation', () => ({}), { virtual: true });

const items = [
  { itemId: 501, num: 2, title: 'Situación sintética dos', picture: '/instruments/wallyOriginal/ninos/2.jpg' },
  { itemId: 500, num: 1, title: 'Situación sintética uno', picture: null },
];

const catalog = {
  categories: [
    { id: 2, name: 'Pedir disculpas', classification: 'positivo' },
    { id: 45, name: 'Compartir', classification: 'positivo' },
    { id: 36, name: 'Respuesta fisica negativa para la persona', classification: 'negativo' },
    { id: 30, name: 'Ignorar', classification: 'neutro' },
  ],
  maxCategoriesPerItem: 1,
};

// Slide order: assent (0), instruction (1), then situation and response per item.
const SITUATION_SLIDE_ITEM_1 = 2;
const RESPONSE_SLIDE_ITEM_1 = 3;

function renderPage(variant = 'ninos', { withCatalog = true, online = false } = {}) {
  jest.spyOn(navigator, 'onLine', 'get').mockReturnValue(online);
  get.mockImplementation((key) => Promise.resolve({
    selectedStudentName: 'Alumno sintético',
    'instrument/28': items,
    'instrument/29': items,
    'coding/wally-original/catalog': withCatalog ? catalog : undefined,
  }[key]));
  getMany.mockResolvedValue([10, { id: 3 }, [], undefined]);
  return render(<MemoryRouter><WallyOriginal variant={variant} /></MemoryRouter>);
}

let dateNowSpy;

// CRA enables resetMocks, so implementations are set before each test.
beforeEach(() => {
  Swal.fire.mockResolvedValue({ isConfirmed: true });
  set.mockResolvedValue(undefined);
});

afterEach(() => {
  if (dateNowSpy) dateNowSpy.mockRestore();
  dateNowSpy = undefined;
  set.mockClear();
});

async function savedAnswers() {
  fireEvent.click(screen.getByRole('button', { name: 'Guardar test' }));
  await waitFor(() => expect(set).toHaveBeenCalledWith('completedTests', expect.any(Array)));
  return set.mock.calls.find(([key]) => key === 'completedTests')[1][0];
}

const goTo = (activeIndex) => act(() => mockSlideChange({ activeIndex }));
const clickNext = () => act(() => { mockSwiper.navigation.nextEl.click(); });

test('shows assent, gendered instruction and items ordered by num with their image', async () => {
  renderPage('ninos');
  const [first] = await screen.findAllByText('Situación sintética uno');
  const [second] = screen.getAllByText('Situación sintética dos');
  expect(first.compareDocumentPosition(second) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(screen.getByText(/¿Quieres participar\?/)).toBeInTheDocument();
  expect(screen.getByText(/qué tan bueno eres como detective/)).toBeInTheDocument();
  expect(screen.getByAltText('Situación 1')).toHaveAttribute('src', '/instruments/wallyOriginal/ninos/1.jpg');
  expect(screen.getByAltText('Situación 2')).toHaveAttribute('src', '/instruments/wallyOriginal/ninos/2.jpg');
});

test('Wally Niñas uses the feminine instruction', async () => {
  renderPage('ninas');
  expect(await screen.findByText(/qué tan buena eres como detective/)).toBeInTheDocument();
});

test('slide 1 shows statement, image and stopwatch; slide 2 shows the time, answer and coding', async () => {
  renderPage('ninos');
  await screen.findAllByText('Situación sintética uno');
  const situationSlide = screen.getByRole('group', { name: 'Situación ítem 1' });
  const responseSlide = screen.getByRole('group', { name: 'Respuesta ítem 1' });
  expect(situationSlide.compareDocumentPosition(responseSlide) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

  expect(within(situationSlide).getByText('Situación sintética uno')).toBeInTheDocument();
  expect(within(situationSlide).getByAltText('Situación 1')).toBeInTheDocument();
  ['Iniciar', 'Detener', 'Reiniciar'].forEach((name) => {
    expect(within(situationSlide).getByRole('button', { name })).toBeInTheDocument();
  });
  expect(within(situationSlide).queryByRole('textbox')).not.toBeInTheDocument();
  expect(within(situationSlide).queryByRole('radio')).not.toBeInTheDocument();

  expect(within(responseSlide).getByText('Situación sintética uno')).toBeInTheDocument();
  expect(within(responseSlide).getByAltText('Situación 1 (respuesta)')).toHaveAttribute('src', '/instruments/wallyOriginal/ninos/1.jpg');
  expect(within(responseSlide).queryByRole('button', { name: 'Iniciar' })).not.toBeInTheDocument();
  expect(within(responseSlide).getByText('Tiempo: sin medir')).toBeInTheDocument();
  expect(within(responseSlide).getByLabelText('Respuesta del niño o niña')).toBeInTheDocument();
  expect(within(responseSlide).getByRole('radio', { name: 'Positivo' })).toBeInTheDocument();

  // Item 2 starts after both slides of item 1.
  const nextSituation = screen.getByRole('group', { name: 'Situación ítem 2' });
  expect(responseSlide.compareDocumentPosition(nextSituation) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
});

test('the stopwatch on slide 1 is controlled by Iniciar, Detener and Reiniciar', async () => {
  let now = 1000;
  dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => now);
  renderPage('ninos');
  await screen.findAllByText('Situación sintética uno');
  goTo(SITUATION_SLIDE_ITEM_1);
  const situationSlide = screen.getByRole('group', { name: 'Situación ítem 1' });
  const button = (name) => within(situationSlide).getByRole('button', { name });

  fireEvent.click(button('Iniciar'));
  now += 2000;
  fireEvent.click(button('Reiniciar'));
  expect(within(situationSlide).getByText('0.0 s')).toBeInTheDocument();

  fireEvent.click(button('Iniciar'));
  now += 800;
  fireEvent.click(button('Detener'));
  now += 4000; // stopped: further time is not counted
  expect(within(situationSlide).getByText('0.8 s')).toBeInTheDocument();

  // Typing the answer on slide 2 does not touch the stopwatch.
  const responseSlide = screen.getByRole('group', { name: 'Respuesta ítem 1' });
  const answer = within(responseSlide).getByLabelText('Respuesta del niño o niña');
  fireEvent.change(answer, { target: { value: "le dije 'para' 😀" } });
  expect(answer).toHaveValue("le dije 'para' ");
  expect(within(responseSlide).getByRole('alert')).toHaveTextContent('caracteres no admitidos');
  expect(within(responseSlide).getByText('Tiempo: 0.8 s')).toBeInTheDocument();

  const [info, answers] = await savedAnswers();
  expect(info).toMatchObject({ instrument: 28, student_id: 10, user_id: 3 });
  expect(answers).toEqual({
    500: { text: "le dije 'para' ", time: 0.8, classification: null, categories: [] },
    501: { text: '', time: null, classification: null, categories: [] },
  });
});

test('leaving slide 1 stops a running stopwatch', async () => {
  let now = 1000;
  dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => now);
  renderPage('ninos');
  await screen.findAllByText('Situación sintética uno');
  goTo(SITUATION_SLIDE_ITEM_1);
  const situationSlide = screen.getByRole('group', { name: 'Situación ítem 1' });

  fireEvent.click(within(situationSlide).getByRole('button', { name: 'Iniciar' }));
  now += 6500;
  goTo(RESPONSE_SLIDE_ITEM_1);
  now += 4000; // stopped when the slide changed

  expect(within(situationSlide).getByRole('button', { name: 'Detener' })).toBeDisabled();
  expect(within(situationSlide).getByText('6.5 s')).toBeInTheDocument();
  const [, answers] = await savedAnswers();
  expect(answers[500].time).toBe(6.5);
});

test('slide 1 cannot be left without measuring the time and says why', async () => {
  let now = 1000;
  dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => now);
  renderPage('ninos');
  await screen.findAllByText('Situación sintética uno');
  goTo(SITUATION_SLIDE_ITEM_1);
  const situationSlide = screen.getByRole('group', { name: 'Situación ítem 1' });

  expect(mockSwiper.allowSlideNext).toBe(false);
  clickNext();
  expect(within(situationSlide).getByRole('alert')).toHaveTextContent('Para continuar falta: tiempo');

  fireEvent.click(within(situationSlide).getByRole('button', { name: 'Iniciar' }));
  now += 2000;
  fireEvent.click(within(situationSlide).getByRole('button', { name: 'Detener' }));
  expect(mockSwiper.allowSlideNext).toBe(true);
  expect(within(situationSlide).queryByRole('alert')).not.toBeInTheDocument();
});

test('slide 2 cannot be left without answer, classification and category and says why', async () => {
  let now = 1000;
  dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => now);
  renderPage('ninos');
  await screen.findAllByText('Situación sintética uno');
  goTo(SITUATION_SLIDE_ITEM_1);
  fireEvent.click(screen.getAllByRole('button', { name: 'Iniciar' })[0]);
  now += 2000;
  goTo(RESPONSE_SLIDE_ITEM_1);
  const responseSlide = screen.getByRole('group', { name: 'Respuesta ítem 1' });

  expect(mockSwiper.allowSlideNext).toBe(false);
  clickNext();
  expect(within(responseSlide).getByText('Para continuar falta: respuesta, clasificación, categoría.')).toBeInTheDocument();

  fireEvent.change(within(responseSlide).getByLabelText('Respuesta del niño o niña'), { target: { value: '   ' } });
  expect(mockSwiper.allowSlideNext).toBe(false); // blank answer does not count
  fireEvent.change(within(responseSlide).getByLabelText('Respuesta del niño o niña'), { target: { value: 'le pido perdón' } });
  fireEvent.click(within(responseSlide).getByRole('radio', { name: 'Positivo' }));
  expect(within(responseSlide).getByText('Para continuar falta: categoría.')).toBeInTheDocument();
  expect(mockSwiper.allowSlideNext).toBe(false);

  fireEvent.change(within(responseSlide).getByRole('combobox', { name: 'Categoría ítem 1' }), { target: { value: '2' } });
  expect(mockSwiper.allowSlideNext).toBe(true);
  expect(within(responseSlide).queryByText(/Para continuar falta/)).not.toBeInTheDocument();

  // Going back to slide 1 and resetting the stopwatch blocks slide 2 again.
  goTo(SITUATION_SLIDE_ITEM_1);
  fireEvent.click(within(screen.getByRole('group', { name: 'Situación ítem 1' })).getByRole('button', { name: 'Reiniciar' }));
  goTo(RESPONSE_SLIDE_ITEM_1);
  expect(mockSwiper.allowSlideNext).toBe(false);
});

test('the response slide saves answer, classification and one category with the take', async () => {
  renderPage('ninos');
  await screen.findAllByText('Situación sintética uno');
  const codingSlide = screen.getByRole('group', { name: 'Respuesta ítem 1' });
  fireEvent.change(within(codingSlide).getByLabelText('Respuesta del niño o niña'), { target: { value: 'le pido perdón' } });
  fireEvent.click(within(codingSlide).getByRole('radio', { name: 'Positivo' }));
  const list = within(codingSlide).getByRole('combobox', { name: 'Categoría ítem 1' });
  expect(within(list).queryByRole('option', { name: 'Ignorar' })).not.toBeInTheDocument();
  fireEvent.change(list, { target: { value: '2' } });

  const [, answers] = await savedAnswers();
  expect(answers[500]).toEqual({ text: 'le pido perdón', time: null, classification: 'positivo', categories: [2] });
  expect(answers[501]).toEqual({ text: '', time: null, classification: null, categories: [] });
});

test('downloads the catalog when it is missing and the tablet is online', async () => {
  axios.get.mockResolvedValue({ data: catalog });
  renderPage('ninos', { withCatalog: false, online: true });
  await screen.findAllByText('Situación sintética uno');
  const codingSlide = screen.getByRole('group', { name: 'Respuesta ítem 1' });
  expect(await within(codingSlide).findByRole('radio', { name: 'Positivo' })).toBeInTheDocument();
  expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/\/coding\/wally-original\/catalog$/));
  expect(set).toHaveBeenCalledWith('coding/wally-original/catalog', catalog);
});

test('without a downloaded catalog only time and answer are required and coding is explained', async () => {
  let now = 1000;
  dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => now);
  renderPage('ninos', { withCatalog: false, online: false });
  await screen.findAllByText('Situación sintética uno');
  const codingSlide = screen.getByRole('group', { name: 'Respuesta ítem 1' });
  expect(within(codingSlide).getByText(/catálogo de codificación no está disponible/)).toBeInTheDocument();
  expect(within(codingSlide).queryByRole('radio')).not.toBeInTheDocument();

  goTo(SITUATION_SLIDE_ITEM_1);
  fireEvent.click(screen.getAllByRole('button', { name: 'Iniciar' })[0]);
  now += 1000;
  goTo(RESPONSE_SLIDE_ITEM_1);
  fireEvent.change(within(codingSlide).getByLabelText('Respuesta del niño o niña'), { target: { value: 'no sé' } });
  expect(mockSwiper.allowSlideNext).toBe(true);

  const [, answers] = await savedAnswers();
  expect(answers[500]).toEqual({ text: 'no sé', time: 1, classification: null, categories: [] });
});
