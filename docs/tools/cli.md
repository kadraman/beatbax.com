---
sidebar_position: 1
title: BeatBax CLI
---

# BeatBax CLI

The **BeatBax CLI** verifies, plays, exports, inspects, and converts songs.

## Install

```powershell
npm install -g @beatbax/cli
beatbax --help
```

Or run without a global install: `npx @beatbax/cli --help`.

From a cloned toolchain repo after build, use `node bin/beatbax` (or `bin\beatbax` on Windows) instead of relying on `npm run` for flags.

## Commands

```powershell
# Validate
beatbax verify songs/sample.bax

# Play (headless by default)
beatbax play songs/sample.bax
beatbax play songs/sample.bax --browser

# Built-in exports
beatbax export json songs/sample.bax output.json
beatbax export midi songs/sample.bax output.mid
beatbax export uge  songs/sample.bax output.uge
beatbax export wav  songs/sample.bax output.wav

# Chip-specific exporters (when available)
beatbax export famitracker-text songs/nes/song.bax output.txt
beatbax export vgm songs/sms/song.bax output.vgm
beatbax export arkos songs/spectrum-128/song.bax output.aks
beatbax export arkos songs/spectrum-128/song.bax --instruments   # .aki bank only

# WAV → NES DMC sample
beatbax convert wav2dmc samples/wav/low_kick.wav --dmc-rate 15 --emit-inst

# Inspect
beatbax inspect songs/sample.bax
beatbax inspect output.uge --json
```

### Play options

| Flag | Description |
|------|-------------|
| `--browser` / `-b` | Open browser-based playback |
| `--headless` | Force Node.js headless playback (default) |
| `--backend <name>` | `auto` (default), `node-webaudio`, `browser` |
| `--sample-rate <hz>` / `-r` | PCM sample rate (default: 44100) |
| `--buffer-frames <n>` | Offline render buffer size |

### Export options

| Flag | Applies to | Description |
|------|-----------|-------------|
| `--out <path>` | all | Output file path |
| `--duration <seconds>` | midi, wav | Override auto-calculated duration |
| `--channels <list>` | midi, wav | Export only listed channels (e.g. `1,3`) |
| `--instruments` | arkos | Write `.aki` instrument bank only |
| `--verbose` / `--debug` | uge (and others) | Extra export diagnostics |

### Export formats

| Format | Command | Typical chip |
|--------|---------|--------------|
| JSON (ISM) | `export json` | any |
| MIDI | `export midi` | any |
| WAV | `export wav` | any |
| UGE | `export uge` | Game Boy |
| FamiTracker text | `export famitracker-text` | NES |
| VGM | `export vgm` | SMS / Game Gear |
| Arkos (experimental) | `export arkos` | Spectrum / CPC |

Guides: [WAV](/docs/exports/wav), [UGE](/docs/exports/uge), [FamiTracker text](/docs/exports/famitracker-text), [VGM](/docs/exports/vgm), [Arkos](/docs/exports/arkos).

### NES DMC conversion

`convert wav2dmc` turns a 16-bit mono/stereo PCM WAV into a raw NES `.dmc` sample for `type=dmc` instruments:

```powershell
beatbax convert wav2dmc samples/wav/low_kick.wav --dmc-rate 15 --emit-inst --play
```

With `--emit-inst`, the CLI prints a matching instrument line, for example:

```bax
inst kick type=dmc dmc_rate=15 dmc_loop=false dmc_sample="local:samples/wav/kick.dmc"
```

| Flag | Description |
|------|-------------|
| `--dmc-rate <0-15>` / `-q` | Encoding / preview rate (`15` = fastest / highest quality) |
| `--dmc-loop` | Emit `dmc_loop=true` and loop preview |
| `--trim-silence <db>` / `--no-trim-silence` | Trim quiet tails (often reduces hiss) |
| `--tail-ms <ms>` | Keep audio after the last above-threshold sample |
| `--fade-out-ms <ms>` | Fade before encoding |
| `--max-duration-ms <ms>` | Cap source duration |
| `--ntsc` / `--pal` | DMC rate table (`--ntsc` default) |

Invalid `--dmc-rate` values are rejected (not silently clamped).

### Headless audio

Playback tries, in order:

1. `speaker` (optional native module)
2. `play-sound` (system players)
3. OS command (`PowerShell` / `afplay` / `aplay`)

## Related docs

- [Installation](/docs/getting-started/installation)
- [CLI development](/docs/development/cli)
- [BeatBax Desktop](/docs/tools/desktop)
