(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{445:function(t,a,e){"use strict";e.r(a);var s=e(54),r=Object(s.a)({},(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"git"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#git"}},[t._v("#")]),t._v(" Git")]),t._v(" "),e("blockquote",[e("p",[t._v("Git是目前世界上最先进的分布式版本控制系统")])]),t._v(" "),e("p",[t._v("本篇文章将重点讲解大多数人忽略或者不清楚的点，注意: 这不是一篇大而全的git使用教程, 只会重点讲解一些关键知识点，如果你需要更全的git教程，你应该去查看"),e("a",{attrs:{href:"https://git-scm.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("官方文档"),e("OutboundLink")],1)]),t._v(" "),e("h2",{attrs:{id:"关联本地仓库与远程仓库"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#关联本地仓库与远程仓库"}},[t._v("#")]),t._v(" 关联本地仓库与远程仓库")]),t._v(" "),e("p",[t._v("大多数人都会使用 "),e("code",[t._v("git clone")]),t._v(" 命令来将github上的代码仓库克隆到本地，然后做一些修改后就可以使用 "),e("code",[t._v("git push")]),t._v(" 等命令来提交修改，但是这导致的问题就是大多数人对本地仓库和远程仓库是如何关联起来的不清楚，同时也不清楚有时候用到的 "),e("code",[t._v("origin")]),t._v(" 这个究竟代表什么意思。下面我们从零来讲解如何将本地仓库和远程仓库关联。")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("$ "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("mkdir")]),t._v(" studyGit "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 创建目录")]),t._v("\n$ "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" studyGit "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 进入该目录")]),t._v("\n$ g init "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 初始化本地git仓库配置文件")]),t._v("\n$ g remote "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" origin "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" @github.com: ykfe / fe - dev - playbook.git\n$ ga "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(".")]),t._v("\n$ gcmsg "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"feat: init files"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 在这里我们做一些修改然后commit生成一个本地的版本")]),t._v("\n$ g push origin master "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 将本地仓库的修改推送到远程origin 仓库的master分支")]),t._v("\n")])])]),e("p",[e("code",[t._v("git remote")]),t._v(" 这一行这是最关键的命令，这里我们给本地的git仓库添加了一个名为"),e("code",[t._v("origin")]),t._v("，地址为"),e("code",[t._v("git@github.com:ykfe/fe-dev-playbook.git")]),t._v("的远程仓库")]),t._v(" "),e("p",[t._v("通过以上代码我们可以知道， "),e("code",[t._v("origin")]),t._v(" 代表的是远程仓库的名称，这里的 "),e("code",[t._v("origin")]),t._v(" 我们可以在 "),e("code",[t._v("git remote")]),t._v(" 的时候自定义名称，不一定要叫 "),e("code",[t._v("origin")]),t._v(" 只是官方的规范对 "),e("code",[t._v("clone")]),t._v(" 下来的远程仓库默认叫做 "),e("code",[t._v("origin")]),t._v(" 。")]),t._v(" "),e("p",[t._v("看到这里，你可以知道我们完全可以通过 "),e("code",[t._v("git remote")]),t._v(" 添加多个远程仓库来实现同时将代码推送到 "),e("code",[t._v("github/gitlab/gitoschina")]),t._v(" 多个远程仓库")]),t._v(" "),e("h2",{attrs:{id:"git-add-commit-与-git-commit-am-的区别"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#git-add-commit-与-git-commit-am-的区别"}},[t._v("#")]),t._v(" git add + commit 与 git commit -am 的区别")]),t._v(" "),e("p",[t._v("大多数人喜欢用后面的一种方式来添加提交本地代码到本地仓库中，但后一种与前一种方式并不是完全相等的。"),e("br"),t._v("\n熟悉Git的同学知道，我们在项目中新建一个新文件后，它的状态是 "),e("code",[t._v("untracked")]),t._v(" 的，当我们使用 "),e("code",[t._v("git add .")]),t._v(" 将其添加到暂存区时，它的状态就会变为 "),e("code",[t._v("tracked")]),t._v(" ，即可追踪的。当我们用 "),e("code",[t._v("git commit")]),t._v(" 的时候会将暂存区的文件提交到本地仓库生成一个commit记录。"),e("br"),t._v(" "),e("code",[t._v("git commit -am")]),t._v(" 只会将 "),e("code",[t._v("tracked")]),t._v(" 状态的文件commit到本地仓库，意思是如果你有新的文件产生，并且之前没有用 "),e("code",[t._v("git add")]),t._v(" 将其状态变为 "),e("code",[t._v("tracked")]),t._v(" ，使用 "),e("code",[t._v("git commit -am")]),t._v(" 并不能将该文件commit到本地仓库，容易造成文件的丢失。")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://gw.alicdn.com/tfs/TB1c5RSXKL2gK0jSZPhXXahvXXa-1436-1152.jpg",alt:""}})]),t._v(" "),e("h2",{attrs:{id:"常用命令"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#常用命令"}},[t._v("#")]),t._v(" 常用命令")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("$ "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" reset --hard ^HEAD "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 版本回退")]),t._v("\n$ "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" checkout -- "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("file"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 撤销修改")]),t._v("\n$ "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" stash "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 暂存修改")]),t._v("\n$ "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" stash apply "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 恢复修改")]),t._v("\n")])])]),e("h2",{attrs:{id:"多人合作开发"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#多人合作开发"}},[t._v("#")]),t._v(" 多人合作开发")]),t._v(" "),e("p",[t._v("如果要开发多人合作项目，我们建议将master分支设置为"),e("a",{attrs:{href:"https://help.github.com/en/articles/configuring-protected-branches",target:"_blank",rel:"noopener noreferrer"}},[t._v("protected"),e("OutboundLink")],1),t._v("分支，使得不允许直接在master上提交代码，只能通过PR的形式来合并。如何向项目提交PR请参考"),e("a",{attrs:{href:"https://www.zhihu.com/question/21682976/answer/79489643",target:"_blank",rel:"noopener noreferrer"}},[t._v("GitHub 的 Pull Request 是指什么意思？"),e("OutboundLink")],1)]),t._v(" "),e("h2",{attrs:{id:"使用git-flow"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#使用git-flow"}},[t._v("#")]),t._v(" 使用git-flow")]),t._v(" "),e("p",[t._v("使用"),e("a",{attrs:{href:"https://www.git-tower.com/learn/git/ebook/cn/command-line/advanced-topics/git-flow",target:"_blank",rel:"noopener noreferrer"}},[t._v("git-flow"),e("OutboundLink")],1),t._v("这个工具可以帮助我们更好的控制我们的工作流程")]),t._v(" "),e("h2",{attrs:{id:"commit-message-规范"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#commit-message-规范"}},[t._v("#")]),t._v(" commit message 规范")]),t._v(" "),e("p",[t._v("commit message是必须要遵循一定的规范的，随意的commit message只会让人感受到不专业。这里我们参考"),e("a",{attrs:{href:"https://gist.github.com/stephenparish/9941e89d80e2bc58a153",target:"_blank",rel:"noopener noreferrer"}},[t._v("AngularJS commit message conventions"),e("OutboundLink")],1)]),t._v(" "),e("blockquote",[e("p",[t._v("This would add kinda “context” information. Look at these messages (taken from last few angular’s commits):"),e("br"),t._v("\nFix small typo in docs widget (tutorial instructions)"),e("br"),t._v("\nFix test for scenario. Application - should remove old iframe"),e("br"),t._v("\ndocs - various doc fixes"),e("br"),t._v("\ndocs - stripping extra new lines"),e("br"),t._v("\nReplaced double line break with single when text is fetched from Google"),e("br"),t._v("\nAdded support for properties in documentation")])]),t._v(" "),e("h2",{attrs:{id:"使用git-rebase-来合并你的commit"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#使用git-rebase-来合并你的commit"}},[t._v("#")]),t._v(" 使用git rebase 来合并你的commit")]),t._v(" "),e("p",[t._v("大部分人在实际开发过程中，都会建立自己的分支开发，这是大部分团队都能做到的，但是我们在测试问题的时候总是会提交一些无用的commit去远程的repo，自己的分支还好，但是最后把自己的分支合并到master上的时候如果还带上这些commit就十分不雅观了，当然github的PR功能已经给我们合并PR的时候提供了多种选项，其中就包括rebase。但是这里还是要介绍一个很多人不常用的命令，git rebase，也就是变基，git rebase功能很强大，也很容易一不小心弄不好就把你的整个commit或者git历史弄乱，所以这里我们不写如何用它来变基，只说如何用它来合并自己的commit。"),e("a",{attrs:{href:"http://gitbook.liuhui998.com/4_2.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("参考教程"),e("OutboundLink")],1)]),t._v(" "),e("p",[t._v("注意事项: 只有个人操作的分支才可以用git rebase，多人一起协作的分支切记不要轻易使用git rebase, 否则很容易造成冲突。")]),t._v(" "),e("p",[t._v("实战操作, 首先建立一个git目录。")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("$ "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("mkdir")]),t._v(" testGit\n$ "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" init\n$ "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("vim")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(". txt\n")])])]),e("p",[t._v("在master分支对1.txt做修改并且commit")]),t._v(" "),e("p",[e("img",{attrs:{src:"http://gw.alicdn.com/tfs/TB1luMFXBr0gK0jSZFnXXbRRXXa-1138-852.png",alt:""}})]),t._v(" "),e("p",[t._v("切换到rebase分支，修改两次1.txt，并进行两次commit\n"),e("img",{attrs:{src:"http://gw.alicdn.com/tfs/TB1UWIFXBv0gK0jSZKbXXbK2FXa-1140-856.png",alt:""}}),t._v("\n使用git rebase 合并刚刚的两次commit")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("$ "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" rebase - i HEAD~x "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# x代表你要合并前x次commit 这里我们填2, 这里你也可以直接填具体的commit对应的hash值")]),t._v("\n$ "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" rebase - i HEAD~2\n")])])]),e("p",[e("img",{attrs:{src:"http://gw.alicdn.com/tfs/TB1Qs7DXAT2gK0jSZFkXXcIQFXa-1154-866.png",alt:""}}),t._v("\n这里的pick的意思是")]),t._v(" "),e("blockquote",[e("p",[t._v("pick：保留该commit（缩写:p）"),e("br"),t._v("\nreword：保留该commit，但我需要修改该commit的注释（缩写:r）"),e("br"),t._v("\nedit：保留该commit, 但我要停下来修改该提交(不仅仅修改注释)（缩写:e）"),e("br"),t._v("\nsquash：将该commit和前一个commit合并（缩写:s）"),e("br"),t._v("\nfixup：将该commit和前一个commit合并，但我不要保留该提交的注释信息（缩写:f）"),e("br"),t._v("\nexec：执行shell命令（缩写:x）"),e("br"),t._v("\ndrop：我要丢弃该commit（缩写:d）")])]),t._v(" "),e("p",[t._v("我们使用的比较多的是 "),e("code",[t._v("s")]),t._v(" 和 "),e("code",[t._v("f")]),t._v(" 两个选项，在这里我们想要合并两次commit为一个，所以将我们的rebase信息改为")]),t._v(" "),e("p",[e("img",{attrs:{src:"http://gw.alicdn.com/tfs/TB1wPMDXuL2gK0jSZFmXXc7iXXa-1148-840.png",alt:""}})]),t._v(" "),e("p",[t._v("保存之后出现如下界面，可以让我们设置合并后的commit信息，在第二行写上新的cm信息，并且注释掉之前的两次cm信息，或者直接用dd来删除")]),t._v(" "),e("p",[e("img",{attrs:{src:"http://gw.alicdn.com/tfs/TB1WuIDXAT2gK0jSZPcXXcKkpXa-1142-852.png",alt:""}})]),t._v(" "),e("p",[e("code",[t._v(":wq")]),t._v(" 保存后查看git log")]),t._v(" "),e("p",[e("img",{attrs:{src:"http://gw.alicdn.com/tfs/TB1l5.DXuP2gK0jSZFoXXauIVXa-1144-848.png",alt:""}})]),t._v(" "),e("p",[t._v("ok, 前两次cm信息成功被合并为了一个")]),t._v(" "),e("p",[t._v("注意事项")]),t._v(" "),e("p",[t._v("你执行了rebase命令的分支如果和远程仓库的commit history不一样，是没有办法直接push到远程仓库的，因为这时候你本地仓库的commit history已经修改了，和远程的会冲突。")]),t._v(" "),e("p",[t._v("解决方式")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("$ "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push origin dev -f "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 使用--force来强制push，但你要清楚这可能会导致你的一些commit记录的丢失，所以请仅在个人分支进行该操作")]),t._v("\n")])])])])}),[],!1,null,null,null);a.default=r.exports}}]);