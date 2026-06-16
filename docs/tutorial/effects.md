---
sidebar_position: 2
title: Effects
---

### Panning (stereo)
Panning controls stereo position and can be specified in multiple forms:
- `gb:pan=<L|R|C>` — Game Boy NR51 terminal mapping (exact hardware L/R/C flags)
- `pan=<num>` or `<pan:num>` — numeric pan in range `[-1.0, 1.0]` (`-1.0` left, `0` center, `1.0` right)
- Inline note tokens: `C5<pan:-1.0>` or `C6<pan:L>` apply to a single note
- Effect parameter rules: parameters are comma-separated, trimmed, numeric tokens are converted to numbers (e.g., `1` → `1`), and empty params (consecutive commas or empty entries) are ignored and removed.
- Sequence-level transforms: `seqname:pan(1.0)` applies numeric pan to an entire sequence occurrence

Notes:
- Browser (WebAudio) playback uses a StereoPannerNode when available for smooth numeric panning.
- Exporting to hUGETracker (`export uge`) maps `gb:pan` to NR51 bits exactly; numeric `pan` values are snapped (pan < -0.33 → L, pan > 0.33 → R, otherwise C) unless you use the `--strict-gb` flag which rejects numeric pans.

Example:
```
pat stereo = C5<pan=-1.0> E5<pan=0.0> G5<pan=1.0> C6<gb:pan:L>
seq bass_seq = bassline bassline:pan(gb:R) bassline bassline:pan(1.0)
```

### Portamento (pitch slide)
Portamento creates a smooth pitch glide between notes, commonly used in bass lines and melodic phrases.

**Syntax**
- `<port:speed>` — slide to the current note's pitch from the previous note's pitch (legato, no retrigger)
- `speed`: portamento speed (0-255, higher = faster slide)

**Behavior**
- Portamento slides from the last played frequency to the target note's frequency
- **Legato mode**: Notes with portamento do NOT retrigger the envelope, creating one continuous sound
- State is tracked per-channel, so portamento works correctly across rests and sustains
- First note in a pattern never receives portamento (no previous pitch to slide from)
- The duration (`:N`) specifies how long the pitch is held, while `<port:speed>` controls slide speed

**Examples**
```bax
# Basic portamento bass line (each portamento note continues the previous envelope)
inst bass type=pulse2 duty=25 env=10,down
pat port_bass = C3 . E3<port:8> . G3<port:8> . C4<port:8> .

# Continuous legato slide (ONE note sliding through pitches)
pat legato_slide = C4:4 C5<port:12>:4 C6<port:12>:4 C5<port:12>:4

# Varying portamento speeds
pat melody = C4 E4<port:4> G4<port:8> C5<port:16>

# Portamento with octave transpose
pat bass_line = C3 . E3<port:8> . G3<port:8> .
seq bass_seq = bass_line:oct(-1)  # Transposes correctly with effects

# Fast portamento for glide effects
pat glide = C4 C5<port:32> C4<port:32> C5<port:32>
```

**Export behavior**
- **UGE (hUGETracker)**: Exports as `3xx` (tone portamento) effect with speed mapped directly to `xx` parameter
- **MIDI**: Exports as text metadata in track events
- **JSON**: Includes `port` effect with `speed` parameter in the ISM
- **WAV**: Rendered with cubic smoothstep easing for natural-sounding pitch curves

**Common patterns**
```bax
# Smooth bass slides
pat bass1 = C2 . E2<port:6> . G2<port:6> . C3<port:6> .
pat bass2 = C2 . C3<port:12> C2<port:12> .

# Melodic portamento (slower for expressiveness)
pat lead = C5 . E5<port:4> . G5<port:4> . E5<port:4> .

# Fast glissando effect
pat gliss = C4 G4<port:32> C5<port:32> G5<port:32>
```

See `songs/effects/portamento.bax` for a complete working example.

## Vibrato (`vib`) Effect

Vibrato adds periodic pitch modulation to notes for expressive, musical variation:

```bax
# Basic vibrato: depth and rate
pat melody = C5<vib:6,5> E5<vib:4,8> G5<vib:3,10>

# With waveform name (smooth sine-like vibrato)
pat smooth_vib = C5<vib:6,5,sine> D5<vib:4,6,triangle>

# With waveform name and duration (2 rows)
pat short_vib = C5<vib:6,5,square,2>:8 D5<vib:3,6,sine,2>:8

# Named preset for reusable vibrato
effect wobble = vib:4,8,sine,4
pat preset_demo = C5<wobble> E5<wobble>
```

