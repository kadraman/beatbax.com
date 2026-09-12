---
sidebar_position: 3
title: Instrument Editor
---

# Instrument Editor (Experimental)

The **Instrument Editor** is a **desktop-only** right-pane tab for graphically creating and editing instruments. Edits rewrite the matching `inst` line in the open `.bax` file as an undoable change — there is no new song syntax to learn.

> The Instrument Editor is marked **Experimental** in [Settings](/docs/tools/settings) and disabled by default.

> The [BeatBax web-lite client](/docs/tools/web-client) does not include the Instrument Editor. Use [BeatBax Desktop](/docs/tools/desktop).

## Enabling the editor

1. Open [BeatBax Desktop](/docs/tools/desktop).
2. Press `Ctrl+,` / `Cmd+,` (or **View → Settings…**) to open **Settings**.
3. On the **Features** tab, enable **Instrument Editor**.
4. Close Settings. Open the **Instruments** tab from **View → Instruments**, the status bar **panel menu**, or [CodeLens **Edit**](/docs/tools/editor#codelens-previews) on an `inst` line.

## Opening and selecting instruments

| Action | What it does |
| --- | --- |
| Instrument list / dropdown | Select an instrument; reveal and highlight its `inst` line **without** focusing the editor (so preview keys stay on the panel) |
| **Show in editor** | Reveal and **focus** the selected `inst` line so you can type in source |
| CodeLens **Edit** on `inst` | Open the Instruments tab, select that instrument, reveal its line, keep focus on the panel |
| Cursor in the editor | Does **not** change Instrument Editor selection |

## What you can edit

Layout is top to bottom: list and actions, templates, name/type and chip fields, hardware envelope/sweep, waveform (when the chip supports it), macro graphs, then preview.

### List actions

| Action | Behaviour |
| --- | --- |
| **New** | Insert an `inst` from the default plugin preset for the current type |
| **Duplicate** | Copy fields to a unique name and insert after the original |
| **Rename** | Rename the definition; a checkbox (on by default) rewrites other references to that name in the buffer |
| **Delete** | Remove the `inst` line; warn if it is still referenced |

Imported instruments (`import "local:…"` / remote) appear **read-only**, with a **copy into song** action so you can edit a local copy. Editing an import would not update the `.ins` file.

### Templates

- **Plugin presets** — starter snippets from the active sound-chip plugin
- **Copy from** — copy fields from another `inst` in the current song

Applying a template overwrites editable fields of the **selected** instrument (or fills a new one). Song-wide starter kits still come from the [New Song Wizard](/docs/tools/new-song-wizard).

### Fields, hardware, waveform, macros

- **Name** and **Type** stay visible. Other scalar fields use **Voice** (duty, width, volume, sample, …) and **Defaults** (default note, GM program, UGE note). Hidden fields follow the instrument type.
- **Hardware** — parametric **Envelope** and **Sweep** with live shape preview (Game Boy packed `env=` / `sweep=`; NES discrete props). Use dashed **Add** chips to create a field; trash removes it.
- **Waveform** — Game Boy `wave` instruments: draw a 32×4-bit wavetable, paste a 32-nibble hUGE hex string, or apply shape presets (sine, square, saw, triangle). Chips without a waveform schema hide this section.
- **Macros** — graph editors for `vol_env`, `arp_env`, `duty_env`, `pitch_env`, and chip extras (for example SMS `noise_rate_env`). Click/drag to paint; Shift-drag draws a line; set a loop marker (`|n`) or leave the sequence empty to omit the field.

Field meanings stay chip-specific — see [Instruments](/docs/language/instruments), [Instrument macros](/docs/language/instrument-macros), and the [Sound Chip Plugins](/docs/chips/overview) guides.

### NES samples

For `type=dmc`, the sample control splits **scheme** (Bundled / Local / HTTPS / GitHub) from **value**. Bundled values are a name dropdown; other schemes use a text field. There is no filesystem Browse dialog.

## Preview and MIDI

Audition uses the same engine path as CodeLens instrument notes:

| Input | Behaviour |
| --- | --- |
| Mini keyboard | Hold to sustain; release to stop |
| Computer keys | Same hold-to-play while the Instruments tab is active and focus is not in a text field or Monaco; **Z** / **X** change octave |
| MIDI | Note-on / note-off audition when the Instruments tab is focused (enable MIDI from the panel strip or [Settings → Editor](/docs/tools/settings)) |

When the Instruments tab is focused, MIDI prefers **audition** over [MIDI step entry](/docs/tools/midi-step-entry) unless transport **Record** is armed. CodeLens **C3**–**C7** oneshots on `inst` lines are unchanged.

Edits validate before writeback. Failed validation keeps the previous line. Undo / Redo restores the previous `inst` text.

## Limitations

- Game Boy **`subpat`** is **read-only** in this panel: the name is shown with a jump to the `subpat` definition. Software macro graphs are locked while `subpat` is set — edit macros in source or clear `subpat` first.
- Imported instruments are read-only until copied into the song.
- The panel authors existing `inst` grammar only; it does not invent shared wave banks or a tracker-style subpattern row editor.

## Related docs

- [BeatBax Desktop](/docs/tools/desktop)
- [Settings](/docs/tools/settings)
- [BeatBax Editor](/docs/tools/editor) — CodeLens **Edit** and note audition
- [MIDI step entry](/docs/tools/midi-step-entry)
- [Instruments](/docs/language/instruments)
- [Instrument macros](/docs/language/instrument-macros)
- [Sound Chip Plugins](/docs/chips/overview)
- [New Song Wizard](/docs/tools/new-song-wizard)
