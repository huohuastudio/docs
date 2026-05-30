import { DefaultTheme, defineConfig } from 'vitepress'

export const zh = defineConfig({
  lang: 'zh-Hans',
  title: 'Spark Studio',
  description: '产品文档中心',
  themeConfig: {
    nav: nav(),

    sidebar: {
      '/novaix/': { base: '/novaix/', items: sidebarNovaix() },
      '/lsky-pro/guide/': { base: '/lsky-pro/', items: sidebarLskyGuide() },
      '/lsky-pro/advanced/': { base: '/lsky-pro/', items: sidebarLskyAdvanced() },
      '/lsky-pro/archive/': { base: '/lsky-pro/', items: sidebarLskyArchive() },
    },

    footer: {
      copyright: `All rights reserved © 2018-${new Date().getFullYear()} <a href="https://huohuastudio.com">Spark Studio</a>`,
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    editLink: {
      pattern: 'https://github.com/huohuastudio/docs/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },

    outline: {
      level: 'deep',
      label: '页面导航',
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  },
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: 'Novaix',
      link: '/novaix/introduce',
      activeMatch: '/novaix/',
    },
    {
      text: 'Lsky Pro+',
      activeMatch: '/lsky-pro/',
      items: [
        {
          text: '文档',
          items: [
            { text: '指南', link: '/lsky-pro/guide/introduce' },
            { text: '进阶', link: '/lsky-pro/advanced/theme' },
            { text: '接口文档', link: 'https://lsky-pro.apifox.cn' },
          ],
        },
        {
          text: '旧版本',
          items: [
            { text: '开源版 V1.x', link: '/lsky-pro/archive/free/v1/' },
            { text: '开源版 V2.x', link: '/lsky-pro/archive/free/v2/' },
            { text: '付费版 V1.x', link: '/lsky-pro/archive/enterprise/v1/' },
          ],
        },
      ],
    },
  ]
}

function sidebarNovaix(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '简介',
      collapsed: false,
      items: [
        { text: '介绍', link: 'introduce' },
        { text: '快速开始', link: 'getting-started' },
        { text: '环境要求', link: 'requirement' },
      ],
    },
    {
      text: '部署',
      collapsed: false,
      items: [
        { text: '安装', link: 'install' },
        { text: '升级', link: 'upgrade' },
        { text: '备份与恢复', link: 'backup' },
      ],
    },
    {
      text: '基础设施',
      collapsed: false,
      items: [
        { text: '节点管理', link: 'node' },
        { text: '镜像管理', link: 'image' },
        { text: 'IP 池管理', link: 'ip-pool' },
        { text: '套餐管理', link: 'plan' },
      ],
    },
    {
      text: '业务运营',
      collapsed: false,
      items: [
        { text: '实例管理', link: 'instance' },
        { text: '用户管理', link: 'user' },
        { text: '订单与计费', link: 'order' },
        { text: '支付配置', link: 'payment' },
        { text: '优惠券', link: 'coupon' },
        { text: '代理系统', link: 'agent' },
      ],
    },
    {
      text: '系统功能',
      collapsed: false,
      items: [
        { text: '工单系统', link: 'ticket' },
        { text: '公告管理', link: 'announcement' },
        { text: '监控与告警', link: 'monitoring' },
        { text: '邮件配置', link: 'mail' },
        { text: '系统设置', link: 'setting' },
        { text: '常见问题', link: 'faq' },
      ],
    },
    {
      text: '参考',
      collapsed: false,
      items: [{ text: '配置参考', link: 'config' }],
    },
  ]
}

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
      ],
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
      ],
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
      ],
    },
  ]
}

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

