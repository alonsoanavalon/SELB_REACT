import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import md5 from 'md5';
import Login from './Login';

jest.mock('axios');
jest.mock('idb-keyval', () => ({ set: jest.fn() }));

function submit(username, password) {
  fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: username } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: password } });
  fireEvent.click(screen.getByText('Ingresar'));
}

describe('Login', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    process.env.REACT_APP_API_URL = 'https://api.example.test';
  });

  test('sends the credentials in a POST body, never in the URL', async () => {
    axios.post.mockResolvedValue({ data: { status: false } });
    render(<Login />);

    submit('user@example.test', 'secret');

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    const [url, body, config] = axios.post.mock.calls[0];
    expect(url).toBe('https://api.example.test/login');
    expect(url).not.toMatch(/secret|user@example/);
    expect(body).toEqual({ email: 'user@example.test', password: md5('secret') });
    expect(config).toEqual({ withCredentials: true });
    expect(axios).not.toHaveBeenCalled();
    expect(await screen.findByText('Datos incorrectos')).toBeInTheDocument();
  });

  test('explains the temporary block after too many failed attempts', async () => {
    axios.post.mockRejectedValue({ response: { status: 429 } });
    render(<Login />);

    submit('user@example.test', 'secret');

    expect(await screen.findByText(/Demasiados intentos fallidos/)).toBeInTheDocument();
  });
});
