---
calendar_date: 2023-04-04
catalog: true
categories:
- 搭建我的家庭服务器
cover:
  image: /cover/cover9.jpeg
date: 2023-04-04 14:40:12
lang: cn
mathjax: false
subtitle: 理解内网穿透的原理和简单实现
tags:
- NAS
- NAT
thumbnail: /img/header_img/lml_bg9.jpg
title: 内网穿透（NAT穿透）
toc: true
---

本文简要介绍对内网穿透技术、对内网穿透技术的需求以及介绍一些用于"个人"进行内网穿透的工具和使用。

## 1. 什么是内网穿透(NAT traversal）

在计算机科学中，**NAT穿越**（NAT traversal）涉及TCP/IP中的一个常见问题，即在处于使用了NAT设备的私有TCP/IP网络中的主机之间创建连接的问题。

其中 NAT 即[网络地址转换](https://zh.wikipedia.org/wiki/%E7%BD%91%E7%BB%9C%E5%9C%B0%E5%9D%80%E8%BD%AC%E6%8D%A2)（Network Address Translation）在计算机网络中是一种在 IP 数据包通过路由器或防火墙时重写来源 IP 地址或目的 IP 地址的技术。**这种技术被普遍使用在有多台主机但只通过一个公有 IP 地址访问互联网的私有网络中**。它是一个方便且得到了广泛应用的技术。当然，NAT 也让主机之间的通信变得复杂，导致了通信效率的降低。

> NAT 是作为一种解决[IPv4地址短缺]( https://zh.wikipedia.org/wiki/IPv4%E4%BD%8D%E5%9D%80%E6%9E%AF%E7%AB%AD "IPv4位址枯竭")以避免保留 IP 地址困难的方案而流行起来的。NAT 成了家庭和小型办公室网络连接上的路由器的一个标准特征。

其中最为常见的 NAT 设备就是家家户户都有的路由器，将所有的设备在**局域网**中统一管理，并基于唯一的公网 ip 对互联网（私有网络）进行访问。

而 NAT 会带来以下的问题，因此会需要内网穿透的技术：

- 外网主动发起的服务无法准确的定位到内网的指定机器，会被 NAT 设备丢弃，因此链接会变成单项的，无法双向交互。

因此无法在外网访问内网机器提供给局域网的服务，因此我们的机器，我们部署于 NAS、docker 的服务就只能在局域网中访问，在一定程度上就造成不便。



## 2.如何实现内网穿透

解决方法也比较直观，在内网中建立一个代理服务器，其暴露在公网中，这样，通过直接访问该代理服务器进行中转，进而直接访问到指定的机器，这样其实就是建立了一个[反向代理](https://zh.wikipedia.org/wiki/%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86)来实现内网穿透。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20230405004156.png)

反向代理如何理解呢，就正向代理而言，我们要访问的服务器 IP 是已知的，而我们自身是隐藏的，代理服务器是客户端的。

而反向代理则是我们要访问的服务器是隐藏的，我们需要借由代理服务器去访问它。


## 3.内网穿透工具

1. Zerotier
2. [https://github.com/ffay/lanproxy-go-client](https://github.com/ffay/lanproxy-go-client)
3. [jpillora/chisel: A fast TCP/UDP tunnel over HTTP (github.com)](https://github.com/jpillora/chisel/)
4. ngrok
5. tailscale

使用 Zerotier 搭建内网穿透的话极其简单，这里就不在赘言，上述还包含了一些其他搭建内网穿透的工具。