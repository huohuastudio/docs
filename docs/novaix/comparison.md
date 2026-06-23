# 竞品对比 {#comparison}

本文将 Novaix 与市面上主流的 IDC 管理系统 / VPS 管理面板进行对比，帮助您了解各产品之间的差异。

## 竞品概览 {#overview}

| 产品 | 开发商 | 定位 | 技术栈 | 授权模式 |
|------|--------|------|--------|---------|
| **Novaix** | Spark Studio | 面向中小 VPS 服务商的 IDC 管理系统 | Go + React，单二进制 | 商业授权 |
| **智简魔方** | 重庆顺戴网络 | IDC 全链业务管理（财务+云+DCIM） | PHP + Vue（前后端分离） | V10 开源 / 专业版商业 |
| **ZKEYS** | 小鸟云（阿帕云引擎） | 企业级公有云管理系统 | .NET / PHP | 商业授权，价格较高 |
| **SolusVM 2** | WebPros（cPanel 母公司） | 老牌 VPS 管理面板 | 闭源 | 商业授权，$10/月起 |
| **Virtualizor** | Softaculous | VPS 控制面板 | PHP | 商业授权，~$9/节点/月 |
| **VirtFusion** | VirtFusion Ltd | 新一代 VPS 管理面板（KVM 专精） | Laravel | 商业授权，~$15/节点/月 |

## 功能对比 {#feature-comparison}

以下表格仅列出各产品之间**存在差异**的能力项，所有产品均支持的通用能力（如创建/启停/重启实例、VNC 控制台、快照管理、系统重装、实例升级等）不再逐一列出。

### 部署与虚拟化 {#deployment}

| 能力 | Novaix | 智简魔方 | ZKEYS | SolusVM 2 | Virtualizor | VirtFusion |
|------|--------|---------|-------|-----------|-------------|------------|
| 单文件部署 | :white_check_mark: | :x: | :x: | :x: | :x: | :x: |
| 零依赖启动（默认 SQLite） | :white_check_mark: | :x: | :x: | :x: | :x: | :x: |
| 迁移失败自动回滚 | :white_check_mark:（SQLite） | :x: | :x: | :x: | :x: | :x: |
| KVM / QEMU | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| 系统容器（LXC） | :white_check_mark: | :x: | :x: | :x: | :white_check_mark: | :x: |
| Hyper-V | :x: | :white_check_mark: | :white_check_mark: | :x: | :x: | :x: |
| VMware | :x: | :x: | :white_check_mark: | :x: | :x: | :x: |
| Proxmox 集成 | :x: | :x: | :x: | :x: | :white_check_mark: | :x: |
| OpenVZ | :x: | :x: | :x: | :white_check_mark: | :white_check_mark: | :x: |

### 实例与网络 {#instance-network}

| 能力 | Novaix | 智简魔方 | ZKEYS | SolusVM 2 | Virtualizor | VirtFusion |
|------|--------|---------|-------|-----------|-------------|------------|
| 终端访问 | :white_check_mark: | :x: | :x: | :x: | :x: | :x: |
| ISO 挂载 | :white_check_mark: | :x: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| 在线热迁移 | :white_check_mark: | :white_check_mark: | :x: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| HA 自动疏散 | :white_check_mark: | :x: | :x: | :x: | :x: | :x: |
| VPC 私有网络 | :white_check_mark:（OVN） | :white_check_mark:（OVS） | :x: | :white_check_mark:（WireGuard） | :x: | :x: |
| 安全组 / 防火墙 | :white_check_mark: | :white_check_mark: | :x: | :x: | :x: | :white_check_mark:（网络过滤） |
| NAT 端口转发 | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | :white_check_mark: | :white_check_mark: |
| 反向 DNS | :white_check_mark: | :x: | :x: | :white_check_mark: | :white_check_mark: | :white_check_mark: |

### 计费与支付 {#billing}