**Parameters:**
1. `depth` (required): Vibrato amplitude, 0-15 (higher = wider pitch variation)
2. `rate` (required): Vibrato speed in Hz-like units (higher = faster modulation)
3. `waveform` (optional): LFO shape - name or number 0-15. Default: `none` (0)
   - Common waveforms: `sine` (smooth), `square` (stepped), `triangle` (smooth), `saw` (rising/falling)
   - See `docs/features/complete/effects-system.md` for complete list of 16 official hUGETracker waveforms
4. `durationRows` (optional): Length in pattern rows. Default: full note duration

**Export behavior:**
- **UGE (hUGETracker)**: Exports as `4xy` (vibrato) where `x`=waveform (0-15), `y`=depth (0-15)
  - Vibrato appears on BOTH the note row AND the first sustain row for immediate modulation
  - Note: hUGETracker has no true sine wave; `sine` maps to `triangle` (waveform 2) for smooth vibrato
- **MIDI**: Vibrato encoded as pitch bend messages with modulation
- **JSON**: Includes `vib` effect with all parameters in the ISM

**Waveform aliases:** The parser recognizes common aliases:
- `sine`, `sin` → 2 (triangle - smoothest available)
- `square`, `sqr`, `pulse` → 1
- `triangle`, `tri` → 2
- `saw`, `sawtooth` → 3
- `ramp` → 4 (sawtooth down)
- `noise`, `random` → 5

See `songs/effects/vibrato.bax` for a complete working example.

## Volume Slide (`volSlide`) Effect

Volume slide creates smooth or stepped volume changes over the duration of a note, enabling fade-ins, fade-outs, and dynamic volume automation:

```bax
# Basic volume slide: positive for fade-in, negative for fade-out
pat fade_in  = C4<volSlide:+6>:8 E4<volSlide:+6>:8 G4<volSlide:+6>:8
pat fade_out = C5<volSlide:-3>:8 G4<volSlide:-3>:8 E4<volSlide:-3>:8

# Stepped volume slide (delta, step count)
# Second parameter creates audible steps instead of smooth ramp
pat stepped = C4<volSlide:+8,4>:16 E4<volSlide:-8,4>:16

# Named presets for reusable volume slides
effect fadeIn  = volSlide:+5
effect fadeOut = volSlide:-5
pat preset_demo = C4<fadeIn>:4 E4<fadeOut>:4

# Combining with other effects
pat combo = C4<vib:3,6,volSlide:+3>:4 E4<port:12,volSlide:-2>:4
```

**Parameters:**
1. `delta` (required): Volume change rate (signed integer)
   - Positive values = fade in / crescendo
   - Negative values = fade out / decrescendo
   - Typical range: ±1 to ±15 (units are relative gain changes)
2. `steps` (optional): Number of discrete steps for the slide
   - If omitted: smooth linear ramp over note duration
   - If provided: stepped volume changes create audible "terracing"

**Important considerations:**

1. **Low-volume instruments:** When using instruments with very low initial volume (e.g., `env=0` or `env=1`):
   - Start from `env=1` instead of `env=0` to avoid complete silence
   - Use larger delta values (+10 to +15) to become audible quickly
   - Use longer note durations (:12 or :16) to allow the slide to complete
   - Apply `inst(name,N)` to cover ALL notes that need the same starting volume

   ```bax
   # Good: starts near-silent but audible, fades in over 12 ticks
   inst lead_in type=pulse1 env=1,flat
   pat fade = inst(lead_in,2) C4<volSlide:+14>:12 . C4<volSlide:+14,4>:12
   ```

2. **Note re-triggering:** On monophonic channels (all Game Boy channels), identical consecutive pitches blend into one continuous note:
   - Insert a rest (`.`) between same-pitch notes to force re-trigger
   - Different pitches automatically re-trigger

   ```bax
   # Without rest: blends into one 16-tick note
   pat blend = C4<volSlide:+4>:8 C4<volSlide:+4>:8  # Sounds like one note

   # With rest: two distinct notes with separate volume slides
   pat separate = C4<volSlide:+4>:8 . C4<volSlide:+4>:8  # Two distinct fades
   ```

3. **Instrument override count:** The `inst(name,N)` count applies only to non-rest tokens:
   - Rests (`.`) do NOT consume from the count
   - Example: `inst(lead_in,2) C4 . C4` applies `lead_in` to both C4 notes

**Export behavior:**
- **UGE (hUGETracker)**: Exports as volume slide effect (tracker-specific opcode)
- **MIDI**: Exports as CC #7 (volume) automation
- **JSON**: Includes `volSlide` effect with delta and steps parameters in the ISM
- **WAV**: Rendered with linear or stepped gain automation

