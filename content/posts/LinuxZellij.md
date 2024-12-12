---
calendar_date: 2023-05-20
catalog: true
categories:
- Linux
cover:
  image: /cover/cover9.jpeg
date: 2023-05-20 16:40:19
lang: cn
mathjax: false
subtitle: It is recommended to replace tmux with zellij
tags:
- Linux
- CLI
- Terminal multiplexer
thumbnail: /img/header_img/lml_bg36.jpg
title: Terminal multiplexer Zellij
toc: true
---

> Tmux 作为一款优秀的终端复用器，前面已经介绍过，这里在介绍一款有着相同功能的平替，个人认为 zellij 的 UI 各方面的设计，使得其相比于 Tmux 有着更低的入门难度，也避免了需要记大量快捷键，因此这里介绍一下该工具。

[Zellij](https://zellij.dev/documentation/installation.html) 是一款终端复用器，有什么功能可以完全参考 Tmux ，还支持了许多有趣的特性和自定义 Layout 等功能（可能后续用到的话会完善该部分笔记），详细的可以参考官网的介绍，接下来就简单的介绍一下安装和一些自定义的 Alias。

## Install 安装

Zellij 是基于 Rust 编写，因此在安装之前需要安装 rust 和 cargo（类似 rust 的包管理器），安装可以参考 [Rust 官方网站（推荐）](https://www.rust-lang.org/tools/install) |  [The Cargo Book](https://doc.rust-lang.org/cargo/getting-started/installation.html)  | [Rust Wiki CN](https://rustwiki.org/zh-CN/cargo/getting-started/installation.html)

官方网站中介绍了 WSL 的安装指令如下：

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
#--proto以及--tlsvl在Linux或者Macos安装的时候可以忽略
```

安装完成后可以使用如下命令，基于 Cargo 安装 zellij：

```bash
cargo install --locked zellij
```

如果出现了问题也可以尝试先更新 rust

```bash
rustup update
```



### Binary Download 二进制文件安装下载

如果是**不便于安装**的环境可以使用这种方式来使用 zellij，在 [release page](https://github.com/zellij-org/zellij/releases) 中下载二进制包 `.tar.gz` 后执行：

解压二进制文件：

```bash
tar -xvf zellij*.tar.gz
```

修改执行权限：

```bash
chmod +x zellij
```

然后就可以直接执行 zellij 文件了，可以将该文件路径[加入系统的路径](https://www.baeldung.com/linux/path-variable)中，即可随处调用（也可以使用 alias 的方式），可以参考一下上文中系统路径的添加方法。

## Alias 别名设置

由于 Zellij 的一些指令比较长，可以简单的设置一下别名（bashrc, zshrc），用来便于日常使用：

```bash
alias ze='zellij'
alias zels='zellij list-sessions'
alias zeks='zellij kill-sessions'
alias zeat='zellij attach'
```

可以看出上述的指令和 Tmux 的十分相似，功能也和名称一致，这里就不在赘述，其他的使用快捷键在进入了 zellij 界面后都可以看到。

### 效果展示

简单放一下 zellij 使用的效果图，相信能 Get 到为啥说比较容易上手，同时 UI 也十分的舒服。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230520170858.png)

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230520170932.png)


## FI

基础的功能对于日常使用已经十分充分，后续又其他的功能需求（如果有自己定制的东西）的话会慢慢更新，否则的话应该就是基于官方文档去配置和使用了。