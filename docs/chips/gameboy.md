---
sidebar_position: 2
title: Game Boy
---

# Game Boy (DMG-01)

Activate with `chip gameboy` (or `chip gb`).

Status: **Stable**.

The step-by-step [Tutorial](/docs/tutorial/overview) walks through writing a Game Boy song. This page is the chip reference: channels, instruments, macros, and export.

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
inst snare type=noise  gb:width=7 env=gb:12,down,1 uge_note=C-7 note=C6
```

| Type | Key fields |
|------|------------|
| `pulse1` / `pulse2` | `duty` (12.5 / 25 / 50 / 75), `env`, `sweep` (pulse1 only) |
| `wave` | `wave=` (32 nibbles, 16-value shorthand, or 32-char hex), `volume=` / `vol=` |
| `noise` | `gb:width`, `uge_note=`, optional `divisor` / `shift`, `env` |

Full field detail: [Instruments reference](/docs/language/instruments). Percussion / `note=` / `uge_note=`: [Instrument note mapping](/docs/language/instrument-note-mapping).

## Software macros and UGE subpatterns

Game Boy supports `pitch_env`, `vol_env`, `duty_env`, and `arp_env`. Those macros (and optional native `subpat`) lower into a tick program for preview/WAV **and** hUGETracker instrument subpatterns.

See [Instrument macros](/docs/language/instrument-macros) — especially the Game Boy `subpat` section.

## Export

- [UGE (hUGETracker)](/docs/exports/uge)
- WAV / MIDI / JSON

## See also

- [Tutorial (Game Boy walkthrough)](/docs/tutorial/overview)
- [Sound Chip Plugins overview](/docs/chips/overview)
- [Instruments reference](/docs/language/instruments)
