# 🚀 小周CF科学

> 基于 Cloudflare Workers 的边缘计算代理服务管理面板

## 📖 项目简介

**小周CF科学** 是一个基于 Cloudflare Workers 平台的边缘计算隧道管理服务。它将完整的代理管理功能集成在单个 `worker.js` 文件中，支持 VLESS、Trojan、Shadowsocks 等主流协议，提供强大的可视化后台和灵活的节点配置能力。配合 GitHub Pages 前端页面使用，实现完整的代理服务管理体验。

### ✨ 核心特性

- 🛡️ **协议支持** — 支持 VLESS、Trojan、Shadowsocks 等主流协议，深度集成加密传输
- 📊 **管理面板** — 内置可视化后台，支持实时配置修改、日志查看及流量统计
- 🔄 **订阅系统** — 内置自动订阅生成及混淆转换，适配 Clash、Sing-box、Surge 等主流客户端
- ⚡ **性能加速** — 支持自定义 ProxyIP、SOCKS5/HTTP 链式代理及优选 API，优化网络延迟
- 🌙 **暗黑模式** — 支持日间/夜间主题切换，自适应系统偏好
- 📱 **响应式设计** — 完美适配 Windows、Android、iOS、MacOS 及各种软路由固件
- 🚀 **版本检测** — 自动检测最新版本并提示一键更新

## 🔗 访问地址

| 项目 | 地址 |
|------|------|
| 前端页面 | https://fuxicun-top.github.io/kexue-fuxicun-top-Pages/ |

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
├── locations               # 全球节点位置数据
├── worker.js               # 后端 Worker 代码（部署用）
├── CHANGELOG               # 更新日志
└── README.md               # 项目说明
```

## 🚀 部署教程（Cloudflare Workers）

只需一个 `worker.js` 文件即可完成部署。

### 第一步：创建 Cloudflare 账户

前往 [Cloudflare 官网](https://dash.cloudflare.com) 注册并登录账户。

### 第二步：创建 Worker

1. 登录后进入 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 左侧菜单点击 `Workers & Pages`
3. 点击 `Overview` 标签，然后点 `Create Application`
4. 选择 `Workers` 标签，点击 `Create Worker`
5. 给 Worker 起个名字（如 `kexue-fuxicun-top`），点击 `Deploy`

### 第三步：粘贴代码

1. 打开刚创建的 Worker，点击编辑器中的 `Edit mode` 切换到代码编辑模式
2. 打开本项目，找到 `worker.js` 文件（或直接去 GitHub 仓库下载）
3. 将 `worker.js` 的**全部内容**复制粘贴到 Worker 编辑器中
4. 点击顶部的 `Save and deploy` 按钮完成部署

### 第四步：绑定 KV 命名空间

本项目使用 Cloudflare KV 存储配置数据和访问日志，必须绑定 KV 命名空间。

1. 左侧菜单点击 `Workers & Pages` > `KV`
2. 点击 `Create Namespace` 创建一个新的命名空间
3. 命名空间随便起个名字（如 `kexue-kv`），点击 `Add`
4. 返回刚才的 Worker 详情页，点击左侧 `Settings`
5. 找到 `Bindings` 区域，点击 `Add binding` > `KV Namespace`
6. 填写：
   - `Variable name`：**KV**（必须严格填 KV，大小写敏感）
   - `KV namespace`：选择刚才创建的命名空间
7. 点击 `Save`，然后回到 Worker 页面顶部点击 `Deploy` 重新部署

### 第五步：配置环境变量

1. 在 Worker 的 `Settings` 页面中找到 `Variables and Secrets` 区域
2. 点击 `Add Variables` > `Production`，逐个添加以下变量：

#### 必需变量

| 变量名 | 必填 | 说明 | 示例 |
|--------|------|------|------|
| **ADMIN** | ✅ | 后台管理面板登录密码 | `123456` |

#### 可选变量

| 变量名 | 说明 | 示例 |
|--------|------|------|
| **KEY** | 快速订阅路径密钥，访问 `/你的密钥` 即可获取节点 | `mykey` |
| **UUID** | 强制固定 UUID（必须是 v4 格式），用于订阅链接 | `90cd4a77-141a-43c9-991b-08263cfe9c10` |
| **PROXYIP** | 全局自定义反代 IP，优化连接质量 | `proxyip.cmliussss.net:443` |
| **URL** | 默认主页伪装地址（可填网页 URL 或 `1101`） | `1101` |
| **GO2SOCKS5** | 强制走 SOCKS5 的域名名单（`*` 为全局，域名用逗号分隔） | `blog.cmliussss.com,*.google.com` |
| **BEST_SUB** | 设为 `1` 开启优选订阅生成器功能 | `1` |
| **PRELOAD_RACE_DIAL** | 设为 `1` 开启预加载竞速拨号功能 | `1` |
| **DEBUG** | 设为 `1` 开启调试日志（控制台可见详细日志） | `1` |
| **OFF_LOG** | 设为 `1` 关闭日志记录功能 | `1` |

> **提示**：`KEY` 和 `UUID` 二选一即可，设置 `KEY` 会在订阅链接中包含随机 UUID，设置 `UUID` 则使用固定值。

### 第六步：绑定自定义域名（可选）

1. 在 Worker 的 `Settings` 页面中找到 `Triggers` 区域
2. 点击 `Add Custom Domain`
3. 填入你已经配置 DNS 的域名（如 `vless.yourdomain.com`）
4. 等待证书生效后即可通过自定义域名访问

### 第七步：验证部署

访问 `https://你的worker名字.workers.dev/admin`，输入你在第五步设置的 ADMIN 密码即可登录管理后台。

