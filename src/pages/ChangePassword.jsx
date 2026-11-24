import React, { useState } from 'react';
import axios from 'axios';
import PasswordForm from '../components/PasswordForm';
import { saveSessionToken } from '../services/session';
import { errorCodeFrom } from '../services/passwordRules';

// Voluntary password change from the menu, available to every role (SEC-006 S4).
export default function ChangePassword() {
  const [done, setDone] = useState(false);

  async function changePassword({ currentPassword, newPassword }) {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/password/change`, {
        currentPassword,
        newPassword,
      });
      saveSessionToken(response.data.token);
      setDone(true);
      return null;
    } catch (error) {
      return errorCodeFrom(error) || 'UNKNOWN';
    }
  }

  return (
    <div className="container py-4" style={{ maxWidth: '480px' }}>
      <h2>Cambiar contraseña</h2>
      {done ? (
        <div className="alert alert-success" role="status">Tu contraseña fue cambiada.</div>
      ) : (
        <PasswordForm askCurrent submitLabel="Cambiar contraseña" onSubmit={changePassword} />
      )}
    </div>
  );
}
