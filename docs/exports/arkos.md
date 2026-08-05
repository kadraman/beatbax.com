---
sidebar_position: 5
title: Arkos Export
---

# Arkos Tracker Export (Spectrum / CPC)

**Experimental.** BeatBax can export Spectrum 128 / Amstrad CPC songs to Arkos Tracker 3 via `@beatbax/plugin-exporter-arkos`.

| Artifact | Description |
|----------|-------------|
| `.aks` | Full song (default) — instruments embedded |
| `.aki` | Instrument bank only — CLI `--instruments` |

## Quick start

```powershell
# Full song (.aks)
node bin/beatbax export arkos songs/spectrum-128/instruments/ay_synth_channels.bax
node bin/beatbax export arkos song.bax song.aks

# Instrument bank only (.aki)
node bin/beatbax export arkos song.bax --instruments
```

Desktop export menu also offers AKS when the Arkos exporter is registered.

## v1 supported subset

Supported:

- `chip spectrum-128` / `chip cpc` / aliases
- Up to 3 tone channels
- Notes, rests, sustains
- Instrument `vol`, `noise_rate`, `tone_mix`, `tone`
- Deterministic pattern/order lowering from resolved events

Constant-`vol` instruments export as a looping sustain cell so Arkos holds the note for the pattern row.

## Rejected (fail-hard)

The exporter emits diagnostics and fails when the song uses unsupported features, including:

- `arp_env`, `pitch_env`, `vol_env`, `env_bass`, `env_shape`
- `noise_frames`, `tone_frames`
- Inline pattern effects

Keep Arkos-bound songs within the v1 subset, or use WAV for full-preview renders of richer Spectrum songs.

## See also

- [Spectrum 128 / CPC](/docs/chips/spectrum-128)
- [BeatBax CLI](/docs/tools/cli)
- [Completion notes on GitHub](https://github.com/kadraman/beatbax/blob/main/docs/features/complete/spectrum-cpc-arkos-exporter.md)
