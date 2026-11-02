import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import PullToRefreshGuard, { ALLOW_PULL_TO_REFRESH_CLASS } from './PullToRefreshGuard';

let navigate;
function CaptureNavigate() {
  navigate = useNavigate();
  return null;
}

const renderAt = (path) => render(
  <MemoryRouter initialEntries={[path]}>
    <PullToRefreshGuard />
    <CaptureNavigate />
    <Routes><Route path="*" element={null} /></Routes>
  </MemoryRouter>
);

const allowed = () => document.documentElement.classList.contains(ALLOW_PULL_TO_REFRESH_CLASS);

afterEach(() => document.documentElement.classList.remove(ALLOW_PULL_TO_REFRESH_CLASS));

test('pull to refresh is allowed only on the home page', () => {
  renderAt('/');
  expect(allowed()).toBe(true);
});

test('pull to refresh is blocked during a test and comes back on home', async () => {
  const { unmount } = renderAt('/wallyNinos');
  expect(allowed()).toBe(false);

  const { act } = await import('react-dom/test-utils');
  act(() => navigate('/'));
  expect(allowed()).toBe(true);
  act(() => navigate('/students'));
  expect(allowed()).toBe(false);
  unmount();
});
