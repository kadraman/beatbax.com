export const introExampleSong = `song name "Neon Run"

chip gameboy
bpm 162

inst lead  type=pulse1 duty=25 env=gb:13,down,1 gm=81
inst bass  type=pulse2 duty=50 env=gb:12,down,2 gm=38
inst pad   type=wave volume=100 wave=[0,4,8,11,13,14,15,15,15,14,13,11,8,4,0,0] gm=89
inst kick  type=noise gb:width=7 uge_note=C-6 length=16 pitch_env=[0,-2,-4,-6] vol_env=[15,12,8,4]
inst snare type=noise gb:width=7 env=gb:13,down,1 length=16 uge_note=C-7 note=C6 pitch_env=[0,7,0] vol_env=[13,10,6,2]
inst hat   type=noise gb:width=15 env=gb:5,down,1 uge_note=C-8 note=C6

effect wobble = vib:7,5
effect slide  = port:14

pat lead_am  = A5 . E5 A5 . G5 E5 . A5 . C6 . B5 . A5 .
pat lead_f   = A5 . F5 A5 . C6 A5 . F5 . A5 . G5 . F5 .
pat lead_g   = B5 . G5 B5 . D6 B5 . G5 . B5 . A5 . G5 .
pat lead_am2 = A5 . E5 A5<wobble>:2 G5 E5 . D5 . E5 . C5 . A4 .

pat bass_am  = A2 . A3 A2 . A3 A2 . A2 . A3 A2 . E2 . E3
pat bass_f   = F2 . F3 F2 . F3 F2 . F2 . F3 F2 . C3 . C3
pat bass_g   = G2 . G3 G2 . G3 G2 . G2 . G3 G2 . D3<slide> . D3
pat bass_am2 = A2 . A3 A2 . A3 A2 . E2 . E3 E2 . A2 . A2

pat pad_am  = A3:4 C4:4 E4:4 A4:4
pat pad_f   = F3:4 A3:4 C4:4 F4:4
pat pad_g   = G3:4 B3:4 D4:4 G4:4
pat pad_am2 = A3:4 E4:4 C4:4 A3:4

pat drums_a = kick . hat . snare . hat . kick . hat kick snare . hat .
pat drums_b = kick . hat kick snare . hat . kick . hat . snare . snare hat

seq lead_seq  = lead_am lead_f lead_g lead_am2 lead_am:oct(-1) lead_f:rot(2) lead_g:oct(+1) lead_am2:rev
seq bass_seq  = bass_am bass_f bass_g bass_am2 bass_am:rot(2) bass_f:rot(2) bass_g:rot(2) bass_am2:rev
seq pad_seq   = pad_am pad_f pad_g pad_am2 pad_am:rev pad_f:rev pad_g:rev pad_am2:rev
seq drums_seq = drums_a drums_b drums_a drums_b drums_a:rot(2) drums_b:rev drums_a:rot(4) drums_b:rev:rot(2)

channel 1 => inst lead seq lead_seq
channel 2 => inst bass seq bass_seq
channel 3 => inst pad seq pad_seq
channel 4 => inst snare seq drums_seq

play`;
