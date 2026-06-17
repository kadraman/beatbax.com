---
sidebar_position: 3
title: NES Chip
---

## NES Plugin (`chip nes`)

BeatBax includes a full NES Ricoh 2A03 APU plugin. Activate it with `chip nes` at the top of your song. The NES APU has five channels:

| Channel | Type | BeatBax type | Description |
|---------|------|--------------|-------------|
| 1 | Pulse 1 | `pulse1` | Melody / lead; duty + hardware sweep |
| 2 | Pulse 2 | `pulse2` | Harmony / counter-melody |
| 3 | Triangle | `triangle` | Bass; no hardware volume control |
| 4 | Noise | `noise` | Percussion; 16 fixed noise "pitches" |
| 5 | DMC | `dmc` | Delta-encoded sample playback |

### NES Instrument Fields

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
inst tri_kick  type=triangle  linear=4   ; short kick-reinforcement ping

; Noise — 16 fixed noise frequencies
inst kick   type=noise  noise_mode=normal  noise_period=12  env=15,down  env_period=3
inst snare  type=noise  noise_mode=normal  noise_period=6   env=14,down  env_period=1
inst hihat  type=noise  noise_mode=normal  noise_period=3   env=8,down   env_period=0

; DMC sample playback
inst bass_hit  type=dmc  dmc_rate=7  dmc_loop=false  dmc_sample="@nes/bass_c2"
```

**Key differences from Game Boy:**
- `env_period` controls the hardware envelope decay rate (0 = fastest, 15 = slowest) separately from the initial level in `env`
- Triangle has no hardware volume; `vol=0` is a software mute, any other value = full amplitude
- Noise pitch is determined by `noise_period` (0–15), not by the note name in the pattern
- Channel 5 (DMC) plays sample files, not synthesised tones

### Named Instrument Tokens (Drum Shorthand)

Add `note=` to any instrument to use its name directly as a pattern token. This is particularly useful for drum instruments where the note name is not musical pitch:

```bax
inst kick  type=noise  noise_mode=normal  noise_period=12  env=15,down  env_period=3  note=C5
inst snare type=noise  noise_mode=normal  noise_period=6   env=14,down  env_period=1  note=C5
inst hihat type=noise  noise_mode=normal  noise_period=3   env=8,down   env_period=0  note=C5

; Named tokens — instrument name triggers the note defined by note=
pat beat = kick . snare . kick . hihat hihat
```

### Software Macros

The NES plugin supports **software macros** — per-frame (60 Hz) envelope sequences that give fine-grained control over volume, arpeggio, pitch, and duty on every note attack. They replicate the FamiStudio/FamiTracker macro system.

| Macro | Applied to | Values | Effect |
|-------|------------|--------|--------|
| `vol_env` | pulse1, pulse2, noise | `0`–`15` per frame | Volume automation; overrides hardware `env` decay |
| `arp_env` | pulse1, pulse2, triangle | semitone offset per frame | Rapid arpeggio chord shimmer |
| `pitch_env` | pulse1, pulse2, triangle | semitone offset per frame | Pitch rip / fall-in on every attack |
| `duty_env` | pulse1, pulse2 | `0`–`3` per frame | Duty cycle timbral modulation |

**Syntax:** `macro_name=[v0,v1,v2,…]` — play once and hold the last value. Add `|N` to loop from index N forever:

```bax
chip nes
bpm 120

; Pitch rip — each note "falls in" 3 semitones from above (rip in 3 frames = ~50ms)
inst lead  type=pulse1  duty=25  vol=10  pitch_env=[3,2,1,0,0,0,0,0]

; Volume swell — slow attack from near-silence, hold at vol 10 (loop at index 9)
inst swell type=pulse1  duty=50  vol_env=[1,2,3,4,5,6,7,8,9,10|9]

; Cycling C-major triad arpeggio at 60 Hz (loop from index 0)
inst chord type=pulse2  duty=50  vol=8   arp_env=[0,4,7|0]

; Duty wah — alternates 50% (warm) and 12.5% (thin), looping
inst wah   type=pulse1  duty=50  vol=10  duty_env=[2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0|0]

; Percussive kick — vol_env gives faster/more expressive decay than hardware env
inst kick  type=noise  noise_mode=normal  noise_period=12  vol_env=[15,12,8,4,2,1]  note=C5

pat melody = C5 . E5 . G5 . E5 .
pat beat   = kick . kick . kick . kick .

channel 1 => inst lead  seq melody
channel 2 => inst chord seq melody
channel 4 => inst kick  seq beat

play
```

**Timing note:** One macro frame = 1/60 s (~16.7 ms) on NTSC, regardless of BPM or `stepsPerBar` (bar grouping only; `ticksPerStep` is deprecated and has no effect). `vol_env` and `env` are mutually exclusive per instrument — if `vol_env` is present, the hardware `env` decay is not applied.

See `songs/features/nes/nes_macro_*.bax` for demos, and `docs/chips/nes.md` for the full hardware reference.
