# 环境要求 {#requirement}

Novaix 使用 Go 语言开发，编译为单个二进制文件，对运行环境的要求非常简单。您不需要安装任何语言运行时、Web 服务器或额外的软件依赖。

## 服务器要求 {#server}

| 项目 | 要求 |
|------|------|
| 操作系统 | Linux（推荐 Ubuntu 24.04 / Debian 12） |
| 架构 | amd64 / arm64 |
| 内存 | 建议 512MB 以上 |

::: warning
Novaix 管理面板本身对资源要求很低，但您的服务器节点需要根据实际运行的实例数量配置足够的资源。
:::

## 数据库 {#database}

Novaix 支持三种数据库，您可以根据实际需求选择：

- **SQLite**（默认）：零配置，数据库文件存储在工作目录下，适合中小规模部署
- **MySQL 5.7+**：适合大规模部署或有高并发需求的场景
- **PostgreSQL 12+**：功能强大的开源关系型数据库，适合偏好 PostgreSQL 生态的用户

::: tip
如果您的用户数量在几千以内，SQLite 完全能胜任。SQLite 的优势是零维护、备份简单（复制文件即可）。如果您的业务量较大或需要数据库集群，建议使用 MySQL 或 PostgreSQL。
:::

## 反向代理 {#reverse-proxy}

Novaix 本身仅监听 HTTP，生产环境中您需要配置反向代理来处理 HTTPS。推荐使用以下任意一种：

- **Nginx**：搭配 Let's Encrypt 证书，适合大多数场景
- **Caddy**：自动 HTTPS，零配置证书申请和续期，配置更简单

在[安装](./install)章节中，我们会详细介绍两种反向代理的配置方法。

## 节点要求 {#node}

Novaix 通过连接节点服务器来管理虚拟机和容器。添加节点后，通过「初始化」功能即可自动完成运行环境的安装和配置。每个节点服务器需要：

- 支持的操作系统：Ubuntu 20.04+、Debian 11+、CentOS/RHEL 9+、Fedora 38+ 等
- SSH 连接正常（用于自动初始化）
- 如启用监控采集，建议安装 [Node Exporter](https://github.com/prometheus/node_exporter)（默认端口 9100）

### 推荐操作系统 {#recommended-os}

虽然上述发行版均可作为节点操作系统，但不同发行版在运行环境的兼容性和维护成本上有所差异：

- **Ubuntu 24.04 LTS**（首选）：内核版本新，对 ZFS、OVN 等存储和网络特性支持完善，社区资源丰富，5 年长期支持
- **Debian 12**：轻量稳定，适合偏好精简系统的用户
- **Ubuntu 22.04 LTS**：仍在支持周期内，但建议新部署直接使用 24.04
- **Rocky Linux 9**：适合有 RHEL 系使用习惯的用户，但可能需要额外配置，社区支持不如 Debian 系

::: tip
如果没有特殊偏好，直接选择 **Ubuntu 24.04 LTS** 即可，兼容性最好、部署最省心。
:::

## 总结 {#summary}

> [!IMPORTANT]
> 综上所述，部署 Novaix 的必要条件为：
> - 一台 Linux 服务器（amd64 或 arm64 架构）
> - 一个反向代理（Nginx 或 Caddy）用于 HTTPS
> - 至少一个可通过 SSH 连接的节点服务器
> - SQLite（默认）、MySQL 或 PostgreSQL 数据库
