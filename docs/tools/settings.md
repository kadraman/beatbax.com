---
sidebar_position: 3
title: Settings
---

## Settings Panel

All persistent preferences live in a single **Settings** modal. Open it with:

- `Ctrl+,` (Windows / Linux) / `Cmd+,` (macOS)
- **View → Settings…** in the menu bar
- The ⚙ gear icon in the BeatBax Copilot panel header (opens directly to the **AI** tab)
- The `…` overflow menu in the toolbar → **Settings**

The modal divides settings into six tabs:

| Tab | What it controls |
|---|---|
| **General** | Theme (dark / light / system), toolbar style, panel visibility, compact mixer |
| **Editor** | Auto-save, word wrap, CodeLens, beat decorations, default BPM, font size |
| **Playback** | Audio backend, sample rate, default loop, offline render buffer size |
| **Features** | Enable / disable gated features (Pattern Grid, Hot Reload, AI Copilot, DAW Mixer) |
| **AI** | API provider, endpoint URL, API key, model, interaction mode, max context chars |
| **Advanced** | Log level, debug overlay, `window.__beatbax_player` exposure, reset-all |

Most changes apply **immediately** without a page reload. The following two settings are exceptions that take effect after reload: **Auto-save** (Editor tab) and **Audio backend / Sample rate** (Playback tab) — a note is shown inline beside each control. Each tab has a **Reset section to defaults** button. The **Advanced → Reset all settings** button clears all `beatbax:*` keys (with a confirmation prompt).

### Feature flags

The **Features** tab controls which optional capabilities are active:

| Feature | Badge | Notes |
|---|---|---|
| **Pattern Grid** | Experimental | Visual step-sequencer overlay for patterns |
| **Hot Reload** | Experimental | Auto-replays on every editor change (800 ms debounce); state survives page reloads |
| **AI Copilot** | Beta | Requires an API key — configure in the **AI** tab |
| **DAW Mixer** | Planned | Horizontal channel strip with VU meters (not yet interactive) |

Enabling or disabling a feature takes effect immediately — no reload needed.
