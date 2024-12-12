---
calendar_date: 2022-07-30
catalog: true
categories:
- Windows
cover:
  image: /cover/cover12.jpeg
date: 2022-07-30 10:03:26
lang: cn
mathjax: false
subtitle: null
tags:
- Windows
thumbnail: /img/header_img/lml_bg12.jpg
title: Windows Configuration02 Terminal
toc: true
---

## Config Windows Terminal in Win11

### Install 安装

windows terminal 在 win11 已经自带，无需安装，如果需要安装的话在 Microsoft Store 下载即可，默认的 terminal 在中文环境中可能要搜索 windows 终端。

### Baisc 基础设置

新版的 Windows Terminal 有了图形化配置界面，因此配置简单和直观了不少，该部分就简要的介绍一下基础的设置。通过 Ctrl+,  或者下拉菜单可以打开设置页面。

**完成每一部分的修改后记得保存**


首先在**默认的终端应用**程序中选择 windows 终端，将其作为默认的终端模拟器（terminal simulator），启动的地方，可以设置默认的配置文件，这里后续会用到。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230322083142.png)

接着交互选项卡中启用**复制粘贴**功能，该功能可以避免在和终端或者 WSL，vim 交互的时候一些复制粘贴的相关问题和配置，（记得点击保存）

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230322083832.png)

该选项卡中还有关闭多窗口时是否提示，可以按需关闭或开启。

紧接着外观选项卡中打开亚克力材料，隐藏标题栏以及深色主题（个人觉得浅色主题和终端界面没法很好的融合在一起）

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230322084423.png)

然后可以为终端提供配色方案，结合后续会提到的透明窗格来使用，默认的配置文件中，我比较推荐 Tango Dark 和 One Half Dark 来搭配使用，但是默认的配置又以下的问题：

- 图形化配置界面方便自定义但是不太方便导入他人的配置
- 默认的配置方案相对较少

因此我们还是使用 JSON 的方式来导入他人的配置文件，配置文件可以参考以下链接获取：

1. [Windows Terminal Themes](https://windowsterminalthemes.dev/)
2. [>_TerminalSplash - Windows Terminal Themes](https://terminalsplash.com/)

在设置界面的左下角打开 JSON 文件

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230322085654.png)

里面找到 scheme 部分，可以看到这里和我们上述链接获取到的格式是一致的，在这里添加配置。添加后可以看到主题就在配色方案中出现即可，后续在各个具体 terminal 的配置文件中进行设置。

### Configs 配置文件设置

在配置文件下可以看到针对每一个 Shell（CMD、Poweshell、WSL） 都会有一套配置文件，如果全都分开设置的话非常的麻烦，因此除了独有设置（蓝框），像外观和一些基础的交互行为（红框），都通过默认值来进行**统一管理**。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230322091239.png)

首先进入**外观选项**，主要需要设置的有以下的几项：配色方案、字体、光标形状、背景图像、不透明度和亚克力材料。

- 配色方案根据上面我们导入的进行选择即可
- 字体选择 [nerd font]( https://www.nerdfonts.com/ ) 可以解决终端中部分图标渲染不出来的问题
- 光标形状和背景图像按照自己的需求进行设置即可
- 推荐启用亚克力材料和不透明度（美化的灵魂）

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230322091845.png)

接着进入**高级选项**，这里主要将铃声通知样式关闭，太吵了。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230322092308.png)

独有配置部分我们以 WSL 为例说一下主要需要设置哪些，除了名称、图标等还可以设置以下的：

- CMD 和 PS 可以设置以管理员身份运行
- WSL 之类的我们可以设置其中的启动目录
- 命令行部分即选择执行的是哪个 Shell 以及是否指定用户
- 针对一些平时用不到的可以从下拉菜单中隐藏。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230322092656.png)

Done for now

## Config Terminal By Json（已废弃）

内测时期的 Terminal 需要通过 JSON 来进行配置，同时也不支持右键菜单中打开，因此有了这个配置，但是随着 terminal 图形化设置界面的完善，该部分配置已经废弃。

**Install** ：Windows Store

**添加 Terminal 到右键菜单**：

