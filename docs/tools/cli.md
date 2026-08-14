---
sidebar_position: 2
title: BeatBax CLI
---

# BeatBax CLI

The **BeatBax CLI** verifies, plays, exports, inspects, and converts songs.

## Install

The BeatBax CLI is published on the [npm](https://www.npmjs.com/package/@beatbax/cli) Registry. 

> Note: [Node.js 20 or newer](https://nodejs.org/) (LTS recommended) is required. Download an installer for your platform from the Node.js website; npm is included automatically. Confirm with `node -v` and `npm -v` — any npm that ships with Node 20+ is sufficient.

It is recommended to install the BeatBax CLI globally as follows:

```powershell
npm install -g @beatbax/cli
beatbax --help
```

Alternately, you can run without installing using the `npx` command.

```powershell
npx @beatbax/cli --help
```

## Example commands

```powershell
# Validate
beatbax verify songs/sample.bax

# Play (headless by default)
beatbax play songs/sample.bax
beatbax play songs/sample.bax --browser

# Export (see Export Plugins for format ids)
beatbax export wav songs/sample.bax output.wav
beatbax export uge songs/sample.bax output.uge
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

`beatbax export <format>` uses the "format" ids from [Export Plugins](/docs/exports/overview). JSON (`json`) and MIDI (`midi`) are built in for every chip; the other targets are plugin guides on that page.

### Inspect

`beatbax inspect` prints a structured view of a `.bax` song (or some export files, such as `.uge`). Add `--json` for machine-readable output.

```powershell
beatbax inspect songs/sample.bax
beatbax inspect output.uge --json
```

### Sample conversion

`beatbax convert` turns audio samples into chip-ready formats. NES DMC (`wav2dmc`) is available today; more converters may follow.

#### NES DMC (`wav2dmc`)

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

`beatbax play` is **headless by default**: it renders PCM in Node.js, not the browser WebAudio graph used by [BeatBax Desktop](/docs/tools/desktop) and the [web-lite client](/docs/tools/web-client). A few effects are WebAudio-only; for those, use `beatbax play --browser` (see the [effects](/docs/language/effects) reference).

Headless output tries, in order:

1. `speaker` (optional native module)
2. `play-sound` (system players)
3. OS command (`PowerShell` / `afplay` / `aplay`)

If `speaker` did not build on install, playback may fall back or be unreliable — see [Troubleshooting](/docs/troubleshooting#cli-allow-scripts-warning-for-speaker-on-install).

## Related docs

- [Installation](/docs/getting-started/installation)
- [Tools overview](/docs/tools/overview)
- [Export Plugins](/docs/exports/overview)
- [CLI development](/docs/development/cli)
- [BeatBax Desktop](/docs/tools/desktop)
