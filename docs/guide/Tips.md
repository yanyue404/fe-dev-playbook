---
sidebarDepth: 2
---

# 前端开发小提示

本章记录一些日常开发中「小而美」的实践——可读性、可维护性与工程化的细节。欢迎补充。

## 用查找表代替冗长的 if / else

过多的 `if / else` 或 `switch` 会让分支逻辑难以阅读和扩展。用对象映射（查找表）让数据与逻辑分离：

```js
// 优化前
function getRes(path) {
  if (path === "/") return "index";
  else if (path === "/news") return "news";
  else return "404";
}

// 优化后
const routeMap = {
  "/": "index",
  "/news": "news",
};
const getRes = (path) => routeMap[path] ?? "404";
```

当条件更复杂（区间、组合条件）时，用 `Map` 并以判断函数作为 key，可读性同样很好：

```js
const actions = new Map([
  [({ type }) => type === "a", () => "结果 A"],
  [({ type }) => type === "b", () => "结果 B"],
]);

function run(state) {
  for (const [match, handler] of actions) {
    if (match(state)) return handler();
  }
}
```

## 善用现代语法收敛防御性代码

ESNext 提供了一批让代码更短、更安全的语法，优先使用它们而非手写判断：

```js
// 可选链：避免逐层判空
const city = user?.address?.city;

// 空值合并：只在 null / undefined 时取默认值（区别于 ||，不会误伤 0、'' 、false）
const count = props.count ?? 10;

// 逻辑赋值
options.timeout ??= 3000;

// 数组兜底取末位
const last = list.at(-1);
```

## 优先使用具名导出，谨慎使用 export default

`export default` 在 CJS / ESM 混用、以及做 tree-shaking、重命名、IDE 自动导入时都更容易出问题。具名导出更利于静态分析与重构。

```js
// 推荐
export function request() {}
export const VERSION = "1.0.0";

// 谨慎
export default function () {}
```

延伸阅读：[球球你们，别再用 export default 了](https://zhuanlan.zhihu.com/p/97737035) · [深入解析 ES Module（二）](https://zhuanlan.zhihu.com/p/97335917)

## 不可变更新，避免直接修改入参 / 状态

在 React、Vuex/Pinia 等场景中，直接 mutate 对象常导致难以追踪的 bug。用展开运算符或不可变写法生成新对象：

```js
// 不推荐：直接改原对象
state.user.name = "new";

// 推荐：返回新对象
const next = { ...state, user: { ...state.user, name: "new" } };
```

## 用 Set / Map 处理去重与计数

```js
// 数组去重
const unique = [...new Set(list)];

// 计数 / 分组（Object.groupBy 已被现代运行时广泛支持）
const grouped = Object.groupBy(users, (u) => u.role);
```

## 异步：优先 async/await，注意并发

串行 `await` 常是性能杀手。相互独立的请求应并发执行：

```js
// 串行：耗时 = a + b
const a = await fetchA();
const b = await fetchB();

// 并发：耗时 = max(a, b)
const [a, b] = await Promise.all([fetchA(), fetchB()]);

// 只要有一个失败也不影响其余结果时
const results = await Promise.allSettled([fetchA(), fetchB()]);
```

## 用 AbortController 取消请求与超时

避免组件卸载后仍在更新状态、或请求无限挂起：

```js
const controller = new AbortController();
const timer = setTimeout(() => controller.abort(), 5000);

try {
  const res = await fetch("/api", { signal: controller.signal });
} finally {
  clearTimeout(timer);
}
```

## 高频操作做防抖 / 节流

输入搜索、滚动、resize 等事件应控制触发频率。可直接用 `lodash-es` 的 `debounce` / `throttle`，按需引入利于打包体积。

```js
import { debounce } from "lodash-es";
const onSearch = debounce((kw) => fetchList(kw), 300);
```

## 小心浮点数精度

```js
0.1 + 0.2 === 0.3; // false
// 金额等场景：以「分」为单位用整数计算，或使用 decimal.js / big.js
```
