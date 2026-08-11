/**
 * Short Game Boy demos for Language Reference pages.
 * Each export is a complete playable `.bax` song.
 * Use `# @show` / `# @end` to focus the displayed snippet.
 */

const CHIP = `chip gameboy`;

const LEAD = `inst lead type=pulse1 duty=50 env=gb:12,down,1`;
const BASS = `inst bass type=pulse2 duty=25 env=gb:10,down,1`;
const WAVE = `inst pad type=wave volume=100 wave=[0,2,4,6,8,10,12,14,15,14,12,10,8,6,4,2]`;
const PHRASE = `pat phrase = C5 E5 G5 C6 E5 G5 C6 E5`;

/** Metadata — BPM contrast (slow then fast). */
export const bpmSlowBax = `${CHIP}
# @show
bpm 90   # slower tempo
# @end

${LEAD}
${PHRASE}
channel 1 => inst lead seq phrase
play`;

export const bpmFastBax = `${CHIP}
# @show
bpm 140  # faster tempo (same phrase)
# @end

${LEAD}
${PHRASE}
channel 1 => inst lead seq phrase
play`;

/** Metadata — stepsPerBar (editor bar display only; playback unchanged). */
export const stepsPerBarBax = `${CHIP}
bpm 120
# @show
stepsPerBar 8   # editor shows bars of 8 steps (does not change playback)
# @end

${LEAD}
pat waltz = C5 E5 G5 C5 E5 G5 C6 G5 E5
channel 1 => inst lead seq waltz
play`;

/** Metadata — master volume (same dense mix at full vs reduced). */
const DENSE_MIX = `${LEAD}
${BASS}
${WAVE}
inst drums type=noise gb:width=7 env=gb:13,down,1 length=16 uge_note=C-7 note=C6 pitch_env=[0,7,0] vol_env=[13,10,6,2]

pat lead_p = C5:4 E5:4 G5:4 C6:4
pat bass_p = C3:8 G2:8
pat wave_p = C4:8 E4:8
pat drum_p = C6 . C6 . C6 C6 . .

channel 1 => inst lead seq lead_p
channel 2 => inst bass seq bass_p
channel 3 => inst pad seq wave_p
channel 4 => inst drums seq drum_p
play`;

export const volumeFullBax = `${CHIP}
bpm 128
# @show
volume 1.0   # default — dense mixes may clip
# @end

${DENSE_MIX}`;

export const volumeDenseBax = `${CHIP}
bpm 128
# @show
volume 0.35   # lower master to avoid clipping
# @end

${DENSE_MIX}`;

/** Metadata — scale + channel locks (same 8-step rhythm, different degree sets). */
const SCALE_LEAD = `inst lead type=pulse1 duty=50 env=gb:12,down,1`;

function scalePhraseBax(pattern: string, lock?: string, comment?: string): string {
  const lockAttr = lock ? ` lock=${lock}` : '';
  const scaleLine = lock ? `scale C major warn\n` : '';
  const note = comment ? `${comment}\n` : '';
  return `${CHIP}
bpm 140
${SCALE_LEAD}
# @show
${scaleLine}${note}pat phrase = ${pattern}
channel 1 => inst lead seq phrase${lockAttr}
# @end

play`;
}

/** Unlocked chromatic phrase (notes outside C major). */
export const scaleFreeBax = scalePhraseBax(
  'C5 D#5 F#5 G5 A#5 G5 F#5 D#5',
  undefined,
  '# chromatic phrase — no lock=, so out-of-key notes are allowed',
);

export const scaleLockScaleBax = scalePhraseBax(
  'C5 E5 G5 C6 E5 G5 A5 G5',
  'scale',
  '# any degree in C major',
);

export const scaleLockChordBax = scalePhraseBax(
  'C5 E5 G5 C6 E5 G5 E5 G5',
  'chord',
  '# degrees 1 + 3 + 5 (C E G)',
);

