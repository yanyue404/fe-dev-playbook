---
sidebarDepth: 2
---

# 终端

- [玩好 Terminal 终端](https://github.com/yanyue404/blog/issues/42)

## 导航栏

- [gitBash](#gitbash)
- [conEmu](#conemu)
- [vim](#vim)
- [cmd](#cmd)
- [Windows Terminal](Windows-terminal)

### 快捷键补充

- [vscode](#vscode)
- [chrome](#chrome)

## gitBash

- `cd` 切换路径
  - `cd E:`切换盘符
  - `cd ~` 退回到系统根路径
  - `cd Desktop/` 进入桌面（注意：需要在根路径）
  - `cd Front\ End` 切换文件夹
  - `cd ../..`或者`cd Front\ End/smart/FE/` 执行多条命令（注意绝对路径和相对路径）
  - `快速导入路径的方法` => 直接将待编辑文件或文件夹拖入终端中即可
- `pwd`显示当前路径
- `touch`创建文件
- `mv a.html b.html` a.html 文件重命名为 b.html
- `rm` 移除文件
  - `rm -r`删除文件夹（递归删除）
  - `rm -rf` 删除文件夹（强制删除）
- `rmdir`删除文件夹（只能删除空文件夹，不常用）
- `ls` 列出当前根目录下的所有文件
  - `ls -R` 举当前路径下的全部文件并展开所有子文件夹
- `cat README.md` 查看文件内容（一次性将内容全部显示）
- `less README.md` 查看文件内容（显示部分信息） 空格键 滚动一页  
  回车键 滚动一行 Q 退出命令 h 显示帮助页面
- `clear/ctrl+l` 清空命令窗口
- `exit` 可以直接退出窗口
- `git help`查看帮助命令

### 光标相关

- `ctrl + U/K` 删除光标左/右侧的所有内容
- `ctrl + W`/`Alt + D` 删除光标左/右侧的单词
- `Ctrl + A`移动光标到整条命令的起始位置
- `Ctrl + E` 移动光标到整条命令的结束位置
- `Alt + B`/`Alt + F` 根据单词向左/右移动光标

## ConEmu

- `ctrl+N` 当前 window 窗口创建新的 console 面板
- `ctrl+shift+N` 创建新的 window 窗口
- `ctrl+shift+delete` 关闭当前选中的 console 窗口
- `alt+2` 右侧分屏
- `ctrl+f` 查找关键字
- `ctrl+tab+左/右箭头` 切换标签栏(左右箭头辅助，可以不要)
- `ctrl+R` 重命名活动窗口页
- `pwd` git bash 显示当前所在路径

## cmd

将 **C:\Program Files\Git\bin** （或计算机上的任何文件）放在 PATH 中，则可以使用，因为 Git 在其中放置了 包括 sh.exe 在内的各种有用的工具。

```sh
sh build.sh
```

- `cd E:\` 切换盘符
- `dir` 列出当前目录下的所有文件
- `cd Desktop`切换到桌面
- `cd "Front End"`进入带空格的文件夹
- `mkdir`创建文件夹（`md`）
- `cd.> demo.html` 创建空文件/(`type nul>.babelrc`)
- `cls` 清空命令窗口
- `tree`
- `rd /S htdocs` 删除非空文件夹
- `rmdir htdocs` 删除空文件夹
- `shutdown -s -t 3600` 一小时后关机
- `help` 帮助

#### 用命令行做的事情

- 关闭占用端口

1.  cmd 命令行和 git bash 都可以，先查看`9009`端口占用情况，记住 TCP 连接的最后一列数字，这个是`PID`,例子为`6692`;

```batchfile
netstat -aon|findstr 9009
```

过滤情况如下：

```shell
TCP   127.0.0.1:9009   0.0.0.0:0   LISTENING  6692
```

2.  关闭进程,在任务管理器中，查找进程 PID 为`6692`，右键单击，选择`结束任务`

## vim

### 模式

普通模式(Normal mode)

在普通模式中，有很多方法可以进入插入模式。比较普通的方式是按 a（append／追加）键或者 i（insert／插入）键。

插入模式(Insert mode)

在这个模式中，大多数按键都会向文本缓冲中插入文本。大多数新用户希望文本编辑器编辑过程中一直保持这个模式。

在插入模式中，可以按 ESC 键回到普通模式。

命令行模式(Command line mode)

在命令行模式中可以输入会被解释成并执行的文本。例如执行命令（:键），搜索（/和?键）或者过滤命令（!键）。在命令执行之后，Vim 返回到命令行模式之前的模式，通常是普通模式。

### 三种常用模式的切换

vim 启动进入普通模式，处于插入模式或命令行模式时只需要按 Esc 或者 Ctrl+\[(这在 vim 课程环境中不管用)即可进入普通模式。普通模式中按 i（插入）或 a（附加）键都可以进入插入模式，普通模式中按:进入命令行模式。命令行模式中输入 wq 回车后保存并退出 vim。

命令行打开，用户环境变量 path 添加如下 D:\\Alike\\vim\\vim74

### 常用命令

| 命令                | 操作                   |
| ------------------- | ---------------------- |
| :e E:\\             | 切换目录到 E 盘        |
| i                   | 插入                   |
| a                   | 插入                   |
| :q                  | 退出                   |
| :q!                 | 强制退出，不保存       |
| :wq                 | 保存文件并退出         |
| :wq!                | 强制保存并退出         |
| :w <文件路径>       | 另存为                 |
| :savesa <文件路径>  | 另存为                 |
| vim 文件名/文件路径 | 打开文件或文件夹       |
| :set nu             | 显示行号               |
| gg                  | 到第一行               |
| G                   | 到最后一行             |
| nG                  | 跳到第 n 行            |
| :u                  | 回退操作               |
| ctrl+r              | 恢复上一步被撤销的操作 |

## chrome

- `ctrl+p` 查找当前网站已加载的资源文件
- `ctrl+shift+p` 显示所有命令
- `ctrl+l` 清空 console 面板数据
- `ctrl+R`/ `f5` 正常重新加载
- `ctrl+shift+R`/`shift f5` 硬性重新加载
- `ctrl+h`查看历史记录

其他

- network 面板，点亮左上角那个像是摄像机的图标（鼠标移上去会提示 Capture screenshots），会打开新的一折叠面板，使用 trl + R 来启动截图调试。

## vscode

- `ctrl+p` 查找工作区的所有文件
- `ctrl+shift+p`显示所有命令
- `ctrl+b`侧边栏显示/隐藏
- `ctrl+tab`多个打开的文件切换
- `ctrl+shift+m`预览 markdown（自定义）
- `ctrl+shift+[/]`折叠/打开代码块
- `ctrl+Shift+F`整个文件夹中查找
- `ctl+shift+n`新开编辑窗口
- `ctrl+w`关闭编辑窗口
- `ctrl+shift+w`关闭编辑器
- `ctrl+\`新建分栏
- `ctrl+g`跳转到行数

### 命令行

- `code .` # 用 VSCode 打开当前目录
- `code xxx` # 用 VSCode 打开某个目录

### 光标相关

- `home/end`移动光标到行尾或行首
- `shift+end/home`选择从光标至行尾或行首
- `ctrl + shift+end/home`删除从行尾或行首到光标位置
- `shift+alt+left/right`扩展/缩小选取范围：
- `ctrl+delete`删除光标右侧的所有字
- `ctrl+shift+l`同时选中所有匹配
- `ctrl+u`回退到上一个光标操作位置
- `ctrl+i`选中当前行
- `ctrl+shift+左/右箭头`选中单个或者多个单词

## Windows-terminal

> Windows Terminal 要求 windows 10 version 最低 18362.0

在 Build 2019 大会上，微软公布了新的 Windows Terminal 命令行终端工具，这是一个现代化的快速终端应用程序，适用于命令行工具和 shell，包括命令提示符、PowerShell 和 WSL。Windows Terminal 应用程序带有几个新功能，如多选项卡支持，GPU 加速 DirectWrite/DirectX 文本呈现引擎，支持许多设置和配置选项，允许用户个性化终端的外观等等。因为早期预览没有完整功能，自定义选项只能通过编辑 JSON 文件，庆幸的是 Microsoft 提供了有关如何在 JSON 文件中配置设置和键绑定的一些说明，您甚至可以更改背景图像。

- [Windows10 如何安装 windows terminal](https://blog.csdn.net/SweetTool/article/details/94591100)
- [关于-Windows Terminal](https://frxcat.fun/about/about_Windows_Terminal/)

#### 参考链接

- [https://www.cnblogs.com/kmsfan/p/vim_beginner.html](https://www.cnblogs.com/kmsfan/p/vim_beginner.html)