| 能力 | Novaix | 智简魔方 | ZKEYS | SolusVM 2 | Virtualizor | VirtFusion |
|------|--------|---------|-------|-----------|-------------|------------|
| 内置计费系统 | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x:（需 WHMCS） | :white_check_mark:（基础） | :x:（需 WHMCS） |
| 按小时计费 | :white_check_mark: | :white_check_mark: | :white_check_mark: | — | :white_check_mark: | — |
| 流量包 | :white_check_mark: | :white_check_mark: | :x: | — | :x: | — |
| 优惠券 | :white_check_mark: | :white_check_mark: | :white_check_mark: | — | :x: | — |
| 支付宝 / 微信支付 | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | :x: | :x: |
| Stripe / PayPal | :white_check_mark: | :x: | :x: | — | :white_check_mark: | — |
| 易支付 | :white_check_mark: | :x: | :x: | :x: | :x: | :x: |
| 资源预检（下单时校验库存） | :white_check_mark: | :x: | :x: | :x: | :x: | :x: |

### 用户与代理 {#user-agent}

| 能力 | Novaix | 智简魔方 | ZKEYS | SolusVM 2 | Virtualizor | VirtFusion |
|------|--------|---------|-------|-----------|-------------|------------|
| 代理 / 分销系统 | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | :white_check_mark: | :x: |
| 差异化返佣 | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | :x: | :x: |
| 实名认证（KYC） | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | :x: | :x: |
| 人脸识别认证 | :white_check_mark: | :x: | :x: | :x: | :x: | :x: |
| 社会化登录（OAuth） | :white_check_mark: | :white_check_mark: | :x: | :x: | :x: | :x: |
| TOTP 两步验证 | :white_check_mark: | :x: | :x: | :white_check_mark: | :x: | :white_check_mark: |
| 人机验证（CAPTCHA） | :white_check_mark: | :x: | :x: | :x: | :x: | :white_check_mark: |

### 扩展与运维 {#extension-ops}

| 能力 | Novaix | 智简魔方 | ZKEYS | SolusVM 2 | Virtualizor | VirtFusion |
|------|--------|---------|-------|-----------|-------------|------------|
| 插件系统 | :white_check_mark:（6 种类型） | :white_check_mark: | :white_check_mark: | :x: | :x: | :x: |
| 主题 / 模板市场 | :white_check_mark: | :white_check_mark: | :x: | :x: | :x: | :x: |
| 前端源码开源 | :white_check_mark: | :x: | :x: | :x: | :x: | :x: |
| Webhook 回调 | :white_check_mark: | :white_check_mark: | :x: | :x: | :x: | :white_check_mark: |
| 阈值告警 | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | :x: | :x: |
| 多渠道通知推送 | :white_check_mark: | :white_check_mark: | :x: | :x: | :x: | :x: |
| 异步任务系统（实时日志） | :white_check_mark: | :x: | :x: | :x: | :x: | :x: |
| 工单系统 | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | :x: | :x: |
| 阿里云 / 腾讯云短信 | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | :x: | :x: |
| Mailgun / Resend | :white_check_mark: | :x: | :x: | :x: | :x: | :x: |

## 竞品简评 {#competitor-notes}

**智简魔方** — 国内最主流的 IDC 管理系统之一，产品线完整（魔方云 + 魔方财务 + DCIM），V10 版本开源，生态成熟。不足在于部署依赖较多（PHP + MySQL），仅支持 KVM 虚拟化。

**ZKEYS（阿帕云引擎）** — 企业级定位，虚拟化覆盖面广（KVM/Hyper-V/VMware），分销体系完善。不足在于价格较高、可定制性较差。

**SolusVM 2** — 海外市场占有率最高的老牌面板，被 WebPros（cPanel 母公司）收购后开发节奏放缓。不含计费系统，需搭配 WHMCS，且存在未来涨价的不确定性。

**Virtualizor** — 支持的虚拟化技术最多（KVM/Xen/OpenVZ/Proxmox/LXC），内置基础计费，价格实惠。但 2026 年 2 月曝出严重安全漏洞，导致多家 IDC 被入侵。

**VirtFusion** — 新一代现代化面板，UI 设计精美，KVM 专精，支持 Ceph 分布式存储和灾难恢复。不含计费系统，不支持容器，不支持国内支付和通知渠道。
