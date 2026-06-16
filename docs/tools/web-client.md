---
sidebar_position: 2
title: Web Client
---

## Using the Web UI

The easiest way to use BeatBax is through the hosted Web UI at [app.beatbax.com](https://app.beatbax.com) — no installation required. Open it in any modern browser and start writing `.bax` songs immediately.

If you want to run the Web UI locally for development, you can still build and serve it from the repo:

```powershell
npm run web-ui:build   # compile the TypeScript bundle
npm run web-ui:dev     # start the Vite dev server (usually http://127.0.0.1:5173)
```

**Controls:**
- Paste or load a `.bax` file into the editor and click `Play` / `Apply & Play`.
- `Live` checkbox: when enabled, edits are applied (debounced) automatically.
- Per‑channel `Mute` / `Solo` controls appear after applying a song.
- Help panel: click the ❓ icon or the Show Help button (H / ? toggles the panel). The help panel surfaces the commented documentation inside `songs/sample.bax`.

**BPM nudge (transport bar)**

The transport bar's `«` and `»` buttons step the playback tempo down or up by 1 BPM per click without editing the source. Hold either button for rapid stepping.

- The BPM LCD readout updates immediately and the running song tempo changes on the next scheduler tick.
- The editor annotates the `bpm` directive line with a dimmed italic hint showing the overridden value, e.g. `bpm 140  ← runtime: 141 BPM`.
- The annotation is purely cosmetic — the source text is never modified.
- **Clearing the override:** editing the `bpm` value directly in the editor, or loading a new file, clears the override and removes the annotation. The transport bar snaps back to the source BPM.

**CodeLens inline previews** — the editor shows clickable actions directly above definitions:
- `▶ Preview` above a `pat` or `seq` line: plays that pattern or sequence in isolation and then stops automatically.
- `↺ Loop` above a `pat` or `seq` line: plays the pattern or sequence on repeat. Each new iteration re-parses the source, so edits you make while looping are heard on the next pass.
- Clicking a playing item's `⬛ Stop` (or `⬛ Stop ↺` when looping) halts playback.
- Above each `inst` line five note buttons appear (`C3 C4 C5 C6 C7`). Clicking one plays that pitch through the instrument so you can audition timbre without writing a full pattern. Re-clicking the same note restarts it.
- `▶ Preview` also appears above `effect` definition lines and plays four ascending notes with the effect applied, so you can audition presets like `vib`, `arp`, and `port` without building a full pattern.
- Instrument resolution is automatic: the preview borrows the instrument already associated with the pattern or sequence in a channel declaration; otherwise the first declared instrument is used.
- Only one preview plays at a time. Starting a new preview stops the previous one.

**BeatBax command palette** — press `F1` (or `Ctrl+Alt+P`) inside the editor and type `BeatBax` to see all available commands:

| Command | Description |
|---|---|
| BeatBax: Play Selected Sequence / Pattern | Play highlighted `seq` / `pat` lines (`Ctrl+Shift+Space`) |
| BeatBax: Verify / Validate Song | Re-run the parser and show the Problems panel (`Ctrl+Shift+V`) |
| BeatBax: Export → JSON / MIDI / UGE / WAV | Export the current song in the chosen format |
| BeatBax: Generate Sample Instruments | Insert a starter `inst` block for all four Game Boy channel types |
| BeatBax: Generate Sample Pattern | Insert a placeholder `pat` with 4/4 notes |
| BeatBax: Insert Transform… | Quick-pick a transform (`oct`, `rev`, `slow`, `fast`, `arp`, …) and insert at cursor |
| BeatBax: Instrument Override… | Context-aware override: channel `inst`, sequence item `:inst(name)`, or pattern inline/default `inst(...)` |
| BeatBax: Format BeatBax Document | Normalise whitespace and align `=` signs in `pat`/`seq` blocks |
| BeatBax: Toggle Mute Channel… | Quick-pick a channel to toggle mute |
| BeatBax: Solo Channel… | Quick-pick a channel to solo |


---

# @beatbax/web-ui

> BeatBax browser client — **web-lite** profile.

**Private workspace package.** Deployed to [app.beatbax.com](https://app.beatbax.com) as a lightweight try-in-browser experience. The full IDE lives in [BeatBax Desktop](/docs/tools/desktop).

## Web-lite scope

The web UI builds with `__CLIENT_PROFILE__ = "web-lite"`. Capabilities are gated via `@beatbax/app-core` (`getCurrentCapabilities()`).

### Included

- Toolbar — Open, New, Save (downloads `.bax`), Verify, theme, word wrap, fold, examples
- Monaco editor — syntax highlighting, diagnostics, completions, folding (no code lens, glyph margin, or command palette)
- Transport bar — play, pause, stop, apply, BPM, volume
- **Visualizer** panel (right pane)
- **Help** panel (right pane) — syntax reference
- **Problems** and **Output** panels (bottom pane)
- Status bar with Window menu
- Web-lite header — BeatBax text logo + social icon links
- File open via hidden input and `?song=` URL loading
- localStorage auto-save

### Not included (desktop-only)

| Feature | Use desktop instead |
|---------|---------------------|
| Export menu (JSON, MIDI, UGE, WAV, …) | `apps/desktop` |
| BeatBax CoPilot | Desktop Settings → Features → AI Assistant |
| Channel mixer | Desktop |
| Pattern grid | Desktop |
| Advanced editor (code lens, glyph margin, command palette) | Desktop |
| MIDI step entry | Desktop |
| Settings modal | Theme via toolbar / `Alt+Shift+L`; word wrap via toolbar |
| Native Open/Save dialogs | Desktop |

Save in web-lite triggers a `.bax` file download; it does not write to a user-chosen path on disk.

## Development

From the repository root:

```bash
npm run web-ui:dev      # Vite dev server → http://localhost:5173
npm run web-ui:build    # production build to dist/
npm -w @beatbax/web-ui run test
```

## Architecture

- **UI shell** — vanilla TypeScript + DOM (`src/main.ts`, `src/app/`, `src/ui/`, `src/panels/`)
- **Shared logic** — `@beatbax/app-core` (stores, playback, editor core, parse pipeline)
- **File I/O** — `src/utils/browser-fs.ts` (Vite `fs` alias; captures writes for downloads)
- **Profile** — `vite.config.ts` sets `__CLIENT_PROFILE__: '"web-lite"'`

Desktop reuses many panel implementations via Vite `@web-ui` aliases in its React shell; web-ui does not import desktop code.

## Related docs

- [Desktop-first client split](https://github.com/kadraman/beatbax/blob/main/docs/features/complete/desktop-first-client-split.md)
- [packages/app-core README](https://github.com/kadraman/beatbax/blob/main/packages/app-core/README.md)
