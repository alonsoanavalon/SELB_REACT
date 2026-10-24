import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { get, getMany, set } from 'idb-keyval';
import Swal from 'sweetalert2';
import WallyOriginal from './WallyOriginal';

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

function renderPage(variant = 'ninos') {
  get.mockImplementation((key) => Promise.resolve({
    selectedStudentName: 'Alumno sintético',
    'instrument/28': items,
    'instrument/29': items,
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

test('shows assent, gendered instruction and items ordered by num with their image', async () => {
  renderPage('ninos');
  const first = await screen.findByText('Situación sintética uno');
  const second = screen.getByText('Situación sintética dos');
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

test('typing stops the stopwatch and one save stores text and seconds per item', async () => {
  let now = 1000;
  dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => now);
  renderPage('ninos');
  await screen.findByText('Situación sintética uno');

  fireEvent.click(screen.getAllByRole('button', { name: 'Iniciar' })[0]);
  now += 6500;
  const [firstAnswer] = screen.getAllByLabelText('Respuesta del niño o niña');
  fireEvent.change(firstAnswer, { target: { value: "le dije 'para' 😀" } });

  expect(firstAnswer).toHaveValue("le dije 'para' ");
  expect(screen.getByRole('alert')).toHaveTextContent('caracteres no admitidos');
  expect(screen.getAllByRole('button', { name: 'Detener' })[0]).toBeDisabled();
  now += 4000; // stopped: further time is not counted
  expect(screen.getByText('6.5 s')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Guardar test' }));

  await waitFor(() => expect(set).toHaveBeenCalledWith('completedTests', expect.any(Array)));
  const [[info, answers]] = set.mock.calls.find(([key]) => key === 'completedTests')[1];
  expect(info).toMatchObject({ instrument: 28, student_id: 10, user_id: 3 });
  expect(answers).toEqual({
    500: { text: "le dije 'para' ", time: 7 },
    501: { text: '', time: null },
  });
});
