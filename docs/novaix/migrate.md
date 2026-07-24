# 迁移 {#migrate}

如果您需要将 Novaix 从一台服务器迁移到另一台服务器，只需要迁移数据库和工作目录下的数据文件即可。整个过程通常只需几分钟。

## 迁移前准备 {#prepare}

在开始迁移之前，请确认以下信息：

- 当前使用的数据库类型（SQLite / MySQL / PostgreSQL）
- Novaix 的工作目录路径（默认为 `/opt/novaix`）
- 新服务器已完成 Novaix 的[安装](./install)，但**先不要启动服务**

::: tip
如果您不确定当前使用的数据库类型，可以查看工作目录下的 `config.yaml` 中的 `database.driver` 配置项。未配置或值为 `sqlite` 则表示使用的是 SQLite。
:::

## 迁移数据库 {#migrate-database}

### SQLite（默认） {#migrate-sqlite}

SQLite 数据库是工作目录下的一个文件，直接复制即可：

```bash
# 在旧服务器上停止服务
supervisorctl stop novaix

# 将数据库文件复制到新服务器
scp /opt/novaix/novaix.db root@新服务器IP:/opt/novaix/
```

### MySQL {#migrate-mysql}

```bash
# 在旧服务器上导出数据库
mysqldump -u root -p novaix > novaix_backup.sql

# 将备份文件复制到新服务器
scp novaix_backup.sql root@新服务器IP:/tmp/

# 在新服务器上导入数据库
mysql -u root -p novaix < /tmp/novaix_backup.sql
```

::: tip
如果 MySQL 也需要迁移到新服务器，请先在新服务器上安装 MySQL 并创建数据库，具体步骤参考[安装文档的 MySQL 部分](./install#mysql)。
:::

### PostgreSQL {#migrate-postgres}

```bash
# 在旧服务器上导出数据库
pg_dump -U novaix novaix > novaix_backup.sql

# 将备份文件复制到新服务器
scp novaix_backup.sql root@新服务器IP:/tmp/

# 在新服务器上导入数据库
psql -U novaix novaix < /tmp/novaix_backup.sql
```

## 迁移数据文件 {#migrate-data}

除了数据库，工作目录下的 `data/` 目录包含了镜像、上传文件、插件、主题等数据，也需要一并迁移：

```bash
# 将整个 data 目录复制到新服务器
scp -r /opt/novaix/data root@新服务器IP:/opt/novaix/
```

`data/` 目录的主要内容：

| 子目录 | 说明 |
|--------|------|
| `data/images/` | 镜像和 ISO 文件 |
| `data/uploads/` | 上传的文件 |
| `data/plugins/` | 插件 |
| `data/themes/` | 主题 |

::: tip
如果您配置了[对象存储](./storage)，镜像文件会异步归档到对象存储中，本地的 `data/images/` 可能不包含全部镜像。迁移后系统会在需要时自动从对象存储恢复。
:::

## 迁移配置文件 {#migrate-config}

将旧服务器的配置文件复制到新服务器：

```bash
scp /opt/novaix/config.yaml root@新服务器IP:/opt/novaix/
```

复制后，检查并修改新服务器上的 `config.yaml`：

- **数据库连接**：如果 MySQL / PostgreSQL 的地址发生变化，需要更新 `database.dsn`
- **域名和 URL**：如果域名不变，`server.external_url` 无需修改
- **其他配置**：通常不需要修改，所有配置项会原样生效

## 启动并验证 {#verify}

```bash
# 启动新服务器上的 Novaix
supervisorctl start novaix
# 或
systemctl start novaix
```

启动后，检查以下内容确认迁移成功：

- 访问面板，确认能正常登录
- 检查节点连接状态是否正常
- 确认订单、用户等数据完整
- 测试实例的终端和控制台功能

一切正常后，即可将域名 DNS 解析指向新服务器，并关闭旧服务器上的 Novaix 服务。

::: warning
- 迁移过程中旧服务器的 Novaix 应保持**停止状态**，避免迁移期间产生新数据导致不一致
- 建议在低峰期进行迁移操作
- 迁移完成后，建议保留旧服务器的数据至少一周，确认无误后再清理
:::
