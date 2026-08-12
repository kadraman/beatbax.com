/**
 * Rule / keyword → language-reference doc path (under /docs/).
 * Keep links maintainable: one map drives the railroad hub.
 * Prefer `hash` so pills land on the defining section, not the page top.
 */
export type DocTarget = {
  /** Sidebar / route id, e.g. language/notes */
  docId: string;
  /** Short label shown in the railroad box */
  label: string;
  /** Heading id on the target page (without `#`) */
  hash?: string;
};

/** Top-level statement keywords and related nonterminals. */
export const STATEMENT_LINKS: DocTarget[] = [
  {label: 'chip', docId: 'language/metadata-directives', hash: 'chip'},
  {label: 'bpm', docId: 'language/metadata-directives', hash: 'bpm'},
  {label: 'volume', docId: 'language/metadata-directives', hash: 'master-volume'},
  {label: 'stepsPerBar', docId: 'language/metadata-directives', hash: 'steps-per-bar'},
  {label: 'scale', docId: 'language/metadata-directives', hash: 'scale-and-channel-locks'},
  {label: 'song', docId: 'language/metadata-directives', hash: 'song-metadata'},
  {label: 'play', docId: 'language/metadata-directives', hash: 'playback'},
  {label: 'import', docId: 'language/imports', hash: 'syntax'},
  {label: 'inst', docId: 'language/instruments', hash: 'syntax'},
  {label: 'subpat', docId: 'language/instrument-macros', hash: 'subpat'},
  {label: 'effect', docId: 'language/effects', hash: 'effect'},
  {label: 'pat', docId: 'language/patterns', hash: 'pattern-rhs'},
  {label: 'seq', docId: 'language/sequences', hash: 'sequence-rhs'},
  {label: 'channel', docId: 'language/channels', hash: 'pat-seq'},
  {label: 'export', docId: 'language/export'},
];

export const PATTERN_RHS_LINKS: DocTarget[] = [
  {label: 'notes', docId: 'language/notes', hash: 'notetoken'},
  {label: 'rests', docId: 'language/notes', hash: 'resttoken'},
  {label: 'groups', docId: 'language/patterns', hash: 'groups'},
  {label: 'inst(…)', docId: 'language/patterns', hash: 'temp-inst'},
  {label: 'effects', docId: 'language/effects', hash: 'effect'},
  {label: 'modifiers', docId: 'language/modifiers', hash: 'modifier-catalog'},
];

export const SEQUENCE_RHS_LINKS: DocTarget[] = [
  {label: 'pat refs', docId: 'language/sequences', hash: 'pat-refs'},
  {label: '*N', docId: 'language/sequences', hash: 'repeat'},
  {label: 'groups', docId: 'language/sequences', hash: 'groups'},
  {label: ':modifiers', docId: 'language/modifiers', hash: 'modifier-catalog'},
];

export const CHANNEL_RHS_LINKS: DocTarget[] = [
  {label: 'inst', docId: 'language/instruments', hash: 'syntax'},
  {label: 'pat / seq', docId: 'language/channels', hash: 'pat-seq'},
  {label: 'speed=', docId: 'language/channels', hash: 'speed'},
  {label: 'lock=', docId: 'language/metadata-directives', hash: 'scale-and-channel-locks'},
];

export const PATTERN_ATOM_LINKS: DocTarget[] = [
  {label: 'NoteToken', docId: 'language/notes', hash: 'notetoken'},
  {label: 'RestToken', docId: 'language/notes', hash: 'resttoken'},
  {label: 'DurationSuffix', docId: 'language/notes', hash: 'duration'},
  {label: 'EffectSuffix', docId: 'language/effects', hash: 'effect'},
  {label: 'TempInst', docId: 'language/patterns', hash: 'temp-inst'},
];

export function docHref(docId: string, hash?: string): string {
  const base = `/docs/${docId}`;
  return hash ? `${base}#${hash}` : base;
}
