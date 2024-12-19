---
calendar_date: 2021-09-28
catalog: true
categories:
- Windows
cover:
  image: /cover/cover7.jpeg
date: 2021-09-28 02:16:26
description: Some Special tips for Windows
lang: cn
mathjax: false
tags:
- Windows
thumbnail: /img/header_img/lml_bg34.jpg
title: Windows Configuration00 系统初始配置
toc: true
---

@AikenHong 2020

本文介绍个人的 windows 开发环境搭建（包括一些环境安装、功能启用）以及一些使用的小 tips。

## 软件推荐

Windows 的账号同步功能善用，减少在环境迁移的时候对浏览器插件和 Vscode 插件的繁琐同步步骤。

同时对 Onedrive 和外接硬盘的应用可以很好的减轻备份的负担，在网络环境对 Onedrive 友好的时候还是推荐使用，在 Mac 和 Windows 上都有一个比较好的体验。

### 一些基础的软件

| Software          | Type           | Free? & source      |
| ----------------- | -------------- | ------------------- |
| Powertorys        | system enhance | y & github          |
| Translucent       | beautify       | y & Microsoft Store |
| Snipaste          | system enhance | y & offical site    |
| Clash for windows | proxy          | y & github          |
| everything        | search-file    | y & offical site    |
| Potplayer         | Player         | y & offical site    |
| Twinkle Tray      | screen control | y & offical site    |
| 7 zip             | system enhanc  | y & offical site    |
| Zerotier          | NAT            | y & offical site    |
| Nerd Font         | Font           | y & offical site    |
| Wallpaper Engine  | beautify       | n & steam           |
| MyDockerFinder    | beautify       | n & steam           |
| IDM               | Download       | n & offical site    |

###   开发工具

| Software         | Type               | Free? & source      |
| ---------------- | ------------------ | ------------------- |
| Windows Terminal | Terminal Simulator | y & Microsoft Store |
| Powershell 7     | Shell              | y & Github          |
| VsCode           | Editor             | y & Offical Site    |
| Visual Studio    | IDE                | y & Offical Site    |
| Interllij IDEA   | IDE                | n & Offical Site    |
| Git              | -                  | -                   |
| Nodejs           | -                  | -                   |
| Anaconda         | -                  | -                   |

### 文档编写

| Software              | Type            | Free & Source    |
| --------------------- | --------------- | ---------------- |
| Obsidian              | Markdown Editor | y & offical-site |
| Typora                | Markdown Editor | n & offical-site |
| Picgo                 | Image Upload    | y & offical-site |
| CopyTranslate         | Translate       | y & offical-site |
| Mathpix Snipping Tool | Latex Formulate | - & offical-site |

### Daily

| Software | Free & Source      |
| -------- | ------------------ |
| Office   | n & offical-site   |
| Tim      | y  & offical-site  |
| WeChat   | y  & offical-site  |
| OneDrive | y  & offical-site  |
| Steam    | -  & offical-site  |
| Epic     | -  & offical-site  |
| yy       | y  & offical-site  |
| uu       | n  & offical-site  |
| 网易云   | y   & offical-site |

## 开发环境配置

- **安装 python**：直接去 [https://www.anaconda.com](https://www.anaconda.com/) 下载，安装的时候使其添加到路径中
- **安装 Node**：windows 直接去 [nodejs](https://nodejs.org/en/) 官网下载安装，详细文档请参考[Node Version Manage - AikenH Blogs](https://aikenh.cn/cn/Nodes/)
- 安装 Window Terminal：
	- Win11 中自带
	- Win10 可以在 windows store 中安装，也可以去 Github 界面安装
	- 配置请参考 [WindowsTerminal - AIkenH Blogs]()



### 安装 PowerShell7 

该部分安装 PS7 并在 WindowsTerminal 中设置其配置文件：

**安装部分**：在 PowerShell 的 Github Releases 界面下载 msi 版本 [PowerShell/PowerShell: PowerShell for every system! (github.com)](https://github.com/PowerShell/PowerShell) 直接安装即可，自己选择安装位置。

**配置**参考文档：[Powershell- Aikenh Blogs]()

### 启用 WSL2 

这里简单介绍如何启用和安装 WSL2，后续相关的配置等信息参考 [WSl2 - Aikenh Blogs]();

安装和启用 WSL2 需要在 windows 的服务中勾选 Hyper-V 和 Windows Subsystem Linux 支持两个选项，具体操作如下：

1. Win + S 搜索 "功能"，打开启用或关闭 windows 功能
2. 启用对应功能，功能安装完毕后即可
	![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230305091044.png)
	![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230305091150.png)
3. 在 windows store 中安装需要的 Linux 发行版
4. 参考上述所说博文迁移存储位置，配置 windows terminal 等。

## 其他操作

### 粘滞键关闭问题

Sometimes, we could not disable the sticky key which enable for some reason. We could only disable this by click shift 5 time in **LAPTOP ORIGIN KEYBOARD** other than the **EXTERNAL KEYBOARD**.

### 百度网盘倍速播放

百度网盘的网页版倍速播放的技巧：

```html
videojs.getPlayers("video-player").html5player.tech_.setPlaybackRate(2)
```

### Office 恢复自动保存的文件

- 首先在设置（选项）界面找到自动保存的 asd 文件的地址
- 在信息-管理文档中选择 ASD 进行对文档的恢复

### Install Nerd Font

在 [Nerd Fonts](https://www.nerdfonts.com/) 中下载字体后直接右键安装即可，推荐安装，无论是进行编程开发的时候还是针对命令行的美化，或者是 windows terminal 的体验，都是一个必不可少的环节。

### Clash 设置微软相关应用不启用

在主界面的 UWP Loopback 中选中启用代理后出现问题的应用如商店和便笺等

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230325090131.png)

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230325090158.png)

### OneDrive 路径切换

将 OneDrive 设置中的账户选项卡里取消链接此电脑，然后将 OneDrive 的文件夹移动到新的存储位置，最后重新设置 OneDrive，直到到达显示文件夹位置的窗口，选择更改位置，然后选择新的存储位置即可。

文件夹的默认位置在：`c:\user\<username>\OneDrive`

### Hevc 解码器下载

windows 下查看 heic 图片或者一些视频文件的时候会需要 hevc 解码器，该解码器可以从 [Uptodownload](https://hevc-video-extensions-from-device-manufacturer.cn.uptodown.com/windows) 免费下载，无需购买 Microsoft Store 里面的 7 块钱。