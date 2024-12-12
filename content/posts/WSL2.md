---
calendar_date: 2021-09-28
catalog: true
categories:
- Windows
cover:
  image: /cover/cover4.jpeg
date: 2021-09-28 02:17:39
lang: cn
mathjax: false
subtitle: init and set up WSL2
tags:
- Windows
- WSL2
thumbnail: /img/header_img/lml_bg4.jpg
title: Windows Configuration01 WSL2
toc: true
---

WSL（Windows Subsystem Linux） 将 Linux 环境部署在 Windows 中，Linux 环境在补全了 Windows 开发上的不足之外（Bash 等），还有以下的几个特性极大的便利开发和日常使用，因此强烈推荐启用并安装。

- win11 中 wsl2 已经支持相应主机的 cuda，便利了机器学习的开发；
- 子系统中通过/mnt 挂载了 windows 的磁盘，可以通过子系统访问和管理 windows 环境；
- windows 资源管理器可访问和管理子系统中的文件
- 支持 windows 打开子系统中的 GUI 应用

无论是将 windows 和 linux 分别作为日常和开发的环境来隔离，还是两个协同去做开发和日常，都是一个比较不错的选择，下面就介绍一下如何安装和使用 WSL2。

- 开始之前可以参考 [windows terminal]() 安装一下这个官方的终端模拟器，在 windows 上的表现是比较优秀的
- 如果是考虑在 windows 环境开发的话，也可以参考这个[windows]，里面有我个人推荐的一些应用。

## 启用并安装 WSL2 

安装和启用 WSL2 需要在 windows 的服务中勾选 Hyper-V 和 Windows Subsystem Linux 支持两个选项，具体操作如下：

1. Win + S 搜索 "功能"，打开启用或关闭 windows 功能
2. 启用对应功能，功能安装完毕后即可
	![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230305091044.png)
	![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230305091150.png)
3. 安装 linux 发行版可以在 windows store 安装，也可以通过如下的命令进行安装：

```powershell
# 列出对应的发行版
wsl -l -o
# 选择相应的发行版进行安装
wsl --install -d <Distribution Name>
# 如果当前的WSL是1版本，更新到2
wsl -l -v
wsl --set-default-version 2
```


安装完发行版之后，WindowsTerminal 中应该会自动出现其配置文件，如果没有出现也不要紧，可以先迁移其存储位置后再添加配置文件。

## Mount And Move

**WSL 的默认存储路径**：`%LOCALAPPDATA%/packages/c......./local_state` 搜索 Ubuntu 文件夹

而通常 windows 都会有分区，如果是 C 盘较小的（建议是可以不用分区），可以修改 WSL 的默认存储路径，将磁盘挂载在别的地方，操作如下：

首先关闭对应的 wsl 服务，并查看关闭的状态：

```powershell
wsl --shutdown
wsl -l -v # 查看状态
```

确认已经关闭后我们可以将该子系统文件导出，并将原有的系统注销删除

```powershell
# 导出wsl2 system； docker-desktop & docker-desktop-data
# 导出系统 wsl --export <DistroName> <PathToTarArchive>
wsl --export Ubuntu-20.04 E:\WSLWorkspace\ubuntu.tar

# 删除（注销）系统
wsl --unregister Ubuntu-20.04
```

最后在我们希望的地方重新注册该系统：

```powershell
# 导入系统到指定的新位置(使用新路径导入新系统)
wsl --import Ubuntu-20.04 E:\WSLWorkspace E:\WSLWorkspace\ubuntu.tar
```

通常来说，wsl 会自动为系统生成配置文件，这里在 terminal 中可能会出现两个 ubuntu 的 unid，那么我们就把第一个配置文件删掉，然后修改新的配置文件为（主要是在后面添加-u user_name）在指定启动的用户：

```txt
<...wsl.exe> -d ubuntu -u <user_name>
```

