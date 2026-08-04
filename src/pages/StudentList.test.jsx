import { fireEvent, render, screen } from '@testing-library/react';
import Student from '../components/Student';
import InstrumentsList from '../components/InstrumentsList';
import {
  filterStudents,
  normalizeStudentQuery,
  persistStudentSelection,
  sortStudents,
} from './StudentList';

const students = [
  {
    studentId: 2,
    name: 'Álvaro',
    surname: 'Zapata',
    rut: '22.222.222-2',
    gender: 'M',
    level: '4',
    letter: 'B',
  },
  {
    studentId: 1,
    name: 'Beatriz',
    surname: 'Álvarez',
    rut: '11.111.111-1',
    gender: 'F',
    level: '4',
    letter: 'A',
  },
];

test('normalizes and filters students locally by name or RUT', () => {
  expect(normalizeStudentQuery('  ÁLVA  ')).toBe('alva');
  expect(filterStudents(students, 'alvarez').map(({ studentId }) => studentId)).toEqual([1]);
  expect(filterStudents(students, '22.222').map(({ studentId }) => studentId)).toEqual([2]);
});

test('sorts students by surname and then name without mutating the catalog', () => {
  const sorted = sortStudents(students);

  expect(sorted.map(({ studentId }) => studentId)).toEqual([1, 2]);
  expect(students.map(({ studentId }) => studentId)).toEqual([2, 1]);
});

test('preserves the existing IndexedDB selection contract', async () => {
  const store = jest.fn(() => Promise.resolve());

  await persistStudentSelection(students[0], store);

  expect(store.mock.calls).toEqual([
    ['selectedStudent', '2'],
    ['selectedStudentName', 'Álvaro Zapata'],
    ['selectedStudentGender', 'M'],
  ]);
});

test('selects the same student when the icon is clicked', () => {
  const onSelect = jest.fn();
  render(
    <table>
      <tbody>
        <Student student={students[0]} onSelect={onSelect} />
      </tbody>
    </table>
  );

  fireEvent.click(screen.getByTestId('student-icon-2'));
  expect(onSelect).toHaveBeenCalledWith(students[0]);
});

test('renders all instruments in a controlled modal and closes with Escape', () => {
  const onClose = jest.fn();
  const onSelect = jest.fn();
  const instruments = Array.from({ length: 26 }, (_, index) => ({
    id: index + 1,
    name: `Instrumento ${index + 1}`,
    instrument_type_id: 1,
  }));

  render(
    <InstrumentsList
      instruments={instruments}
      open
      selectedStudent={{ displayName: 'Estudiante de prueba' }}
      onClose={onClose}
      onSelect={onSelect}
    />
  );

  expect(screen.getAllByRole('button', { name: /Instrumento/ })).toHaveLength(26);
  fireEvent.click(screen.getByTestId('instrument-icon-6'));
  expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: 6 }));

  fireEvent.keyDown(document, { key: 'Escape' });
  expect(onClose).toHaveBeenCalledTimes(1);
});
