---
sidebar_position: 1
title: Overview
---

# BeatBax Tutorial (Game Boy)

In this tutorial we will build a simple but complete **BeatBax** song called **Tutorial Groove** for the Game Boy sound chip, section by section.

On pages with examples, press **Play** to hear a preview, or **Copy** to copy the full playable song and paste it into [BeatBax Desktop](/docs/tools/desktop), the [BeatBax web-lite client](https://app.beatbax.com), or a `.bax` file for the [BeatBax CLI](/docs/tools/cli).

> Note: examples hide surrounding song wiring with `…`, however **Copy** still copies a complete playable song for you to try.

For **NES, SMS/Game Gear, Spectrum 128 / CPC**, see [Sound Chip Plugins](/docs/chips/overview). The grammar is the same only instrument types and channel layouts change with the chip.

## Topics

Work through these sections in order:

| Topic | What you’ll learn |
|-------|-------------------|
| [Song header](/docs/tutorial/song-header) | `song` fields, `chip gameboy`, `bpm` |
| [Notes and lengths](/docs/tutorial/notes) | Pitch, steps, `:N`, rests, sustains |
| [Instruments](/docs/tutorial/instruments) | Pulse, wave, noise, macros, drum kit |
| [Sequencing](/docs/tutorial/sequencing) | `pat`, `seq`, four-channel arrangement |
| [Modifiers](/docs/tutorial/modifiers) | Colon-chained transforms (`:oct`, `:rot`, …) |
| [Effects](/docs/tutorial/effects) | Vibrato, arpeggio, portamento on the finished song |

Optional language topics outside this walkthrough: [Scale awareness](/docs/language/scale), [Imports](/docs/language/imports), [Effects reference](/docs/language/effects).

## Next

Continue with [Song header](/docs/tutorial/song-header) — metadata and global directives for **Tutorial Groove**.
