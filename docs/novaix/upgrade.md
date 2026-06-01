# 升级

Novaix 支持在线更新和手动更新两种方式。数据库迁移会在启动时自动执行，无需手动操作。

## 在线更新（推荐） {#online-update}

在管理面板「关于」页面中点击「检查更新」，如果有新版本可用，点击「立即更新」即可自动完成下载、校验、替换和重启。

更新过程会作为一个系统任务执行，您可以在任务面板中实时查看进度日志。

### 下载加速 {#mirror}

如果服务器位于中国大陆，直接从 GitHub 下载可能较慢或无法连接。可以在管理面板「系统设置 → 站点设置」中配置**更新镜像地址**，例如：

```
https://ghfast.top
```

配置后，更新文件将通过镜像加速下载。

## 手动更新 {#manual-update}

```bash
# 1. 下载新版本（以 linux/amd64 为例）
wget https://github.com/huohuastudio/novaix-releases/releases/latest/download/novaix_linux_amd64.tar.gz
tar -xzf novaix_linux_amd64.tar.gz

# 2. 备份并替换
cp /usr/local/bin/novaix /usr/local/bin/novaix.bak
mv novaix_linux_amd64/novaix /usr/local/bin/novaix
chmod +x /usr/local/bin/novaix

# 3. 重启服务
supervisorctl restart novaix
# 或
systemctl restart novaix
```

::: warning
升级前建议先[备份](./backup)数据库，以便出现问题时可以回滚。虽然 Novaix 的升级过程设计为向前兼容，但备份永远是好习惯。
:::

## 查看版本 {#check-version}

您可以通过以下方式查看当前运行的版本：

- 管理面板的「关于」页面
- 接口 `GET /api/v1/ping` 的返回信息

## 注意事项 {#notes}

- 升级是**不可逆**的，数据库迁移会在启动时自动执行，回退到旧版本可能导致不兼容
- 如果跨多个版本升级，建议查看 [更新日志](https://github.com/huohuastudio/novaix-releases/releases) 了解每个版本的变更内容
- 升级过程中服务会短暂中断（通常只需几秒），如果您对可用性要求较高，建议在低峰期操作
