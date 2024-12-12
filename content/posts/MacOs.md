---
calendar_date: 2022-09-10
catalog: true
categories:
- MacOS Configuration
cover:
  image: /cover/cover23.jpeg
date: 2022-09-10 00:00:00
lang: cn
mathjax: false
subtitle: this Configuration focus on the terminal functionality.
tags:
- MacOS
- Configuration
thumbnail: /img/header_img/lml_bg23.jpg
title: MacOS 的软件安装和系统设置
toc: true
---

配置一台全新的 MacOs（M1）用于日常使用和编程开发，这里总结一下自己体验比较好的 APP 和开发工具。Let‘s Go

## 系统基础设置

**调转 F 区功能**：在涉及到开发的时候，F 区很多情况下就会派上用场，因此这里简单介绍一下：

- 系统设置里搜索"功能键"
- 在弹出页面中选择将 F 1 作为标准功能键勾选即可

**触控板功能**：特别是三指拖动功能一定要开启，用来拖放窗口和文件方便太多。

- 系统偏好设置 -> 触控板 -> 三指点按查询
- 系统偏好设置 -> 辅助功能 -> 指针控制-> 触控板选项 -> 三指拖动

**访达设置：**

首先在偏好设置中有以下的几个可以调整：

- 通用 -> 开启新访达窗口时打开
- 高级 -> 显示文件拓展名
- 边栏 -> 选择自己想要的边栏

接着是在显示选线卡中，可以勾选：“显示路径栏”、“‘显示状态栏’”

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20230402164844.png)


### 用 Raycast 替换 Spotlight

MacOS 中的 Spotlight 是一个很棒的设计，在某些程度上弥补了其资源管理器和应用设计上的缺陷，提高了很大的便利性（Windows 上可以基于 PowerToy 来补全该功能），但是许多第三方的 Spotlight 都比官方好用，这里我推荐免费的 raycast。

raycast 由于其插件支持的特性，能够玩出很多花样，同时其基本的功能也相当的强大，完全可以作为原生的上位替代，因此建议直接关闭原生。

- 系统设置中搜索 spotlight->键盘->键盘快捷键
- 聚焦->关闭

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20230402174110.png)
![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20230402174214.png)

然后在 raycast 中将快捷键设置为 Command +SPC 即可，其也支持剪切板历史记录功能，因此后续没有推荐相关的应用了。

### 将 Edge 设置为默认浏览器

虽然原生的 safari 有着不错的颜值，但是从外观，性能，功能，以及多设备协同中，我个人还是比较推崇 Edge，认为其在大部分平台目前都是我的第一选择。

Edge -> 首选项 -> 默认浏览器 -> 设置为默认浏览器

### 选择自己喜欢的壁纸

这里可以选择动态的壁纸，也就是随着时间变化的类型，其实只是一种特殊的文件格式，使用其作为壁纸就能实现对应的效果，所以我们下载好对应的动态壁纸格式就行：

