---
calendar_date: 2023-03-05
catalog: true
categories:
- Windows
cover:
  image: /cover/cover8.jpeg
date: 2023-03-05 09:59:40
lang: cn
mathjax: false
subtitle: Setup powershell in windows
tags:
- Windows
- Powershell
thumbnail: /img/header_img/lml_bg35.jpg
title: Windows Powershell 00 Install and Config
toc: true
---

Update:@20230214

shift+右键: 在此处打开 powershell.

[PowerShell ](https://github.com/PowerShell/PowerShell/releases)，这里的 PowerShell 和 windows 的已经不是同一个东西了，可能要更先进一些，通过 `msi` 进行安装，安装完后重启 terminal 就会自动的添加配置，后续的配置在这个 new shell 中进行会更好一些

## Basic Setting

### Setting & Cancel Proxy

设置代理如下：

```powershell
netsh winhttp set proxy 127.0.0.1:8890
# 查看代理设置情况
netsh winhttp show proxy
```

取消代理设置使用：

```shell
netsh winhttp reset proxy
```

### Setting Policy

如果 powershell 中禁止运行脚本运行：

```powershell
# 查看当前的策略
get-executionpolicy

# 管理员打开并执行以下命令修改策略
set-executionpolicy remotesigned
```

执行完策略以后就可以安装模块

## About Module 

[关于模块 - PowerShell | Microsoft Learn](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_modules?view=powershell-7.3) 模块是包含了 Powershell 命令，函数，工作流，变量或者别名的包，打包作为一个整体来提供和加载，便于共享使用。可以作为 powershell 的 “插件”或者拓展功能来理解他。

> **模块自动加载**的新功能占位，目前还没有很理解。

`get-module` 可以查看当前会话已经加载的模块，我们也可以通过 `get-module -ListAvailable` 列出所有可供加载的模块（已安装）

**如何安装模块**（上述参考链接中提供了迁移模块目录的方法）：

`Install-Module` 命令可以从联机存储库获取符合指定条件的模块，并将其安装到默认的模块安装地址。

```powershell
install-module -name -dirColors -verbose
```

该命令有许多参数，这里主要推荐 `-scope` 指定安装用户，`-name` 指定搜索的包名，`-verbose` 可视化安装过程，便于 Check 是否卡住（可以用 `get-module` 命令来检查是否安装完成）

其他的参数可以参考官方链接： [Install-Module (PowerShellGet) - PowerShell | Microsoft Learn](https://learn.microsoft.com/zh-cn/powershell/module/powershellget/install-module?view=powershell-7.3)，包括安装指定版本，查找结合安装等等。

在完成 module 的安装过后，我们需要将该模块导入会话，类似 `import` 之于 python，也可以借助 `$PROFILE` 默认导入每一个会话。那么

**如何导入模块**：使用 `Import-Module`，**导入模块** 到当前会话，也可以将导入命令写到配置文件中，使其默认导入每一个新开的会话中，配置文件我们可以通过如下的方法进行编辑

```powershell
echo $PROFILE # 找到配置文件的目录，使用自己喜欢的编辑器进行编辑。
vim $PROFILE # 或者使用 vim 在这里直接编辑，我这里使用的是 vscode，将 vim 换成 code 也一样。
```

其他一些关于配置文件的操作和用法展示可以参考： [关于配置文件 - PowerShell | Microsoft Learn](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_profiles?view=powershell-7.3)，在后续介绍了特定模块的安装之后，我将会展示一个对应的配置文件例子。

**如何卸载&取消导入模块**：

当我们不希望载入部分模块或者觉得一些模块是鸡肋的时候，可以通过 `remove-module` 命令取消该模块在当前会话中的加载，或者通过 `Uninstall-Module -name ` 命令直接将该模块删除，这里需要注意的是，有些模块的 Uninstall 可能不会立即生效，这个时候我们可以重启会话看是否已经卸载。

在对模块的定义和模块的一些操作有了基本的了解之后，接下来我们通过安装一些模块来美化&优化 Powershell 使其在更好看的同时也更好用。

## Install Module

### Install PSReadLine & config it

新版的 Powershell 会默认安装 PSReadLine，没有默认安装 PSReadLine 模块的话：

```powershell
Install-Module -name PSReadLine -verbose
```

也可以按照下面的流程，安装 PowerShell 插件：

```powershell
# 后面的这些User的限制倒是不需要
# 安装PSReadLine
Install-Module -Name PSReadLine  -Scope CurrentUser
# 如果上面安装出现问题, 可以尝试下面的
Install-Module -Name PSReadLine -Scope CurrentUser -Force -SkipPublisherCheck

# 安装PSR包，让命令行更好用，类似ZSH
Install-Module -Name PSReadLine
Install-Module -Name PSReadLine -Scope CurrentUser

# 查看是否安装完成
Get-Module -ListAvailable
Import-Module PSReadLine

# 安装Posh-git包，让git更好用
Install-Module -Name posh-git
Install-Module -Name posh-git -Scope CurrentUser
```

可以在会话中 Import 测试效果，并将满意的配置写入 `$PROFILE`。

```powershell
Import-Module PSReadLine
```

设置 PSReadLine 将以下的内容写入 PROFILE （或者逐一在会话中执行验证效果）：

```powershell
# 设置预测文本来源为历史记录
Set-PSReadLineOption -PredictionSource History

# 每次回溯输入历史，光标定位于输入内容末尾
Set-PSReadLineOption -HistorySearchCursorMovesToEnd

# 设置 Tab 为菜单补全和 Intellisense
Set-PSReadLineKeyHandler -Key "Tab" -Function MenuComplete

# 设置 Ctrl+d 为退出 PowerShell
Set-PSReadlineKeyHandler -Key "Ctrl+d" -Function ViExit

# 设置 Ctrl+z 为撤销
Set-PSReadLineKeyHandler -Key "Ctrl+z" -Function Undo

# 设置向上键为后向搜索历史记录
Set-PSReadLineKeyHandler -Key UpArrow -Function HistorySearchBackward

# 设置向下键为前向搜索历史纪录
Set-PSReadLineKeyHandler -Key DownArrow -Function HistorySearchForward
```

完成设置后 PSReadLine 会基于历史记录对已输入的命令进行补全。

### Install Posh-git and Oh-My-Posh

[Windows | Oh My Posh](https://ohmyposh.dev/docs/installation/windows)，posh-git 可以强化 omp 的 git 的表现，首先安装两个包。

```powershell
Install-Module -name posh-git
winget install JanDeDobbeleer.OhMyPosh -s winget
```

安装完进行导入：

```powershell
oh-my-posh init pwsh | Invoke-Expression
Import-Module posh-git
```

完成安装  `oh-my-posh` 后，重启 Terminal，然后查看存在的主题，并设置为你希望的主题，将后面的 jandedobbeleer 改成需要的主题名称（后续写入 PROFILE）。

```powershell
Get-PoshThemes
oh-my-posh init pwsh --config 'C:\Users\Aiken\AppData\Local\Programs\oh-my-posh\themes\jandedobbeleer.omp.json' | Invoke-Expression
```

字体安装与下载：按照[链接](https://www.nerdfonts.com/font-downloads)下载安装就行了

### Install Scoop

[ScoopInstaller/Install: 📥 Next-generation Scoop (un)installer (github.com)](https://github.com/ScoopInstaller/Install#readme)
[Windows Terminal美化（配置Powershell7+PSReadLine+oh-my-posh） / Drrany](https://drrany.github.io/wt/#%E6%B7%BB%E5%8A%A0%E4%BB%93%E5%BA%93)
[Windows 系统缺失的包管理器：Chocolatey、WinGet 和 Scoop - 少数派 (sspai.com)](https://sspai.com/post/65933)

安装 Scoop 的话只需要执行：

```powershell
irm get.scoop.sh | iex
```

Scoop 的默认安装位置为：`C:\User\Your Username\scoop`，(option) 如果需要将其安装在默认目录以外的地方的话，执行：

```powershell
$env:SCOOP='D:\Applications\Scoop'
$env:SCOOP_GLOBAL='D:\GlobalScoopApps'
[Environment]::SetEnvironmentVariable('SCOOP_GLOBAL', $env:SCOOP_GLOBAL, 'User')
irm get.scoop.sh | iex
```

安装完毕后即可，安装个 neofetch 试试：

```powershell
scoop install neofetch
```

Scoop 会自动将 `<install_path>\Scoop\shims` and `<install_path>\Scoop\apps` 加入系统的环境变量，免去自行添加的麻烦。

Scoop 设置/取消代理：

```powershell
scoop config proxy 127.0.0.1:8889
scoop config rm proxy
```

**添加 bucket 等操作之后再 Scoop 章节中介绍**

- 安装 sudo
- 安装 curl
- 安装 wget （代理使用 powershell 的代理）

### Install other module

高亮 ls 的文件夹(DirColors )并添加文件图标（Terminal-Icons）

```powershell
Install-Module -Name DirColors
Install-Module -Name Terminal-Icons
Import-Module DirColors
```

安装 z-jumper

```powershell
Install-Module ZLocation -Scope CurrentUser
import-module zlocation
z
```

查看现存主题：

```powershell
Get-PoshThemes
# 设置主题
Set-PoshPrompt -Theme half-life
```

设置 Terminal 中的启动参数

```powershell
code $PROFILE
```

并设置成如下的形式

```powershell
# 导入包
Import-Module posh-git
Import-Module oh-my-posh
oh-my-posh init pwsh | Invoke-Expression

Import-Module PSReadLine
# 设置主题
Set-PoshPrompt -Theme spaceship

# ================psreadline setting
# 设置预测文本来源为历史记录
Set-PSReadLineOption -PredictionSource History
# 每次回溯输入历史，光标定位于输入内容末尾
Set-PSReadLineOption -HistorySearchCursorMovesToEnd
# 设置 Tab 为菜单补全和 Intellisense
Set-PSReadLineKeyHandler -Key "Tab" -Function MenuComplete
# 设置 Ctrl+d 为退出 PowerShell
Set-PSReadlineKeyHandler -Key "Ctrl+d" -Function ViExit
# 设置 Ctrl+z 为撤销
Set-PSReadLineKeyHandler -Key "Ctrl+z" -Function Undo
# 设置向上键为后向搜索历史记录
Set-PSReadLineKeyHandler -Key UpArrow -Function HistorySearchBackward
# 设置向下键为前向搜索历史纪录
Set-PSReadLineKeyHandler -Key DownArrow -Function HistorySearchForward
```


## Some Command

### Findstr/Find 

```powershell
# this command is like grep in Linux
Common-u-want-to-carry-out | findStr "String"
# for example
conda list | Select-String ("matplot" , "pillow", "scipy", "tensorboard")
```

### Generate GUID

this command can generate the only GUID

```powershell
new-guid
```



## reference

1. 个人的知乎回答
2. [Style your Windows terminal](https://medium.com/@hjgraca/style-your-windows-terminal-and-wsl2-like-a-pro-9a2e1ad4c9d0)
3. [Windows Terminal 完美配置 ](https://zhuanlan.zhihu.com/p/137595941)
4. [Upgrading | Oh My Posh](https://ohmyposh.dev/docs/upgrading)