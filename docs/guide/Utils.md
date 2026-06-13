---
sidebarDepth: 2
---

# Utils

本章介绍一些实用的效率工具与开发者网站，帮你从繁琐的鼠标操作中解放出来。工具尽量给出**跨平台**与**仍在活跃维护**的选择——这比「某个停更的明星软件」更重要。

## 窗口管理

把窗口快速吸附到屏幕一半、四分之一或全屏，是高效多任务的基础。

- **macOS**：[Rectangle](https://rectangleapp.com/)（开源、免费，Spectacle 的官方推荐继任者）；系统自带的「窗口贴靠」也已可用。
- **Windows**：内置 **Snap Layouts**（`Win` + `Z`），或安装 [PowerToys](https://learn.microsoft.com/windows/powertoys/) 的 **FancyZones** 自定义网格布局。

> 注：早期流行的 Spectacle 已停止维护，新机器请直接用 Rectangle 或系统原生方案。

## 效率启动器

用快捷键唤起、模糊搜索一切（应用、文件、剪贴板历史、计算、翻译……），是减少鼠标操作的利器。

- **macOS**：[Raycast](https://www.raycast.com/)（现代、可扩展，已基本取代 Alfred 的地位）。
- **Windows**：[PowerToys Run](https://learn.microsoft.com/windows/powertoys/run)（`Alt` + 空格）。

## API 文档速查

- [DevDocs](https://devdocs.io/)：免费、开源、可离线，聚合了几乎所有主流语言与框架的官方文档，浏览器内即可全文检索。
- [Dash](https://kapeli.com/dash)（macOS）/ [Zeal](https://zealdocs.org/)（Windows / Linux）：离线 API 文档浏览器，可在 VS Code 中通过插件用快捷键直接查询当前光标处的 API。

## 抓包与网络代理

抓包用于查看、分析、篡改网络请求，常见场景包括：调试移动端请求、把线上资源代理到本地（Map Local）、模拟接口返回等。

### 工具选择

- [Whistle](https://wproxy.org/whistle/)：基于 Node.js 的跨平台代理工具，前端友好、规则即文本、可版本化，**本手册有独立章节专门介绍，推荐前端优先使用**。
- [Proxyman](https://proxyman.io/)（macOS，体验现代）/ [Charles](https://www.charlesproxy.com)（跨平台，老牌经典）：功能强大的 GUI 抓包工具。
- 浏览器内调试：Chrome DevTools 的 **Network** 面板配合 **Overrides**（本地覆盖响应）已能覆盖很多前端调试需求，无需额外软件。

### 抓包移动端 HTTPS 请求（通用流程）

无论使用 Charles 还是 Proxyman，移动端 HTTPS 抓包的核心步骤是一致的：

1. **同一局域网**：手机与电脑连接同一 WiFi。
2. **设置代理**：手机 WiFi → HTTP 代理 → 手动 → 填写电脑 IP 与抓包工具端口（Charles 默认 `8888`）。
   - 查看本机 IP：macOS / Linux 用 `ifconfig`（或 `ip addr`），Windows 用 `ipconfig`。
3. **安装并信任根证书**：电脑端先安装抓包工具的根证书；移动端访问工具提供的证书地址下载安装，并在系统设置里**手动信任**该根证书（iOS 还需在「关于本机 → 证书信任设置」中开启）。
4. **开启 SSL 代理**：在工具中配置需要解密的域名（如 `*.example.com`），即可看到 HTTPS 请求明文。

> 提示：iOS 14+ 与 Android 7+ 对用户证书的信任策略更严格，App 若启用了证书绑定（SSL Pinning），普通抓包将无法解密——这是设计如此，属正常现象。

### Map Local：把线上请求指向本地文件

当需要在线上环境验证本地改动时，可将某个线上资源重定向到本地文件：在 Charles 的 `Tools` → `Map Local` 中，配置「源地址（Map From）」与「本地目标文件（Map To）」即可。这样访问 `https://cdn.example.com/app.js` 时，实际加载的是你本地的 `app.js`。

> Chrome DevTools 的 **Sources → Overrides** 提供了等价能力，无需安装代理软件，适合纯前端资源的临时覆盖。

## 实用网站

**兼容性与标准**

- [Can I use](https://caniuse.com/)：查询 Web API / CSS 特性的浏览器兼容性
- [MDN Web Docs](https://developer.mozilla.org/)：最权威的 Web 平台文档
- [Baseline](https://web.dev/baseline)：判断某特性是否已在主流浏览器「普遍可用」

**性能与质量**

- [PageSpeed Insights](https://pagespeed.web.dev/)：基于 Lighthouse 的网页性能与体验评分
- [WebPageTest](https://www.webpagetest.org/)：更细粒度的多地区、多设备性能瀑布分析

**CSS / 调试小工具**

- [Autoprefixer 在线版](https://autoprefixer.github.io/)：为 CSS 自动补齐浏览器前缀
- [regex101](https://regex101.com/) / [Regexper](https://regexper.com)：正则表达式调试与可视化
- [Transform](https://transform.tools/)：JSON↔TS、CSS↔JS 等各类格式互转

**在线编辑 / 复现**

- [StackBlitz](https://stackblitz.com/)：浏览器内运行真实 Node + Vite 项目，最适合复现 bug
- [CodeSandbox](https://codesandbox.io/) / [CodePen](https://codepen.io/) / [JSFiddle](https://jsfiddle.net/)：在线代码片段与 Demo
