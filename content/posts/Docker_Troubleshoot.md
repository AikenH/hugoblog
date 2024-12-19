---
catalog: true
categories:
- Docker
cover:
  image: /cover/cover26.jpeg
date: 2024-07-09 15:52:46
description: null
lang: cn
mathjax: false
tags:
- Docker
- WSL2
thumbnail: /img/header_img/lml_bg1.jpg
title: Docker Troubleshoot
toc: true
---

## TroubleShooting 故障排查
### Credential Related

>[!error]+
>error getting credentials - err: exec: "docker-credential-desktop.exe": executable file not found in $PATH, out: ``

解决方法根据情况可能是以下的两种：[参考资料1]( https://forums.docker.com/t/docker-credential-desktop-exe-executable-file-not-found-in-path-using-wsl2/100225/3 ) | [参考资料2 WSL2](https://peterbillzhang.medium.com/fix-wsl2-docker-error-f4e6502c38a4) | [参考资料3](https://stackoverflow.com/questions/65896681/exec-docker-credential-desktop-exe-executable-file-not-found-in-path)

WSL2 相关的情况下可能需要执行以下的挂载：

```bash
# 执行挂载
sudo ln -s /mnt/c/Program\ Files/Docker/Docker/resources/bin/docker-credential-desktop.exe /usr/bin/docker-credential-desktop.exe
```

也可能是需要修改 `~/.docker/config.json` 或者 `/root/.docker` 中的 `credsStore` 改为 `credStore` 

### Docker Desktop 更新后 Container 消失

>[!error]+
>Docker-Desktop-Data 没有正确启动，导致 Docker Desktop 在版本更新/电脑重启后，所有的 Container 消失了

前一阵，**更新 Docker Desktop 版本/重启电脑**后所有的 container 消失了，重启 Docker, WSL2, Windows，均无法将 Container 找回，怀疑是 Docker 更新后没有正确识别迁移的 Docker-Desktop-Data 和 Docker-Desktop 地址导致找不回数据。

此时，首先**不要删除** docker-desktop 版本去做一些版本回退或者其他删除 Docker-Desktop 的行为，这样做会连带将整个 docker-desktop-data 的 **vhdx 挂载盘**也删除，这样会导致部分未 Mount 到 WSL2 的数据无法找回，彻底无法恢复原本 Container 的部分信息。

因此，无论在回退或者重装 docker-desktop 之前，建议做以下的验证：

1. 使用 `wsl -l -v ` 查看 Dokcer-Desktop-Data 是否正常启动(状态为 RUNNING)
2. 查找当前 Docker-Desktop 和 Docker-Desktop-Data 当前的挂载位置，是否是安装时迁移出来的位置，可以参考 [管理WSL2磁盘空间](https://learn.microsoft.com/zh-cn/windows/wsl/disk-space#how-to-locate-the-vhdx-file-and-disk-path-for-your-linux-distribution) 的最后一小节找到 vhdx 的位置；
3. 如果还是原本的位置，参考自己部署服务的 compose file 查看对应位置的文件是否还存在，如果不存在了，可能是被覆盖了，那可能也是没救了；
4. 如果位置和迁移出来的位置不一致，说明是 Docker-Desktop 对应的数据内容位置不对的问题，可以直接按照 WSL2 的步骤重新导入 Docker-Desktop-Data 尝试能不能找回数据；

如果数据已经无法恢复，也就只能重新部署服务，需要注意的是，如果是 docker-desktop-data 没有启动的问题，且发现对应的 volume 信息已经没有了，这就说明之前的 container 和 volume 等信息可能是存在临时目录已经找不回了，接下来就是如何正确避免再次发生这种情况。

查阅后发现，这是由于将 Docker-Desktop-Data 的挂载到了别的目录，但是 Docker-Desktop 无法正确识别迁移后的地址，他还会在原本的地址找 Vhdx 文件，如果没找到就会导致 Docker-Desktop-Data 无法和 Docker-Desktop 关联起来，相关的服务也就不会启动。

这里通过 CMD 来建立软连接（`mklink {target_path} {file_real_path}`）：

```powershell
# 建立软连接（需要再cmd中执行，powershell中可能识别不了mklink命令）
# 否则可能会导致 docker-desktop-data 无法正确启动，导致重启后掉盘
mklink "C:\Users\{user-name}\AppData\Local\Docker\wsl\data\ext4.vhdx" "D:\docker\docker-desktop-data\ext4.vhdx"
```

重启 docker-desktop 后再重新部署服务即可，可以简单的部署个别文件后重启检查，部署的时候需要注意

- 如果部署所需的**文件&数据库**都已经 **mount** 到对应的 WSL2 上了，整个重新部署的流程会相对简单一些，而且也不会有信息丢失
- 部分无法 Mount 的服务建议查看官方文档是否有备份方法，例如 Immich 的用户数据库，需要手动使用脚本进行备份和后续导入，否则虽然照片不会丢失，但是无法和原始账号关联，只能使用曲线救国的方式去重新将旧照片导入新账号。

因此对于存储重要用户数据的 Docker 服务，建议是在将数据都 **mount** 出来的同时，做好对应服务器的**容灾备份**，我这里是使用了 kopia 将服务器里重要的数据都做了额外备份，但是还是对 Immich 的数据备份缺失了用户设置的部分。

>[!summary]+
>在部署一个服务的时候，要调查好做服务迁移的时候需要备份和导出的内容, 尽量将数据 mount 到主机上，同时结合 `Crontab` 和 kopia 等工具去做一个定时的容灾备份，确保自己的重要数据万无一失。



### Vmmem 内存和 CPU 占用过高

大概率是由于 WSL2 没有限制 docker-desktop 的内存和 CPU 用量导致的，这种时候**重启一下 docker-desktop** 使用率应该就会回到正常值，一劳永逸的话参考一下下面的 [CPU 设置]( #Cpu & Memory Usage Too High) 章节。

## Basic Information & Setting 基础信息和设置

### Where The Volumes of Container Storage

[Locating data volumes in Docker Desktop (Windows)](https://stackoverflow.com/questions/43181654/locating-data-volumes-in-docker-desktop-windows): 除了指定了目录的 volume，其他 docker-desktop(WSL2) 的 volume 将会存放在 `\\wsl.localhost\docker-desktop-data\data\docker\volumes` 中

### Cpu & Memory Usage Too High

修改 windows 上 WSL2 的配置文件，限制 docker 对应的 WSL 服务的内存和内核上限，官方的设置文档如下：[wslconfig](https://learn.microsoft.com/zh-tw/windows/wsl/wsl-config#wslconfig)，其他参考资料 [CSDN](https://blog.csdn.net/qq_31745863/article/details/129852886)

配置文件的地址为：`c:\user\{your name}\.wslconfig` ，如果没有该文件就手动创建一个，可以仅仅简单的配置如下项目即可，具体的数值参考自己电脑的配置，更多配置项可以参考官方文档：

```.config
[wsl2]
# 核心数配置
processors=8
memory=8GB
```

保存后用如下命令关闭 WSL 并重启docker即可

```powershell
wsl --shutdown
```