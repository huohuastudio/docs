# 快速开始 {#getting-started}

Novaix 是一款商业软件，您需要先获取许可证密钥才能使用全部功能。

## 获取许可证 {#license}

您可以在 [Spark Studio 官网](https://huohuastudio.com) 购买 Novaix 许可证。购买后您将获得许可证密钥，需要在 `config.yaml` 中配置后启动程序：

```yaml
server:
  external_url: "https://panel.example.com"  # 必须与授权中心绑定的域名一致

license:
  key: "您的许可证密钥"
  service_api: "https://huohuastudio.com"
```

`server.external_url` 必须填写您在授权中心绑定的域名地址。系统启动时会使用该域名向授权中心验证许可证，域名不匹配将导致验证失败。

::: warning
许可证密钥和 `external_url` 只能通过配置文件设置，无法在管理后台中修改。修改后需要重启程序才能生效。

如需更换域名，请先在 [Spark Studio](https://huohuastudio.com) 授权管理中修改绑定的域名，再更新配置文件中的 `external_url` 并重启。
:::

## 部署流程概览 {#deployment-overview}

部署 Novaix 只需几个简单步骤：

1. 确保服务器满足[环境要求](./requirement)
2. 下载二进制文件并[安装](./install)
3. 编辑配置文件，设置生产环境必要参数
4. 配置反向代理（Nginx 或 Caddy）以启用 HTTPS
5. 访问管理面板，按照「快速开始」引导完成初始配置

整个过程通常只需要几分钟。

## 管理面板初始配置 {#initial-setup}

首次登录管理后台后，仪表盘会显示「快速开始」引导清单，帮助您逐步完成系统配置：

1. **添加并初始化节点** — 添加计算节点的连接信息，执行初始化使节点上线。详见[节点管理](./node)
2. **添加可用镜像** — 添加操作系统镜像并确保文件就绪，然后分发到在线节点。详见[镜像管理](./image)
3. **创建并上架套餐** — 设定资源配置与定价，绑定节点组后上架。详见[套餐管理](./plan)
4. **配置支付渠道** — 启用至少一个支付方式（如支付宝、微信），用户才能完成付款。详见[支付配置](./payment)

每一步完成后引导会自动打勾，全部完成后引导自动隐藏。完成以上步骤后，建议以用户视角走一遍购买流程，确认一切正常。