function sidebarLskyArchive(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '开源版 V1.x',
      collapsed: true,
      items: [
        { text: '首页', link: 'archive/free/v1/' },
        { text: '安装', link: 'archive/free/v1/Install' },
        { text: '环境变量', link: 'archive/free/v1/env' },
        {
          text: '存储策略',
          collapsed: true,
          items: [
            { text: '总览', link: 'archive/free/v1/StorageStrategy' },
            { text: '本地', link: 'archive/free/v1/SS/Local' },
            { text: '阿里云 OSS', link: 'archive/free/v1/SS/AliyunOSS' },
            { text: '腾讯云 COS', link: 'archive/free/v1/SS/TencentCloudCOS' },
            { text: '又拍云 USS', link: 'archive/free/v1/SS/UpyunUSS' },
            { text: '七牛云 KODO', link: 'archive/free/v1/SS/KODO' },
            { text: 'FTP', link: 'archive/free/v1/SS/FTP' },
          ],
        },
        {
          text: '系统参数配置',
          collapsed: true,
          items: [
            { text: '总览', link: 'archive/free/v1/SystemParameters' },
            { text: '基础配置', link: 'archive/free/v1/SP/BasicConf' },
            { text: '上传配置', link: 'archive/free/v1/SP/UploadConf' },
            { text: '用户配置', link: 'archive/free/v1/SP/UserConf' },
            { text: '邮件配置', link: 'archive/free/v1/SP/MailConf' },
            { text: '其他配置', link: 'archive/free/v1/SP/OtherConf' },
            { text: '图片鉴黄', link: 'archive/free/v1/SP/ImgSex' },
          ],
        },
        { text: '水印功能', link: 'archive/free/v1/Watermark' },
        { text: '系统升级', link: 'archive/free/v1/SystemUpdate' },
        { text: '常见问题', link: 'archive/free/v1/CommonQ' },
        { text: '更新日志', link: 'archive/free/v1/UpdateLog' },
      ],
    },
    {
      text: '开源版 V2.x',
      collapsed: true,
      items: [
        { text: '首页', link: 'archive/free/v2/' },
        {
          text: '快速开始',
          collapsed: true,
          items: [
            { text: '安装', link: 'archive/free/v2/quick-start/installation' },
            { text: '升级', link: 'archive/free/v2/quick-start/upgrade' },
            { text: '迁移', link: 'archive/free/v2/quick-start/migration' },
            { text: '常见问题', link: 'archive/free/v2/quick-start/questions' },
          ],
        },
        {
          text: '储存',
          collapsed: true,
          items: [
            { text: '介绍', link: 'archive/free/v2/storage/intro' },
            { text: '常见问题', link: 'archive/free/v2/storage/faq' },
          ],
        },
        {
          text: '角色组',
          collapsed: true,
          items: [
            { text: '基础', link: 'archive/free/v2/group/basic' },
            { text: '水印', link: 'archive/free/v2/group/watermark' },
            { text: '原图保护', link: 'archive/free/v2/group/original-protection' },
            { text: '图片审核', link: 'archive/free/v2/group/picture-review' },
          ],
        },
        {
          text: '进阶',
          collapsed: true,
          items: [
            { text: '缓存', link: 'archive/free/v2/advanced/cache' },
            { text: 'Octane', link: 'archive/free/v2/advanced/octane' },
          ],
        },
      ],
    },
    {
      text: '付费版 V1.x',
      collapsed: true,
      items: [
        { text: '首页', link: 'archive/enterprise/v1/' },
        {
          text: '快速开始',
          collapsed: true,
          items: [
            { text: '安装', link: 'archive/enterprise/v1/quick-start/installation' },
            { text: '基础', link: 'archive/enterprise/v1/quick-start/basic' },
            { text: '升级', link: 'archive/enterprise/v1/quick-start/upgrade' },
            { text: '迁移', link: 'archive/enterprise/v1/quick-start/migration' },
            { text: '常见问题', link: 'archive/enterprise/v1/quick-start/questions' },
          ],
        },
        {
          text: '功能',
          collapsed: true,
          items: [
            { text: '角色组', link: 'archive/enterprise/v1/features/core/group' },
            { text: '储存策略', link: 'archive/enterprise/v1/features/core/strategy' },
            { text: '套餐', link: 'archive/enterprise/v1/features/basic/plan' },
            { text: '优惠券', link: 'archive/enterprise/v1/features/basic/coupon' },
            { text: '页面', link: 'archive/enterprise/v1/features/basic/page' },
            {
              text: '支付',
              collapsed: true,
              items: [
                { text: '支付宝', link: 'archive/enterprise/v1/features/basic/payment/alipay' },
                { text: '微信', link: 'archive/enterprise/v1/features/basic/payment/wechat' },
                { text: 'PayPal', link: 'archive/enterprise/v1/features/basic/payment/paypal' },
              ],
            },
          ],
        },
        {
          text: '其他',
          collapsed: true,
          items: [
            { text: '常用命令', link: 'archive/enterprise/v1/others/commands' },
            { text: 'Imagick', link: 'archive/enterprise/v1/others/imagick' },
            { text: '免费升级', link: 'archive/enterprise/v1/others/free-upgrade' },
            { text: '优化', link: 'archive/enterprise/v1/others/optimization' },
          ],
        },
      ],
    },
  ]
}
