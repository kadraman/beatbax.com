import type {PrismTheme} from 'prism-react-renderer';

/**
 * Prism themes aligned with BeatBax Desktop Monaco themes
 * (`beatbax-dark` / `beatbax-light` in packages/app-core).
 */

const darkTokenStyles: PrismTheme['styles'] = [
  {types: ['comment'], style: {color: '#6A9955'}},
  {types: ['keyword'], style: {color: '#C8A227'}},
  {types: ['control-keyword', 'important'], style: {color: '#C586C0'}},
  {types: ['string'], style: {color: '#CE9178'}},
  {types: ['number'], style: {color: '#CE9178'}},
  {types: ['note', 'constant'], style: {color: '#4EC9B0'}},
  {types: ['rest'], style: {color: '#6A6A6A'}},
  {types: ['function'], style: {color: '#C678DD'}},
  {types: ['variable', 'variable-name'], style: {color: '#DCDCAA'}},
  {types: ['property', 'attr-name', 'attribute'], style: {color: '#9CDCFE'}},
  {types: ['builtin', 'class-name', 'type'], style: {color: '#CE9178'}},
  {types: ['identifier', 'symbol'], style: {color: '#DCDCAA'}},
  {types: ['operator'], style: {color: '#D4D4D4'}},
  {types: ['punctuation', 'delimiter'], style: {color: '#808080'}},
  {types: ['boolean', 'char'], style: {color: '#CE9178'}},
  {types: ['regex', 'url'], style: {color: '#4EC9B0'}},
  {types: ['tag'], style: {color: '#C678DD'}},
];

const lightTokenStyles: PrismTheme['styles'] = [
  {types: ['comment'], style: {color: '#008000'}},
  {types: ['keyword'], style: {color: '#9A7110'}},
  {types: ['control-keyword', 'important'], style: {color: '#AF00DB'}},
  {types: ['string'], style: {color: '#A31515'}},
  {types: ['number'], style: {color: '#098658'}},
  {types: ['note', 'constant'], style: {color: '#007ACC'}},
  {types: ['rest'], style: {color: '#808080'}},
  {types: ['function'], style: {color: '#9333EA'}},
  {types: ['variable', 'variable-name'], style: {color: '#795E26'}},
  {types: ['property', 'attr-name', 'attribute'], style: {color: '#001080'}},
  {types: ['builtin', 'class-name', 'type'], style: {color: '#267F99'}},
  {types: ['identifier', 'symbol'], style: {color: '#001080'}},
  {types: ['operator'], style: {color: '#000000'}},
  {types: ['punctuation', 'delimiter'], style: {color: '#000000'}},
  {types: ['boolean', 'char'], style: {color: '#098658'}},
  {types: ['regex', 'url'], style: {color: '#007ACC'}},
  {types: ['tag'], style: {color: '#9333EA'}},
];

/** Matches Monaco `beatbax-dark` (VS Code Dark+ base). */
export const beatbaxPrismDark: PrismTheme = {
  plain: {
    color: '#D4D4D4',
    backgroundColor: '#1E1E1E',
  },
  styles: darkTokenStyles,
};

/** Matches Monaco `beatbax-light` (VS Code Light+ base). */
export const beatbaxPrismLight: PrismTheme = {
  plain: {
    color: '#000000',
    backgroundColor: '#FFFFFF',
  },
  styles: lightTokenStyles,
};
