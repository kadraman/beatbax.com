---
sidebar_position: 2
title: Scale Awareness
---

# Scale Awareness

Optional song-level **scale** validation and channel **locks** help keep notes in key. Desktop MIDI step entry can also use this metadata for snap/filter behaviour.

This page is part of the [Language Reference](/docs/language/metadata-directives). The Game Boy [Tutorial](/docs/tutorial/overview) builds a complete song without requiring scale locks.

## Declare a scale

```bax
scale C major warn
# scale A minor error
# scale F# dorian off
```

| Mode | Behaviour |
|------|-----------|
| `warn` (default) | Out-of-lock notes produce warnings |
| `error` | Out-of-lock notes produce errors |
| `off` | Keep scale metadata for UI/MIDI; disable diagnostics |

## Channel locks

When `scale` is declared, restrict a channel with `lock=...`:

| Lock | Allowed degrees |
|------|-----------------|
| `lock=scale` | Any note in the scale |
| `lock=root+fifth` | Degrees 1 + 5 |
| `lock=chord` | 1 + 3 + 5 |
| `lock=chord7` | 1 + 3 + 5 + 7 |
| `lock=octaves` | Root only (all octaves) |

```bax
chip gameboy
bpm 140
scale C major warn

inst lead type=pulse1 duty=50 env=gb:12,down,1
pat melody = C5 E5 G5 C6
seq main = melody

channel 1 => inst lead seq main lock=scale
play
```

`lock` without a song-level `scale` is a parser error.

## See also

- [Metadata directives](/docs/language/metadata-directives)
- [Sequencing](/docs/tutorial/sequencing)
