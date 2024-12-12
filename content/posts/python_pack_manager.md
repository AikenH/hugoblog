---
calendar_date: 2023-03-06
catalog: true
categories:
- Python
cover:
  image: /cover/cover14.jpeg
date: 2023-03-06 11:27:52
lang: cn
mathjax: false
subtitle: manager python env for development.
tags:
- Python
- Conda
- Pip
thumbnail: /img/header_img/lml_bg14.jpg
title: Python00 Conda 与 Pip
toc: true
---

@Aikenhong 的旧笔记翻新完善 1.0

Python 的灵活和广泛应用场景来自于众多的第三方库，由于强大的可拓展性和众多的库，使得 Python 的使用简单灵活，且应用面极广。

但是不同库之间的相互依赖关系，对版本的不同要求等等因素，使得"环境配置"成为了开发者闻之变色的一词，对一个新的库和项目环境的配置尝尝会花去大量的时间，这可能也是 Docker、Venv（虚拟环境）必须存在的原因之一。

> 这里不对 Docker 及其相关技术，进行说明，会另开章节进行学习。

才疏学浅的本菜鸡希望从 python 开发者避不开的 conda 和 pip 出发介绍一下关于库安装的一些事情，以及这两个 CLI 的关系。

## Anaconda MiniConda 和 Conda

anaconda 是一个针对数据科学的 Python 发行版，其包含了一下三个方面的内容：
- 完整的 python，ipython
- numpy、Script 等常用的数据科学库
- 包管理器 Conda 和 pip

> 软件发行版是在系统上提前编译和配置好的软件包集合， 装好了后就可以直接用

miniconda 是 conda 的发行版，其包含了 conda 本体和其所需的所有环境，安装了 miniconda 后就可以正常使用 conda，由于其不包含 python 和诸多第三方包，所以会比 anaconda 纯净得多，我们可以基于其从零开始搭建一个完整的环境。

而 conda 只是一个包（lib、package）和环境（env）的管理工具，其用于自动安装，升级，（也可分析包之间的相互依赖关系）的工具。

## Conda 和 Pip 的关联和区别

**conda** 是通用（语言无关且跨平台）的包管理器，它发源于 python 的 pydata 社区，但他不仅适用于 python 包的管理，还适用于任何语言写的包和依赖，但是我们应该大多数时候只用来做 python 管理。

- 其只能在 conda 环境中安装包，但是可以安装各种语言和各种类型的包。

**pip**（pip install package） 是 python 官方认证的 python 包通用管理器，只能管理 python 包，安装发布于 python package index（pypi）上的所有包，均由 python 官方管理。

- 其支持所有平台，但是只能安装 python 包

接下来从一些重要的特性来讲述两者的区别和联系。

### 虚拟环境支持对比

上述提到，我们希望有一个纯净的开发环境，在配置环境的时候出现诸多冲突，例如：

> PackageA 需要 PackageC>3.11，而 PackageB 需要 PackageC<3.10 导致运行起来冲突，或者无法安装的情况。

因此我们希望能将每个开发环境隔离起来，项目 A、B、C 有分离的 python 版本和对应的一些 python 库。（这里我把环境简单的理解为 python+python 安装的所有 Package ）

