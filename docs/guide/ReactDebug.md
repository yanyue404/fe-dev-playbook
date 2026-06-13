---
sidebarDepth: 2
---

# React 调试技巧（黑科技篇）

> 本章面向熟悉 React 源码与 Fiber 架构、追求开发提效与调试提效的进阶开发者。覆盖 React DevTools / Fiber 控制台访问 / Redux·Zustand 数据流 / SourceMap 脱敏 / Next.js 同构 hydration / Proxy 劫持调用栈 / 重渲染定位等场景。
>
> 一句话原则：**别再到处 `console.log(props)`，要让 React 主动告诉你"这个组件为什么又渲染了、这个状态是谁改的"。**

[[toc]]

## 一、React DevTools 进阶用法

### Components / Profiler 两大面板

- **Components**：组件树、props/state/hooks 实时编辑、`source` 跳转到定义
- **Profiler**：录制一次交互，看每个组件的渲染耗时（火焰图 / 排序图），定位渲染瓶颈

### 必开的两个开关

- ⚙ → **Highlight updates when components render**：渲染时高亮组件，**过度渲染**肉眼可见
- 组件右侧 hooks 区可直接双击修改 state，无需改代码验证 UI 分支

### 找出"为什么重新渲染"

Profiler 设置里勾选 **Record why each component rendered**。录制后选中某次 commit，DevTools 会标注该组件本次渲染原因：`Props changed (xxx)` / `Hook changed` / `Parent rendered`，直接锁定罪魁。

### 生产环境 Profiling

生产构建默认去掉了 Profiler。要测线上性能，用 profiling 版本构建：

```bash
# CRA
npx react-scripts build --profile
# 或在 bundler 里 alias
# react-dom$ -> react-dom/profiling, scheduler/tracing -> scheduler/tracing-profiling
```

## 二、控制台直接访问 Fiber（核心黑科技）

线上没装 DevTools 时，用原生方式拿到组件内部数据。

### `$r`：DevTools 选中组件的快捷引用

在 Components 面板选中一个组件后，控制台输入 `$r` 即拿到该组件实例（class 组件是 this，函数组件是其 props/hooks 信息）：

```js
$r.props;
$r.state; // class 组件
$r.setState({ open: true }); // class 组件可直接驱动
```

### 从 DOM 反查 Fiber：`__reactFiber$xxx`

Elements 选中节点后，`$0` 是该 DOM。React 在 DOM 上挂了随机后缀的 fiber 引用：

```js
function getFiber(dom = $0) {
  const key = Object.keys(dom).find(
    (k) => k.startsWith('__reactFiber$') || k.startsWith('__reactInternalInstance$')
  );
  return dom[key];
}

function getProps(dom = $0) {
  const key = Object.keys(dom).find((k) => k.startsWith('__reactProps$'));
  return dom[key];
}

const fiber = getFiber();
fiber.memoizedProps; // 当前 props
fiber.memoizedState; // hooks 链表（函数组件）/ state（class）
fiber.return; // 父 fiber，向上遍历组件树
fiber.type; // 组件函数/类本身
```

把上面两个函数存成 DevTools Snippet，排查线上问题时一键可用。

### 遍历 hooks 链表

函数组件的 state 是 `memoizedState` 链表（`.next` 串联）：

```js
let hook = getFiber().memoizedState;
const states = [];
while (hook) {
  states.push(hook.memoizedState);
  hook = hook.next;
}
console.log('该组件所有 hook 状态：', states);
```

## 三、状态管理数据流调试（Redux / Zustand / Jotai）

### Redux DevTools 时间旅行

Redux + `redux-devtools-extension` 是数据流调试的黄金标准：

- 每个 action 留痕，可"跳回"任一历史 state（time travel）
- **Dispatcher**：手动派发任意 action 验证 reducer
- **action 过滤 / diff**：只看状态变化的字段
- 支持导入导出 action 序列，**把线上复现步骤导出给同事一键重放**

```js
import { configureStore } from '@reduxjs/toolkit';
// RTK 默认集成 devtools；手写 store 时：
import { composeWithDevTools } from '@redux-devtools/extension';
const store = createStore(reducer, composeWithDevTools());
```

