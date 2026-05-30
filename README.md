# Spark Studio 产品文档中心

[![Deploy](https://github.com/huohuastudio/docs/actions/workflows/deploy.yml/badge.svg)](https://github.com/huohuastudio/docs/actions/workflows/deploy.yml)

[Spark Studio](https://huohuastudio.com) 旗下产品的统一文档站点，基于 [VitePress](https://vitepress.dev) 构建，部署在 GitHub Pages。

🌐 在线访问：<https://docs.huohuastudio.com>

## 包含产品

| 产品 | 入口 | 仓库 |
| --- | --- | --- |
| [Novaix](https://docs.huohuastudio.com/novaix/) | 一站式 IDC 管理系统 | [novaix-releases](https://github.com/huohuastudio/novaix-releases) |
| [Lsky Pro+](https://docs.huohuastudio.com/lsky-pro/) | 云端相册系统 | — |

## 目录结构

```
docs/
├── .vitepress/
│   ├── config.ts       # VitePress 入口配置
│   ├── shared.ts       # 跨语言共享配置（搜索、Mermaid、Vite）
│   ├── zh.ts           # 中文 locale：nav、sidebar、文案
│   ├── products.ts     # 产品元数据（名称、logo、路径前缀）
│   └── theme/          # 自定义主题（动态 logo、主题切换动效、图片放大）
├── novaix/             # Novaix 产品文档
├── lsky-pro/           # Lsky Pro+ 产品文档
├── public/             # 静态资源（图片、CNAME、favicon）
└── index.md            # 站点首页
```

## 本地开发

需要 Node.js ≥ 20。

```bash
pnpm install
pnpm dev       # 开发服务（默认 http://localhost:5173）
pnpm build     # 构建到 docs/.vitepress/dist
pnpm preview   # 预览构建产物
```

## 添加新产品

1. 在 `docs/.vitepress/products.ts` 的 `PRODUCTS` 数组里增加产品元数据
2. 在 `docs/` 下创建产品目录，编写 Markdown 文档
3. 在 `docs/.vitepress/zh.ts` 里：
   - `nav()` 添加顶部入口
   - `sidebar` 按路径添加对应侧栏配置
4. 在 `docs/<product>/index.md` 加一个跳转到首页的重定向页（参考 `lsky-pro/index.md`）

## 添加新语言

`docs/.vitepress/config.ts` 的 `locales` 中新增条目，复制 `zh.ts` 改写翻译，文档放到 `docs/<lang>/` 下。详见 [VitePress i18n 文档](https://vitepress.dev/guide/i18n)。

## 部署

推送到 `main` 分支即自动触发 [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) 部署到 GitHub Pages，绑定域名 `docs.huohuastudio.com`（见 `docs/public/CNAME`）。

## 许可

文档内容 © Spark Studio，保留所有权利。
