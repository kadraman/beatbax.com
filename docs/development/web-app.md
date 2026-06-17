---
sidebar_position: 5
title: Web App
---

# Web App Development

The web app is the browser-based BeatBax experience at [app.beatbax.com](https://app.beatbax.com). It runs the web-lite profile for quick editing, validation, and playback without installing the desktop app.

Work here when changing browser playback, editor behavior, validation UI, web-lite capabilities, or hosted web app presentation.

## Commands

Run commands from the repository root:

```powershell
npm run web-ui:dev
npm run web-ui:build
npm -w @beatbax/web-ui run test
```

The dev server usually runs at `http://localhost:5173`.

## Architecture Notes

- The web app builds with the `web-lite` client profile.
- Shared playback, editor, and parse pipeline logic comes from `@beatbax/app-core`.
- File save behavior downloads `.bax` files instead of writing to a user-chosen path.
- Desktop-only features such as native file dialogs, full export UI, Copilot, mixer, and pattern grid are intentionally gated out.

## Related Docs

- [Web-lite client](/docs/tools/web-client)
- [Desktop app development](/docs/development/desktop-app)
- [Engine development](/docs/development/engine)