### Zustand：subscribe + devtools 中间件

```js
import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';

const useStore = create(
  devtools(
    subscribeWithSelector((set) => ({
      /* ... */
    }))
  )
);

// 精准监听某字段变化并打调用栈
useStore.subscribe(
  (s) => s.token,
  (token) => {
    console.warn('token 变化', token);
    console.trace();
  }
);

// 开发期暴露到全局，控制台随时读改
if (import.meta.env.DEV) window.__store = useStore;
```

## 四、Source Map 配置与脱敏调试

### 各脚手架配置

```js
// Vite
export default { build: { sourcemap: 'hidden' } }; // true | 'inline' | 'hidden'

// Next.js（next.config.js）
module.exports = { productionBrowserSourceMaps: true };

// CRA
// GENERATE_SOURCEMAP=false 关闭；生产脱敏建议构建后单独保管 .map
```

### devtool / 模式选择

| 取值 | 场景 |
| --- | --- |
| `eval-cheap-module-source-map` | 开发，重建快 |
| `source-map` | 生产可调试（源码可被还原） |
| `hidden-source-map` | **脱敏推荐**：生成 map 但 bundle 不引用，map 上传 Sentry/内网 |
| `nosources-source-map` | 只保留行列映射，不含源码内容 |

### 基于打包后脱敏源码的调试

线上只有压缩混淆的 `main.[hash].js`，`.map` 单独保存。还原现场：

1. Sources 面板右键压缩文件 → **Add source map…**
2. 填入内网 / 本地 `.map` URL
3. 断点、调用栈、原始变量名全部还原

### React 压缩错误码反查

生产环境 React 把错误信息压成 `Minified React error #418`。直接打开官方 Error Decoder，或在 URL 里替换：

```
https://react.dev/errors/418?args[]=...
```

即可看到完整错误描述（如 #418 即 hydration text mismatch）。

### Local Overrides：不发版改线上代码

Sources → Overrides → 选本地目录授权。之后线上任意 JS/CSS 可在 DevTools 直接编辑保存，刷新即用本地修改版替换线上文件，**无需发版即可验证修复**。

## 五、Next.js 同构（SSR / Hydration）错误的分析与定位

错误本质：**服务端渲染的 HTML 与客户端首次 render 的结果不一致**，控制台报 `Hydration failed` / `Text content does not match server-rendered HTML`。

### 常见根因清单

- `typeof window !== 'undefined'` 分支在两端产出不同结构
- `Date.now()` / `Math.random()` / `toLocaleString()`（时区、locale）两端不同
- `localStorage` / 浏览器扩展注入的属性导致首屏差异
- 服务端取数与客户端首屏占位不一致
- 在 HTML 里嵌套了非法标签（`<p>` 里放 `<div>`），React 修正后两端不一致

### 定位手段

```jsx
// 1. 仅客户端逻辑放 useEffect，避免 SSR 阶段执行
useEffect(() => {
  // window / localStorage / 第三方库初始化
}, []);

// 2. 两端会不一致的内容，明确告知 React 容忍差异
<time suppressHydrationWarning>{new Date().toString()}</time>;

// 3. 纯客户端组件用动态导入禁用 SSR
import dynamic from 'next/dynamic';
const ClientOnly = dynamic(() => import('./Chart'), { ssr: false });
```

调试服务端：

```bash
# 带 inspector 启动，chrome://inspect 连接断点
NODE_OPTIONS='--inspect' next dev
```

> 服务端错误打印在**运行 `next dev` 的终端**而非浏览器，先看 Node 日志。难定位时用 `dynamic(..., { ssr:false })` 对页面区块逐块"关掉 SSR"做二分，哪块关掉就不报，问题就在那块。

### App Router / RSC 提示

React Server Components 报错堆栈可能跨服务端/客户端边界。React 19 提供 `captureOwnerStack()`（开发期）拿到组件 owner 调用栈，比原生堆栈更贴近组件树；同时注意 `'use client'` 边界两侧的数据序列化限制。

## 六、Proxy 劫持数据流：抓出"谁偷偷改了我的数据"

