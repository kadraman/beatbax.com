---
sidebar_position: 1
title: Overview
---

# Sound Chip Plugins

BeatBax songs declare a target chip with `chip <name>`. The same grammar drives editing, live playback, WAV/MIDI export, and chip-specific tracker or register formats where available.

The step-by-step [Tutorial](/docs/tutorial/overview) teaches song writing on the **Game Boy**. Use this section for chip-specific voices, macros, and exports on every supported backend.

## Supported chips

| Chip | Directive | Status | Voices (overview) | Notable exports |
|------|-----------|--------|-------------------|-----------------|
| Game Boy (DMG-01) | `chip gameboy` / `gb` | Stable | 2× pulse, wave, noise | hUGETracker `.uge`, WAV, MIDI, JSON |
| NES (Ricoh 2A03) | `chip nes` / `famicom` | Stable | 2× pulse, triangle, noise, DMC | FamiTracker text, WAV, MIDI |
| Sega Master System / Game Gear (SN76489) | `chip sms` / `chip gg` | Beta | 3× tone, noise | VGM, WAV |
| ZX Spectrum 128 / Amstrad CPC (AY) | `chip spectrum-128` / `chip cpc` | Experimental | 3× tone (+ shared noise/envelope) | WAV, experimental Arkos `.aks` |

Optional region qualifiers: `chip sms ntsc|pal`, `chip nes ntsc|pal`. Spectrum/CPC select the platform via the chip name (no NTSC/PAL qualifier).

## Guides

- [Game Boy](/docs/chips/gameboy) — also the focus of the [Tutorial](/docs/tutorial/overview)
- [NES](/docs/chips/nes)
- [SMS / Game Gear](/docs/chips/sms)
- [ZX Spectrum 128 / CPC](/docs/chips/spectrum-128)
- [Instrument macros](/docs/language/instrument-macros)
- [Instrument note mapping](/docs/language/instrument-note-mapping) (Game Boy percussion / `uge_note`)

More backends are planned — see the [toolchain roadmap](https://github.com/kadraman/beatbax/blob/main/ROADMAP.md).
