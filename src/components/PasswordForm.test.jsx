import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import PasswordForm from './PasswordForm';

const ruleState = (name) => screen.getByText(name).closest('li').getAttribute('data-ok');

describe('PasswordForm', () => {
  test('each password field can be shown and hidden', () => {
    render(<PasswordForm askCurrent submitLabel="Guardar" onSubmit={jest.fn()} />);
    const field = screen.getByLabelText('Contraseña nueva');
    expect(field).toHaveAttribute('type', 'password');

    const group = field.closest('.password-field');
    fireEvent.click(within(group).getByRole('button', { name: 'Mostrar contraseña' }));
    expect(field).toHaveAttribute('type', 'text');
    fireEvent.click(within(group).getByRole('button', { name: 'Ocultar contraseña' }));
    expect(field).toHaveAttribute('type', 'password');

    expect(screen.getByLabelText('Contraseña actual')).toHaveAttribute('type', 'password');
    expect(screen.getByLabelText('Repite la contraseña nueva')).toHaveAttribute('type', 'password');
  });

  test('rules are checked while typing', () => {
    render(<PasswordForm email="user@example.test" submitLabel="Guardar" onSubmit={jest.fn()} />);
    expect(ruleState('Mínimo 10 caracteres')).toBe('false');
    expect(ruleState('Distinta de tu correo')).toBe('false');
    expect(ruleState('Ambas contraseñas coinciden')).toBe('false');

    fireEvent.change(screen.getByLabelText('Contraseña nueva'), { target: { value: 'User@Example.test' } });
    expect(ruleState('Mínimo 10 caracteres')).toBe('true');
    expect(ruleState('Distinta de tu correo')).toBe('false');

    fireEvent.change(screen.getByLabelText('Contraseña nueva'), { target: { value: 'a-synthetic-password' } });
    expect(ruleState('Distinta de tu correo')).toBe('true');
    expect(ruleState('Ambas contraseñas coinciden')).toBe('false');

    fireEvent.change(screen.getByLabelText('Repite la contraseña nueva'), { target: { value: 'a-synthetic-password' } });
    expect(ruleState('Ambas contraseñas coinciden')).toBe('true');
  });

  test('the email rule is checked before sending', () => {
    const onSubmit = jest.fn();
    render(<PasswordForm email="user@example.test" submitLabel="Guardar" onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText('Contraseña nueva'), { target: { value: 'user@example.test' } });
    fireEvent.change(screen.getByLabelText('Repite la contraseña nueva'), { target: { value: 'user@example.test' } });
    fireEvent.click(screen.getByRole('button', { name: 'Guardar' }));
    expect(screen.getByRole('alert')).toHaveTextContent('La contraseña no puede ser tu correo.');
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
