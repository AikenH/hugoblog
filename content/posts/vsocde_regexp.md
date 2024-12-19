---
calendar_date: 2023-10-19
catalog: true
categories:
- VSCode
cover:
  image: /cover/cover17.jpeg
date: 2023-10-19 16:53:03
description: using RegExp to search and replace
lang: cn
mathjax: false
tags:
- VsCode
- RegExp
thumbnail: /img/header_img/lml_bg17.jpg
title: VsCode's RegExp Catch 正则捕获
toc: true
---

本篇简单介绍一些 VsCode 进行文本替换和查找的一些特殊的正则，该文会随着自己的使用来逐步记录，目前主要内容如下：

- 捕获组合及其替换模式

这里不会介绍正则表达式的语法，对其基本语法感兴趣可以查看如下链接 [VsCode使用正则表达式](https://learn.microsoft.com/zh-cn/visualstudio/ide/using-regular-expressions-in-visual-studio?view=vs-2022)，以及我之前写过的[基础的正则表达式](https://aikenh.cn/cn/Linux%E4%B8%89%E5%89%91%E5%AE%A2%E4%B9%8B%E6%AD%A3%E5%88%99/) 一文，下面进入正题；

## Intro 正则搜索

正则表达式主要思路为**模式匹配**，通过符号表达来指定一种模式，识别所有符合该模式的字符组合，而非某些**特定的文字**，因此可以简化我们的搜索和替换过程，下面以一个例子说明。

例如有一个文件配置如下，而我们希望找到其中所有 `user_config` ，查看每个 user 的设置是否正确，由于 username 的长度和内容都不是一样的，所以这里需要使用正则来进行搜索：

```txt
zxc1_config=123
some content we dont need
asd2_config=234
and some other infomation or comment
qwer3_config=345
```

对应该场景的正则表达则为 `+*_config=` 或者 `[a-z, 0-9]*_config=` 等写法均可，效果如下：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20231019173213.png)

可以看到我们需要的内容都被高亮了，这也就方便了我们进行一些复杂的文字处理，而搜索，也就是正则最基本也是最正统的用法，这里不再多说。



## Catch 捕获组合与正则替换

这里主要要介绍的是在替换中使用正则。同时实现样式的保留和替代，可以看以下的例子：

```txt

aiken_config_file_path_1=res/user/aikenhong/code_config_2m.txt
aiken_config_file_path_2=res/user/aikenhong/code_config_4m.txt
aiken_config_file_path_33=res/user/kiean/config_special.txt
...
kiean_config_file_path_1=res/user/aikenhong/code_config_2m.txt
some other content and comment here.
...
```

可以看到该文件定义了不同用户的不同编号的配置文件的地址，假如由于测试的原因，需要将 aiken_的所有配置文件都暂时以一个新的 `res/user/aikenhong/tmp.txt` 替代，分析可知此时为了不影响 kiean 等其他人的配置受到影响

- 我们需要识别出 `aiken_config_file` 中的 aiken
- 需要保留 `aiken_config_file_{n}` 中的序号 n

这里使用普通正则会遇到的问题就是：**如何保留匹配到的序号这个样式**，并在替换的时候调用它？在 VsCode 中，可以在**搜索使用 `()` 保留样式，并在替换时使用 `$n` 来调用指定 idx 的样式，n 从1开始**。

所以上述问题使用的搜索和替换表达式分别为:

- `aiken_config_file_path_([0-9]+)=.*txt`
- ``aiken_config_file_path_$1=res/user/aikenhong/tmp.txt`

替换前搜索的效果如下：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20231019175657.png)

替换后的效果如下：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20231019175748.png)

其中+表示匹配1次或以上，保证 idx 为多位的情况不被遗漏，[0-9] 匹配数字，当然也可以加入对字母的匹配，()获取并保留当前匹配到的样式，并在替换过程中使用$1进行调用。

**总结**很简单如下，实际难点仅在熟悉正则表达式的使用

- 搜索使用 `()` 保留样式
- 并在替换时使用 `$n` 来调用指定 idx 的样式
- n 从1开始

## Fi