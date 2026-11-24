import { ROLES } from '../components/constants';

// Screens of the evaluation app that only Admin sees (SEC-005 S2); the API
// enforces the same rule.
export const ADMIN_ONLY_PATHS = [
  '/excel',
  '/moments',
  '/sessions-logged',
  '/desarrollo',
  '/codificacion',
  '/admin-v1',
];

const normalizeRole = (role) => String(role || '').trim().toLowerCase();

export const isRole = (role, expected) => normalizeRole(role) === normalizeRole(expected);

export const isAdminRole = (role) => isRole(role, ROLES.ADMIN);

// Admin and Evaluator share the evaluation app.
export const usesEvaluationApp = (role) =>
  isRole(role, ROLES.ADMIN) || isRole(role, ROLES.EVALUATOR);

// The role kept on the device may be stale (e.g. Admin moved to Evaluator), so
// when online ask the API who the session belongs to. Offline, or on any error,
// the stored user is kept as is.
export async function refreshCurrentUser({ online, current, load, persist }) {
  if (!online) return current;

  try {
    const me = await load();
    if (!me || !me.role) return current;

    const next = {
      ...(current || {}),
      id: me.id,
      email: me.email,
      name: me.name,
      surname: me.surname,
      role: me.role,
    };
    await persist(next);
    return next;
  } catch (_error) {
    return current;
  }
}
