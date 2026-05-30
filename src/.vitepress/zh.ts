import { DefaultTheme, defineConfig } from 'vitepress'

export const zh = defineConfig({
  lang: 'zh-Hans',
  title: 'Spark Studio',
  description: '产品文档中心',
  themeConfig: {
    nav: nav(),

    sidebar: {
      '/novaix/': { base: '/novaix/', items: sidebarNovaix() },
      '/lsky/guide/': { base: '/lsky/', items: sidebarLskyGuide() },
      '/lsky/advanced/': { base: '/lsky/', items: sidebarLskyAdvanced() },
      '/lsky/archive/': { base: '/lsky/', items: sidebarLskyArchive() },
    },

    footer: {
      copyright: `All rights reserved © 2018-${new Date().getFullYear()} <a href="https://huohuastudio.com">Spark Studio</a>`
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      level: 'deep',
      label: '页面导航'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  }
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: 'Novaix',
      link: '/novaix/guide/introduce',
      activeMatch: '/novaix/'
    },
    {
      text: 'Lsky Pro+',
      items: [
        {
          text: '指南',
          link: '/lsky/guide/introduce',
          activeMatch: '/lsky/guide/'
        },
        {
          text: '进阶',
          link: '/lsky/advanced/theme',
          activeMatch: '/lsky/advanced/'
        },
        {
          text: '旧版本',
          items: [
            {
              text: 'Lsky Pro 开源版',
              items: [
                { text: 'V 1.x', link: '/lsky/archive/free/v1/' },
                { text: 'V 2.x', link: '/lsky/archive/free/v2/' },
              ]
            },
            {
              text: 'Lsky Pro 付费版',
              items: [
                { text: 'V 1.x', link: '/lsky/archive/enterprise/v1/' },
              ]
            },
          ]
        },
      ]
    },
    {
      text: '接口文档',
      link: 'https://lsky-pro.apifox.cn',
    },
  ]
}

// Novaix 侧边栏
function sidebarNovaix(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '简介',
      collapsed: false,
      items: [
        { text: '介绍', link: 'guide/introduce' },
        { text: '快速开始', link: 'guide/getting-started' },
        { text: '环境要求', link: 'guide/requirement' },
      ]
    },
    {
      text: '部署',
      collapsed: false,
      items: [
        { text: '安装', link: 'guide/install' },
        { text: '升级', link: 'guide/upgrade' },
        { text: '备份与恢复', link: 'guide/backup' },
      ]
    },
    {
      text: '基础设施',
      collapsed: false,
      items: [
        { text: '节点管理', link: 'guide/node' },
        { text: '镜像管理', link: 'guide/image' },
        { text: 'IP 池管理', link: 'guide/ip-pool' },
        { text: '套餐管理', link: 'guide/plan' },
      ]
    },
    {
      text: '业务运营',
      collapsed: false,
      items: [
        { text: '实例管理', link: 'guide/instance' },
        { text: '用户管理', link: 'guide/user' },
        { text: '订单与计费', link: 'guide/order' },
        { text: '支付配置', link: 'guide/payment' },
        { text: '优惠券', link: 'guide/coupon' },
        { text: '代理系统', link: 'guide/agent' },
      ]
    },
    {
      text: '系统功能',
      collapsed: false,
      items: [
        { text: '工单系统', link: 'guide/ticket' },
        { text: '公告管理', link: 'guide/announcement' },
        { text: '监控与告警', link: 'guide/monitoring' },
        { text: '邮件配置', link: 'guide/mail' },
        { text: '系统设置', link: 'guide/setting' },
        { text: '常见问题', link: 'guide/faq' },
      ]
    },
    {
      text: '参考',
      collapsed: false,
      items: [
        { text: '配置参考', link: 'guide/config' },
      ]
    },
  ]
}

// Lsky Pro+ 指南侧边栏
function sidebarLskyGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '简介',
      collapsed: false,
      items: [
        { text: '介绍', link: 'guide/introduce' },
        { text: '快速开始', link: 'guide/getting-started' },
        { text: '环境要求', link: 'guide/requirement' },
        { text: '免责声明', link: 'guide/declaration' },
      ]
    },
    {
      text: '入门',
      collapsed: false,
      items: [
        { text: '安装', link: 'guide/install' },
        { text: '升级', link: 'guide/upgrade' },
        { text: '迁移', link: 'guide/migrate' },
        { text: '常见问题', link: 'guide/faq' },
        { text: '从旧版本导入', link: 'guide/import' },
      ]
    },
    {
      text: '核心功能',
      collapsed: false,
      items: [
        { text: '储存', link: 'guide/storage' },
        { text: '角色组', link: 'guide/group' },
        { text: '支付', link: 'guide/payment' },
        { text: '云处理', link: 'guide/process' },
        { text: '图片处理', link: 'guide/handle' },
        { text: 'AI', link: 'guide/ai' },
      ]
    },
  ]
}

// Lsky Pro+ 进阶侧边栏
function sidebarLskyAdvanced(): DefaultTheme.SidebarItem[] {
  return [
    { text: '主题', link: 'advanced/theme' },
    { text: '分离部署', link: 'advanced/separate-deploy' },
    { text: '缓存', link: 'advanced/cache' },
    { text: '自定义储存', link: 'advanced/storage' },
    { text: '接口文档', link: 'advanced/openapi' },
    { text: '常用命令', link: 'advanced/command' },
  ]
}

