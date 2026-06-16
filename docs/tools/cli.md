---
sidebar_position: 1
title: CLI
---

# CLI

> **Windows note:** npm has limitations passing flag arguments through `npm run`. Use `node bin/beatbax` or the `bin\beatbax` wrapper directly.

### Commands

```powershell
# Validate a song file
node bin/beatbax verify songs/sample.bax

# Play (headless by default in Node.js)
node bin/beatbax play songs/sample.bax
node bin/beatbax play songs/sample.bax --browser   # open Web UI instead

# Export
node bin/beatbax export json songs/sample.bax output.json
node bin/beatbax export midi songs/sample.bax output.mid
node bin/beatbax export uge  songs/sample.bax output.uge
node bin/beatbax export wav  songs/sample.bax output.wav

# Convert a WAV into a raw NES DMC sample
node bin/beatbax convert wav2dmc samples/wav/low_kick.wav --dmc-rate 15 --emit-inst

# Inspect a .bax or .uge file
node bin/beatbax inspect songs/sample.bax
node bin/beatbax inspect output.uge --json
```

### Play options

| Flag | Description |
|------|-------------|
| `--browser` / `-b` | Launch browser-based playback via Vite |
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

### NES DMC sample conversion

`convert wav2dmc` turns a 16-bit mono/stereo PCM WAV into a raw NES `.dmc` sample for `type=dmc` instruments:

```powershell
node bin/beatbax convert wav2dmc samples/wav/low_kick.wav --dmc-rate 15 --emit-inst --play
```

The output is a headerless DMC byte stream. Playback settings live on the BeatBax instrument, so the converter prints the matching line when you pass `--emit-inst`:

```bax
inst kick type=dmc dmc_rate=15 dmc_loop=false dmc_sample="local:samples/wav/kick.dmc"
```

Useful controls:

| Flag | Description |
|------|-------------|
| `--dmc-rate <0-15>` / `-q` | DMC rate used for encoding and playback preview. `15` is fastest/highest quality; lower values are darker and shorter-bandwidth. |
| `--dmc-loop` | Use `dmc_loop=true` in emitted snippets and loop the preview. |
| `--trim-silence <db>` / `--no-trim-silence` | Trim quiet WAV tails before encoding; this is often the most useful control for reducing DMC hiss. |
| `--tail-ms <ms>` | Keep a small amount of audio after the last above-threshold sample. |
| `--fade-out-ms <ms>` | Fade the end before encoding to avoid noisy/clicky tails. |
| `--max-duration-ms <ms>` | Hard cap the source duration before encoding. |
| `--ntsc` / `--pal` | Select the DMC hardware rate table (`--ntsc` is default). |

### Headless audio fallback chain

1. `speaker` npm module (best quality — install with `npm install --save-optional speaker`)
2. `play-sound` wrapper (cross-platform system players)
3. System command (`PowerShell`/`afplay`/`aplay`)

### WAV export

WAV export uses a direct PCM renderer (`packages/engine/src/audio/pcmRenderer.ts`) with no WebAudio dependency. It implements all four Game Boy channels (duty, envelope, wavetable, LFSR noise) and outputs stereo 44100 Hz 16-bit PCM. See [docs/exports/wav-export-guide.md](/docs/exports/wav).

---
