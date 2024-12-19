---
calendar_date: 2023-08-12
catalog: true
categories:
- 搭建我的家庭服务器
cover:
  image: /cover/cover15.jpeg
date: 2023-08-12 17:24:50
description: 基于Docker安装和配置HA，并提供一些初始的配置选项。
lang: cn
mathjax: false
tags:
- HomeAssistant
thumbnail: /img/header_img/lml_bg15.jpg
title: HomeAssistant01 入门基础篇
toc: true
---

>  接下来本文安装的是 Container 版本的 HA，并非 Supervised 的版本，所以其中是不包含 Add-on 的，如果需要特定的 Add-on 的版本请注意。


基于本篇流程安装 HA 的前置条件是系统上已经安装好了可用的 Docker，该文会介绍 HA 和 HACS 的安装以及一些基础的配置。

## HA & HACS 安装

>  本文安装于 Raspberry pi 4B，与其他操作环境可能会存在一些差异，要注意甄别。

### HA

安装过程主要参考 [Raspberry Pi - Home Assistant ](https://www.home-assistant.io/installation/raspberrypi) 中 Install Home Assistant Container 的章节，如果为其他的 OS 也可以在官网找到类似的指引，不过 docker 版本的差异应该不会特别的大，个人的 Docker Compose File 也已经上传到 [GITHUB](https://github.com/AikenH/aikenh-DockerComposeYML/blob/master/HomeAssistant/docker-compose.yml) 可自行取用。

修改完 `-v` 的挂载目录以后（将数据保存在本地的目录）和 `-e` 的时区后，即可执行拉取和安装 docker，这里-v 挂载的本地目录要记得，后面有用。

```bash
docker compose up -d 
```

安装完后基于 Host 模式的 HA 会运行在 http://localhost:8123 中，localhost 也可以用 ip 替代。安装完后随着[指引](https://www.home-assistant.io/getting-started/onboarding/)完成一些基础的设置，设置好默认的账号密码即可重启 docker 进入 HA 的界面；

到这里已经可以做一些基础的使用了，但是为了支持更多智能家具产品，往往需要安装第三方用户商店 HACS ，从中去下载对于其他智能家具产品的支持。

### HACS

> Home Assistant Community Store 第三方用户商店，便于下载各种各样的集成实现对于各个不同智能家具品牌和产品的支持。

各种不同版本的安装方式可以参考[官方网页](https://hacs.xyz/docs/setup/download)，以下只介绍基于 Container 的安装方式，官方提供了安装脚本，因此现在下载已经相对简单，具体如下：

- 进入挂载的本地目录，执行下面命令，即包含了下载和执行。

```bash
wget -O - https://get.hacs.xyz | bash -
```

> 如果下不下来也可以直接打开网页复制进.Sh 脚本中；也可以去我的仓库中拉下来

安装完重启 HA，在集成页面添加集成，搜索 HACS，搜索到直接进行安装，跟随配置进行安装，并打开 GITHUB 进行登录和授权即可。



![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230812180304.png)

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230812180357.png)

查看是否出现了 HACS 的选项，如果安装完后面出现了如下的界面即为安装完成。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230812175508.png)

由于后续的一些社区插件都是需要从 Github 拉取，因此需要为 HACS 设置代理，目前版本的代理设置在如下位置：`<挂载的本地目录/即HA的config文件夹>/custom_compomemts/hacs/base.py`。

使用编辑器打开该文件进行修改，搜索到 `session.get(url = url` 的字段，添加自己的 proxy 设置如下。重启即可，可以在设置搜索到重启服务进行重启。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230812180027.png)