而通过 pip 和 conda 都能在不同程度上，实现以上的需求，conda 原生支持虚拟环境管理，pip 则是需要借助 venv 或者 virtualenv 库来支持。参考：[pip 与 conda 的区别] ( https://zhuanlan.zhihu.com/p/379321816 )

| CLI   | Python 版本独立 | Python 依赖（lib）独立 | 非 Python 的其他依赖管理 |
| ----- | --------------- | ---------------------- | ------------------------ |
| Conda |       y         |           y             |                 y         |
| Pip+vir*   |        n         |           y             |                 y         |

> python 版本独立的意思是，不同环境之间是不是可以安装不同的 python，pip 只能将依赖分离，而对应的 python 都是同一个。

可以看出在于包管理上，conda 还是更具优势，主要是因为其本身不需要依赖于某个既有的 python，不需要和该 Python 建立连接，没有沾亲带故的就更铁面无私嘛。具体可以参考上面的链接。

### 包管理逻辑对比

基于上述说明，开发一个 python 项目，我们可以优先创建一个虚拟环境，再在其中安装需要的依赖，这样能保证每一个环境的纯净，也能减少一些不必要的麻烦，也就是说，创建完环境的下一步，就是需要安装和管理每个环境中的包了。

| CLI   | Source | 依赖校验 | 是否需要换源加速/代理 |
| ----- | ------ | -------- | ---------------- |
| Conda |  Anaconda & Cloud      |    auto(且支持非 python 的依赖)     |         狗头         |
| Pip   |  Pypi      |    自动检查、手动选择是否     |         狗头         |

从上述简单的对比可以看出，两者安装 package 的源不同，这样有以下的两个影响：

1. Conda 最好是添加一些常用的 Channel，添加其软件来源，方便使用 conda 进行包的安装；
2. 即使倾向于使用 conda 做管理，还是会在开发中遇到需要混用 pip 的场景（蛮多） ，那么这样是否会有影响呢？下面我们从两个管理器的安装逻辑来说（结合虚拟环境）：

**conda 安装包的逻辑**是这样的：

基于 `conda install <pkg>` 安装的库都会放在 Anaconda 的 Pkgs 目录下统一存储，例如 windows 就是 `E:\anaconda\pkgs\<pkg>` ，通过这样的方式，当新的环境中需要一个某个环境中**已经安装过的包**的时候，就只需要把对应的文件复制到到新环境的 `lib\python<*>\site-packages` 目录中即可，无需重复下载。

> anaconda 中会对每个环境创建一个新的目录。而该环境的的库就是存在 `、env\<env-name>\lib\pythonxxx\site-packages` 路径下。


**pip 安装包的逻辑**是这样的：

基于 `pip install <pkg>` 安装的库会放在对应的就会放在 `xxx\pythonxxx\site-packages` 中。

**综上所述**，（正常）混用的话基本上是没有影响的，还是能保证我们的环境进行分离，这是因为：

- 当 conda 切换虚拟环境的时候，对应的 pip 也会进行切换，这样通过 pip 安装的包也会仅安装在当前环境的目录中，和 conda 进行安装是一致的

**同时两者之间还有这样的交互关系：**

- `conda list`  列出的包中，build 项目为 pypi 的即为 pip 安装的包。
- 卸载的时候两者是一致的： `conda uninstall <pkg>` 和 `pip uninstall <pkg>` 都只是讲当前环境中的库删除了，不会删除 conda 的 pkg 目录中的备份，如果要清空该已下载库，通过 `conda clean -h` 实现

（need check）（**not recommand**）理解了这样的安装关系后，我们也可以知道如何为一个环境手动安装一个 package 了，在 pypi 上下载压缩包后，解压到对应的目录中，执行以下命令即可

```shell
python setup.py install
```

网络问题的话建议换源，还是不要手动安装。

## 其他相关资料

### windows conda 路径问题

1. 在 windows 上安装 anaconda 之前，如果原本有 python，建议是删掉该 python 避免带来不必要的路径问题。
2. windows 上如果出现输入 python 跳转 win 商店的话，八成是系统路径中的问题，可以将 winstore 的路径往后挪。

### pip 和 pip3

- python2 只能用 pip
- python3 都可以用，如果仅有 python3，那么两者等价
- 如果装了 python2 和 python3，那么默认 pip 给 python2 用，pip3 给 python3 用，功能一样。
- 虚拟环境中，若只存在一个 python 版本，可以认为在用系统中 pip 和 pip3 命令都是相同的

### pip 删除所有安装的包

[删除pip安装的所有软件包的最简单方法是什么？ (qiniu.com)](https://www.qiniu.com/qfans/qnso-11248073)