---
sidebar_position: 3
title: Import MIDI files
---

# Import MIDI files

Convert a Standard MIDI File (`.mid` / `.midi`) into an editable BeatBax `.bax` song with the [BeatBax CLI](/docs/tools/cli).

```powershell
beatbax import midi song.mid song.bax --chip gameboy
beatbax convert midi2bax song.mid song.bax --chip nes   # alias
```

> This is **file import**, not [MIDI step entry](/docs/tools/midi-step-entry) (typing notes from a keyboard in Desktop). There is no Desktop “Import MIDI…” wizard yet — use the CLI.

**Chip support (v1):** `gameboy` and `nes` only. `--chip` is required, except with `--inspect`.

## Quick start

Install or use `npx` as described in the [CLI guide](/docs/tools/cli#install), then:

```powershell
# See the MIDI file's tracks before writing a config (writes nothing)
beatbax import midi song.mid --inspect

# Auto-map tracks (GM program, track names, channel 10 drums)
beatbax import midi song.mid song.bax --chip gameboy

# Preview only — print summary, do not write a file
beatbax import midi song.mid --chip gameboy --dry-run

# NES with an optional JSON config (mapping, quantize, DMC samples)
beatbax import midi song.mid song.bax --chip nes --config song.import.json

# Explain what each mapping kept and dropped at the top of the output
beatbax import midi song.mid song.bax --chip gameboy --config song.import.json --annotate
```

Open the result in [BeatBax Desktop](/docs/tools/desktop) or play it with `beatbax play song.bax`.

## Options

| Flag | Description |
|------|-------------|
| `--chip <chip>` | **Required** (except with `--inspect`). `gameboy` or `nes` |
| `--config <file>` | Optional JSON mapping / quantize / arrangement override |
| `--quantize <mode>` | `nearest` (default), `floor`, `ceil`, `strict` |
| `--grid <grid>` | `1/4`, `1/8`, `1/16` (default), `1/32` |
| `--max-bars <N>` | Clamp generated bar count |
| `--max-overlap-ticks <N>` | Allow N ticks of overlap when multiplexing with `inst()` (default 0) |
| `--section-bars <N>` | Bars per [Pattern Grid](/docs/tools/pattern-grid) section (default **8**; **0** = one `seq` per channel) |
| `--dry-run` | Print summary only; do not write `.bax` |
| `--strict` | Fail on strict-quantize / conversion errors |
| `--title <name>` | Override `song name` metadata |
| `--inspect` | Print a per-track report of the MIDI file and exit; writes nothing (see [Inspecting a MIDI file](#inspecting-a-midi-file)) |
| `--json` | With `--inspect`: print the report as JSON. An error without `--inspect` |
| `--annotate` | Start the output with a comment block explaining channel mappings, drops and timing (same as config `annotate: true`) |

CLI flags for quantize, grid, overlap, and section bars override the same fields in `--config` when both are set.

## Config schema (optional)

Save a JSON file and pass `--config`:

```json
{
  "chip": "nes",
  "ticksPerBeat": 4,
  "patternTicks": 16,
  "trackMappings": [
    { "midiTrack": 1, "target": "pulse1", "instrument": "lead" },
    { "midiTrack": 2, "target": "pulse2", "instrument": "arp" },
    { "midiTrack": 3, "target": "triangle", "instrument": "bass" },
    { "midiTrack": 4, "target": "noise", "drumMap": { "36": "kick", "38": "snare", "42": "hihat" } }
  ],
  "programFamilies": {
    "0-7": "piano",
    "40-51": "strings"
  },
  "families": {
    "piano": { "gb": { "period": 2, "level": 13 } },
    "strings": { "gb": { "period": 0, "level": 12 } }
  },
  "dmcReinforcement": {
    "enabled": true,
    "kickSample": "@nes/kick",
    "snareSample": "@nes/snare"
  },
  "quantize": {
    "mode": "nearest",
    "grid": "1/16",
    "maxShiftTicks": 1
  },
  "maxOverlapTicks": 0,
  "drumFlamTicks": 0,
  "sectionBars": 8
}
```

The [arrangement options](#arrangement-options) below add more fields for dense, multi-track MIDI files.

### Mapping and families

- **`trackMappings[].target`** — `pulse1`, `pulse2`, `wave`, `triangle`, `noise`, or `dmc`. Optional `midiChannel` is **0–15** (SMF 0-based) or **1–16** (1-based). Optional `instrument` must be a BeatBax identifier (`lead`, `soft_lead`, …). Optional `drumMap` remaps GM drum pitches to tokens (`kick`, `snare`, `hihat`, …).
- **`programFamilies`** — remaps GM program numbers or `"min-max"` ranges onto family ids: `piano`, `guitar`, `bass`, `strings`, `pad`, `lead`.
- **`families`** — articulation overrides for those ids (Game Boy `period` / `level` / duty / `waveVolume`; NES `vol` / `volEnv` / duty).
- **Without `--config`** — auto-map from GM program, track name, channel 10 (drums), and pitch range. Track names prefer chiptune labels (`bassline`, `pluck`, `chords`, `saw lead`, `kick` / …) before orchestral ones (`violin`, `cello`, …).

### Sections and drums

- **`sectionBars`** (default `8`) — chunks each channel into fixed-size arrangement sections with `# --- Section N: Bars A-B ---` headers and `channel … seq lead_s01_seq lead_s02_seq …` so [Pattern Grid](/docs/tools/pattern-grid) is not stuck in monolithic mode. Use `0` for a single `seq` per channel. Songs with `bars ≤ sectionBars` stay one section.
- **`drumFlamTicks`** (default `0`) — optionally nudges losing drum tokens into empty ticks after a stacked hit. Leave at `0` for clean backbeats.
- **`dmcReinforcement`** ([NES](/docs/chips/nes) only) — keeps noise `kick` / `snare` and adds distinct `kick_dmc` / `snare_dmc` on channel 5. Reinforcement follows the **resolved** drum token (so a custom `39 → hihat` map does not copy claps to DMC).

## Arrangement options

These fields let a config say which part plays where, instead of pre-splitting the MIDI file in a DAW. All are optional; a config that uses none of them behaves as before.

Every bar number below is a **source bar**: 1-based, as a DAW shows it, measured with the MIDI file's first time signature (4/4 when the file has none). If the file changes time signature, a `bar_numbering_first_signature` warning is emitted. Output bars are still `patternTicks` long.

### Per mapping (`trackMappings[]`)

| Field | Values | Effect |
|-------|--------|--------|
| `fromBar`, `toBar` | integers ≥ 1, `fromBar ≤ toBar` | The mapping only takes notes whose quantized start lies in this range (inclusive). Missing `fromBar` = song start; missing `toBar` = song end. A note running past `toBar` is shortened to end there. |
| `mono` | `earliest` (default) \| `highest` \| `lowest` \| `newest` | How the mapping becomes one voice. See [Chord reduction](#chord-reduction). |
| `transpose` | integer semitones | Melodic targets only. Applied before `fold`. A note pushed outside MIDI 0–127 is dropped (`pitch_out_of_range`). |
| `fold` | `[lo, hi]`, MIDI 0–127, `hi - lo ≥ 12` | Melodic targets only. Moves each note by octaves until it lies in `[lo, hi]`. |
| `include`, `exclude` | arrays of MIDI note numbers 0–127 | `noise` / `dmc` targets only. `include` keeps only the listed notes; `exclude` then removes notes. Removed notes are ignored by choice: they are not counted as dropped and are not auto-mapped elsewhere. To turn a note into another drum sound, use the mapping's `drumMap` (e.g. `"61": "snare"`). |

A track may appear in several mappings. A note goes to every mapping whose track/channel selector and bar range match it, so the same track mapped to two targets in one range is heard on both channels. Between mappings that differ only in how specific their selector is, the most specific one wins.

### Top level

| Field | Values | Effect |
|-------|--------|--------|
| `packing` | `streams` (default) \| `lanes` | `lanes` makes targets binding. See [Lanes](#lanes). |
| `unmappedTracks` | `auto` (default) \| `drop` | `drop` leaves out every note that matches no mapping, and emits one `unmapped_dropped` info diagnostic listing the tracks and note counts. These notes are not counted as dropped. With `auto`, notes of a mapped track that fall outside all of its bar ranges are auto-mapped like an unmapped track. |
| `bpm` | number > 0 | Overrides the source tempo. `tempo` is then ignored. |
| `tempo` | `first` (default) \| `longest` | `first` uses the first tempo event. `longest` uses the tempo held for the most MIDI ticks (ties go to the lower bpm), which is usually right for files that start with a count-in. Unused tempo events are reported as `tempo_map_ignored`. |
| `startBar`, `endBar` | integers ≥ 1, `endBar ≥ startBar` | Import only this window of the song. Notes starting outside it are left out (not counted as dropped); a note running past `endBar` is shortened. Output bar 1 is `startBar`. Mapping bar ranges stay in source bars. |
| `nudge` | integer, sixteenths of the source | Shifts every note before quantizing; `-1` moves a part that sits one sixteenth late back onto the beat. Notes moved before the start begin at the start. |
| `annotate` | `true` \| `false` (default) | Same as `--annotate`. |

A bar range that starts after the song's last bar produces a `bar_range_outside_song` warning, and that mapping produces no output.

### Lanes

With `packing: "lanes"`, mappings that share a `target` form a **lane**, filled in config order. Each mapping's notes are placed where they do not overlap notes already placed by earlier mappings on that lane. Overlapping notes are dropped and counted per mapping (`lane_overlap`, one diagnostic per mapping). Each mapping keeps its own instrument, and the channel switches with `inst()` where the part changes.

A lane's notes always stay on the target channel: they are never moved to another channel, and one overlap never drops the whole track. Tracks that match no mapping (with `unmappedTracks: "auto"`) are then packed by the usual rules into the space the lanes leave free. Drum mappings keep the usual noise merging and stack resolution.

With the default `packing: "streams"`, mappings behave as before (a whole mapped part moves to another free channel, or is dropped with `over_polyphony`, if it collides), with bar ranges and the other per-mapping fields still applied.

### Chord reduction

`mono` decides which note survives when a mapping plays several notes at once. `earliest` is the original rule (earliest start, then louder, then lower pitch). The others:

- `highest` / `lowest`: of notes starting together, keep the highest / lowest. A note that starts while a kept note is still sounding wins if it is at least as high (or low). It also wins if the held note has only a short tail left: at most one quantize grid step, or at most ¼ of the held note's length. This keeps legato melodies intact.
- `newest`: a new note always cuts off the note that is sounding.

A winning note shortens the held note to end where the new one starts. A losing note is dropped and counted (`mono_reduce`, one diagnostic per mapping). In lane mode, every mapping is reduced to one voice, with `earliest` when `mono` is not set.

### Arranging dense MIDI

A typical cover MIDI has a vocal melody, a synth riff that answers it, a guitar that doubles both, and a count-in at a different tempo. One config can place those parts on the Game Boy's channels:

```json
{
  "chip": "gameboy",
  "packing": "lanes",
  "unmappedTracks": "drop",
  "tempo": "longest",
  "startBar": 2,
  "nudge": -1,
  "trackMappings": [
    { "midiTrack": 5, "target": "pulse1", "instrument": "riff", "fromBar": 2, "toBar": 9, "mono": "highest" },
    { "midiTrack": 1, "target": "pulse1", "instrument": "vocal", "fromBar": 10, "mono": "highest" },
    { "midiTrack": 3, "target": "pulse1", "instrument": "guitar" },
    { "midiTrack": 2, "target": "pulse2", "instrument": "chords", "mono": "lowest" },
    { "midiTrack": 4, "target": "wave", "instrument": "bass", "fold": [28, 52] },
    { "midiTrack": 9, "target": "noise", "exclude": [54, 70] }
  ]
}
```

- The riff plays bars 2–9 and the vocal takes over from bar 10, both on pulse 1 with an `inst()` switch between them. The guitar comes third, so it only fills the gaps they leave.
- `tempo: "longest"` skips the count-in tempo, `startBar: 2` skips the count-in bar, and `nudge: -1` pulls a late-quantized file back onto the grid.
- Tambourine (54) and maracas (70) are left out of the drum channel; every track not listed is dropped.

Start by running `--inspect` to find the track numbers, then add `--annotate` to see what each mapping kept and dropped.

## Inspecting a MIDI file

`beatbax import midi song.mid --inspect` prints a report and writes nothing. `--chip`, `--config` and an output path are ignored with a warning.

```text
MIDI inspect: "song" — PPQ 480, 4 track(s), 2 bar(s)
Time signatures: 4/4 (none in file)
Tempos: 120 @ bar 1
First tempo: 120 bpm; longest-held tempo: 120 bpm

Track  Ch  Program               Name       Notes  Range   Bars  Activity/8 bars
T0     1   81 lead 2 (sawtooth)  Lead       8      C5-D5   1-2   8
T1     2   81 lead 2 (sawtooth)  Lead Copy  8      C5-D5   1-2   8  (duplicate of T0)
T3     10  0 standard kit        Drums      16     C2-D#6  1-2   16
```

- **Track** is the number to use as `midiTrack`. A track that uses more than one MIDI channel is listed once per channel as `T<n>/ch<c>`. Tracks with no notes are not listed.
- **Ch** is the 1-based MIDI channel; **Program** is the GM program number and name.
- **Activity** counts note starts in each block of 8 source bars, so you can see where a part plays.
- **duplicate of T*n*** marks a track whose notes are identical to an earlier track's; map only one of them.

`--inspect --json` prints the same report as JSON (`ppq`, `bars`, `timeSignatures`, `tempos`, `firstBpm`, `longestBpm`, `activityBlockBars`, `tracks[]`). The engine exposes it as `inspectMidiBytes()` / `inspectMidiParseResult()` from `@beatbax/engine/import`.

## Arrangement notes

`--annotate` (or `annotate: true` in the config) starts the output with a factual comment block, before the usual generated header:

```text
# >>> arrangement notes
# Channel 1 (pulse1):
#   T1 -> synth, bars 1-2: kept 8 of 8
#   T0 -> vocal, bars 3-4: kept 8 of 8
#   T2 -> guitar, all bars: kept 7 of 16 (dropped lane_overlap 9)
# Channel 3 (wave):
#   T3 -> bass, all bars: kept 4 of 4
# Dropped, matching no mapping: T0 ch1 (8 notes), T1 ch2 (8 notes), T4 ch5 (4 notes)
# Timing: tempo first, source 120 bpm, written bpm 120 (ticksPerBeat 4)
# Window: whole song; nudge 0 sixteenth(s)
# Ignored: 0 tempo event(s), 0 time signature event(s)
# <<< arrangement notes
```

It lists, per channel, each contributing mapping in lane order with the notes it kept and why others were dropped (`lane_overlap`, `mono_reduce`, `pitch_out_of_range`; `; ignored by include/exclude n` for filtered drum notes). It also lists drum hits lost on the noise channel, mappings that produced no output, notes left out by `unmappedTracks: "drop"` (here T0 and T1 appear because their notes outside bars 3–4 and 1–2 match no mapping), and the timing decisions. Auto-mapped parts appear as `auto T<n> ch<c> -> <instrument>`. The `>>>` / `<<<` marker lines let tools find or replace the block.

The block is part of the file the importer writes, so re-running the import replaces it along with any notes you added.

## Behaviour

- Emits a chip kit from GM families typed for the packed role (`{family}_p1_inst` / `_p2_inst` / `_bass_inst`, and `bass_inst`), plus named percussion `kick`, `snare`, `hihat`, `ghost`, `crash` (and Game Boy `shaker`). An `instrument` set in `trackMappings` is used as written.
- Default GM drums: kick 35/36, snare 38/40, **hand clap 39 → snare**, hats 42/44/46, crash 49, side stick 37 → ghost. Same-tick kick+snare keeps the **snare**.
- Every drum hit is one step long followed by rests (`kick .:3`), however long the MIDI note is, because named drum tokens are one-shot hits.
- Packs melodic voices into chip channels; multiplexes non-overlapping streams with `inst(name)`; **warns and drops** on over-polyphony (dense pop MIDIs often lose voices on Game Boy — use [lanes](#lanes), prefer NES, or pin important tracks with `trackMappings`).
- Chords on one channel flatten to a single note per tick (with a warning); set `mono` to choose which note is kept.
- Splits into 16-tick bars by default, reuses identical bars as shared patterns, and compresses sequences with `*N` (see [Generated names](#generated-names)).
- Deterministic: same MIDI + chip + options → byte-identical `.bax`.
- **Not** a round-trip with [`beatbax export midi`](/docs/exports/overview) — import is a transcription aid into editable BeatBax source.

### Written tempo and `ticksPerBeat`

One BeatBax step lasts a sixteenth note of `bpm` (see [BPM](/docs/language/metadata-directives#bpm)). The importer places `ticksPerBeat` output steps on each source beat and writes `bpm` as `round(source bpm × ticksPerBeat / 4)`, so the song plays at the source speed.

- `ticksPerBeat: 3` gives a triplet-eighth grid (use `patternTicks: 12` for 4/4 bars): a 135 bpm source is written as `bpm 101`.
- `ticksPerBeat: 8` gives a 32nd-note grid: 90 bpm is written as `bpm 180`.
- With the default `ticksPerBeat: 4` nothing changes.

> **Behaviour change:** earlier versions wrote the source bpm unchanged when `ticksPerBeat` was not 4, so such imports played at 4 / `ticksPerBeat` times the source speed (a `ticksPerBeat: 3` import ran 4/3 too fast). Re-importing those files now gives the scaled `bpm`. If you corrected the tempo by hand, you no longer need to.

### Generated names

| Kind | Name | Example |
|------|------|---------|
| Melodic instrument | `{family}_p1_inst`, `{family}_p2_inst`, `{family}_bass_inst`, `bass_inst` | `lead_p1_inst`, `strings_p2_inst` |
| Drum instrument | the hit token | `kick`, `snare`, `hihat`, `kick_dmc` |
| Pattern | `<channel>_<n>_pat`, numbered in the order bars first play | `lead_01_pat`, `drums_12_pat` |
| All-rest pattern | `rest_x<steps>_pat`, shared by every channel | `rest_x16_pat` |
| Sequence | `<channel>_seq`, or `<channel>_s<NN>_seq` per section | `bass_seq`, `lead_s02_seq` |

`<channel>` is `lead` (pulse 1), `arp` (pulse 2), `bass` (wave / triangle), `drums` (noise) or `dmc`. Patterns are listed rest patterns first, then channel by channel in play order; the comment above each still gives the first source bar and a content hash. A bar that is identical on two channels is one pattern, named after the channel that plays it first. Instrument names set with `trackMappings[].instrument` are used as written.

> **Behaviour change:** earlier versions named patterns by content hash (`lead_c446943e`), sequences `lead_s01`, and instruments `lead_p1` / `bass`. Re-importing gives the names above; the music is unchanged.

### Drum hit length

> **Behaviour change:** earlier versions wrote a drum note longer than one step as `kick:4`. A named drum token plays for one step whatever its `:N`, so the drum channel came out shorter than the other channels and drifted later hits out of time (sometimes with `mono_conflict` warnings). Drum hits on the noise and DMC channels are now written as one step plus rests (`kick .:3`). Re-import files whose drums sounded early or out of step.

## Current limitations

- **One tempo, fixed bars.** The output has a single `bpm` (`tempo` or `bpm` picks which one) and bars of `patternTicks` steps. Tempo changes are reported as `tempo_map_ignored`, and other or changing time signatures as `time_signature_ignored`. BeatBax has no tempo map or meter changes.
- **Default packing moves or drops whole parts.** Without `packing: "lanes"`, a mapped part that collides with another still moves to another free channel of the same kind, or is dropped whole with `over_polyphony`. Use lanes for dense multi-track MIDIs.
- **Default chord reduction keeps the lower note.** Without `mono`, notes starting together keep the earliest, then the louder, then the **lower** pitch (`chord_flatten`; `mono_reduce` in lane mode). For chordal lead parts set `mono: "highest"`.
- **Bar numbers follow the first time signature.** In a file that changes meter, later source bars are counted with the first signature's length (`bar_numbering_first_signature`). Check with `--inspect`.
- **NES drum tokens.** The NES kit has no `shaker`. On NES, map shaker, cabasa and maracas notes to `hihat` in `drumMap`; a `shaker` value is reported by `beatbax verify` as an unknown token.

## Related docs

- [BeatBax CLI](/docs/tools/cli)
- [Pattern Grid](/docs/tools/pattern-grid)
- [MIDI step entry](/docs/tools/midi-step-entry) (keyboard input in Desktop)
- [Export Plugins](/docs/exports/overview) (including built-in MIDI export)
- [NES](/docs/chips/nes) / [Game Boy](/docs/chips/gameboy)
