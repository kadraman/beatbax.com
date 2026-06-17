/**
 * One-time migration helper: split TUTORIAL.md and copy grammar/exports docs.
 * Run: node scripts/migrate-docs.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import {execSync} from 'node:child_process';

const toolchainRoot = path.resolve('..', 'beatbax-toolchain-temp');
const docsRoot = path.resolve('docs');

function ensureDir(dir) {
  fs.mkdirSync(dir, {recursive: true});
}

function writeDoc(relPath, frontmatter, body) {
  const full = path.join(docsRoot, relPath);
  ensureDir(path.dirname(full));
  const fm = Object.entries(frontmatter)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');
  fs.writeFileSync(full, `---\n${fm}\n---\n\n${body.trim()}\n`, 'utf8');
}

function copyDoc(srcRel, destRel, frontmatter = {}) {
  const src = path.join(toolchainRoot, srcRel);
  if (!fs.existsSync(src)) {
    console.warn('skip missing', srcRel);
    return;
  }
  let body = fs.readFileSync(src, 'utf8');
  body = body
    .replace(/\]\(docs\//g, '](/docs/')
    .replace(/\]\(\.\.\/\.\.\/docs\//g, '](/docs/')
    .replace(/docs\/grammar\//g, '/docs/language/')
    .replace(/docs\/exports\//g, '/docs/exports/')
    .replace(/`docs\/features\/complete\/[^`]+`/g, (m) => m)
    .replace(/See `([^`]+\.md)`/g, 'See the toolchain repo');
  writeDoc(destRel, frontmatter, body);
}

function sliceTutorial(startLine, endLine) {
  const lines = fs
    .readFileSync(path.join(toolchainRoot, 'TUTORIAL.md'), 'utf8')
    .split(/\r?\n/);
  return lines.slice(startLine - 1, endLine).join('\n');
}

function adaptTutorialBody(body) {
  return body
    .replace(/\[app\.beatbax\.com\]\(https:\/\/app\.beatbax\.com\)/g, '[app.beatbax.com](https://app.beatbax.com)')
    .replace(/`docs\/language\/metadata-directives\.md`/g, '[Metadata directives](/docs/language/metadata-directives)')
    .replace(/`docs\/features\/complete\/instrument-imports\.md`/g, '[Instrument imports](https://github.com/kadraman/beatbax/blob/main/docs/features/complete/instrument-imports.md)')
    .replace(/`docs\/features\/complete\/gameboy-instrument-macros-policy\.md`/g, '[Game Boy macros policy](https://github.com/kadraman/beatbax/blob/main/docs/features/complete/gameboy-instrument-macros-policy.md)');
}

ensureDir(docsRoot);

writeDoc(
  'intro.md',
  {sidebar_position: 1, title: 'Introduction'},
  `BeatBax is a live-coding language and creative toolchain for making chiptune music in the style of classic 8/16-bit computers and game consoles.

Instead of using a tracker or DAW, you write songs with a simple but powerful grammar that describes instruments, melodies, basslines, and beats — and BeatBax brings them to life with authentic retro sound.

## Features

- **Simple text-based grammar** — create instruments, melodies, basslines, and beats in \`.bax\` files
- **Authentic retro sound** — Game Boy DMG-01 and NES Ricoh 2A03 emulation with hardware-accurate envelopes, duty cycles, and macros
- **Built-in effects** — vibrato, arpeggio, portamento, pitch bend, sweep, volume slide, tremolo, pan, echo, note cut, and retrigger
- **Reusable instrument libraries** — share instruments across songs via \`.ins\` files; import locally or from GitHub
- **Export formats** — MIDI, WAV, ISM JSON, hUGETracker (UGE) for Game Boy, FamiTracker text for NES
- **Desktop IDE** — Electron + React client with export, BeatBax Copilot, mixer, and pattern grid
- **Web-lite browser client** — try in the browser at [app.beatbax.com](https://app.beatbax.com)
- **CLI** — \`play\`, \`verify\`, \`export\`, \`inspect\`, and \`convert\` for scripted workflows
- **Extensible architecture** — additional chip backends (SMS, Spectrum 128, and more) via plugins

## Example song

\`\`\`bash
song name "An example song"

chip gameboy
bpm 128

import "github:kadraman/beatbax-instruments/main/melodic.ins"

inst lead  type=pulse1 duty=50  env={"level":12,"direction":"down","period":1,"format":"gb"}
inst bass  type=pulse2 duty=25  env={"level":10,"direction":"down","period":1,"format":"gb"}
inst snare type=noise  env={"level":12,"direction":"down","period":1,"format":"gb"}

effect wobble   = vib:8,4
effect arpMajor = arp:4,7

pat melody   = C5<wobble> E4 G4<arpMajor> C5
pat bass_pat = C3 . G2 .
pat drum_pat = snare . snare snare

seq lead_seq  = melody:inst(lead) melody:inst(lead)
seq bass_seq  = bass_pat:inst(bass)*2
seq drums_seq = drum_pat*2

channel 1 => inst lead seq lead_seq
channel 2 => inst bass seq bass_seq
channel 4 => inst snare seq drums_seq

play auto repeat
\`\`\`

## Next steps

- [Quick start](/docs/getting-started/quick-start)
- [Download BeatBax](/download)
- [Try in browser](https://app.beatbax.com)`
);

writeDoc(
  'getting-started/installation.md',
  {sidebar_position: 1, title: 'Installation'},
  `BeatBax is available as a desktop app, browser client, or CLI from the toolchain repository.

## Desktop (recommended)

Download installers from the [Download page](/download) or [GitHub Releases](https://github.com/kadraman/beatbax/releases) (tags \`desktop-v*\`).

Supported platforms:

- **Windows** — setup \`.exe\` or portable \`.exe\`
- **macOS** — \`.dmg\` or arm64 \`.zip\`
- **Linux** — \`.deb\` or \`.AppImage\`

> **Code signing caution**
>
> Installers are not code-signed yet. Windows SmartScreen and macOS Gatekeeper may warn on first install. See \`README.txt\` in the install folder for platform-specific steps.

## Web-lite App

No install required — open [app.beatbax.com](https://app.beatbax.com) in a modern browser.

## CLI / development

Clone the [beatbax toolchain](https://github.com/kadraman/beatbax) and build from source:

\`\`\`powershell
git clone https://github.com/kadraman/beatbax.git
cd beatbax
npm install
npm run build-all
node bin/beatbax --help
\`\`\`

See [CLI](/docs/tools/cli) for command reference.`
);

writeDoc(
  'getting-started/quick-start.md',
  {sidebar_position: 2, title: 'Quick Start'},
  `This guide gets you playing your first \`.bax\` song in minutes.

## Try in the browser

1. Open [app.beatbax.com](https://app.beatbax.com)
2. Choose an example from the toolbar or paste a \`.bax\` song
3. Click **Apply** then **Play**

## Use the desktop app

1. [Download](/download) and install BeatBax Desktop
2. Open \`songs/sample.bax\` from the examples menu
3. Press **Play** in the transport bar

## Use the CLI

From a cloned toolchain repo:

\`\`\`powershell
node bin/beatbax verify songs/sample.bax
node bin/beatbax play songs/sample.bax
node bin/beatbax export wav songs/sample.bax output.wav
\`\`\`

## Learn the language

Continue with the [Tutorial overview](/docs/tutorial/overview) for the full language quick reference.`
);

const tutorialSections = [
  ['tutorial/overview.md', 1, 152, 'Tutorial Overview', 1],
  ['tutorial/effects.md', 174, 666, 'Effects', 2],
  ['tutorial/nes.md', 667, 769, 'NES Chip', 3],
];

for (const [rel, start, end, title, pos] of tutorialSections) {
  writeDoc(
    rel,
    {sidebar_position: pos, title},
    adaptTutorialBody(sliceTutorial(start, end)),
  );
}

const tailSections = [
  ['tools/cli.md', 770, 887, 'CLI', 1],
  ['tools/web-client.md', 888, 937, 'Web Client', 2],
  ['tools/settings.md', 938, 972, 'Settings', 3],
  ['tools/copilot.md', 973, 1040, 'BeatBax Copilot', 4],
  ['troubleshooting.md', 1041, 1107, 'Troubleshooting', 99],
];

for (const [rel, start, end, title, pos] of tailSections) {
  writeDoc(
    rel,
    {sidebar_position: pos, title},
    adaptTutorialBody(sliceTutorial(start, end)),
  );
}

const grammarFiles = [
  ['docs/grammar/metadata-directives.md', 'language/metadata-directives.md', 'Metadata Directives', 1],
  ['docs/grammar/instruments.md', 'language/instruments.md', 'Instruments', 2],
  ['docs/grammar/instrument-note-mapping-guide.md', 'language/instrument-note-mapping.md', 'Instrument Note Mapping', 3],
  ['docs/grammar/import-security.md', 'language/imports.md', 'Instrument Imports', 4],
  ['docs/grammar/volume-directive.md', 'language/volume-directive.md', 'Volume Directive', 5],
];

for (const [src, dest, title, pos] of grammarFiles) {
  copyDoc(src, dest, {sidebar_position: pos, title});
}

const exportFiles = [
  ['docs/exports/wav-export-guide.md', 'exports/wav.md', 'WAV Export', 1],
  ['docs/exports/uge-export-guide.md', 'exports/uge.md', 'UGE Export', 2],
  ['docs/exports/uge-transpose.md', 'exports/uge-transpose.md', 'UGE Transpose', 3],
];

for (const [src, dest, title, pos] of exportFiles) {
  copyDoc(src, dest, {sidebar_position: pos, title});
}

copyDoc('apps/desktop/README.md', 'tools/desktop.md', {
  sidebar_position: 5,
  title: 'Desktop App',
});

// Web client already created from tutorial; append desktop README web section notes
const webExtra = fs.readFileSync(path.join(toolchainRoot, 'apps/web-ui/README.md'), 'utf8');
const webBody = webExtra.replace(/^# .+\n\n>.*\n\n\*\*Private workspace package\.\*\*[^\n]*\n\n/, '');
writeDoc('tools/web-client.md', {sidebar_position: 2, title: 'Web Client'}, adaptTutorialBody(sliceTutorial(888, 937)) + '\n\n---\n\n' + webBody);

// CLI from README
const readme = fs.readFileSync(path.join(toolchainRoot, 'README.md'), 'utf8');
const cliMatch = readme.match(/## CLI[\s\S]*?(?=\n## Desktop)/);
if (cliMatch) {
  writeDoc('tools/cli.md', {sidebar_position: 1, title: 'CLI'}, cliMatch[0].replace('## CLI', '# CLI'));
}

writeDoc(
  'chips/overview.md',
  {sidebar_position: 1, title: 'Sound Chips'},
  `BeatBax supports multiple sound chip backends.

## Built-in chips

- **Game Boy (DMG-01)** — 4 channels: pulse1, pulse2, wave, noise
- **NES (Ricoh 2A03)** — 5 channels: pulse, triangle, noise, DMC

Use \`chip gameboy\` or \`chip nes\` at the top of your \`.bax\` song.

## Plugin chips

Additional backends can be loaded as plugins, including Sega Master System / Game Gear and ZX Spectrum 128. See the [toolchain roadmap](https://github.com/kadraman/beatbax/blob/main/ROADMAP.md) for the full list.

- [NES chip guide](/docs/tutorial/nes)
- [Game Boy instrument note mapping](/docs/language/instrument-note-mapping)`
);

// category metadata
const categories = {
  'getting-started': 'Getting Started',
  tutorial: 'Tutorial',
  language: 'Language',
  chips: 'Sound Chips',
  tools: 'Tools',
  exports: 'Exports',
};

for (const [dir, label] of Object.entries(categories)) {
  ensureDir(path.join(docsRoot, dir));
  fs.writeFileSync(
    path.join(docsRoot, dir, '_category_.json'),
    JSON.stringify({label, position: Object.keys(categories).indexOf(dir) + 2}, null, 2),
  );
}

console.log('Docs migration complete.');
execSync('node scripts/fix-doc-links.mjs', {stdio: 'inherit'});
