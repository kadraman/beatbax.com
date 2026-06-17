import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'BeatBax',
  tagline:
    'Live-coding language and toolchain for retro console chiptunes.',
  favicon: 'img/icon-small.png',

  future: {
    v4: true,
    faster: {
      // Rspack currently panics in dev on Windows for this site; use Webpack instead.
      rspackBundler: false,
      rspackPersistentCache: false,
    },
  },

  url: 'https://beatbax.com',
  baseUrl: '/',

  organizationName: 'kadraman',
  projectName: 'beatbax.com',

  onBrokenLinks: 'throw',

  markdown: {
    format: 'md',
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/kadraman/beatbax.com/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    function beatbaxEngineWebpack() {
      return {
        name: 'beatbax-engine-webpack',
        configureWebpack(_config, isServer) {
          if (isServer) {
            return {};
          }
          return {
            resolve: {
              conditionNames: ['browser', 'import', 'module', 'default'],
              fallback: {
                fs: false,
                path: false,
                crypto: false,
                stream: false,
              },
            },
          };
        },
      };
    },
  ],

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        docsRouteBasePath: 'docs',
      },
    ],
  ],

  themeConfig: {
    image: 'img/logo-text-and-icon.png',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'BeatBax',
      logo: {
        alt: 'BeatBax',
        src: 'img/icon-small.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/download',
          label: 'Download',
          position: 'right',
          className: 'navbar-download-button',
        },
        {
          href: 'https://app.beatbax.com',
          label: 'Try in Browser',
          position: 'right',
        },
        {
          href: 'https://github.com/kadraman/beatbax',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Learn',
          items: [
            {label: 'Introduction', to: '/docs/intro'},
            {label: 'Getting Started', to: '/docs/getting-started/quick-start'},
            {label: 'Tutorial', to: '/docs/tutorial/overview'},
            {label: 'CLI', to: '/docs/tools/cli'},
          ],
        },
        {
          title: 'Downloads',
          items: [
            {label: 'Download', to: '/download'},
            {
              label: 'itch.io',
              href: 'https://kadraman.itch.io/beatbax',
            },
            {
              label: 'GitHub Releases',
              href: 'https://github.com/kadraman/beatbax/releases',
            },
            {label: 'Web App', href: 'https://app.beatbax.com'},
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Toolchain on GitHub',
              href: 'https://github.com/kadraman/beatbax',
            },
            {
              label: 'Site on GitHub',
              href: 'https://github.com/kadraman/beatbax.com',
            },
          ],
        },
      ],
      copyright: `BeatBax Copyright © ${new Date().getFullYear()} <a href="https://github.com/kadraman">Kevin A. Lee</a>.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'powershell'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
