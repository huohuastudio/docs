# 备份与恢复 {#backup}

定期备份是保障数据安全的基本操作。Novaix 的备份分为两个层面：**管理面板数据备份**（数据库和配置文件）和**实例自动快照备份**。

## 实例自动备份 {#auto-backup}

Novaix 支持对实例进行定时自动快照备份。在管理后台「系统设置」→「自动备份」中配置全局策略：

| 设置项 | 默认值 | 说明 |
|--------|--------|------|
| 启用自动备份 | 关闭 | 是否启用全局自动备份策略 |
| 执行频率 | 每天 | 自动备份的执行频率，支持每天或每周 |
| 保留数量 | 3 | 每个实例保留的自动快照数量，超出时自动清理最旧的快照 |
| 执行时间 | 3 点 | 每天执行自动备份的小时（0-23） |

启用全局策略后，每个实例还需要单独开启 `auto_backup` 标记才会参与自动备份。系统会在指定时间自动为符合条件的实例（运行中或已停止）创建以 `auto-` 前缀命名的快照，并按保留数量自动清理历史快照。

::: tip
自动备份策略是全局配置，但执行范围以实例级别控制。用户可在实例详情页查看自动备份策略详情（执行频率、执行时间、保留数量）。管理员未启用全局策略时，用户侧会显示明确提示。
:::

以下是管理面板数据的手动备份方法。

## SQLite 备份（默认） {#sqlite-backup}

SQLite 数据库是一个单独的文件，直接复制即可完成备份：

```bash
# 手动备份
cp /opt/novaix/novaix.db /backup/novaix-$(date +%Y%m%d).db
```

设置定期自动备份（编辑 `crontab -e` 添加）：

```bash
# 每天凌晨 3 点自动备份
0 3 * * * cp /opt/novaix/novaix.db /backup/novaix-$(date +\%Y\%m\%d).db
```

## MySQL 备份 {#mysql-backup}

```bash
# 手动备份
mysqldump -u root -p novaix > /backup/novaix-$(date +%Y%m%d).sql
```

设置定期自动备份：

```bash
# 每天凌晨 3 点自动备份
0 3 * * * mysqldump -u novaix_user -pYOUR_PASSWORD novaix > /backup/novaix-$(date +\%Y\%m\%d).sql
```

## PostgreSQL 备份 {#postgres-backup}

```bash
# 手动备份
pg_dump -U novaix novaix > /backup/novaix-$(date +%Y%m%d).sql
```

设置定期自动备份：

```bash
# 每天凌晨 3 点自动备份
0 3 * * * pg_dump -U novaix novaix > /backup/novaix-$(date +\%Y\%m\%d).sql
```

## 恢复 {#restore}

### 恢复 SQLite {#restore-sqlite}

```bash
# 停止服务
supervisorctl stop novaix

# 恢复数据库文件
cp /backup/novaix-20260530.db /opt/novaix/novaix.db

# 启动服务
supervisorctl start novaix
```

### 恢复 MySQL {#restore-mysql}

```bash
# 停止服务
supervisorctl stop novaix

# 恢复数据库
mysql -u root -p novaix < /backup/novaix-20260530.sql

# 启动服务
supervisorctl start novaix
```

### 恢复 PostgreSQL {#restore-postgres}

```bash
# 停止服务
supervisorctl stop novaix

# 恢复数据库
psql -U novaix novaix < /backup/novaix-20260530.sql

# 启动服务
supervisorctl start novaix
```

## 配置文件备份 {#config-backup}

除了数据库，您还应该备份以下文件：

- `config.yaml`：系统配置文件
- `data/images/`：上传的镜像和 ISO 文件（如有）

::: tip
- 建议将备份文件存储到异地（如对象存储），避免服务器故障时备份也丢失
- 备份前建议停止服务以确保数据一致性，特别是 SQLite 数据库
- 定期检查备份文件是否完整可用
:::

## 对象存储与备份 {#object-storage}

如果您配置了[对象存储](./storage)，镜像和 ISO 文件会异步归档到对象存储中。这意味着：

- 本地磁盘损坏时，系统会尝试从对象存储自动恢复镜像文件。归档或恢复失败时仅记录告警日志，不影响其他功能
- 对象存储**不替代数据库备份**，数据库中的订单、用户、配置等数据仍需单独备份
- 建议同时备份 `config.yaml`，其中包含对象存储的访问凭证

## 哪些数据不在备份范围内 {#excluded-data}

::: warning
Novaix 的备份只覆盖了管理面板的数据（数据库、配置、镜像文件）。以下数据**不在备份范围内**，需要您单独处理：

- **节点上运行的实例数据**：实例的磁盘、快照等数据存储在节点服务器上，不在 Novaix 管理面板的服务器上。如果节点服务器损坏，需要依赖节点自身的备份机制。
- **支付渠道的交易记录**：Novaix 数据库中只记录了订单和支付状态，详细的交易流水以支付渠道后台（支付宝、微信等）为准。

建议您同时为每个节点服务器制定独立的备份策略。
:::
