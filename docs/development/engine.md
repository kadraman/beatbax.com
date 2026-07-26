---
sidebar_position: 2
title: Engine
---

# Engine Development

The engine contains the parser, song resolver, playback model, chip backends, renderers, validation, import resolution, and exporters used by the CLI, web app, and desktop app.

Work here when changing `.bax` language behavior, timing, chip emulation, playback, diagnostics, or export output.

## Built-in vs plugin chips

- **Built-in:** Game Boy and NES (Ricoh 2A03) register automatically via `BUILTIN_CHIP_PLUGINS`. `chip nes` / `chip famicom` need no separate install.
- **Plugins:** SMS / Game Gear (`@beatbax/plugin-chip-sms`), Spectrum 128 / CPC (`@beatbax/plugin-chip-spectrum-128`), and additional exporters register explicitly with the host/CLI.

Chip plugins may implement optional `configureForSong()` with a typed `ChipSongContext`, plus `validateSong()` / `getMeterDisplayGain()` hooks where needed.

## Export architecture

Built-in formats (JSON, MIDI, UGE, WAV) are **payload-first**: builders return `string` / `Uint8Array` / `ArrayBuffer` / `ExportPayload` when `outputPath` is omitted so UI hosts can download without filesystem side effects. Path-writing wrappers remain for Node/CLI. Exporter plugins should return payloads the same way; hosts register exporters explicitly (no async chip-exporter auto-resolution).

## Common Tasks

- Change language syntax or parse warnings in the parser and grammar.
- Update song resolution, imports, metadata, timing, or validation rules.
- Add or adjust chip backend behavior (including Game Boy tick programs / UGE subpatterns).
- Fix playback or PCM rendering parity.
- Add or update exporters such as WAV, MIDI, UGE, FamiTracker text, VGM, Arkos, or JSON.

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

- [Language Reference](/docs/language/metadata-directives)
- [Sound Chip Plugins](/docs/chips/overview)
- [WAV export](/docs/exports/wav)
- [Plugin development](/docs/development/plugins)
