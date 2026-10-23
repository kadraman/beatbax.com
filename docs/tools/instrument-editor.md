---
sidebar_position: 3
title: Instrument Editor
---

# Instrument Editor (Experimental)

The **Instrument Editor** is a **desktop-only** right-pane tab for graphically creating and editing instruments. Valid edits can rewrite the matching `inst` line in the open `.bax` file as an undoable change — there is no new song syntax to learn.

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

## Live edit vs draft

The toolbar **Live edit** control (bolt icon) chooses whether panel tweaks rewrite the `.bax` `inst` line immediately.

| Mode | Behaviour |
| --- | --- |
| **Live edit on** (default) | Each valid field or macro change writes the `inst` line (same as earlier Instrument Editor behaviour) |
| **Live edit off** | Changes stay in a **panel draft** so you can audition without rewriting source. **Apply** (check) writes the draft to the editor; **Revert** (U-turn) discards panel edits and reloads from the current `inst` line |

Hover or focus a toolbar icon to see a short hint on the status strip under the toolbar (not a floating OS tooltip).

If you leave a dirty draft (switch instrument, New, Delete, …), the panel asks whether to **Apply**, **Discard**, or **Cancel**. Preference for Live edit is remembered across sessions.

Structural actions (**New**, **Duplicate**, **Rename**, **Delete**, copy imported) still change the song buffer when confirmed; they are not draft-only.

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

Bundled `@nes/…` samples may show read-only **designed rate** / **base note** guidance in the panel (for example `@nes/bass_c2`). That metadata does not change playback; `dmc_rate` remains the authoring control.

## Preview and MIDI

Audition uses the same engine path as CodeLens. The control layout depends on the instrument **type** (and a few props):

| Preview mode | Typical types | Panel control |
| --- | --- | --- |
| **Melodic** | Pulse, wave, triangle, SMS/Spectrum tone (without noise mix) | Chromatic mini-keyboard; default octave from the type (e.g. wave/triangle **2**, SMS tone3 **3**, leads **4**), overridden by `note=` when that octave is in range **2–7** |
| **Oneshot** | NES/SMS noise, NES DMC; Spectrum/AY with `tone_mix=true` | **Trigger** (named instrument hit) — not a chromatic octave as the pitch source |
| **UGE note** | Game Boy noise | **Trigger** plus a tracker-note strip for `uge_note` clock audition |

| Input | Behaviour |
| --- | --- |
| Mini keyboard (melodic) | Hold to sustain; release to stop; **Z** / **X** change octave |
| Trigger (oneshot / UGE) | Plays a named hit sized to the envelope or sample; key release does not cut the hit short |
| UGE strip | Auditions a temporary `uge_note` only; does not rewrite Defaults unless you edit that field |
| Computer keys | Same mapping while the Instruments tab is active and focus is not in a text field or Monaco |
| MIDI | Follows the same mode (sustain for melodic; oneshot hit for Trigger types) when the Instruments tab is focused |

When the Instruments tab is focused, MIDI prefers **audition** over [MIDI step entry](/docs/tools/midi-step-entry) unless transport **Record** is armed.

CodeLens on `inst` lines matches the mode: melodic types show note lenses centred on the type octave; oneshot / UGE types show **▶ Hit** or **▶ Sample** (DMC).

With Live edit off, audition uses the **panel draft** (including unsaved macro tweaks).

Invalid drafts never write the editor (write-valid-only). Undo / Redo restores previous `inst` text after a successful write.

## Limitations

- Game Boy **`subpat`** is **read-only** in this panel: the name is shown with a jump to the `subpat` definition. Software macro graphs are locked while `subpat` is set — edit macros in source or clear `subpat` first.
- Imported instruments are read-only until copied into the song.
- The panel authors existing `inst` grammar only; it does not invent shared wave banks or a tracker-style subpattern row editor.
- SMS tone channels cannot distinguish pitches below about **A2** (10-bit period clamp); the editor defaults tone3 preview to octave **3** so keyboard notes stay distinct.

## Related docs

- [BeatBax Desktop](/docs/tools/desktop)
- [Settings](/docs/tools/settings)
- [BeatBax Editor](/docs/tools/editor) — CodeLens **Edit** and note audition
- [MIDI step entry](/docs/tools/midi-step-entry)
- [Instruments](/docs/language/instruments)
- [Instrument note mapping](/docs/language/instrument-note-mapping)
- [Instrument macros](/docs/language/instrument-macros)
- [Sound Chip Plugins](/docs/chips/overview)
- [New Song Wizard](/docs/tools/new-song-wizard)
