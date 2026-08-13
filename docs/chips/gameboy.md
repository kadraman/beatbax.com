---
sidebar_position: 2
title: Game Boy
---

# Game Boy (DMG-01)

Activate with `chip gameboy` (or `chip gb`).

Status: **Stable**.

The step-by-step [Tutorial](/docs/tutorial/overview) walks through writing a Game Boy song. This page is the chip reference: channels, instruments, macros, and export.

Generic language topics: [Instruments](/docs/language/instruments), [Instrument macros](/docs/language/instrument-macros), [Instrument note mapping](/docs/language/instrument-note-mapping).

## Channels

| Channel | BeatBax type | Description |
|---------|--------------|-------------|
| 1 | `pulse1` | Melody / lead; duty + hardware sweep |
| 2 | `pulse2` | Harmony / bass; duty (no hardware sweep) |
| 3 | `wave` | 32-nibble wavetable (Wave RAM) |
| 4 | `noise` | LFSR noise; percussion and FX |

## Instrument fields

```bax
chip gameboy
bpm 128

inst lead  type=pulse1 duty=50 env=gb:12,down,1
inst bass  type=pulse2 duty=25 env=gb:10,down,1
inst pad   type=wave   wave=[0,2,4,6,8,10,12,14,15,14,12,10,8,6,4,2] volume=100
inst snare type=noise  gb:width=7 env=gb:13,down,1 length=16 uge_note=C-7 note=C6 pitch_env=[0,7,0] vol_env=[13,10,6,2]
```

| Type | Key fields |
|------|------------|
| `pulse1` / `pulse2` | `duty` (12.5 / 25 / 50 / 75), `env`, `sweep` (pulse1 only) |
| `wave` | `wave=` (32 nibbles, 16-value shorthand, or 32-char hex), `volume=` / `vol=` |
| `noise` | `gb:width`, `uge_note=`, optional `divisor` / `shift`, `env` |

### Pulse (duty)

| Duty | Character |
|------|-----------|
| 12.5% | Thin, cutting (arpeggios, trebly leads) |
| 25% | Classic square-like |
| 50% | Balanced, full |
| 75% | Darker / thicker |

- `env=gb:<initial>,<up|down>,<period>` — `initial` 0–15; `period` 0 means constant volume.
- `sweep` (Pulse 1 only) applies frequency shifts over time; keep parameters moderate to avoid abrupt jumps.
- Short envelope periods (1–2) → plucky; long periods → pads.

### Wave

The wave channel plays a custom **32 4-bit nibbles** (0–15) stored in Wave RAM.

| Input form | Behaviour |
|------------|-----------|
| 32-value array | Used directly (preferred) |
| 16-value array | Tiled to 32 (entries 0–15 repeated) |
| 32-char hex string | Native hUGETracker format (one nibble per character) |

Values are clamped to 0..15. Prefer peaks near 15 for loudness; avoid strong DC bias.

```bax
# 32 values (preferred)
wave = [0,2,4,6,8,10,12,14,15,14,12,10,8,6,4,2,0,2,4,6,8,10,12,14,15,14,12,10,8,6,4,2]

# 16-value shorthand (tiled)
wave = [0,2,4,6,8,10,12,14,15,14,12,10,8,6,4,2]

# Hex string
wave = "02468ACDFFEDCA862468ACDF0FDCA864"
```

High-harmonic tables may alias at high pitches — reduce highs or lower the octave.

#### Wave channel volume

Per-wave-instrument output level via `volume=` (or `vol=` with `%`). This is an **NR32 output-level selector**, not an envelope. Changes apply on note retrigger / instrument change only.

| BeatBax `volume=` | hUGE stored | NR32 (hex) |
|------------------:|:-----------:|:----------:|
| `100` | `1` | `0x20` |
| `50` | `2` | `0x40` |
| `25` | `3` | `0x60` |
| `0` | `0` | `0x00` |

```bax
inst wave_loud type=wave wave=[8,11,13,14,15,14,13,11,8,4,2,1,0,1,2,4] volume=100
inst wave_soft type=wave wave=[8,11,13,14,15,14,13,11,8,4,2,1,0,1,2,4] volume=50

pat hold = C4:8
seq hold_seq = hold:inst(wave_loud) hold:inst(wave_soft)
channel 3 => seq hold_seq
```

Tips: use `100` for leads/bass, `50` for pads, `25` only when intentionally quiet. If the wave still sounds quiet at `100`, check wavetable peaks.

### Noise (LFSR)

| Setting | Use |
|---------|-----|
| `gb:width=7` | Metallic / pitched crack (snares, toms, kicks) |
| `gb:width=15` | Broader white noise (hats, shakers) |
| `uge_note=` | Noise clock (hUGE notation) for playback + export |
| `divisor` / `shift` | Optional LFSR rate overrides |

Typical percussion: snares use `width=7`, `uge_note=C-7`, `length=16`, and a short `pitch_env` / `vol_env` pop (e.g. `pitch_env=[0,7,0]` `vol_env=[13,10,6,2]`); hats use `width=15` with short quiet envelopes. Named tokens and ranges: [Instrument note mapping](/docs/language/instrument-note-mapping).

### Cheat-sheet

| Instrument | Key params | Typical defaults |
|---|---|---|
| Pulse 1 / 2 | `duty`, `env`, `sweep` (Pulse 1 only) | duty 50, `env=gb:15,down,1` |
| Wave | `wave=[32]`, `volume=` | 32 nibbles 0..15, volume `100` |
| Noise | `gb:width`, `uge_note`, `env`, macros | width 7 or 15; snares: `uge_note=C-7` + `pitch_env`/`vol_env` |

## Software macros and UGE subpatterns

Game Boy supports `pitch_env`, `vol_env`, `duty_env`, and `arp_env`, plus optional native `subpat`.

- Authoring and demos: [Instrument macros](/docs/language/instrument-macros)
- How they lower into hUGETracker instrument subpatterns: [UGE export](/docs/exports/uge#instrument-subpatterns)

## Export

- [UGE (hUGETracker)](/docs/exports/uge)
- WAV / MIDI / JSON

## See also

- [Tutorial (Game Boy walkthrough)](/docs/tutorial/overview)
- [Sound Chip Plugins overview](/docs/chips/overview)
- [Instruments](/docs/language/instruments)
- [Instrument note mapping](/docs/language/instrument-note-mapping)
