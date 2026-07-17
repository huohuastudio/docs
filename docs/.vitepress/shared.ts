import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { PRODUCTS } from './products'

export const shared = withMermaid(
  defineConfig({
    mermaid: {},
    mermaidPlugin: {
      class: 'mermaid',
    },

    lastUpdated: true,
    cleanUrls: true,
    metaChunk: true,
    ignoreDeadLinks: true,

    transformPageData(pageData) {
      const product = PRODUCTS.find(p => pageData.relativePath.startsWith(p.key + '/'))
      if (product) {
        pageData.titleTemplate = `:title - ${product.name}`
      }
    },

    vite: {
      optimizeDeps: {
        include: ['mermaid'],
      },
      ssr: {
        noExternal: ['mermaid'],
      },
    },

    head: [
      ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ],

    themeConfig: {
      // logo 和 siteTitle 由 Layout.vue 中的 nav-bar-title-before slot 动态渲染
      siteTitle: '',

      search: {
        provider: 'local',
        options: {
          locales: {
            root: {
              translations: {
                button: {
                  buttonText: '搜索文档',
                  buttonAriaLabel: '搜索文档',
                },
                modal: {
                  noResultsText: '无法找到相关结果',
                  resetButtonTitle: '清除查询条件',
                  footer: {
                    selectText: '选择',
                    navigateText: '切换',
                    closeText: '关闭',
                  },
                },
              },
            },
          },
        },
      },

      socialLinks: [],
    },
  }),
)
