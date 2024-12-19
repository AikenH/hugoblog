---
calendar_date: 2023-11-10
catalog: true
categories:
- 搭建我的家庭服务器
cover:
  image: /cover/cover17.jpeg
date: 2023-11-10 14:05:15
description: null
lang: cn
mathjax: false
tags:
- emby
- Nginx
thumbnail: /img/header_img/lml_bg1.jpg
title: 破解本地自托管Emby服务
toc: true
---

## Intro 问题描述

以 emby 为例，学习如何对这种自托管的服务，请求验证网站的软件进行破解，破解的整体思路分为以下的两类：

> 一种是改客户端，一种是改服务端。两种方式的最终原理一样，都是搭建仿冒认证服务器，客户端访问伪服务器拿到授权信息；【3】

因此无论是那种方法我们都需要搭建伪验证服务器：所以以下的操作是必须的：

1. 抓取定位到验证服务器的地址，并获取验证服务器返回的验证信息格式；
2. 使用 Nginx 搭建虚拟的验证服务器，使其返回激活/验证信息；

如果是**修改客户端**，则在搭建完验证站后需要：

- 修改 Host 文件，将请求验证服务器的请求劫持到本地搭建的服务上；
- 需要伪服务器和客户端都要安装自签名证书

如果是**修改服务端**，则后续需要：

- 修改服务端源文件，将默认的认证服务器 mb3admin.com 地址直接改成伪服务器
- 这样就**不需要安装自签名证书**

如果是使用 Docker 进行部署的 emby 可以使用别人修改好的服务端的镜像进行部署安装（like 开心版）

本文主要介绍验证服务器的搭建、修改客户端的方法，以及一些其他的注意事项；



## Server 伪验证服务器搭建

### CA 证书申请

> 什么是证书：[什么是 SSL 认证？- SSL/TLS 认证简介 - AWS (amazon.com)](https://aws.amazon.com/cn/what-is/ssl-certificate/)

这里由于我们并没有真正拥有认证网站 md3admin 的域名故而没有对应的证书文件，因此需要为自己的服务自签发一个假的证书文件，并手动让浏览器信任该证书，保证在将该域名通过 hosts 修改转移到自己的服务上时，浏览器能正常请求该页面。

下面介绍证书的签发过程（转载自参考文献:【2】)：

```shell
mkdir -p <username>/<docker-file-path>/nginx/cert/mb3admin.com && cd <username>/<docker-file-path>/nginx/cert/mb3admin.com

# 生成 CA 密钥
openssl genrsa -out ca.key 2048 
# 生成 CA 证书
openssl req -x509 -new -nodes -key ca.key -subj "/C=CN/ST=Beijing/L=Beijing/O=<username>/OU=<username>/CN=<username>/emailAddress=<user-email>" -days 36500 -out ca.crt
# 将 CA 转换成 p12 格式，并指定密码 （<username>）
openssl pkcs12 -export -clcerts -in ./ca.crt -inkey ca.key -out ca.p12 -password pass:<username>
# 将 p12 格式的证书 Base64 编码
base64 ca.p12
# Base64 一行不能超过 76 字符，超过则添加回车换行符。如果因为换行的原因，不能安装证书，可以使用 -w 参数
base64 -w 0 ca.p12
# 将 CA 转换成 pem 格式
openssl x509 -outform pem -in ca.crt -out ca.pem
# 生成服务端私钥 server.key
openssl genrsa -out server.key 2048
# 生成服务端证书请求 server.csr
openssl req -new -sha256 -key server.key -out server.csr -subj "/C=CN/L=Beijing/O=<username>/OU=<username>/CN=mb3admin.com/CN=*.mb3admin.com"
# 生成服务端证书 server.crt
openssl x509 -req -extfile <(printf "subjectAltName=DNS:mb3admin.com,DNS:*.mb3admin.com") -days 3650 -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out server.crt
```

上述代码中替换一下自己的相关信息即可（也可以直接去参考资源中获取直接执行的代码）：

- `\<username\>`
- `\<user-email\>`
- `\<docker-file-path\>`

生成对应证书后，对证书的操作还有以下的两步，我们首先介绍证书安装，在对 Nginx 进行配置。

- Nginx 配置：将 server.crt 和 server.key 放到 nginx 存放的地方，方便后面配置 Nginx
- 证书安装：便于浏览器后续正常访问

### 证书安装

双击打开证书目录中的 crt 进行证书安装，会显示“无法验证到一个受信任的证书颁发机构”，这是因为我们只是自签发并没有找第三方机构认证，不要紧直接安装即可。

> 没有安装证书的情况下也可能会发现验证信息正确但是激活失败的情况

这里简单介绍以下 ubuntu 信任证书的方法【2】（nas 和 ios 可参考该文）

```shell
sudo cp ca.crt /usr/local/share/ca-certificates/zhuangzhuang.crt && sudo update-ca-certificates
```

### Nginx 设置

Nginx 可以直接在 conf.d/default.conf 中新增以下代码片段

