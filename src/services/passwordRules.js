// Same rules as the API (SEC-006 S4); the API has the final word.
export const MIN_PASSWORD_LENGTH = 10;

const MESSAGES = {
  PASSWORD_TOO_SHORT: `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`,
  PASSWORD_TOO_LONG: 'La contraseña es demasiado larga.',
  PASSWORD_EQUALS_EMAIL: 'La contraseña no puede ser tu correo.',
  PASSWORD_SAME_AS_CURRENT: 'La contraseña nueva debe ser distinta de la actual.',
  PASSWORD_MISMATCH: 'Las contraseñas no coinciden.',
  CURRENT_PASSWORD_INVALID: 'La contraseña actual no es correcta.',
  CHANGE_PERMIT_INVALID: 'El tiempo para crear la contraseña expiró. Vuelve a iniciar sesión.',
  TOO_MANY_ATTEMPTS: 'Demasiados intentos fallidos. Espera 15 minutos e intenta de nuevo.',
};

const DEFAULT_MESSAGE = 'No fue posible cambiar la contraseña. Intenta nuevamente.';

export const passwordErrorMessage = (code) => MESSAGES[code] || DEFAULT_MESSAGE;

const normalized = (value) => String(value || '').trim().toLowerCase();

// Live status of each rule, shown as a checklist while typing.
export function passwordRuleStatus(newPassword, confirmation, email = '') {
  const value = typeof newPassword === 'string' ? newPassword : '';
  return {
    length: value.length >= MIN_PASSWORD_LENGTH,
    notEmail: value !== '' && (!email || normalized(value) !== normalized(email)),
    matches: value !== '' && value === confirmation,
  };
}

// Returns an error code, or null when the input can be sent.
export function checkNewPassword(newPassword, confirmation, email = '') {
  const rules = passwordRuleStatus(newPassword, confirmation, email);
  if (!rules.length) return 'PASSWORD_TOO_SHORT';
  if (!rules.notEmail) return 'PASSWORD_EQUALS_EMAIL';
  if (!rules.matches) return 'PASSWORD_MISMATCH';
  return null;
}

// Error code from a failed axios call to the password endpoints.
export const errorCodeFrom = (error) =>
  (error && error.response && error.response.data && error.response.data.error) || null;
