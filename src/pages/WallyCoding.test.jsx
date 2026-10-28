import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import * as api from '../services/adminV1Api';
import WallyCoding from './WallyCoding';

jest.mock('../services/adminV1Api', () => ({
  listStudies: jest.fn(),
  listStudyMoments: jest.fn(),
  getWallyCodingCatalog: jest.fn(),
  listWallyCodingEvaluations: jest.fn(),
  getWallyCodingEvaluation: jest.fn(),
  saveWallyCodingEvaluation: jest.fn(),
}));

const categories = [
  { id: 2, name: 'Pedir disculpas', classification: 'positivo' },
  { id: 45, name: 'Compartir', classification: 'positivo' },
  { id: 36, name: 'Respuesta fisica negativa para la persona', classification: 'negativo' },
  { id: 30, name: 'Ignorar', classification: 'neutro' },
  ...[1, 3, 5, 6, 8].map((id) => ({ id, name: `Positiva ${id}`, classification: 'positivo' })),
];

const evaluation = {
  instrumentId: 28,
  version: 'v1',
  items: [
    { itemId: 501, num: 1, title: 'Situación sintética uno', picture: '/instruments/wallyOriginal/ninos/1.jpg', text: "le pido 'perdón'", time: '4', classification: null, categories: [] },
    { itemId: 502, num: 2, title: 'Situación sintética dos', picture: null, text: '', time: null, classification: 'neutro', categories: [30] },
  ],
};

beforeEach(() => {
  api.listStudies.mockResolvedValue({ data: [{ id: 900, name: 'Estudio sintético', year: '2099' }] });
  api.listStudyMoments.mockResolvedValue({ data: [{ id: 901, begin: '2099-01-01', until: '2099-06-30' }] });
  api.getWallyCodingCatalog.mockResolvedValue({ data: { categories, maxCategoriesPerItem: 1 } });
  api.listWallyCodingEvaluations.mockResolvedValue({
    data: [{ instrumentListId: 77, studentName: 'Alumna Sintética', course: '1 A', school: 'Colegio', evaluator: 'Evaluador', date: '2099-03-04T12:00:00.000Z', items: 2, coded: 1, status: 'parcial' }],
  });
  api.getWallyCodingEvaluation.mockResolvedValue({ data: evaluation });
});

async function openEvaluation() {
  render(<WallyCoding />);
  fireEvent.change(await screen.findByLabelText('Estudio'), { target: { value: '900' } });
  fireEvent.click(await screen.findByRole('button', { name: 'Buscar tomas' }));
  fireEvent.click(await screen.findByRole('button', { name: 'Codificar Alumna Sintética' }));
  return screen.findByText('Situación sintética uno');
}

test('lists evaluations of the selected instrument, study and moment with their status', async () => {
  render(<WallyCoding />);
  fireEvent.change(await screen.findByLabelText('Instrumento'), { target: { value: '29' } });
  fireEvent.change(await screen.findByLabelText('Estudio'), { target: { value: '900' } });
  await waitFor(() => expect(api.listStudyMoments).toHaveBeenCalledWith(900, expect.anything()));
  fireEvent.change(screen.getByLabelText('Momento'), { target: { value: '901' } });
  fireEvent.click(screen.getByRole('button', { name: 'Buscar tomas' }));

  expect(await screen.findByText('Alumna Sintética')).toBeInTheDocument();
  expect(screen.getByText('Parcial')).toBeInTheDocument();
  expect(api.listWallyCodingEvaluations).toHaveBeenCalledWith({ instrumentId: 29, studyId: 900, momentId: 901 });
});

test('shows the answer read-only and loads the category list of the chosen classification', async () => {
  await openEvaluation();
  const item = screen.getByRole('group', { name: 'Ítem 1' });
  expect(within(item).getByText("le pido 'perdón'")).toBeInTheDocument();
  expect(within(item).getByText('4 s')).toBeInTheDocument();
  expect(within(item).queryByRole('combobox')).not.toBeInTheDocument();

  fireEvent.click(within(item).getByRole('radio', { name: 'Negativo' }));
  const list = within(item).getByRole('combobox', { name: 'Categoría ítem 1' });
  expect(within(list).getByRole('option', { name: 'Respuesta fisica negativa para la persona' })).toBeInTheDocument();
  expect(within(list).queryByRole('option', { name: 'Pedir disculpas' })).not.toBeInTheDocument();

  fireEvent.change(list, { target: { value: '36' } });
  expect(list).toHaveValue('36');
  fireEvent.click(within(item).getByRole('radio', { name: 'Positivo' }));
  // Changing the classification clears the category of the previous one.
  expect(within(item).getByRole('combobox', { name: 'Categoría ítem 1' })).toHaveValue('');
});

test('allows only one category per item', async () => {
  await openEvaluation();
  const item = screen.getByRole('group', { name: 'Ítem 1' });
  fireEvent.click(within(item).getByRole('radio', { name: 'Positivo' }));
  const list = within(item).getByRole('combobox', { name: 'Categoría ítem 1' });
  expect(list).not.toHaveAttribute('multiple');
  expect(within(list).getAllByRole('option')).toHaveLength(8); // placeholder + 7 positive
});

test('saves classification and categories of every item with the loaded version', async () => {
  api.saveWallyCodingEvaluation.mockResolvedValue({ data: { ...evaluation, version: 'v2' } });
  await openEvaluation();
  const item = screen.getByRole('group', { name: 'Ítem 1' });
  fireEvent.click(within(item).getByRole('radio', { name: 'Positivo' }));
  const list = within(item).getByRole('combobox', { name: 'Categoría ítem 1' });
  fireEvent.change(list, { target: { value: '2' } });
  fireEvent.change(list, { target: { value: '45' } });
  fireEvent.click(screen.getByRole('button', { name: 'Guardar codificación' }));

  await waitFor(() => expect(api.saveWallyCodingEvaluation).toHaveBeenCalledWith(77, {
    version: 'v1',
    items: [
      { itemId: 501, classification: 'positivo', categories: [45] },
      { itemId: 502, classification: 'neutro', categories: [30] },
    ],
  }));
  expect(await screen.findByText('Codificación guardada.')).toBeInTheDocument();
});

test('explains a version conflict and keeps what was entered', async () => {
  api.saveWallyCodingEvaluation.mockRejectedValue({ response: { status: 409 } });
  await openEvaluation();
  const item = screen.getByRole('group', { name: 'Ítem 1' });
  fireEvent.click(within(item).getByRole('radio', { name: 'Positivo' }));
  fireEvent.click(screen.getByRole('button', { name: 'Guardar codificación' }));

  expect(await screen.findByRole('alert')).toHaveTextContent('Otra persona modificó esta codificación');
  expect(within(item).getByRole('radio', { name: 'Positivo' })).toBeChecked();
});
