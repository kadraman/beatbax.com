---
sidebar_position: 1
title: Sound Chips
---

BeatBax supports multiple sound chip backends.

## Built-in chips

- **Game Boy (DMG-01)** — 4 channels: pulse1, pulse2, wave, noise
- **NES (Ricoh 2A03)** — 5 channels: pulse, triangle, noise, DMC

Use `chip gameboy` or `chip nes` at the top of your `.bax` song.

## Plugin chips

Additional backends can be loaded as plugins, including Sega Master System / Game Gear and ZX Spectrum 128. See the [toolchain roadmap](https://github.com/kadraman/beatbax/blob/main/ROADMAP.md) for the full list.

- [NES chip guide](/docs/tutorial/nes)
- [Game Boy instrument note mapping](/docs/language/instrument-note-mapping)
