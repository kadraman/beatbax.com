---
sidebar_position: 4
title: Pattern Grid
---

# Pattern Grid (Experimental)

The **Pattern Grid** is a **desktop-only** timeline of the resolved song: one row per chip channel, with pattern blocks laid out in time and a playhead that follows playback.

> The Pattern Grid is marked **Experimental** in Settings. 

> The [BeatBax web-lite client](/docs/tools/web-client) has no pattern grid. Use [BeatBax Desktop](/docs/tools/desktop).

## Enabling the grid

1. Open [BeatBax Desktop](/docs/tools/desktop).
2. Press `Ctrl+,` / `Cmd+,` (or **View → Settings…**) to open **Settings**.
3. On the **Features** tab, enable **Pattern Grid**.
4. Close Settings. The grid appears above the editor.

Show or hide it from the status bar **panel menu** or the **View** menu. The transport bar stays in sync with the grid playhead.

## Reading the timeline

Each row is a `channel` from the song. Blocks are the patterns (and sequence items) that channel plays, sized by musical length so you can see how parts line up across voices.

Use it to:

- See the arrangement without scanning every `seq` line
- Watch the playhead during **Play** / **Live**
- Mute or solo a channel from the row (same state as the mixer)
- Spot channels that run shorter or longer than the others

The grid is an overview of the compiled song, not a tracker piano-roll editor. Change notes and structure in the `.bax` source; Apply or Live updates the blocks.

## Related docs

- [BeatBax Desktop](/docs/tools/desktop)
- [Sequences](/docs/language/sequences)
- [Channels](/docs/language/channels)
- [Channel Mixer](/docs/tools/channel-mixer)
- [Settings](/docs/tools/settings)
