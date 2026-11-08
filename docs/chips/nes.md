---
sidebar_position: 3
title: NES
description: Ricoh 2A03 — pulse, triangle, noise, and DMC; FamiTracker text export. Stable.
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
inst kick_punch type=dmc  dmc_rate=15  dmc_loop=false  dmc_sample="@nes/kick_punch"
inst bass_hit   type=dmc  dmc_rate=7   dmc_loop=false  dmc_sample="@nes/bass_saw_c1"
```

**Key differences from Game Boy:**

- `env_period` controls hardware envelope decay (0 = fastest, 15 = slowest) separately from the initial level in `env`
- Triangle has no hardware volume; `vol=0` is a software mute, any other value = full amplitude
- Noise pitch is determined by `noise_period` (0–15), not by the note name in the pattern
- Channel 5 (DMC) plays sample files, not synthesised tones — **one sample at a time**; a new trigger cuts the previous hit
- Optional `dmc_level=` (0–127) is for [FamiTracker text](/docs/exports/famitracker-text) export; BeatBax playback always starts the DAC at **64**
- In the Desktop [Instrument Editor](/docs/tools/instrument-editor), noise and DMC use **Trigger** (oneshot named hit) instead of a chromatic keyboard; triangle preview defaults to octave **2**. DMC shows an empty Macros state (macros are not available on DMC)

## DMC samples

`dmc_sample=` accepts these references:

| Reference | Source |
|-----------|--------|
| `@nes/<name>` | A sample bundled with BeatBax (Instrument Editor may show designed rate / base note as guidance only) |
| `local:<path>` | A `.dmc` file on disk. Desktop looks next to the saved song and in its parent folders; the CLI resolves the path from the working directory. Not available in the web client |
| `github:<owner>/<repo>/<path>` | A file in a GitHub repository, read from the `main` branch |
| `https://…` | Any HTTPS URL. GitHub `blob` / `raw` links are converted to `raw.githubusercontent.com` |

### Bundled kit (`@nes/…`)

Classic `@nes/kick` and `@nes/snare` are unchanged. Prefer fuller hits for new songs:

| Group | Examples |
|-------|----------|
| Drums (prefer) | `kick_punch`, `kick_body`, `snare_tight`, `snare_fat`, `hat_closed`, `hat_open`, `crash`, `crash_cym`, `rim`, `shaker`, `cowbell` |
| Classic / aliases | `kick`, `snare`, `hihat` (distinct from clap — no longer aliases clap), `clap`, `bass`, `bass_c2` |
| 808 (Fischer CC0) | `kick_808`, `snare_808`, `hat_808`, `hat_open_808`, `clap_808`, `cymbal_808`, `rim_808`, `cowbell_808`, `maracas_808`, `tom_low_808`, `tom_mid_808`, `tom_high_808` |
| 909 | `kick_909`, `snare_909`, `hat_909`, `hat_open_909` |
| Pitched bass | `bass_saw_c0`, `bass_saw_d0`, `bass_saw_e0`, `bass_saw_g0`, `bass_saw_a0`, `bass_saw_c1` |
| Hits / speech | `orch_hit`, `orch_hit_up`; `voice_ready` (designed for `dmc_rate=12`), `voice_go`, `voice_correct`, `voice_set`, `voice_hurry_up`, `voice_level_up`, `voice_go_go_go`, `voice_you_win` |

Provenance for bundled samples lives in the toolchain repo (`samples/dmc/NOTICE`). Keep hats on noise for continuous grooves; use DMC hats as accents — channel 5 cannot overlap kick and snare.

```bax
inst kick_punch type=dmc  dmc_rate=15  dmc_loop=false  dmc_sample="@nes/kick_punch"
inst voice_ready type=dmc  dmc_rate=12  dmc_loop=false  dmc_sample="@nes/voice_ready"
inst remote_kick type=dmc  dmc_rate=15  dmc_loop=false  dmc_sample="github:kadraman/beatbax-samples/dmc/kick.dmc"
```

In [BeatBax Desktop](/docs/tools/desktop), remote samples are downloaded only from hosts in the [remote host allowlist](/docs/tools/settings#remote-host-allowlist). `raw.githubusercontent.com` is always allowed, so `github:` references work out of the box. Other hosts must be added under **Settings → Advanced → Remote host allowlist**.

A sample that cannot be loaded (blocked host, HTTP error, timeout, missing file) does not stop playback; that instrument is silent. Desktop reports it once per play as a `[playback]` warning in the **Output** panel, for example:

```text
NES DMC: failed to load sample 'https://example.com/snare.dmc': Remote asset host 'example.com' is not in the Desktop allowlist. Add it under Settings → Advanced → Remote host allowlist.
```

The CLI and WAV export print the failure to the console instead. Convert your own WAVs with [`beatbax convert wav2dmc`](/docs/tools/cli#nes-dmc-wav2dmc).

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
| `arp_env` | pulse1, pulse2, triangle, noise | semitone offset per frame | Rapid arpeggio shimmer |
| `pitch_env` | pulse1, pulse2, triangle, noise | semitone offset per frame | Pitch rip / fall-in |
| `duty_env` | pulse1, pulse2 | `0`–`3` per frame | Duty cycle modulation |

DMC instruments do not use software macros (the Instrument Editor shows an empty-state note instead of inert arp/pitch graphs).

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
