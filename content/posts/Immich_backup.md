---
calendar_date: 2023-05-01
catalog: true
categories:
- 搭建我的家庭服务器
cover:
  image: /cover/cover0.jpeg
date: 2023-05-01 09:12:04
description: using immich to backup all the photos of your home.
lang: cn
mathjax: false
tags:
- Windows
- Docker
thumbnail: /img/header_img/lml_bg27.jpg
title: 使用Immich备份家庭照片
toc: true
---

> 手机到电脑端的图像备份和预览往往是一个大问题，特别是当多个手机要备份的时候，说难不难，但说简单也确实有很多麻烦的地方，因此我推荐 Immich 的解决方案。

Immich 是一个基于个人开发者开发的开源 Github 项目，[immich-app/immich](https://github.com/immich-app/immich)，该解决方案有以下的一些优势：

- 移动端支持：移动端实现便于手机的随时和自动同步；
- 多用户支持：多用户的权限管理、分割、以及用户间的相册共享；
- Live 格式支持：支持各种原生格式存储，

> Self-hosted photo and video backup solution directly from your mobile phone. 

因此我本人推荐按照以下的方式来使用：针对家庭等环境，多用户部署在 NAS 或者某台 PC 上，可以长期或者定期的启动备份服务，然后就可以将手机中的照片空间释放掉。由此可以实现：

1. 通过共享文件夹共建家庭相册；
2. 权限分割个人相册；
3. 定期/自动备份手机中的照片，并清理对应的存储空间；



## Install 安装和部署

官方网站中有各种不同环境下安装的说明和实例已经足够详细，强烈建议根据自己的不同需求查看相关文档；和官方一样，我这边也推荐使用 **docker compose** 进行安装和部署。Thanks to docker，部署与安装变得简单。

```bash
mkdir ./immich_app
cd ./immich_app
```

### Download 下载

安装实际上只需要两个文件，一个是 `.env` 用来填写配置，另一个是 `docker-compose.yml` 文件用来拉取镜像和部署。

**下载** `docker-compose.Yml ` 文件和 ` example.env ` 文件，可以使用下列的 wget 命令，或者直接去对应的 Page。

```bash
# get compose file.
wget https://github.com/immich-app/immich/releases/latest/download/docker-compose.yml
```

> 接着下载 example env 文件，在完成了配置填写后记得将其重命名为 `.env`

```bash
# get the exmple env file.
wget -O .env https://github.com/immich-app/immich/releases/latest/download/example.env
```

### Configuration 配置

env 的详细文件说明查看：[Docker Compose [Recommended] | Immich]( https://immich.app/docs/install/docker-compose )，主要需要修改或者填写的地方有：

-  **UPLOAD_LOCATION**：存储图像备份文件的地址。
- **TYPESENSE_ENABLED**: 如果出现一些问题报错的话，可能需要添加此项，并将其设置为 false
- **其他的参考配置**官方的即可。

### Start 启动服务

使用 docker compose command 启动对应的 containers 即可。

```bash
docker-compose up -d
```

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230502191953.png)

最终呈现的效果大致如图，其他的功能，比如下面的用户管理，图像识别等自动任务，还有一些就不逐一展示了，移动端的使用也十分简单，只要指定好对应的用户密码，以及 ip 端口即可连接，（须在同一个局域网内，或者使用内网穿透）

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230502192530.png)

该界面上可以在线预览，管理相册，查看存储情况，自动识别图像种类等等，手机端则主要是用于同步。

### Upgrade 更新

进入到 docker-compose 对应的目录中，重新拉取镜像再重新启动即可。

```bash
docker-compose pull && docker-compose up -d
```

## TroubleShooting

A. 启用用户登录后还是显示禁止了用户登录；

>可以看看对应的登录界面可不可以下拉，下拉可以看到登录界面，应该是前端未刷新的问题。 

B. 局域网无法访问的时候检查防火墙通行。

>  检查防火墙对 Docker Desktop 的放行