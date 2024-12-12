---
calendar_date: 2023-07-07
catalog: true
categories:
- Linux
cover:
  image: /cover/cover5.jpeg
date: 2023-07-07 22:10:52
lang: cn
mathjax: false
subtitle: null
tags:
- Linux
- CLI
thumbnail: /img/header_img/lml_bg32.jpg
title: linux下载命令之Wget和Curl
toc: true
---

> 想要通过命令行直接下载文件，通常想到的就是下面的两个工具：wget 和 curl，下面简单介绍一下两者的使用。

## Wget 

`wget` 全称为 `web get` ，其基本用法为：`wget [-para] url ` ，常用的参数有以下几种：

- -O 指定下载文件的保存名称
- -b 为后台下载模式
- -P 下载到指定目录
- -c 支持断电续传
- -p 下载页面内的所有资源、包括图片视频等 
- -r 递归下载
- -t 最大尝试次数

```bash
# 默认无需参数的情况下即会将文件下载到当前文件夹下。
# 也是最常见的用法，可以加入-c避免下载中断
wget url
wget -O file.tgz url
```

参考 Man Page 或者 [ExplainShell](https://www.explainshell.com/explain/1/wget) 可以找到完整的参数列表；支持从文件中读取 url ；将 log 写入指定的文件等等功能；

可以看出 wget 是一个简单，专职的下载利器，无论是用来下载安装包还是 pdf 之类的东西是一个相当方便的下载工具。



## Curl 

参考资料：[linux - wget 与 curl 命令详解 - 个人文章 - SegmentFault 思否](https://segmentfault.com/a/1190000022301195)

`Curl` 的全称为：`CommandLine URL` 即 `CommandLine Uniform Resource Locator`，即在命令行的方式下基于 URL 的语法来进行数据或者文件的传输的工具。除了 **Wget 的下载功能之外，Curl 还支持处理复杂的 web 请求，进行网络接口测试**等等。

> URL 统一资源定位符 

### Download 下载功能

基本的**单个文件下载功能**如下：

```bash
curl [-o 自定义文件名] [-O] [-C 偏移量] url
# -o 输出到指定文件
# -O 以最后一个/后面的部分最为文件名
# -C 偏移量，从指定的偏移量处继续下载，偏移量以字节为单位，一般用 - 代替偏移量，让其自动推算出正确的续传位置
```

### WEB 请求处理和接口测试

> 该功能和 postman 是一致的，在进行前后端编写和交互的时候能起到很好的测试作用。

1. 自动跳转 `curl -L <url>`
2. 显示响应头信息 `-i`，显示通信过程 `-v` ，将通信过程另存到文件 `--trace <file> <url>` 或 `--trace-ascii <file> <url>` 
3. 指定 http 请求方式 `-X` 指定 `post|get|put|delete`
4. 添加 http 请求头 `-H 'key:value' <url>` 例如 `-H 'Content-Type:application/json'`
5. 设置 cookie 可以使用 `-b` 或者 `--cookie` 输入参数，或者 `-c 文件`
6. 设置用户名和密码 `-u 'user[:password]'`
7. 设置代理 `-A '代理信息'` 或者 `--user-agent '代理信息'` 也可以用 `-H` 直接设置请求头 `User-Agent`
8. 文件上传 `-F 'file=@文件'` 更多参数形式 `file=@文件;name1=value1;name2=value2`
9. 传递请求参数

```bash
curl -X POST -d '参数' <url>
```

-d 参数会自动加上标头"`Content-Type:application/x-www-form-urlencoded`"，并将请求方式转为 POST。

## Fi