or 修改注册表，可以参考以下的方法： [wsl2系统迁移到非系统盘](https://www.vrunion.work/wsl-2-%E7%B3%BB%E7%BB%9F%E8%BF%81%E7%A7%BB%E5%88%B0%E9%9D%9E%E7%B3%BB%E7%BB%9F%E7%9B%98)

or 尝试，但是注意这种方式就不急着注销系统，因为他可能会重新安装在 C 盘，所以最后在注销。

```shell
ubuntu2204 config --default-user <user_name>
```

删除多余的所有 tar，over

### Docker（based on wsl2）

基于 WSL2 安装的 Docker 也能用这种方式迁移相应的存储地点。就仅给出大概的操作流程，不在赘述。

```powershell
# export
wsl --export docker-desktop-data "D:\docker\docker-desktop-data.tar"
wsl --export docker-desktop "D:\docker\docker-desktop.tar"

# unresiester
# import 
# restart
```

## SSH

[wsl2启用SSH](https://www.jianshu.com/p/3e2b7252b4b8)，ssh功能应该默认是启用的，如果ssh没有启用的话

```sh
vim /etc/ssh/sshd_config
```

修改如下的几个配置

>Port = 22 去掉这行的 `#`，代表启用端口号 22
>ListenAddress 0.0.0.0 去掉这行的#，代表监听所有地址
>PasswordAuthentication yes，将这行的no改成yes，代表支持账号密码形式的登录

重启服务

```shell
sudo service ssh restart
```

此时还不能支持root用户密码登录,默认情况下，root用户只支持用RSA登录，但是可以修改配置的,切换到root用户打开SSH的配置文件

找到行`PermitRootLogin prohibit-password`保留这行的#，这意味着：允许root登录，但是禁止root用密码登录，所以这行要注释掉。
 需要添加一行:

  ```powershell
PermitRootLogin yes
```

剩下的其余配置按照`Linux`文档进行文件的配置

## PROXY

### Update

由于 WSL 2 中许多 CLI 工具都需要额外的进行代理设置，还有一些代码中也需要指定代理，令人不厌其烦，因此这里更新对于诸多 CLI 的额外设置。

参考资料（从前到后）：

- [Ubuntu「一键」设置代理 | Sukka's Blog (skk.moe)](https://blog.skk.moe/post/enable-proxy-on-ubuntu/) 
- [WSL2 的一些网络访问问题 | Artin's Blog (cat.ms)](https://cat.ms/posts/wsl2-network-tricks/) 
- [TUN 模式 | Clash for Windows](https://docs.cfw.lbyczf.com/contents/tun.html#windows)
- [WSL 开发环境代理设置 - sulinehk's blog ](https://www.sulinehk.com/post/wsl-development-environment-proxy-settings/) 
- [WSL2 配置代理 (kiritoghy.cn)](https://www.kiritoghy.cn/archives/wsl2pei-zhi-dai-li)

推荐）**通用方案**：使用 Clash 的 TUN 模式，该方案会设置一个虚拟网卡，自动接管该方案设置完毕后无需配置 WSL 中任意 CLI 的代理。

> 首先基于 server 旁边的地球按钮安装需要的依赖，安装完后就可以打开 tun 模式。

备选）**基础方案**：使用脚本设置各个常用 CLI 的代理，需要设置代理的主要有以下这些：npm, yarn 等专用软件。

> wget 和 curl 这种使用的是全局的代理，所以不需要额外的设置，
> 但是像 npm 之类的专有软件一般有命令或者对应的配置文件；

基于参考资料，个人基于需求进行修改，提供脚本如下：

```bash

```

除了上述文章提到的这些，还有一个很容易遇到的问题就是 pip 的安装问题，设置 pip 的代理的方式有以下几种：

-   使用 pip 的 `--proxy` 选项设置代理：`pip install libname --proxy http://127.0.0.1:7890`
-   直接编辑pip的配置文件`pip.ini`，在其中的`[global]`下面添上一行`proxy = http://127.0.0.1:7890`
-   使用 pip 的 `config` 命令来写配置文件：`pip config set global.proxy http://127.0.0.1:7890`

参考文献：[pip：ProxyError(‘Cannot connect to proxy. - CodeAntenna](https://codeantenna.com/a/pAOz55u5Px)

### Basic

set the proxy for the WSL from windows, so we can update the packages ez.

1. 首先获取windows IP:

```shell
cat /etc/resolv.conf|grep nameserver|awk '{print $2}'
# 假设获取的windows ip 为170.20.0.1
```

2. 查看代理软件的端口设置，开启局域网 LAN 链接，开启[防火墙]( https://blog.csdn.net/nick_young_qu/article/details/113709768 )

- 添加入站规则 -> 新建规则
- 类型：自定义
- 程序：所有程序
- 协议和端口：默认
- 作用域：
	- 本地为任何 ip
	- 远程为下列 IP，把 WSL2 获取到的 ip 添加进去（比如上面就是 172.20.0.0/20）（掩码一般是 20 位）
- 操作：允许链接
- 配置文件：三个全选
- 名称：自定义


3. Clash 开启 LAN 和端口,
4. WSL2 中设置代理

```shell
export https_proxy=172.20.0.1:8890
export http_proxy=172.20.0.1:8890
```

**Reference**： [proxy配置参考](https://gray-ice.com/2021/10/04/WSL2%E4%BD%BF%E7%94%A8Windows%E4%B8%8A%E7%9A%84%E4%BB%A3%E7%90%86%E8%BD%AF%E4%BB%B6/)

这里提供一下 WSL 的代理设置脚本

```bash
# show and set proxy for WSL
function GetHostIp(){
  ip=$(cat /etc/resolv.conf|grep nameserver|awk '{print $2}')
  echo "the host ip is: $ip, then we ping it to test fireware"
  ping $ip
}

function SetProxy(){
  ip=$(cat /etc/resolv.conf|grep nameserver|awk '{print $2}')
  export http_proxy=http://$ip:8890
  export https_proxy=https://$ip:8890
}

function unsetProxy(){
  unset http_proxy
  unset https_proxy
}

alias getip=GetHostIp
alias proxyon=SetProxy
alias proxyoff=unsetProxy
```

## SETTING

WSL在Windows Terminal的启动目录设置

```json
//wsl$/Ubuntu-20.04/home/aikenhong
```

### Vmmem 内存占用问题

> Windows 使用 Wsl2 & 基于 Wsl2 的 Docker 时会发现 Vmmem 占用了系统大量的内存（15g/32g），且同时 Docker Dashboard 和 Linux 中的 Top 命令都显示占用并不高。

Vmmem 进程是 Windows 系统为 WSL2 系统预留的虚拟进程，为 WSL2 向系统申请内存和 CPU 资源，即使在 WSL2 并不需要的时候也会保留大量的内存，其默认消耗总内存的50% (20175之前的版本则是80%) 或者 8G，选择其中较小的一个执行。

- 如果需要使用内存且无需 WSL2 时可以使用 `wsl --shutdown` 命令关闭 WSL2；

进入用户文件夹后，新建 or 打开 `.wslconfig` 文件

- powershell `cd ~`
- WIN+R `%UserProfile%`
- 资源管理器 %UserProfile%

在其中可以编辑 wsl2 的 memory 选项，手动其内存使用的上限：

```txt
# Settings apply across all Linux distros running on WSL 2 
[wsl2] 
memory=8GB 
```

重启 WSL 或者直接重启电脑即可。