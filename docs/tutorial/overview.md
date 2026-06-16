---
sidebar_position: 1
title: Tutorial Overview
---

# BeatBax — Tutorial

This tutorial shows how to write `.bax` songs, use the CLI for playback and export, and use the Web UI at [app.beatbax.com](https://app.beatbax.com). 
BeatBax is a complete live-coding language for retro console chiptunes with deterministic playback and multiple export formats.

**Files used in the demo**
- `songs/sample.bax` — example song shipped with the repo.
- [app.beatbax.com](https://app.beatbax.com) — the Web UI for live editing and playback.
- `songs/features/metadata_example.bax` — example showing `song` metadata directives (name, artist, description, tags).
- See [Metadata directives](/docs/language/metadata-directives) for details on metadata syntax and export mapping.

**Language Quick Reference**

- import directive: import instrument collections from external `.ins` files
  - Syntax: `import "local:path/to/instruments.ins"` (local files) or `import "github:user/repo/branch/file.ins"` (remote)
  - **Local imports require `local:` prefix** and are CLI-only (blocked in browser for security)
  - **Remote imports** support `github:` and `https:` protocols and work in both CLI and browser
  - Paths: relative to song file (e.g., `local:lib/common.ins` or `local:../shared/drums.ins`)
  - Search paths: fallback to current working directory if relative path not found
  - Cycle detection: recursive imports supported with automatic cycle prevention
  - Merging: last-wins semantics (local definitions override imported ones)
  - Browser: remote imports resolved at runtime by web UI; local imports not supported (blocked for security)
  - See `songs/features/local_import_example.bax`, `songs/features/remote_import_example.bax`, and [Instrument imports](https://github.com/kadraman/beatbax/blob/main/docs/features/complete/instrument-imports.md) for examples

- inst definitions: define instruments and their params.
  - Example: `inst leadA type=pulse1 duty=60 env=gb:12,down,1 gm=81`
  - Fields: `type` (pulse1|pulse2|wave|noise), `duty` (pulse duty %), `env` (envelope), `wave` (16-entry wavetable), `sweep` (frequency sweep)
  - `sweep` (Pulse 1 only): `time,direction,shift`
    - `time`: 0-7 (0=off, 7=slowest)
    - `direction`: `up` (pitch up) or `down` (pitch down)
    - `shift`: 0-7 (amount of change per step)
    - Example: `inst riser type=pulse1 sweep=5,up,2`
    - Note: Pitch `up` increases the frequency register, while `down` decreases it, following Game Boy hardware behavior.
  - `gm` (optional): General MIDI program number (0-127). When present the MIDI
    exporter emits a Program Change for the corresponding track using this value.
  - Game Boy scope note: instrument macro fields such as `arp_env`, `vol_env`, `pitch_env`, and `duty_env` are intentionally unsupported. Use pattern/inline effects instead. See [Game Boy macros policy](https://github.com/kadraman/beatbax/blob/main/docs/features/complete/gameboy-instrument-macros-policy.md).

- effect presets: define reusable named effect RHS strings that can be applied
  inline or as a sequence/pattern modifier. Syntax: `effect name = vib:4,8,sine,4` or `effect arpMinor = arp:3,7`.
  Example: `pat melody = C4<wobble>`, `C4<arpMinor>:4`, or `seq lead => pat melody:wobble`.
  - Arpeggio effect (`arp`): Cycles through semitone offsets at chip frame rate (60Hz for Game Boy) to simulate chords.
    - Syntax: `<arp:3,7>` for minor chord (root → +3 → +7 → root…)
    - List only semitone steps **above** the note; do not include `0` (root is always implicit in playback and UGE export)
    - Example presets: `effect arpMinor = arp:3,7`, `effect arpMajor = arp:4,7`, `effect arpMajor7 = arp:4,7,11`
    - UGE export: first two offsets map to hUGE `0xy` (three notes per cycle including root)

- pat definitions: pattern tokens (notes, rests, named tokens, inline inst changes).
  - Notes: `C4`, `G#5`, `A3` — scientific pitch notation.
  - Rests: `.` (cuts the previous note).
  - Sustains: `_` or `-` (extends the previous note).
  - Duration shorthand: `C4:4` (equivalent to `C4 _ _ _`).
  - Grouping and repeat: `(C5 E5 G5)*2`
  - Named tokens: `snare` or `hihat` (mapped to `inst` entries by scheduler)
  - Inline temporary instrument override: `inst(name,N)` — next N non-rest tokens use `name`
    - **Important:** The count `N` applies to the next N *non-rest* tokens (notes/sustains only)
    - Rests (`.`) do NOT consume from the count; use this to apply the same instrument to multiple notes separated by rests
    - Example: `inst(lead_in,2) C4 . C4` — both C4 notes use `lead_in`, the rest doesn't count
  - Inline permanent instrument: `inst(name)` — change default instrument for the pattern

- seq / channel: map patterns and instruments to Game Boy channels
  - **Full syntax with explicit seq**: `seq myseq = pat1 pat2` then `channel 1 => inst leadA seq myseq`
  - **Shorthand with seq keyword**: `channel 1 => inst leadA seq pat1 pat2` (inline pattern list)
  - **Shorthand with pat keyword**: `channel 1 => inst leadA pat pat1 pat2` (same as seq, more explicit)
  - **Single pattern shorthand**: `channel 1 => inst leadA pat melody` (omit list, just one pattern)
  - Optional scale lock on a channel: `channel 2 => inst bass seq bassline lock=root+fifth`
  - Channels: 1 (Pulse1), 2 (Pulse2), 3 (Wave), 4 (Noise)

- scale-awareness (optional): declare a global scale and per-channel locks
  - Syntax: `scale <root> <mode> [warn|error|off]` (default enforcement is `warn`)
  - Example: `scale C major warn`
  - Channel locks (`lock=...`) are validated against the declared scale
  - Supported locks: `scale`, `root+fifth`, `chord`, `chord7`, `octaves`
  - Web UI MIDI step entry can use this scale metadata for snap/filter behavior

Note: For multi-channel songs use `channel` mappings — one line per chip channel. Comma-separated `seq` items on a channel play in order (use this for multi-row layouts). Per-item modifiers (for example `:inst(name)` or `:oct(-1)`) are applied during expansion and flow into the per-channel ISM.

Extended `seq` syntax examples
- Multiple sequences on one channel (comma-separated): `seq a,b` — plays `a` then `b`.
- Repetition: `seq a * 2` or shorthand `a*2` repeats `a` twice.
- Space-separated list: `seq a b` is a shorthand for multiple items.
- Parenthesized group repetition: `(a b)*2` repeats the group twice.

Examples:
```
# comma-separated and space-separated
channel 1 => inst leadA seq lead,lead2
channel 2 => inst bass  seq lead lead2

# repetition and group repetition
seq bass_repeat = bass_pat*2
seq arranged = (lead_pat lead_alt)*2 bass_repeat
channel 3 => inst wave1 seq arranged
```

Notes:
- Inline modifiers may be applied per-item, e.g. `lead:inst(leadB):slow(2)`.
- The parser and CLI validate sequence definitions; empty `seq NAME =` lines are reported as errors by `verify`, and `play`/`export` will abort on such errors.

**Transforms (applied at parse/expansion time)**
- `:oct(n)` — transpose by octaves
- `:+N` or `:-N` — semitone transpose
- `:transpose(+N/-N)` / `:semitone(±N)` / `:st(±N)` / `:trans(±N)` — semitone transpose aliases
- `:rot(N)` / `:rotate(N)` — cyclic left shift by N tokens
- `:rev` — reverse pattern
- `:pal` / `:palindrome` — mirror pattern forward then backward (without duplicating pivot)
- `:slow(N)` — repeat each token N times (default 2)
- `:fast(N)` — take every Nth token (default 2)
- `:arp(a,b,c)` — apply arpeggio offsets above the root on every note (e.g. `:arp(4,7)` for major; omit leading `0`)
- `:clamp(C3,C6)` — clip notes into a note range
- `:fold(C3,C6)` — octave-wrap notes into a note range
- `:mute` / `:rest` — replace notes with rests while preserving rhythm skeleton

**Noise Channel Note Mapping (for UGE Export)**

When exporting to hUGETracker (`.uge` format), the Game Boy noise channel uses a **1:1 note mapping** with no automatic transpose.

**Important:** hUGETracker displays notes ONE OCTAVE HIGHER than BeatBax's MIDI notation:

- C2 in BeatBax → index 0 (displays as C-3 in hUGETracker)
- C5 in BeatBax → index 24 (displays as C-6 in hUGETracker)
- C6 in BeatBax → index 36 (displays as C-7 in hUGETracker = **typical percussion range**)
- C9 in BeatBax → index 72 (displays as C-10 in hUGETracker = maximum)

**Writing percussion patterns with default notes:**
```bax
# Use note= parameter to set default pitch for instrument names
inst kick     type=pulse1 duty=12.5 env=15,down note=C2   # Pulse kick
inst snare    type=noise env=gb:13,down,1 width=7 note=C6 # Exports as C-7
inst hihat_cl type=noise env=gb:6,down,1 width=15 note=C6 # Exports as C-7

# Now use instrument names directly - notes are automatic!
pat drums = kick . snare . kick . hihat_cl .
```

**Alternative: Explicit notes (old style):**
```bax
# Write notes in the exact octave range you want in hUGETracker
inst kick  type=noise env=gb:12,down,1 width=15
inst snare type=noise env=gb:10,down,2 width=7

# These notes export directly: C2→0 (C-3), C5→24 (C-6), C6→36 (C-7)
pat drums = inst(kick) C2 . inst(snare) C6 . C5 .
```

**Custom transpose override:**
```bax
# Shift all notes up 1 octave (12 semitones) for this instrument
inst shifted_kick type=noise env=gb:12,down,1 uge_transpose=12
```

See `songs/demo/percussion_demo.bax` for a complete working example demonstrating the `note=` parameter.
