---
calendar_date: 2023-04-18
catalog: true
categories:
- Linux
cover:
  image: /cover/cover3.jpeg
date: 2023-04-18 16:00:07
description: Linux 三剑客之Awk
lang: cn
mathjax: false
tags:
- Bash
thumbnail: /img/header_img/lml_bg30.jpg
title: Grep、Sed、Awk 03 Awk
toc: true
---

> Linux 三剑客之 Awk (由三个创始人的姓氏首字母组成)，相比于 Grep 和 Sed 而言更为特殊一些，它是一种模式匹配的编程语言，其主要的作用匹配文本进行处理，其擅长实现对文本的格式化输出，而作为一门编程语言：支持函数，变量，循环，运算，但相对简单。

AWK 的执行逻辑是：搜索文件的每一行，如果**发现匹配内容，就执行下一个编程步骤，如果没发现，就继续处理下一行**的内容。

## Intro

>  由于 AWK 实际上是一个编程语言，本篇主要只介绍其命令行用法。

首先介绍 AWK 命令，其主要用于匹配文本并格式化输出，适用于对**表格**化的数据机型处理。其使用模板大致如下：

```bash
awk [options] 'program' var=value file...
awk [options] 'pattern {action1; action2; ...}' file ...
awk [options] -f programfile var=value file...
awk [options] 'BEGIN{ action;... } pattern{ action;... } END { action;... }' file ...
```

- **-f** scriptfile: 从脚本文件中读取 awk 命令
- **-v** var=value: 赋值一个用户定义变量，也可用这种方式修改内置变量
- **-F** fs: fs 可为任意字符串或者正则表达式，用于指定分隔符（也可以通过-v 的方式修改内置的分隔符变量来实现）

每个 action 或者说 statement 之间用 `；` 分割

