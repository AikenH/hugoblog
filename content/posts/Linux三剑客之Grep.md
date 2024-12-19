---
calendar_date: 2023-04-12
catalog: true
categories:
- Linux
cover:
  image: /cover/cover15.jpeg
date: 2023-04-12 13:22:58
description: Linux三剑客之Grep
lang: cn
mathjax: false
tags:
- Bash
thumbnail: /img/header_img/lml_bg15.jpg
title: Grep、Sed、Awk 01-Grep
toc: true
---

> Linux 三剑客之 Grep。Grep 估计会是大部分 Linux 用户最常用的文本搜索命令了，在三剑客中的使用场景也是最广泛的。在对正则有了基本了解之后，就可以更好的使用 Grep，同时也可以通过 Grep 的使用来更好的掌握常用的正则表达式。

## Intro 

首先介绍 Grep 命令，**Global Regular Expression Print** 全局正则表达式输出，使用正则表达式搜索文本内容输出。其使用模板如下：

```bash
grep [option] pattern file
```

- option 指定 grep 的搜索模式
- pattern 需要搜索的内容，可以用**正则表达式**指定一个模式来做匹配
- file 可以是文件夹等路径，用来确定搜索的范围（仅支持**通配符**）[[Published发布/Linux三剑客之正则]]

接下来分别对两个部分进行简单的说明，file 的范围指定参考正则文章中对通配符的介绍即可。


## Option 搜索模式

参考资料：[`man grep`](https://manpages.debian.org/unstable/manpages-zh/index.html)，[ManPage-zh](https://manpages.debian.org/unstable/manpages-zh/grep.1.zh_CN.html) 具体完整的有哪些搜索模式可以在 man page 中进行查看。这里主要介绍一些常见的搜索模式和一些使用场景。

<center> option 对照表 </center>

| Key Word | Function                                                                        |
| -------- | ------------------------------------------------------------------------------- |
| -w       | 全词匹配                                                                        |
| -i       | 忽略大小写                                                                      |
| -I       | 搜索时忽略二进制文件                                                            |
| -r       | 搜索时递归搜索文件夹里的内容                                                    |
| -l       | 仅输出搜寻到匹配的文件名                                                        |
| -c       | 仅输出每一个输入文件中的匹配次数(v 结合的话就是不匹配的次数)                    |
| -n       | 显示行号                                                                        |
| -o       | 仅输出每行中的匹配内容                                                          |
| -v       | 反向搜索，搜索不匹配该模式的行                                                  |
| -A num   | 同时打印出匹配行的下 num 行                                                     |
| -B num   | 同时打印出匹配行的上 num 行                                                     |
| -C num   | 同时打印出匹配行的前后 num 行                                                   |
| -E       | 将模式按照拓展正则来读取                                                        |
| -q       | 取消输出，在匹配到时输出非 0 值，未匹配时返回 0，用于条件判断                   |
| -f       | 指定 Pattern 文件，每行一个 patten，匹配到其中一个即可（-F 会视为固定的字符串） |
| -x       | 仅显示整行匹配的                                                                |

## Pattern 匹配模式

正则匹配的部分这里就不在赘述，参考前文的正则表达式部分。（用 Grep 来熟悉正则也是一个不错的选择）

下面会结合使用方式来介绍一些例子。参考资料：[grep 命令，Linux grep 命令详解：强大的文本搜索工具 ](https://wangchujiang.com/linux-command/c/grep.html)

## Usage 使用方式

### Type 1 在文件(夹)中搜索单词

```bash
grep match_pattern file_name
grep -r match_pattern *
```

如果不指定 file_name 或者目录会在默认目录中搜索，所以启用-r 的时候记得要指定目录。同时通常搜索的时候，我们也希望能够知道匹配文本的位置；

```bash
grep -rniI match_pattern * --color=auto
```

这里 r 用于搜索目录，n 输出行数，i 忽略大小写，I 忽略二进制文件，color 指定输出带颜色，便于观看，但是对新的 shell 来说，通常已经将 color 参数写入了 grep 的 alias，可以在命令行中查看。

### Type 2 在多个文件中查找

不同于在目录中搜索，如果要指定特定的多个文件，可以按照以下的方式来：

```bash
grep -w "key_word" file_1 file_2 file_3 ...
```

上面的命令希望在 file1~3 中搜索完全匹配 key_word 的行

### Type 3 管道搜索

当我们需要对一些指令的输出内容中进行搜索的时候，就会用到这种方式，比如：

1. 编译或运行过程中的 Log 筛选出 Fatal

```bash
sh makr_run.sh | grep FATAL >> FATAL.log
```

2. 查看特定的历史指令

```bash
history -i | grep git
```

### Type 4  用作条件判断

其实该部分主要是使用静默输出参数，该参数主要在 shell 脚本中用作条件测试。

```bash
cat $file | grep model | grep -q resnet
# is_model=$? 
# $? 返回上一条命令的执行结果，0表示成功，其他表示失败
```

### Type 5 与或非

与可以利用管道连接符进行多次匹配即可，非则是-v

```bash
grep -in key1 file | grep key2
```

或有以下的几种方式

```bash
grep 'key1\|key2' filename
grep -E 'pattern1|pattern2' filename
```

或者使用-e 来制动多个匹配模式

```bash
echo "model=tcnn" | grep -e "resnet" -e "tcnn"
```

### Type 6  包含或排除指定文件

```bash
# 只在目录中所有的.php和.html文件中递归搜索字符"main()" 
grep "main()" . -r --include *.{php,html} 
# 在搜索结果中排除所有README文件 
grep "main()" . -r --exclude "README" 
# 在搜索结果中排除filelist文件列表里的文件 
grep "main()" . -r --exclude-from filelist
```