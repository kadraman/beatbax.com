/**
 * Maps grammar nonterminals / statement keywords to Language Reference doc paths.
 * Keep in sync with packages/engine/src/parser/peggy/grammar.peggy on kadraman/beatbax@main.
 */

export type GrammarLink = {
  /** Display label in the railroad box */
  label: string;
  /** Absolute docs path */
  href: string;
  /** Optional short hint shown as title attribute */
  title?: string;
};

export const GRAMMAR_LINKS = {
  program: {
    label: 'Program',
    href: '/docs/language/overview',
    title: 'A .bax file is a list of statements',
  },
  statement: {
    label: 'Statement',
    href: '/docs/language/appendix',
    title: 'Top-level statement alternatives',
  },
  chip: {
    label: 'chip',
    href: '/docs/language/metadata-directives#global-playback-directives',
    title: 'ChipStmt',
  },
  bpm: {
    label: 'bpm',
    href: '/docs/language/metadata-directives#global-playback-directives',
    title: 'BpmStmt',
  },
  volume: {
    label: 'volume',
    href: '/docs/language/volume-directive',
    title: 'VolumeStmt',
  },
  stepsPerBar: {
    label: 'stepsPerBar',
    href: '/docs/language/metadata-directives#global-playback-directives',
    title: 'StepsPerBarStmt',
  },
  scale: {
    label: 'scale',
    href: '/docs/language/scale',
    title: 'ScaleStmt',
  },
  song: {
    label: 'song …',
    href: '/docs/language/metadata-directives#song-metadata-directives',
    title: 'SongMetaStmt',
  },
  importStmt: {
    label: 'import',
    href: '/docs/language/imports',
    title: 'ImportStmt',
  },
  inst: {
    label: 'inst',
    href: '/docs/language/instruments',
    title: 'InstStmt',
  },
  effect: {
    label: 'effect',
    href: '/docs/language/effects',
    title: 'EffectStmt',
  },
  subpat: {
    label: 'subpat',
    href: '/docs/language/instrument-macros',
    title: 'SubPatStmt (Game Boy / hUGE)',
  },
  pat: {
    label: 'pat',
    href: '/docs/language/patterns',
    title: 'PatStmt',
  },
  seq: {
    label: 'seq',
    href: '/docs/language/sequences',
    title: 'SeqStmt',
  },
  channel: {
    label: 'channel',
    href: '/docs/language/channels',
    title: 'ChannelStmt',
  },
  play: {
    label: 'play',
    href: '/docs/language/metadata-directives#global-playback-directives',
    title: 'PlayStmt',
  },
  exportStmt: {
    label: 'export',
    href: '/docs/language/export',
    title: 'ExportStmt',
  },
  notes: {
    label: 'note',
    href: '/docs/language/notes',
    title: 'NoteToken — C4, G#5, …',
  },
  rests: {
    label: 'rest / sustain',
    href: '/docs/language/notes#rests-and-sustains',
    title: '.  _  -',
  },
  duration: {
    label: ':N / /N',
    href: '/docs/language/notes#lengths',
    title: 'DurationSuffix',
  },
  patternRhs: {
    label: 'Pattern RHS',
    href: '/docs/language/patterns',
    title: 'PatternRhs',
  },
  patternAtom: {
    label: 'Pattern atom',
    href: '/docs/language/patterns#pattern-tokens',
    title: 'PatternAtom',
  },
  groupRepeat: {
    label: '( … )*N',
    href: '/docs/language/patterns#groups-and-repeats',
    title: 'GroupRepeat',
  },
  tempInst: {
    label: 'inst(name[,N])',
    href: '/docs/language/patterns#instrument-overrides',
    title: 'TempInstToken',
  },
  inlineEffect: {
    label: '<effect>',
    href: '/docs/language/effects',
    title: 'EffectSuffix on notes/tokens',
  },
  seqRhs: {
    label: 'Sequence RHS',
    href: '/docs/language/sequences',
    title: 'SeqRhs',
  },
  seqModifier: {
    label: ':modifier',
    href: '/docs/language/modifiers',
    title: 'SeqModifier',
  },
  channelRhs: {
    label: 'Channel RHS',
    href: '/docs/language/channels',
    title: 'inst / pat / seq / speed= / lock=',
  },
  modifiers: {
    label: 'Modifiers',
    href: '/docs/language/modifiers',
    title: 'Colon-chained transforms',
  },
  appendix: {
    label: 'Appendix',
    href: '/docs/language/appendix',
    title: 'Full statement and lexical index',
  },
} as const satisfies Record<string, GrammarLink>;
