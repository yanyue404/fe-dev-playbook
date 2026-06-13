---
sidebarDepth: 2
---

# 前端开发

本章介绍前端开发中高频遇到的问题与现代解决方案，欢迎补充。

## 跨域

### 什么是跨域

跨域是几乎每个前端都会遇到的问题：**协议、域名、端口三者任一不同**，浏览器就会基于同源策略（Same-Origin Policy）拦截响应。需要明确两点：

1. 这是**浏览器**为保护用户而施加的安全限制，服务端之间互相请求并无此限制。
2. 请求其实通常**已经发出、服务端也响应了**，只是浏览器拦下了返回结果（简单请求场景）。

### 解决方案

#### CORS（首选，生产标准做法）

跨域的标准解法是服务端在响应头中声明允许的来源。这是生产环境唯一规范、可控的方式：

```http
Access-Control-Allow-Origin: https://your-site.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

> 携带 Cookie 的跨域请求需同时设置 `Access-Control-Allow-Credentials: true`，且 `Allow-Origin` 不能为 `*`。非简单请求（带自定义头、PUT/DELETE 等）会先发一个 `OPTIONS` 预检请求。

#### 开发环境：本地代理（最常用）

本地开发时，最方便的是用构建工具自带的 dev server 代理：浏览器请求同源的本地地址，由 dev server 在 Node 层转发到目标接口，从而绕过浏览器限制。

```js
// Vite: vite.config.js
export default {
  server: {
    proxy: {
      "/api": {
        target: "https://api.example.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
};
```

```js
// webpack-dev-server / Vue CLI: devServer.proxy 同理
```

其本质都是「本地起一个 Node 服务转发请求」。也可以自己用 Koa / Express 写一个最小代理：

```js
import Koa from "koa";
import Router from "@koa/router";

const app = new Koa();
const router = new Router();

router.get("/api/getInfo", async (ctx) => {
  const res = await fetch("https://api.example.com/getInfo");
  ctx.body = await res.json();
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
```

#### JSONP（已过时，仅作了解）

JSONP 利用 `<script>` 标签不受同源策略限制的特性，但**只支持 GET、安全性差、错误处理弱**，现代项目不应再使用，仅在维护老系统时可能遇到：

```js
function jsonp(url, cb) {
  const script = document.createElement("script");
  window[cb] = (data) => {
    console.log(data);
    document.body.removeChild(script);
  };
  script.src = `${url}?callback=${cb}`;
  document.body.appendChild(script);
}
```

#### 浏览器插件 / 关闭安全策略

诸如「Allow CORS」之类的浏览器插件可临时绕过限制，仅适合个人本地调试，**切勿用于生产或要求团队成员安装**——它本质是降低浏览器安全防护。

## 纯前端导出文件

### 导出 Excel

无后端时，用 [SheetJS](https://github.com/SheetJS/sheetjs) 可在浏览器端直接生成 Excel。注意接口数据通常需要先整理为「对象数组」或「二维数组」：

```js
// npm install xlsx
import * as XLSX from "xlsx";

const data = [
  { name: "张三", age: 18, city: "北京" },
  { name: "李四", age: 20, city: "上海" },
];

// json_to_sheet 会自动把对象 key 作为表头
const worksheet = XLSX.utils.json_to_sheet(data);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
XLSX.writeFile(workbook, "file.xlsx");
```

如需自定义中文表头，可改用 `aoa_to_sheet`（数组的数组），首行即为表头：

```js
const aoa = [
  ["姓名", "年龄", "城市"],
  ...data.map((d) => [d.name, d.age, d.city]),
];
const ws = XLSX.utils.aoa_to_sheet(aoa);
```

### 通用文件下载（Blob）

对于 JSON、CSV、文本等，用 `Blob` + `URL.createObjectURL` 即可，无需任何依赖；记得释放对象 URL 防止内存泄漏：

```js
function download(filename, content, type = "text/plain") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

download("data.json", JSON.stringify(data, null, 2), "application/json");
```

## 代码规范与格式化

代码风格曾是程序员之间争论不休的话题，但在现代工程中，结论已经清晰：**风格之争应该交给工具自动解决，而不是靠人去吵或去记**。早期「配置文件太多、看了头大」的痛点真实存在，但答案不是「抛弃 Lint」，而是**用更少配置、更高性能的现代工具收敛它**。

资深的取舍是：**让格式化（Format）与质量检查（Lint）各司其职，并尽量零配置**。

### 推荐方案（按场景）

#### Biome —— 一体化、极速、近零配置（新项目首选）

[Biome](https://biomejs.dev/zh-cn/) 用 Rust 编写，**一个工具同时搞定格式化与 Lint**，速度比 ESLint + Prettier 快一个数量级，配置极简。它正是「省心」与「规范」之间最好的平衡点：

```bash
pnpm add -D --save-exact @biomejs/biome
pnpm biome init
pnpm biome check --write .   # 一条命令完成格式化 + 修复
```

#### ESLint + Prettier —— 生态最成熟（团队/复杂项目）

需要丰富插件生态（React Hooks 规则、import 排序、可访问性检查等）时，仍是事实标准。ESLint 9 的 **Flat Config**（`eslint.config.js`）已大幅简化配置，配合各框架官方预设几乎开箱即用：

- **Prettier** 负责格式化（缩进、引号、换行），它是「有主见、不可配太多」的，恰好终结风格之争。
- **ESLint** 负责发现潜在问题（未使用变量、错误的 Hook 依赖等），用 `eslint-config-prettier` 关闭与 Prettier 冲突的格式规则，各司其职。

```bash
pnpm add -D eslint prettier eslint-config-prettier
```

#### oxlint —— 超快的 Lint 补充

[oxlint](https://oxc.rs/docs/guide/usage/linter.html) 同样基于 Rust，零配置、速度极快，适合在大型仓库或 CI 中做快速一遍扫描，与现有 ESLint 共存。

### 落地建议

无论选哪套，**关键是接入自动化，让规范无感生效**：

1. **编辑器保存即格式化**：VS Code 安装对应插件，开启 `editor.formatOnSave`，并设置默认 formatter。
2. **提交前自动校验**：用 [husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/lint-staged/lint-staged) 只对暂存文件跑检查，快且不阻塞。
3. **CI 兜底**：在流水线里跑一遍 `lint` / `format --check`，防止不规范代码合入主干。

```json
// package.json
{
  "lint-staged": {
    "*.{js,ts,jsx,tsx,vue}": "biome check --write"
  }
}
```

> 一句话总结：不要把精力浪费在风格争论上，但也不要因噎废食地放弃工具。选一套现代化、低配置的方案（Biome 或 ESLint Flat Config + Prettier），接入「保存即格式化 + 提交前校验 + CI 兜底」，然后把时间还给真正有价值的问题。
