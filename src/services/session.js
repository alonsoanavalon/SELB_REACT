import axios from 'axios';
import Cookies from 'universal-cookie';

export const SESSION_EXPIRED_MESSAGE =
  'Tu sesión expiró. Inicia sesión de nuevo para enviar los test; los test pendientes se conservan en este dispositivo.';

// The API authenticates with the HttpOnly `jwt` cookie, so every request must
// carry credentials. A 401 means that cookie expired: drop the client-side
// session marker and go to the login page. IndexedDB (pending tests,
// catalogs) is left untouched.
export function installSessionHandling(client = axios, location = window.location) {
  client.defaults.withCredentials = true;

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
        location.assign('/login');
      }

      return Promise.reject(error);
    }
  );
}
