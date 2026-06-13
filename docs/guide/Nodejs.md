---
sidebarDepth: 2
---

# Node.js

本章介绍现代 Node.js 工程环境的搭建：如何管理 Node 版本、如何选对包管理器，以及日常开发中真正高频的实用 CLI 工具。

> 选型建议（2026）：新项目优先使用 **Node.js 当前 LTS（v20 / v22）**，包管理器优先 **pnpm**，并用 **Corepack** 锁定团队一致的版本。下文会说明原因。

## 版本管理

同一台机器上往往需要在多个 Node 版本间切换（老项目锁定 v16，新项目用 v22）。不要手动安装/卸载，用版本管理器。

### fnm（推荐）

[fnm](https://github.com/Schniz/fnm) 用 Rust 编写，跨平台、启动极快，是当前最推荐的选择。它能读取项目根目录的 `.nvmrc` / `.node-version` 自动切换版本。

```bash
# macOS / Linux
curl -fsSL https://fnm.vercel.app/install | bash
# Windows (推荐 winget)
winget install Schniz.fnm

# 安装并使用某个版本
fnm install 22
fnm use 22
fnm default 22

# 进入项目目录自动切换（需在 shell 配置中开启 --use-on-cd）
echo "22" > .node-version
```

### Volta（团队协作友好）

[Volta](https://volta.sh/) 的特点是把工具版本写进 `package.json`，团队成员 `clone` 后会**自动**使用一致的 Node / 包管理器版本，无需任何手动切换。

```bash
volta install node@22
volta pin node@22 pnpm@9   # 版本会写入 package.json 的 "volta" 字段
```

### nvm

[nvm](https://github.com/nvm-sh/nvm)（macOS / Linux）与 [nvm-windows](https://github.com/coreybutler/nvm-windows)（Windows）是更早期、流行度很高的方案，许多老团队仍在使用。

```bash
nvm ls                 # 查看已安装版本
nvm install 22         # 安装指定版本
nvm use 22             # 切换版本
nvm alias default 22   # 设为默认
```

> 说明：早期文档里「手动下载 zip、改文件夹名、塞进 nvm 目录」的做法已不再推荐——现代版本管理器都能自动下载安装，国内网络慢时配置镜像即可（见下文 nrm / 镜像源）。

## 包管理器

### pnpm（推荐）

[pnpm](https://pnpm.io/) 通过全局内容寻址存储 + 硬链接，**节省大量磁盘空间、安装更快**，且默认严格的依赖隔离能避免「幽灵依赖」问题，是当前中大型项目和 Monorepo 的首选。

```bash
corepack enable          # 推荐用 Corepack 启用（见下）
pnpm install
pnpm add react           # 添加依赖
pnpm add -D vite         # 添加开发依赖
pnpm dlx create-vite app # 类似 npx，临时执行包
```

### Corepack：锁定团队包管理器版本

[Corepack](https://nodejs.org/api/corepack.html) 是 Node.js 内置的工具，配合 `package.json` 中的 `packageManager` 字段，确保**所有人用同一个包管理器版本**，杜绝「我这能装、你那报错」。

```json
{
  "packageManager": "pnpm@9.12.0"
}
```

```bash
corepack enable   # 之后 pnpm / yarn 命令会自动匹配上面声明的版本
```

### 镜像源管理（nrm）

国内网络下切换 registry 能显著提速。[nrm](https://github.com/Pana/nrm) 可在多个源之间快速切换：

```bash
pnpm add -g nrm
nrm ls            # 列出可用源
nrm use taobao    # 切换到淘宝镜像（https://registry.npmmirror.com/）
nrm add <name> <url>
```

也可以直接配置（无需额外工具）：

```bash
npm config set registry https://registry.npmmirror.com/
pnpm config set registry https://registry.npmmirror.com/
```

## 实用 CLI 工具

### npx / pnpm dlx —— 临时执行包

无需全局安装即可调用包，常用于脚手架与一次性脚本：

```bash
npx create-vite@latest my-app   # 临时下载并执行，用完即弃
pnpm dlx degit user/repo my-app # pnpm 等价用法
npx jest                        # 直接调用本地 node_modules 中的二进制
```

### degit —— 只下载仓库内容（无 git 历史）

[degit](https://github.com/Rich-Harris/degit) 用于快速拉取某个仓库（或其子目录）作为模板，不携带 `.git` 历史，比 `git clone` 更快更干净，是 `dclone` 一类工具的现代替代。

```bash
npx degit sveltejs/template my-app
npx degit user/repo/subdir my-app   # 只拉取子目录
```

### 本地静态服务器

托管当前目录为静态资源服务，调试构建产物时非常方便：

```bash
npx serve .          # 现代、零配置（推荐）
npx http-server . -p 8080
```

### tsx —— 直接运行 TS / ESM 脚本

[tsx](https://github.com/privatenumber/tsx) 基于 esbuild，可以**免编译直接运行** TypeScript 与 ESM 脚本，写工具脚本时极其顺手（替代过去 `ts-node` 的大量场景）。

```bash
npx tsx script.ts
npx tsx watch script.ts   # 文件变更自动重跑
```

### 命令行参数解析

写 CLI 工具时，用现代库解析参数与子命令：

```bash
pnpm add yargs    # 功能完整，适合复杂 CLI
pnpm add commander
pnpm add cac      # 轻量、API 简洁
```

```js
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const argv = yargs(hideBin(process.argv))
  .option("port", { alias: "p", type: "number", default: 3000 })
  .parse();
```

### cloc —— 代码量统计

快速统计某目录下各语言代码行数：

```bash
npx cloc --exclude-dir=node_modules,dist . --exclude-ext=json,html
```

### util.promisify —— callback 转 Promise

`util.promisify` 可将「最后一个参数是 callback、callback 首参为 error」的 Node API 包装为 Promise，便于在 `async/await` 中使用。注意：很多核心模块已直接提供 Promise 版（如 `node:fs/promises`），优先使用原生 Promise API。

```js
import { promisify } from "node:util";
import { exec } from "node:child_process";

const execAsync = promisify(exec);
const { stdout } = await execAsync("pnpm i -g serve");
```

## 用 npm/pnpm link 调试本地模块

当你开发一个尚未发布的包，或想在本地改动并验证某个开源库（如 Vue / React）的源码时，`link` 能把全局软链接指向本地包，免去反复 `publish`。

```bash
# 在被调试的包目录
cd my-lib
pnpm link --global         # 创建全局软链接（npm 用 npm link）

# 在使用该包的项目目录
pnpm link --global my-lib  # 让本项目的依赖指向本地 my-lib
```

> 现代替代方案：在 **Monorepo**（pnpm workspace / Turborepo）中，包之间通过 `workspace:*` 协议直接互相引用，通常无需手动 link，更适合多包协作的项目。