See `songs/effects/volume_slide.bax` for a complete working example.

## Tremolo (`trem`) Effect

Tremolo creates periodic amplitude (volume) modulation, adding rhythmic pulsation or shimmer to notes:

```bax
# Basic tremolo: depth and rate
pat shimmer = C4<trem:6,4>:8 E4<trem:8,6>:8 G4<trem:10,8>:8

# With waveform name (different modulation shapes)
pat varied = C4<trem:8,6,sine>:4 E4<trem:8,6,square>:4 G4<trem:8,6,triangle>:4

# With waveform and duration (2 rows)
pat short_trem = C5<trem:10,8,square,2>:8 E5<trem:6,4,sine,2>:8

# Named presets for reusable tremolo
effect shimmer = trem:6,4,sine
effect pulse = trem:10,8,square
pat preset_demo = C4<shimmer>:4 E4<pulse>:4

# Combining with other effects
pat combo = C4<vib:3,6,trem:6,4>:4 E4<port:12,trem:8,6>:4 G4<trem:8,6,volSlide:+3>:4
```

**Parameters:**
1. `depth` (required): Tremolo amplitude, 0-15 (higher = more pronounced volume variation)
   - Maps to 0-50% volume modulation internally
2. `rate` (required): Tremolo speed in Hz (higher = faster pulsation)
3. `waveform` (optional): LFO shape - `sine`, `triangle`, `square`, or `saw`. Default: `sine`
4. `durationRows` (optional): Length in pattern rows. Default: full note duration

**Export behavior:**
- **WebAudio/WAV**: Full tremolo rendering with accurate LFO modulation via GainNode
- **UGE (hUGETracker)**: Exported as meta-event only (no native tremolo effect in hUGETracker)
  - Can be approximated manually in tracker with volume column automation
- **MIDI**: Documented via text meta event (MIDI has no native tremolo)
- **JSON**: Includes `trem` effect with all parameters in the ISM

**Waveforms:**
- `sine` - Smooth, natural tremolo (default)
- `triangle` - Linear rise/fall volume modulation
- `square` - Hard on/off pulsation (gate effect)
- `saw` - Asymmetric ramping volume changes

See `songs/effects/tremolo.bax` for a complete working example.

## Note Cut (`cut`) Effect

Note cut (also called "note gate") terminates a note after a specified number of ticks, creating staccato and percussive articulation:

```bax
# Basic note cut: stop note after N ticks
pat staccato = C4<cut:4>:8 E4<cut:6>:8 G4<cut:3>:8 C5<cut:8>:8

# Named presets for common articulations
effect short = cut:2
effect medium = cut:4
effect long = cut:8

pat articulated = C4<short>:4 E4<medium>:4 G4<long>:4

# Combining with other effects
pat combo = C4<vib:4,6,cut:8>:8 E4<cut:4,volSlide:+2>:8 G4<arp:4,7,cut:6>:8
```

**Parameters:**
1. `ticks` (required): Number of ticks after note onset before cutting (0-255)
   - Lower values = shorter, more percussive notes
   - Higher values = longer sustain before cut

**Behavior:**
- Cuts note by setting gain to 0 after the specified tick delay
- Works with all channel types (pulse1, pulse2, wave, noise)
- Useful for creating rhythmic patterns and percussive effects
- Especially effective with `flat` or `sustain` envelopes

**Export behavior:**
- **WebAudio/WAV**: Full note cut rendering via scheduled GainNode automation
- **UGE (hUGETracker)**: Exports as `E0x` Note Cut effect (x = ticks)
- **MIDI**: Documented via text meta event
- **JSON**: Includes `cut` effect with `ticks` parameter in the ISM

**Common patterns:**
```bax
# Percussive staccato melody
inst stab type=pulse1 duty=50 env=gb:12,flat,1
pat stabby = C5<cut:2> . E5<cut:2> . G5<cut:2> . C6<cut:2> .

# Rhythmic gating pattern
inst gate type=pulse2 duty=25 env=gb:10,flat,1
pat gated = C4<cut:4>:8 C4<cut:3>:8 C4<cut:6>:8 C4<cut:2>:8

# Drum-like melodic hits
inst kick type=pulse1 duty=12 env=gb:15,down,1
pat kicks = C2<cut:4> . C2<cut:3> . C2<cut:6> C2<cut:4>
```

See `songs/effects/notecut.bax` for a complete working example.

## Retrigger (`retrig`) Effect

**Status: WebAudio-only, not supported in UGE export**

