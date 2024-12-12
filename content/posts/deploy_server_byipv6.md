---
calendar_date: 2023-11-05
catalog: true
categories:
- 搭建我的家庭服务器
cover:
  image: /cover/cover9.jpeg
date: 2023-11-05 19:23:17
lang: cn
mathjax: false
subtitle: null
tags:
- Ipv6
thumbnail: /img/header_img/lml_bg1.jpg
title: 使用Ipv6部署服务01 IPV6开启和设置
toc: true
---

> 本系列主要介绍通过公网的 ipv6 访问局域网设备并部署自己的服务供公网访问；本篇是其中的第一篇，以电信宽带为例，说明如何开启 ipv6 服务和外网访问放行。

开启 IPV6 服务主要需要修改两个地方的配置：**光猫开启桥接模式和 IPV6 **、**路由器修改为 pppoe 拨号模式以及防火墙设置**；这里以本人的电信光猫和小米路由器为例：

## 背景介绍

需要在外网访问部署于家庭内网的一些服务，考虑了以下的几个方案，决定使用 ipv6作为核心

| 类型     | 方案                 | 简要说明                                                                                 |
| -------- | -------------------- | ---------------------------------------------------------------------------------------- |
| 内网穿透 | Zerotier             | 免费，需要注册账户，支持移动端，国内速度极慢，且不稳定                                         |
| 内网穿透 | Tailscale（备用）         | 免费，需要注册账号，支持移动端，国内速度一版，稳定性相 Zetotier 较好，但仍不够稳定             |
| 内网穿透 | frp                  | 申请一个有公网的服务器，使用 frp 自己作为内网穿透的中转，贵，较为麻烦                    |
| 公网 IP  | Ipv4                 | 难以申请，其他都好                                                                       |
| 公网 IP  | Ipv6（主力）                 | 获取简单，需要配置一下光猫使用，一劳永逸，快，稳定，多，有暴露公网的危险，需要设置防火墙 |
| 其他     | Cloudflare Zerotrust | 简单，免费，可以绑定域名，但是网站根本登不进去配置页面，速度不快                                                                                         |


## 光猫设置

查看光猫背面的管理员 url，进入光猫管理界面，登录**超级管理员账户**（非普通账户，会跳转到更详细的管理页面，大部分同地区的超级管理员账户应该是一致的，不对可以询问下宽带师傅）

- 管理地址通常为：192.168.1.1
- 超级管理员账号：useradmin
- 超级管理员密码：nE7jA%5

开始之前准备 PPPoe 拨号的帐号和密码，不知道的话等询问好了再开始操作。

在天翼网关->网络->网络设置中进行如下的操作：（这里可以尝试改成 pppoe 并通过开发者模式查看密码，不知道密码不要轻易进行后续操作）

1. 连接名称选择 `+++INTERENT_R_VID_41` 
2. 连接模式从路由改为桥接
3. IP 模式确认为 `IPv4&IPv6`
4. 点击保存/应用

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20231105215512.png)

在天翼网关->状态->网络侧信息中检查 IPv4 和 IPv6 是否都开启成功：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20231105215637.png)

参考资料：[个人宽带如何开启IPv6网络访问](https://cloud.tencent.com/developer/article/1894991)



## 路由器设置

进入小米路由器管理页面：192.168.31.1，选择上网设置并拉到上网设置部分

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20231105220425.png)

将上网方式改成 PPPoE 并设置宽带账号和密码，在路由器进行拨号，其他保持默认即可。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20231105220642.png)

拉到最下面 **IPv6 网络设置** ，将上网方式改为 Native ，自动配置 DNS，上网方式改为 Native，**防火墙可以先关掉，测试一下连接后再打开，等完全配置好再最终关掉**。

> 由于大部分路由器都没有针对 ipv6 的防火墙规则设置，只有单纯的开或者关，所以我们再设置好 windows 防火墙和 https 后再打开。

