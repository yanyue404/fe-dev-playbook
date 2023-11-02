# Node.js

本文档将会介绍我们在开发 Node.js 应用时会用到的一些工具

## nvm

管理 Node.js 版本，通过[nvm](https://github.com/nvm-sh/nvm)我们可以同时安装/切换不同的 Node.js 版本

### 怎样使用 nvm

步骤：

1. **卸载之前的 node 后安装** nvm ,使用 nvm-setup.exe 安装版，直接双击运行，同意协议后点击下一步下一步**按默认目录**安装完成；

2. 进入安装的位置：C:\Users\自己的账户名\AppData\Roaming\nvm，下载小组常用 node 包库版本，解压后复制内容放置于 nvm 文件夹内根目录；

```bash
v8.11.2
v12.18.3
v14.18.2
v16.16.0
```

3. 切换 node 版本，以管理员方式运行 cmd （命令提示符）打开黑窗口，命令如下：

```bash
# 查看 nvm 可用 node 版本列表
nvm list

# 切换 node 版本为某个版本
nvm use 16.16.0
```

使用图例：

4. 想要更多版本，访问https://registry.npmmirror.com/binary.html 地址，可用于 nvm 管理的 node 压缩文件如下所示，下载好 node-v14.18.2-win-x64.zip 解压后修改文件夹名称为 v 打头的版本号复制于 nvm 包管理目录即可使用。

## nrm

使用[nrm](https://github.com/Pana/nrm)可以让我们来切换不同的 npm 源而不用单独安装 cnpm 之类的库

### 安装 nrm

```bash
$ npm install -g nrm
```

### 使用命令

```bash
$ nrm ls # 列出当前支持切换的源

PS C:\Users\Administrator> nrm ls
  npm ---------- https://registry.npmjs.org/
  yarn --------- https://registry.yarnpkg.com/
  tencent ------ https://mirrors.cloud.tencent.com/npm/
  cnpm --------- https://r.cnpmjs.org/
* taobao ------- https://registry.npmmirror.com/
  npmMirror ---- https://skimdb.npmjs.com/registry/

$ nrm use taobao # 使用taobao的源作为默认的npm源

# 新增 npm 源

$ nrm add <registry> <url>        Add one custom registry
$ nvm use <registry>
```

## 实用模块

下面来介绍一些实用的 Node.js 模块

### dclone

[dclone](https://github.com/zhangyuang/dclone)用来下载某个特定的 github 仓库的文件夹，而不是下载整个项目，可以缩短你的下载时间

```bash
$ npm i -g dclone
$ dclone https://github.com/ykfe/egg-react-ssr/tree/dev/example/ssr-with-loadable
```

### http-server

使用[http-server](https://www.npmjs.com/package/http-server)我们可以快速的创建一个本地 http server 服务，并且托管我们当前目录作为静态资源文件夹而不用特地去用 Node.js 框架来搭建一个静态资源服务

#### 如何使用 http-server

```bash
$ npm install http-server -g # 安装http-server模块
$ http-server . -p 8080 # 监听8080端口，以当前目录作为静态资源目录
```

### npx

使用 npx 来让我们可以方便的调用项目的依赖模块

```bash
$ npx jest # 直接调用node_modules中的jest而不需要手动编写npm script
$ npx create-react-app app # npx 将create-react-app下载到一个临时目录，使用以后再删除。使得你不需要全局安装
```

### optimist

用于解析命令行参数

```js
var argv = require("optimist").argv;

if (argv.rif - 5 * argv.xup > 7.138) {
  console.log("Buy more riffiwobbles");
} else {
  console.log("Sell the xupptumblers");
}
```

### yargs

用于开发命令行工具

![](https://raw.githubusercontent.com/yargs/yargs/master/screen.png)

### cloc

使用 cloc 快速统计某文件夹下代码的数据, 更多参考资料查看[代码统计利器 Cloc](https://www.hi-linux.com/posts/4004.html)

```bash
$ npm i -g cloc
$ cloc --exclude-dir=node_modules . --exclude-ext=json,html # 统计文件类型，排除node_modules,排除json，html文件
```

![cloc](https://img.alicdn.com/tfs/TB1kYu2qND1gK0jSZFsXXbldVXa-1136-950.jpg)

### promisify

[util.promisify](http://nodejs.cn/api/util.html#util_util_promisify_original)是 Node.js 的官方 API，使用该 API 我们可以将 callback 形式的 Node.js API 包装为 Promise 的形式,只要符合最后一个参数是 callback，并且 callback 第一个参数是错误处理的 API 都可以通过 promisify 来包装

```js
const { promisify } = require("util");
const { exec } = require("child_process");
const execWithPromise = promisify(exec);
const installServer = async () => {
  const { stdout } = await execWithPromise(`npm i -g http-server`);
};
```

### mdv

[mdv](https://www.npmjs.com/package/mdv)是一个用来校验 markdown 语法的 npm 模块，此模块检测的语法错误类型包括七项：插入图片时是否添加 Alt 标签，超链接是否包含链接名称，页面内跳转时是否缺失锚点，页面内跳转的地址是否包含#，锚点是否包含#，锚点是否重复定义，json、xml 语法是否解析失败。

#### 安装使用

```bash
$ npm i -g mdv
$ mdv xxx.md -d # 检测md文件语法
$ mdv xxx.md -s # 根据md生成html
```

#### 错误类型

- 重复链接 - `duplicatedAnchors[]`
- 锚点地址错误 - `anchorsWithHash[]`
- 空的链接 - `anchorsWithEmptyText[]`
- img 标签缺少 alt 属性 tag - `imagesWithMissingAlt[]`
- `yaml`, `json`, `xml` or `abnf` 语法解析错误 - `nonParsingExamples[]`

## 使用 npm link 调试模块

熟练的使用 npm link 可以帮助我们本地调试任何开源项目，当我们的一个项目还没有发布到 npmjs.com 想在本地测试时，或者当我们想修改 React/Vue 的源码想在本地测试效果时，我们都需要使用 npm link 来进行测试。npm link 类似于 Linux 中的软链接，简单理解可以理解为一个快捷方式。使用方式：

```
$ cd vue // 进入本地clone下来的vue文件夹
$ npm link // 如果没有全局安装过vue 此时会创建全局node_modules下的一个软链接vue指向本地clone的vue入口文件
$ npm link vue // 在需要用调试vue模块的应用执行该命令会将当前应用的node_modules/vue指向全局node_modules/vue软链接
```

![](https://gw.alicdn.com/tfs/TB1iEl0XKH2gK0jSZFEXXcqMpXa-1450-876.jpg)
![](https://gw.alicdn.com/tfs/TB1QBh0XQY2gK0jSZFgXXc5OFXa-1450-860.jpg)