Retrigger creates rhythmic stuttering by repeatedly restarting a note at regular intervals with optional volume fadeout:

```bax
# Basic retrigger: interval in ticks
pat stutter = C4<retrig:4>:16 E4<retrig:8>:16 G4<retrig:2>:16

# With volume fadeout (experimental, works best with down envelopes)
pat fade_stutter = C4<retrig:4,-2>:16 E4<retrig:6,-1>:16

# Named presets for common retrigger patterns
effect fast_stutter = retrig:2
effect drum_roll = retrig:4
effect slow_pulse = retrig:8

pat demo = C4<fast_stutter>:16 E4<drum_roll>:16 G4<slow_pulse>:16

# Combining with other effects
pat combo = C4<retrig:4,pan:-1.0>:16 E4<retrig:6,vib:4,6>:16
```

**Parameters:**
1. `interval` (required): Number of ticks between each retrigger (1-255)
   - Lower values = faster stuttering (2-4 for glitchy effects)
   - Higher values = slower pulsing (6-12 for drum rolls)
2. `volumeDelta` (optional): Volume change per retrigger in Game Boy envelope units (-15 to +15)
   - Negative values create fadeout (e.g., -2, -3, -5)
   - Positive values create fadein (e.g., +2, +3)
   - Normalized internally: value/15 (e.g., -2 → -0.133 per retrigger)
   - Example: `<retrig:4,-2>` with 8 retrigs = 8 × -0.133 ≈ -1.064 (full fadeout)
   - Works best with `down` or other decaying envelopes; may be subtle with `flat` envelopes

**Behavior:**
- Schedules multiple note restarts at regular intervals
- Each retrigger creates a full envelope restart
- Retriggering stops when reaching note duration
- Compatible with other effects (pan, vib, etc.)
- Prevents infinite recursion by filtering out retrig effect from retriggered notes

**Export behavior:**
- **WebAudio playback**: Fully supported with all features
- **PCM renderer (CLI)**: Not yet supported, use `--browser` flag for CLI playback
- **UGE (hUGETracker)**: **NOT SUPPORTED** - hUGETracker has no native retrigger effect
  - When exporting songs with retrigger to UGE, a warning will be displayed
  - Retrigger effects will be omitted from the output
  - Warning: `[WARN] [export] Retrigger effects detected in song but cannot be exported to UGE`
- **MIDI**: Exports as text metadata
- **JSON**: Includes `retrig` effect with all parameters in the ISM

**Limitations:**
- Volume fadeout may not be audible with `flat` envelopes
- PCM renderer does not support retrigger (use browser playback)
- Cannot be exported to UGE format (no hUGETracker equivalent)

**Workaround for UGE export:**
Expand retrigger into multiple note events manually:
```bax
# Instead of retrigger effect:
pat auto_retrig = C4<retrig:4>:16

# Use explicit notes for UGE compatibility:
pat manual_retrig = C4:4 C4:4 C4:4 C4:4
```

**Common patterns:**
```bax
# Fast glitchy stutter (2-tick intervals)
pat glitch = C5<retrig:2>:16 E5<retrig:2>:12 G5<retrig:2>:8

# Drum roll effect (4-tick intervals)
pat roll = C4<retrig:4>:32 C4<retrig:4>:32

# Slow pulsing bass (8-tick intervals)
pat pulse_bass = C2<retrig:8>:32 E2<retrig:8>:32 G2<retrig:8>:32

# With volume fadeout for echo-like decay
pat echo_stutter = C5<retrig:6,-1>:32
```

See `songs/effects/retrigger.bax` for a complete working example.

**Important:** Remember that retrigger effects will trigger a warning when exporting to UGE format and will not be included in the exported file.

#### Echo / Delay (`echo`)

**Status:** ✅ Fully implemented (WebAudio playback only)

**Overview:**
- Creates time-delayed feedback repeats for ambient, rhythmic, and dub-style effects
- Uses WebAudio DelayNode with configurable delay time, feedback amount, and wet/dry mix
- Delay time can be specified as beat fractions (< 10.0) or absolute seconds (≥ 10.0)

**Syntax:**
```
<echo:delayTime,feedback,mix>
```

**Parameters:**
1. `delayTime` (required): Delay time as beat fraction or absolute seconds
   - Values < 10.0: Fraction of beat (0.25 = quarter beat, 1.0 = whole beat, 4.0 = four beats)
   - Values ≥ 10.0: Absolute time in seconds (10.0 = 10 seconds)
   - At 120 BPM: 1 beat = 0.5 seconds
