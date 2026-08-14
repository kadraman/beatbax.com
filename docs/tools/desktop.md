---
sidebar_position: 1
title: BeatBax Desktop
---

# BeatBax Desktop

**BeatBax Desktop** is the full-featured **BeatBax** IDE for Windows, macOS, and Linux.

[Download](/download) installers from the site or [itch.io](https://kadraman.itch.io/beatbax).

> macOS GitHub Release installers are Developer ID signed and notarized. Windows installers are not Authenticode-signed — SmartScreen may warn (More info → Run anyway). See `README.txt` in the install folder.

> See the [Tools overview](/docs/tools/overview#feature-comparison) for a comparison with the web-lite client and the CLI.

## Navigating

- **Toolbar** — Open/Save, chip specific export menu, theme / word wrap / fold
- **Transport bar** — play, pause, stop, apply, BPM, loop, live, rewind, BPM nudge, master volume
- **[Editor](/docs/tools/editor)** — Monaco editor with diagnostics, CodeLens, glyph margin, and command palette
- **Panels** — Problems, Output, [Song Visualizer](/docs/tools/song-visualizer), Help, and (when enabled) [Channel Mixer](/docs/tools/channel-mixer), [Pattern Grid](/docs/tools/pattern-grid), [BeatBax Copilot](/docs/tools/copilot)
- **Status bar** — cursor position, parse status, chip/BPM, panel menu, diagnostics counts
- **New Song Wizard** — [New Song Wizard](/docs/tools/new-song-wizard) (**File → New** / toolbar New; first-run chip picker)

Native Open/Save dialogs, recent files, and file associations are built in. **File → Open** starts in the bundled songs directory shipped with the installer.

## Playback

1. Open a `.bax` song (**File → Open**, or paste into the editor).
2. **Apply** or **Play** (or enable **Live** for debounced auto-apply).
3.  **Pause** / **Stop** from the transport bar.

**BPM nudge:** transport `«` / `»` steps tempo by 1 BPM without editing the source. Editing the `bpm` line or loading another file clears the override.

**Mute / Solo:** per-channel controls after a song is applied.

## The Editor

The Desktop editor is the full [BeatBax Editor](/docs/tools/editor): it includes syntax highlighting, completions, diagnostics, CodeLens previews, glyph margin, beat decorations, and a command palette. Please see [BeatBax Editor](/docs/tools/editor) for full details

> The [web-lite client](/docs/tools/web-client) uses the same editor without CodeLens, the glyph margin, or the command palette.

## Settings

Desktop preferences live in a single [Settings](/docs/tools/settings) modal. Open it with `Ctrl+,` (Windows / Linux) / `Cmd+,` (macOS), **View → Settings…**, or the toolbar `…` menu.

Use it to set theme and editor behaviour, playback (audio backend, sample rate, loop), feature flags ([Channel Mixer](/docs/tools/channel-mixer), [Song Visualizer](/docs/tools/song-visualizer), [Pattern Grid](/docs/tools/pattern-grid), [BeatBax Copilot](/docs/tools/copilot)), [sound chip](/docs/chips/overview) and [export](/docs/exports/overview) plugins, and the Copilot provider. Most changes apply immediately. See [Settings](/docs/tools/settings) for every tab and the shortcuts that need a reload.

> The [web-lite client](/docs/tools/web-client) has no Settings modal — theme and word wrap are toolbar-only.

## Sound Chip Plugins

[Sound Chip Plugins](/docs/chips/overview) are enabled in [Settings](/docs/tools/settings) (**Plugins**). Built-in chips are always available; optional chips can be turned on or off there. See [Sound Chip Plugins](/docs/chips/overview) for supported backends, voices, and chip-specific details.

## Exporting

[Export Plugins](/docs/exports/overview) are enabled in [Settings](/docs/tools/settings) (**Plugins**). JSON and MIDI are built in for every chip; WAV and chip-specific formats (UGE, FamiTracker text, VGM, Arkos, and others) can be turned on or off there. Use the toolbar or menu to export when a format is available for the active song’s chip. See [Export Plugins](/docs/exports/overview) for format ids and chip-specific guides.

## Panels

BeatBax Desktop docks extra views around the editor. Show or hide them from the status bar **panel menu** or the **View** menu. Mixer, Visualizer, Pattern Grid, and Copilot are also gated under [Settings → Features](/docs/tools/settings).

- **Problems** / **Output** — parser diagnostics and log (bottom pane)
- **Help** — syntax reference (`H` / `?`; click-to-insert)
- [Channel Mixer](/docs/tools/channel-mixer) — channel strips, VU meters, mute/solo (bottom panel)
- [Song Visualizer](/docs/tools/song-visualizer) — per-channel waveforms and performance mode (right pane)
- [Pattern Grid](/docs/tools/pattern-grid) — arrangement timeline above the editor (Experimental)
- [BeatBax Copilot](/docs/tools/copilot) — AI assistant (right pane)

## MIDI step entry

[MIDI step entry](/docs/tools/midi-step-entry) puts notes into a `pat` from a MIDI keyboard, one step at a time — it is not a realtime recorder. Enable **MIDI input** in [Settings → Editor](/docs/tools/settings), arm the transport **record** control, then play keys into the editor. Scale `lock=` on a channel snaps or filters incoming pitches. The [web-lite client](/docs/tools/web-client) has no MIDI step entry.

## Related docs

- [Installation](/docs/getting-started/installation)
- [Verify downloads](/docs/tools/verify-downloads)
- [Tools overview](/docs/tools/overview)
- [BeatBax Editor](/docs/tools/editor)
- [BeatBax web-lite client](/docs/tools/web-client)
- [BeatBax CLI](/docs/tools/cli)
- [Desktop development](/docs/development/desktop-app)
