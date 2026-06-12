# 常见问题

## 首次启动后管理员密码在哪里？ {#initial-password}

首次启动时，如果未在 `config.yaml` 中设置 `admin.initial_password`，系统会自动生成一个 16 位随机密码并输出到终端。如果使用 Supervisor 或 systemd，可以在日志中查找：

```bash
# Supervisor（密码输出到 stderr，Supervisor 默认会将其重定向到日志）
grep "密码" /var/log/novaix/app.log

# systemd
journalctl -u novaix | grep "密码"
```

::: warning
自动生成的密码只会在首次启动时输出一次。如果您没有及时记录，将无法再次查看。建议在部署时通过 `config.yaml` 的 `admin.initial_password` 指定初始密码（仅首次启动生效）。
:::

## 忘记了管理员密码怎么办？ {#forgot-password}

如果您配置了[邮件服务](./mail)或[短信服务](./sms)，可以通过登录页面的「忘记密码」功能重置密码。支持邮箱验证码和手机短信验证码两种方式。如果两种方式都未配置，目前暂时没有其他方式重置密码，请务必妥善保管管理员密码。

## 环境变量和配置文件的关系？ {#env-vs-config}

所有配置项都可以通过 `NOVAIX_` 前缀的环境变量覆盖。例如 `server.port` 对应 `NOVAIX_SERVER_PORT`，`jwt.secret` 对应 `NOVAIX_JWT_SECRET`。环境变量的优先级高于配置文件。

## 可以同时使用 SQLite 和 MySQL 吗？ {#sqlite-and-mysql}

不可以，同一时间只能使用一种数据库。如果需要从 SQLite 切换到 MySQL，需要手动迁移数据。

## 节点连接失败怎么排查？ {#node-connection-failed}

1. 确认节点服务器的运行环境已正常启动
2. 确认管理端口（默认 8443）已开放，没有被防火墙拦截
3. 确认客户端证书和密钥正确
4. 如果跳过了节点 TLS 证书验证（`insecure_skip_verify`），确认节点的 TLS 证书有效

## WebSocket 连接失败（终端/控制台无法打开）？ {#websocket-failed}

