import React, { useState } from 'react';
import { MIN_PASSWORD_LENGTH, checkNewPassword, passwordErrorMessage } from '../services/passwordRules';

// Shared by the forced change at login and the voluntary change in the menu.
// `onSubmit` resolves to an error code, or null on success.
export default function PasswordForm({ askCurrent = false, submitLabel, onSubmit }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const invalid = checkNewPassword(newPassword, confirmation);
    if (invalid) {
      setError(invalid);
      return;
    }

    setSending(true);
    setError(null);
    const result = await onSubmit({ currentPassword, newPassword });
    setSending(false);
    if (result) setError(result);
  }

  return (
    <form className="password-form" onSubmit={handleSubmit} noValidate>
      {askCurrent && (
        <label>
          Contraseña actual
          <input
            type="password"
            name="currentPassword"
            autoComplete="current-password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
          />
        </label>
      )}
      <label>
        Contraseña nueva
        <input
          type="password"
          name="newPassword"
          autoComplete="new-password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />
      </label>
      <label>
        Repite la contraseña nueva
        <input
          type="password"
          name="confirmation"
          autoComplete="new-password"
          value={confirmation}
          onChange={(event) => setConfirmation(event.target.value)}
        />
      </label>
      <small>Mínimo {MIN_PASSWORD_LENGTH} caracteres. No uses tu correo.</small>

      {error && (
        <div className="alert alert-warning" role="alert">{passwordErrorMessage(error)}</div>
      )}

      <button type="submit" className="btn btn-primary" disabled={sending}>
        {sending ? 'Guardando…' : submitLabel}
      </button>
    </form>
  );
}
