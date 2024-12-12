---
calendar_date: 2022-09-04
catalog: true
categories:
- Linux
cover:
  image: /cover/cover6.jpeg
date: 2022-09-04 21:30:00
lang: cn
mathjax: false
subtitle: basic linux operation
tags:
- Linux
thumbnail: /img/header_img/lml_bg6.jpg
title: Linux02 基础指令
toc: true
---

@Aiken 2022 

If u want get detail params info go to: http://www.explainshell.com.

## tar 压缩命令

linux中主要使用tar来进行文件的打包和解压，如果需要处理zip文件需要额外的支持，在上一章节中已经提到了，该章节压缩文件部分主要介绍tar命令

**压缩文件（夹）**

```shell
tar -zcvf {final_name}.tgz {dir} --exclude={dir/sub_dire1}
tar -cvf ...
```

**解压文件（夹）**

```shell
tar -zxvf {tarfile}.tgz -C {指定目录}
tar -xvf ...
```

### 批量解压tar

编写脚本批量解压tar文件到对应的文件夹中，这里主要的核心在于脚本的编写，而非tar的package

```shell
# version 1 ez2understrand
for i in `ls *.tar.gz`
do
    mkdir /dir/${i/.tar.gz//}
    tar zxvf $i -C /dir/${i/.tar.gz//}
done
```

也可以使用第二种方法：

```shell
# version 2 try to use assignment method
# 可以发现基本的操作是一样的，就是对应的定义的地方
# 可以考虑一下是如何使用echo和cut以及对应的-d 和 -f1是什么意思
for file in `ls *.tar`
do
    todir=`echo $file | cut -d"." -f1`
    mkdir $todir && tar -xvf $file -C $todir
done
```

