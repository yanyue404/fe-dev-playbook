# 前端开发小提示

本章节记录一些前端开发中的小 tips 欢迎补充

## 禁用 export default

使用 export default 会导致你在混合使用 cjs+esm 的时候加载模块极易出现错误。详细分析文章参考
[球球你们，别再用 export default 了。](https://zhuanlan.zhihu.com/p/97737035)
[深入解析 ES Module（二）：彻底禁用 default export](https://zhuanlan.zhihu.com/p/97335917)

## 使用 map 代替 if else

代码里出现过多的 if else 无疑可读性非常差

```js
// 优化前
function getRes(path) {
  if (path === "/") {
    return "index";
  } else if (path === "/news") {
    return "news";
  } else {
    return "404";
  }
}
// 优化后

const map = {
  "/": "index",
  "/news": "news",
};

function getRes(path) {
  return map[path] || "404";
}
```
