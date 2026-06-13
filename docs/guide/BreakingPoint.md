---
sidebarDepth: 2
---

# 断点调试

1 小时写应用，6 小时在 debug——能否快速定位问题，直接决定了开发效率。很多人调试时仍只靠 `console.log`，这对简单逻辑够用，但随着应用复杂度上升会变得低效且难以追踪上下文。**断点调试**能让你在暂停点查看完整调用栈、作用域变量、并逐步执行，是必须掌握的核心技能。

> TypeScript / 现代构建产物的调试依赖 **Source Map**，请确保开发环境开启了 sourcemap（Vite 默认开启）。如何调试 TS 文件可参考 [Ts 章节](http://fe.surge.sh/guide/Ts.html)。

## 调试场景概览

| 场景 | 方式 | 说明 |
| --- | --- | --- |
| 浏览器中的前端代码 | Chrome DevTools / VS Code | 调试页面 JS / TS、框架组件 |
| 直接运行的 Node 脚本 | Launch（启动调试） | VS Code 直接启动并断点 |
| 已启动的 Node 进程 | Attach（附加调试） | 附加到正在运行的服务（如 dev server） |

现代前端开发中，**99% 的场景只需掌握 VS Code 的两种方式：JavaScript Debug Terminal 与 Auto Attach**。下面从原理到实践依次介绍。

## 浏览器端调试（Chrome DevTools）

打开 DevTools（`F12`）→ **Sources** 面板，几种常用打断点的方式：

- 在源码行号处点击设置**行断点**；配合 Source Map 可直接在 `.ts` / `.vue` 源码上打断点。
- 代码中写 `debugger;` 语句，命中时自动暂停。
- **条件断点**：右键行号 → Add conditional breakpoint，仅在表达式为真时暂停（如 `id === 42`），避免循环里反复手动跳过。
- **DOM / 事件 / XHR 断点**：在 Elements、Sources 右侧面板中，可对「DOM 变化」「特定事件」「网络请求」设断点——排查「是谁改了这个节点 / 触发了这个请求」时极其有用。
- **Logpoints（日志点）**：不暂停、只在命中时打印，等价于「不污染源码的 console.log」。

## Node.js 调试

### node --inspect + Chrome DevTools

Node 内置 Inspector 协议，可借助 Chrome 调试：

```bash
node --inspect break.js        # 启用调试
node --inspect-brk break.js    # 启用调试并在首行暂停（推荐，便于在执行前打断点）
```

打开 `chrome://inspect`，点击对应目标的 **inspect** 即可进入熟悉的 DevTools 界面。

### node inspect（终端内调试）

无图形界面（如远程服务器）时的兜底方案，纯命令行交互：

```bash
node inspect break.js
```

常用命令：`n`（单步）、`c`（继续到下一断点）、`s`（步入）、`o`（步出）、`repl`（进入交互环境查看变量）。日常优先用 VS Code，了解此法即可。

## VS Code 调试（推荐）

VS Code 是前端调试的第一工具，其内置的 JavaScript 调试器开箱即用、能力强大。

### 方式一：JavaScript Debug Terminal（最省心）

打开命令面板（`Ctrl/Cmd + Shift + P`）→ 运行 **「Debug: JavaScript Debug Terminal」**，在这个特殊终端里**像平时一样运行任何命令**，VS Code 会自动附加调试器并命中你在编辑器里打的断点：

```bash
# 在 JavaScript Debug Terminal 中直接运行
node script.js
npm run dev
npx vitest
```

无需编写任何配置文件，是日常调试 npm scripts、测试、CLI 脚本的首选。

### 方式二：Auto Attach（自动附加）

命令面板 → **「Debug: Toggle Auto Attach」**，开启后**普通集成终端**里运行的 Node 进程也会被自动附加调试器，适合「已经习惯用普通终端跑命令」的工作流。

### 方式三：launch.json（需要可复用、可共享的配置时）

当调试入口固定、或希望把配置随项目提交、与团队共享时，使用 `.vscode/launch.json`。`F5` 启动调试。

**启动调试（Launch）**——由 VS Code 启动并调试一个脚本：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug current file",
      "program": "${file}",
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

**附加调试（Attach）**——附加到已用 `--inspect` 启动的进程：

```json
{
  "type": "node",
  "request": "attach",
  "name": "Attach to process",
  "port": 9229
}
```

启动服务时带上 inspect 端口，再用上面的配置附加即可：

```bash
node --inspect-brk server.js   # 默认监听 9229 端口
```

## 断点操作面板

调试暂停后，控制按钮从左到右通常为：

- **继续（Continue, F5）**：执行到下一个断点。
- **单步跳过（Step Over, F10）**：执行当前行，不进入函数内部。
- **单步步入（Step Into, F11）**：进入当前行所调用函数的内部。
- **单步步出（Step Out, Shift+F11）**：执行完当前函数并返回调用处。
- **重启 / 停止**：重新开始或结束调试会话。

配合左侧的 **变量（Variables）**、**监视（Watch）**、**调用堆栈（Call Stack）** 面板，即可完整掌握运行时状态。

## 小结

- 浏览器代码用 **Chrome DevTools**，善用条件断点、DOM/XHR 断点与 Logpoints。
- Node 与脚本调试，优先 VS Code 的 **JavaScript Debug Terminal** 或 **Auto Attach**，几乎零配置。
- 需要可共享配置时再写 `launch.json`，理解 `launch` 与 `attach` 的区别即可。

想深入了解调试原理，可参考 [node-debug-tutorial](https://i5ting.github.io/node-debug-tutorial/#1) 与 [VS Code 官方调试文档](https://code.visualstudio.com/docs/editor/debugging)。