参考资料：[AWK wikipedia](https://zh.wikipedia.org/wiki/AWK) | [practical-programming-books/awk.md ](https://github.com/EZLippi/practical-programming-books/blob/master/src/awk.md) | [一. AWK入门指南 — AWK程序设计语言](https://awk.readthedocs.io/en/latest/chapter-one.html) | [Linux文本三剑客超详细教程---grep、sed、awk - alonghub](https://www.cnblogs.com/along21/p/10366886.html)



## Variant 变量

**变量**：awk 主要涵盖两种变量，变量和内置变量，定义变量使用-v 命令，在每个变量前都要加 `-v`

接下来分别介绍如何使用这些变量来对文件进行操作。

### 内置变量

> awk 进行文件处理的时候，会有一组默认变量，基于这组默认变量可以支持各种脚本需求，同时也对应一些操作。

| 内置变量 | 功能                                                                             | 默认值 |
| -------- | -------------------------------------------------------------------------------- | ------ |
| FS       | 分割符变量                                                                       | ""     |
| OFS      | 输出时的字段分隔符                                                               | ""     |
| NF       | 分割后的字符串数量(可以被分成几段)，` $NF` 引用最后一列；`$ (NF-1)` 引用倒数第二列 |        |
| NR       | 行号；后跟多个文件时，第二个文件的行号从第一个的末尾开始                         |        |
| FNR      | 行号；但各个文件分别计数                                                         |        |
| FILENAME | 当前文件名                                                                       |        |
| ARGC     | 命令行参数的个数                                                                 |        |
| ARGV     | 数组，存储了命令行给定的各个参数                                                 |        |
| RS       | 指定输入时的换行符，（原换行符效果保留）                                         |        |
| ORS      | 替代输出时的换行符                                                               |        |

接下来我会用简单的例子来说明以下这些指令，基于以下的测试文件 `awk_test`：

```txt
hello:awk:world
good-for-u
the:env:basic:on:bash
fi:example
```

第一个**主要参数的例子**如下：

```bash
awk -v FS=":" -v OFS="|" 'print{$0,NF,NR,FILENAME,ARGC}' awk_test
#BTW等同于如下的文件
awk -F":" -v OFS="|" '{print $0,NF,NR,FILENAME,ARGC,ARGV[3]}' awk_test
```

该命令将输出如下结果，各个参数的含义可以在上面查表。

```txt
hello:awk:world|3|1|awk_test|2
good-for-u|1|2|awk_test|2
the:env:basic:on:bash|5|3|awk_test|2
fi:example|2|4|awk_test|2
```

> ` $n` 代表指定列，如果是 `$ 0` 就会输出每一列。

```bash
ARGV[i]
```

上述对应第 i 个参数。

第二个介绍**NF 的特殊用法**：

```bash
awk -F":" -v OFS="|" '{print $(NF-1)}' awk_test
```

会得到如下的输出：

```txt
awk
good-for-u
on
fi
```

基于上面的例子也能对 print 命令的使用有个大致的概念。

### 自定义变量

> 这里主要介绍自定义变量的几种方式，

Way 1: 直接通过输入参数设置好变量值 `-v var=value`
Way 2: 在 program 中定义
	- `awk -F':' {name="admin"; print name, $0}` 一切正常
	- `awk -F':' {print name, $0;name="admin"}` 第一行的 name 会为空

### 数组

（1）可使用任意字符串；字符串要使用双引号括起来
（2）如果某数组元素事先不存在，在引用时，awk 会自动创建此元素，并将其值初始化为“空串”
（3）若要判断数组中是否存在某元素，要使用“index in array”格式进行**遍历**
（4）若要**遍历数组中的每个元素**，要使用 for 循环**for(var in array)** {for-body}

这里简单介绍一下数组的使用，`{ line[NR] = $0 }  # 记下每个输入行` ，`!arr[$ 0]++` 去除重复元素，并对每个元素出现的次数进行计数。

```bash
# 反转 - 按行逆序打印输入
    { line[NR] = $0 }  # 记下每个输入行
END { i = NR           # 逆序打印
      while (i > 0) {
        print line[i]
        i = i - 1
      }
    }
```

```bash
---打印文件内容，和该行重复第几次出现
awk '{!arr[$0]++;print $0,arr[$0]}' awktest
```

下面将 value 赋值给数组下标为 index 的元素：

```bash
array[index]=value
```

## Printf 命令

> 比 print 更强大的专注于格式化的输出命令，而 FORMAT 也是 AWK 的一个重要核心，所以这里额外的介绍以下 printf，并以此引入FORMAT

其使用方式大致如下：

```bash
printf "FORMAT", item1,item2,...
```

同时相比于 print，其具备如下特性需要注意：

1. FORMAT 必须指定；
2. 不会自动换行，需要显式的给出换行控制符，`\n`
3. FORMAT 需要为后面的每个 item（如 $1, $ 2 等需要输出的变量） 指定格式符

### 格式写法

> format 的定义得与 item 相互一一对应，下面是一些格式的写法。

- `%c`：显示字符的 ASCII 码
- `%d`，`%i`：显示十进制整数
- `%e`，`%E`：显示科学计数法数值
- `%f`：显示为浮点数，小数：`%5.1f` 指的是带小数点，宽度共 5 位，其中小数 1 位，不够的情况用空格补上。
- `%g`，`%G`：以科学计数法或者浮点形式显示数值
- `%s`：显示字符串，例如 `%5s`，显示最少 5 个字符，不够用空格补上，超过还继续显示
- `%u`：无符号整数
- `%%`：显示%本身

> 除了这些字符格式之外，还有一类修饰词，用来规范输出的样式，修饰词放 `%<修饰词><格式写法>`

- `<digit>[.<digit>]`：`<digit>` 表示数字，第一个数字控制显示的宽度，第二个表示小数点后的精度。
- `-`：左对齐（默认右对齐），`%-15s` 左对齐显示 15 个字符
- `+`：显示数值的正负符号，`%+d`

举个例子，假如我们有如下的 person_info 文件

```txt
ponywang 123456
hollyx 234567
```

则使用该 awk 命令

```bash
awk '{printf "%10s:%11s\n", $1, $2}' contract
```

输出如下：

```txt
  ponywang:     123456
    hollyx:     234567
```

而如果约定左对齐的话，即使用下条 awk 命令，对应的结果如下

```bash
awk '{printf "%-10s:%11s\n", $1, $2}' contract
ponywang  :     123456
hollyx    :     234567
```

## Operator 基本操作符

> 各种**算数操作符**、**比较操作符**、**逻辑操作符**，和普通的操作符是一致的，就不在赘述了；而字符串操作符是无符号操作符，做字符串连接。这里介绍一些其他的特别的操作符。

- 赋值操作符：
	- ` = `，` += `，` -= `，` *= `，` /= `，` %= `，` ^= `
	- `++` ，`--`
- 模式匹配符：
	- `~`：左边是否和右边匹配
	- `!~`：是否不匹配
- 函数操作符：`function_name(arg1, arg2)`
- 三目表达式：selector?if-true-expression:if-false-expression

（**三目表达式使用**）例子 1：在未使用的 drive 的行面前添加 null，否则添加 nonull，该例子实际上包含了赋值和三目表达式。

```bash
df -h | awk '{$3==0?name="null":name="nonull";print name,$0}'
```

（**模式匹配符使用**）例子 2：仅打印 dev 的磁盘，有以下的两种匹配方式：

```bash
df -h | awk '/^\/dev/ {print $0}'
df -h | awk '$1 ~ /^\/dev/ {print $0}'
```

其中可以用模式匹配符结合$n 来指定在哪一列中进行匹配。

> 同时我们可以看出 awk 和管道结合使用的方式，那么如果我们要过滤出 dev 中使用超过 40% 的可以使用以下的方式进行，awk 也可以仅仅只做模式匹配。

```bash
df -h | awk '/^\/dev/ {print $(NF-1)"---"$0}' | awk -F% '$1 > 40'
```

（**逻辑和比较符使用**）例子 3：筛选/etc/passwd 中第三列=0 或者>=1000 的用户名。

```bash
cat /etc/passwd | awk -F: '$3==0 || $3>=1000 {print $1}'
```

这里也可以试一下算数运算符

```bash
cat /etc/passwd | awk -F: '$3==0 || $3>=1000 {print $1,$2,$3+10086}
```

## Pattern 匹配格式

从上面的例子也可以知道模式匹配也是 awk 中重要的组成部分，下面介绍一下 awk 的匹配逻辑：

> 根据 pattern 条件，过滤出匹配的行后再做后续的{action}处理，如果没有 action 就仅过滤

主要有以下的几种模式：

1) **None**: 不写的话就匹配每一行
2) **/regular expression/**：仅处理能被模式匹配到的行，**正则**需要被 `//` 包起来
3) **condition expression**：awk 的条件表达式，结果为真的行才会被处理。
4) **line ranges**：行范围
	-  /pattern 1/, /pattern 2/ ：用两个 pattern 匹配到的行的范围，不支持直接给出数字，可以有多段，中间可以有间隔。
5) **BEGIN/END** 模式
	- BEGIN{}：仅在开始处理文件的文本之前执行一次
	- END{}：尽在文本处理完成之后执行

结合 BEGIN 和 END 等模式，就可以更好的格式化输出文件了，比如我们模拟 df -h 的标题行和新增总结行。我们提前备好一个没有对应的头的文件。

```bash
 df -h | awk -v TOTAL=0 -v USED=0 
 'BEGIN{printf "%-10s\t%10s\t%10s\t%10s\t%10s\t%10s\n","FILESYSTERM","SIZE","USED","AVAIL","USE%","MONTED ON"}
{TOTAL+=$2;USED+=$3;printf "%-10s\t%10s\t%10s\t%10s\t%10s\t%10s\n",$1,$2,$3,$4,$5,$6}\
 END{printf "%-10s\t%10s\t%10s\t%10s\t%10s\t%10s\n","SUM",TOTAL,USED,"-",USED/TOTAL*100,"WINDOWS"}'
```

可以看到这里由 BEGIN、{}、END 三部分组成，结合 Printf 来实现文件的对齐。

## Condition 条件语句

> 介绍一下条件语句怎么编写。

```bash
if (condition){statement,...}else if(condition2){statement2,...} else {statement}
```

举个例子，

```bash
df -h | awk '{if ($1=="none") print $1,$2,$3}'
```

可以看出，条件表达式是包在{ action }中的 action 的部分，其中 condition 要用 `()` 抱起来，然后后接 statement 即可。当然如果要 if、else 的话，statement 最好还是用 `{}` 包起来更好。 

## Loop 循环语句 

> loop 的写法主要有三种，while；do-while；for；接下来主要简单介绍一下各个循环的写法。

此外，控制循环的 continue 和 break 的用法和其他语言是一致的这里就不再说；这里再介绍一下对 awk 本身循环控制的一个指令：`next`

awk 本身有个逐行处理的循环，next 会提前结束对本行的处理，进入对下一行的处理。

### While

```bash
while(condition){statement;...}
```

使用场景

- 对一行内的多个字段逐一类似处理时使用
- 对每一列的各元素逐一处理时使用

举个例子：匹配以 None 开头的行，每一行输出每一列的值和长度。

```bash
df -h | awk '/^none/ {i=1;while(i<NF){print $i, length($i); i++}}'
```

### For

```bash
for (expr1;expr2;expr3) {statement;...}
or
for (var in array){statement;...}
```

可以看出 for 循环和 cpp 的写法是一致的，两种就不在赘述了。

### do-while

```bash
do {statement;...} while(condition)
```

这里举个例子，计算 1+.....+100=5050

```bash
awk 'BEGIN{sum=0;i=1;do{sum+=i;i++}while(i<=100);print sum}'
```

### （addition）switch

这里额外介绍一下 switch 语句：

```bash
switch(expression) {case VALUE1 or /REGEXP/:statement1; case VALUE2 or /REGEXP2/: statement2;...; default: statementn}
```

## 自定义函数

和bash区别：定义函数（）中需加参数，return返回值不是$?，是相当于echo输出

```bash
function name ( parameter, parameter, ... ) {
    statements
    return expression
}

```

举例：

```bash
function max(v1,v2) {
    v1>v2?var=v1:var=v2
    return var
}
BEGIN{a=3;b=2;print max(a,b)}
```


## 其他的一些函数介绍

- rand()生成 0-1 之间的随机数，需要首先 srand()初始化
-   length([s]) ：返回指定字符串的长度
-   sub(r,s,[t]) ：对t 字符串进行搜索r 表示的模式匹配的内容，并**将第一个**匹配的内容替换为s
-   gsub(r,s,[t]) ：对t 字符串进行搜索r 表示的模式匹配的内容，**并全部替换**为s 所表示的内容
-   plit(s,array,[r]) ：以 r 为分隔符，切割字符串 s ，并将切割后的结果保存至 array 所表示的数组中，第一个索引值为1, 第二个索引值为2,…

### awk 中调用 shell 命令

使用 `system` 命令：

-  `awk BEGIN'{system("hostname") }'`
- `awk 'BEGIN{name="along";system("echo "name)}'`

## Fi

该篇还远不到结束，后续随着工作生活中用到再慢慢补充把，初步就到这里了，主要还是参考的网上的文献，实践还是太少了。