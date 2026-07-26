---
sidebar_position: 4
title: VGM Export
---

# VGM Export (SMS / Game Gear)

BeatBax can export Sega Master System / Game Gear songs to **VGM** (Video Game Music) register streams via `@beatbax/plugin-exporter-vgm`.

Target: `chip sms` / `chip gg` (SN76489). VGM version **1.61** (supports Game Gear stereo `0x4F` commands).

## Quick start

```powershell
node bin/beatbax export vgm songs/sms/your_song.bax output.vgm
# or
beatbax export vgm song.bax --out song.vgm
```

Open the result in VGMPlay, Mesen, OpenMSX, RetroArch, or flash-cart VGM players.

## What is exported

- Expanded per-tick PSG register writes (`0x50`) for tone period, volume, and noise control
- Game Gear stereo updates (`0x4F`) when `gg:pan` / `gg_pan` is used
- Frame waits (`0x62` NTSC / `0x63` PAL) and end marker (`0x66`)
- Optional GD3 metadata from `song name` / `song artist` / related fields

Software macros (`vol_env`, `arp_env`, `pitch_env`, `noise_rate_env`) are expanded before export so the VGM stream matches preview timing.

## Region / clock

`chip sms ntsc` vs `chip sms pal` selects the SN76489 clock written into the VGM header (and frame wait rate).

## Tips

- Prefer songs that already verify cleanly: `node bin/beatbax verify song.bax`
- Use `gg:pan` only when you want Game Gear stereo behaviour
- WAV export remains available for rendered listening comparisons

## See also

- [SMS / Game Gear chip guide](/docs/chips/sms)
- [CLI](/docs/tools/cli)
- [Feature write-up on GitHub](https://github.com/kadraman/beatbax/blob/main/docs/features/complete/vgm-exporter-plugin.md)
