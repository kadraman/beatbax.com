---
sidebar_position: 5
title: Modifiers
---

# Modifiers

Colon-chained **modifiers** transform pattern or sequence references at expansion time (before playback and export).

```bax
seq a = lead:rot(1):pal:transpose(+2)
seq b = bass:oct(-1):slow(2)
seq c = motif:every(2,oct(+1)):lag(1)
```

Modifiers apply **left-to-right**. You can also apply a named `effect` preset as a modifier (e.g. `melody:wobble`).

## Core modifiers

| Modifier | Behaviour |
|----------|-----------|
| `:oct(n)` | Transpose by octaves |
| `:+N` / `:-N` | Semitone transpose |
| `:transpose(+N)` / `:semitone(±N)` / `:st(±N)` / `:trans(±N)` | Semitone aliases |
| `:rot(N)` / `:rotate(N)` | Cyclic left shift by N tokens |
| `:rev` | Reverse |
| `:pal` / `:palindrome` | Forward then backward (no duplicated pivot) |
| `:slow(N)` | Repeat each token N times (default 2) |
| `:fast(N)` | Keep every Nth token (default 2) |
| `:arp(a,b,c)` | Attach arpeggio offsets (omit leading `0`) |
| `:clamp(C3,C6)` | Clip pitches into a range |
| `:fold(C3,C6)` | Octave-wrap into a range |
| `:mute` / `:rest` | Replace notes with rests; keep rhythm |
| `:inst(name)` | Instrument override for the segment |
| `:pan(value)` | Pan override for the segment |

## Additional modifiers

Also supported: `invert` / `inv`, `every(N,MOD)`, `off(N)` / `lag(N)`, `pick(...)`, `chunk(N)`, `shuffle(seed)`.

```bax
seq delayed = fill:lag(2)
seq sparse  = riff:pick(1,3,5)
seq octaveHits = motif:every(2,oct(+1))
seq scrambled = riff:shuffle(42)
```

Full table, constraints (`every`, seeded `shuffle`), and semantics: [Sequence modifiers reference](/docs/language/modifiers).

## See also

- [Patterns & sequences](/docs/tutorial/sequencing)
- [Effects](/docs/tutorial/effects)
