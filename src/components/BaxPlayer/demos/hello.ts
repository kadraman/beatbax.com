export const helloBax = `chip gameboy
bpm 128

inst lead type=pulse1 duty=50 env=gb:12,down,1
inst bass type=pulse2 duty=25 env=gb:10,down,1

pat melody = C4 E4 G4 C5
pat bassline = C3 . G2 .

channel 1 => inst lead pat melody
channel 2 => inst bass pat bassline

play auto repeat`;
