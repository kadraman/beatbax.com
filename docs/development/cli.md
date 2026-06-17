---
sidebar_position: 4
title: CLI
---

# CLI Development

The CLI wraps the engine for scripted playback, validation, inspection, conversion, and export workflows.

Work here when changing command behavior, flags, terminal output, headless playback, file conversion, or export commands.

## Commands

Run commands from the repository root:

```powershell
npm run cli:build
node bin/beatbax --help
```

Use the local CLI against sample songs while developing:

```powershell
node bin/beatbax verify songs/sample.bax
node bin/beatbax play songs/sample.bax --headless
node bin/beatbax export wav songs/sample.bax output.wav
```

For faster local iteration, use the CLI development script:

```powershell
npm run cli:dev -- --help
```

## Windows Note

npm has limitations passing flag arguments through `npm run` on Windows. When running from a cloned repository, prefer `node bin/beatbax` or the `bin\beatbax` wrapper directly.

## Related Docs

- [CLI user reference](/docs/tools/cli)
- [Engine development](/docs/development/engine)
- [WAV export](/docs/exports/wav)