- [Dynamic 1](https://dynamicwallpaper.club/wallpaper/7v33v1oit8n)
- [Dynamic 2](http://dynwalls.com/index.html)

由于 Mac 本身过硬的屏幕质量，其他的最好4 k 及以上的壁纸，效果会更好，这里给出一些壁纸下载的链接：

1. [Microsoft Wallpaper](https://wallpaperhub.app)
2. [Pixels](https://www.pexels.com/search/mac%20wallpaper/)
3. [Unsplash](https://unsplash.com/wallpapers/desktop/mac)

## 软件安装和配置

首先来个省流总结图如下，个人**必装**的一些软件，大多都是无需什么配置开箱即用的，有一些需要个性化设置的后续可能会专门开文介绍下自己的方案。

| APP           | Type             | Desc                      | Recommend |
| ------------- | ---------------- | ------------------------- | --------- |
| Clash X       | Proxy            | 开发环境配置的时候有一个总没错           | 🔥🔥🔥    |
| Edge          | Browser          | 用微软账号同步多设备、OS；全面          | 🔥🔥🔥    |
| 搜狗输入法         | sys-Enhance      | Macos 自带的实在是太难用了          | 🔥🔥🔥    |
| Snipaste      | Screenshot       | 截图，置顶，                    | 🔥        |
| Xnip          | Screenshot       | 滚动截图                      | 🔥        |
| raycast       | sys-Enhance      | 替代原生的 Spotlight，插件支持，功能强大 | 🔥🔥🔥    |
| Rectangle     | sys-Enhance      | 窗口排列和贴靠                   | 🔥🔥🔥    |
| AltTab        | sys-Enhance      | 支持 windows 的窗口切换，优化纯键盘体验  | 🔥🔥      |
| KaraBiner     | external support | 外接键盘的控制和自定义和热键            | 🔥🔥      |
| BetterDisplay | external support | 外接显示器的全面控制                | 🔥🔥      |
| MOS           | external support | 外接鼠标的 Smooth Scroll 支持    | 🔥🔥      |
| Hidden bar    | beautify         | 隐藏状态栏中不常用的 Icon           | 🔥        |
| Top Notch     | beautify         | 全黑隐藏刘海                    | 🔥        |
| CheatSheet    | Tips             | 长按 Command 提示各个应用的快捷键     | 🔥        |

上面介绍的这些应用大多都是基于日常使用来介绍的，都是免费的软件，因此只要在 appstore 和官方网站进行下载即可，放心使用；

开发和办公需求的一些软件可能会涉及到部分配置，因此会单独介绍（其中像 office、微信 这些基本都会装的常见软件就不再额外介绍。）

### 其他开发软件安装

| APP            | Type               | Desc                   | Recommend |
| -------------- | ------------------ | ---------------------- | --------- |
| VsCode         | Editor(Code)       | ∞                      | 💯        |
| Xcode          | Editor(Code)       | ∞                      | 💯        |
| Obsidian       | Editor(Markdown)   | W(Md), R(PDF), Manager | 💯        |
| Typora         | Editor(Markdown)   | Single Markdown File   | 😀        |
| iterm 2        | Terminal Simulator | Best One in Mac        | 💯        |
| HomeBrew       | CLI                | ∞                      | 💯        |
| Beyond Compare | Compare            | Not Free               | 😀        |
| Office         | Office             | ∞                      | 💯        |
| OneDrive       | Sync               | ∞                      | 💯        |

### 开发环境搭建

| APPs       | Type  | Desc                                | IMG |
| ---------- | ----- | ----------------------------------- | --- |
| KeyCastr   | Video | Show Keyboard Input                 |     |
| Cursor Pro | Video | Enhance and Hightlight Cursor       |     |
| Sidenote   | Note  | (Pay)like stickynote by in one side |     |

### 键位映射

inspired by @devaslife : karabiner-elements --cask; 

安装完成后，我们需要在系统里面启用一大堆安全和隐私权限后，就可以开始键盘映射，可以在其中的网站找到一些映射方案，并导入自己的机器中。

- [x] 找个时间来统一整理键盘映射

### 代理设置

- [x] 修改为取消代理和设置代理的 Bash 脚本，便于切换。

首先介绍代理的安装，配置好了代理方便访问 github、homebrew 等，方便我们对环境进行配置和软件下载。

系统代理我们使用ClashX Pro（Clash的Mac版本）进行配置，starlink推广警告。

Terminal的代理配置，`vim ~/.zshrc` or `vim ~/.bashrc`，添加下面这段，端口7890为默认，可到clash客户端中查看

```bash
export https_proxy=http://127.0.0.1:7890
export http_proxy=http://127.0.0.1:7890
# export all_proxy=sock5://127.0.0.1:7890
```

添加完成后，使用`source ~/.zshrc` 激活修改即可；

有时候由于切换设置或者取消使用Clash，需要取消代理

```shell
unset http_proxy
unset https_proxy
```

可以简单的写一个代理设置的脚本来进行快速设置.

```bash
function SetProxy(){
  export http_proxy=http://127.0.0.1:7890
  export https_proxy=https://127.0.0.1:7890
}

function unsetProxy(){
  unset http_proxy
  unset https_proxy
}

alias proxyon=SetProxy
alias proxyoff=unsetProxy
```