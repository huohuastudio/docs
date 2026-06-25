# CLI 管理工具 {#cli}

Novaix 内置了终端管理命令，可以在不启动 Web 服务、不登录后台的情况下直接管理系统。适用于忘记管理员密码、插件异常导致无法登录、需要快速排查等紧急运维场景。

运行 `novaix --help` 查看所有可用命令：

```
Novaix IDC 管理系统 v0.2.6

Usage:
  novaix [command]

Available Commands:
  help                         Help about any command
  serve                        启动 HTTP 服务

 admin
  admin:reset-password         重置管理员密码

 user
  user:reset-password          重置用户密码

 plugin
  plugin:disable               禁用指定插件
  plugin:enable                启用指定插件
  plugin:list                  列出所有插件及启用状态

 theme
  theme:active                 切换激活主题
  theme:list                   列出已安装主题及激活状态
  theme:reset                  重置为默认内置主题

 setting
  setting:get                  查看指定设置项的值
  setting:reset-group          重置指定设置组到默认值
  setting:set                  修改指定设置项

 system
  system:info                  显示系统信息

Flags:
  -c, --config string   配置文件路径 (default "config.yaml")
  -h, --help            help for novaix
```

::: tip
所有管理命令都需要读取配置文件来连接数据库。如果配置文件不在默认的 `config.yaml` 路径，请使用 `-c` 指定：
```bash
novaix -c /opt/novaix/config.yaml system:info
```
:::

## 密码重置 {#password-reset}

### 重置管理员密码 {#admin-reset}

忘记管理员密码时，使用此命令重置：

```bash
# 自动生成随机密码（推荐）
novaix admin:reset-password

# 指定用户名（默认 admin）
novaix admin:reset-password -u my-admin

# 手动指定密码（需要确认）
novaix admin:reset-password -p "new-password"
```

::: warning
自动生成的密码仅在终端显示一次，请务必记录。密码长度要求 6-72 字符。
:::

### 重置普通用户密码 {#user-reset}

```bash
novaix user:reset-password -u username
novaix user:reset-password -u username -p "new-password"
```

## 插件管理 {#plugin}

### 查看插件列表 {#plugin-list}

```bash
novaix plugin:list
```

输出示例：

```
+----------+---------+-------+--------------------------------+
| 插件 ID  | 类型    | 版本  | 状态                           |
+----------+---------+-------+--------------------------------+
| clogin   | oauth   | 1.0.0 | 已禁用                         |
| epay     | payment | 1.0.0 | 已启用                         |
| geetest  | captcha | 1.0.0 | 错误: 缺少必需函数: verify     |
+----------+---------+-------+--------------------------------+
```

CLI 会完整校验插件（包括脚本函数检查），加载异常的插件会直接显示错误原因。

### 启用/禁用插件 {#plugin-toggle}

```bash
novaix plugin:enable epay
novaix plugin:disable geetest
```

启用前会完整校验插件的 manifest、脚本、版本兼容性和 provider 冲突。禁用操作会同步写入渠道级开关（如 `payment_epay_enabled`），确保服务重启后状态一致。

::: tip 紧急场景
如果某个插件（如人机验证插件）导致后台无法登录，可以直接在终端禁用：
```bash
novaix plugin:disable geetest
# 重启服务后登录后台修复配置
```
即使插件文件已损坏或被删除，`plugin:disable` 仍然可以成功写入禁用状态。
:::

## 主题管理 {#theme}

### 查看主题列表 {#theme-list}

```bash
novaix theme:list
```

输出示例：

```
+------------+--------------+-------+----------------+
| 主题 ID    | 名称         | 版本  | 状态           |
+------------+--------------+-------+----------------+
| (default)  | 默认内置主题 | -     | 已激活（默认） |
| dark-theme | Dark Theme   | 1.0.0 | 未激活         |
+------------+--------------+-------+----------------+
```

CLI 会完整校验主题（目录名一致性、版本兼容、`ui/index.html` 存在），加载异常的主题会显示错误原因。如果当前激活的主题已被删除，列表中会显示红色提示。

### 切换主题 {#theme-active}

```bash
novaix theme:active dark-theme
```

切换前会校验主题完整性，校验不通过时拒绝切换。

### 重置为默认主题 {#theme-reset}

```bash
novaix theme:reset
```

::: tip 紧急场景
如果自定义主题导致前端白屏，可以从终端快速恢复：
```bash
novaix theme:reset
# 重启服务后前端恢复正常
```
:::

## 设置管理 {#setting}

### 查看设置项 {#setting-get}

```bash
novaix setting:get site_name
novaix setting:get captcha_enabled
```

敏感设置项（如 SMTP 密码）会自动解密后显示。

### 修改设置项 {#setting-set}

```bash
novaix setting:set captcha_enabled false
novaix setting:set site_name "My VPS"
```

修改操作会走完整的校验和加密链路（与管理后台一致），未知的设置项会被拒绝。

### 重置设置组 {#setting-reset}

将整个设置组恢复为默认值：

```bash
novaix setting:reset-group captcha
novaix setting:reset-group mail
```

::: warning
重置后需要重启服务才能生效。重置操作会删除该组所有已保存的配置项，恢复到系统默认值。
:::

## 系统信息 {#system-info}

```bash
novaix system:info
```

输出示例：

```
Novaix 系统信息
─────────────────────────────
  版本:         v0.2.6
  Go 版本:      go1.22.0
  操作系统:     linux/amd64
  数据库:       sqlite

数据统计
─────────────────────────────
  管理员:       1
  用户:         128
  节点:         5
  实例:         76
  订单:         342
```

## 启动服务 {#serve}

直接运行 `novaix`（无子命令）即启动 HTTP 服务，与之前的行为完全一致。也可以显式使用 `serve` 子命令：

```bash
# 以下两种方式等价
novaix --config config.yaml
novaix serve --config config.yaml

# serve 子命令支持的选项
novaix serve --check          # 验证配置和数据库连接后退出
novaix serve --migrate-only   # 只执行数据库迁移后退出
```

::: tip
原有的启动方式（`novaix --config config.yaml --check` 等）仍然完全兼容，无需修改现有的 systemd、Supervisor 或宝塔面板配置。
:::
