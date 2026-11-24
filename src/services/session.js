import axios from 'axios';
import Cookies from 'universal-cookie';

export const SESSION_EXPIRED_MESSAGE =
  'Tu sesión expiró. Inicia sesión de nuevo para enviar los test; los test pendientes se conservan en este dispositivo.';

// The web and the API are different sites, so browsers that block third-party
// cookies (Safari, incognito) drop the HttpOnly `jwt` cookie. The same token is
// kept here and sent as a Bearer header; logout clears localStorage.
export const SESSION_TOKEN_KEY = 'selbToken';

export function saveSessionToken(token) {
  if (typeof token === 'string' && token) {
    window.localStorage.setItem(SESSION_TOKEN_KEY, token);
  }
}

export function authHeaders() {
  const token = window.localStorage.getItem(SESSION_TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Every request carries the session (cookie and Bearer header). A 401 means it
// expired: drop the client-side session marker and go to the login page.
// IndexedDB (pending tests, catalogs) is left untouched.
export function installSessionHandling(client = axios, location = window.location) {
  client.defaults.withCredentials = true;

  client.interceptors.request.use((config) => {
    const { Authorization } = authHeaders();
    config.headers = config.headers || {};
    if (Authorization && !config.headers.Authorization) {
      config.headers.Authorization = Authorization;
    }
    return config;
  });

  return client.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error && error.response && error.response.status;
      const url = (error && error.config && error.config.url) || '';
      const isLoginRequest = /\/login(\?|$)/.test(url);

      if (status === 401 && !isLoginRequest && location.pathname !== '/login') {
        const cookies = new Cookies();
        cookies.remove('id', { path: '/' });
        cookies.remove('email', { path: '/' });
        window.localStorage.removeItem(SESSION_TOKEN_KEY);
        location.assign('/login');
      }

      return Promise.reject(error);
    }
  );
}
