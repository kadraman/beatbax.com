export const pulse1Bax = `chip gameboy
bpm 120

# @show
inst lead type=pulse1 duty=50 env=gb:12,down,1

pat melody = C5 E5 G5 C6
# @end

channel 1 => inst lead seq melody

play`;

export const pulse2Bax = `chip gameboy
bpm 120

# @show
inst bass type=pulse2 duty=25 env=gb:10,down,1

pat bassline = C3 . G2 . C3 . E2 .
# @end

channel 2 => inst bass seq bassline

play`;

export const sweepBax = `chip gameboy
bpm 100

# @show
inst riser type=pulse1 duty=50 sweep=5,up,2 env=gb:12,down,1

pat rise = C3:8 C4:8
# @end

channel 1 => inst riser pat rise

play`;

export const waveBax = `chip gameboy
bpm 100

# @show
inst pad type=wave wave=[0,2,4,6,8,10,12,14,15,14,12,10,8,6,4,2] volume=100

pat chords = C4:4 E4:4 G4:4
# @end

channel 3 => inst pad seq chords

play`;

export const noiseBax = `chip gameboy
bpm 120

# @show
inst snare type=noise gb:width=7 env=gb:12,down,1 uge_note=C-7 note=C6

pat hits = snare . snare . snare snare . .
# @end

channel 4 => inst snare seq hits

play`;

export const kickProgramBax = `chip gameboy
bpm 120

# @show
inst kick type=noise gb:width=7 uge_note=C-6 pitch_env=[0,-2,-4,-6] vol_env=[15,12,8,4]

pat kicks = kick . kick . kick kick . .
# @end

channel 4 => inst kick pat kicks

play`;

export const percussionBax = `chip gameboy
bpm 140

# @show
inst kick     type=pulse1 duty=12.5 env=15,down note=C2
inst snare    type=noise gb:width=7 env=gb:13,down,1 uge_note=C-7 note=C6
inst hihat_cl type=noise gb:width=15 env=gb:6,down,1 uge_note=C-7 note=C6

pat drums = kick . snare . kick . hihat_cl .
pat kick_pat = kick . . . kick . . .
# @end

channel 1 => inst kick pat kick_pat
channel 4 => inst snare pat drums

play`;

/** Full mix — shown without focus markers so learners see the wiring. */
export const allTogetherBax = `chip gameboy
bpm 128

inst lead  type=pulse1 duty=50 env=gb:12,down,1
inst bass  type=pulse2 duty=25 env=gb:10,down,1
inst pad   type=wave   wave=[0,2,4,6,8,10,12,14,15,14,12,10,8,6,4,2] volume=100
inst snare type=noise  gb:width=7 env=gb:12,down,1 uge_note=C-7 note=C6

pat lead_pat  = C5 E5 G5 C6
pat bass_pat  = C3 . G2 .
pat pad_pat   = C4:4 E4:4
pat drum_pat  = snare . snare .

channel 1 => inst lead  seq lead_pat
channel 2 => inst bass  seq bass_pat
channel 3 => inst pad   seq pad_pat
channel 4 => inst snare seq drum_pat

play`;
