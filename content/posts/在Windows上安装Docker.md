---
calendar_date: 2021-09-28
catalog: true
categories:
- Docker
cover:
  image: /cover/cover10.jpeg
date: 2021-09-28 05:34:21
lang: cn
mathjax: true
subtitle: install docker on wsl2 with portainer
tags:
- Docker
- WSL2
thumbnail: /img/header_img/lml_bg10.jpg
title: Docker Configuration00 Install on WSL2
toc: true
---

基于 WSL2 对于 Docker 的适配，本文介绍 Windows 下利用 WSL2 对 Docker 的安装和部署，对于 WSL2 的安装可以参考上篇文章： [Windows Configuration01 WSL2 - AikenH Blogps](https://aikenh.cn/cn/WSL2/)

## Install Docker on Windows

该部分主要介绍以下几内容：安装，存储盘迁移，连接 WSL2 发行版，完成了这几步之后就可以畅游 Docker 世界了。

> 前置：先安装好一个 WSL2 的发行版，win11 自带 WSL2

首先，官网 [Docker:](https://www.docker.com/) 下载 Docker Desktop for windows，安装基于 WSL2 的 docker，安装完成后 Docker 的发行版和存储目录会默认存放在，该地址可以用来确认后续的迁移状态。

- Docker-Desktop/data：`%LOCALAPPDATA%/Docker/wsl`
- WSL2：`%LOCALAPPDATA%/packages/c......./local_state`  


安装完后首先打开 docker 确认没有其他异常问题报警，然后就可以对存储空间和 Desktop 进行迁移（option），迁移的方式可以参考上文中对 WSL2 的迁移。下面给出脚本便于使用：

```powershell
wsl --shutdown

# 系统导出
wsl --export docker-desktop-data "D:\docker\docker-desktop-data.tar"
wsl --export docker-desktop "D:\docker\docker-desktop.tar"

# 删除原系统
wsl --unregister docker-desktop-data
wsl --unregister docker-desktop

# 挂载新目录
wsl --import docker-desktop D:\docker\docker-desktop D:\docker\docker-desktop.tar
wsl --import docker-desktop-data D:\docker\docker-desktop-data D:\docker\docker-desktop-data.tar

# 建立软连接（需要再cmd中执行，powershell中可能识别不了mklink命令）
# 否则可能会导致 docker-desktop-data 无法正确启动，导致重启后掉盘
mklink "C:\Users\{user-name}\AppData\Local\Docker\wsl\data\ext4.vhdx" "D:\docker\docker-desktop-data\ext4.vhdx"

```

迁移完成后重启 docker 即可，至此，安装就算完成了。

## Basic Setting

为了发挥完整的性能，以及更容易执行 volume 参数进行 data 的挂载，这边强烈建议在 wsl2 中使用 docker！为此，在 docker-desktop 中需要设置如下的几个地方：

> 例如 alist 镜像，在 wsl2 中设置好了 volume 参数，把 data 准确的挂载出来后，数据就不会再 docker 重启的时候丢失了。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230330085804.png)

设置完成后，在 WSL2 中就可以识别和执行 Docker 命令了，后续对 docker、docker-compose 的操作都在 WSL2 中完成即可，接下来就可以在 docker 的应用市场中愉快的淘金了。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230330090709.png)


## Docker Apps( personal recommand )

后续会对其中的一些来做简单的部署和讲解，其实很多都挺适合在 NAS 上部署的，结合内网穿透技术能有一个更好的体验，后面也可以简单介绍以下内网穿透。

1. Alist 个人云管理中心，统一管理，访问，在线观看等，强力推荐
2. Immich 局域网图片备份和管理中心，有移动端 APP，自动备份，权限隔离，
3. Kavita 图书、PDF 管理中心（还在找更好的 pdf 中心）
4. wikijs 个人 wikipage
5. foamzou/melody：音乐资源搜索和自动上传网易云云盘
6. memos：个人备忘录中心

想要一个能够同时管理书籍和论文的 PDF 管理中心，最好能够集成一个比较好的 PDF 阅读和标记工具（比如直接用 Edge 把），不知道有没有类似的。