/**
 * Progressive Game Boy tutorial song — "Tutorial Groove".
 * Each export is a complete, pasteable `.bax` song. Later stages build on earlier ones.
 *
 * Channel roles (common Game Boy layout):
 *   1 pulse1 — lead
 *   2 pulse2 — harmony / counter
 *   3 wave   — bass
 *   4 noise  — drums
 *
 * Timing rule: every pattern is exactly **16 steps** so channels stay locked when
 * sequences chain multiple phrases. Prefer length-preserving modifiers (`:rot`,
 * `:oct`, `:rev`) in the modifiers stage — avoid `:slow` / `:fast` across channels.
 */

const META = `song name "Tutorial Groove"
song artist "BeatBax Tutorial"
song description "Built step by step in the BeatBax Game Boy tutorial."
song tags "tutorial, gameboy"

chip gameboy
bpm 140`;

const INSTRUMENTS = `inst lead    type=pulse1 duty=50 env=gb:13,down,1 gm=81
inst harmony type=pulse2 duty=25 env=gb:10,down,2 gm=80
inst bass    type=wave volume=100 wave=[0,2,4,6,8,10,12,14,15,14,12,10,8,6,4,2] gm=33
inst kick    type=noise gb:width=7 uge_note=C-6 length=16 pitch_env=[0,-2,-4,-6] vol_env=[15,12,8,4]
inst snare   type=noise gb:width=7 env=gb:13,down,1 length=16 uge_note=C-7 note=C6 pitch_env=[0,7,0] vol_env=[13,10,6,2]
inst hat     type=noise gb:width=15 env=gb:5,down,1 uge_note=C-8 note=C6`;

/** Shared 16-step phrases used from instruments-together onward. */
const PATS_SIMPLE = `pat lead_pat    = E5 . G5 C6 . G5 E5 . D5 . F5 A5 . G5 . .
pat harmony_pat = C4:4 E4:4 G4:4 E4:4
pat bass_pat    = C3 . . C3 G2 . . G2 A2 . . A2 F2 . G2 .
pat drums_pat   = kick . hat . snare . hat hat kick . hat . snare hat hat .`;

const PATS_AB = `pat lead_a = E5 . G5 C6 . G5 E5 . D5 . F5 A5 . G5 . .
pat lead_b = C5 . E5 G5 . E5 C5 . A4 . C5 E5 . D5 C5 .

pat harmony_a = C4:4 E4:4 G4:4 E4:4
pat harmony_b = A3:4 C4:4 F4:4 G4:4

pat bass_a = C3 . . C3 G2 . . G2 A2 . . A2 F2 . G2 .
pat bass_b = C3 . E3 . G2 . . G2 A2 . C3 . F2 . G2 .

pat drums_a = kick . hat . snare . hat hat kick . hat . snare hat hat .
pat drums_b = kick . hat hat snare . hat . kick kick hat . snare . snare .`;

const PATS_EFFECTS = `pat lead_a = E5 . G5 C6 . G5 E5 . D5 . F5 A5 . G5 . .
pat lead_b = C5 . E5 G5 . E5 C5 . A4 . C5 E5 . D5 C5 .
pat lead_c = G5 . A5 C6<wobble>:2 A5 G5 E5 . F5 G5 A5 G5 E5 D5 C5

pat harmony_a = C4<spark>:4 E4:4 G4<spark>:4 E4:4
pat harmony_b = A3<spark>:4 C4:4 F4<spark>:4 G4:4

pat bass_a = C3 . . C3 G2 . . G2 A2 . . A2 F2 . G2 .
pat bass_b = C3 . E3<slide> . G2 . . G2 A2 . C3 . F2 . G2 .

pat drums_a = kick . hat . snare . hat hat kick . hat . snare hat hat .
pat drums_b = kick . hat hat snare . hat . kick kick hat . snare . snare .`;

/** Pulse 1 alone — lead. */
export const pulse1Bax = `${META}

# @show
inst lead type=pulse1 duty=50 env=gb:13,down,1 gm=81

pat lead_pat = E5 . G5 C6 . G5 E5 . D5 . F5 A5 . G5 . .
# @end

channel 1 => inst lead seq lead_pat

play`;

/** Lead + pulse2 harmony / counter. */
export const pulse2Bax = `${META}

inst lead type=pulse1 duty=50 env=gb:13,down,1 gm=81

# @show
inst harmony type=pulse2 duty=25 env=gb:10,down,2 gm=80

pat harmony_pat = C4:4 E4:4 G4:4 E4:4
# @end

pat lead_pat = E5 . G5 C6 . G5 E5 . D5 . F5 A5 . G5 . .

channel 1 => inst lead seq lead_pat
channel 2 => inst harmony seq harmony_pat

play`;

/** Sweep demo — flat/constant envelope so the pitch slide stays audible. */
export const sweepBax = `${META}

# @show
inst riser type=pulse1 duty=50 sweep=7,up,3 env=gb:15,down,0

pat rise = C3:16
# @end

channel 1 => inst riser pat rise

play`;

