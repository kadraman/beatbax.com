---
sidebar_position: 5
title: Sequence Modifiers
---

# Sequence Modifiers

BeatBax supports colon-chained modifiers on sequence and pattern references. They apply at expansion time over a flat token array (notes, rests, sustains, inline-effect tokens).

Example:

```bax
seq a = lead:rot(1):pal:transpose(+2)
seq b = motif:every(2,oct(+1)):lag(1)
seq c = riff:shuffle(42)
```

Modifiers are applied **left-to-right**. Transpose family (`oct`, `+N`, `semitone`, …) accumulates and applies once at the end of the chain. Unknown modifiers warn and are ignored.

## Modifier table

| Modifier | Aliases | Behavior |
|----------|---------|----------|
| `oct(N)` | — | Octave transpose (`N × 12` semitones) |
| `+N` / `-N` | `semitone(N)`, `st(N)`, `trans(N)`, `transpose(N)` | Semitone transpose |
| `rot(N)` | `rotate(N)` | Cyclic left rotation by `N` tokens |
| `rev` | — | Reverse token order |
| `pal` | `palindrome` | Palindrome: tokens + reverse without duplicating pivot |
| `slow(N)` | `slow` (default `2`) | Repeat each token `N` times |
| `fast(N)` | `fast` (default `2`) | Keep every `N`th token |
| `arp(a,b,…)` | — | Merge inline `arp:` on each note (omit leading `0`) |
| `clamp(MIN,MAX)` | — | Clamp pitch to range |
| `fold(MIN,MAX)` | — | Fold pitch into range by octaves |
| `mute` | `rest` | Replace notes with `.`, keep rhythm |
| `inst(name)` | — | Sequence-level instrument override |
| `pan(value)` | — | Pan override for the segment |
| `invert` | `inv` | Invert pitch contour around the first note |
| `every(N,MOD)` | — | Apply inner modifier on positions `N, 2N, …` (1-based) |
| `off(N)` | `lag(N)` | Prepend `N` rest tokens |
| `pick(i,j,…)` | — | Keep listed 1-based token positions |
| `chunk(N)` | — | Split into chunks of `N`, reverse each chunk |
| `shuffle(seed)` | — | Deterministic seeded shuffle |
| `presetName` | any defined `effect` | Apply named effect preset to all notes |

## Constraints

- `every(N,MOD)` must stay token-local: the inner modifier must produce exactly one token and must not introduce `inst` or `pan` overrides. Otherwise the token is left unchanged with a warning.
- Nested parentheses in modifier arguments support **one** level (e.g. `every(2,oct(+1))`).
- `shuffle` requires an explicit seed for deterministic export.

## Examples

```bax
effect stacc = cut:2

seq core = lead_pat:rot(1):pal:transpose(+2)
seq delayed = fill:lag(2)
seq sparse = riff:pick(1,3,5)
seq inverted = motif:invert
seq octaveHits = motif:every(2,oct(+1))
seq scrambled = riff:shuffle(42)
seq stabs = chord_pat:stacc
```

## See also

- [Modifiers tutorial](/docs/tutorial/modifiers)
- [Effects](/docs/tutorial/effects)