> 这里 DNS 也可以选择手动设置为 ipv6 的 DNS，但我们只是为了公网访问本机的服务就不设置了

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20231105222452.png)

配置好之后应该会显示当前的 IPv6 网络信息：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20231105223926.png)

可以用以下的几种方式验证是否真正开启成功：

- [IPv6 测试](https://test-ipv6.com/index.html.zh_CN) 网站
- **Windows PowerShell** 使用 `ipconfig/all` 查看 IPv6 信息，应该有以下的3条信息；
	- ![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20231105224822.png)
- **Linux/Raspberry Pi** 使用 `hostname -I` 查看 ip 地址；
- 获取完 ipv6 地址后可以通过移动数据访问对应端口的服务来确认是否打开了公网访问。

## 防火墙设置

### Windows 防火墙设置

参考官方文档对防火墙的设置：[启用具有高级安全性的Windows Defender防火墙并配置默认行为 - Windows Security | Microsoft Learn](https://learn.microsoft.com/zh-cn/windows/security/operating-system-security/network-security/windows-firewall/turn-on-windows-firewall-and-configure-default-behavior)，并检查自己的防火墙设置：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20231113084857.png)

可以发现防火墙默认是阻止未设定的规则实现入站的，可以通过检查入站规则再关闭一些不安全的外网访问端口，

通过 `netstat -an | findstr "LISTENING"` 检查正在监听的窗口，并使用 telnet 检查是否开放端口开放（或者参见下列文章中提到的测试网址，最好是关闭了再去尝试）

禁止 ipv6 指定端口入站，如 135，3389，445，以及 446-65536 可以参考下列文章进行设置，其中 `2000::/3` 可以代表所有的公网 ipv6 地址；

- 可以按照该文章，额外设置防火墙关闭3389端口 [「特别篇」在关闭光猫、路由器IPv6防火墙后可能遇到的安全问题 ](https://www.bilibili.com/read/cv25465237/) ；

### Linux 防火墙设置

参考资料： [How To Set Up a Firewall with UFW on Ubuntu 22.04 | DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-with-ufw-on-ubuntu-22-04)

使用 UFW 设置 linux 的防火墙，默认关闭外网访问，简单摘要以下需要执行的指令如下：

```bash
sudo apt-get install ufw
sudo vim /etc/default/ufw
# 将其中的IPV6也设置为yes
```

开始配置 ufw，设置为默认禁止入站允许出站：

```bash
sudo ufw default deny incoming
sudo ufw default allow outcoming
```

设置允许 SSH 连接和指定端口的出站，阻止 http 连接并启用 ufw：

```bash
sudo ufw allow ssh
sudo ufw allow {port}
sudo ufw deny http
sudo ufw enable
#sudo ufw disable #为关闭服务
```

检查相关设置并删除错误的规则配置

```shell
sudo ufw status verbose # 查看设置，是否activate
sudo ufw status numbered # 查看对应规则的idx，后续关闭该规则时候需要
sudo ufw delete {idx} # 删除对应的规则
```

允许局域网网段访问

```shell
sudo ufw allow from 192.168.1.0/24 to any port 【port】
# sudo ufw allow from 192.168.1.0/24 to any port 【port】proto tcp
```

这里注意一下 kodi 可能需要8080，9090，9777这三个端口来支持遥控器的正常连接。

### HTTPS 设置

关注下后续设置服务部署的部分，会介绍通过 Nginx 和腾讯云部署 HTTPs.

## Troubleshooting
### 路由器改桥接后访问光猫管理页面

> "光猫使用 Route 模式时，通过光猫的 DHCP 给下游设备地址（192.168.1.\*），此时可以从下游终端访问到管理页面，而改为桥接模式时，则使用路由器的 DHCP 进行地址赋予(192.168.31.\*), 无法访问光猫管理地址"

1. 网线连接光猫
2. 将 ip 手动设置到光猫同一网段:192.168.1.Xx | 子网掩码 255.255.255.0
3. 访问 192.168.1.1

> 使用完记得将 ip 修改回自动获取模式