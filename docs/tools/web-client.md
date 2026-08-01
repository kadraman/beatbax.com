---
sidebar_position: 2
title: Web Client
---

# Web-lite client

Try BeatBax in the browser at [app.beatbax.com](https://app.beatbax.com) — no install required.

The full IDE (exports, Copilot, mixer, pattern grid, Settings, advanced editor) is in [BeatBax Desktop](/docs/tools/desktop).

## Using the web UI

1. Open [app.beatbax.com](https://app.beatbax.com).
2. Paste a `.bax` song, open a file, or pick an example from the toolbar.
3. Click **Apply** then **Play** (or enable **Live** so edits apply automatically with debounce).

### Controls

- **Toolbar** — Open, New, Save (downloads a `.bax` file), Verify, theme, word wrap, fold, examples
- **Transport** — play, pause, stop, apply, BPM readout, volume
- **Live** — debounced auto-apply while editing
- Per-channel **Mute** / **Solo** after a song is applied
- **Help** — syntax reference (`H` / `?`, or the help control)
- **Visualizer** (right); **Problems** and **Output** (bottom)
- **Status bar** with Window menu
- Open via file picker or `?song=` URL
- Editor content auto-saved to `localStorage`

Save always **downloads** a `.bax` file; it does not write to a chosen path on disk.

### Theme and wrap

Theme: toolbar or `Alt+Shift+L`. Word wrap: toolbar. There is no Settings modal in web-lite.

## What web-lite includes

- Monaco editor — highlighting, diagnostics, completions, folding
- Toolbar, transport, visualizer, help, problems, output
- Web-lite header (logo + social links)

## Desktop-only features

| Feature | Use instead |
|---------|-------------|
| Export menu (JSON, MIDI, UGE, WAV, VGM, Arkos, …) | [Desktop](/docs/tools/desktop) |
| BeatBax Copilot | [Desktop](/docs/tools/desktop) → Settings → Features |
| Channel mixer / pattern grid | Desktop |
| CodeLens, glyph margin, command palette | Desktop |
| BPM runtime nudge annotations | Desktop |
| MIDI step entry | Desktop |
| Settings modal | [Desktop Settings](/docs/tools/settings) |
| Native Open/Save dialogs | Desktop |

## Related docs

- [Desktop app](/docs/tools/desktop)
- [Quick start](/docs/getting-started/quick-start)
- [Web app development](/docs/development/web-app)
