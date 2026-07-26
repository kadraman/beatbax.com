---
sidebar_position: 4
title: SMS / Game Gear
---

# Sega Master System / Game Gear (SN76489)

Activate with `chip sms` (or `chip gg` / `chip gamegear` for Game Gear–oriented stereo). Optional region: `chip sms ntsc` (default) or `chip sms pal`.

Status: **Beta**.

## Channels

| Channel | BeatBax type | Hardware |
|---------|--------------|----------|
| 1 | `tone1` | Tone 1 (square, 10-bit period) |
| 2 | `tone2` | Tone 2 |
| 3 | `tone3` | Tone 3 |
| 4 | `noise` | 15-bit LFSR (white or periodic) |

There are no hardware envelopes or LFO — articulation uses software macros and inline effects.

## Instrument fields

### Common

| Field | Description | Range |
|-------|-------------|-------|
| `vol` | Constant volume | 0–15 (**0 = loudest**, 15 = silent) |
| `vol_env` | Volume envelope macro | `[0-15,…\|loop]` |
| `gg:pan` / `gg_pan` | Game Gear stereo pan | `L`, `C`, or `R` |

### Tone (`tone1`–`tone3`)

| Field | Description |
|-------|-------------|
| `arp_env` | Arpeggio macro (semitone offsets) |
| `pitch_env` | Pitch bend macro (semitone offsets) |

### Noise

| Field | Description | Values |
|-------|-------------|--------|
| `noise_mode` | LFSR feedback | `white` or `periodic` |
| `noise_rate` | Clock divisor | `0`, `1`, `2`, or `tone3` |
| `noise_rate_env` | Animated noise rate | `[0-3,…\|loop]` |

`noise_rate=tone3` locks the noise clock to Tone 3’s period (classic kick-follows-bass trick).

## Walkthrough song

```bax
chip sms
bpm 150

inst lead  type=tone1 vol=10 vol_env=[0,3,6,9,12,15]
inst harm  type=tone2 vol=8  vol_env=[4,6,8,10]
inst bass  type=tone3 vol=12
inst kick  type=noise noise_mode=white noise_rate=2 vol_env=[0,6,10,15]

effect majorArp = arp:4,7

pat melody = C5<majorArp>:4 E5:4 G5:4 A5:4
pat bassline = C3 . G2 . A2 . F2 .
pat drums = kick . . kick kick . kick .

seq main = melody*4
seq bass_seq = bassline*4
seq drum_seq = drums*4

channel 1 => inst lead seq main
channel 2 => inst harm seq main:oct(-1)
channel 3 => inst bass seq bass_seq
channel 4 => inst kick seq drum_seq

play
```

### Tips

- Volume is **attenuation**: `vol=0` is loudest, `vol=15` is silent.
- Use `vol_env` for attacks and decays (no hardware ADSR).
- Lock kicks to the bass with `noise_rate=tone3` on the noise instrument while Tone 3 plays the root.
- For Game Gear stereo, use `chip gg` and `gg:pan=L|C|R`.

## Game Gear stereo

```bax
chip gg
bpm 140

inst lead type=tone1 vol=10 gg:pan=R
inst harm type=tone2 vol=8  gg:pan=L
inst bass type=tone3 vol=12 gg:pan=C

pat melody = C5:4 E5:4 G5:4 A5:4
channel 1 => inst lead pat melody
channel 2 => inst harm pat melody:oct(-1)
channel 3 => inst bass pat melody:oct(-2)

play
```

`gg:pan` is honoured in Web Audio / PCM and encoded in VGM via the `0x4F` stereo command.

## Effects

Supported (software-driven): arpeggio, pitch bend, vibrato, portamento, volume slide, tremolo, cut, pan / `gg:pan`. Hardware pulse **sweep** and multi-channel **echo** are not available — use `pitch_env` / `bend` instead of sweep.

## Export

- **VGM** — primary tracker/register stream for SMS/GG: [VGM export](/docs/exports/vgm)
- **WAV** / **MIDI** — common formats

## See also

- [Sound Chip Plugins overview](/docs/chips/overview)
- [Game Boy tutorial](/docs/tutorial/overview)
- [Plugin README on GitHub](https://github.com/kadraman/beatbax/blob/main/packages/plugins/chip-sms/README.md)
