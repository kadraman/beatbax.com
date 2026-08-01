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
          label: 'Desktop App',
          link: {
            type: 'doc',
            id: 'tools/desktop',
          },
          items: [
            'tools/settings',
            'tools/copilot',
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
      items: [
        'language/metadata-directives',
        'language/scale',
        'language/instruments',
        'language/instrument-macros',
        'language/instrument-note-mapping',
        'language/modifiers',
        'language/effects',
        'language/imports',
        'language/volume-directive',
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
