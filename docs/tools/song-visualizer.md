---
sidebar_position: 3
title: Song Visualizer
---

# Song Visualizer

The **Song Visualizer** is a per-channel oscilloscope in [BeatBax Desktop](/docs/tools/desktop). It shows the waveform for each chip voice, plus the instrument, sequence, pattern, and bar that are playing.

> The [BeatBax web-lite client](/docs/tools/web-client) has no Song Visualizer. Use [BeatBax Desktop](/docs/tools/desktop).

## Opening the visualizer

1. Open [BeatBax Desktop](/docs/tools/desktop).
2. If the panel is missing, enable **Song Visualizer** under **Settings → Features**.
3. Select the **Visualizer** tab in the right pane (alongside **Help**).

Show or hide the pane from the status bar **panel menu** or the **View** menu.

## Channel cards

Each card is one chip channel:

- Channel name and number
- Live waveform (real analyser data during playback)
- Current instrument, sequence, and pattern
- Bar / progress readout
- **M** / **S** as secondary mute/solo (the [Channel Mixer](/docs/tools/channel-mixer) is the primary mix surface)

When playback stops, readouts reset and the canvases clear.

## Performance mode

The visualizer toolbar can put the display into a full-window overlay for live playing:

- Channel canvases expand; editor chrome is hidden
- Optional background effects (for example starfield or CRT scanlines)
- Transport / mute chrome can auto-hide; pin it if you need the controls
- Exit with **Esc** or the overlay close control

Background effect choice is stored in app preferences.

## Related docs

- [BeatBax Desktop](/docs/tools/desktop)
- [Channel Mixer](/docs/tools/channel-mixer)
- [Pattern Grid](/docs/tools/pattern-grid)
- [Settings](/docs/tools/settings)
