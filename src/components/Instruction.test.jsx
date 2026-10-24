import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { getMany, set } from 'idb-keyval';
import Swal from 'sweetalert2';
import Instruction from './Instruction';

jest.mock('idb-keyval', () => ({ getMany: jest.fn(), set: jest.fn() }));
jest.mock('sweetalert2', () => ({ fire: jest.fn() }));

// Regression pin (INSTR-002 added an optional collectAnswers prop): without it,
// Instruction keeps collecting one radio value per item by instrument name.
test('default save still collects the selected radio value per item', async () => {
  Swal.fire.mockResolvedValue({ isConfirmed: true });
  set.mockResolvedValue(undefined);
  getMany.mockResolvedValue([10, { id: 3 }, [], undefined]);

  render(
    <MemoryRouter>
      <form className="instrument-form">
        <input type="hidden" name="instrument" value="5" />
        <input type="hidden" name="key" value="42" />
        <input type="radio" name="Wally" value="3" defaultChecked />
      </form>
      <Instruction checkpoint={true} instruction="Fin" />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByRole('button', { name: 'Guardar test' }));

  await waitFor(() => expect(set).toHaveBeenCalledWith('completedTests', expect.any(Array)));
  const [[info, choices]] = set.mock.calls.find(([key]) => key === 'completedTests')[1];
  expect(info).toMatchObject({ instrument: 5, student_id: 10, user_id: 3 });
  expect(choices).toEqual({ 42: '3' });
});
