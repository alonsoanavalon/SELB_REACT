# SELB frontend agent instructions

## Context

This is the independent React/PWA repository. The backend is the sibling repository
`../SELB/`; shared project knowledge is stored one level above.

Before any frontend analysis or change, read:

1. [`../PROJECT_CONTEXT.md`](../PROJECT_CONTEXT.md)
2. [`../docs/NEXT_SESSION.md`](../docs/NEXT_SESSION.md)
3. [`../docs/README.md`](../docs/README.md)
4. [`../docs/baseline/2026-07-25/02-arquitectura-actual-y-mapa-codigo.md`](../docs/baseline/2026-07-25/02-arquitectura-actual-y-mapa-codigo.md)
5. [`../docs/baseline/2026-07-25/05-evaluacion-offline-y-sincronizacion.md`](../docs/baseline/2026-07-25/05-evaluacion-offline-y-sincronizacion.md)
6. The active feature spec for the task.

The baseline is historical as of 2026-07-25. Verify current code and stored-data
formats before making implementation claims.

## Frontend and PWA constraints

- Offline evaluation is a core product capability, not an optional enhancement.
- Do not change IndexedDB/localStorage keys or payload shape without a schema
  version and migration for existing tablets.
- Never clear pending evaluations as part of login, logout, cache activation or
  update unless an approved recovery flow explicitly handles them.
- Await durable local writes before showing success or navigating.
- Handle double click, reload, loss of connectivity, partial sync and retry.
- Keep Admin study selection explicit; Evaluator remains scoped to one study.
- Frontend role routing is not authorization. Backend enforcement is still required.
- Do not cache or log more student data than the approved offline scope requires.
- Preserve old client/server compatibility according to the active feature rollout.

## Current commands

From this repository:

```text
npm start
npm run build
npm test -- --watchAll=false
```

Run the smallest relevant verification first. A PWA/offline change also requires the
manual and automated scenarios listed in its feature spec; a successful build alone
is insufficient.

## Completion

A frontend change is not complete until online, offline, upgrade and recovery
behavior are verified and the feature/change documentation and inventories are
updated.
