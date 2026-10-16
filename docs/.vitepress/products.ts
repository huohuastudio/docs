export interface Product {
  key: string
  name: string
  logo: string
  base: string
  home: string
  github?: string
  devBanner?: string
}

export const PRODUCTS: Product[] = [
  {
    key: 'novaix',
    name: 'Novaix',
    logo: '/novaix-logo.png?v=2',
    base: '/novaix/',
    home: '/novaix/introduce',
    github: 'https://github.com/huohuastudio/novaix-releases',
    devBanner: 'Novaix 目前处于公测阶段（v0.5.0 起），核心功能已完成多轮测试，但仍可能存在问题。用于生产环境前请做好数据备份。',
  },
  {
    key: 'lsky-pro',
    name: 'Lsky Pro+',
    logo: '/logo.png',
    base: '/lsky-pro/',
    home: '/lsky-pro/guide/introduce',
  },
]

export const DEFAULT_PRODUCT = {
  name: 'Spark Studio',
  logo: '/logo.svg',
}
