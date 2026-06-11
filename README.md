# 小周CF科学设置页面 模板

> 基于 Cloudflare Workers 的科学上网管理面板静态前端模板

## 📖 项目简介

本项目是 Cloudflare Workers 代理服务的**前端设置页面**，提供用户登录、管理后台、订阅生成等功能。配合后端 Worker 使用，实现完整的代理服务管理体验。

## 🔗 访问地址

| 项目 | 地址 |
|------|------|
| GitHub Pages | https://fuxicun-top.github.io/kexue-fuxicun-top-Pages/ |
| Worker 后端 | [kexue-fuxicun-top](https://github.com/fuxicun-top/kexue-fuxicun-top) |

## ✨ 功能特性

- 🔐 **用户登录** — 密码认证，Cookie 会话管理
- ⚙️ **管理后台** — 可视化配置代理参数
- 📋 **订阅生成** — 自动生成 vless/trojan 订阅链接
- 🌍 **节点位置** — 全球机节点位置信息展示
- 📊 **用量统计** — Cloudflare Workers/Pages 请求量查询
- 🔗 **链式代理** — 支持 SOCKS5/HTTP 反代配置
- 📝 **日志记录** — 访问日志查看与管理

## 📁 项目结构

```
├── index.html              # 首页
├── login/index.html        # 登录页面
├── admin/                  # 管理后台
│   ├── index.html          # 后台主页面
│   ├── config.json         # 配置文件模板
│   └── log.json            # 日志示例
├── noADMIN/index.html      # 未配置密码提示页
├── noKV/index.html         # 未配置KV提示页
├── sub                     # 订阅内容示例
├── version                 # 版本信息
├── locations               # 全球机场位置数据
└── worker.js               # 后端代码（单独部署）
```

## 🚀 部署方式

### 前端（本项目）

本项目通过 GitHub Actions 自动部署到 GitHub Pages：

1. Fork 或克隆本仓库
2. 在 GitHub 仓库设置中启用 Pages（Source: GitHub Actions）
3. 推送代码后自动部署

### 后端（Worker）

1. 克隆 [kexue-fuxicun-top](https://github.com/fuxicun-top/kexue-fuxicun-top)
2. 部署到 Cloudflare Workers
3. 配置环境变量：
   - `ADMIN` — 管理员密码
   - `KV` — Cloudflare KV 命名空间绑定

## ⚙️ 环境变量说明

| 变量名 | 说明 |
|--------|------|
| `ADMIN` | 管理员登录密码 |
| `KEY` | 加密密钥（可选） |
| `UUID` | 自定义 UUID（可选） |
| `PROXYIP` | 反代 IP 地址 |
| `HOST` | 自定义域名 |
| `SOCKS5` | SOCKS5 代理地址 |

## 📌 相关项目

- **后端代码**: [kexue-fuxicun-top](https://github.com/fuxicun-top/kexue-fuxicun-top)
- **原始项目**: [edgetunnel](https://github.com/cmliu/edgetunnel)

## 📄 许可证

本项目仅供学习交流使用，请勿用于非法用途。