export const scaleLockChord7Bax = scalePhraseBax(
  'C5 E5 G5 B5 E5 G5 B5 G5',
  'chord7',
  '# degrees 1 + 3 + 5 + 7 (C E G B)',
);

export const scaleLockFifthBax = scalePhraseBax(
  'C5 G5 C5 G5 C6 G5 C5 G5',
  'root+fifth',
  '# degrees 1 + 5 (C G)',
);

export const scaleLockOctavesBax = scalePhraseBax(
  'C5 C5 C5 C6 C5 C5 C5 C5',
  'octaves',
  '# root only (C, any octave)',
);

/** Instruments — minimal inst demo. */
export const instrumentsBasicBax = `${CHIP}
bpm 128

# @show
inst lead type=pulse1 duty=50 env=gb:13,down,1   # pulse 1 — melody
inst bass type=pulse2 duty=25 env=gb:10,down,1   # pulse 2 — bass

pat lead_p = E5 . G5 C6 . G5 E5 .
pat bass_p = C3:4 G2:4
# @end

channel 1 => inst lead seq lead_p
channel 2 => inst bass seq bass_p
play`;

/** Instruments — shared library result (inline stand-in for import). */
export const instrumentsSharedBax = `${CHIP}
bpm 128

# @show
# Shared kit (same idea as importing a .ins file)
inst kick  type=noise gb:width=7 uge_note=C-6 length=16 pitch_env=[0,-2,-4,-6] vol_env=[15,12,8,4]
inst snare type=noise gb:width=7 env=gb:13,down,1 length=16 uge_note=C-7 note=C6 pitch_env=[0,7,0] vol_env=[13,10,6,2]
inst hat   type=noise gb:width=15 env=gb:5,down,1 uge_note=C-8 note=C6

pat drums = kick . hat . snare . hat hat   # instrument names as tokens
# @end

channel 4 => inst snare seq drums
play`;

/** Macros */
export const macroPitchEnvBax = `${CHIP}
bpm 140

# @show
# pitch_env drops the noise clock; vol_env fades the hit
inst kick type=noise gb:width=7 uge_note=C-6 length=16 pitch_env=[0,-2,-4,-6] vol_env=[15,12,8,4]

# Short hits so the pitch drop + volume decay read as a kick
pat kicks = kick . . . kick . kick . kick . . . kick . . .
# @end

channel 4 => inst kick seq kicks
play`;

export const macroVolEnvBax = `${CHIP}
bpm 120

# @show
# Looping volume swell — |9 loops from index 9
inst swell type=pulse1 duty=50 vol_env=[1,2,3,4,5,6,7,8,9,10|9]

pat hold = C5:16   # hold long enough to hear the loop
# @end

channel 1 => inst swell seq hold
play`;

export const macroArpEnvBax = `${CHIP}
bpm 120

# @show
# Per-frame arpeggio offsets (major triad), looping
inst chord type=pulse2 duty=50 vol=10 arp_env=[0,4,7|0]

pat hold = C4:16
# @end

channel 2 => inst chord seq hold
play`;

export const macroDutyEnvBax = `${CHIP}
bpm 120

# @show
# Alternate duty indexes for a wah / pulse-width sweep
inst wah type=pulse1 duty=50 vol=12 duty_env=[2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0|0]

pat hold = C5:16
# @end

channel 1 => inst wah seq hold
play`;

/** Note mapping — percussion kit with named tokens. */
export const noteMappingKitBax = `${CHIP}
bpm 140

# @show
# note= sets the pitch when the instrument name is used as a token
inst kick     type=pulse1 duty=12.5 env=gb:15,down,1 note=C2
inst snare    type=noise  gb:width=7  env=gb:13,down,1 length=16 uge_note=C-7 note=C6 pitch_env=[0,7,0] vol_env=[13,10,6,2]
inst hihat_cl type=noise  gb:width=15 env=gb:6,down,1  uge_note=C-7 note=C6
inst hihat_op type=noise  gb:width=15 env=gb:8,down,3  uge_note=D-7 note=D6

pat kick_pat  = kick . . . kick . . .
pat snare_pat = . . . . snare . . .
pat hh_pat    = hihat_cl hihat_cl hihat_op hihat_cl hihat_cl hihat_cl hihat_op hihat_cl
# @end

channel 1 => inst kick pat kick_pat
channel 4 => inst snare seq snare_pat hh_pat
play`;

