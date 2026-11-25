import React, { useState } from 'react';
import {
  MIN_PASSWORD_LENGTH,
  checkNewPassword,
  passwordErrorMessage,
  passwordRuleStatus,
} from '../services/passwordRules';

const EyeIcon = ({ open }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    {open ? (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </>
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    )}
  </svg>
);

function PasswordField({ id, label, autoComplete, value, onChange }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="password-field">
      <label htmlFor={id}>{label}</label>
      <div className="password-input">
        <input
          id={id}
          name={id}
          type={visible ? 'text' : 'password'}
          autoComplete={autoComplete}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <button
          type="button"
          className="password-toggle"
          aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          aria-pressed={visible}
          onClick={() => setVisible(!visible)}
        >
          <EyeIcon open={!visible} />
        </button>
      </div>
    </div>
  );
}

// Shared by the forced change at login and the voluntary change in the menu.
// `onSubmit` resolves to an error code, or null on success.
export default function PasswordForm({ askCurrent = false, email = '', submitLabel, onSubmit }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);

  const rules = passwordRuleStatus(newPassword, confirmation, email);

  async function handleSubmit(event) {
    event.preventDefault();
    const invalid = checkNewPassword(newPassword, confirmation, email);
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
        <PasswordField
          id="currentPassword"
          label="Contraseña actual"
          autoComplete="current-password"
          value={currentPassword}
          onChange={setCurrentPassword}
        />
      )}
      <PasswordField
        id="newPassword"
        label="Contraseña nueva"
        autoComplete="new-password"
        value={newPassword}
        onChange={setNewPassword}
      />
      <PasswordField
        id="confirmation"
        label="Repite la contraseña nueva"
        autoComplete="new-password"
        value={confirmation}
        onChange={setConfirmation}
      />

      <ul className="password-rules" aria-live="polite">
        <li data-ok={String(rules.length)}>Mínimo {MIN_PASSWORD_LENGTH} caracteres</li>
        <li data-ok={String(rules.notEmail)}>Distinta de tu correo</li>
        <li data-ok={String(rules.matches)}>Ambas contraseñas coinciden</li>
      </ul>

      {error && (
        <div className="alert alert-warning" role="alert">{passwordErrorMessage(error)}</div>
      )}

      <button type="submit" className="btn btn-primary password-submit" disabled={sending}>
        {sending ? 'Guardando…' : submitLabel}
      </button>
    </form>
  );
}