### 常见问题

- **访问 `/admin` 提示未设置密码**：确认环境变量 `ADMIN` 是否已正确添加并重新部署
- **无法保存配置**：确认 KV 命名空间的 Variable name 是否为 `KV`（大写，大小写敏感）
- **节点无法使用**：检查 `PROXYIP` 配置是否正确，或尝试不配置此变量
- **版本检测显示过期**：更新 `worker.js` 后需在 `CHANGELOG` 中同步更新版本号

## ⚙️ 高级功能

### 动态切换代理方案

支持通过 URL PATH 路径动态切换底层代理方案：

- **指定 PROXYIP**
  ```url
  /proxyip=proxyip.cmliussss.net
  /?proxyip=proxyip.cmliussss.net
  ```

- **指定 SOCKS5**
  ```url
  /socks5=user:password@127.0.0.1:1080
  /?socks5=user:password@127.0.0.1:1080
  /socks://dXNlcjpwYXNzd29yZA==@127.0.0.1:1080（默认激活全局 SOCKS5）
  /socks5://user:password@127.0.0.1:1080（默认激活全局 SOCKS5）
  ```

- **指定 HTTP 代理**
  ```url
  /http=user:password@127.0.0.1:1080
  /http://user:password@127.0.0.1:8080（默认激活全局 SOCKS5）
  ```

### 修改订阅 TOKEN 和 UUID

1. 修改 `ADMIN` 或 `KEY` 变量的值，可以随机修改订阅地址里的 TOKEN 和 UUID
2. 设置 `UUID` 变量可以强制固定订阅地址里的 TOKEN 和 UUID（必须是 v4 格式，否则会导致节点无法使用）

## 📱 客户端适配

| 平台 | 推荐客户端 |
|------|-----------|
| **Windows** | [v2rayN](https://github.com/2dust/v2rayN/releases) · [Hiddify](https://github.com/hiddify/hiddify-app/releases) · [FlClash](https://github.com/chen08209/FlClash/releases) · [mihomo-party](https://github.com/mihomo-party-org/clash-party/releases) · [Clash Verge Rev](https://github.com/clash-verge-rev/clash-verge-rev/releases) · [Clashmi](https://github.com/KaringX/clashmi/releases) · [Karing](https://github.com/KaringX/karing/releases) · [Bettbox](https://github.com/appshubcc/Bettbox/releases) |
| **Android** | [v2rayNG](https://github.com/2dust/v2rayNG/releases) · [ClashMetaForAndroid](https://github.com/MetaCubeX/ClashMetaForAndroid/releases/) · [FlClash](https://github.com/chen08209/FlClash/releases) · [Clashmi](https://github.com/KaringX/clashmi/releases) · [Hiddify](https://github.com/hiddify/hiddify-app/releases) · [NekoBox](https://github.com/MatsuriDayo/NekoBoxForAndroid/releases) · [Karing](https://github.com/KaringX/karing/releases) · [Bettbox](https://github.com/appshubcc/Bettbox/releases) |
| **iOS** | [Surge](https://surge.run/) · [Shadowrocket](https://apps.apple.com/app/shadowrocket/id932747118) · [Stash](https://apps.apple.com/app/stash-for-ios/id1596063349) · [Hiddify](https://github.com/hiddify/hiddify-app/releases) · [Loon](https://loongfw.com/) · [Egern](https://egernapp.com/) · [Clashmi](https://clashmi.app/download) · [Karing](https://karing.app/) · [Quantumult X](https://apps.apple.com/app/quantumult-x/id1443985620) |
| **macOS** | [FlClash](https://github.com/chen08209/FlClash/releases) · [mihomo-party](https://github.com/mihomo-party-org/clash-party/releases) · [Clash Verge Rev](https://github.com/clash-verge-rev/clash-verge-rev/releases) · [Surge](https://surge.run/) · [Clashmi](https://clashmi.app/download) · [Karing](https://karing.app/) |
| **鸿蒙** | [ClashBox](https://github.com/xiaobaigroup/ClashBox/releases) |

## 📄 许可证

本项目仅供教育、科学研究及个人安全测试之用。使用者在下载或使用本项目代码时，必须严格遵守所在地区的法律法规。作者对任何滥用本项目代码导致的行为或后果均不承担任何责任。建议在测试完成后删除本项目相关部署。
