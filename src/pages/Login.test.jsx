import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Login from './Login';

jest.mock('axios');
jest.mock('idb-keyval', () => ({ set: jest.fn() }));

function submit(username, password) {
  fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: username } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: password } });
  fireEvent.click(screen.getByText('Ingresar'));
}

function fillNewPassword(newPassword, confirmation = newPassword) {
  fireEvent.change(screen.getByLabelText('Contraseña nueva'), { target: { value: newPassword } });
  fireEvent.change(screen.getByLabelText('Repite la contraseña nueva'), { target: { value: confirmation } });
  fireEvent.click(screen.getByText('Guardar y entrar'));
}

const SESSION = { status: true, token: 'token-abc', id: 7, email: 'user@example.test', name: 'N', surname: 'S', role: 'Evaluator' };

describe('Login', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    window.localStorage.clear();
    process.env.REACT_APP_API_URL = 'https://api.example.test';
    delete window.location;
    window.location = { href: '' };
  });

  test('sends the typed password in a POST body, never in the URL nor hashed', async () => {
    axios.post.mockResolvedValue({ data: { status: false } });
    render(<Login />);

    submit('user@example.test', 'secret');

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    const [url, body, config] = axios.post.mock.calls[0];
    expect(url).toBe('https://api.example.test/login');
    expect(url).not.toMatch(/secret|user@example/);
    expect(body).toEqual({ email: 'user@example.test', password: 'secret' });
    expect(config).toEqual({ withCredentials: true });
    expect(axios).not.toHaveBeenCalled();
    expect(await screen.findByText('Datos incorrectos')).toBeInTheDocument();
  });

  test('keeps the session token for browsers that block third-party cookies', async () => {
    axios.post.mockResolvedValue({ data: SESSION });
    render(<Login />);

    submit('user@example.test', 'secret');

    await waitFor(() => expect(window.localStorage.getItem('selbToken')).toBe('token-abc'));
    expect(window.location.href).toBe('/');
  });

  test('explains the temporary block after too many failed attempts', async () => {
    axios.post.mockRejectedValue({ response: { status: 429 } });
    render(<Login />);

    submit('user@example.test', 'secret');

    expect(await screen.findByText(/Demasiados intentos fallidos/)).toBeInTheDocument();
  });

  test('a flagged account creates its new password before entering', async () => {
    axios.post
      .mockResolvedValueOnce({ data: { status: false, passwordChangeRequired: true, changeToken: 'permit-1' } })
      .mockResolvedValueOnce({ data: SESSION });
    render(<Login />);

    submit('user@example.test', 'old-password');
    expect(await screen.findByText('Crea tu nueva contraseña')).toBeInTheDocument();
    expect(window.localStorage.getItem('selbToken')).toBeNull();

    fillNewPassword('short');
    expect(await screen.findByText(/al menos 10 caracteres/)).toBeInTheDocument();
    fillNewPassword('a-new-valid-password', 'something-else');
    expect(await screen.findByText('Las contraseñas no coinciden.')).toBeInTheDocument();
    expect(axios.post).toHaveBeenCalledTimes(1);

    fillNewPassword('a-new-valid-password');
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(2));
    const [url, body] = axios.post.mock.calls[1];
    expect(url).toBe('https://api.example.test/password/required');
    expect(body).toEqual({ changeToken: 'permit-1', newPassword: 'a-new-valid-password' });
    await waitFor(() => expect(window.localStorage.getItem('selbToken')).toBe('token-abc'));
    expect(window.location.href).toBe('/');
  });

  test('shows the API reason when the new password is rejected, and handles an expired permit', async () => {
    axios.post
      .mockResolvedValueOnce({ data: { status: false, passwordChangeRequired: true, changeToken: 'permit-1' } })
      .mockRejectedValueOnce({ response: { status: 400, data: { status: false, error: 'PASSWORD_SAME_AS_CURRENT' } } })
      .mockRejectedValueOnce({ response: { status: 400, data: { status: false, error: 'CHANGE_PERMIT_INVALID' } } });
    render(<Login />);

    submit('user@example.test', 'old-password');
    await screen.findByText('Crea tu nueva contraseña');

    // Checked in the browser with the typed email: never sent to the API.
    fillNewPassword('User@Example.test');
    expect(await screen.findByText('La contraseña no puede ser tu correo.')).toBeInTheDocument();
    expect(axios.post).toHaveBeenCalledTimes(1);

    fillNewPassword('the-old-password');
    expect(await screen.findByText('La contraseña nueva debe ser distinta de la actual.')).toBeInTheDocument();

    fillNewPassword('a-new-valid-password');
    expect(await screen.findByText(/expiró\. Vuelve a iniciar sesión/)).toBeInTheDocument();
    expect(screen.getByText('Ingresar')).toBeInTheDocument();
  });
});
