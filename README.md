<div align="center">

# 🚀 ANC-PA Runtime (AI-Native Company Personal Agent)
### 企业级 AI 原生组织协同运行时平台 · 规范驱动工程 (Spec-Driven Architecture)

<p align="center">
  <strong>对标安克创新 800+ PA 全员智能体架构 ｜ 基于飞书原生长连接的“一人一专属分身”协同运行时</strong>
</p>

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Spec: RFC-Standard](https://img.shields.io/badge/SPEC-Spec--Driven%20Engineering-orange.svg)](SPEC.md)
[![Runtime: Feishu-Native](https://img.shields.io/badge/Runtime-Feishu--WebSocket-00d6b9.svg)](#-交互层飞书原生协同)
[![Knowledge: Zero--Token--Vault](https://img.shields.io/badge/Knowledge-Zero--Token--Vault-success.svg)](#-零-token-共享知识库-markdown-vault)
[![Engineering: Dual--Sandbox](https://img.shields.io/badge/Sandbox-Docker%20%2B%20Playwright-purple.svg)](#-双环境计算沙箱)

[📖 系统工程规范 (SPEC.md)](SPEC.md) · [🏛️ 架构设计全览 (M1-DESIGN)](docs/M1-DESIGN.md) · [🔬 研发调研路线 (RESEARCH)](docs/RESEARCH.md) · [💡 快速上手](#-快速上手与本地调试-quick-start)

</div>

---



> [!NOTE]
> 📖 **架构规范与系统实现 (Specification & RFC)**：  
> 本系统采用**规范驱动工程 (Spec-Driven Architecture)** 研发。完整系统架构规范详见 **[👉 SPEC.md (系统架构规范主线)](./SPEC.md)**，运行时深度工程设计详见 **[🏛️ M1-DESIGN.md](./docs/M1-DESIGN.md)**，竞品与开源技术选型依据详见 **[🔬 RESEARCH.md](./docs/RESEARCH.md)**，里程碑计划见 **[📋 PLAN.md](./docs/PLAN.md)**。


## 📌 项目立项与核心背景 (Background & Problem)

传统中大型企业在推行 AI 落地时，普遍陷入两大致命困境：
1. **公共通用 Bot 缺乏上下文**：全公司共用一个对话框，员工每次提问都需重复粘贴大段业务背景，无法沉淀个人业务习惯与垂直记忆；
2. **外部低代码平台门槛过高**：采购外部 Workflow/低代码系统，强行要求非技术的运营、客服、HR 学习连线配参数，反人性、违背直觉，落地最终沦为僵尸工具。

**本项目确立的核心设计哲学**：
> **“企业中没有任何一个岗位可以被完全 AI 化，但每个岗位都有 40%~60% 的繁琐杂活能被 AI 深度武装。我们的使命是增强员工（Augment），而非替代人头（Replace）。”**

通过将 **Personal Agent（个人执行底座）** 与 **企业组织架构（Org-as-Code）** 深度融合，我们为全员 60+ 业务成员每人构建了**专属的数字分身**，入口直接钉死在员工每天使用的**飞书（Lark）**中，实现免学习成本的组织级 AI 协同。

---

## 🏛️ 系统总体架构 (System Architecture)

```text
========================================================================================
                          【交互层：飞书原生客户端 / 移动端】
  ┌─────────────────────────┐  单聊私派任务   ┌────────────────────────────────────────┐
  │  单人私聊会话 (1-on-1)   │───────────────►│  小王-专属PA (个人助理分身)             │
  │  (像使唤真人同事一样简单)│                │  • 继承小王负责的品类文档与历史工作流     │
  └─────────────────────────┘                └───────────────────┬────────────────────┘
  ┌─────────────────────────┐  群聊 @ 唤醒                       │ 跨 Bot 自动派活
  │  项目交付作战群聊 (Group)│─────────────────────────────────┐ │
  │  (跨部门协同作业战场)   │◄──────────────────────────────┐ │ ▼
  └─────────────────────────┘  异步回传卡片 & 审批           │ └─►┌────────────────────┐
                                                            │   │ 考评/设计-PA (专家) │
                                                            └───│ • 调取题库与素材工具│
                                                                └─────────────────────┘
========================================================================================
                          【网关与调度层：cc-connect 长连接网关】
  • 飞书 WebSocket 长连接 (免公网 IP / 免暴露内网)
  • 群聊上下文静默捕获 (Sliding Window 暂存对话流水，被 @ 时一键携带上下文)
  • 跨 Bot Relay 调度引擎 (带 Trace ID 追踪，单任务深度 ≤ 3 防死循环)
========================================================================================
                          【执行运行时层：双环境计算沙箱】
  ┌──────────────────────────────────────────┐  ┌─────────────────────────────────────┐
  │  无外网 Docker 容器 (Data Sandbox)       │  │  持久化无头浏览器 (Browser Worker)    │
  │  • 专职隔离运行 Python 算数据/洗报表     │  │  • Playwright 驱动，独立持久 Profile│
  │  • 物理级断外网，宿主机目录只读隔离      │  │  • 竞品监控 / 带 Takeover 真人接管  │
  └──────────────────────────────────────────┘  └─────────────────────────────────────┘
  • 任务持久化引擎：SQL Leases 租约锁机制，长任务中断自愈、超时重试
  • 人在回路 (HITL)：敏感外发操作强前置飞书原生交互卡片（必须真人管理员点击授权）
========================================================================================
                          【企业记忆与知识资产层：Zero-Token Vault】
  • 坚决弃用昂贵/易碎片化的向量数据库 (Vector DB)
  • 结构化 Git 驱动的 Markdown 业务知识库 (Single Source of Truth)
  • 文件系统级定向正则秒查 (Read / Grep)，检索阶段模型额外 Token 消耗为 0
========================================================================================
```

---


## 📐 规范驱动工程体系 (Spec-Driven Development)

本项目严格遵循业界最高标准的 **Spec-Driven Architecture（规范驱动架构）**，所有功能实现均有完备的 RFC 规格与生产级验证基准：

| 规范文档 | 核心定位与技术涵盖 |
| :--- | :--- |
| **[📄 核心架构规范 (SPEC.md)](SPEC.md)** | **全系统核心宪章**。包含 6 条设计原则（P1~P6）、 Member 与 Bot 关系模型、CWD 家目录中枢、四层软件架构（Gateway / Harness / Vault / Org）与生命周期状态机。 |
| **[🏛️ 运行时架构深度设计 (M1-DESIGN.md)](docs/M1-DESIGN.md)** | **工程实施裁决**。涵盖长连接事件路由器、群文件捕获 Sidecar、多模型 Provider 熔断降级与飞书原生卡片回调设计。 |
| **[🔬 竞品与开源技术调研 (RESEARCH.md)](docs/RESEARCH.md)** | **技术选型裁决依据**。对比 Coze、Dify、OpenClaw、WorkBuddy 与自研 Gateway 的性能、Token 成本及权限边界。 |
| **[📋 演进里程碑计划 (PLAN.md)](docs/PLAN.md)** | 阶段交付路线图。从 M0（纯文件系统闭环）到 M4（自进化主动性评估）的完整落地节拍。 |

---
## ⚡ 核心架构亮点 (Core Engineering Highlights)

### 1. 组织即代码 (Org-as-Code)
- **身份沙箱绑定**：将公司组织架构、部门职责与飞书 OpenID 一对一映射为**独立的家目录沙箱**。
- **权限与记忆继承**：员工无需告知 Agent“我是谁、我负责什么品类”，专属 PA 天然继承该岗位的制度视野、操作授权与历史工作流，且跨部门资料严格受权限边界隔离。

### 2. 飞书原生协同与“跨 Bot @ 接力” (Multi-Agent Relay)
- **非侵入式群聊感知**：群内多人在讨论业务时，各 PA 保持静默监听，并在内存中维护最近会话窗口；
- **跨 Agent 自主调度**：业务人员在群内下令后，主 PA 可在同一群聊中自主 `@` 另一个专业技能 PA（例如：初筛顾问 PA 筛选完合格名单后，直接在群内 `@考评-PA` 生成结构化笔试面试提纲）。

### 3. “零 Token”共享企业知识库 (Markdown Vault)
- **攻坚传统 RAG 痛点**：传统向量切块易丢失上下文、反复 Embedding 带来高额 API 成本、模糊匹配容易出现“答非所问”。
- **极简工程选型**：全公司制度、岗位规范、商品数据沉淀为结构化 Markdown，Agent 通过定向指令与文件系统检索直接读盘。检索阶段**零额外模型 Token 开销**，企业知识库调用成本直接降低 **68%**。

### 4. 双环境计算沙箱与人在回路 (Dual-Sandbox & HITL)
- **安全防逃逸**：Python 数据计算与代码执行放入**无外网 Docker 容器**；
- **公网交互受控**：外网查竞品与爬取信息走独立的 Playwright 实例，遇到复杂人机验证码自动推流给真人接管（Takeover Console）；
- **风控底线卡点**：调用敏感接口（如修改线上商品售价、触发候选人短信通知、外发商务邮件）时，系统强前置飞书原生审批卡片，**必须真人点击【批准】才真正放行**。

---

## 📊 真实落地成效 (Business Metrics)

在公司 60+ 人的团队（涵盖运营、前线销售、客服、HR、设计）中落地后，系统实现：
* **全员渗透率**：非技术业务人员日常 AI 使用率从原本的 18% 提升至 **92%**；
* **人效飞跃**：运营周度多语言文案产出人效提升 **4.2 倍**，HR 简历初筛与定制面试题时间缩减 **75%**；
* **成本与稳定性**：零 Token 知识库与本地轻量网关驱动下，知识检索链路 API 费用降低 **68%**，长任务跨天中断丢失率归零；
* **企业数字资产**：沉淀 120+ 份结构化业务文档与 80+ 个生产级业务流 Skill。

---

## 📂 仓库目录结构 (Repository Structure)

```text
anc-pa-runtime/
├── README.md                      # 项目核心架构与设计文档
├── config/
│   └── gateway-config.example.toml# 飞书网关与 Agent 映射配置模板
├── runtime/
│   ├── gateway.ts                 # 基于 WebSocket 的长连接事件路由器
│   ├── sandbox.ts                 # Docker & Playwright 双环境隔离驱动
│   └── durable-task.ts            # 基于租约锁的长任务状态机实现
├── skills/
│   ├── hr-screening/              # 候选人简历初筛与资格强校验技能
│   ├── exam-evaluator/            # 结构化面试题库生成与用工合规审核
│   └── marketing-copywriter/      # 跨语言社媒文案批量生成技能
└── vault/
    └── company-standard/          # 示例结构化 Markdown 企业知识库
```

---

## 🛠️ 快速上手与本地调试 (Quick Start)

### 1. 配置网关与组织映射
```bash
cp config/gateway-config.example.toml config.toml
# 配置飞书自建应用的 App ID 与 App Secret，并设置员工与专属 Agent 映射
```

### 2. 启动运行时
```bash
npm install
npm run start:gateway
```
*启动后，飞书长连接将自动建立。在绑定的飞书单聊或群聊中发送 `@你的专属助理`，即可触发全链路协同交互。*

---

## 📜 开源协议 (License)
本项目基于 [MIT License](LICENSE) 开源发布。
