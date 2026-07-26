---
sidebar_position: 5
title: Web App
---

# Web App Development

The web app is the browser client at [app.beatbax.com](https://app.beatbax.com) (`web-lite` profile). Work here for browser playback, editor UX, validation UI, and hosted presentation.

## Commands

```powershell
npm run web-ui:dev       # usually http://localhost:5173
npm run web-ui:build
npm -w @beatbax/web-ui run test
```

## Architecture

- Profile: `__CLIENT_PROFILE__ = "web-lite"` via `vite.config.ts`.
- Shared logic: `@beatbax/app-core` (stores, playback, editor core, parse pipeline).
- UI shell: vanilla TypeScript + DOM (`src/main.ts`, `src/app/`, `src/ui/`, `src/panels/`).
- Save downloads `.bax` files; no native path picker.
- Desktop-only capabilities (exports UI, Copilot, mixer, pattern grid, Settings modal, CodeLens, command palette) are gated out via `getCurrentCapabilities()`.
- Desktop does not import web-ui panel modules; Copilot lives only in `apps/desktop`.

## Related docs

- [Web-lite user guide](/docs/tools/web-client)
- [Desktop app development](/docs/development/desktop-app)
- [Engine development](/docs/development/engine)
- [packages/app-core README](https://github.com/kadraman/beatbax/blob/main/packages/app-core/README.md)
