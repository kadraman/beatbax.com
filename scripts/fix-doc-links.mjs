/**
 * Fix internal toolchain links in migrated docs for the site.
 */
import fs from 'node:fs';
import path from 'node:path';

const docsRoot = path.resolve('docs');
const gh = 'https://github.com/kadraman/beatbax/blob/main';

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.md')) files.push(full);
  }
  return files;
}

const replacements = [
  [/\]\(\.\.\/TUTORIAL\.md\)/g, '](/docs/tutorial/overview)'],
  [/\]\(docs\/exports\/wav-export-guide\.md\)/g, '](/docs/exports/wav)'],
  [/\]\(wav-export-guide\.md\)/g, '](/docs/exports/wav)'],
  [/\]\(uge-export-guide\.md\)/g, '](/docs/exports/uge)'],
  [/\]\(instrument-note-mapping-guide\.md\)/g, '](/docs/language/instrument-note-mapping)'],
  [/\]\(\.\.\/desktop\/README\.md\)/g, '](/docs/tools/desktop)'],
  [/\]\(\/docs\/releasing\.md\)/g, `](${gh}/docs/releasing.md)`],
  [/\]\(\/docs\/features\/[^)]+\)/g, (m) => {
    const rel = m.slice(2, -1).replace(/^\/docs\//, '');
    return `](${gh}/${rel})`;
  }],
  [/\]\(\.\.\/\.\.\/docs\/features\/[^)]+\)/g, (m) => {
    const rel = m.match(/docs\/[^)]+/)[0];
    return `](${gh}/${rel})`;
  }],
  [/\]\(\.\.\/\.\.\/packages\/[^)]+\)/g, (m) => {
    const rel = m.match(/packages\/[^)]+/)[0];
    return `](${gh}/${rel})`;
  }],
  [/\]\(\.\.\/formats\/[^)]+\)/g, (m) => {
    const rel = m.match(/formats\/[^)]+/)[0];
    return `](${gh}/docs/${rel})`;
  }],
  [/\]\(\.\.\/DEVNOTES[^)]*\)/g, `](${gh}/DEVNOTES.md)`],
  [/\]\(\.\.\/songs\/[^)]+\)/g, (m) => {
    const rel = m.match(/songs\/[^)]+/)[0];
    return `](${gh}/${rel})`;
  }],
  [/\]\(\.\.\/packages\/[^)]+\)/g, (m) => {
    const rel = m.match(/packages\/[^)]+/)[0];
    return `](${gh}/${rel})`;
  }],
  [/\]\(scheduler\.md\)/g, `](${gh}/docs/api/scheduler.md)`],
  [/\]\(features\/[^)]+\)/g, (m) => {
    const rel = m.slice(2, -1);
    return `](${gh}/docs/features/complete/${path.basename(rel)})`;
  }],
  [/\]\(\/docs\/qa\/[^)]+\)/g, (m) => {
    const rel = m.slice(2, -1).replace(/^\/docs\//, 'docs/');
    return `](${gh}/${rel})`;
  }],
];

for (const file of walk(docsRoot)) {
  let content = fs.readFileSync(file, 'utf8');
  let next = content;
  for (const [pattern, repl] of replacements) {
    next = next.replace(pattern, repl);
  }
  if (next !== content) {
    fs.writeFileSync(file, next, 'utf8');
    console.log('fixed', path.relative(docsRoot, file));
  }
}

console.log('Link fixes complete.');