参考资料：[tar压缩解压缩命令详解](https://www.cnblogs.com/hhandbibi/p/7283862.html)



## 文件操作

### `cd` 路径切换

`cd` means change directory 切换工作区路径，毋庸置疑是最常使用的指令，基础用法`cd {path}`

**返回上次目录**

```shell
cd -
# - equal to $OLDPWD
```

推荐使用 [zjump](https://github.com/rupa/z) 能通过z指令快速定位目录，其通过frecency来管理地址优先级，能通过地址的简写，或者最终文件夹的名字快速跳转和定位。

### `touch` 新建

```shell
touch {filename}
mkdir {foldername}
```

### `rm` 删除

删除文件夹的时候需要-r指定递归删除，最好结合-v看看自己到底删了什么

```shell
rm -{option} {filename}
rm -{option}r {foldername}
```

> "rm -f" 强行删除，忽略不存在的文件，不提示确认。(force)
> "rm -i" 进行交互式删除，即删除时会提示确认。(interactive)
> "rm -r" 将参数中列出的全部目录和子目录进行递归删除。(recursive)
> "rm -v" 详细显示删除操作进行的步骤。(verbose)

删除文件夹中的文件，但是不删除文件夹

```shell 
rm -rf {folder}/*
```

### `mv` 移动

mv 主要承担了以下两个职责：重命名、移动

```shell
mv {fileA} {nameB}
mv files dir/
```

实际上name就代表了在系统中的position，所以当nameB可为地址，可以在移动的同时重命名。

建议使用`-i`参数强制执行提示功能， 避免意外覆盖文件。

### `cp` 拷贝

```bash
# using cp to copy file
cp dir1/filea dir2/filea.bak -i
```

- 使用cp -i 强制询问是否覆盖，避免不必要的版本损失
- -R 递归复制目录

### `ln` 软连接

Linux 软连接，类似windows系统中做快捷方式

```bash
# 在target地址建立一个名为linkname的软连接，链接到source_dir
ln -s source_dir/ target_dir/linkname
```

删除快捷方式只需要`rm`即可，切记！！不要-f -v -r。

```shell
rm linkname # 删除软连接(注意后面千万不能有/)
mv linknamea linknameb # 同理换名也是一样的
```

切换软连接连接的对象

```shell
ln -snf {new source} {linkname}
```


## Search 搜索命令

### `FileType` 文件类型查看

```shell 
file my_file
```

可以查看符号连接的源目录

### `List` Files 列出文件

`ls`: list directory contents.

```bash
ls -l -r -t -h -s
```

- `-l`: use a long listing format
- `-s`: print the allocated size of each file, in blocks
- `-t`: sort by time(modify, newest first)
- `-h`: human-readable
- `-r`: reverse order
- `-a`: show all files include those hide

If we want to find file by "pattern", we donot need `grep` we can do like this:

```bash
ls *.md
ls *todo*
```

列出文件，也可以使用`tree dir/`列出文件夹的层级结构。

**查看某个文件夹下文件或者文件夹的个数**：[参考资料](https://blog.csdn.net/niguang09/article/details/6445778)

```bash
ls [dirname] -l| grep "^-" | wc -l  # 1.查看某文件夹下文件的个数
ls [dirname] -lR| grep "^-"| wc -l  # 2.包括子文件夹下的文件
ls [dirname] -l| grep "^d" | wc -l  # 3.只查看文件夹 
ls [dirname] -lR| grep "^d"| wc -l  # 4. 包括子文件夹中的文件夹

# 通过管道查看
ll | wc -l
```

### `Find` Files 文件查找

`find`: search for files in a directory hierarchy

```bash
find [path...] -name <pattern>
# find file in this path by pattern
```

### `Grep` Content 格式匹配

Linux grep 命令用于查找文件里符合条件的字符串。

grep 指令用于查找内容包含指定的范本样式的文件，如果发现某文件的内容符合所指定的范本样式，预设 grep 指令会把含有范本样式的那一列显示出来。若不指定任何文件名称，或是所给予的文件名为 **-**，则 grep 指令会从标准输入设备读取数据。

通过grep在命令行中筛选输出显示，只显示grep指定的部分。

```bash
# 只显示其中包括str的部分
 command | grep 'str'
```

直接使用Grep搜索文档中的字符数据，

```shell
grep [option] pattern [file]
# 该命令会在输入或指定的文件中搜索包含匹配指定模式的支付的行。
```

Option:

> -v 反向搜索，搜索不匹配该模式的行
> -n 显示所在的行的行号
> -c 显示有多少匹配到了
> -e 来指定多个匹配模式 `grep -e p1 -e p2file1`
> -r 递归搜索
> -i 忽略大小写
> -I 忽略二进制文件
> -w, word-regexp 

**"或"** 搜索：

```shell
grep -E "optionA | optionB" *
```

### `History` Command 历史命令查询

HISTORY主要针对如何找到历史指令，如何重复执行某一行指令；

```bash
# show the history command idx
history
 1262 btm

# resume this command idx, it'll get command by the idx
!1262
 btm
```

**CTRL+r** : Reverse Cmd Searching

命令行反向搜索模式，方便输入重复的指令和地址，其会根据当前的键入内容去匹配历史指令。

## Check 系统状态查看

### 系统时间显示

`date "+format"` 通过在＋号的后面指定 format 来约束输出时间的样式，具体格式可以[参考网站](https://www.runoob.com/linux/linux-comm-date.html)

### 网络状态

ifconfig 命令需要先安装 net-tools，直接使用 `sudo apt-get install net-tools` 安装

```bash
ifconfig
```

`netstat` 命令用于显示网络连接、路由表、接口状态等网络信息。

```bash
netstat
```

-i 显示网卡列表信息
-r 显示路由表信息
-l 列出正在监听的服务
-a 所有连接中的socket


### 系统磁盘占用

**查看文件夹和磁盘的空间占用**：[explain_shell du](https://www.explainshell.com/explain/1/du)

`df` 命令可以显示目前所有文件系统的可用空间和使用情形

``` bash
# 参数 -h 表示使用「Human-readable」的输出，也就是在档案系统大小使用 GB、MB 等易读的格式。
 df -h
```

`du` 查询文件或者当前文件夹的磁盘使用

```bash
# 查询当前文件夹下面各个文件夹的大小：
# 将深度改成n应该可以改变递归到子文件夹下的深度
du -h --max-depth=1 *
# *代表的是当前文件目录
du -h --max-depth=1 [path]
```

查看当前目录下文件和文件夹的大小（定位哪里占用空间最大）：

```shell
# 查看当前文件夹下所有文件夹的占用空间
du -sh *
# 对应的查看指定文件夹大小的方式为：
du -sh dir
```

### 系统内存占用

`free` 命令用于显示当前系统中的内存使用信息，使用 `free -h` 即可查看。

### `Watch` 监控

将watch加在前面可以监控一些信息的实时变化

```bash
watch ps -aux
watch nvidia-smi
```

### `Cat` File（more、less、nl）

cat是显示文本文件中所有数据的得力工具，但是文件的文本会在显示器上一晃而过，难以控制后面的操作。

```shell
cat file1
```

- -n 给所有的行加上行号
- -b 给非空行加上行号
- -T 不显示制表符

**more**会显示文本文件的内容，但是会在每页数据之后停下来，使用spc/enter翻页，q退出

**less**来自 less is more，是 more 的升级版，可以实现文件的前后移动和高级搜索功能。

**nl** 命令式再 linux 中用来计算文件的行号，其会计算出每一个非空行（可以控制是否忽视）的行号，加在改行的前面输出改行，参考：[每天一个linux命令(11)：nl命令](https://www.cnblogs.com/peida/archive/2012/11/01/2749048.html)

### `Head` Doc（Tail）

```bash
tail -n 2 log_file
tail -2 log_file
# -n <N> 显示文件的后面N行
head -5 log_file
```

只显示命令行输出的前几条或者后面几条

```bash
history | head -i
histo | tail -i
```

实时查看正在写入的文件 -f

```bash
tail -f file_inprocess.log
```


## `ps` 进程操作

ps 的英文全称为：process，主要用来查看系统中的进程状态，参数的主要参考资料：[explain ps](https://www.explainshell.com/explain/1/ps) 

```shell
ps -aux | grep {content}
kill {PID}
```

- `-a` 显示所有进程（-e同上）
- `-N` 显示与指定参数不符的所有进程
- `-u` 显示用户即 其他详细信息
- `-x` 显示没有控制终端的进程

### 其他进程操作命令

- `pstree` 命令则可以结合 `ps` 命令，可用树状图的形式显示进程之间的关系。
- `top` 命令用于动态地监视进程的活动以及系统的负载
- `pidof` 命令可以查看**指定服务**进程的 PID 号码
- `killall` 复杂的服务进程可能会有多个 pid 进程号，killall 可以批量的终结指令


## Sleep 暂停

`sleep t`引入一段时间的暂停