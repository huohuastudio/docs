# 安装 Novaix {#install}

Novaix 编译为单个二进制文件，部署非常简单。您只需要下载二进制文件、编辑配置文件，然后启动即可。

::: tip
Novaix 部署即可使用免费版，无需提前获取许可证。如需解锁全部功能，可以部署后在管理后台[在线激活](./getting-started#license)。
:::

## 下载 {#download}

从 [GitHub Releases](https://github.com/huohuastudio/novaix-releases/releases) 下载最新版本的二进制文件：

```bash
# 下载（以 linux-amd64 为例）
wget https://github.com/huohuastudio/novaix-releases/releases/latest/download/novaix_linux_amd64.tar.gz

# 解压并移动到系统路径
tar -xzf novaix_linux_amd64.tar.gz
mv novaix_linux_amd64/novaix /usr/local/bin/novaix
chmod +x /usr/local/bin/novaix
```

::: tip
ARM 架构服务器请下载 `novaix_linux_arm64.tar.gz`。
:::

## 准备目录与配置 {#prepare}

```bash
# 创建工作目录
mkdir -p /opt/novaix
cd /opt/novaix
```

::: warning
Novaix 的工作目录非常重要，数据库文件（SQLite 模式下）、镜像文件、日志等都会存储在这个目录下。请不要在 `/tmp` 等临时目录中运行 Novaix，也不要随意移动工作目录，否则可能导致数据丢失。
:::

首次在工作目录下运行 Novaix 时，如果指定的配置文件不存在，程序会**自动生成一份带有注释的默认 `config.yaml`**（包含常用配置项），然后继续启动。完整配置项列表请参考[配置参考](./config)。您可以先运行一次来生成配置文件：

```bash
# 首次运行，自动生成 config.yaml 后按 Ctrl+C 停止
novaix --config config.yaml
```

生成的 `config.yaml` 包含所有可用配置项及其默认值和中文说明，您可以直接在此基础上修改。以下是生产环境**必须修改**的配置项：

```yaml
server:
  mode: release                           # 生产环境必须设为 release
  port: 8080
  external_url: https://panel.example.com # 您的实际域名
  allowed_origins:
    - https://panel.example.com           # CORS 白名单
  trusted_proxies:
    - 127.0.0.1                           # 反向代理 IP

jwt:
  secret: "这里填一个至少16字符的随机字符串"   # 生产环境必须修改

security:
  encryption_key: "这里填另一个随机字符串"     # 用于加密敏感数据

log:
  level: info
  format: json                             # 生产环境推荐 json，便于日志采集
```

::: tip
您可以使用 `openssl rand -hex 32` 来生成随机密钥。`jwt.secret` 和 `security.encryption_key` 建议使用不同的值。
:::

::: warning
`server.mode` 必须设为 `release`，否则系统将以调试模式运行，存在安全风险。`server.external_url` 用于授权验证和 CORS 等底层配置，必须设置为您的实际域名。部署完成后还需要在管理后台「系统设置 → 站点设置」中配置「站点 URL」，OAuth 回调、KYC 跳转、邮件链接和支付回调均取自该值（通常与 `external_url` 相同）。
:::

::: danger
`security.encryption_key` 一旦设置并使用后，**切勿修改或丢失**。该密钥用于加密数据库中存储的所有敏感信息（如节点的 SSH 密钥、SMTP 密码等）。如果更换密钥，所有已加密的数据将无法解密，您需要重新配置所有节点证书和敏感信息。
:::

首次启动后，程序会在终端输出初始管理员密码，请务必记录下来。如果忘记密码，可以使用 [CLI 管理工具](./cli#admin-reset) 重置：`novaix admin:reset-password`。

如果您希望指定初始密码，可以在 `config.yaml` 中添加：

```yaml
admin:
  initial_password: "your-password"  # 仅首次启动时生效
```

## 进程守护 {#process-guard}

在生产环境中，您需要使用进程管理工具来保证 Novaix 持续运行。以下提供三种方式，选择其中一种即可。

### 方式一：宝塔面板（推荐新手使用） {#bt-panel}

如果您的服务器已安装 [宝塔面板](https://www.bt.cn/)，可以通过宝塔的「进程守护管理器」插件来管理 Novaix，全程可视化操作。

#### 安装进程守护管理器

1. 登录宝塔面板，进入 **软件商店**
2. 搜索「进程守护管理器」
3. 点击 **安装**

#### 添加守护进程

安装完成后，打开进程守护管理器，点击 **添加守护进程**，填写以下信息：

| 字段 | 值 |
|------|------|
| 名称 | `novaix` |
| 启动命令 | `/usr/local/bin/novaix --config /opt/novaix/config.yaml` |
| 运行目录 | `/opt/novaix` |
| 启动用户 | `root` |
| 进程数量 | `1` |

点击 **确定** 后，Novaix 将自动启动并在异常退出时自动重启。后续可在插件界面中查看运行状态、查看日志、重启或停止进程。

#### 配置 Nginx 反向代理

宝塔面板中添加网站并配置反向代理：

1. 在宝塔面板中点击 **网站** → **添加站点**，填写您的域名（如 `panel.example.com`）
2. 进入站点设置 → **反向代理** → **添加反向代理**：
   - 代理名称：`novaix`
   - 目标 URL：`http://127.0.0.1:8080`
3. 提交后，点击刚创建的反向代理右侧的 **配置文件**，将内容替换为：

```nginx
location / {
    proxy_pass http://127.0.0.1:8080;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    # WebSocket 支持（终端、控制台、任务日志等功能需要）
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_read_timeout 86400;
}
```

4. 回到站点设置 → **SSL**，申请 Let's Encrypt 证书并开启强制 HTTPS

::: warning
必须手动编辑反向代理配置文件添加 WebSocket 支持，宝塔默认生成的反向代理配置不包含 `Upgrade` 和 `Connection` 头的转发，会导致实例终端、控制台、任务日志等功能无法正常使用。
:::

### 方式二：Supervisor（手动安装） {#supervisor}

::: code-group

```bash [Debian / Ubuntu]
apt install -y supervisor
```

```bash [CentOS / RHEL]
yum install -y supervisor
systemctl enable supervisord
systemctl start supervisord
```

:::

创建配置文件 `/etc/supervisor/conf.d/novaix.conf`：

```ini
[program:novaix]
command=/usr/local/bin/novaix --config /opt/novaix/config.yaml
directory=/opt/novaix
autostart=true
autorestart=true
startsecs=5
startretries=3
user=root
redirect_stderr=true
stdout_logfile=/var/log/novaix/app.log
stdout_logfile_maxbytes=50MB
stdout_logfile_backups=10
```

启动服务：

```bash
# 创建日志目录
mkdir -p /var/log/novaix

# 加载配置并启动
supervisorctl reread
supervisorctl update
supervisorctl start novaix
```

常用管理命令：

```bash
supervisorctl status novaix      # 查看状态
supervisorctl restart novaix     # 重启
supervisorctl stop novaix        # 停止
supervisorctl tail -f novaix     # 实时查看日志
```

### 方式三：systemd {#systemd}

如果您更偏好 systemd，创建 `/etc/systemd/system/novaix.service`：

```ini
[Unit]
Description=Novaix IDC Management System
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/novaix
ExecStart=/usr/local/bin/novaix --config /opt/novaix/config.yaml
Restart=always
RestartSec=5
LimitNOFILE=65536

[Install]
WantedBy=multi-user.target
```

```bash
systemctl daemon-reload
systemctl enable novaix
systemctl start novaix

# 管理命令
systemctl status novaix          # 查看状态
systemctl restart novaix         # 重启
journalctl -u novaix -f          # 实时查看日志
```

## 配置 Nginx 反向代理 {#nginx}

::: tip
如果您使用宝塔面板部署，反向代理已在[宝塔面板章节](#bt-panel)中配置完成，可跳过此步骤。
:::

Novaix 本身仅监听 HTTP，生产环境必须使用反向代理处理 HTTPS。

安装 Nginx 和 Certbot：

```bash
apt install -y nginx certbot python3-certbot-nginx
```

创建 `/etc/nginx/sites-available/novaix`：

```nginx
server {
    listen 80;
    server_name panel.example.com;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket 支持（终端、控制台、任务日志等功能需要）
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 86400;
    }
}
```

启用站点并申请 SSL 证书：

```bash
ln -s /etc/nginx/sites-available/novaix /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

# 自动申请 Let's Encrypt 证书
certbot --nginx -d panel.example.com
```

::: warning
WebSocket 支持是必须的，Novaix 的实例终端、控制台、任务日志等功能都依赖 WebSocket 连接。请确保您的 Nginx 配置中包含了 `Upgrade` 和 `Connection` 头的转发。
:::

## 配置 Caddy 反向代理（可选） {#caddy}

如果您更偏好 Caddy，它可以自动处理 HTTPS 证书的申请和续期，配置更为简单。

创建 `/etc/caddy/Caddyfile`：

```
panel.example.com {
    reverse_proxy 127.0.0.1:8080
}
```

```bash
systemctl restart caddy
```

Caddy 会自动申请和续期 SSL 证书，无需额外配置。Caddy 会自动处理 WebSocket 转发，无需额外配置。

## 使用 MySQL 数据库（可选） {#mysql}

如果您的业务规模较大或有高并发需求，可以将数据库从默认的 SQLite 切换到 MySQL。

安装 MySQL：

::: code-group

```bash [Debian / Ubuntu]
apt install -y mysql-server
```

```bash [CentOS / RHEL]
yum install -y mysql-server
systemctl enable mysqld
systemctl start mysqld
```

:::

创建数据库和用户：

```bash
mysql -u root -p
```

```sql
CREATE DATABASE novaix CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'novaix'@'localhost' IDENTIFIED BY 'your-password';
GRANT ALL PRIVILEGES ON novaix.* TO 'novaix'@'localhost';
FLUSH PRIVILEGES;
```

修改 `config.yaml`：

```yaml
database:
  driver: mysql
  dsn: "novaix:your-password@tcp(127.0.0.1:3306)/novaix?charset=utf8mb4&parseTime=True"
  max_open_conns: 25
  max_idle_conns: 10
  conn_max_lifetime: 3600
```

::: warning
- 字符集必须使用 `utf8mb4`，否则某些特殊字符（如 emoji）可能无法正常存储
- 目前不支持在不同数据库之间在线迁移，您需要在首次部署时就决定使用哪种数据库
:::

## 使用 PostgreSQL 数据库（可选） {#postgres}

如果您偏好 PostgreSQL，可以将数据库从默认的 SQLite 切换到 PostgreSQL。

安装 PostgreSQL：

::: code-group

```bash [Debian / Ubuntu]
apt install -y postgresql
```

```bash [CentOS / RHEL]
yum install -y postgresql-server
postgresql-setup --initdb
systemctl enable postgresql
systemctl start postgresql
```

:::

创建数据库和用户：

```bash
sudo -u postgres psql
```

```sql
CREATE USER novaix WITH PASSWORD 'your-password';
CREATE DATABASE novaix OWNER novaix ENCODING 'UTF8';
```

修改 `config.yaml`：

```yaml
database:
  driver: postgres
  dsn: "host=127.0.0.1 port=5432 user=novaix password=your-password dbname=novaix sslmode=disable"
  max_open_conns: 25
  max_idle_conns: 10
  conn_max_lifetime: 3600
```

::: warning
- 目前不支持在不同数据库之间在线迁移，您需要在首次部署时就决定使用哪种数据库
:::

## 验证安装 {#verify}

安装完成后，使用浏览器访问您配置的域名（如 `https://panel.example.com`），您应该能看到登录页面。

使用初始管理员账号登录后，建议您按以下顺序进行初始化配置：

1. 在管理后台「系统设置」中配置[邮件服务](./mail)（用于工单通知、密码重置等，支持 SMTP、Mailgun、Resend）
2. 在管理后台「系统设置」中配置支付渠道（如需在线支付功能）
3. （可选）配置[短信服务](./sms)（如需支持手机号注册登录）
4. （可选）配置[多渠道通知](./notify)（如需接收告警推送到 Telegram、钉钉等）
5. （可选）配置[对象存储](./storage)（如需镜像远程归档备份）
6. 添加并初始化节点服务器
7. 创建与节点网络匹配的 IP 池
8. 导入镜像并分发到节点
9. 创建套餐分组和套餐
10. 在管理后台「系统设置」中开启用户注册（默认关闭）
11. 发布公告，开始运营

::: tip
许可证可通过管理后台右上角的激活图标在线激活（推荐），也可以直接在 `config.yaml` 的 `license.key` 中填写。详见[快速开始](./getting-started#license)。
:::

::: tip
以上步骤将在后续章节中逐一详细介绍。
:::
