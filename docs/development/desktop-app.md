---
sidebar_position: 6
title: Desktop App
---

# Desktop App Development

The desktop app is the full Electron IDE for Windows, macOS, and Linux (`desktop-full` profile). Work here for the Electron shell, React renderer, native file I/O, desktop-only panels, packaging, and installers.

## Commands

From the repository root:

```powershell
npm run desktop:dev      # hot reload
npm run desktop:build
npm run desktop:test
npm run desktop:dist     # electron-builder installers
```

## Architecture

- Renderer profile: `__CLIENT_PROFILE__ = "desktop-full"`.
- Shared playback, parsing, editor, and app state: `@beatbax/app-core`.
- Desktop owns React panels (toolbar, transport, Settings, Copilot, mixer, pattern grid). It does not import `@web-ui` panel modules from `apps/web-ui`.
- Electron main process: native dialogs, recent files, file associations, packaging, and OS secure storage for Copilot API keys.

## Releasing

Installers are published via git tags and CI — not npm.

1. Update `apps/desktop/package.json` version if needed.
2. Edit `apps/desktop/build/release-notes.body.txt`.
3. `npm run desktop:dist` generates `README.txt` / `RELEASE-NOTES.txt` next to the app.
4. Tag and push:

```powershell
git tag -a desktop-v0.2.0 -m "BeatBax Desktop v0.2.0"
git push origin desktop-v0.2.0
```

The [Desktop: Build](https://github.com/kadraman/beatbax/actions/workflows/desktop-build.yaml) workflow packages on Windows, macOS, and Linux and publishes to GitHub Releases.

Full details: [docs/releasing.md](https://github.com/kadraman/beatbax/blob/main/docs/releasing.md).

## Related docs

- [Desktop user guide](/docs/tools/desktop)
- [Web app development](/docs/development/web-app)
- [Engine development](/docs/development/engine)
- [IPC / packaging notes](https://github.com/kadraman/beatbax/blob/main/docs/features/complete/electron-desktop-client.md)
