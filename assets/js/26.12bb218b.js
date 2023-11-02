(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{309:function(a,s,t){"use strict";t.r(s);var e=t(14),r=Object(e.a)({},(function(){var a=this,s=a._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"shell命令"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#shell命令"}},[a._v("#")]),a._v(" Shell命令")]),a._v(" "),s("p",[a._v("熟练使用*nix系统的第一步便是熟练它的常用命令，大部分服务器的使用的Linux环境是没有GUI的，我们只能够通过命令来操控系统。对于前端开发来说，我们无需掌握大部分的高难度命令，只需掌握工作开发中常用的命令即可。如果不知道某个命令怎么用，最开始的时候是可以通过网络搜索来解决，稍微熟悉之后，就可以通过"),s("code",[a._v("man xxx")]),a._v("来查阅命令的手册来学习命令的各种参数。")]),a._v(" "),s("h2",{attrs:{id:"文件相关命令"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#文件相关命令"}},[a._v("#")]),a._v(" 文件相关命令")]),a._v(" "),s("p",[a._v("熟练使用*nix系统下的复制 移动命令可以帮助我们写一些小的自动化shell脚本。例如在前端构建完毕后，将构建产物移动到指定目录或者重命名")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("cp")]),a._v(" ./a.txt "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("..")]),a._v("/b.txt "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 将当前目录下的a.txt文件复制到上级目录并更名")]),a._v("\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("mv")]),a._v(" ./a.txt "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("..")]),a._v("/b.txt "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 将当前目录下的a.txt文件移动到上级目录并更名")]),a._v("\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("mv")]),a._v(" ./a.txt ./b.txt "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 重命名当前目录下的a.txt文件")]),a._v("\n")])])]),s("h3",{attrs:{id:"find"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#find"}},[a._v("#")]),a._v(" find")]),a._v(" "),s("p",[a._v("使用 "),s("code",[a._v("find")]),a._v(" 命令可以帮助我们查找符合要求的文件")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("find")]),a._v(" ./ "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-iname")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"*.js"')]),a._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 查找当前目录下的所有js文件, 忽略大小写")]),a._v("\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("find")]),a._v(" ./ "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-size")]),a._v(" +25k  "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 查找当前目录下文件大小大于25kb的文件")]),a._v("\n")])])]),s("h3",{attrs:{id:"ack"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#ack"}},[a._v("#")]),a._v(" ack")]),a._v(" "),s("p",[a._v("find的功能是比较弱的，对全文检索有心无力，ack是更好的搜索代码神器")]),a._v(" "),s("p",[a._v("安装")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("$ brew "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("install")]),a._v(" ack \n")])])]),s("p",[a._v("然后，通过ack加关键字搜索即可。")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("$ ack targetCode\n$ ack "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-i")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"ICE BUILD"')]),a._v(" ./node_modules\n")])])]),s("h3",{attrs:{id:"grep"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#grep"}},[a._v("#")]),a._v(" grep")]),a._v(" "),s("p",[a._v("使用 "),s("code",[a._v("grep")]),a._v(" 命令可以帮助我们筛选符合要求的内容")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("grep")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"browserRouter"')]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-i")]),a._v(" ./src/entry.tsx "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 在当前src目录下的entry.tsx文件中查找browserRouter关键字忽略大小写")]),a._v("\n")])])]),s("h3",{attrs:{id:"awk"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#awk"}},[a._v("#")]),a._v(" awk")]),a._v(" "),s("p",[a._v("通过awk命令我们可以筛选出符合要求的行或者列数据")]),a._v(" "),s("p",[a._v("以:为分隔符，将password分为多列，并且提取出第一列的内容")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("cat")]),a._v(" /etc/passwd "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("awk")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-F")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v("':'")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v("'{print $1}'")]),a._v("\n")])])]),s("h3",{attrs:{id:"tar"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#tar"}},[a._v("#")]),a._v(" tar")]),a._v(" "),s("p",[a._v("通过tar命令可以将文件打包并压缩，也可以解包和解压缩，配合别的命令可以写成简单的发布脚本。比如下面的命令就是一个打包压缩和解压缩的例子，将当前文件夹下的所有文件打包并gzip压缩，然后再来一遍解压缩")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("tar")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-zcvf")]),a._v(" build.zip ./*\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("mkdir")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("test")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("tar")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-xvf")]),a._v(" build.zip "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-C")]),a._v(" ./test\n")])])]),s("h3",{attrs:{id:"scp"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#scp"}},[a._v("#")]),a._v(" scp")]),a._v(" "),s("p",[a._v("打包好的文件可以通过scp来跨机器拷贝到集成调试服务器上面，比如我们本地打包好的文件是build.zip，需要拷贝到服务器上面/usr/share/nginx/html/，服务器ip是10.20.30.40，用户名是fe-deploy，就可以通过如下命令完成：")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("scp")]),a._v(" ./build.zip fe-deploy@10.20.30.40:/usr/share/nginx/html/build.zip\n")])])]),s("h3",{attrs:{id:"rsync"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#rsync"}},[a._v("#")]),a._v(" rsync")]),a._v(" "),s("p",[a._v("如果只是把打包好的文件推送到服务器上面，rsync会比上面先压缩再scp，再解压要简单很多。rsync就是用来同步两个目录，可以跨越网络。比如还是上面发布的例子，我们可以直接用下面的命令。"),s("code",[a._v("-r")]),a._v("是递归。"),s("code",[a._v("-v")]),a._v("是回显，都同步了哪些文件。"),s("code",[a._v("-z")]),a._v("是压缩。"),s("code",[a._v("--delete")]),a._v("是在目的目录删掉我们原目录不存在的文件。")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("rsync")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-rvz")]),a._v(" ./ fe-deploy@10.20.30.40:/usr/share/nginx/html "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--delete")]),a._v("\n")])])]),s("h2",{attrs:{id:"进程相关命令"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#进程相关命令"}},[a._v("#")]),a._v(" 进程相关命令")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("lsof")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-i:8000")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 查看端口占用情况")]),a._v("\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("ps")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 查看当前正在运行的进程，ps命令选项众多这里不一一介绍")]),a._v("\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("kill")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-9")]),a._v(" pid "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 根据进程pid来将进程强制退出")]),a._v("\n")])])]),s("h2",{attrs:{id:"管道"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#管道"}},[a._v("#")]),a._v(" 管道")]),a._v(" "),s("p",[a._v("管道可以将上一个命令的stdout输出，作为下一个命令的stdin输入。通过管道符我们可以实现一些稍微复杂的自动化的脚本功能")]),a._v(" "),s("p",[a._v("比如，查找当前正在运行的Node进程并提取出pid传给kill命令来退出进程。")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("ps")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("grep")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-i")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"node"')]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("awk")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v("'{print $2}'")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("xargs")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("kill")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-9")]),a._v(" \n")])])]),s("h2",{attrs:{id:"tree"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#tree"}},[a._v("#")]),a._v(" tree")]),a._v(" "),s("p",[a._v("大部分框架的文档都是使用tree命令来列出目录结构示例,更多功能查看"),s("a",{attrs:{href:"https://wangchujiang.com/linux-command/c/tree.html",target:"_blank",rel:"noopener noreferrer"}},[a._v("文档"),s("OutboundLink")],1)]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("$ tree "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-L")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("2")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-I")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v("'node_modules'")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 目录结构层级为2，忽略node_modules")]),a._v("\n├── app.js\n├── dist\n├── f.yml\n├── package.json\n└── src\n    ├── detail\n    ├── index\n    └── layout\n    \n")])])]),s("h2",{attrs:{id:"time"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#time"}},[a._v("#")]),a._v(" time")]),a._v(" "),s("p",[a._v("time命令用于统计给定命令所花费的总时间。更多信息查看"),s("a",{attrs:{href:"https://man.linuxde.net/time",target:"_blank",rel:"noopener noreferrer"}},[a._v("文档"),s("OutboundLink")],1)]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("time")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("ls")]),a._v("\n")])])]),s("h2",{attrs:{id:"ssh"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#ssh"}},[a._v("#")]),a._v(" ssh")]),a._v(" "),s("p",[a._v("有时候我们也需要登录到服务器上面，就可以通过"),s("code",[a._v("ssh")]),a._v("来登录。也可以通过配置把本地的公钥加到服务器上面，来省略输入密码的过程，详细的步骤可以搜索下，这里就不详细说了。")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("ssh")]),a._v(" fe-deploy@10.20.30.40\n")])])])])}),[],!1,null,null,null);s.default=r.exports}}]);