处理"全局状态/某字段被莫名修改、调用栈追不到"的终极手段——`Proxy` 包住目标，在 `set` 拦截里 `console.trace()` / `debugger`，写入即停，改动点一目了然。

### 通用劫持器

```js
function spy(target, label = 'spy') {
  return new Proxy(target, {
    set(obj, prop, value, receiver) {
      console.groupCollapsed(`✍ ${label}.${String(prop)} =`, value);
      console.trace('改动点调用栈');
      console.groupEnd();
      // debugger; // 想强行停在改动点就取消注释
      return Reflect.set(obj, prop, value, receiver);
    },
  });
}

window.appConfig = spy(window.appConfig, 'appConfig');
```

### 只盯某一属性（精准低噪）

```js
function watchProp(obj, key) {
  let val = obj[key];
  Object.defineProperty(obj, key, {
    get() {
      return val;
    },
    set(next) {
      console.warn(`⚠ ${key} 被改为`, next);
      console.trace();
      // debugger;
      val = next;
    },
    configurable: true,
  });
}
```

### 拦截 `setState` / `dispatch` 看是谁触发

class 组件可临时包裹 `setState`，函数组件可包裹 dispatch：

```js
const _setState = this.setState.bind(this);
this.setState = (...args) => {
  console.trace('setState 调用方', args);
  return _setState(...args);
};
```

> 这套"Proxy/劫持 + `console.trace`"思路通用：排查谁改了 `localStorage`、谁覆盖了全局函数、谁触发了某次 dispatch 等"莫名其妙被改"的问题都适用。

## 七、重渲染与性能定位

### why-did-you-render

开发期自动在控制台打印"某组件本可避免的重渲染及原因"：

```js
// wdyr.js（在入口最顶部 import）
import React from 'react';
if (process.env.NODE_ENV === 'development') {
  const wdyr = require('@welldone-software/why-did-you-render');
  wdyr(React, { trackAllPureComponents: true });
}
```

### React Scan

零侵入工具，给页面叠加渲染高亮层，直接看到哪些组件在频繁重渲染：

```html
<script src="https://unpkg.com/react-scan/dist/auto.global.js"></script>
```

### 善用 React DevTools Profiler 的火焰图

录制交互 → 看 "Ranked" 视图按耗时排序 → 对最贵的组件做 `memo` / `useMemo` / 拆分 state。

## 八、其他高频提效技巧

### 条件断点 / 日志断点（Logpoint）

Sources 行号右键：

- **Conditional breakpoint**：`user.id === 42` 才停，列表渲染调试神器
- **Logpoint**：`'render', props.id` 不暂停不改代码就打印，告别"加 log → 重新构建"

### Blackboxing 框架代码

右键 `react-dom.development.js` / `node_modules` → **Add script to ignore list**，单步调试不再跳进 React 内部，调用栈更干净。

### 全局异常兜底

```jsx
// Error Boundary 捕获渲染期异常，拿到组件栈
class Boundary extends React.Component {
  componentDidCatch(error, info) {
    console.error(error, info.componentStack); // componentStack 指出出错组件路径
  }
  render() {
    return this.props.children;
  }
}

window.addEventListener('unhandledrejection', (e) =>
  console.error('未处理的 Promise 拒绝', e.reason)
);
```

## 小结

| 场景 | 首选武器 |
| --- | --- |
| 看组件树/props/hooks | React DevTools（Components/Profiler） |
| 线上无 DevTools | 控制台 Fiber：`$r` / `__reactFiber$` |
| 重渲染过多 | Profiler「why rendered」/ why-did-you-render / React Scan |
| 状态被改不知源头 | Proxy 劫持 / 包裹 setState + `console.trace` |
| Redux/Zustand 数据流 | Redux DevTools 时间旅行 / `subscribe` |
| 线上压缩代码调试 | hidden-source-map + Add source map + Local Overrides + Error Decoder |
| SSR hydration 报错 | 看 Node 日志 + `ssr:false` 二分 + `suppressHydrationWarning` + `--inspect` |
| 循环/高频代码 | 条件断点 / Logpoint |

记住核心心法：**让 React 主动汇报"渲染原因 + 改动点 + 调用栈"，而不是人肉去猜。**
