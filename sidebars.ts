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
      items: [
        'tutorial/overview',
        'tutorial/effects',
        'tutorial/nes',
      ],
    },
    {
      type: 'category',
      label: 'Language',
      items: [
        'language/metadata-directives',
        'language/instruments',
        'language/instrument-note-mapping',
        'language/imports',
        'language/volume-directive',
      ],
    },
    {
      type: 'category',
      label: 'Sound Chips',
      items: ['chips/overview'],
    },
    {
      type: 'category',
      label: 'Tools',
      items: [
        'tools/cli',
        'tools/web-client',
        'tools/desktop',
        'tools/settings',
        'tools/copilot',
      ],
    },
    {
      type: 'category',
      label: 'Exports',
      items: [
        'exports/wav',
        'exports/uge',
        'exports/uge-transpose',
      ],
    },
    'troubleshooting',
  ],
};

export default sidebars;
