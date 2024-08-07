# VS Code

> https://github.com/yanyue404/blog/issues/185

VS Code 毫无疑问是目前最强大的编辑器，没有之一，凭借自身丰富的插件体系以及优秀的断点调试能力迅速成为最火热的编辑器。

## 目录

- [1\. Setting.json](#Setting.json)
- [2\. Plugins](#Plugins)
- [3\. Keybindings.json](#Keybindings.json)
- [4\. 快捷命令](#快捷命令)
- [5\. 相关资源](#%E7%9B%B8%E5%85%B3%E8%B5%84%E6%BA%90)
- [6. jsconfig.json](#jsconfig.json)
- [7\. 参考](#%E5%8F%82%E8%80%83)

## Setting.json

```js
const settting = {
  // ! 大部分情况不需要自动格式化
  // "css.validate": false,
  // "less.validate": false,
  // "scss.validate": false,
  "editor.formatOnSave": true,
  "eslint.enable": true,
  "stylelint.enable": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true,
  },
  // ! 基本外观配置项 -- start
  "breadcrumbs.enabled": true,
  "editor.fontSize": 13.5,
  "editor.tabSize": 2,
  "files.autoSave": "afterDelay",
  "editor.cursorStyle": "block",
  "editor.fontFamily": "Fira Code",
  "editor.fontLigatures": true,
  "editor.lineHeight": 21,
  "editor.lineNumbers": "on",
  "editor.minimap.enabled": true,
  "editor.matchBrackets": "always",
  "editor.rulers": [120],
  "editor.snippetSuggestions": "top", // 注释改成绿色
  "editor.tokenColorCustomizations": {
    comments: "#009933",
  },
  "workbench.startupEditor": "none",
  "emmet.triggerExpansionOnTab": true,
  "emmet.includeLanguages": {
    "vue-html": "html",
    javascript: "javascriptreact",
    wxml: "html",
  },
  "emmet.syntaxProfiles": {
    "vue-html": "html",
    javascript: "javascriptreact",
  },
  "view-in-browser.customBrowser": "chrome",
  "workbench.colorTheme": "Solarized Dark",
  "workbench.sideBar.location": "left",
  "workbench.iconTheme": "vscode-icons",
  // 将当前行代码高亮显示
  "workbench.colorCustomizations": {
    "editor.lineHighlightBackground": "#135564",
    "editor.lineHighlightBorder": "#135564",
  },
  "explorer.confirmDelete": true,
  "editor.multiCursorModifier": "ctrlCmd",
  // 在使用搜索功能时，将这些文件夹/文件排除在外
  "search.exclude": {
    "**/node_modules": true,
    "**/logs": true,
    "package-lock.json": true,
    "yarn.lock": true,
  },
  // 这些文件将不会显示在工作空间中
  "files.exclude": {
    "**/.git": true,
    "**/.svn": true,
  },
  // 支持 import 别名 @
  "path-autocomplete.pathMappings": {
    "@": "${folder}/src",
  },
  // Guides 插件设置缩进参考
  "guides.normal.color.dark": "rgba(91, 91, 91, 0.6)",
  "guides.normal.color.light": "rgba(220, 220, 220, 0.7)",
  "guides.active.color.dark": "rgba(210, 110, 210, 0.6)",
  "guides.active.color.light": "rgba(200, 100, 100, 0.7)",
  "guides.active.style": "dashed",
  "guides.normal.style": "dashed",
  "guides.stack.style": "dashed",
  // todo-tree
  "todo-tree.general.tags": ["TODO:", "FIXME:", "NOTE:"],
  "todo-tree.highlights.defaultHighlight": {
    gutterIcon: true,
  },
  "todo-tree.highlights.customHighlight": {
    "TODO:": {
      foreground: "#fff",
      background: "#ffbd2a",
      iconColour: "#ffbd2a",
    },
    "FIXME:": {
      foreground: "#fff",
      background: "#f06292",
      icon: "flame",
      iconColour: "#f06292",
    },
    "NOTE:": {
      foreground: "#fff",
      background: "#f06292",
      icon: "flame",
      iconColour: "#f06292",
    },
  },
  // ! 基本外观配置项 -- end
  // ? 自定义 git
  "git.ignoreMissingGitWarning": true,
  "git.autofetch": true,
  "git.confirmSync": false,
  // 如果你的VSCode安装了Vetur插件，以下配置是需要的
  // 这能阻止Vetur对Vue代码进行检测，提高性能
  // "vetur.format.enable": false,
  // "vetur.validation.template": false,
  // "vetur.validation.script": false,
  // "vetur.format.defaultFormatter.scss": "none",
  // ? 格式化 prettier start
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
  /* prettier-ignore*/
  "prettier.printWidth": 80, // 超过最大值换行
  "prettier.tabWidth": 2, // 缩进级别的空格数
  "prettier.singleQuote": true, // 要单引号
  "prettier.trailingComma": "none", // 尾随逗号
  "prettier.bracketSpacing": true, // 对象花括号与内容之间加空格
  "prettier.semi": false, // 句尾添加分号
  "prettier.useTabs": false, // 制表符缩进
  "prettier.ignorePath": ".prettierignore", // 格式化忽略的文件控制
  // ? 格式化 prettier end
  //分号和双引号确实不会再自动添加了，但是不会在方法括号之间插入空格，可以再加入这条配置即可
  // "vetur.format.defaultFormatter.js": "vscode-typescript",
  "minapp-vscode.wxmlFormatter": "prettier",
  "minapp-vscode.prettier": {
    parser: "html",
  },
  "minapp-vscode.disableAutoConfig": true,
  "vsicons.dontShowNewVersionMessage": true,
  "extensions.ignoreRecommendations": true,
  "files.associations": {
    "*.cjson": "jsonc",
    "*.wxss": "css",
    "*.wxs": "javascript",
  },
  "diffEditor.ignoreTrimWhitespace": false,
  "todo-tree.tree.showScanModeButton": false,
  "editor.guides.indentation": false,
  "timeline.excludeSources": ["timeline.localHistory"],
  "editor.cursorBlinking": "phase",
  "editor.cursorSmoothCaretAnimation": true,
};
```

## Plugins

> 设置账号同步可在多台计算机上同步 Visual Studio 代码设置

- [Document This](https://github.com/joelday/vscode-docthis) - JS Doc 生成
- Live Server - 为静态和动态页面启动具有实时重新加载功能的开发本地服务器
- [Prettier](https://github.com/prettier/prettier-vscode) - 代码格式化
- [Todo Tree](https://github.com/Gruntfuggly/todo-tree) - 树状图显示 todo 列表
- [Debugger for Chrome](https://github.com/Microsoft/vscode-chrome-debug) - 从 VS Code 调试在 Google Chrome 中运行的 JavaScript 代码
- Project Manager - 多项目文件夹管理，方便切换
- 代码规范：ESLint + Prettier - Code formatter + Stylelint
- Search node_modules
- Better Comments
- Git History + GitLens — Git supercharged
- Path Intellisense + Path Autocomplete + 别名路径跳转
- Tabnine - 人工智能代码提示
- vscode-icons
- wxml + minapp
- Bookmarks
- any-rule
- Code Runner (支持 shell、javascript 等)
- Draw.io Integration 流程图
- 文件预览：Image preview + vscode-pdf
- open in browser
- Vue: Vue Language Features (Volar) + vue3-snippets-for-vscode
- Error Lens 语法错误展示

## Keybindings.json

```js
// Place your key bindings in this file to overwrite the defaults
// 将键绑定放入此文件中以覆盖默认值
const keybindings = [
  // ctrl+d 删除一行
  {
    command: "editor.action.copyLinesDownAction",
    key: "ctrl+d",
    when: "editorTextFocus && !editorReadonly",
  },
  //viewInBrowser修改
  {
    key: "alt+1",
    command: "extension.openInDefaultBrowser",
  },
  // ctrl+shift+/多行注释
  {
    key: "ctrl+shift+/",
    command: "editor.action.blockComment",
    when: "editorTextFocus",
  },
  //回车换行
  {
    key: "shift+enter",
    command: "editor.action.insertLineAfter",
    when: "editorTextFocus && !editorReadonly",
  },
  // 打开格式好的 md
  {
    key: "ctrl+shift+m",
    command: "markdown.showPreview",
    when: "editorLangId == 'markdown'",
  },
  // 快速所边栏
  {
    key: "ctrl+1",
    command: "workbench.view.explorer",
  },
  {
    key: "ctrl+2",
    command: "workbench.view.search",
  },
  {
    key: "ctrl+3",
    command: "workbench.view.scm",
  },
  {
    key: "ctrl+4",
    command: "workbench.view.debug",
  },
  {
    key: "ctrl+5",
    command: "workbench.view.extensions",
  },
];
```

## 快捷命令

> 官方所有快捷键：https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf

外观：

General

- Ctrl+Shift+P, F1 Show Command Palette
- Ctrl+P Quick Open, Go to File…
- Ctrl+Shift+N New window/instance
- Ctrl+Shift+W Close window/instance
- Ctrl+, User Settings
- Ctrl+K Ctrl+S Keyboard Shortcuts

全局：

- 显示/隐藏左侧目录栏 ctrl + b
- 控制台终端显示与隐藏：ctrl + ~
- 新建一个窗口 : ctrl + shift + n
- ctrl+ shift + f 全局搜索 （需要光标在资源管理器才可）
- 拆分编辑器 : ctrl + \
- 光标选择拆分编辑器的组合 Ctrl+ 1 / 2 / 3 Focus into 1st, 2nd or 3rd editor group
- 切换窗口 Ctrl+K Ctrl+ ←/→ Focus into previous/next editor group
- 关闭编辑器窗口 : ctrl + w
- 关闭所有窗口 : ctrl + k + w
- 打开快捷键设定： ctrl + k ctrl + s

文件

- 切換本窗口固定的文件：ctrl + tab （建议主加）
- 打开最近打开的文件夹：ctrl + r
- 打开新的命令窗：ctrl + shift + c
- 打开文件所在文件加： ctrl + o
- 打开文件所在更目录的文件夹：ctrl + k，ctrl + o

fold 快捷命令：

- 折叠当前： ctrl + shift + [
- 打开折叠： ctrl + shift + ]
- 折叠区域内代码的快捷键： ctrl + k ctrl + 0-9 (0 是完全折叠)
- 展开所有折叠区域代码快捷键： ctrl + k ctrl + j
- 折叠区域内 level1 代码的快捷键： ctrl + k ctrl + 1
- 折叠区域内 level2 代码的快捷键： ctrl + k ctrl + 2
- 折叠区域内 level3 代码的快捷键： ctrl + k ctrl + 3

光标：

- 光标跳到下一个单词： ctrl+ LEFT/RIGHT
- 光标移动到行首或者行末：home/end
- 向上滚动和向下滚动 Ctrl+↑ / ↓
- 快速回到顶部或底部： ctrl + home/end
- 代码块花括号的光标移动： ctrl + shift + `\`
- 切换光标从编辑器到资源管理器： ctrl + shift + E
- 跳转到指定行 ctrl + G
- 选择整行 ctrl + l
- 选择所有匹配项（已选中的单词） ctrl + shift + l
- 选中括号里的内容：命令面板找到命令 “选择括号所有内容

编辑：

- 移动选中的行 alt+ UP/DOWN
- 从光标处选择到行或行尾： shift + home/end
- 代码格式化：shift + alt +f
- 选中并格式化 ： ctrl + k ctrl + f
- 复制当前行 ctrl + C
- 剪切当前行（删除并复制） ctrl + X
- 粘贴 ctrl + v
- 向下复制一行 ctrl + d（快捷键自定义）
- 删除整行 ctrl + shift + K
- 编辑器中查找 ctrl + f
- 编辑器中替换 ctrl + h

## 相关资源

- [FiraCode](https://github.com/tonsky/FiraCode) - 编程字体

## jsconfig.json

以 vue 项目为例：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "core/*": ["./src/core/*"],
      "shared/*": ["./src/shared/*"],
      "compiler/*": ["./src/compiler/*"],
      "sfc/*": ["./src/sfc/*"],
      "server/*": ["./src/server/*"]
    },
    "target": "ES6",
    "module": "es6",
    "allowSyntheticDefaultImports": true
  },
  "include": ["src/**/*", "test/**/*"],
  "exclude": ["node_modules"]
}
```

## vscode 配置 vue 代码片段

在 vscode 中使用 ctrl+shift+p 打开一个选项窗口，然后找到配置用户代码片段，点击进去，输入 vue.json 找到对应的配置文件点击进去，然后粘贴下面配置替换即可。

[![clipboard](https://img2020.cnblogs.com/blog/2217722/202101/2217722-20210114070719206-1064216065.png)](https://img2020.cnblogs.com/blog/2217722/202101/2217722-20210114070719206-1064216065.png)

[![clipboard-1610579151127](https://img2020.cnblogs.com/blog/2217722/202101/2217722-20210114070719417-2062866199.png)](https://img2020.cnblogs.com/blog/2217722/202101/2217722-20210114070719417-2062866199.png)

```
{
  // Place your snippets for vue here. Each snippet is defined under a snippet name and has a prefix, body and
  // description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
  // $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the
  // same ids are connected.
  // Example:
  "Print to console": {   // 描述信息
    "prefix": "log",    // 前缀，在文件中输入这个关键词就能生成body里面的代码段了
    "body": [
      "console.log('$1');",
      "$2"
    ],
    "description": "Log output to console"    // 代码段详细的描述信息
  },
  "Print to Vue.js template": {
    "prefix": "vue",
    "body": [
      "<template>",
      "  <div class=\"$1\">$2</div>",   // \是为了转义双引号，光标默认停留在$1的位置，然后输出tab键进入$2位置，依次类推，找不到$之后就直接跳到行尾
      "</template>",
      "",
      "<script>",
      "export default {",
      "  name: '',",
      "  components: {},",
      "  props: {},",
      "  data () {",
      "    return {}",
      "  },",
      "  computed: {},",
      "  watch: {},",
      "  created () {},",
      "  mounted () {},",
      "  methods: {}",
      "}",
      "</script>",
      "",
      "<style scoped lang=\"less\"></style>",
      ""
    ],
    "description": "generator vue template"
  }
}

```

这个时候你在.vue 的文件中输入 vue 就会生成出下面的代码模版。

```
<template>
  <div class=""></div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less"></style>

```

具体定制代码段的方法如下。

进入<https://snippet-generator.app/>这个网站，然后将你要生成代码块的代码片段丢到左侧位置，右侧会自动生成出对应的 vscode 的代码段，当然你也可以点击右侧上面的 tab 栏切换不同编辑器下的代码块，这里以 vscode 为例，将右侧的代码块复制粘贴到 vue.json 配置文件中，配置对应的代码前缀名称即可。

![](https://img2020.cnblogs.com/blog/2217722/202101/2217722-20210114070719574-2074808948.png)

javascript.json

```json
javascript.json {
  // Place your snippets for javascript here. Each snippet is defined under a snippet name and has a prefix, body and
  // description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
  // $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the
  // same ids are connected.
  // Example:
  "Print to console": {
    "prefix": "log",
    "body": ["console.log('$1');", "$2"],
    "description": "Log output to console"
  },
  "console.log a variable": {
    "prefix": "cv",
    "body": "console.log('${0}:', ${0})"
  },
  "console.dir": {
    "prefix": "cd",
    "body": ["console.dir($1);"],
    "description": "Code snippet for \"console.dir\""
  },
  "console.error": {
    "prefix": "ce",
    "body": ["console.error($1);"],
    "description": "Code snippet for \"console.error\""
  },
  "console.info": {
    "prefix": "ci",
    "body": ["console.info($1);"],
    "description": "Code snippet for \"console.info\""
  },
  "console.log": {
    "prefix": "cl",
    "body": ["console.log($1);"],
    "description": "Code snippet for \"console.log\""
  },
  "console.warn": {
    "prefix": "cw",
    "body": ["console.warn($1);"],
    "description": "Code snippet for \"console.warn\""
  },
  "debugger": {
    "prefix": "de",
    "body": ["debugger$1"],
    "description": "Code snippet for \"debugger\""
  },
  "promise": {
    "prefix": "prom",
    "body": "return new Promise((resolve, reject) => {\n\t${1}\n});",
    "description": "Creates and returns a new Promise in the standard ES6 syntax"
  },
  "thenCatch": {
    "prefix": "thenc",
    "body": ".then((${1:result}) => {\n\t${2}\n}).catch((${3:err}) => {\n\t${4}\n});",
    "description": "Add the .then and .catch methods to handle promises"
  },
  "try/catch": {
    "prefix": "tc",
    "body": "try {\n\t${0}\n} catch (${1:err}) {\n\t\n}"
  },
  "try/catch/finally": {
    "prefix": "tcf",
    "body": "try {\n\t${0}\n} catch (${1:err}) {\n\t\n} finally {\n\t\n}"
  },
  "throw new Error": {
    "prefix": "tn",
    "body": "throw new ${0:error}"
  },
  "class": {
    "prefix": "cla",
    "body": "class ${1:name} {\n\tconstructor (${2:arguments}) {\n\t\t${0}\n\t}\n}"
  },
  "constructor": {
    "prefix": "con",
    "body": "constructor(${1:params}) {\n\t${0}\n}",
    "description": "Add default constructor in a class in ES6 syntax"
  },
  "key/valuePair": {
    "prefix": "kv",
    "body": "${1:key}: ${2:'value'}",
    "description": "key/value pair"
  },
  "forLoop": {
    "prefix": "forl",
    "body": "for (let ${1:i} = 0; ${1:i} < ${2:iterable}${3:.length}; ${1:i}++) {\n  ${4}\n}",
    "description": "for loop"
  },
  "forInLoop": {
    "prefix": "fori",
    "body": "for (let ${1:key} in ${2:source}) {\n  if (${2:source}.hasOwnProperty(${1:key})) {\n    ${3}\n  }\n}",
    "description": "for in loop"
  },
  "forOfLoop": {
    "prefix": "foro",
    "body": "for (let ${1:key} of ${2:source}) {\n  ${3}\n}",
    "description": "for of loop"
  },
  "ifStatement": {
    "prefix": "if",
    "body": "if (${1:condition}) {\n  ${2}\n}",
    "description": "if statement"
  },
  "elseStatement": {
    "prefix": "el",
    "body": "else {\n  ${1}\n}",
    "description": "else statement"
  },
  "if/elseStatement": {
    "prefix": "ife",
    "body": "if (${1:condition}) {\n  ${2}\n} else {\n  ${3}\n}",
    "description": "if/else statement"
  },
  "elseIfStatement": {
    "prefix": "ei",
    "body": "else if (${1:condition}) {\n  ${2}\n}",
    "description": "else if statement"
  },
  "methods": {
    "prefix": "me",
    "body": "${1:methods}: {\n\t${0}\n},"
  },
  "watch value change": {
    "prefix": "watch:value",
    "body": [
      "watch: { ",
      "  value: { ",
      "   immediate: true, ",
      "   handler() { ",
      "",
      "    }",
      "  }",
      "}, "
    ],
    "description": ""
  },
  "named function": {
    "prefix": "fn",
    "body": "function ${1:name} (${2:arguments}) {\n\t${0}\n}"
  },
  "async function": {
    "prefix": "afn",
    "body": "async function (${1:arguments}) {\n\t${0}\n}"
  },
  "async arrow function": {
    "prefix": "aafn",
    "body": "async (${1:arguments}) => {\n\t${0}\n}"
  },
  "immediately-invoked function expression": {
    "prefix": "iife",
    "body": ";(function (${1:arguments}) {\n\t${0}\n})(${2})"
  },
  "async immediately-invoked function expression": {
    "prefix": "aiife",
    "body": ";(async (${1:arguments}) => {\n\t${0}\n})(${2})"
  }
}
```

vue.json

```json
{
  // Place your snippets for vue here. Each snippet is defined under a snippet name and has a prefix, body and
  // description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
  // $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the
  // same ids are connected.
  // Example:
  "Print to console": {
    // 描述信息
    "prefix": "log", // 前缀，在文件中输入这个关键词就能生成body里面的代码段了
    "body": ["console.log('$1');", "$2"],
    "description": "Log output to console" // 代码段详细的描述信息
  },
  "Print to Vue.js template": {
    "prefix": "vue",
    "body": [
      "<template>",
      "  <div class=\"$1\">$2</div>", // \是为了转义双引号，光标默认停留在$1的位置，然后输出tab键进入$2位置，依次类推，找不到$之后就直接跳到行尾
      "</template>",
      "",
      "<script>",
      "export default {",
      "  name: '',",
      "  components: {},",
      "  props: {},",
      "  data() {",
      "    return {}",
      "  },",
      "  computed: {},",
      "  watch: {},",
      "  created() {},",
      "  mounted() {},",
      "  methods: {}",
      "}",
      "</script>",
      "",
      "<style scoped lang=\"scss\">\n\n</style>",
      ""
    ],
    "description": "generator vue template"
  },
  "vue3 template": {
    "prefix": "vue3",
    "body": [
      "<template>",
      "  <div class=\"$1\"></div>",
      "</template>",
      "",
      "<script setup>\n\n</script>",
      "",
      "<style lang=\"scss\" scoped>\n\n</style>"
    ],
    "description": "vue3 template"
  }
}
```

## 参考

- [vue-element-admin - Doc 指南](https://panjiachen.gitee.io/vue-element-admin-site/zh/guide)
- [那些你应该考虑卸载的 VSCode 扩展](https://zhuanlan.zhihu.com/p/125773296)
- [能让你开发效率翻倍的 VSCode 插件配置（上）](https://zhuanlan.zhihu.com/p/30976584)
- [能让你开发效率翻倍的 VSCode 插件配置（中）](https://zhuanlan.zhihu.com/p/35661521)
- [玩转 Vscode-配置 vue 代码片段](https://www.cnblogs.com/alexander3714/p/14275318.html)
- https://github.com/capaj/vscode-standardjs-snippets/tree/master
- https://github.com/sdras/vue-vscode-snippets
