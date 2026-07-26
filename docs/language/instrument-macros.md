---
sidebar_position: 4
title: Instrument Macros
---

# Instrument Macros

Software macros add **tick-time motion** to instruments: volume shapes, pitch drops, arpeggios, and (where the chip supports it) duty/timbre steps. The same authoring style works across chips — availability and exact meaning of each field depend on the active `chip`.

Common fields:

| Field | Typical use |
|-------|-------------|
| `vol_env` | Per-frame volume (or chip-specific volume path) |
| `pitch_env` | Per-frame semitone offsets |
| `arp_env` | Per-frame arpeggio offsets |
| `duty_env` | Per-frame duty/timbre index (where the chip has duty) |

## Syntax

Arrays list per-frame values. Play once and hold the last value, or loop from index `N` with `|N`:

```bax
inst lead  type=pulse1 duty=25 vol=10 pitch_env=[3,2,1,0,0,0,0,0]
inst swell type=pulse1 duty=50 vol_env=[1,2,3,4,5,6,7,8,9,10|9]
inst chord type=pulse2 duty=50 vol=8  arp_env=[0,4,7|0]
inst wah   type=pulse1 duty=50 vol=10 duty_env=[2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0|0]
```

One macro frame is typically **1/60 s** on NTSC-style playback (chip guides note any exceptions). Prefer ending one-shot `vol_env` sequences at `0` (or silence) so the voice does not hang on the last level.

## By chip

| Chip | Macros | Notes |
|------|--------|--------|
| [NES](/docs/chips/nes) | `vol_env`, `arp_env`, `pitch_env`, `duty_env` | FamiTracker-style; `vol_env` overrides hardware `env` decay |
| [SMS / Game Gear](/docs/chips/sms) | `vol_env`, `arp_env`, `pitch_env`, `noise_rate_env` | No hardware ADSR — macros are the main articulation |
| [Spectrum 128 / CPC](/docs/chips/spectrum-128) | `arp_env`, `pitch_env`; `vol_env` is often the **shared hardware envelope** | Watch R6 / R11–R13 conflicts |
| Game Boy | `pitch_env`, `vol_env`, `duty_env`, `arp_env` | Also exports to hUGE **subpatterns**; optional native `subpat` (below) |

Chip pages list which instrument types accept which macros.

## Game Boy only: UGE subpatterns (`subpat`)

On `chip gameboy`, macros and/or native `subpat` lower into a shared tick program that drives **preview / WAV** and **hUGETracker UGE instrument subpatterns**.

hUGETracker reference: [Subpatterns](https://superdisk.github.io/hUGETracker/hUGETracker/subpatterns.html).

```bax
chip gameboy
bpm 128

# Macros → tick program (preview + UGE subpatterns)
inst kick type=noise gb:width=7 uge_note=C-6 pitch_env=[0,-2,-4,-6] vol_env=[15,12,8,4]
inst wah  type=pulse1 duty=50 env=12,flat duty_env=[2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0|0]
inst arp  type=pulse2 duty=25 env=10,flat arp_env=[0,4,7|0]

# Native subpat — wins over macros on that instrument
subpat kick_body =
  .
  +0 vol:15
  -2 vol:12 jump:5
  -4 vol:8
  -6 vol:4
  -6 vol:0
  halt

inst kick2 type=noise gb:width=7 uge_note=C-6 subpat=kick_body
```

### Game Boy field lowering (UGE)

| Field / syntax | Lowers to |
|----------------|-----------|
| `pitch_env` | Offset column |
| `vol_env` | Effect `Cxy` (wins over `duty_env` on the same tick) |
| `duty_env` | Effect `9xx` (duty index 0–3 → pulse width) |
| `arp_env` | Offset column when `pitch_env` is absent |
| `subpat name = …` + `subpat=name` | Native rows (`.`, `jump:`, `vol:`, `timbre:`, `fx:`, `halt`) |

### Game Boy notes

- Noise base pitch uses **`uge_note=`**; macro offsets are relative to that note. Prefer `uge_note=C-6` for kicks — large negative offsets from a very high base are unreliable (non-monotonic noise table).
- Macros without a loop point append silence + halt so UGE subpatterns do not auto-restart. Prefer ending `vol_env` at `0` or use explicit `halt` in `subpat`.
- Native `subpat` **wins** over macros when both are set on the same instrument.
- Wave instruments honour `volume=` in preview/PCM; tick programs apply to wave for preview and UGE export.
- Exact hUGE row timing often uses BPM values like 224, 128, 112, 64, 56. Clamp warnings may appear when offsets or `jump:` targets exceed UGE ranges.

## See also

- [Game Boy](/docs/chips/gameboy)
- [NES macros](/docs/chips/nes#software-macros)
- [SMS / Game Gear](/docs/chips/sms)
- [Spectrum 128 / CPC](/docs/chips/spectrum-128)
- [UGE export](/docs/exports/uge)
- [Feature write-up on GitHub](https://github.com/kadraman/beatbax/blob/main/docs/features/complete/gameboy-uge-instrument-subpatterns.md)
