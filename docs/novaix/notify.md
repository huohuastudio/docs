# 多渠道通知

Novaix 支持将系统告警和事件通知推送到多个渠道。各渠道可独立启用，告警触发时会并发推送到所有已启用的渠道。

## 支持的渠道 {#channels}

| 渠道 | 说明 |
|------|------|
| Telegram | 通过 Telegram Bot 发送通知 |
| 钉钉 | 通过钉钉群机器人 Webhook 发送通知 |
| 企业微信 | 通过企业微信群机器人 Webhook 发送通知 |
| Webhook | 通过自定义 HTTP Webhook 发送通知 |

::: tip
多渠道通知与[邮件服务](./mail)是独立的。邮件用于向用户发送验证码、工单通知、到期提醒等，多渠道通知用于向管理员推送系统告警（如节点离线、资源超阈值等）。两者互不影响，建议同时配置。
:::

## Telegram {#telegram}

| 字段 | 说明 |
|------|------|
| Bot Token | Telegram Bot 的 API Token |
| Chat ID | 接收通知的聊天 ID（个人或群组） |

::: tip
1. 在 Telegram 中搜索 `@BotFather`，发送 `/newbot` 创建机器人，获取 Bot Token
2. 将机器人添加到群组，或直接与机器人对话
3. 访问 `https://api.telegram.org/bot<token>/getUpdates` 获取 Chat ID
:::

## 钉钉 {#dingtalk}

| 字段 | 说明 |
|------|------|
| Webhook URL | 钉钉群机器人的 Webhook 地址 |
| 加签密钥 | 如果启用了加签安全设置，填写密钥 |

在钉钉群中添加自定义机器人，安全设置建议选择「加签」方式，将 Webhook URL 和密钥填入即可。

## 企业微信 {#wechat-work}

| 字段 | 说明 |
|------|------|
| Webhook Key | 企业微信群机器人的 Key（Webhook URL 中 `key=` 后面的部分） |

在企业微信群中添加群机器人，从 Webhook URL 中提取 `key=` 后面的部分填入即可。例如 URL 为 `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=xxx`，只需填写 `xxx`。

## Webhook {#webhook}

| 字段 | 说明 |
|------|------|
| URL | 接收通知的 HTTP(S) 地址 |
| Secret | 签名密钥（可选），用于验证请求来源 |

当告警触发时，系统会向配置的 URL 发送 POST 请求，请求体为 JSON 格式，包含告警类型、节点信息和触发时间等。如果配置了 Secret，请求头中会包含 HMAC-SHA256 签名供您验证。

## 配置方式 {#configuration}

在管理面板的「系统设置」→「通知渠道」中配置各渠道参数。每个渠道都有独立的启用开关，配置后可以点击「测试」按钮发送一条测试通知，确认渠道配置正确。

::: warning
多渠道通知目前仅用于系统告警推送。告警功能需要在「系统设置」→「告警设置」中启用，详见[监控与告警](./monitoring)。
:::
