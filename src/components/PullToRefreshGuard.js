import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// En tablets, deslizar el dedo de arriba hacia abajo recarga la página y puede
// interrumpir una toma. El gesto queda bloqueado (styles.css, html) salvo en el
// inicio ("/"), donde esta clase lo vuelve a permitir.
export const ALLOW_PULL_TO_REFRESH_CLASS = 'allow-pull-to-refresh';

export default function PullToRefreshGuard() {
    const { pathname } = useLocation();

    useEffect(() => {
        document.documentElement.classList.toggle(ALLOW_PULL_TO_REFRESH_CLASS, pathname === '/');
    }, [pathname]);

    return null;
}
