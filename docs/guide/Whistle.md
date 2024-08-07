# Whistle

> https://github.com/yanyue404/blog/issues/204

> [whistle 官方文档](http://wproxy.org/whistle/webui/rules.html)

Whistle 最强大的代理服务器，与 Charles 相比我用 Whistle。

## 说明

whistle(读音[ˈwɪsəl]，拼音[wēisǒu])基于 Node 实现的跨平台 web 调试代理工具，类似的工具有 Windows 平台上的 Fiddler，主要用于查看、修改 HTTP、HTTPS、Websocket 的请求、响应，也可以作为 HTTP 代理服务器使用。

## 操作步骤

1.  pc 机 npm 安装 whistle；
2.  pc 机安装 whistle https 根证书；
3.  pc 机运行 whistle (w2 start)，配置浏览器代理 127.0.0.1:8899，浏览器访问 http://127.0.0.1:8899/ (至此完成 pc 机代理)
4.  pc 机开启移动热点，获取本机 ip 地址；
5.  ios 或 安卓设备连接热点，手动配置 pc 机 ip 代理；
6.  扫码 或浏览器访问 rootca.pro，安装 whistle https 根证书，设置证书受信任；
7.  真机访问 h5 类的目标域名网页，可以被 pc 机 whistle 代理成功捕获。（至此完成真机代理）

## 下载

```bash
# 安装或更新
$ npm install -g whistle

# 或者直接指定镜像安装：
$ npm install whistle -g --registry=https://registry.npm.taobao.org
```

## 安装 whistle 证书

下载根证书，开启捕获 HTTPS 请求：

<img src="https://raw.githubusercontent.com/yanyue404/blog/master/assets/whistle/https-proxy.png" width="50%" height="50%">

配置手机代理：

IP 地址由 观察 pc 机 ipconfig 获得。

<div>
<img src="https://raw.githubusercontent.com/yanyue404/blog/master/assets/whistle/phone1.jpg" style="margin-right:10px" 
 width="40%" height="50%">

<img src="https://raw.githubusercontent.com/yanyue404/blog/master/assets/whistle/phone2.jpg" style="float:right" width="40%" height="50%"> 
</div>

**PC 机**

windows: 下载证书后，双击证书，根据指引安装证书。证书安装过程，要确保证书存储到受信任的根证书颁发机构下。

注意： 只有 HTTPS 为对勾时才说明根证书安装成功，可以成功代理 HTTPS 类型的请求。

**IOS 设备**

手机设置代理后，Safari 地址栏输入 rootca.pro，按提示安装证书（或者通过 whistle 控制台的二维码扫码安装，iOS 安装根证书需要到连接远程服务器进行验证，需要暂时把 Https 拦截功能关掉）。

iOS 10.3 之后需要手动信任自定义根证书，设置路径：设置> 外观 > 关于本机> 证书信任设置

**安卓设备**

手机设置代理后，证书通过二维码扫码安装或者浏览器地址栏 rootca.pro 按提示安装，安装成功后，需要手机将连接笔记本电脑的 wifi 设为 可信任网络才能正常抓取 https 网络请求。

## 使用

**浏览器代理： 安装 Chrome 代理插件：（推荐安装 SwitchyOmega）**

<img src="https://raw.githubusercontent.com/yanyue404/blog/master/assets/whistle/SwitchySharp.png" width="50%" height="50%">

```bash

# 开启代理监听 http://127.0.0.1:8899/
w2 start

# filter， 在 Network 不会出现某些域名的请求
/[traceback.tk.cn](http://traceback.tk.cn/)|[tia6.taikang.com/](http://tia6.taikang.com/) filter://hide

# req ua
[m.aliexpress.com](http://m.aliexpress.com/) ua://{{wp_ua}}

# reqHeaders，修改请求头
[m.aliexpress.com](http://m.aliexpress.com/) reqHeaders://{{req-headers}}

# 使用 内置的 Weinre 调试移动端页面，然后选择菜单栏的 Weinre 进入看到调试界面了
# http://127.0.0.1:8899/weinre/client/#test

http://www.qq.com/  weinre://test

# 配置规则（线上代理到本地调试）
//[m.tk.cn/tkproperty/prd/N20210002/](http://m.tk.cn/tkproperty/prd/N20210002/)  localhost:3334/tkproperty/prd/N20210002/

# 单个文件代理到 values 面板（新建 local_reference.js 文件, 完全替换）
//[mcdn.tk.cn/js/reference.js](http://mcdn.tk.cn/js/reference.js) resBody://{local_reference.js}

# 设置 延迟响应的时间（单位：毫秒）
https://ecuat.tk.cn/tkol-api/tkcms/selectByProductId resDelay://3000

# 修改返回码，可以模拟接口出错
https://ecuat.tk.cn/tkol-api/tkcms/selectByProductId statusCode://500

# 在网页中注入以 script 标签的形式插入，花括号的值是内置编辑器保存的文件，在主菜单 “Value” 下可找到：
https://wq.jd.com/ jsAppend://{test.js} https://wq.jd.com/ jsAppend:///Users/myname/test/test.js

# 在网页中注入以 style 标签的形式插入，花括号的值是内置编辑器保存的文件，在主菜单 “Value” 下可找到：
https://wq.jd.com/ cssAppend://{test.css} https://wq.jd.com/ cssAppend:///Users/myname/test/test.css

# log 日志分组
http://localhost:49804/tkproperty/nprd/N20210001/ log://N20210001

```

```js
// test.js
const script = document.createElement("script");
script.type = "text/javascript";
script.src = "https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js";
script.onload = function () {
  console.log("jquery 注入成功");
  console.dir($("head")[0]);
};
document.head.appendChild(script);
```

```js
// VConsole.js
const script = document.createElement("script");
script.type = "text/javascript";
script.src = "https://cdn.bootcdn.net/ajax/libs/vConsole/3.1.0/vconsole.min.js";
script.onload = function () {
  console.log("VConsole 注入成功");
  new VConsole();
};
document.head.appendChild(script);
```

```css
/* test.css */
body {
  background: red !important;
}
```

**values**

```
{wp_ua}
  Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; RM-1113) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Mobile Safari/537.36 Edge/13.10586

{req-headers}
  {
    "X-Forwarded-For":" 188.146.171.71",
    "X-Real-IP":" 188.146.171.71",
    "X-Client-Scheme":"https",
    "referer":"https://vk.com/",
    "User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1 AliApp(H/5)"
  }
```

**其他命令**

```bash
# 查看whistle的帮助信息
$ w2 help

# 停止 whistle：
$ w2 stop

# 重启 whistle：
$ w2 restart
```

**Q&A**

1.  证书信任问题
    Q: 苹果手机代理已配置，且已经信任证书打开调试显示无法链接？
    A: 苹果手机还需要手动开启 whistle 的证书信任。参下图手动开启。

<img src="https://github.com/yanyue404/blog/blob/master/assets/whistle/trust-certificate.jpg?raw=true" width="50%" height="50%">

2. 真机样式调试

在标签栏选择 **Weinre** 标签进入，选择 Targets 的链接进入页面。

···bash
https://f.tk.cn/tkproperty/nprd/N20220012/ weinre://0012

````


## 真机代理

**安卓设备**

注意：

1. 如果配置完代理，手机无法访问，可能是 whistle 所在的电脑防火墙限制了远程访问 whistle 的端口，关闭防火墙或者设置白名单。

4. 安装证书后，如无法正常捕获请求，需要将连接笔记本电脑的 wifi 设为 **可信任网络**。

**微信公众号**

1. 启动 whistle 后，先配置**微信开发者工具**代理:

最上边一栏 ---- 设置 ---- 代理设置 ---- 设置本机 ip 加 端口号 8899

4. 设置代理规则

```bash
# 线上混淆代码代理到本地源码
//mcdn.tk.cn/tk-online/assets/public-js/lib/property/wx-util.js  file://C:\Users\Administrator\Desktop\wx.util.js
````

5. 查看代理是否生效

在页面资源面板中使用 `control+p`搜索 `wx-util.js`, 发现资源已经被代理到本地（源码），然后就可以快乐的 debugger 了！

**更多代理**

在 windows 代理服务器设置**本机 ip + 端口号 8899** （win7 在 ie 中设置），然后微信开发者工具就可以使用默认的系统代理，不必配置了。

配置好后 支持 h5 访问类型的抓包，如： Firefox 浏览器，微信里的公众号、小程序等。

## 参考文档

- [官方文档 - whistle 安装启动](http://wproxy.org/whistle/install.html)
- [官方文档 - 安装根证书](http://wproxy.org/whistle/webui/https.html)