/** Modifiers */
const MOD_PHRASE = `pat motif = C5 E5 G5 C6 E5 G5 A5 G5`;

export const modRotBax = `${CHIP}
bpm 120
${LEAD}
${MOD_PHRASE}

# @show
seq a = motif          # original phrase
seq b = motif:rot(2)   # rotate left by 2 tokens
# @end

channel 1 => inst lead seq a b
play`;

export const modRevPalBax = `${CHIP}
bpm 120
${LEAD}
${MOD_PHRASE}

# @show
seq a = motif        # original phrase
seq b = motif:rev    # reverse token order
seq c = motif:pal    # palindrome (forward + reverse, no duplicated pivot)
# @end

channel 1 => inst lead seq a b c
play`;

export const modOctBax = `${CHIP}
bpm 120
${LEAD}
${MOD_PHRASE}

# @show
seq a = motif              # original phrase
seq b = motif:oct(+1)      # up one octave
seq c = motif:transpose(+2)  # up two semitones
# @end

channel 1 => inst lead seq a b c
play`;

export const modSlowFastBax = `${CHIP}
bpm 140
${LEAD}
pat short = C5 E5 G5 C6

# @show
seq a = short           # original (4 tokens)
seq b = short:slow(2)   # repeat each token twice (lengthens)
seq c = short:fast(2)   # keep every 2nd token (shortens)
# @end

channel 1 => inst lead seq a b c
play`;

export const modEveryBax = `${CHIP}
bpm 120
${LEAD}
${MOD_PHRASE}

# @show
seq a = motif                    # original phrase
seq b = motif:every(2,oct(+1))   # every 2nd token up an octave
# @end

channel 1 => inst lead seq a b
play`;

export const modLagBax = `${CHIP}
bpm 120
${LEAD}
${MOD_PHRASE}

# @show
seq a = motif         # original phrase
seq b = motif:lag(2)  # prepend 2 rests (delay the phrase)
# @end

channel 1 => inst lead seq a b
play`;

export const modShuffleBax = `${CHIP}
bpm 120
${LEAD}
${MOD_PHRASE}

# @show
seq a = motif              # original phrase
seq b = motif:shuffle(42)  # deterministic shuffle (seed 42)
# @end

channel 1 => inst lead seq a b
play`;

export const modEffectBax = `${CHIP}
bpm 120
${LEAD}

# @show
effect stacc = cut:2     # named preset: gate each note after 2 ticks
pat motif = C5 E5 G5 C6 E5 G5 A5 G5
seq a = motif            # plain notes
seq b = motif:stacc      # apply the named effect as a modifier
# @end

channel 1 => inst lead seq a b
play`;

/** Effects */
export const fxArpBax = `${CHIP}
bpm 120

# @show
inst lead type=pulse1 duty=50 env=gb:15,down,0
pat major = C4<arp:4,7>:15 .   # major triad offsets (omit leading 0)
pat minor = C4<arp:3,7>:16     # minor triad offsets
# @end

channel 1 => inst lead seq major minor
play`;

export const fxPanBax = `${CHIP}
bpm 120

# @show
inst lead type=pulse1 duty=50 env=gb:12,down,0
# Numeric pan [-1..1], then Game Boy NR51 terminal
pat stereo = C5<pan:-1.0>:4 E5<pan:0.0>:4 G5<pan:1.0>:4 C6<gb:pan:L>:4
# @end

channel 1 => inst lead seq stereo
play`;

