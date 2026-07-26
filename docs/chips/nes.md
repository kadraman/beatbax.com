---
sidebar_position: 3
title: NES
---

# NES (Ricoh 2A03)

BeatBax includes a built-in NES APU. Activate it with `chip nes` (or `chip famicom`) at the top of your song. Optional region: `chip nes ntsc` (default) or `chip nes pal`.

Status: **Stable**.

The main [Tutorial](/docs/tutorial/overview) is Game Boy–focused. This page covers NES-specific channels, instruments, and macros.

## Channels

| Channel | BeatBax type | Description |
|---------|--------------|-------------|
| 1 | `pulse1` | Melody / lead; duty + hardware sweep |
| 2 | `pulse2` | Harmony / counter-melody |
| 3 | `triangle` | Bass; no hardware volume control |
| 4 | `noise` | Percussion; 16 fixed noise “pitches” |
| 5 | `dmc` | Delta-encoded sample playback |

## Instrument fields

```bax
chip nes
bpm 150

; Pulse channels — duty, envelope, optional hardware sweep
inst lead   type=pulse1  duty=25   env=13,down   env_period=2
inst harm   type=pulse2  duty=50   env=10,down   env_period=4

; Sweep-driven pitch slide (Pulse 1 and Pulse 2 both have hardware sweep)
inst sweep  type=pulse1  duty=25   env=13,down   sweep_en=true  sweep_period=3  sweep_dir=down  sweep_shift=2

; Triangle — no hardware volume; use linear= for short percussive pings
inst bass      type=triangle
inst tri_kick  type=triangle  linear=4

; Noise — 16 fixed noise frequencies
inst kick   type=noise  noise_mode=normal  noise_period=12  env=15,down  env_period=3
inst snare  type=noise  noise_mode=normal  noise_period=6   env=14,down  env_period=1
inst hihat  type=noise  noise_mode=normal  noise_period=3   env=8,down   env_period=0

; DMC sample playback
inst bass_hit  type=dmc  dmc_rate=7  dmc_loop=false  dmc_sample="@nes/bass_c2"
```

**Key differences from Game Boy:**

- `env_period` controls hardware envelope decay (0 = fastest, 15 = slowest) separately from the initial level in `env`
- Triangle has no hardware volume; `vol=0` is a software mute, any other value = full amplitude
- Noise pitch is determined by `noise_period` (0–15), not by the note name in the pattern
- Channel 5 (DMC) plays sample files, not synthesised tones

## Named instrument tokens

Add `note=` to use the instrument name as a pattern token (useful for drums):

```bax
inst kick  type=noise  noise_mode=normal  noise_period=12  env=15,down  env_period=3  note=C5
inst snare type=noise  noise_mode=normal  noise_period=6   env=14,down  env_period=1  note=C5
inst hihat type=noise  noise_mode=normal  noise_period=3   env=8,down   env_period=0  note=C5

pat beat = kick . snare . kick . hihat hihat
```

## Software macros

Per-frame (60 Hz) envelope sequences (FamiTracker / FamiStudio style):

| Macro | Applied to | Values | Effect |
|-------|------------|--------|--------|
| `vol_env` | pulse1, pulse2, noise | `0`–`15` per frame | Volume automation; overrides hardware `env` decay |
| `arp_env` | pulse1, pulse2, triangle | semitone offset per frame | Rapid arpeggio shimmer |
| `pitch_env` | pulse1, pulse2, triangle | semitone offset per frame | Pitch rip / fall-in |
| `duty_env` | pulse1, pulse2 | `0`–`3` per frame | Duty cycle modulation |

Syntax: `macro_name=[v0,v1,…]` — play once and hold the last value. Add `|N` to loop from index N:

```bax
chip nes
bpm 120

inst lead  type=pulse1  duty=25  vol=10  pitch_env=[3,2,1,0,0,0,0,0]
inst swell type=pulse1  duty=50  vol_env=[1,2,3,4,5,6,7,8,9,10|9]
inst chord type=pulse2  duty=50  vol=8   arp_env=[0,4,7|0]
inst wah   type=pulse1  duty=50  vol=10  duty_env=[2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0|0]
inst kick  type=noise  noise_mode=normal  noise_period=12  vol_env=[15,12,8,4,2,1]  note=C5

pat melody = C5 . E5 . G5 . E5 .
pat beat   = kick . kick . kick . kick .

channel 1 => inst lead  seq melody
channel 2 => inst chord seq melody
channel 4 => inst kick  seq beat

play
```

One macro frame = 1/60 s on NTSC, regardless of BPM. If `vol_env` is present, hardware `env` decay is not applied.

## Export

- [FamiTracker text](/docs/exports/famitracker-text)
- WAV / MIDI

## See also

- [Sound Chip Plugins overview](/docs/chips/overview)
- [Game Boy tutorial](/docs/tutorial/overview)
- Example macros: `songs/features/nes/nes_macro_*.bax` in the toolchain repo
