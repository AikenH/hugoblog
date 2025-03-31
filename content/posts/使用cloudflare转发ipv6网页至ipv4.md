---
catalog: true
categories:
- 搭建我的家庭服务器
cover:
  image: /cover/cover21.jpeg
date: 2025-03-30 14:16:22
description: Descript for artical
lang: cn
mathjax: false
tags:
- Nginx
- Ipv6
thumbnail: /img/header_img/lml_bg1.jpg
title: 使用 cloudflare 转发 ipv6 网页至 ipv4
toc: true
---

## Intro 起因：为 follow 添加小红书全文获取

事情的起因是为了部署 Rsshub 服务为自己的 folo 提供小红书的全文解析，而 folo 是不支持本地/ipv6 的 rsshub ，因此需要将对应设置好小红书 cookie 的 rsshub 服务部署到 ipv4 的公网环境之下，权衡之下采取了该方式进行。

以下简单介绍一下自己的尝试过程：

- 首先尝试利用 vercel 部署：由于部署 [rsshub](https://docs.rsshub.app/zh/deploy/) 到 vercel 的方式目前还没修复，如果[使用 legacy 分支部署](https://github.com/DIYgod/RSSHub/issues/14622)，也无法支持小红书的全文获取的需求，对应的环境变量可以直接在 github  rsshub 仓库的根目录直接添加 `.env` 文件即可。
- 其余的部署方式部分是需要收费的，或者说注册起来比较麻烦就没有再去尝试；

本地尝试全文获取主要感谢以下作者的探索和分享，这里不再重复分享，通过添加 Cookie 的方式获取了小红书的 全文 Rss 源：

- [顾佳凯的网络日志 | 小红书RSS的解决方案](https://blog.gujiakai.top/2024/09/xiaohongshu-rss-tips/)

但是由于小红书反扒严重，因此使用该方案还是要小心被封或者稳定性等问题，故而暂时没有将该 rsshub 源公开出来。

rsshub 的其余部署细节和配置可以参考：[RSSHub](https://docs.rsshub.app/zh/) 官网的文档，这里不在赘述，

## 转换 ipv6 服务到 ipv4 环境

我们也知道获取公网的 ipv6 地址是比较容易的，通常普通家庭或者宽带都不会有公网的 ipv4 ，在此情况下 ipv6 的访问支持也并没有十分普及，在一些公共网络环境或者一些公司网络中，很多部署在 ipv6 环境下的网页实际上是没法被访问到的，而通过流量访问，还是有其局限性（流量收费限制）；

因此这里就尝试通过免费的 CloudFlare 的 CDN 服务来将 ipv6 服务代理到 ipv4 环境中，以下是一些相关的资料：

-  [Cloudflare让IPV6不在鸡肋 | 天增的博客](https://www.ztianzeng.com/posts/Cloudflare%E8%AE%A9IPV6%E4%B8%8D%E5%9C%A8%E9%B8%A1%E8%82%8B/)
- [利用cloudflare让ipv4与ipv6互通_NAS存储_什么值得买](https://post.smzdm.com/p/avxzg2gm/)
- [使用Cloudflare代理为纯IPv6站点添加IPv4访问 - 哔哩哔哩](https://www.bilibili.com/opus/969223623124451365)


### 转换腾讯云解析到 Cloudflare

> 使用 CF 的 CDN 的方式的先决条件是已经有了自己的域名，同时已经通过/可以通过公网 ipv6 发布自己的服务

Cloudflare 官网： https://dash.cloudflare.com/

主要参考[开启 Cloudflare CDN 代理，实现 IPv4 to IPv6 转换_ipv4转发ipv6-CSDN博客](https://blog.csdn.net/qq_38894585/article/details/131054885) 一文，在已经基于 ipv6 部署了服务的情况下，参考该博主的文章将域名的 DNS 解析服务转换到 CF 即可，但是后续可能会遇到访问服务的时候反复重定向的问题，这里可以参考[TroubleShooting]( ### CloudFlare 网站【重定向次数过多】) 部分的解决方案；

P.S. 备注
- 后续还是可以在腾讯云的控制台对子域名申请免费证书，对应的解析在 CF 中进行即可，
- 后续对应子域名的添加可以借助 DDNS-GO 直接更新到 CF 中即可
- CF 对于服务的端口是有要求的，笔者本地是通过 Nginx 进行反向代理各项服务的，因此只需要处理好域名的对应关系即可。
- 通过这种方式，可以使用一个备用域名来将自己的一些服务部署到 ipv4 上。

## Troubleshooting 一些问题解决

### 为 CloudFlare 配置 DDNS-Go 动态更新 ipv6 地址

这里 DDNS-Go 的配置没有什么特别的，主要就是要获取 CloudFlare 的密钥，填入对应的配置中即可，具体的密钥获取位置如下：

首先进入 Profile 页面：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20250331001823.png)

选择 API Tokens 中创建一个新的 Token

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20250331001907.png)

选择 Edit zone DNS 模板后设置自己要操作的域名如下，最后点击确定即可获取需要的 Token

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20250331002118.png)


DDNS-Go 的话只需要新增一个 Cloudflare 的配置，填入对应的 token 后，在 Ipv6 的部分添加你要跟踪的子域名即可，如果域名不存在 Cloudflare 中，其会自动完成对应记录的添加：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20250331002310.png)


**Ref**: [3、使用DDNS-GO配置DDNS，通过cloudflare api修改指定域名对应的动态ip - 知乎](https://zhuanlan.zhihu.com/p/581967733)

### CloudFlare 网站【重定向次数过多】

通常都是由于 SSL/TLS 的设置冲突导致的，这里只需要去 CloudFlare 管理面板的 SSL/TLS 菜单中将安全策略改为 Full（Strict）即可解决。

具体操作如下图：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20250331001459.png)

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20250331001546.png)

ref：[使用 CloudFlare 导致网站「重定向的次数过多」解决方案_wordpess 使用 cloudfare 重定向次数-CSDN博客](https://blog.csdn.net/qq_37126941/article/details/122540553)

## Fi
