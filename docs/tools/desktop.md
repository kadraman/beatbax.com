---
sidebar_position: 3
title: BeatBax Desktop
---

# BeatBax Desktop

**BeatBax Desktop** is the full-featured **BeatBax** IDE for Windows, macOS, and Linux.

[Download](/download) installers from the site or [itch.io](https://kadraman.itch.io/beatbax).

> Installers are not code-signed yet. Windows SmartScreen and macOS Gatekeeper may warn on first launch — see `README.txt` in the install folder.

## Getting around

- **Toolbar** — Open/Save, export menu, theme / word wrap / fold
- **Transport bar** — play, pause, stop, apply, BPM, loop, live, rewind, BPM nudge, master volume
- **Editor** — Monaco with diagnostics; optional CodeLens, glyph margin, and command palette
- **Panels** — Problems, Output, Visualizer, Help, and (when enabled) Mixer, Pattern Grid, [BeatBax Copilot](/docs/tools/copilot)
- **Status bar** — cursor position, parse status, chip/BPM, panel menu, diagnostics counts
- **New Song Wizard** — **File → New** / toolbar New; first-run chip picker (Stable / Beta / Experimental)

Native Open/Save dialogs, recent files, and file associations are built in. **File → Open** starts in the bundled songs directory shipped with the installer.

## Playback

1. Open a `.bax` song (**File → Open**, or paste into the editor).
2. **Apply** (or enable **Live** for debounced auto-apply).
3. **Play** / **Pause** / **Stop** from the transport bar.

**BPM nudge:** transport `«` / `»` steps tempo by 1 BPM without editing the source. Editing the `bpm` line or loading another file clears the override.

**Mute / Solo:** per-channel controls after a song is applied.

## Editor features

### CodeLens previews

When enabled (Settings → Editor), above `pat` / `seq` / `inst` / `effect` lines you can:

- **Preview** / **Loop** / **Stop** isolated pattern or sequence playback
- Audition notes on `inst` lines (`C3`–`C7`)
- Audition effect presets on `effect` lines

Only one preview plays at a time.

### Command palette

`F1` or `Ctrl+Shift+P` / `Cmd+Shift+P`, then type `BeatBax` for Play Selected, Verify, Export, Generate Sample Instruments/Pattern, Insert Transform, Instrument Override, Format Document, Mute/Solo Channel, and more.

### MIDI step entry

Enable MIDI input in Settings, then use the transport record control to step notes into the editor.

## Export

Use the toolbar or menu to export JSON, MIDI, UGE, WAV, and chip-specific formats (FamiTracker text, VGM, Arkos) when available for the active song’s chip.

## Settings and Copilot

- [Settings](/docs/tools/settings) — theme, editor, playback, feature flags, AI provider
- [BeatBax Copilot](/docs/tools/copilot) — AI assistant (enable under Settings → Features)

## Compared with the web-lite client

| Capability | BeatBax Desktop | [BeatBax web-lite client](/docs/tools/web-client) |
|------------|-----------------|--------------------------------------------------|
| Native Open/Save | Yes | Download-only Save |
| Full export menu | Yes | No |
| Settings modal | Yes | Theme / wrap via toolbar |
| Copilot, mixer, pattern grid | Yes (gated) | No |
| CodeLens / command palette | Yes | No |

## Related docs

- [Installation](/docs/getting-started/installation)
- [BeatBax web-lite client](/docs/tools/web-client)
- [BeatBax CLI](/docs/tools/cli)
- [Desktop development](/docs/development/desktop-app)
