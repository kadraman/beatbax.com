---
sidebar_position: 99
title: Troubleshooting
---

## Troubleshooting
- If audio is silent in your browser, verify your browser supports WebAudio and that the demo did not throttle audio (autoplay policies may require a user gesture).
- You can inspect `window.__beatbax_player` in the console for runtime diagnostics.
- Use the `--debug` (or `-D`) flag on the CLI to see full stack traces if a command fails.
- Use the `--verbose` (or `-v`) flag to see more detailed validation information and the parsed AST.

### Windows: `npm install -g @beatbax/cli` fails with `EPERM` / `EEXIST`

Upgrading or reinstalling a global CLI on Windows often fails when files from the previous install are still locked, or when the npm shim scripts already exist:

```text
npm warn cleanup Failed to remove some directories [...] EPERM: operation not permitted, rmdir ...\@beatbax\cli\...
npm error code EEXIST
npm error File exists: C:\Users\<you>\AppData\Roaming\npm\beatbax.ps1
```

This is a Windows/npm file-lock issue, not a BeatBax package defect.

1. Close anything that may be using the CLI (terminals running `beatbax`, editors, or scans of the npm global folder).
2. Remove the old install and shims, then reinstall:

```powershell
npm uninstall -g @beatbax/cli
Remove-Item -Force "$env:APPDATA\npm\beatbax*" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "$env:APPDATA\npm\node_modules\@beatbax\cli" -ErrorAction SilentlyContinue
npm install -g @beatbax/cli
```

If uninstall still hits `EPERM`, log out or reboot, then run the `Remove-Item` lines again before install.

As a quicker alternative when you only need to overwrite the shim files:

```powershell
npm install -g @beatbax/cli --force
```

`--force` usually clears the `EEXIST` on `beatbax.ps1`, but locked folders can still produce `EPERM` cleanup warnings — then use the manual remove steps above.

### CLI: `allow-scripts` warning for `speaker` on install

A successful global install may still print:

```text
npm warn allow-scripts 1 package has install scripts not yet covered by allowScripts:
npm warn allow-scripts   speaker@0.5.5 (install: node-gyp rebuild)
```

This comes from npm’s install-script allowlist. `speaker` is an **optional** native dependency used for headless CLI playback (`beatbax play`). Its install script compiles a small native addon via `node-gyp`.

- The CLI itself still installs (for example `beatbax --version`, `verify`, and exports work without it).
- Without `speaker` built, some headless playback paths may fall back or be noisier.

If you want realtime CLI audio on this machine:

```powershell
npm install -g --allow-scripts=speaker @beatbax/cli
```

Or allow it for all global installs:

```powershell
npm config set allow-scripts=speaker --location=user
```

Only do that if you are comfortable letting `speaker`’s known install script run (normal for this package).

That's all — for developer notes, see `DEVNOTES.md`.

## Importing UGE Files

BeatBax includes a UGE reader that can parse hUGETracker v6 files:

```typescript
import { readUGEFile } from 'beatbax/import';

const ugeSong = await readUGEFile('path/to/song.uge');
console.log(ugeSong.songName, ugeSong.artist);
console.log('Instruments:', ugeSong.dutyInstruments.length);
console.log('Patterns:', ugeSong.patterns.length);
```

The UGE reader provides full access to instrument tables, pattern data, order lists, and song metadata. See `packages/engine/src/import/uge/uge.reader.ts` for the complete API.

## Buffered Rendering (Performance mode)

For heavy songs or many simultaneous events, BeatBax can pre-render short audio segments and schedule them as AudioBuffer playback to reduce real-time CPU work.

How it works
- The player groups events into fixed-length segments (default 0.5s), renders each segment with an `OfflineAudioContext`, then schedules the rendered `AudioBuffer` on the real `AudioContext` to play at the correct absolute time.
- This reduces the number of live oscillator/buffer-source objects created at playback time and can substantially lower CPU usage for dense arrangements.

Enabling buffered mode
The `Player` constructor accepts a `buffered` option and tuning parameters:

- `buffered` (boolean): enable buffered rendering.
- `segmentDuration` (number, seconds): length of each pre-render segment (default `0.5`).
- `bufferedLookahead` (number, seconds): how far ahead to start rendering a segment before its playback time (default `0.25`).
- `maxPreRenderSegments` (number): optional cap on how many future segments may be queued for pre-rendering; when the cap is reached, the renderer falls back to scheduling nodes directly on the live `AudioContext`.

Example (enable buffering):

```ts
import Player from 'beatbax/audio/playback';

const audioCtx = new AudioContext();
// Enable buffered rendering with a 0.5s segment and 0.3s lookahead, max 6 segments
const player = new Player(audioCtx, { buffered: true, segmentDuration: 0.5, bufferedLookahead: 0.3, maxPreRenderSegments: 6 });
await player.playAST(parsedAst);
```

Notes & tuning
- `segmentDuration` trade-offs:
  - Smaller segments reduce latency for updates/hot-reload and reduce memory per segment, but increase overhead (more segments to render).
  - Larger segments amortize render overhead but increase memory usage and make live edits take longer to reflect.
- `bufferedLookahead`: set this to a value slightly larger than the renderer's expected render time so buffers are ready before playback. Typical values: `0.2`–`0.5`.
- `maxPreRenderSegments`: prevents unbounded pre-rendering (useful for long songs or limited-memory environments). When this limit is reached, the system falls back to scheduling nodes directly, preserving correctness at the cost of higher CPU.

Stop / per-channel cleanup
- `Player.stop()` stops both live-scheduled nodes and any pre-rendered BufferSources that are scheduled to play.
- You can also stop buffered nodes per-channel using the buffered renderer API (exposed internally). If you want a public `stopChannel(chId)` helper added to `Player`, I can add it.

Fallbacks
- If `OfflineAudioContext` is not available, buffered rendering falls back to direct scheduling of events to maintain playback correctness.

When to use buffering
- Use buffered mode for complex songs with many simultaneous oscillators or when demo profiling shows high CPU. For simple songs, direct scheduling is usually fine and has lower latency for live edits.
