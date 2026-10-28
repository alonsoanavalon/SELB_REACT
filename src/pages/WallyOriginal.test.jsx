import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
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
jest.mock('swiper/react', () => ({
  Swiper: ({ children }) => <div>{children}</div>,
  SwiperSlide: ({ children }) => <div>{children}</div>,
}));
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

test('slide 1 shows only the statement and image; slide 2 adds stopwatch, answer and coding', async () => {
  renderPage('ninos');
  await screen.findAllByText('Situación sintética uno');
  const situationSlide = screen.getByRole('group', { name: 'Situación ítem 1' });
  const responseSlide = screen.getByRole('group', { name: 'Respuesta ítem 1' });
  expect(situationSlide.compareDocumentPosition(responseSlide) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

  expect(within(situationSlide).getByText('Situación sintética uno')).toBeInTheDocument();
  expect(within(situationSlide).getByAltText('Situación 1')).toBeInTheDocument();
  expect(within(situationSlide).queryByRole('button')).not.toBeInTheDocument();
  expect(within(situationSlide).queryByRole('textbox')).not.toBeInTheDocument();
  expect(within(situationSlide).queryByRole('radio')).not.toBeInTheDocument();

  expect(within(responseSlide).getByText('Situación sintética uno')).toBeInTheDocument();
  expect(within(responseSlide).getByAltText('Situación 1 (respuesta)')).toHaveAttribute('src', '/instruments/wallyOriginal/ninos/1.jpg');
  expect(within(responseSlide).getByRole('button', { name: 'Iniciar' })).toBeInTheDocument();
  expect(within(responseSlide).getByLabelText('Respuesta del niño o niña')).toBeInTheDocument();
  expect(within(responseSlide).getByRole('radio', { name: 'Positivo' })).toBeInTheDocument();

  // Item 2 starts after both slides of item 1.
  const nextSituation = screen.getByRole('group', { name: 'Situación ítem 2' });
  expect(responseSlide.compareDocumentPosition(nextSituation) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
});

test('typing stops the stopwatch and one save stores text and seconds per item', async () => {
  let now = 1000;
  dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => now);
  renderPage('ninos');
  await screen.findAllByText('Situación sintética uno');

  fireEvent.click(screen.getAllByRole('button', { name: 'Iniciar' })[0]);
  now += 6500;
  const [firstAnswer] = screen.getAllByLabelText('Respuesta del niño o niña');
  fireEvent.change(firstAnswer, { target: { value: "le dije 'para' 😀" } });

  expect(firstAnswer).toHaveValue("le dije 'para' ");
  expect(screen.getByRole('alert')).toHaveTextContent('caracteres no admitidos');
  expect(screen.getAllByRole('button', { name: 'Detener' })[0]).toBeDisabled();
  now += 4000; // stopped: further time is not counted
  expect(screen.getByText('6.5 s')).toBeInTheDocument();

  const [info, answers] = await savedAnswers();
  expect(info).toMatchObject({ instrument: 28, student_id: 10, user_id: 3 });
  expect(answers).toEqual({
    500: { text: "le dije 'para' ", time: 7, classification: null, categories: [] },
    501: { text: '', time: null, classification: null, categories: [] },
  });
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

test('without a downloaded catalog the take can still be saved and explains how to code later', async () => {
  renderPage('ninos', { withCatalog: false, online: false });
  await screen.findAllByText('Situación sintética uno');
  const codingSlide = screen.getByRole('group', { name: 'Respuesta ítem 1' });
  expect(within(codingSlide).getByText(/catálogo de codificación no está disponible/)).toBeInTheDocument();
  expect(within(codingSlide).queryByRole('radio')).not.toBeInTheDocument();

  const [, answers] = await savedAnswers();
  expect(answers[500]).toEqual({ text: '', time: null, classification: null, categories: [] });
});
