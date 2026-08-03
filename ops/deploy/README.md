# OPS-004 — artefactos de build y despliegue frontend

Estos archivos preparan releases estáticos por SHA. No se instalan ni ejecutan en
producción sin aprobar la spec y la ventana de OPS-004.

`npm run build:release` crea el build CRA, agrega el alias legado
`/static/js/bundle.js` exigido por el service worker `app-v2.0.24` y verifica que
el SW copiado al build sea byte a byte el versionado. No modifica `sw.js`,
IndexedDB, localStorage, `completedTests` ni `backupTest`.

PWA-001 cambia la estrategia del worker de forma versionada: navegación usa red
con fallback al app shell, otros GET usan cache-first y métodos no GET quedan fuera
del caché. No usa `skipWaiting`; `app-v2.0.21` se retira únicamente después de que
`app-v2.0.23` terminó de instalar y puede activarse fuera de una evaluación. La
`v2.0.22` fue sólo un piloto local y se reemplazó hacia delante antes de producción.

FE-002 versiona después la misma estrategia como `app-v2.0.24` para instalar el
nuevo dashboard y sus assets de forma atómica. Mantiene activación diferida, no
altera IndexedDB/localStorage y retira `app-v2.0.23` sólo al activar.

El runner productivo requiere el runtime fijado en `.node-version` y
`.npm-version`, una cache Git
bare de sólo lectura y un archivo privado `0600` con una única línea
`REACT_APP_API_URL=https://...`. Exporta el SHA sin `.git`, ejecuta `npm ci`,
construye antes de activar y cambia el symlink que lee Nginx. El rollback sólo
cambia el symlink; no borra cachés, datos locales ni releases.

La primera transición desde PM2 requiere el rollout documentado: sembrar el
release aprobado, instalar el bloque Nginx revisado, validar una tablet piloto y
recién entonces retirar de la lista PM2 únicamente el proceso frontend histórico.
Para preparar el primer release, antes de que Nginx use el layout estático, el
operador ejecuta `selb-deploy-frontend --initialize <full-sha>`. Este modo exige
que `current` no exista, rechaza una configuración Nginx que ya apunte al layout,
construye el release y crea `current` sin recargar Nginx ni crear `previous`.
Después de activar Nginx, el rollback inicial sigue siendo restaurar el proxy PM2;
el rollback por symlink queda disponible desde el siguiente release.

Los assets públicos viven bajo `/var/www/selb`; cache Git, locks y ejecutables
permanecen privados bajo `/opt/selb-deploy`. Esta separación evita conceder al
worker Nginx acceso de traversing al árbol privado de releases backend.

El ensayo local usa `test/nginx.conf` con una imagen Nginx aislada. El runner fue
probado contra un remoto Git y layout temporales en Node 17.6.0/npm 8.5.1:
activación, no-op, rollback, reuso de release inmutable y rollback automático ante
fallo de recarga. `test-deploy-tools.sh` cubre además inputs, lock y fallo sintético.

En producción el shell SSH puede resolver otro Node distinto del que usa PM2. La
instalación debe fijar `SELB_FRONTEND_NODE_BIN` al ejecutable Node 17.6.0 existente
y, sólo si `npm` no está junto a él, `SELB_FRONTEND_NPM_CLI`. El runner ejecuta npm
mediante ese Node y rechaza versiones distintas antes de instalar dependencias.