2. `feedback` (optional, default 50): Feedback amount 0-100%
   - 0 = single repeat (slapback)
   - 50 = moderate decay (default)
   - 90+ = long tail (dub-style)
3. `mix` (optional, default 30): Wet/dry mix 0-100%
   - 0 = dry only (no echo)
   - 30 = subtle echo (default)
   - 50 = equal mix
   - 100 = wet only (echo only)

**Examples:**
```
# Named effect presets
effect ambient = echo:0.5,30,20      # Half-beat delay, light feedback, subtle mix
effect slapback = echo:0.25,0,40     # Quarter-beat, no feedback, moderate mix
effect dub = echo:0.375,70,50        # Dotted-eighth, heavy feedback, equal mix
effect rhythmic = echo:0.25,50,30    # Quarter-beat, moderate feedback

# Inline usage
pat ambient_lead = C5<echo:0.5,30,20>:8 E5:8 G5:8 C6:8
pat slapback_melody = C4<echo:0.25,0,40>:4 E4:4 G4:4 C5:4

# With pattern application
seq s1 = ambient_lead:ambient*3
seq s2 = slapback_melody:slapback
```

**Key Features:**
- Beat-synchronized delays: 0.25, 0.5, 0.75, 1.0, 2.0, 4.0 (musical timing)
- Absolute time delays: 10.0+ seconds (for experimental effects)
- Smooth feedback loop with proper audio routing
- Separate dry/wet signal paths for stable audio
- Works with panning and other effects

**Technical Notes:**
- Uses WebAudio DelayNode with feedback loop
- Proper cleanup after echo tail dies out (logarithmic decay calculation)
- Maximum tail duration capped at 10 seconds to prevent excessive memory usage
- Echo routing applied after panning to preserve stereo positioning

**Limitations:**
- **WebAudio only**: Echo does not work in CLI/PCM renderer
- CLI playback displays warning: `[WARN] [play] Echo/delay effects detected but are not supported in PCM renderer`
- UGE export displays warning: `[WARN] [export] Echo/delay effects detected but cannot be exported to UGE`
- Use `--browser` flag for echo support: `node bin/beatbax play --browser songs/effects/echo.bax`

See `songs/effects/echo.bax` for a complete working example.

**Important:** Remember that echo effects only work in WebAudio/browser playback. CLI/PCM renderer and UGE export will display warnings.

**Tempo & Per-Channel Speed**

- Set a master tempo with a top-level directive: `bpm 128` or `bpm=128`.
- Per-channel multipliers: use `speed=2` or `speed=2x` on a channel to play
  that channel at a multiple of the master BPM. Example: `speed=2x` plays
  twice as fast as the master tempo.

Example:
```
# Use master tempo 128 BPM
bpm 128

# Channel 1 uses master BPM (128)
channel 1 => inst leadA seq lead

# Channel 2 runs twice as fast (240 BPM effective) using a speed multiplier
channel 2 => inst leadB seq bass speed=2x
```

**Example pattern snippet**
```
inst leadA type=pulse1 duty=60 env=gb:12,down,7 gm=81
inst sn type=noise env=gb:10,down,1

# C5:4 plays for 4 ticks; E5 _ _ _ also plays for 4 ticks
pat melody = C5:4 E5 _ _ _ (G5 C6)*2 inst(sn,2) C6 C6 .

# Use a top-level BPM instead of channel-level bpm
bpm 160
channel 1 => inst leadA pat melody
channel 4 => inst sn pat drums
```

This plays the motif on channel 1, temporarily substituting the `sn` noise instrument for the next two non‑rest hits.

### Wave channel volume example

The Game Boy wave channel exposes a per-instrument output-level selector via `volume=`. This selector is stored as a raw 0..3 value in UGE (0=mute, 1=100%, 2=50%, 3=25%) and maps to the hardware NR32 register as `(value << 5)` — it is not an envelope. Therefore, changing `volume=` while a note is sustaining has no audible effect until the note is retriggered or the instrument is changed.

Example:

```
# Two wave instruments with different output levels
inst wave_loud type=wave wave=[8,11,13,14,15,14,13,11,8,4,2,1,0,1,2,4] volume=100
inst wave_soft type=wave wave=[8,11,13,14,15,14,13,11,8,4,2,1,0,1,2,4] volume=50

# Play the same pattern twice; the second occurrence is a retrigger so it takes the new level
pat hold = C4:8
seq hold_seq = hold:inst(wave_loud) hold:inst(wave_soft)
channel 3 => seq hold_seq
```

In this example the first `hold` plays at the loud output level; the second `hold` is retriggered and plays at the softer level.
