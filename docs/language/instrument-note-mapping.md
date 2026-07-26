---
sidebar_position: 3
title: Instrument Note Mapping
---

# Instrument Note Mapping

When using instrument names as pattern tokens (e.g. `snare`, `hihat`, `kick`), set a default pitch with `note=`. For Game Boy noise instruments, also set **`uge_note=`** so playback and hUGETracker export share the same noise clock.

## Syntax

```
inst <name> type=<type> [<params>...] note=<note>
inst <name> type=noise ... uge_note=C-6 note=C6
```

## Example: Percussion Kit

```
chip gameboy
bpm 140

inst kick       type=pulse1 duty=12.5 env=15,down,1 note=C2
inst snare      type=noise  gb:width=7  env=13,down,1 uge_note=C-7 note=C6
inst hihat_cl   type=noise  gb:width=15 env=6,down,1  uge_note=C-7 note=C6
inst hihat_op   type=noise  gb:width=15 env=8,down,3  uge_note=D-7 note=D6
inst tom_low    type=noise  gb:width=7  env=14,down,5 uge_note=C-6 note=C5
inst tom_high   type=noise  gb:width=7  env=12,down,3 uge_note=E-6 note=E5

pat kick_pat  = kick . . . kick . . .
pat snare_pat = . . . . snare . . .
pat hh_pat    = hihat_cl hihat_cl hihat_op hihat_cl

channel 1 => inst kick pat kick_pat
channel 4 => inst snare pat snare_pat hh_pat
```

## How it works

1. **Pulse / Wave with `note=`:** The specified note is the pitch played when you use the instrument name as a token.
2. **Noise with `note=`:** Sets the default pitch for named tokens in patterns (and contributes to export mapping when `uge_note` is absent).
3. **Noise with `uge_note=`:** Uses hUGETracker display notation (e.g. `C-6`, `C-7`). BeatBax derives the LFSR clock from this value for **Web Audio and PCM/WAV playback**, not only for UGE export. Prefer `uge_note` for percussion you care about hearing correctly.
4. **Without `note=`:** Defaults to C5 for backward compatibility in exports.
5. **Explicit note overrides:** `inst(kick) C3` still overrides the instrument default.

Optional `divisor` / `shift` on noise instruments can still override the clock for tests or specialised patches.

## Noise channel behaviour

The Game Boy noise channel does not use melodic pitch the way pulse/wave do. Timbre still comes from `gb:width` (and related LFSR settings), but the **noise period / clock** is selected from the hUGE note table via `uge_note` (or derived mapping) so BeatBax matches hUGETracker listening levels and export.

```
inst snare type=noise gb:width=7 env=13,down uge_note=C-7 note=C6

# Playback: LFSR clock from uge_note; timbre from width/envelope
# UGE export: stored as C-7 in hUGETracker
pat drums = snare . . .
```

Prefer `uge_note=C-6` for kicks when using large negative `pitch_env` drops — the GB noise note table is non-monotonic at some high bases.

## UGE display octave

hUGETracker displays notes **one octave higher** than BeatBax MIDI-style `note=` values:

- `note=C6` → typically C-7 in hUGETracker
- `note=C2` → typically C-3 in hUGETracker

Writing `uge_note=C-7` uses the tracker’s own notation directly.

## Recommended ranges

| Role | Typical setup |
|------|----------------|
| Kicks (pulse) | `note=C2` |
| Kicks (noise) | `uge_note=C-6` (often with `pitch_env`) |
| Snares (7-bit) | `uge_note=C-7`, `note=C6` |
| Closed hats (15-bit) | `uge_note=C-7`–`D-7` |
| Open hats | `uge_note=D-7`–`E-7` |
| Toms | `uge_note=C-6`–`E-6` |

## Sharp notes in `note=`

Avoid `#` inside `note=` values (comment parsing). Use flats or naturals: `note=Db7`, not `note=C#7`. For tracker-style sharps, use `uge_note=` (e.g. `uge_note=C#6` where supported by the noise-note helpers).

## See also

- [Instruments](/docs/language/instruments)
- [Instrument macros](/docs/language/instrument-macros)
- [UGE export](/docs/exports/uge)
- [Technical specification](https://github.com/kadraman/beatbax/blob/main/docs/features/complete/instrument-note-mapping-spec.md)
