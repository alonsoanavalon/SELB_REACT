import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import ChangePassword from './ChangePassword';

jest.mock('axios');

function fill(current, newPassword, confirmation = newPassword) {
  fireEvent.change(screen.getByLabelText('Contraseña actual'), { target: { value: current } });
  fireEvent.change(screen.getByLabelText('Contraseña nueva'), { target: { value: newPassword } });
  fireEvent.change(screen.getByLabelText('Repite la contraseña nueva'), { target: { value: confirmation } });
  fireEvent.click(screen.getByRole('button', { name: 'Cambiar contraseña' }));
}

describe('ChangePassword', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    window.localStorage.clear();
    process.env.REACT_APP_API_URL = 'https://api.example.test';
  });

  test('sends the current and new password and keeps the new session token', async () => {
    axios.post.mockResolvedValue({ data: { status: true, token: 'token-new' } });
    render(<ChangePassword />);

    fill('current-password', 'a-new-valid-password');

    expect(await screen.findByText('Tu contraseña fue cambiada.')).toBeInTheDocument();
    expect(axios.post).toHaveBeenCalledWith('https://api.example.test/password/change', {
      currentPassword: 'current-password',
      newPassword: 'a-new-valid-password',
    });
    expect(window.localStorage.getItem('selbToken')).toBe('token-new');
  });

  test('shows why the API rejected the change', async () => {
    axios.post.mockRejectedValue({ response: { status: 400, data: { status: false, error: 'CURRENT_PASSWORD_INVALID' } } });
    render(<ChangePassword />);

    fill('wrong', 'a-new-valid-password');

    expect(await screen.findByText('La contraseña actual no es correcta.')).toBeInTheDocument();
    expect(screen.queryByText('Tu contraseña fue cambiada.')).not.toBeInTheDocument();
  });

  test('does not call the API when the confirmation differs', async () => {
    render(<ChangePassword />);

    fill('current-password', 'a-new-valid-password', 'different-password');

    expect(await screen.findByText('Las contraseñas no coinciden.')).toBeInTheDocument();
    await waitFor(() => expect(axios.post).not.toHaveBeenCalled());
  });
});