通常是反向代理配置问题。请确保您的 Nginx 或 Caddy 配置正确转发了 WebSocket 连接。参考[安装](./install#nginx)章节中的 Nginx 配置示例，确保包含了 `Upgrade` 和 `Connection` 头的转发。

## 支付回调没有生效？ {#payment-callback}

1. 确认回调地址（如 `https://您的域名/api/callbacks/alipay`）可以从公网访问
2. 确认使用的是 HTTPS
3. 检查支付渠道的密钥配置是否正确
4. 查看 Novaix 日志中是否有相关错误信息

## 镜像上传中断了怎么办？ {#image-upload-interrupted}

镜像上传基于 TUS 协议实现了断点续传，刷新页面后重新选择同一文件上传即可自动从中断处继续，无需重新开始。

## 如何修改监听端口？ {#change-port}

修改 `config.yaml` 中的 `server.port`，或通过环境变量 `NOVAIX_SERVER_PORT` 设置。修改后需要重启服务。同时记得同步修改反向代理中的 `proxy_pass` 地址。

## TOTP 双因素认证丢失了怎么办？ {#totp-lost}

如果您丢失了 TOTP 设备（手机损坏、应用被删除等），目前暂时没有自助恢复方式。请在绑定 TOTP 时妥善保管恢复码或将密钥备份在安全的地方。

## 用户购买后实例一直显示「创建中」？ {#instance-stuck-creating}

1. 检查「任务管理」中对应的创建任务状态和日志
2. 如果任务失败，查看日志中的错误信息。常见原因包括：
   - 节点连接中断或服务端口不可达
   - 镜像未分发到目标节点
   - 节点磁盘空间不足
   - IP 池没有空闲 IP
3. 如果任务长时间处于「运行中」无进展，可能是节点负载过高或网络中断

## 实例到期后会被直接删除吗？ {#instance-expiry}

实例到期后系统会自动停止实例，不会立即删除。具体的到期处理策略取决于您在系统设置中的配置。建议设置合理的宽限期，给用户足够的时间续费。

## 更换了服务器怎么迁移？ {#server-migration}

1. 在旧服务器上停止 Novaix 服务
2. 将整个工作目录（默认 `/opt/novaix`）复制到新服务器
3. 将二进制文件 `/usr/local/bin/novaix` 复制到新服务器
4. 在新服务器上启动服务
5. 更新反向代理配置和 DNS 解析

如果使用 SQLite，数据库文件在工作目录下，一起复制即可。如果使用 MySQL，还需要单独迁移数据库。

::: warning
迁移后请确保 `config.yaml` 中的 `server.external_url` 和 `server.allowed_origins` 与新的域名一致。如果域名不变则无需修改。
:::

## debug 模式和 release 模式有什么区别？ {#debug-vs-release}

| 特性 | debug | release |
|------|-------|---------|
| 错误详情 | 在 API 响应中返回详细错误堆栈 | 只返回通用错误信息 |
| API 文档 | 可访问 `/docs` 查看 | 不可访问 |
| 日志级别 | 输出更详细的调试日志 | 仅输出 info 及以上级别 |
| 演示模式 | 可启用 | 不可启用 |

生产环境**必须**使用 `release` 模式。`debug` 模式仅用于开发和测试，在生产环境中使用会暴露敏感的错误信息和接口文档，存在安全风险。

## VPC 创建失败提示 OVN 未启用？ {#vpc-ovn-not-enabled}

VPC 依赖 OVN 网络。请确认：
1. 节点组创建时已勾选「启用 OVN」
2. OVN 上行网络接口名称填写正确（如 `eth0`）
3. 节点服务器上已安装并配置好 OVN 组件
4. 节点组内至少有一个在线节点

## 按小时计费的实例停止后还会扣费吗？ {#hourly-billing-stopped}

不会。按小时计费只在实例处于「运行中」状态时产生费用。停止、冻结状态的实例不会被扣费。实例恢复运行后继续扣费。

## rDNS 记录一直显示同步失败？ {#rdns-sync-failed}

1. 确认 PowerDNS API 地址和密钥配置正确
2. 确认 Novaix 服务器能访问 PowerDNS API 端口
3. 确认 PowerDNS 中已创建对应的反向解析区域
4. 查看记录列表中的具体错误信息

## 数据库文件越来越大怎么办？ {#database-growing}

如果使用 SQLite，数据库文件会随着监控数据、操作日志等的累积而增大。您可以：

1. 调低 `collector.retention`（监控数据保留时间），减少历史监控数据
2. 定期在管理面板中清理过期的操作日志
3. 使用 SQLite 的 `VACUUM` 命令回收空间：
   ```bash
   # 停止 Novaix 后执行
   sqlite3 /opt/novaix/novaix.db "VACUUM;"
   ```

## 如何启用高可用（HA）多实例部署？ {#ha-setup}

从 v0.2.3 起，Novaix 支持多实例部署。需要满足以下条件：

1. 使用 MySQL 数据库（SQLite 不支持 HA）
2. 在 `config.yaml` 中设置 `ha.enabled: true`
3. 所有实例使用相同的 MySQL、`jwt.secret`、`security.encryption_key`
4. 共享 `storage.image_dir`（通过 NFS 或对象存储挂载）
5. 前端使用负载均衡器（如 Nginx upstream）分发请求

启用后，计费、指标采集、任务运行等后台任务会通过分布式锁保证同一时刻只在一个实例上执行。

## 从 SQLite 迁移到 MySQL 的步骤？ {#sqlite-to-mysql}

1. 停止 Novaix 服务
2. 创建 MySQL 数据库（推荐 `utf8mb4` 字符集）
3. 修改 `config.yaml` 中 `database.driver` 为 `mysql`，填写 DSN
4. 启动 Novaix，系统会自动在 MySQL 中执行迁移创建表结构
5. 使用第三方工具（如 `sqlite3-to-mysql`）将 SQLite 数据导入 MySQL

::: warning
迁移前务必备份 SQLite 数据库文件。迁移后请验证数据完整性。
:::

## 插件安装后没有生效？ {#plugin-not-working}

1. 确认插件已在「插件管理」中启用（开关为开启状态）
2. 确认插件配置已正确填写（如 API 密钥、回调地址等）
3. 查看「关于」页面确认 Novaix 版本是否满足插件的最低版本要求
4. 查看终端/日志中是否有插件加载错误信息
5. 尝试禁用后重新启用插件

## 代理（Agent）系统如何运作？ {#agent-system}

代理系统允许您发展分销商，代理商可以推广您的服务并获得返佣：

- **首单佣金**：用户通过代理链接注册后首次付款，代理获得一次性佣金
- **续费佣金**：该用户后续每次续费，代理持续获得佣金
- 佣金比例通过「代理组」配置，不同组可设置不同费率
- 代理可在用户面板的「代理中心」查看推广链接、下线用户和佣金明细

## 如何配置自定义域名访问？ {#custom-domain}

1. 将域名 DNS 解析到服务器 IP
2. 配置 Nginx/Caddy 反向代理（参考[安装](./install#nginx)章节）
3. 申请并配置 SSL 证书（推荐使用 Let's Encrypt）
4. 修改 `config.yaml` 中 `server.external_url` 为您的域名
5. 修改 `server.allowed_origins` 为您的域名
6. 重启 Novaix

## 支持哪些操作系统镜像？ {#supported-images}

Novaix 支持所有 Incus 兼容的 Linux 镜像，包括但不限于：

- Ubuntu、Debian、CentOS、Rocky Linux、AlmaLinux
- Alpine、Arch Linux、Fedora、openSUSE
- Windows（需要 QEMU 虚拟机类型）

镜像可以从远程镜像源（如 images.linuxcontainers.org）拉取，也可以通过 URL 下载或手动上传。

## 如何限制用户可购买的实例数量？ {#instance-limit}

目前可以通过以下方式间接控制：

1. 限制 IP 池中的可用 IP 数量
2. 限制节点组的资源配额
3. 通过套餐的库存设置控制可售数量

## 实例快照占用多少存储空间？ {#snapshot-storage}

快照使用写时复制（CoW）机制，仅记录自快照创建以来变化的数据块，初始几乎不占用额外空间。随着实例数据变化，快照占用空间会逐渐增大。建议定期清理不再需要的历史快照。
