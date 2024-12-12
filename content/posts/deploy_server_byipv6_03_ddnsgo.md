---
calendar_date: 2023-11-07
catalog: true
categories:
- 搭建我的家庭服务器
cover:
  image: /cover/cover3.jpeg
date: 2023-11-07 13:40:13
lang: cn
mathjax: false
subtitle: null
tags:
- Ipv6
thumbnail: /img/header_img/lml_bg1.jpg
title: 使用Ipv6部署服务03 DDNS-go 动态域名解析
toc: true
---

> 本系列主要介绍通过公网的 ipv6 访问局域网设备并部署自己的服务供公网访问；本篇是其中的第三篇，以 DDNS-go 开源项目为例，部署动态域名解析服务，自动更新主机记录值。

[jeessy2/ddns-go: 简单好用的DDNS。自动更新域名解析到公网IP(支持阿里云、腾讯云、Dnspod、Cloudflare、Callback、华为云、百度云、Porkbun、GoDaddy、Google Domain) (github.com)](https://github.com/jeessy2/ddns-go)

该工具使用起来非常简单，推荐需要动态域名解析的可以尝试使用该工具，简单介绍工具的使用如下：
## 配置 DDNS-GO

前往 [release](https://github.com/jeessy2/ddns-go/releases/tag/v5.6.6) 页面下载对应系统的版本：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20231108083156.png)

解压后双击打开 ddns-go.exe 会自动弹出配置的界面：locahost:9876,选择需要解析域名的 DNS 服务商，选择创建密钥并填入对应的密钥。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20231108083447.png)

选择需要启用的 ipv4或者 ipv6解析服务,填写需要解析的域名（每个域名单独另起一行）

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20231108083755.png)

其他的保持默认即可，在这里完成了基础配置以后，**记得点击保存**，之后便可以**安装对应的服务，使其后台自动更新**，windows 使用管理员打开 powershell 或者 cmd，到对应目录下执行命令如下

```powershell
.\ddns.go.exe -s install -f 10 -cacheTimes 360
```

> 通过合理的配置 `-f` 和 `-cacheTimes` 可以实现 IP 变化即时触发更新且不会被 DDNS 服务商限流, 例如 `-f 10 -cacheTimes 360` 效果为每 10 秒检查一次本地 IP 变化, 每小时去公网对比一下 IP 变化

详细的配置可参考置顶的官网连接。

## Fi