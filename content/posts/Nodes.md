---
calendar_date: 2022-10-09
catalog: true
categories:
- Nodejs
cover:
  image: /cover/cover11.jpeg
date: 2022-10-09 13:33:00
description: null
lang: cn
tags:
- NodeJS
thumbnail: /img/header_img/lml_bg11.jpg
title: Nodejs、yarn、npm关系辨析
toc: true
---

@AikenH 2022 Node-JS-Chapter1 

参考：[包管理工具npm、yarn以及nvm简介及简单使用](https://blog.csdn.net/Newbie___/article/details/104759861)

## Concept 概念

对 Node，NPM，JS，Yarn，NVM 的概念和作用进行一个辨析和介绍，了解各自的含义和职责，进而理解我们使用的到底是什么，环境怎么管理，怎么自定义和进行改动等。



- **JS**在 1995 年诞生，Nodejs 在 2009 年诞生，在此之前 JS 只能在浏览器中使用（google 开发的 chrome 的 V8 引擎），NodeJS（第三方作者想直接在计算机运行 JS，让其脱离浏览器）相当于提供的一个 JS 的运行环境，用来支持 JS 的执行，也就是 JS 的一个 runtime system。

  > 由此，JS 除了 web 前端编程，又可以支持后台开发、GUI 开发、APP 开发和 CLI 工具开发

- **Nodejs**和 JS 的概念已经在上述清楚了，这里说一下 nodejs 组成：

  - V8 引擎将 JS 编译成机器码，提高运行速度；
  - 本地模块：使用 C/C++实现的一些高性能开源库；
  - 标准库：封装 C/C++的一些本地模块的接口，转换为 JS 接口，就是 Nodejs 的标准库，其良好的设计也赋予 Nodejs 强大的生命力；

- [NPM](https://www.npmjs.com/) 是随 NodeJS 一起安装的包管理工具（提供下载，版本校验，兼容性校验等功能），就像 pip、conda 帮助 Nodejs 管理并解决本地部署的问题。

  - 允许下载别人写好的第三方包到本地使用；
  - 允许下载安装别人编写的命令行程序；
  - 允许上传包或命令行程序给别人使用；

- **Yarn**：由 Facebook、Google、Exponent 和 Tilde 联合推出的 JS 包管理工具，和 NPM 就像是 pip 和 conda 的关系，其仍然使用 NPM 的 registry，不过提供了全新的 CLI 来进行管理（也就是管理包的代码和逻辑有区别）

- **NVM**：Conda 的另一个功能，在同个电脑上管理多个 Node 版本；

- **CLI**（Command-line-interface），相当于没有 UI 界面的命令行程序；
- **Cnpm**：为了解决国内链接 Npm registry 的困难，淘宝自己的 npm 镜像（不过现在没啥用了好像）；


### Runtime

**什么是runtime**：[运行时（runtime）是什么意思](https://www.zhihu.com/question/20607178)、[Runtime system - Wikipedia](https://en.wikipedia.org/wiki/Runtime_system)、[Node.js是什么？运行时是什么](http://c.biancheng.net/view/9338.html)

**runtime**主要有几种类型：

1. 「程序运行的时候」，即程序生命周期的一个阶段。也就是运行阶段。
2. 「运行时库」，支撑应用级语言（c，c++，Rust）的一些正常功能的 lib，对部分“标准指令”进行包装，（标准库）优雅的映射到汇编。**也就是程序运行的时候**所需要依赖的库。
   ![image-20221018135959777](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/image-20221018135959777.png)

3. 「运行时系统」某门语言的宿主环境：Node.js 是一个 JavaScript 的运行时。运行时系统主要是一些高级语言的概念，可以理解成一个更大、更全的运行时库，低级语言由于强指定类型等原因，可直接直译成机器码，而依赖于编译的语言，就需要一个运行时系统来实现语言的运行。

   > JAVA运行时是JRE（Java Runtime Environment），C #运行时是CLR ，他们都需要在 OS 上单独安装，借由他们来执行相应语言的程序（编译出的字节码），而对于 JS 来说，JS 引擎不带 IO 支持的虚拟机，因此需要浏览器和 Node 这样的「JS 运行时」才能让他控制文件、网络、图形等。

   典型的高级语言的「运行时系统」需要如下的组件：

   - 一个解释执行字节码的虚拟机，多半得带个垃圾回收器。

   - 如果语言是源码解释执行，那么需要一个编译器前端做词法分析和语法分析。

   - 如果运行时支持 JIT 优化，那么还得藏着个编译器后端（动态生成[机器码]( https://www.zhihu.com/search?q=机器码&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra= {"sourceType"%3A"answer"%2C"sourceId"%3A2133648600})）。

   - IO 相关能力，比如 Node.js 的 `fs.readFile` 之类。

   已经相当于一个复杂的基础软件系统了。

   **总结：**运行时就是，类似一些编好的 dll、标准库、解释器等，支持 JS 运行的组件和工具的合集，被统称为运行时。

## Nodejs & NPM

### 安装和配置

安装：windows 直接去 [nodejs](https://nodejs.org/en/download) -> [nodesource/distributions: NodeSource](https://github.com/nodesource/distributions) 官网下载安装。

```bash
# debian(ubuntu)
# 首先更新NOdejs的软件源，基于上述提供的网站中获取指定连接和更新方式。
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -

# 接着使用apt命令下载nodejs 和 npm
sudo apt-get install npm, nodejs
# 可能还需要安装一些c++依赖
sudo apt install build-essential -y

# macos 
brew install node

# 查看版本
npm -v 
node -V
```

更新 npm 版本

```bash
sudo npm install npm -g
```

NPM 设置代理 registry 地址，使用国内镜像

```bash
npm config set registry https://registry.npm.taobao.org
# 使用下面的命令进行检查
npm config get registry
```

### 常用操作

```bash
npm install <package> # 本地安装
npm install <package> -g # 全局安装 
# npm i 为 install的简写

# 卸载模块
npm uninstall <package>
npm ls # 查看是否卸载成功,或者去/node_modules目录check

# 搜索模块
npm search <package>

# 更新模块
npm update <package>
```

node 重新安装依赖包

```bash
rm -rv node_modules # del those files we downlaods
rm package-lock.json # del the install info 
npm cache clear --force
npm install
```

**npm 设置代理**

```shell
npm config set proxy=http://127.0.0.1:8890
# 取消
npm config delete proxy
# 查看
npm config list
```


### Package.json

npm将每个使用npm的工程都看成一个包，包的信息是通过 `package.json` 配置文件来描述的，可以手动创建，但是大多数时候是使用 `npm init` 创建（可以创建一个看看默认值）

**package-lock.json** 锁定具体版本

npm 在安装包的时候，会记录安装包时候准确的依赖项（包含版本信息），若我们保留了该文件，在安装的时候会根据上面的准确版本进行安装，最大程度的避免了差异。

package.json 文件最重要的作用，是记录当前工程的依赖

- dependencies：生产环境的依赖包
- devDependencies：仅开发环境的依赖包

配置好依赖后，使用下面的命令即可安装依赖

- 本地安装所有依赖 安装所有依赖 dependencies + devDependencies

```bash
npm i
```

**Install**的时候添加参数，可将包添加到依赖项的 package.json 中

- 安装依赖到生产环境

```bash
npm i <package>
npm i --save <package>
npm i -S <package>
```

- 安装依赖到开发环境

```bash
npm i --save-dev <package>
npm i -D <package>
```

### NPM 中包的安装路径

节选自参考链接 [Link](https://cloud.tencent.com/developer/article/1834667)

1. 本地安装 `npm install` 安装到当前路径的 node_modules 中
1. 全局安装添加 `-g` 参数

全局文件的安装地址在: `npm root -g `  | `npm config get prefix`

## YARN

[YARN](https://yarnpkg.com/cli/install) 相比 NPM 有以下的优点，但是 npm6 之后，npm 和 yarn 非常接近，所以后续很多从 yarn 转回 npm 的

```txt
- 使用扁平的目录结构
- 并行下载
- 使用本地缓存
- 控制台仅输出关键信息
- yarn-lock记录确切依赖
- 增加了某些功能强大的命令
- 让既有的命令更加语义化
- 安装的CLI工具可以使用yarn直接启动
- 将全局安装的目录当成普通的工程，生成package.json文件，便于全局安装移植
```

### 安装 yarn

```bash
npm install -g yarn
```

```bash
yarn --version
```

### package 管理

```bash
yarn install <package>
yarn remove <package>
```

## NVM

[NVM](https://github.com/nvm-sh/nvm) 用来管理 node 版本，便于适应多个 node 环境，在之间进行切换。

```bash
nvm -v # 查看版本
nvm list # 查看node版本号
nvm use <version> # 使用指定版本号的node
nvm install <version> # 下载指定版本的node
nvm uninstall <version> # 卸载指定版本的node
```

设置淘宝镜像

```bash
nvm node_mirror https://npm.taobao.org/mirrors/node/
nvm npm_mirror https://npm.taobao.org/mirrors/npm/
```