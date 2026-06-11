# 社会化登录

Novaix 支持通过第三方社交账号登录和注册，免去用户记忆密码的麻烦。管理员可以在「系统设置」→「社会化登录」中配置各提供商的参数，启用后登录和注册页面会自动显示对应的登录按钮。

## 支持的提供商 {#providers}

| 提供商 | 说明 |
|--------|------|
| GitHub | 适合面向开发者用户的场景 |
| Google | 国际市场最常用的登录方式 |
| 微信 | 国内用户常用的扫码登录 |
| OpenID Connect | 通用 OIDC 协议，可对接 Keycloak、Authentik、Azure AD 等自建身份系统 |
| 彩虹聚合登录 | 第三方聚合登录平台，支持 QQ、微信、支付宝、哔哩哔哩等多种登录方式 |

::: tip
前四个是系统内置的提供商，在「系统设置」→「社会化登录」中直接配置。彩虹聚合登录是官方内置插件，安装后同样出现在社会化登录设置中。
:::

## GitHub {#github}

| 字段 | 说明 |
|------|------|
| Client ID | GitHub OAuth App 的客户端 ID |
| Client Secret | 对应的密钥 |

在 [GitHub Developer Settings](https://github.com/settings/developers) 中创建 OAuth App，Authorization callback URL 填写 `https://您的域名/api/v1/oauth/github/callback`。

## Google {#google}

| 字段 | 说明 |
|------|------|
| Client ID | Google OAuth 2.0 客户端 ID |
| Client Secret | 对应的密钥 |

在 [Google Cloud Console](https://console.cloud.google.com/apis/credentials) 中创建 OAuth 2.0 客户端 ID，授权重定向 URI 填写 `https://您的域名/api/v1/oauth/google/callback`。

## 微信 {#wechat}

| 字段 | 说明 |
|------|------|
| AppID | 微信开放平台网站应用的 AppID |
| AppSecret | 对应的密钥 |

在[微信开放平台](https://open.weixin.qq.com/)创建网站应用并通过审核，授权回调域填写您的站点域名（不含协议和路径）。

## OpenID Connect {#oidc}

| 字段 | 说明 |
|------|------|
| Issuer URL | OIDC 提供商的 Issuer URL，如 `https://accounts.google.com` |
| Client ID | 客户端 ID |
| Client Secret | 客户端密钥 |
| 按钮显示名称 | 登录页按钮上的文案，默认「SSO 登录」 |
| 额外 Scopes | 以空格分隔的 scope 列表，默认 `openid email profile` |

OIDC 提供商需支持标准的 `/.well-known/openid-configuration` 发现文档。回调地址为 `https://您的域名/api/v1/oauth/oidc/callback`。

## 彩虹聚合登录 {#clogin}

彩虹聚合登录是第三方聚合登录平台，作为官方内置插件提供。只需一组 AppID 和 AppKey，即可接入 QQ、微信、支付宝、微博、哔哩哔哩、抖音等多种登录方式，无需逐个申请各平台的开发者账号。

| 字段 | 说明 |
|------|------|
| API 地址 | 彩虹聚合登录平台地址，默认 `https://u.cccyun.cc`，自建站填写自己的域名 |
| AppID | 应用 ID |
| AppKey | 应用密钥 |
| 登录方式 | 支持多选（QQ、微信、支付宝、微博、百度、华为、小米、抖音、哔哩哔哩、钉钉），选择多种时登录页分别显示按钮 |

在 [彩虹聚合登录](https://u.cccyun.cc/) 注册并创建应用后获取 AppID 和 AppKey。

::: tip
配置多种登录方式后，登录页会为每种方式显示独立的按钮（如"QQ"、"微信"），而非一个笼统的"彩虹聚合登录"按钮。如果只配置了一种方式，则直接以该方式的名称展示。
:::

## 账号关联策略 {#linking}

用户通过社交账号登录时，系统按以下策略处理：

- **已关联账号**：社交账号已与系统用户绑定，直接登录
- **邮箱匹配已有用户**：社交提供商返回的已验证邮箱匹配到现有用户，需输入密码确认后关联
- **全新用户**：跳转注册页补填信息，完成注册的同时自动关联社交账号
- **注册已关闭**：提示用户先用账号密码登录，再到个人设置中关联社交账号

::: tip
系统不会仅凭邮箱相同就自动关联账号。首次匹配到已有用户时必须输入密码确认，防止账号被冒领。
:::

## 用户端管理 {#user-management}

用户可以在「个人中心」→「安全设置」中管理已关联的社交账号：

- **关联新账号**：点击「关联」按钮，跳转到第三方平台授权后完成绑定
- **解除关联**：点击「解绑」移除关联。系统会确保用户至少保留一种登录方式（邮箱或手机号），防止解绑后无法登录

## 与 TOTP 两步验证的关系 {#totp}

如果用户启用了 TOTP 两步验证，通过社交账号登录时仍需输入验证码。社交登录不会绕过两步验证。
