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
    devBanner: 'Novaix 目前处于早期开发阶段，功能尚未稳定，可能存在严重的 Bug。请勿用于生产环境。',
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
