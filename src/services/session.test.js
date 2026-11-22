import { installSessionHandling, SESSION_EXPIRED_MESSAGE } from './session';

function fakeClient() {
  const client = { defaults: {}, interceptors: { response: {} } };
  client.interceptors.response.use = (onFulfilled, onRejected) => {
    client.onFulfilled = onFulfilled;
    client.onRejected = onRejected;
    return 1;
  };
  return client;
}

function httpError(status, url) {
  return { response: { status }, config: { url } };
}

describe('installSessionHandling', () => {
  beforeEach(() => {
    document.cookie = 'id=7; path=/';
    document.cookie = 'email=user%40example.test; path=/';
  });

  test('sends credentials on every request', () => {
    const client = fakeClient();
    installSessionHandling(client, { pathname: '/', assign: jest.fn() });
    expect(client.defaults.withCredentials).toBe(true);
  });

  test('a 401 clears the session marker and goes to login, keeping the error', async () => {
    const client = fakeClient();
    const location = { pathname: '/', assign: jest.fn() };
    installSessionHandling(client, location);

    const error = httpError(401, 'https://api.example.test/students');
    await expect(client.onRejected(error)).rejects.toBe(error);

    expect(location.assign).toHaveBeenCalledWith('/login');
    expect(document.cookie).not.toMatch(/(^|; )id=/);
    expect(document.cookie).not.toMatch(/(^|; )email=/);
  });

  test('other errors and failed logins do not redirect', async () => {
    const client = fakeClient();
    const location = { pathname: '/', assign: jest.fn() };
    installSessionHandling(client, location);

    await expect(client.onRejected(httpError(500, 'https://api.example.test/students'))).rejects.toBeTruthy();
    await expect(client.onRejected(httpError(401, 'https://api.example.test/login'))).rejects.toBeTruthy();
    await expect(client.onRejected({ message: 'Network Error', config: { url: '/students' } })).rejects.toBeTruthy();

    expect(location.assign).not.toHaveBeenCalled();
    expect(document.cookie).toMatch(/(^|; )id=7/);
  });

  test('the expired-session message promises the pending tests are kept', () => {
    expect(SESSION_EXPIRED_MESSAGE).toMatch(/pendientes se conservan/);
  });
});
