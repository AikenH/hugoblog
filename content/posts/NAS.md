---
calendar_date: 2022-07-27
catalog: true
categories:
- 搭建我的家庭服务器
cover:
  image: /cover/cover25.jpeg
date: 2022-07-27 23:30:00
lang: cn
mathjax: false
subtitle: Design my own Network Attached Storage（NAS）
tags:
- NAS
- NotDone
thumbnail: /img/header_img/lml_bg25.jpg
title: NAS
toc: true
---

“NAS本质上就是一个可以开启文件共享的具有大存储的系统：无论是Windows，Linux或其他一切可基于诸如SMB、Internet提供文件共享或访问功能的系统都可以作为NAS的系统使用。”

不出意外，针对该应用场景，也有针对性的一些简化OS，故而在构建NAS之前，首先分析对NAS存储的需求，进而选择一个合适的系统去构建。

## 个人NAS需求分析

就像NAS：Network Attached Storage所说，NAS最基本的需求是“存储”与“共享”（随时存取），实际也是一个私有网盘（支持更多功能？），本文便基于该脉络分析需求。

| 存储/功能类型      | 使用场景说明                                           | 需求程度 |
| ------------------ | ------------------------------------------------------ | -------- |
| 图片、文件归档     | 存储，预览（基于AI识别分类，时间线，照片墙）           | -        |
| 大文件             | 内网快速传输                                           | -        |
| 电影               | 流媒体服务器：多设备在线观看、封面集归纳和整理（PLEX） | -        |
| 工作文档           | 历史版本，协作编辑                                     | Option   |
| 下载功能           | 看到想看的电影的时候可以直接让他开始下载               | -        |
| 支持docker扩充功能 | 可以使用Docker下载并部署一些其他的乱七八糟的功能       | Core     |

在支持基本功能的基础之上，通过配置的选择来，尽量减少功耗，从而减少长时间启动带来的电费消耗，如果可以的话使用软件或者硬件来记录NAS每个月的耗电量。

- 此外，还需要考虑数据的稳定性，好像叫做《阵列》？（**后续进行补充了解**）

- 断电自动重启
- 文件共享服务：SMB、FTP‘
- 加密和数据安全性

不需要显示器，只需要网络和SSH进行远程登陆和控制之类的。



## NAS-OS

> 主要的一些NAS系统有：FreeNas、nas4free（xigmaNAS）、**unraid（收费）**、**TrueNas Scale/Core**、**omv**、EasyNAS黑群晖
>
> 基于完整OS搭建：
>
> - Debian/Ubuntu（server）+（samba+syncthing+Docker）
> - windows（server）
>
> 好像可以搭配软路由（OpenWrt）一起搭建家用存储系统。

主要考虑Unraid、TrueNas、Omv，由于Unraid收费，考虑使用TrueNas、OMV是否足够满足需要，如果需要的话就不在考虑其他。

### 基于Docker的软件部署

- jellyfin或Plex进行视频资源管理
- 运行虚拟机基于黑群晖进行图像管理？
- 下载工具
- 

### 部署可于外网访问（虚拟内网构建

- zerotier内网穿透？
- 

## 配置分析

实际上就是组装一台不带屏幕的电脑，故而基于现有的多余硬件来组建NAS。

| 设备名称                          | 预算->具体型号 | 功率 | FI？ |
| --------------------------------- | -------------- | ---- | ---- |
| 机箱                              | x              |      | √    |
| 机箱风扇                          | x              |      | √    |
| 内存                              | x              |      | √    |
| CPU（带集显支持硬解）+自带散热    |                |      |      |
| 256-ssd（系统）                   | 200-300        |      |      |
| Hard-Drive（存储空间4T+4T+4T+4T） | 1k             |      |      |
| 电源（基于设备需求进行购买）      |                |      |      |

**仍需考虑**的问题：

- [x] 机箱缺少侧板，且机箱过大，过于占地方，是否考虑重新购买小机箱，或者NAS专用机箱等。
- [x] 考虑供电和放置的位置

### 数据安全（Raid）



## Reference

- [没那么靠谱](https://zhuanlan.zhihu.com/p/480452743)

- [Some Function Support](https://www.zhihu.com/question/21359049)

- [OS选择总说纷纭](https://www.v2ex.com/t/834081)

- [5款NAS系统横评](https://cloud.tencent.com/developer/news/684142)
- [NAS评价大全集](https://einverne.github.io/post/2020/02/nas-operating-system-choice.html)