---
sidebar_position: 3
title: BeatBax web-lite client
---

# BeatBax web-lite client

The **BeatBax web-lite client** is a browser editor and player at [app.beatbax.com](https://app.beatbax.com). Use it to try the language, play examples, and sketch `.bax` songs without installing anything.

It is a **lite** host of the same grammar and playback engine — not the full IDE. There is no song export, no [BeatBax Copilot](/docs/tools/copilot), no [Song Visualizer](/docs/tools/song-visualizer), and no access to files on disk beyond what the browser allows. For those, use [BeatBax Desktop](/docs/tools/desktop) (recommended) or the [CLI](/docs/tools/cli). See the [Tools overview](/docs/tools/overview#feature-comparison) for a comparison of all three hosts.

## What it is for

- Trying **BeatBax** on a machine where you cannot or do not want to install Desktop
- Opening bundled examples, or pasting a tutorial song, and hearing it immediately
- Lightweight edits in the [BeatBax Editor](/docs/tools/editor), with diagnostics, live playback, and mute/solo
- Taking work with you: the buffer auto-saves in the browser, and **Save** downloads a `.bax` file you can reopen later in Desktop or the CLI

## Using the web-lite client

1. Open [app.beatbax.com](https://app.beatbax.com).
2. Paste a `.bax` song, open a file, or pick an example from the toolbar.
3. Click **Apply** or **Play** (or enable **Live** so edits apply automatically with debounce).

### Controls

- **Toolbar** — Open, New ([New Song Wizard](/docs/tools/new-song-wizard)), Save (downloads a `.bax` file), Verify, theme, word wrap, fold, examples
- **Transport** — play, pause, stop, apply, BPM readout, volume
- **Live** — debounced auto-apply while editing
- Per-channel **Mute** / **Solo** after a song is applied
- **Help** — syntax reference (`H` / `?`, or the help control)
- **Problems** and **Output** (bottom)
- **Status bar** with Window menu
- Open via file picker or `?song=` URL
- Editor content auto-saved to `localStorage`

### Editor

Web-lite uses the same [BeatBax Editor](/docs/tools/editor) as Desktop for syntax highlighting, completions, diagnostics, folding, theme, and word wrap.

It does **not** include Desktop-only editor features: [CodeLens previews](/docs/tools/editor#codelens-previews) (Preview / Loop / instrument and effect audition), the [glyph margin](/docs/tools/editor#glyph-margin), beat decorations, or the [command palette](/docs/tools/editor#command-palette). For those, use [BeatBax Desktop](/docs/tools/desktop).

### Settings

The web-lite client has no [Settings](/docs/tools/settings) modal, so appearance and settings such as wrapping are changed from the toolbar.

**Theme** switches the editor between dark and light. Click the theme control in the toolbar, or press `Alt+Shift+L`. The choice is stored in the browser and restored on later visits.

**Word wrap** controls whether long lines wrap in the editor instead of scrolling horizontally. Toggle it from the wrap control in the toolbar. Wrapped lines are easier to read on a narrow window; turning wrap off is useful when you want a strict column layout.

## Related docs

- [Tools overview](/docs/tools/overview)
- [BeatBax Desktop](/docs/tools/desktop)
- [BeatBax Editor](/docs/tools/editor)
- [New Song Wizard](/docs/tools/new-song-wizard)
- [BeatBax CLI](/docs/tools/cli)
- [Quick start](/docs/getting-started/quick-start)
- [Web app development](/docs/development/web-app)
