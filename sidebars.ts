import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/installation',
        'getting-started/quick-start',
      ],
    },
    {
      type: 'category',
      label: 'Tutorial',
      collapsed: false,
      items: [
        'tutorial/overview',
        'tutorial/song-header',
        'tutorial/notes',
        'tutorial/instruments',
        'tutorial/sequencing',
        'tutorial/modifiers',
        'tutorial/effects',
        'tutorial/final-song',
      ],
    },
    {
      type: 'category',
      label: 'Tools',
      items: [
        'tools/cli',
        'tools/web-client',
        {
          type: 'category',
          label: 'BeatBax Desktop',
          link: {
            type: 'doc',
            id: 'tools/desktop',
          },
          items: [
            'tools/settings',
            'tools/copilot',
            'tools/verify-downloads',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Sound Chip Plugins',
      items: [
        'chips/overview',
        'chips/gameboy',
        'chips/nes',
        'chips/sms',
        'chips/spectrum-128',
      ],
    },
    {
      type: 'category',
      label: 'Export Plugins',
      items: [
        'exports/wav',
        'exports/uge',
        'exports/uge-transpose',
        'exports/vgm',
        'exports/arkos',
        'exports/famitracker-text',
      ],
    },
    {
      type: 'category',
      label: 'Language Reference',
      link: {
        type: 'doc',
        id: 'language/overview',
      },
      items: [
        'language/overview',
        'language/metadata-directives',
        'language/notes',
        'language/patterns',
        'language/sequences',
        'language/channels',
        {
          type: 'category',
          label: 'Instruments',
          link: {
            type: 'doc',
            id: 'language/instruments',
          },
          items: [
            'language/instrument-macros',
            'language/instrument-note-mapping',
            'language/imports',
          ],
        },
        'language/modifiers',
        'language/effects',
        'language/export',
        'language/appendix',
      ],
    },
    {
      type: 'category',
      label: 'Development',
      items: [
        'development/overview',
        'development/engine',
        'development/plugins',
        'development/cli',
        'development/web-app',
        'development/desktop-app',
      ],
    },
    'troubleshooting',
  ],
};

export default sidebars;
