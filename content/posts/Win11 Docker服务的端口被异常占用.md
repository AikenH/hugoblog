---
calendar_date: 2023-11-05
catalog: true
categories:
- 搭建我的家庭服务器
cover:
  image: /cover/cover25.jpeg
date: 2023-11-05 23:46:54
description: null
lang: cn
mathjax: false
tags:
- Windows
- Docker
thumbnail: /img/header_img/lml_bg1.jpg
title: Win11 Docker服务的端口被异常占用
toc: true
---

Windows11基于 WSL2启动 docker 后报错如下（需要注意有时候使用启动命令会报错，但是 restart 命令 docker 可以运行，对应服务无法访问）

> **Bind: An attempt was made to access a socket in a way forbidden by its access permissions.**

观察错误发现占用的信息为2345，从 windows 和 wsl 中分别查看端口是否被占用：

```powershell
netstat -aon|findstr "2345"
```

```shell
netstat -tunlp | grep 2345
```

均显示没有被占用，这可能是由于协议 tcp 使用的动态端口问题导致，可以使用管理员权限在 powershell 或者 cmd 中执行下列命令查看端口是否在动态范围中：

> 动态范围可能是由于 hyper-v 的原因修改过起始端口，所以可能会发现关闭 hyper-v 后没有占用的情况的现

```powershell
netsh int ipv4 show dynamicport tcp
```

如在，修改动态范围，之后使用的时候避开这些端口即可。

```powershell
netsh int ipv4 set dynamicport tcp start=49152 num=16384
```

重启电脑即可生效。