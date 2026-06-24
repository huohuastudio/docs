# 内容管理（CMS） {#cms}

Novaix 内置了完整的 CMS 内容管理模块，为第三方主题提供动态数据支持。所有内容通过管理后台「内容管理」入口统一管理，每个模块都提供公开 API 供主题渲染，无需认证即可访问。

## 模块总览 {#overview}

| 模块 | 说明 | 公开 API |
|------|------|----------|
| 公告管理 | 系统公告与通知 | `GET /api/v1/public/cms/articles?type=announcement` |
| 文章管理 | 新闻、资讯、活动等，支持分类 | `GET /api/v1/public/cms/articles` |
| 单页面 | 关于我们、服务条款等静态页面 | `GET /api/v1/public/cms/pages/:slug` |
| 帮助中心 | 帮助文档分类与文章 | `GET /api/v1/public/cms/help/categories` |
| 常见问题 | FAQ，支持按组分类 | `GET /api/v1/public/cms/faqs` |
| 导航菜单 | 网站导航，无限层级 | `GET /api/v1/public/cms/nav-menus?location=header` |
| 轮播图 | 首页及各位置横幅 | `GET /api/v1/public/cms/banners?location=home` |
| 合作伙伴 | Logo 与信息展示 | `GET /api/v1/public/cms/partners` |
| 客户评价 | 用户推荐与评价 | `GET /api/v1/public/cms/testimonials` |
| 数据中心 | 机房信息与测试 IP | `GET /api/v1/public/cms/data-centers` |
| 友情链接 | 外部链接，支持分组 | `GET /api/v1/public/cms/links` |
| 更新日志 | 产品版本更新记录 | `GET /api/v1/public/cms/changelogs` |
| 团队成员 | 团队成员展示 | `GET /api/v1/public/cms/team-members` |
| 品牌素材 | Logo、素材文件下载 | `GET /api/v1/public/cms/brand-assets` |

## 使用方式 {#usage}

在管理后台侧边栏点击「内容管理」，进入 CMS 首页。首页按分组展示所有模块入口，点击任一模块即可进入对应的列表和表单管理。

## 文章管理 {#articles}

文章管理支持三种文章类型：

| 类型 | 说明 |
|------|------|
| `news` | 新闻资讯 |
| `announcement` | 系统公告（原公告模块已合并至此） |
| `activity` | 活动信息 |

每篇文章包含标题、别名（slug）、摘要、正文（富文本）、封面图、状态、排序权重、发布时间等字段。文章可关联分类，分类通过文章列表工具栏的「分类管理」按钮在弹窗中管理。

公开 API 支持按 `type`、`category_id`、`keyword` 筛选，按 slug 获取单篇文章详情。

## 单页面 {#pages}

用于创建关于我们、服务条款、隐私政策等静态页面。每个页面有唯一的 slug，主题通过 slug 获取页面内容渲染。

## 帮助中心 {#help}

帮助中心由「帮助分类」和「帮助文章」组成。帮助文章列表工具栏提供「分类管理」按钮，在弹窗中管理分类。每个分类可设置图标，帮助文章关联到分类下。公开 API 返回分类时包含文章数量统计。

## 常见问题 {#faq}

FAQ 支持按 `group_name` 分组（如「售前」「售后」「技术」），主题可按组筛选展示。每条 FAQ 包含问题和回答（富文本）。

## 导航菜单 {#nav-menus}

导航菜单支持无限层级的树形结构，通过 `parent_id` 构建父子关系。每个菜单项指定 `location`（如 `header`、`footer`、`sidebar`），公开 API 按 location 返回树形 JSON 结构。

创建子菜单时，父菜单必须与子菜单在同一 location 下。

## 轮播图 {#banners}

轮播图按 `location` 分组（如 `home_hero`、`sidebar`），支持设置展示时间范围（`start_at`、`end_at`）。公开 API 自动过滤未到时间或已过期的轮播图。

## 数据中心 {#data-centers}

数据中心信息包含名称、城市、国家、描述、测试 IP 和特性标签（JSON 数组）。主题可在选购页或独立页面展示机房信息。

## 图片上传 {#upload}

CMS 提供通用文件上传接口 `POST /api/v1/admin/upload`，支持 JPG、PNG、GIF、WebP、ICO、PDF 格式，文件存储在 `data/uploads/YYYY/MM/` 目录下，通过 `/uploads/` 路径提供访问。

## 默认主题内置页面 {#default-theme}

默认主题已内置所有 CMS 模块的公共展示页面，管理员在后台添加内容后即可在前台展示：

| 页面 | URL | 说明 |
|------|-----|------|
| 文章列表 | `/articles` | 支持按类型、分类筛选 |
| 文章详情 | `/articles/:slug` | 文章正文 |
| 帮助中心 | `/help` | 分类网格 + 搜索 |
| 帮助文章 | `/help/:slug` | 帮助文章正文 + 相关文章 |
| 常见问题 | `/faq` | 按分组展示，手风琴交互 |
| 更新日志 | `/changelog` | 时间线布局 |
| 数据中心 | `/data-centers` | 卡片网格，含测试 IP |
| 团队成员 | `/team` | 头像卡片网格 |
| 品牌素材 | `/brand-assets` | 预览 + 下载 |
| CMS 单页面 | `/pages/:slug` | 如关于我们、SLA 等 |

首页（`/`）还集成了以下 CMS 内容（有数据时自动展示）：

- **轮播图**：`location` 为 `homepage` 的轮播图
- **客户评价**：星级评分卡片
- **数据中心**：前 6 个数据中心预览
- **常见问题**：来自 CMS FAQ 模块

所有公共页面共享 PublicLayout 布局，header 和 footer 的导航链接来自 CMS 导航菜单模块（`location` 为 `header` 或 `footer`），友情链接和合作伙伴 Logo 也在 footer 中展示。

## 主题开发指南 {#theme-dev}

主题开发者可通过公开 API 获取所有 CMS 数据，无需认证。所有列表接口只返回 `status=1`（已启用）的记录，按 `sort_order` 排序。

```bash
# 获取导航菜单（树形结构）
curl https://your-domain.com/api/v1/public/cms/nav-menus?location=header

# 获取文章列表（分页）
curl https://your-domain.com/api/v1/public/cms/articles?type=news&page=1&page_size=10

# 获取单篇文章
curl https://your-domain.com/api/v1/public/cms/articles/my-article-slug

# 获取帮助分类（含文章数）
curl https://your-domain.com/api/v1/public/cms/help/categories
```

完整的 API 文档可在开发模式下访问 `/docs`（Scalar UI）查看。
