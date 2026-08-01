export const introExampleSong = `song name "First Light"

chip gameboy
bpm 148

inst lead  type=pulse1 duty=50 env=gb:14,down,1 gm=81
inst bass  type=pulse2 duty=25 env=gb:12,down,1 gm=34
inst pad   type=wave volume=100 wave=[0,2,4,6,8,10,12,14,15,14,12,10,8,6,4,2] gm=89
inst kick  type=noise gb:width=7 uge_note=C-6 pitch_env=[0,-2,-4,-6] vol_env=[15,12,8,4]
inst snare type=noise gb:width=7 env=gb:12,down,1 uge_note=C-7 note=C6
inst hat   type=noise gb:width=15 env=gb:5,down,1 uge_note=C-8 note=C6

effect wobble = vib:6,4
effect spark  = arp:4,7
effect slide  = port:16

pat lead_a = E5 . G5 C6 . G5 E5 . D5 . F5 A5 . G5 . . .
pat lead_b = C5 . E5 G5 . E5 C5 . A4 . C5 E5 . D5 C5 . .
pat lead_c = G5 . A5 C6<wobble>:2 A5 G5 E5 . F5 G5 A5 G5 E5 D5 C5 .

pat bass_a = C3 . . C3 G2 . . G2 A2 . . A2 F2 . G2 .
pat bass_b = C3 . E3<slide> . G2 . . G2 A2 . C3 . F2 . G2 .
pat bass_c = C3 . . E3 G2 . . B2 A2 . C3 . F2 G2 C3 .

pat pad_a = C4<spark>:4 E4:4 G4<spark>:4 E4:4
pat pad_b = A3<spark>:4 C4:4 F4<spark>:4 G4:4
pat pad_c = C4<spark>:4 G4:4 A3:4 G4:4

pat drums_a = kick . hat . snare . hat hat kick . hat . snare hat hat .
pat drums_b = kick . hat hat snare . hat . kick kick hat . snare . snare .
pat drums_c = kick hat hat . snare hat kick . kick . hat snare snare hat snare .

seq lead_seq  = lead_a lead_b lead_a lead_c
seq bass_seq  = bass_a bass_b bass_a bass_c
seq pad_seq   = pad_a pad_b pad_a pad_c
seq drums_seq = drums_a drums_b drums_a drums_c

channel 1 => inst lead seq lead_seq
channel 2 => inst bass seq bass_seq
channel 3 => inst pad seq pad_seq
channel 4 => inst snare seq drums_seq

play`;
