import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { get } from 'idb-keyval';
import Aside from './Aside';

jest.mock('idb-keyval', () => ({ get: jest.fn() }));

function renderAs(role) {
  get.mockResolvedValue({ id: 1, name: 'N', surname: 'S', role });
  return render(
    <MemoryRouter>
      <Aside />
    </MemoryRouter>
  );
}

describe('Aside menu by role', () => {
  test('Admin sees Datos and Ingresos', async () => {
    renderAs('Admin');
    expect(await screen.findByText('Datos')).toBeInTheDocument();
    expect(screen.getByText('Ingresos')).toBeInTheDocument();
  });

  test('Evaluator sees the evaluation menu without Datos or Ingresos', async () => {
    renderAs('Evaluator');
    await waitFor(() => expect(get).toHaveBeenCalledWith('userData'));
    expect(await screen.findByText('Apoderados')).toBeInTheDocument();
    for (const item of ['Inicio', 'Mis alumnos', 'Respaldo']) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
    expect(screen.queryByText('Datos')).not.toBeInTheDocument();
    expect(screen.queryByText('Ingresos')).not.toBeInTheDocument();
  });
});
