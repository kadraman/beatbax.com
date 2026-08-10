import type * as PrismNamespace from 'prismjs';

/**
 * Prism grammar for BeatBax (.bax), modeled on the Desktop Monaco Monarch
 * tokenizer in packages/app-core/src/editor/beatbax-language.ts.
 *
 * Prefer RegExp constructors when a literal would confuse the TypeScript parser
 * (e.g. character classes with `{`, `}`, `[`, `]`, or `=>`).
 */
export default function registerBaxLanguage(
  Prism: typeof PrismNamespace,
): void {
  const punctuation = new RegExp('[{}(),.|\\[\\]]');
  const operator = new RegExp('=>|[:=*+\\-]');

  const effectBuiltins =
    /\b(?:vib|port|arp|volSlide|trem|pan|echo|retrig|sweep|cut|bend|pitch_env)\b/;
  const instrumentTypes =
    /\b(?:pulse1|pulse2|wave|noise|tone|tone1|tone2|tone3|square|triangle|dmc|saw|ay|sn76489)\b/;
  const chipTypes =
    /\b(?:gameboy|gb|dmg|nes|famicom|sms|gg|gamegear|spectrum-128|cpc|amstrad-cpc)\b/;
  const waveforms =
    /\b(?:sine|sin|tri|triangle|square|sqr|saw|sawtooth|ramp|noise|random|pulse|none|sawUp|sawDown|stepped|gated|gatedSlow)\b/;
  const scaleModes =
    /\b(?:major|minor|dorian|phrygian|lydian|mixolydian|locrian|pentatonic_major|pentatonic_minor|blues|chromatic|warn|error|off|ntsc|pal)\b/;

  Prism.languages.bax = {
    comment: {
      pattern: /#.*/,
      greedy: true,
    },
    string: {
      pattern: /"""[\s\S]*?"""|"(?:\\.|[^\\"\r\n])*"/,
      greedy: true,
    },

    // `effect wobble` / `pat lead_a` — keyword + definition name
    definition: {
      pattern:
        /\b(?:inst|subpat|pat|seq|effect)\s+[A-Za-z_][\w]*/,
      inside: {
        keyword: /^(?:inst|subpat|pat|seq|effect)\b/,
        variable: /[A-Za-z_][\w]*/,
      },
    },

    // Inline effects: <wobble>, <arp:4,7>, <vib:6,4>
    effect: {
      pattern: /<[^>\n]+>/,
      greedy: true,
      inside: {
        punctuation: /[<>]/,
        function: [effectBuiltins, /[A-Za-z_][\w-]*/],
        builtin: waveforms,
        number: /-?\d+(?:\.\d+)?/,
        operator: /[=:,]/,
      },
    },

    // Chip-prefixed properties: `gb:width=7` (must beat sequence modifiers)
    'ns-property': {
      pattern: /\b(?:gb|nes|sms|gg|cpc):[A-Za-z_][\w]*\b/,
      inside: {
        builtin: /^(?:gb|nes|sms|gg|cpc)\b/,
        operator: /:/,
        property: {
          pattern: /[A-Za-z_][\w]*/,
          alias: 'attr-name',
        },
      },
    },

    // Sequence modifiers: `:oct(-1)`, `:wobble` — not `gb:width=`
    'function': {
      pattern: /:[A-Za-z_][\w]*(?!\s*=)/,
      greedy: true,
    },

    // Song metadata (`song artist "…"`) and `key=` properties.
    // Avoid RegExp lookbehind ((?<=...)) — unsupported in older Safari (browserslist).
    property: [
      {
        pattern: /\bsong\s+(?:name|artist|author|description|tags)\b/,
        inside: {
          keyword: /^song\b/,
          'attr-name': /(?:name|artist|author|description|tags)\b/,
        },
      },
      {
        pattern: /\b[A-Za-z_][\w:-]*(?=\s*=)/,
        alias: 'attr-name',
      },
    ],

    keyword:
      /\b(?:song|chip|bpm|volume|stepsPerBar|time|ticksPerStep|scale|inst|subpat|pat|seq|effect|channel|import|from|lock|auto|repeat)\b/,

    'control-keyword': {
      pattern: /\b(?:play|export)\b/,
      alias: 'important',
    },

    builtin: [
      instrumentTypes,
      chipTypes,
      waveforms,
      scaleModes,
      /\b(?:json|midi|uge|wav|famitracker|famitracker-text|vgm|arkos)\b/,
      /\b(?:local|github|https?|file)\b(?=:)/,
    ],

    // Built-in effect names outside <> (e.g. `vib:6,4`)
    'effect-name': {
      pattern: effectBuiltins,
      alias: 'function',
    },

    // Notes: C4, G#5, Eb3
    note: {
      pattern: /\b[A-Ga-g](?:#|b)?[0-8]\b/,
      alias: 'constant',
    },

    // Pitch classes without octave (scale roots)
    'pitch-class': {
      pattern: /\b[A-Ga-g](?:#|b)?\b(?!\w)/,
      alias: 'constant',
    },

    number: /-?\b\d+(?:\.\d+)?\b/,

    // Rests (`.`) and sustains (`_`) — avoid Prism lookbehind (broken in prism-react-renderer)
    rest: {
      pattern: /\.|\b_\b/,
    },

    'function-call': {
      pattern: /\b[A-Za-z_][\w]*(?=\()/,
      alias: 'function',
    },

    identifier: {
      pattern: /\b[A-Za-z_][\w]*\b/,
      alias: 'symbol',
    },

    operator,
    punctuation,
  };
}