/** Lead + harmony + wave bass. */
export const waveBax = `${META}

inst lead type=pulse1 duty=50 env=gb:13,down,1 gm=81
inst harmony type=pulse2 duty=25 env=gb:10,down,2 gm=80

# @show
inst bass type=wave volume=100 wave=[0,2,4,6,8,10,12,14,15,14,12,10,8,6,4,2] gm=33

pat bass_pat = C3 . . C3 G2 . . G2 A2 . . A2 F2 . G2 .
# @end

pat lead_pat = E5 . G5 C6 . G5 E5 . D5 . F5 A5 . G5 . .
pat harmony_pat = C4:4 E4:4 G4:4 E4:4

channel 1 => inst lead seq lead_pat
channel 2 => inst harmony seq harmony_pat
channel 3 => inst bass seq bass_pat

play`;

/** Noise snare alone — explicit notes (named tokens come later). */
export const noiseBax = `${META}

# @show
inst snare type=noise gb:width=7 env=gb:13,down,1 length=16 uge_note=C-7 pitch_env=[0,7,0] vol_env=[13,10,6,2]

pat hits = C6 . C6 . C6 C6 . .
# @end

channel 4 => inst snare seq hits

play`;

/** Kick with macros — held notes so pitch_env / vol_env are audible. */
export const kickProgramBax = `${META}

# @show
inst kick_plain type=noise gb:width=7 uge_note=C-6 length=16
inst kick       type=noise gb:width=7 uge_note=C-6 length=16 pitch_env=[0,-2,-4,-6] vol_env=[15,12,8,4]

# Several plain hits, then the same notes with macros (pitch drop + volume decay)
pat kicks = inst(kick_plain) C5:4 . C5:4 . C5:4 . C5:4 . inst(kick) C5:4 . C5:4 . C5:4 . C5:4 .
# @end

channel 4 => inst kick_plain seq kicks

play`;

/** Full drum kit on noise channel. */
export const percussionBax = `${META}

# @show
inst kick  type=noise gb:width=7 uge_note=C-6 length=16 pitch_env=[0,-2,-4,-6] vol_env=[15,12,8,4]
inst snare type=noise gb:width=7 env=gb:13,down,1 length=16 uge_note=C-7 note=C6 pitch_env=[0,7,0] vol_env=[13,10,6,2]
inst hat   type=noise gb:width=15 env=gb:5,down,1 uge_note=C-8 note=C6

pat drums = kick . hat . snare . hat hat kick . hat . snare hat hat .
# @end

channel 4 => inst snare seq drums

play`;

/** Stage 2 — all instruments with one-bar patterns. */
export const instrumentsTogetherBax = `${META}

${INSTRUMENTS}

${PATS_SIMPLE}

channel 1 => inst lead    seq lead_pat
channel 2 => inst harmony seq harmony_pat
channel 3 => inst bass    seq bass_pat
channel 4 => inst snare   seq drums_pat

play`;

/** Stage 3 — A/B phrases and named sequences. */
export const sequencingBax = `${META}

${INSTRUMENTS}

${PATS_AB}

seq lead_seq    = lead_a lead_b lead_a lead_b
seq harmony_seq = harmony_a harmony_b harmony_a harmony_b
seq bass_seq    = bass_a bass_b bass_a bass_b
seq drums_seq   = drums_a drums_b drums_a drums_b

channel 1 => inst lead    seq lead_seq
channel 2 => inst harmony seq harmony_seq
channel 3 => inst bass    seq bass_seq
channel 4 => inst snare   seq drums_seq

play`;

/** Stage 4 — length-preserving sequence modifiers. */
export const modifiersBax = `${META}

${INSTRUMENTS}

${PATS_AB}

# @show
seq lead_seq    = lead_a lead_b:rot(2) lead_a lead_b:oct(+1)
seq harmony_seq = harmony_a harmony_b:rev harmony_a harmony_b
seq bass_seq    = bass_a:oct(-1) bass_b bass_a:oct(-1) bass_b
seq drums_seq   = drums_a drums_b drums_a drums_b:rev
# @end

channel 1 => inst lead    seq lead_seq
channel 2 => inst harmony seq harmony_seq
channel 3 => inst bass    seq bass_seq
channel 4 => inst snare   seq drums_seq

play`;

/** Stage 5 — effects on the finished arrangement. */
export const effectsBax = `${META}

${INSTRUMENTS}

# @show
effect wobble = vib:6,4
effect spark  = arp:4,7
effect slide  = port:16

${PATS_EFFECTS}

seq lead_seq    = lead_a lead_b lead_a lead_c
seq harmony_seq = harmony_a harmony_b harmony_a harmony_b
seq bass_seq    = bass_a bass_b bass_a bass_b
seq drums_seq   = drums_a drums_b drums_a drums_b
# @end

channel 1 => inst lead    seq lead_seq
channel 2 => inst harmony seq harmony_seq
channel 3 => inst bass    seq bass_seq
channel 4 => inst snare   seq drums_seq

play`;
