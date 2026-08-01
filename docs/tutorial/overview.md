---
sidebar_position: 1
title: Overview
---

# BeatBax Tutorial (Game Boy)

This tutorial builds a simple but complete BeatBax song called **Tutorial Groove** for the Game Boy sound chip. 
The song will be constructed and explained section by section. 

On sections with examples, you can press **Play** to hear a preview, or **Copy** to copy and paste the full playable source into **BeatBax Desktop**, the [web-lite client](https://app.beatbax.com), or a `.bax` file for the [CLI](/docs/tools/cli).

> Note: when examples hide surrounding wiring with `…`, **Copy** still copies a complete playable song for you to try.

For **NES, SMS/Game Gear, Spectrum 128 / CPC**, see [Sound Chip Plugins](/docs/chips/overview). The grammar is the same; instrument types and channel layouts change with the chip.

## Topics

Work through these sections in order:

| Topic | What you’ll learn |
|-------|-------------------|
| [Song header](/docs/tutorial/song-header) | `song` fields, `chip gameboy`, `bpm` |
| [Notes and lengths](/docs/tutorial/notes) | Pitch, steps, `:N`, rests, sustains |
| [Instruments](/docs/tutorial/instruments) | Pulse, wave, noise, macros, drum kit |
| [Patterns & sequences](/docs/tutorial/sequencing) | `pat`, `seq`, four-channel arrangement |
| [Modifiers](/docs/tutorial/modifiers) | Colon-chained transforms (`:oct`, `:rot`, …) |
| [Effects](/docs/tutorial/effects) | Vibrato, arpeggio, portamento on the finished song |

Optional language topics outside this walkthrough: [Scale awareness](/docs/language/scale), [Imports](/docs/language/imports), [Effects reference](/docs/language/effects).
