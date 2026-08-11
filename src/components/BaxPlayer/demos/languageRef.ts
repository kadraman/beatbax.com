/**
 * Short Game Boy demos for Language Reference pages.
 * Each export is a complete, pasteable `.bax` song.
 */

const META = `song name "Language Ref Demo"
song artist "BeatBax Docs"
chip gameboy
bpm 140
volume 0.7`;

const LEAD = `inst lead type=pulse1 duty=50 env=gb:13,down,1 gm=81`;

/** Notes, lengths, rests, sustains */
export const notesLengthsBax = `${META}

${LEAD}

# @show
pat melody = C4:4 E4 . G4 _ _ _ C5:2 .
# @end

channel 1 => inst lead pat melody
play
`;

/** Pattern groups, repeats, named hits, inst() overrides */
export const patternsBasicsBax = `${META}

${LEAD}
inst kick type=noise gb:width=7 uge_note=C-6 length=16 pitch_env=[0,-2,-4,-6] vol_env=[15,12,8,4]
inst snare type=noise gb:width=7 env=gb:13,down,1 length=16 note=C6
inst hat type=noise gb:width=15 env=gb:5,down,1 note=C6

# @show
pat riff = (C5 E5 G5)*2 C5:4
pat drums = kick . hat . snare . hat hat
pat mixed = C5 E5 inst(snare,2) C6 C6 .
# @end

channel 1 => inst lead pat riff
channel 4 => inst kick pat drums
play
`;

/** Sequences with repeats and groups */
export const sequencesBasicsBax = `${META}

${LEAD}

# @show
pat a = C5 . E5 . G5 . C5 .
pat b = E5 . G5 . A5 . G5 .

seq lead_seq = a b*2
seq looped = (a b)*2
# @end

channel 1 => inst lead seq lead_seq
play
`;

/** Channel wiring with speed= and lock= */
export const channelsBasicsBax = `${META}
stepsPerBar 4
scale C major warn

${LEAD}
inst bass type=wave volume=100 wave=[0,2,4,6,8,10,12,14,15,14,12,10,8,6,4,2] gm=33

# @show
pat lead_pat = C5 E5 G5 C6 E5 G5 C5 .
pat bass_pat = C3:4 G2:4 A2:4 F2:4

channel 1 => inst lead pat lead_pat lock=chord
channel 3 => inst bass pat bass_pat speed=1
# @end

play
`;

/** Pitch bend inline effect */
export const fxBendBax = `${META}

${LEAD}

# @show
pat bend_up = C4:8 C4<bend:+2>:8
pat dive = C5:4 C5<bend:-12,linear,0>:12
# @end

channel 1 => inst lead seq bend_up dive
play
`;

/** Inline sweep effect (WebAudio) — also document instrument sweep separately */
export const fxSweepBax = `${META}

${LEAD}

# @show
# Inline sweep effect (time, direction, shift) — Game Boy NR10-style
pat pew = C5<sweep:2,down,5>:8 . .:7
pat rise = C4<sweep:6,up,4>:8 . .:7
# @end

channel 1 => inst lead seq pew rise
play
`;

/** In-file export syntax illustration (still a valid Program for playback) */
export const exportStmtBax = `${META}

${LEAD}
pat motif = C5 E5 G5 C5

# @show
# Recognized by the grammar. Practical export is usually via CLI / Desktop.
export wav "out/motif.wav"
# @end

channel 1 => inst lead pat motif
play
`;
