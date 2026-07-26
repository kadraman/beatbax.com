---
sidebar_position: 4
title: Patterns & Sequences
---

# Patterns & Sequences

This page uses **Game Boy** channel layout. Songs are built from **patterns** (`pat`), **sequences** (`seq`), and **channel** mappings that assign instruments and material to each voice.

## Patterns (`pat`)

Pattern tokens:

| Token | Meaning |
|-------|---------|
| `C4`, `G#5`, `A3` | Notes (scientific pitch) |
| `.` | Rest (cuts the previous note) |
| `_` or `-` | Sustain (extends the previous note) |
| `C4:4` | Duration shorthand (`C4 _ _ _`) |
| `(C5 E5 G5)*2` | Group and repeat |
| `snare`, `hihat` | Named instrument tokens |
| `inst(name,N)` | Temporary override for the next **N non-rest** tokens |
| `inst(name)` | Permanent default instrument for the rest of the pattern |

### Instrument overrides

The count `N` in `inst(name,N)` applies only to notes/sustains — rests (`.`) do **not** consume from the count:

```bax
# Both C4 notes use lead_in; the rest does not count
pat p = inst(lead_in,2) C4 . C4
```

## Sequences (`seq`) and channels

Map patterns (and instruments) onto chip channels:

```bax
seq lead_seq  = melody melody
seq bass_seq  = bass_pat*2

channel 1 => inst leadA seq lead_seq
channel 2 => inst bass  seq bass_seq
channel 4 => inst snare seq drums_seq
```

### Channel syntax variants

| Form | Example |
|------|---------|
| Explicit seq | `seq myseq = pat1 pat2` then `channel 1 => inst leadA seq myseq` |
| Inline seq list | `channel 1 => inst leadA seq pat1 pat2` |
| Inline pat list | `channel 1 => inst leadA pat pat1 pat2` |
| Single pattern | `channel 1 => inst leadA pat melody` |
| Scale lock | `channel 2 => inst bass seq bassline lock=root+fifth` |

On Game Boy, channels are typically: 1 pulse1, 2 pulse2, 3 wave, 4 noise. Other chips use their own channel counts — see [Sound Chip Plugins](/docs/chips/overview).

Use **one `channel` line per chip voice**. Comma-separated `seq` items on a channel play in order (multi-row layouts).

### Sequence list syntax

```bax
# comma-separated and space-separated
channel 1 => inst leadA seq lead,lead2
channel 2 => inst bass  seq lead lead2

# repetition and group repetition
seq bass_repeat = bass_pat*2
seq arranged = (lead_pat lead_alt)*2 bass_repeat
channel 3 => inst wave1 seq arranged
```

- `seq a * 2` or `a*2` repeats `a` twice
- `(a b)*2` repeats the group
- Per-item modifiers apply during expansion: `lead:inst(leadB):slow(2)` — see [Modifiers](/docs/tutorial/modifiers)
- Empty `seq NAME =` lines are errors: `verify` reports them; `play` / `export` abort

## See also

- [Modifiers](/docs/tutorial/modifiers)
- [Instruments](/docs/tutorial/instruments)
- [Scale awareness](/docs/tutorial/scale)
- [Effects](/docs/tutorial/effects)
