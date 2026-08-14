---
sidebar_position: 0
title: BeatBax Editor
---

# BeatBax Editor

The **BeatBax Editor** is the Monaco-based source editor for `.bax` songs. It is the same editor in [BeatBax Desktop](/docs/tools/desktop) and the [web-lite client](/docs/tools/web-client): syntax highlighting, completions, diagnostics, and folding work in both.

Desktop adds the full IDE layer — CodeLens previews, a glyph margin, beat decorations, and a BeatBax command palette. Web-lite keeps the lighter subset so you can sketch songs in a browser. The [CLI](/docs/tools/cli) has no editor.

## Desktop vs web-lite

| Feature | [Desktop](/docs/tools/desktop) | [Web-lite](/docs/tools/web-client) |
|---------|--------------------------------|------------------------------------|
| Syntax highlighting, completions, folding | Yes | Yes |
| Diagnostics (Problems panel) | Yes | Yes |
| Theme, word wrap, fold | [Settings](/docs/tools/settings) and toolbar | Toolbar (`Alt+Shift+L` for theme) |
| Help panel | Yes (`H` / `?`; click-to-insert) | Yes (`H` / `?`) |
| Auto-save | Settings → Editor | Browser `localStorage` |
| [CodeLens](#codelens-previews) previews | Yes (Settings → Editor) | No |
| [Glyph margin](#glyph-margin) | Yes | No |
| [Beat decorations](#beat-decorations) | Yes (Settings → Editor) | No |
| [Command palette](#command-palette) | Yes (`F1` / `Ctrl+Shift+P` / `Cmd+Shift+P`) | No |
| [MIDI step entry](/docs/tools/midi-step-entry) | Yes | No |

## Using the editor

Type `.bax` as you would in any code editor. Completions are context-aware: they offer chip names, instrument properties, pattern and sequence names, [modifiers](/docs/language/modifiers), [effects](/docs/language/effects), scale roots and modes, import paths, and similar tokens depending on the line under the cursor.

Folding collapses `pat`, `seq`, and other blocks from the gutter or the toolbar fold control. Word wrap keeps long pattern lines visible in a narrow window; turn it off when you want a strict column layout.

Parser errors and warnings appear as editor markers and in the **Problems** panel. **Verify** re-runs the parser. After a song is applied, per-channel mute and solo are available from the mixer (Desktop) or the transport area (web-lite).

### Theme and wrap

**Desktop:** [Settings → General](/docs/tools/settings) for dark / light / system theme, and **Settings → Editor** for word wrap and font size. Toolbar controls toggle wrap and fold as well.

**Web-lite:** there is no Settings modal. Use the toolbar for theme (`Alt+Shift+L`) and word wrap. See the [web-lite client](/docs/tools/web-client#settings).

### Help

`H` or `?` opens the Help panel (syntax reference). On Desktop, many help entries insert a snippet at the cursor when you click them.

## CodeLens previews

CodeLens is **Desktop-only**. Enable it under **Settings → Editor**. Clickable actions appear above `pat`, `seq`, `inst`, and `effect` lines:

- **Preview** / **Loop** / **Stop** on a `pat` or `seq` — play that pattern or sequence in isolation. Loop re-parses on each pass, so edits you make while looping are heard on the next iteration.
- Note buttons **C3**–**C7** on an `inst` line — audition the instrument’s timbre without writing a pattern. Clicking the same note again restarts it.
- **Preview** on an `effect` line — play a short ascending phrase with that preset applied (for example `vib`, `arp`, or `port`).

The preview uses the instrument already associated with that pattern or sequence in a `channel` line; otherwise it uses the first declared instrument. Only one preview plays at a time — starting another stops the current one.

Web-lite has no CodeLens. To audition parts in isolation there, apply the song and use mute/solo, or switch to Desktop.

## Glyph margin

The glyph margin (left gutter) is **Desktop-only**. It shows:

- A pulsing playhead on the `pat` (and enclosing `seq`) that is currently playing
- **M** / **S** badges on each `channel` line — click to mute or solo that channel without leaving the editor

## Beat decorations

Beat decorations are **Desktop-only** (Settings → Editor). After a successful parse, notes and rests in patterns are tinted so downbeats and mid-bar steps stand out. They are a visual grid, not a change to the source.

## Command palette

The command palette is **Desktop-only**. Open it with `F1` or `Ctrl+Shift+P` / `Cmd+Shift+P`, then type `BeatBax`:

| Command | Description |
|---------|-------------|
| Play Selected Sequence / Pattern | Play highlighted `seq` / `pat` lines (`Ctrl+Shift+Space`) |
| Verify / Validate Song | Re-run the parser and show the Problems panel (`Ctrl+Shift+V`) |
| Export → JSON / MIDI / UGE / WAV | Export the current song (see [Export Plugins](/docs/exports/overview)) |
| Generate Sample Instruments | Insert a starter `inst` block for the song’s chip |
| Generate Sample Pattern | Insert a placeholder `pat` with 4/4 notes |
| Insert Transform… | Quick-pick a [modifier](/docs/language/modifiers) (`oct`, `rev`, `slow`, `fast`, `arp`, …) and insert it at the cursor |
| Instrument Override… | Context-aware override: channel `inst`, sequence `:inst(name)`, or pattern `inst(...)` |
| Format BeatBax Document | Normalise whitespace and align `=` in `pat` / `seq` blocks |
| Toggle Mute Channel… / Solo Channel… | Quick-pick a channel to mute or solo |

## Related editor tools

These sit around the editor rather than inside it:

- [MIDI step entry](/docs/tools/midi-step-entry) — step notes from a MIDI keyboard (Desktop)
- [New Song Wizard](/docs/tools/new-song-wizard) — chip picker and starter template
- [BeatBax Copilot](/docs/tools/copilot) — AI edits applied to the buffer (Desktop)
- [Pattern Grid](/docs/tools/pattern-grid) — arrangement timeline above the editor (Desktop, Experimental)

## Related docs

- [BeatBax Desktop](/docs/tools/desktop)
- [BeatBax web-lite client](/docs/tools/web-client)
- [Settings](/docs/tools/settings)
- [Tools overview](/docs/tools/overview)
- [Language overview](/docs/language/overview)
