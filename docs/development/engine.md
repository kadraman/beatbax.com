---
sidebar_position: 2
title: Engine
---

# Engine Development

The engine contains the parser, song resolver, playback model, chip backends, renderers, validation, import resolution, and exporters used by the CLI, web app, and desktop app.

Work here when changing `.bax` language behavior, timing, chip emulation, playback, diagnostics, or export output.

## Common Tasks

- Change language syntax or parse warnings in the parser and grammar.
- Update song resolution, imports, metadata, timing, or validation rules.
- Add or adjust chip backend behavior.
- Fix playback or PCM rendering parity.
- Add or update exporters such as WAV, MIDI, UGE, FamiTracker text, or JSON.

## Commands

Run commands from the repository root:

```powershell
npm run engine:build
npm test
```

When testing engine changes through the CLI, build the engine first, then run a CLI command against a sample song.

```powershell
npm run engine:build
node bin/beatbax verify songs/sample.bax
node bin/beatbax play songs/sample.bax --headless
```

## Related Docs

- [Language docs](/docs/language/metadata-directives)
- [Sound chips](/docs/chips/overview)
- [WAV export](/docs/exports/wav)
