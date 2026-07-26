---
sidebar_position: 5
title: Spectrum 128 / CPC
---

# ZX Spectrum 128 / Amstrad CPC (AY-3-8912)

Activate with `chip spectrum-128` (Spectrum clock) or `chip cpc` / `chip amstrad-cpc` (Amstrad 1 MHz AY clock). Same plugin; note content and macros are identical across profiles.

Status: **Experimental**.

## Hardware model

| Voice | BeatBax type | Notes |
|-------|--------------|-------|
| A | `tone1` | Square wave |
| B | `tone2` | Square wave |
| C | `tone3` | Square wave; often bass or drum borrow |
| — | shared R6 | **One** noise period for the whole chip |
| — | shared R11–R13 | **One** hardware envelope program |

Percussion is not a fourth channel — drums borrow a tone channel’s mixer and volume for short noise/tone bursts.

## Instrument fields

| Field | Range | Description |
|-------|-------|-------------|
| `vol` | 0–15 | Fixed amplitude (AY log DAC; 0 = silent, 15 = loudest) |
| `vol_env` | array | Hardware envelope program (global R11–R13) |
| `arp_env` / `pitch_env` | arrays | Software macros |
| `tone_mix` | bool | Enable noise in R7 mixer |
| `noise_rate` | 0–31 | R6 noise period (global) |
| `noise_frames` / `tone_frames` | 0–60 | Transient mixer windows (60 Hz frames) |
| `tone` / `tone_vol` | — | Tone path with optional volume cap |
| `env_bass` | bool | Buzz-bass mode (envelope as sub-oscillator) |
| `env_shape` | 0–15 | R13 shape with `env_bass` (classic buzz uses `8`) |

## Shared-resource rules

1. **Noise period (R6)** — only one `noise_rate` active per tick. Stagger drum hits or share the same rate; conflicting rates warn at verify time.
2. **Envelope (R11–R13)** — only one of `vol_env` / `env_bass` should drive the hardware envelope at a time. Do not layer envelope-lead and buzz bass that fight for R11–R13 in the same phrase.

## Walkthrough song

```bax
chip spectrum-128
bpm 120

inst lead type=tone1 vol=12 arp_env=[0,4,7|0]
inst pad  type=tone2 vol=10
inst bass type=tone3 vol=14 env_bass=true env_shape=8

pat melody = C4 E4 G4 C5 B4 G4 E4 .
pat harmony = E4 G4 B4 E5 D5 B4 G4 .
pat bass_bar = C2 _ _ _ _ _ _ _ G1 _ _ _ _ _ _ _

channel 1 => inst lead pat melody
channel 2 => inst pad  pat harmony
channel 3 => inst bass pat bass_bar

play
```

### Tips

- Hold buzz bass with `_` sustains; dots are rests and will cut the note.
- Keep percussion hits staggered, or share one `noise_rate`, so R6 does not thrash.
- Do not run `env_bass` and a melodic `vol_env` that both need R11–R13 in the same phrase.
- Target Amstrad CPC with `chip cpc` (same grammar, different AY clock).

## Buzz bass

Hold a low root with `env_bass=true` and `env_shape=8`. Sustain with `_` — a lone `C2` is only one step. Prefer long drones while arpeggios move on other channels. Avoid stacking `pitch_env` on the buzz channel or a second `vol_env` that reprograms R11–R13.

```bax
chip spectrum-128
bpm 128

inst lead type=tone1 vol=12 arp_env=[0,4,7|0]
inst bass type=tone3 vol=14 env_bass=true env_shape=8

pat melody = C4 E4 G4 C5 B4 G4 E4 .
pat bass_bar = C2 _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

channel 1 => inst lead pat melody
channel 3 => inst bass pat bass_bar

play
```

## Percussion sketch

```bax
inst kick  type=tone3 tone_mix=true noise_rate=4 vol_env=[15,12,8,4,0] pitch_env=[0,-2,-4,-6] noise_frames=2
inst snare type=tone2 tone_mix=true noise_rate=6 vol_env=[15,10,6,2,0] tone_frames=1 tone_vol=8
```

Stagger hits so only one noise timbre is needed per tick.

## Export

- **WAV** — rendered PCM
- **Arkos Tracker 3** (`.aks` / optional `.aki`) — **experimental** v1 subset; see [Arkos export](/docs/exports/arkos)

## See also

- [Sound Chip Plugins overview](/docs/chips/overview)
- [Game Boy tutorial](/docs/tutorial/overview)
- [Composition guide on GitHub](https://github.com/kadraman/beatbax/blob/main/docs/chips/zx-spectrum-128/composition_guide.md)
