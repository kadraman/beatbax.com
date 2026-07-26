---
sidebar_position: 4
title: CLI
---

# CLI Development

The CLI wraps the engine for scripted playback, validation, inspection, conversion, and export.

Work here when changing commands, flags, terminal output, headless playback, conversion, or export wiring.

## Commands

```powershell
npm run cli:build
node bin/beatbax --help

npm run cli:dev -- --help
```

Against sample songs:

```powershell
node bin/beatbax verify songs/sample.bax
node bin/beatbax play songs/sample.bax --headless
node bin/beatbax export wav songs/sample.bax output.wav
```

## Windows note

npm has limitations passing flag arguments through `npm run` on Windows. Prefer `node bin/beatbax` or the `bin\beatbax` wrapper when developing from a clone.

## Related docs

- [CLI user guide](/docs/tools/cli)
- [Engine development](/docs/development/engine)
- [WAV export](/docs/exports/wav)
