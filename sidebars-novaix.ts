import type { SidebarsConfig } from '@docusaurus/plugin-content-docs'

const sidebars: SidebarsConfig = {
  guide: [
    {
      type: 'category',
      label: '简介',
      collapsed: false,
      items: [
        'introduce',
        'getting-started',
        'requirement',
      ],
    },
    {
      type: 'category',
      label: '部署',
      collapsed: false,
      items: [
        'install',
        'upgrade',
        'backup',
      ],
    },
    {
      type: 'category',
      label: '基础设施',
      collapsed: false,
      items: [
        'node',
        'image',
        'ip-pool',
        'plan',
      ],
    },
    {
      type: 'category',
      label: '业务运营',
      collapsed: false,
      items: [
        'instance',
        'user',
        'order',
        'payment',
        'coupon',
        'agent',
      ],
    },
    {
      type: 'category',
      label: '系统功能',
      collapsed: false,
      items: [
        'ticket',
        'announcement',
        'monitoring',
        'mail',
        'setting',
        'faq',
      ],
    },
    {
      type: 'category',
      label: '参考',
      collapsed: false,
      items: [
        'config',
      ],
    },
  ],
}

export default sidebars
