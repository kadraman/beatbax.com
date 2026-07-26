---
sidebar_position: 6
title: FamiTracker Text Export
---

# FamiTracker Text Export (NES)

BeatBax exports NES songs to **FamiTracker text** (`.txt`) via `@beatbax/plugin-exporter-famitracker`.

Binary `.ftm` export is **not** supported. Use `famitracker-text` only.

## Quick start

```powershell
node bin/beatbax export famitracker-text songs/nes/your_song.bax output.txt
# or
beatbax export famitracker-text song.bax --out song.txt
```

Open the `.txt` in FamiTracker / FamiStudio text import workflows.

## What maps over

BeatBax instrument macros align with FamiTracker 2A03 macro sequences (60 Hz NTSC steps):

| BeatBax | FamiTracker |
|---------|-------------|
| `vol_env` / hardware `env` decay | `MACRO VOLUME` |
| `arp_env` | `MACRO ARPEGGIO` |
| `pitch_env` (semitones) | `MACRO PITCH` (×16 fine units) |
| `duty_env` | Duty sequence (index 0–3) |
| Pulse / triangle / noise / DMC channels | Matching 2A03 tracks |

Hardware sweep fields map to pattern `Hxy` effects where applicable. Triangle `linear=` gating is approximated with note-cut style behaviour in the text export path.

## Tips

- Author with `chip nes` (optional `ntsc` / `pal` region).
- Prefer songs that already pass `verify`.
- For homebrew pipelines that expect text modules, this is the supported path; do not expect a binary `.ftm` from BeatBax.

## See also

- [NES](/docs/chips/nes)
- [CLI](/docs/tools/cli)
- [Detailed mapping on GitHub](https://github.com/kadraman/beatbax/blob/main/docs/features/complete/famitracker-export.md)
