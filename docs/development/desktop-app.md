---
sidebar_position: 6
title: Desktop App
---

# Desktop App Development

The desktop app is the full Electron IDE for Windows, macOS, and Linux. It uses the desktop-full profile and includes desktop-only features such as local file access, exports, Copilot, mixer tools, pattern grid, and packaging.

Work here when changing the Electron shell, desktop renderer, native file behavior, desktop-only panels, release packaging, or installer generation.

## Commands

Run commands from the repository root:

```powershell
npm run desktop:dev
npm run desktop:build
npm run desktop:test
npm run desktop:dist
```

## Architecture Notes

- The desktop renderer builds with the `desktop-full` client profile.
- Shared playback, parsing, editor, and app state logic comes from `@beatbax/app-core`.
- The Electron main process owns native file dialogs, recent files, file associations, and packaging behavior.
- The desktop renderer reuses many web UI panel implementations, but enables the full IDE feature set.

## Releasing

Desktop installers are published through desktop release tags and CI, not npm. See the [desktop app user docs](/docs/tools/desktop) for release workflow details.

## Related Docs

- [Desktop app user docs](/docs/tools/desktop)
- [Web app development](/docs/development/web-app)
- [Engine development](/docs/development/engine)
