---
calendar_date: 2022-05-20
catalog: true
categories:
- Linux
cover:
  image: /cover/cover16.jpeg
date: 2022-05-20 21:22:53
description: Reduce 'cd' to facilitate jumping between projects
lang: cn
mathjax: false
tags:
- CLI
thumbnail: /img/header_img/lml_bg16.jpg
title: Z Jumper for Linux
toc: true
---

Star this [Project](https://github.com/rupa/z) in Github after u decide to use it.

## Download & Install 

**Firstly**, Cpy `z.sh` to the path u want make this script can be **recognizabled by your shell** like zsh, bash.

```shell
cd ~
wget https://raw.githubusercontent.com/rupa/z/master/z.sh
```

**Secondly**, add `. ~/z.sh`  to the end of your `.zshrc` ，u can use following cmd also

```shell
echo ". ~/z.sh" >> ~/.zshrc
# then using this to check 
tail -n 5 ~/.zshrc
```

**Fi**, activate it.

```shell
source ~/.zshrc
```

## Usage and Description

以以下的目录为例：`the/path/to/UniFramwork`，演示该jumper的使用方式。我们首先需要进入（`cd`）过对应的目录，`z`将会记录看，并计算相应的权重，通过其维护的List来进行快速跳转，在完成记录后，我们即可用下面跳转到项目文件夹：



```shell
z uni
z un
.....
```

该Jumper的优势在于，**可在任何目录进行跳转**，ITs Good