```json
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name mb3admin.com;

    ssl_certificate /etc/nginx/cert/mb3admin.com/server.crt;
    ssl_certificate_key /etc/nginx/cert/mb3admin.com/server.key;
	ssl_session_timeout 5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Headers *;
    add_header Access-Control-Allow-Method *;
    add_header Access-Control-Allow-Credentials true;

    location /admin/service/registration/validateDevice {
        default_type application/json;
        return 200 '{"cacheExpirationDays": 365,"message": "Device Valid","resultCode": "GOOD"}';
    }

    location /admin/service/registration/validate {
        default_type application/json;
        return 200 '{"featId":"","registered":true,"expDate":"2099-01-01","key":""}';
    }

    location /admin/service/registration/getStatus {
        default_type application/json;
        return 200 '{"deviceStatus":"0","planType":"Lifetime","subscriptions":{}}';
    }

    location /emby/Plugins/SecurityInfo {
        default_type application/json;
        return 200 '{"SupporterKey": "", "IsMBSupporter": true}';
    }
}
```

可以看到其中最为关键的是以下的几个点：

1. 设置好 servername 为验证网址的域名 mb3admin.com;
2. 将以下的域名子路径都设置为返回对应的验证信息
  - `/admin/service/registration/validateDevice`
  - `/admin/service/registration/validate`
  - `/admin/service/registration/getStatus`
  - `/emby/Plugins/SecurityInfo`
3. ssl_certificate 和 ssl_certificate_key 填写好对应的证书文件地址存放地址

### Hosts 文件修改

linux 修改 host 文件地址：`/etc/hosts`

```bash
sudo echo "<server_ip>    <domain_address>" >> /etc/hosts
```

Windows 修改 host 文件地址：`C:\Windows\System32\drivers\etc\hosts`

```txt
....
<server_ip> <domain_address>
```

修改完立即刷新 dns 不需重启立即生效的方法,在 powershell 执行：

```powershell
ipconfig /flushdns
```

## Test 服务测试

完成上面的服务和 Host 修改后，可以登录对应的网站进行测试或者使用 curl 进行测试：

可以通过浏览器访问： https://mb3admin.com/admin/service/registration/validateDevice/ 或者 https://mb3admin.com/admin/service/registration/validate/ 查看返回信息是否正确；

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20231112095033.png)

或者在 **powershell** 中执行以下命令查看返回信息是否正确，这里需要注意的是可能会与 WSL2 部署的 docker 混淆，但是该指令是否生效我们还是要在宿主机上的 powershell 查看。

```powershell
curl -ik https://mb3admin.com/admin/service/registration/validateDevice/
```

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20231112095026.png)

`-k` 参数是为了忽略**证书不受信任的 https 访问安全限制**导致访问失败的问题。例如如下相关报错

```txt
> Curl(60) issuer certificate is invalid 
```

如果使用 curl 能够正常返回，但是网页的返回信息有误，或者无法打开网页，可能就要考虑如下的原因：

- **证书信任问题**，可能要看是否正确配置和安装相关证书
- **浏览器缓存问题**，可以使用隐私(InPrivate)模式再次访问,或者清楚缓存后再次访问；
- **代理的问题**，具体的配置如下
### Clash 代理配置

若是由于设置了代理导致网站测试失败，这种情况下可以关掉代理再做测试，或者新增规则，配置验证网址不走代理。

配置规则的方法以 Clash 为例如下：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20231111161114.png)

```txt
parsers: # array
    - url: <你的订阅地址>
      yaml:
        prepend-rules:
            - DOMAIN-SUFFIX,<直连的域名>,DIRECT
```

添加 DOMAIN-SUFFIX 设置对应的域名为直链即可；

### Activate 激活

访问 emby 服务页面，在 `emby premiere` 选单中随便选取密钥存储即可，这里会显示无效的密钥但是不要紧，可以切换主题看看是否已经激活成功。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20231112100556.png)

或者在控制台界面看是否已经有金标即可：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20231112100635.png)

## IOS 使用小火箭解锁 emby

详细图文请访问参考资料【5】，下面是简单的摘要：

第一步 default.conf（长按） -> 编辑纯文本，将以下代码贴到底部：

```shell
[Script]
EmbyPremiere = type=http-response,script-path=https://raw.githubusercontent.com/rartv/SurgeScript/main/EmbyPremiere/EmbyPremiere.js,pattern=^https?:\/\/mb3admin.com\/admin\/service\/registration\/validateDevice,max-size=131072,requires-body=true,timeout=10,enable=true
[MITM]
hostname = mb3admin.com
```

第二步 default.conf（右侧的 i 按钮） -> `https解密` （界面中应该会有 mb3admin.com 的域名信息）-> 证书-> 生成新的 CA 证书 -> 安装证书 -> 系统中信任证书

第三步打开 vpn，打开 emby，信任证书选择 ok，激活完成后可以关闭小火箭，后续失效的时候再打开一次即可。
## Ref 参考资料

1. [群晖上利用现有nginx搭建emby破解服务 (lengyue524)](https://lengyue524.github.io/emby/2021/10/19/%E7%BE%A4%E6%99%96%E4%B8%8A%E5%88%A9%E7%94%A8%E7%8E%B0%E6%9C%89nginx%E6%90%AD%E5%BB%BAemby%E7%A0%B4%E8%A7%A3%E6%9C%8D%E5%8A%A1.html)
2. [Nas Emby 伪验证服务站搭建 - ZHUANGZHUANG](https://zhuangzhuang.io/2022/01/08/emby-carck.html)
3. [学习 Emby 解锁及优化 - Gallen's Blog (hgl2.com)](https://hgl2.com/2023/unlock-emby/)
4. [Emby全平台开心版、认证服务器设置方法 | Velaciela](https://velaciela.ms/emby-free-premier)
5. [iOS利用小火箭解锁Emby | 胡萝虎的博客 (huluohu.com)](https://www.huluohu.com/posts/186/)

## Fi