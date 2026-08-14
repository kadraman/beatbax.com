---
sidebar_position: 2
title: Channel Mixer
---

# Channel Mixer

The **Channel Mixer** is a panel that docks below the editor. It shows one channel strip per chip voice so you can watch live levels, mute or solo channels, and set per-channel volume while the song plays — without leaving the source. Voices follow the song’s `chip` (for example Pulse / Wave / Noise on Game Boy, or Pulse 1 / Pulse 2 / Triangle / Noise / DMC on NES).

> The Channel Mixer is available in both BeatBax Desktop and the web-lite Client.

## Enabling the mixer

1. Open [BeatBax Desktop](/docs/tools/desktop).
2. Press `Ctrl+,` / `Cmd+,` (or **View → Settings…**) to open **Settings**.
3. On the **Features** tab, enable **Channel Mixer** (on by default).
4. Close Settings. The mixer docks at the bottom of the window.

Show or hide the panel from the status bar **panel menu** or the **View** menu. **Settings → General** includes **compact mixer**, which keeps labels and meters in a shorter panel.

## What each strip shows

Strips follow the song’s chip — for example Pulse 1 / Pulse 2 / Triangle / Noise / DMC on NES, or Pulse / Wave / Noise on Game Boy.

| Control | Role |
|---------|------|
| Channel label | Chip voice name, with a colour accent |
| VU meter | Live level (green → yellow → red) with a short peak hold |
| Volume fader | Per-channel gain when the chip supports it; greyed out when it does not |
| **M** / **S** | Mute and solo (same channel state as the editor and Pattern Grid) |
| Instrument | Name of the instrument currently playing on that channel |

Mute, solo, and volume stay in sync with the rest of the IDE. Soloing one channel mutes the others until you clear solo.

Drag the top edge of the mixer to change its height. The layout is remembered between sessions.

## Related docs

- [BeatBax Desktop](/docs/tools/desktop)
- [Song Visualizer](/docs/tools/song-visualizer)
- [Pattern Grid](/docs/tools/pattern-grid)
- [Settings](/docs/tools/settings)
