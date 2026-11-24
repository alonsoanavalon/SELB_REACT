import {
  ADMIN_ONLY_PATHS,
  isAdminRole,
  refreshCurrentUser,
  usesEvaluationApp,
} from './currentUser';

describe('role helpers', () => {
  test('Admin and Evaluator use the evaluation app; Teacher and Parent do not', () => {
    expect(usesEvaluationApp('Admin')).toBe(true);
    expect(usesEvaluationApp('Evaluator')).toBe(true);
    expect(usesEvaluationApp(' evaluator ')).toBe(true);
    expect(usesEvaluationApp('Teacher')).toBe(false);
    expect(usesEvaluationApp('Parent')).toBe(false);
    expect(usesEvaluationApp(undefined)).toBe(false);
  });

  test('only Admin is admin', () => {
    expect(isAdminRole('Admin')).toBe(true);
    expect(isAdminRole('admin')).toBe(true);
    expect(isAdminRole('Evaluator')).toBe(false);
    expect(isAdminRole(undefined)).toBe(false);
  });

  test('management screens are Admin-only and reports stay available', () => {
    expect(ADMIN_ONLY_PATHS).toEqual(
      expect.arrayContaining(['/excel', '/moments', '/sessions-logged', '/desarrollo', '/codificacion', '/admin-v1'])
    );
    for (const shared of ['/', '/students', '/respaldo', '/parents', '/report-panel', '/school-selector', '/sdq']) {
      expect(ADMIN_ONLY_PATHS).not.toContain(shared);
    }
  });
});

describe('refreshCurrentUser', () => {
  const stored = { id: 7, name: 'N', surname: 'S', role: 'Admin', email: 'user@example.test' };

  test('takes the role from the API and keeps it on the device', async () => {
    const persist = jest.fn();
    const result = await refreshCurrentUser({
      online: true,
      current: stored,
      load: async () => ({ id: 7, email: 'user@example.test', name: 'N', surname: 'S', role: 'Evaluator' }),
      persist,
    });

    expect(result.role).toBe('Evaluator');
    expect(persist).toHaveBeenCalledWith(expect.objectContaining({ id: 7, role: 'Evaluator' }));
  });

  test('offline or on errors the stored user is kept', async () => {
    const load = jest.fn();
    const persist = jest.fn();
    expect(await refreshCurrentUser({ online: false, current: stored, load, persist })).toBe(stored);
    expect(load).not.toHaveBeenCalled();

    const failing = async () => { throw new Error('Network Error'); };
    expect(await refreshCurrentUser({ online: true, current: stored, load: failing, persist })).toBe(stored);
    expect(await refreshCurrentUser({ online: true, current: stored, load: async () => ({}), persist })).toBe(stored);
    expect(persist).not.toHaveBeenCalled();
  });
});
