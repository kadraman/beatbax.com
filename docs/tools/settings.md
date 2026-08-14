---
sidebar_position: 1
title: Settings
---

# Settings

The **Settings** modal is part of [BeatBax Desktop](/docs/tools/desktop). Open it with:

- `Ctrl+,` (Windows / Linux) / `Cmd+,` (macOS)
- **View → Settings…**
- The gear icon in the Copilot panel header (opens the **AI** tab)
- Toolbar `…` → **Settings**

> The [BeatBax web-lite client](/docs/tools/web-client) has no Settings modal — use the toolbar for theme (`Alt+Shift+L`) and word wrap.

## Tabs

| Tab | What it controls |
|---|---|
| **General** | Theme (dark / light / system), toolbar style, panel visibility, compact mixer |
| **Editor** | Auto-save, word wrap, [CodeLens](/docs/tools/editor#codelens-previews), [beat decorations](/docs/tools/editor#beat-decorations), default BPM, font size, [MIDI step entry](/docs/tools/midi-step-entry) |
| **Playback** | Audio backend, sample rate, default loop, offline render buffer size |
| **Features** | Pattern Grid, Hot Reload, AI Copilot, Channel Mixer, Song Visualizer |
| **Plugins** | [Sound Chip Plugins](/docs/chips/overview) and [Export Plugins](/docs/exports/overview) — built-in plus optional backends |
| **AI** | Provider, endpoint, API key, model, interaction mode, max context chars |
| **Advanced** | Log level, debug overlay, debug player exposure, reset-all |

Most changes apply **immediately**. Exceptions (noted inline): **Auto-save** and **Audio backend / Sample rate** need a reload. Each tab has **Reset section to defaults**. **Advanced → Reset all settings** clears BeatBax preference keys after confirmation.

## Feature flags

| Feature | Badge | Notes |
|---|---|---|
| **Pattern Grid** | Experimental | Step-sequencer overlay for patterns — [Pattern Grid](/docs/tools/pattern-grid) |
| **Hot Reload** | Experimental | Auto-replay on editor changes (debounced) |
| **AI Copilot** | Beta | Configure provider on the **AI** tab; see [BeatBax Copilot](/docs/tools/copilot) |
| **Channel Mixer** | — | Channel strips and meters when enabled — [Channel Mixer](/docs/tools/channel-mixer) |
| **Song Visualizer** | — | Per-channel waveforms in the right pane — [Song Visualizer](/docs/tools/song-visualizer) |

## Related docs

- [BeatBax Desktop](/docs/tools/desktop)
- [BeatBax Editor](/docs/tools/editor)
- [BeatBax Copilot](/docs/tools/copilot)
- [Channel Mixer](/docs/tools/channel-mixer)
- [Song Visualizer](/docs/tools/song-visualizer)
- [Pattern Grid](/docs/tools/pattern-grid)
- [MIDI step entry](/docs/tools/midi-step-entry)
- [New Song Wizard](/docs/tools/new-song-wizard)
