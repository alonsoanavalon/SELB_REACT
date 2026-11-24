import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { get } from 'idb-keyval';
import Aside from './Aside';
import { notifyUserUpdated } from '../services/currentUser';

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
    for (const item of ['Inicio', 'Mis alumnos', 'Respaldo', 'Cambiar contraseña']) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
    expect(screen.queryByText('Datos')).not.toBeInTheDocument();
    expect(screen.queryByText('Ingresos')).not.toBeInTheDocument();
  });

  test('a role refreshed from the API updates the open menu', async () => {
    renderAs('Admin');
    expect(await screen.findByText('Datos')).toBeInTheDocument();

    get.mockResolvedValue({ id: 1, name: 'N', surname: 'S', role: 'Evaluator' });
    await act(async () => {
      notifyUserUpdated();
    });

    await waitFor(() => expect(screen.queryByText('Datos')).not.toBeInTheDocument());
    expect(screen.queryByText('Ingresos')).not.toBeInTheDocument();
  });
});