export const fxPortBax = `${CHIP}
bpm 120

# @show
inst bass type=wave volume=100 wave=[0,2,4,6,8,10,12,14,15,14,12,10,8,6,4,2]
pat stepped = C3:4 E3:4 G3:4 C4:4                         # discrete pitches
pat slides  = C3:4 E3<port:16>:4 G3<port:12>:4 C4<port:8>:4  # slide into each target
# @end

channel 3 => inst bass seq stepped slides
play`;

export const fxVibBax = `${CHIP}
bpm 120

# @show
inst lead type=pulse1 duty=50 env=gb:15,down,0
pat plain = C5:8 E5:8              # no vibrato
pat vib   = C5<vib:6,4>:8 E5<vib:8,6>:8   # depth, rate
# @end

channel 1 => inst lead seq plain vib
play`;

export const fxVolSlideBax = `${CHIP}
bpm 120

# @show
inst lead type=pulse1 duty=50 env=gb:8,flat,0
pat fade = C5<volSlide:+6>:8 . E5<volSlide:-6>:8 .   # fade in, then fade out
# @end

channel 1 => inst lead seq fade
play`;

export const fxTremBax = `${CHIP}
bpm 120

# @show
inst lead type=pulse1 duty=50 env=gb:12,flat,0
pat shimmer = C5<trem:8,6>:8 E5<trem:10,8,square>:8   # depth, rate [,waveform]
# @end

channel 1 => inst lead seq shimmer
play`;

export const fxCutBax = `${CHIP}
bpm 120

# @show
inst stab type=pulse1 duty=50 env=gb:12,flat,1
pat staccato = C5<cut:2> . E5<cut:2> . G5<cut:3> . C6<cut:2> .   # gate after N ticks
# @end

channel 1 => inst stab seq staccato
play`;

export const fxRetrigBax = `${CHIP}
bpm 120

# @show
inst lead type=pulse1 duty=50 env=gb:12,down,1
pat stutter = C5<retrig:4>:16 E5<retrig:2>:16   # restart every N ticks
# @end

channel 1 => inst lead seq stutter
play`;

export const fxEchoBax = `${CHIP}
bpm 100

# @show
# delay (beat fraction), feedback %, wet mix %
# Short delay + high mix = clear trailing copy of each note
effect slap = echo:0.2,0,85

inst lead type=pulse1 duty=50 env=gb:15,down,1

# Busy melody so you hear the delayed ghost behind every hit
pat melody = C5 E5 G5 A5 C6 A5 G5 E5 C5 E5 G5 C6 G5 E5 C5 G5 E5 C5 . . . . . . . . . . . . . . . .
seq lead = melody:slap
# @end

channel 1 => inst lead seq lead
play`;

export const fxChannelSpeedBax = `${CHIP}
bpm 100

inst lead type=pulse1 duty=50 env=gb:12,down,1
inst harm type=pulse2 duty=25 env=gb:10,down,1

pat phrase = C5 E5 G5 C6 E5 G5 A5 G5 C5 E5 G5 C6

# @show
# Same phrase: channel 1 at master bpm, channel 2 at 2× (finishes sooner)
channel 1 => inst lead seq phrase
channel 2 => inst harm seq phrase speed=2x
# @end

play`;

export const fxNamedBax = `${CHIP}
bpm 120

# @show
effect wobble = vib:6,4    # reusable vibrato preset
effect spark  = arp:4,7    # reusable arpeggio preset
effect slide  = port:16    # reusable portamento preset

inst lead type=pulse1 duty=50 env=gb:15,down,0
inst bass type=wave volume=100 wave=[0,2,4,6,8,10,12,14,15,14,12,10,8,6,4,2]

pat lead_line = C5:4 E5<wobble>:8 G5<spark>:4
pat bass_line = C3:4 E3<slide>:4 G3<slide>:4 C4<slide>:4
# @end

channel 1 => inst lead pat lead_line
channel 3 => inst bass pat bass_line
play`;
