import siteConfig from '@generated/docusaurus.config';
import registerBaxLanguage from './prism-bax';

export default function prismIncludeLanguages(
  PrismObject: typeof import('prismjs'),
): void {
  const {
    themeConfig: {prism},
  } = siteConfig;
  const {additionalLanguages} = prism as {additionalLanguages: string[]};

  // Prism components work on the Prism instance on the window, while prism-
  // react-renderer uses its own Prism instance. We temporarily mount the
  // instance onto window, import components to enhance it, then remove it to
  // avoid polluting global namespace.
  const PrismBefore = (globalThis as {Prism?: typeof PrismObject}).Prism;
  (globalThis as {Prism?: typeof PrismObject}).Prism = PrismObject;

  additionalLanguages.forEach((lang) => {
    if (lang === 'php') {
      // eslint-disable-next-line @typescript-eslint/no-require-imports, global-require
      require('prismjs/components/prism-markup-templating.js');
    }
    // eslint-disable-next-line @typescript-eslint/no-require-imports, global-require, import/no-dynamic-require
    require(`prismjs/components/prism-${lang}`);
  });

  registerBaxLanguage(PrismObject);

  // Clean up and eventually restore former globalThis.Prism object (if any)
  delete (globalThis as {Prism?: typeof PrismObject}).Prism;
  if (typeof PrismBefore !== 'undefined') {
    (globalThis as {Prism?: typeof PrismObject}).Prism = PrismBefore;
  }
}