参考：[Windows Terminal 完美配置 ](https://zhuanlan.zhihu.com/p/137595941) 中的右键菜单部分：[Install/uninstall scripts for Windows Terminal context menu items ](https://github.com/lextm/windowsterminal-shell/)

注意，这里涉及到注册表修改的操作，所以我们需要在修改注册表之间建立注册表还原点。

**Basic Config**：

新版本的 Terminal 中大部分的配置都已经有了 UI 了，配置起来还是比较方便的，其实主要的配置直接在设置面板里设置就可以了。这里以早期版本的配置文件设置为例：

```json
{
    "$schema": "https://aka.ms/terminal-profiles-schema",
    "actions":
    [
        {
            "command":
            {
                "action": "copy",
                "singleLine": false
            },
            "keys": "ctrl+c"
        },
        {
            "command": "find",
            "keys": "ctrl+shift+f"
        },
        {
            "command": "paste",
            "keys": "ctrl+v"
        },
        {
            "command":
            {
                "action": "splitPane",
                "split": "auto",
                "splitMode": "duplicate"
            },
            "keys": "alt+shift+d"
        }
    ],
    "alwaysShowTabs": true,
    "copyFormatting": "rtf",
    "copyOnSelect": false,
    "defaultProfile": "{07b52e3e-de2c-5db4-bd2d-ba144ed6c273}",
    "initialCols": 130,
    "initialRows": 35,
    "launchMode": "default",
    "profiles":
    {
        "defaults":
        {
            "acrylicOpacity": 0.69999999999999996,
            "closeOnExit": "graceful",
            "colorScheme": "AdventureTime",
            "font":
            {
                "face": "FiraCode Nerd Font"
            },
            "historySize": 9001,
            "padding": "5, 5, 20, 25",
            "snapOnInput": true,
            "startingDirectory": ".",
            "useAcrylic": true
        },
        "list":
        [
            {
                "backgroundImage": "C:\\Users\\Aiken\\Pictures\\Camera Roll\\a560083febb425e04ba0a86a7851c51dc2b417a4.png",
                "backgroundImageOpacity": 0.26000000000000001,
                "colorScheme": "purplepeter",
                "commandline": "powershell.exe",
                "font":
                {
                    "face": "FiraCode Nerd Font Mono Retina"
                },
                "guid": "{61c54bbd-c2c6-5271-96e7-009a87ff44bf}",
                "hidden": false,
                "name": "Windows PowerShell"
            },
            {
                "commandline": "cmd.exe",
                "guid": "{0caa0dad-35be-5f56-a8ff-afceeeaa6101}",
                "hidden": false,
                "name": "CMD"
            },
            {
                "guid": "{b453ae62-4e3d-5e58-b989-0a998ec441b8}",
                "hidden": true,
                "name": "Azure Cloud Shell",
                "source": "Windows.Terminal.Azure"
            },
            {
                "colorScheme": "Banana Blueberry",
                "commandline": "ssh root@202.117.43.196 -p 23076",
                "guid": "{44257ed0-90f8-41a1-bad0-2c637012ce40}",
                "hidden": false,
                "icon": "ms-appx:///ProfileIcons/{9acb9455-ca41-5af7-950f-6bca1bc9722f}.png",
                "name": "202.117.43.196",
                "startingDirectory": "."
            },
            {
                "acrylicOpacity": 0.68999999999999995,
                "antialiasingMode": "cleartype",
                "backgroundImage": "desktopWallpaper",
                "backgroundImageOpacity": 0.20000000000000001,
                "colorScheme": "purplepeter",
                "commandline": "wsl.exe ~",
                "cursorShape": "underscore",
                "experimental.retroTerminalEffect": false,
                "font":
                {
                    "face": "FiraCode Nerd Font"
                },
                "guid": "{07b52e3e-de2c-5db4-bd2d-ba144ed6c273}",
                "hidden": false,
                "intenseTextStyle": "all",
                "name": "Linux20.04",
                "padding": "10",
                "source": "Windows.Terminal.Wsl",
                "startingDirectory": null,
                "tabTitle": null
            }
        ]
    },
    "schemes":
    [
        {
            "background": "#1F1D45",
            "black": "#050404",
            "blue": "#0F4AC6",
            "brightBlack": "#4E7CBF",
            "brightBlue": "#1997C6",
            "brightCyan": "#C8FAF4",
            "brightGreen": "#9EFF6E",
            "brightPurple": "#9B5953",
            "brightRed": "#FC5F5A",
            "brightWhite": "#F6F5FB",
            "brightYellow": "#EFC11A",
            "cursorColor": "#FFFFFF",
            "cyan": "#70A598",
            "foreground": "#F8DCC0",
            "green": "#4AB118",
            "name": "AdventureTime",
            "purple": "#665993",
            "red": "#BD0013",
            "selectionBackground": "#FFFFFF",
            "white": "#F8DCC0",
            "yellow": "#E7741E"
        },
    ],
    "showTabsInTitlebar": true,
    "tabWidthMode": "titleLength",
    "theme": "dark",
    "windowingBehavior": "useAnyExisting"
}
```