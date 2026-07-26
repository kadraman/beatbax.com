---
sidebar_position: 1
title: Overview
---

# BeatBax Tutorial (Game Boy)

This tutorial walks through writing a **Game Boy** (`.bax`) song — instruments, patterns, sequences, modifiers, and effects — using `chip gameboy`.

Play along in the [web-lite client](https://app.beatbax.com), [Desktop](/docs/tools/desktop), or the [CLI](/docs/tools/cli).

For **NES, SMS/Game Gear, Spectrum 128 / CPC**, and chip-specific exports, see the [Sound Chip Plugins](/docs/chips/overview) section. The grammar is the same; instrument types and channel layouts change with the chip.

## Demo files

- `songs/sample.bax` — Game Boy example shipped with the repo
- `songs/features/metadata_example.bax` — `song` metadata directives
- [Metadata directives](/docs/language/metadata-directives) — syntax and export mapping

## Topics

Work through these sections in order, or jump to what you need:

| Topic | What you’ll learn |
|-------|-------------------|
| [Instruments](/docs/tutorial/instruments) | Game Boy `inst` types, envelopes, percussion / `uge_note` |
| [Patterns & sequences](/docs/tutorial/sequencing) | `pat`, `seq`, and four-channel arrangement |
| [Modifiers](/docs/tutorial/modifiers) | Colon-chained transforms (`:oct`, `:rot`, `:every`, …) |
| [Effects](/docs/tutorial/effects) | Named presets and inline effects (`vib`, `arp`, `port`, …) |
| [Scale awareness](/docs/tutorial/scale) | Optional `scale` + channel `lock` |

## Other chips

| Chip | Guide |
|------|--------|
| Game Boy | [Game Boy](/docs/chips/gameboy) (this tutorial) |
| NES | [NES](/docs/chips/nes) |
| SMS / Game Gear | [SMS / Game Gear](/docs/chips/sms) |
| Spectrum 128 / CPC | [Spectrum 128 / CPC](/docs/chips/spectrum-128) |
| Overview | [Sound Chip Plugins](/docs/chips/overview) |