// Lsky Pro+ 旧版本归档侧边栏
function sidebarLskyArchive(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '开源版 V1.x 手册',
      link: 'archive/free/v1/',
      collapsed: true,
      items: [
        { text: '安装', link: 'archive/free/v1/Install' },
        { text: '环境变量', link: 'archive/free/v1/env' },
        {
          text: '存储策略',
          link: 'archive/free/v1/StorageStrategy',
          collapsed: true,
          items: [
            { text: '本地', link: 'archive/free/v1/SS/Local' },
            { text: '阿里云OSS', link: 'archive/free/v1/SS/AliyunOSS' },
            { text: '腾讯云COS', link: 'archive/free/v1/SS/TencentCloudCOS' },
            { text: '又拍云USS', link: 'archive/free/v1/SS/UpyunUSS' },
            { text: '七牛云KODO', link: 'archive/free/v1/SS/KODO' },
            { text: 'FTP', link: 'archive/free/v1/FTP' },
          ]
        },
        {
          text: '系统参数配置',
          link: 'archive/free/v1/SystemParameters',
          collapsed: true,
          items: [
            { text: '基础配置', link: 'archive/free/v1/SP/BasicConf' },
            { text: '上传配置', link: 'archive/free/v1/SP/UploadConf' },
            { text: '用户配置', link: 'archive/free/v1/SP/UserConf' },
            { text: '邮件配置', link: 'archive/free/v1/SP/MailConf' },
            { text: '其他配置', link: 'archive/free/v1/SP/OtherConf' },
            { text: '图片鉴黄', link: 'archive/free/v1/SP/ImgSex' },
          ]
        },
        { text: '水印功能', link: 'archive/free/v1/Watermark' },
        { text: '系统升级', link: 'archive/free/v1/SystemUpdate' },
        { text: '常见问题', link: 'archive/free/v1/CommonQ' },
        { text: '更新日志', link: 'archive/free/v1/UpdateLog' },
      ]
    },
    {
      text: '开源版 V2.x 手册',
      link: 'archive/free/v2/',
      collapsed: true,
      items: [
        { text: '概述', link: 'archive/free/v2' },
        {
          text: '快速入门',
          collapsed: true,
          items: [
            { text: '安装', link: 'archive/free/v2/quick-start/installation' },
            { text: '升级', link: 'archive/free/v2/quick-start/upgrade' },
            { text: '迁移', link: 'archive/free/v2/quick-start/migration' },
            { text: '常见问题', link: 'archive/free/v2/quick-start/questions' },
          ],
        },
        {
          text: '角色组',
          collapsed: true,
          items: [
            { text: '基础设置', link: 'archive/free/v2/group/basic' },
            { text: '图片审核', link: 'archive/free/v2/group/picture-review' },
            { text: '原图保护', link: 'archive/free/v2/group/original-protection' },
            { text: '水印配置', link: 'archive/free/v2/group/watermark' },
          ],
        },
        {
          text: '储存策略',
          collapsed: true,
          items: [
            { text: '简介', link: 'archive/free/v2/storage/intro' },
            { text: '储存的特殊说明', link: 'archive/free/v2/storage/faq' },
          ],
        },
        {
          text: '进阶教程',
          collapsed: true,
          items: [
            { text: '缓存', link: 'archive/free/v2/advanced/cache' },
            { text: 'Laravel Octane', link: 'archive/free/v2/advanced/octane' },
          ],
        },
      ]
    },
    {
      text: '付费版 V1.x 手册',
      link: 'archive/enterprise/v1/',
      collapsed: true,
      items: [
        {
          text: '快速入门',
          collapsed: true,
          items: [
            { text: '安装', link: 'archive/enterprise/v1/quick-start/installation' },
            { text: '升级', link: 'archive/enterprise/v1/quick-start/upgrade' },
            { text: '迁移', link: 'archive/enterprise/v1/quick-start/migration' },
            { text: '常见问题', link: 'archive/enterprise/v1/quick-start/questions' },
            { text: '基础功能', link: 'archive/enterprise/v1/quick-start/basic' },
          ],
        },
        {
          text: '基础功能',
          collapsed: true,
          items: [
            { text: '页面管理', link: 'archive/enterprise/v1/features/basic/page' },
            { text: '套餐管理', link: 'archive/enterprise/v1/features/basic/plan' },
            { text: '优惠券管理', link: 'archive/enterprise/v1/features/basic/coupon' },
            {
              text: '支付功能',
              collapsed: true,
              items: [
                { text: '支付宝', link: 'archive/enterprise/v1/features/basic/payment/alipay' },
                { text: '微信', link: 'archive/enterprise/v1/features/basic/payment/wechat' },
                { text: 'PayPal', link: 'archive/enterprise/v1/features/basic/payment/paypal' },
              ]
            },
          ],
        },
        {
          text: '核心功能',
          collapsed: true,
          items: [
            { text: '角色组', link: 'archive/enterprise/v1/features/core/group' },
            { text: '储存策略', link: 'archive/enterprise/v1/features/core/strategy' },
          ],
        },
        {
          text: '其他',
          collapsed: true,
          items: [
            { text: 'Imagick 拓展', link: 'archive/enterprise/v1/others/imagick' },
            { text: '优化加载速度', link: 'archive/enterprise/v1/others/optimization' },
            { text: '常用辅助命令', link: 'archive/enterprise/v1/others/commands' },
            { text: '从开源版本升级', link: 'archive/enterprise/v1/others/free-upgrade' },
          ],
        },
      ]
    },
  ]
}

export const search: DefaultTheme.LocalSearchOptions['locales'] = {
  root: {
    translations: {
      button: {
        buttonText: '搜索文档',
        buttonAriaLabel: '搜索文档'
      },
      modal: {
        noResultsText: '无法找到相关结果',
        resetButtonTitle: '清除查询条件',
        footer: {
          selectText: '选择',
          navigateText: '切换'
        }
      }
    }
  }
}
