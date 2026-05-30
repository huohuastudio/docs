import type { SidebarsConfig } from '@docusaurus/plugin-content-docs'

const sidebars: SidebarsConfig = {
  guide: [
    {
      type: 'category',
      label: '简介',
      collapsed: false,
      items: [
        'guide/introduce',
        'guide/getting-started',
        'guide/requirement',
        'guide/declaration',
      ],
    },
    {
      type: 'category',
      label: '入门',
      collapsed: false,
      items: [
        'guide/install',
        'guide/upgrade',
        'guide/migrate',
        'guide/faq',
        'guide/import',
      ],
    },
    {
      type: 'category',
      label: '核心功能',
      collapsed: false,
      items: [
        'guide/storage',
        'guide/group',
        'guide/payment',
        'guide/process',
        'guide/handle',
        'guide/ai',
      ],
    },
    {
      type: 'category',
      label: '进阶',
      collapsed: false,
      items: [
        'advanced/theme',
        'advanced/separate-deploy',
        'advanced/cache',
        'advanced/storage',
        'advanced/openapi',
        'advanced/command',
      ],
    },
  ],
}

export default sidebars
