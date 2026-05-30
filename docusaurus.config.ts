import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

const config: Config = {
  title: 'Spark Studio',
  tagline: '产品文档中心',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://docs.huohuastudio.com',
  baseUrl: '/',

  organizationName: 'huohuastudio',
  projectName: 'docs',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  markdown: {
    format: 'detect',
    hooks: {
      onBrokenMarkdownImages: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          id: 'novaix',
          path: 'novaix',
          routeBasePath: 'novaix',
          sidebarPath: './sidebars-novaix.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'lsky',
        path: 'lsky',
        routeBasePath: 'lsky',
        sidebarPath: './sidebars-lsky.ts',
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Spark Studio',
      logo: {
        alt: 'Spark Studio',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'guide',
          docsPluginId: 'novaix',
          position: 'left',
          label: 'Novaix',
        },
        {
          type: 'docSidebar',
          sidebarId: 'guide',
          docsPluginId: 'lsky',
          position: 'left',
          label: 'Lsky Pro+',
        },
      ],
    },
    footer: {
      style: 'light',
      copyright: `All rights reserved © 2018-${new Date().getFullYear()} <a href="https://huohuastudio.com" target="_blank">Spark Studio</a>`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'yaml', 'nginx', 'php'],
    },
  } satisfies Preset.ThemeConfig,
}

export default config