该方法参考于：[HACS更新后怎么添加代理从而顺畅下载 - 『HomeAssistant』综合讨论区 - 『瀚思彼岸』» 智能家居技术论坛 - Powered by Discuz! (hassbian.com)](https://bbs.hassbian.com/thread-15358-1-1.html)

> 如果无法直接安装，也可以直接上 github 界面下载压缩包，解压到 custom_components 文件夹中。

## 一些简单的基础配置和说明

> 完成上述安装后，就可以开始搭建自己的 HA 系统了，该部分简单对逻辑和一些集成的使用进行说明介绍；

### 简单说明

基于个人的粗浅入门尝试，HA 的配置可以简单理解为实体 entity 和 UI 模板 lovelace 的组合，两者结合来构成我们的控制中心和可视化界面。

- 实体既是智能家居中的各种物件组成，如：灯泡，开关，电视，温度计等，其主要提供：数据源（用于显示和统计），以及控制单元和权限（开关，温度设置等）
- Lovelace 是针对 HA 集成的 UI 模块，其为一种或多种类型的实体提供可视化方案，基于 UI 模块结合读取的实体信息来设计我们的控制台。

> Lovelace is **the user interface that has been packaged with Home Assistant** and has been the standard for several versions now.

因此，安装 HA 中自带的一些集成和 HACS 提供的额外集成提供的是：对各种智能家具的**数据**和**控制权限**的获取能力。

一开始安装完 HA 可以发现其已经默认可以获取一些实体了，这些可以都勾上，然后可以去上述安装 hacs 集成的地方勾选一些有用的系统集成安装，这些实体和默认的一些 UI 的界面可以自行尝试搭配。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230812182406.png)

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230812182553.png)

### 添加系统信息监控

在 `<挂载的本地目录/即HA的config文件夹>/configuration.yml` 中添加系统监管信息如下：

```yaml
sensor:
  - platform: systemmonitor
    resources:
      - type: memory_use_percent
      - type: disk_use_percent
      - type: processor_use
      - type: last_boot
      - type: processor_temperature
      - type: memory_free
```

可以添加的选项可以在[官方页面查看](https://www.home-assistant.io/integrations/systemmonitor/) ，配置完成后重启 HA 即可在实体中看到对应的选项。

### 小米系列设备

通过在 HACS 中安装 Xiaomi Miot Auto 集成，即可添加诸多小米的设备，空调伴侣也可简单的实现集成。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230812184812.png)

### Onvir 监视器设备添加

HA 集成中添加 onvir 集成，添加对应的 IP 和用户名密码即可添加对应摄像头。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230812185244.png)

### 小米温湿度计2代

参考： [【HA】HomeAssistant 添加 小米温湿度计2代_小米温湿度计接入ha_叼辣条闯天涯的博客-CSDN博客](https://blog.csdn.net/weixin_43529394/article/details/130600751)

HACS 安装 passive ble monitor intgration 集成

- 通过此 [Telink Flasher for Mi Thermostat](https://atc1441.github.io/TelinkFlasher.html) 点击 Connect，
	- 选择设备 LYWSD03MMC 进行配对连接
	- 显示了 Connected 后，点击 Do Activation
	- 获取32位密钥 Mi Bind Key

- 获取 MAC 地址
	- 终端中使用蓝牙搜索对应设备
	- 使用以下的命令扫描蓝牙设备，由于是被动接受信号，所以可能需要等待一段时间，等待 LYWSD03MMC 设备出现

```bash
bluetoothctl
# 进入蓝牙连接命令行后
scan on
# 等待LYWSD03MMC设备出现
```

添加集成：Passive BLE monitor，选择树莓派的蓝牙进入下一步，选择 `Add device`，在新的窗口中配置设备；仅需添加 **MAC 地址**和**加密密钥选项**，选择提交后会返回到上一个界面而不是没反应。

将设备选项放在 `--Devices--` 直接提交即可，由于设备广播需要一定的时间，因此需要耐心等待一定时间即可。

## TroubleShoot 问题解决

### Clear Banned Ips 解除 IP 封禁

使用 Nginx 部署 HA 服务后，由于密码输入错误和密码尝试次数限制等原因，可能会导致 IP 被 HA 封禁，这种情况下可以通过手动编辑配置文件中的 `ip_bans.yaml` 文件（和 configuration.Yaml 在同一个目录下），删除自己的 IP 从而实现解封。

参考资料：[Clear Banned LAN IPs - Installation / Home Assistant OS - Home Assistant Community (home-assistant.io)](https://community.home-assistant.io/t/clear-banned-lan-ips/124440)

## FI

分享一下个人的成品：

{{< galleries >}} 
{{<gallery src="https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/32835f5c84cc6778289bd656c0910c5.jpg" >}}
{{<gallery src="https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/85dbfd146eb1041939a643b11775835.jpg" >}}
{{< /galleries >}}