---
calendar_date: 2023-06-22
catalog: true
categories:
- Docker
cover:
  image: /cover/cover3.jpeg
date: 2023-06-22 09:25:29
description: install docker on linux with portainer
lang: cn
mathjax: false
tags:
- Docker
thumbnail: /img/header_img/lml_bg30.jpg
title: Docker Configuration01 Install on Linux
toc: true
---

不同于 Docker 在 Windows 端借助 Desktop 可视化进行安装和配置，Linux 端没有默认的 Desktop 界面，因此会额外安装 portainer 作为我们 docker 的 Dashboard.

## Install Docker on Ubuntu

> 该部分完全转载自[官方](https://docs.docker.com/engine/install/raspbian/)的安装指引，如果流程需要更新的时候可以移步官网检查，此外官网还包含了其他几种安装方式，这里就不介绍，这里只介绍基于 apt 的安装方式。

### 设置 apt 的 repo 

1 更新 apt 的索引，同时通过下载包来允许 Apt 基于 http 来索引仓库

```bash
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
```

2 安装 docker 官方的 GPG 秘钥

```bash
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
```

3 配置对应的 repository

```bash
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

完成上述设置之后，就可以开始安装 Docker 了。


### 安装 docker-engine

```bash
# 更新apt索引
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin 
```

### 查看是否安装成功

```bash
docker -v
docker-compose -v 
docker compose version
```

（待验证）理论上安装了 docker-compose-plugin 后，应该是已经成功安装了 compose，如果没有的话，可以尝试用下列命令来安装。

```bash
sudo apt-get install docker-compose
```

### 测试服务是否能正常使用

```bash
sudo docker run hello-world
```

通过 hello-world 项目测试 docker 的拉取、构建、运行是否存在问题，通常来说正常安装之后，镜像是能正常的启动，可能出现问题的大多是网络部分，也就是 Pull 的环节，这个环节出问题，通常可以使用两种方式来解决：代理设置/ 换源。

## Install Docker on RaspberryPi

参考官方的安装指令，下载官方提供的安装脚本进行安装，安装完后按照 Ubuntu 中的方式同样校验即可。

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
# can add --dry-run to know what step we invoked
# sudo sh ./get-docker.sh --dry-run
```

简单便捷

##  Source Change or Proxy Setup 

科学上网为了科学，通过换源或设置代理来加速镜像拉取，避免镜像拉取产生的问题，镜像拉取 docker pull 在 docker 中实际上是 daemon 及守护进程执行的，因此主要修改的是其相关设置部分。

参考资料：[docker更换镜像源](https://www.jianshu.com/p/b4a6239712bf) | [配置 HTTP/HTTPS 网络代理 - Docker从入门到实践 ](https://yeasy.gitbook.io/docker_practice/advanced_network/http_https_proxy)

### 换源 Source Change

打开配置文件：

```bash
vim /etc/docker/daemon.json
```

添加镜像源相关设置（添加如下内容）

```json
{
    "registry-mirrors" : [
    "https://registry.docker-cn.com",
    "http://hub-mirror.c.163.com",
    "https://docker.mirrors.ustc.edu.cn",
    "https://cr.console.aliyun.com",
    "https://mirror.ccs.tencentyun.com"
  ]
}
```

配置完使用的所有镜像源后，即可重启 docker 来实现换源：

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker.service
```

使用 docker info 查看配置是否成功：

```bash
sudo docker info
```

在为 Ubuntu 的网络添加代理设置后，换源操作没有解决我无法 pull 相关镜像的问题，后续通过设置了 daemon 也使用代理解决了镜像拉取的问题。

### 代理配置 Proxy Setup

> "docker pull" 命令是由 dockerd 守护进程执行。而 dockerd 守护进程是由 systemd 管理。因此，如果需要在执行 "docker pull" 命令时使用 HTTP/HTTPS 代理，需要通过 systemd 配置

Docker 在拉取、构建、运行三个阶段中，代理的配置是相互独立互不影响的，如果我们希望某个阶段中使用相应的代理，就需要分别进行配置，这里主要介绍的是镜像拉取环节使用的代理，其他部分的代理设置也可以在参考文章中找到。

A. 为 docker 创建对应的配置文件夹

```bash
mkdir -p /etc/systemd/system/docker.service.d
```

B. 创建代理相关的配置文件，并填入代理相关信息，配置文件的路径为：`/etc/systemd/system/docker.service.d/http-proxy.conf`

```bash
vim /etc/systemd/system/docker.service.d/http-proxy.conf
```

C. 填入相关的代理信息：

```ini
[Service]

Environment="HTTP_PROXY=http://192.168.157.231:7890/"
Environment="HTTPS_PROXY=http://192.168.157.231:7890"
Environment="NO_PROXY=localhost,127.0.0.1,.example.com"
```

D. 服务重启

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

E. 查看是否配置成功 

```shell
sudo docker info
```

通常来说只要代理服务器正常运行，到这里应该就可以解决镜像拉取不下来的问题了，接下来为 Docker 安装一个 Dashboard 便于我们查看 Container 的运行情况，以及进行简单的修改等。

## Install Portainer for Docker

参考资料：[Docker环境5分钟快速部署Portainer-ZHIHU](https://zhuanlan.zhihu.com/p/521563945)

这里我们使用 docker-compose 安装 portainer，实际上 docker-compose 实际上就是将 docker 的运行指令写成一个 yml 文件的形式，个人偏好这种方式，这种方式更方便对执行指令的掌握和查看，而且便于长期管理。

首先随便创建一个目录来存放对应的数据和配置：

```bash
mkdir -p ~/workspace/docker-compose-dir/portainer
cd ~/workspace/docker-compose-dir/portainer

touch docker-compose.yml
vim docker-compose.yml
```

编写对应的 docker-compose 文件如下：

```yaml
version: '3'

services:
  portainerce:
    image: portainer/portainer-ce:latest
    container_name: portainerce
    restart: unless-stopped
    security_opt:
      - no-new-privileges:true
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./portainer-data:/data
    ports:
      - 9000:9000
```

在当前目录执行指令，启动安装和构建

```bash
docker-compose up -d
```

执行后我们即可访问：`localhost:9000` 进入 portainer ，首次进入需要设置一个管理员账户，设置完成后即可，

## FI

完成了上述设置之后，就可以开始用 docker 拉取和构建自己需要的镜像了，对于 NAS，树莓派，服务器，各种东西都可以开始愉快的玩耍了。