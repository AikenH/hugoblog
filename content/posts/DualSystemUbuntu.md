---
calendar_date: 2023-01-22
catalog: true
categories:
- Windows
cover:
  image: /cover/cover9.jpeg
date: 2023-01-22 16:25:27
lang: cn
mathjax: false
subtitle: null
tags:
- DualSystem
- Windows
thumbnail: /img/header_img/lml_bg9.jpg
title: Windows Configuration04 Dual-System-Ubuntu
toc: true
---

该文介绍基于 Windows11 系统的双系统安装和删除，安装的双系统选择 Ubuntu（开发还是比较推荐使用 WSL2 即可）

## Install Dual System 

参考资料：[全面解决各种问题]( https://blog.csdn.net/NeoZng/article/details/122779035 ) [双系统安装](https://www.cnblogs.com/masbay/p/10745170.html) [Windows+Ubuntu20.04双系统安装教程](https://zhuanlan.zhihu.com/p/363640824)

### 1. 安装 u 盘制作

这里推荐 [ventoy](https://github.com/ventoy/Ventoy) 来做启动盘，ventoy 可以同时将很多系统的镜像放到一个 u 盘中，最最重要的是：干净简洁，可以参考其[官方文档](https://www.ventoy.net/cn/doc_start.html)来制作盘，制作后将镜像文件放到指定目录即可。

### 2. 硬盘分区

win+s 搜索创建并格式化分区，找一块空闲空间较大的硬盘，右键压缩卷，设定好预留给 Linux 的空间即可（记住该大小，方便后续辨认，可以将各个盘的大小拍照记录下来，安装的时候别把 windows 覆盖了）。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230323085002.png)

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230323085239.png)

该预留的**未分配**空间，建议至少 30G 以上，如果需要开发和机器学习啥的话可以 50G、100G 以上。


### 3. 进入 bios 选择 U 盘启动

各个主板进入 bios 的方式不同，可以参考自己使用主板的进入方式，在开机的时候狂按某个 Fx 键，然后再启动方式中把启动盘调整到第一位，保存并重启。然后启动的时候就会进入 grub 界面。

（该部分主要参考 [HNU 跃鹿战队]( https://blog.csdn.net/NeoZng/article/details/122779035 ) ）然后开始安装，安装前期一些比较常规的就不说了，关键的地方如下，记得选择其他选项，保证共存：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230323090755.png)

找到未分配的空闲空间（可以按照预留的大小辅助判断），为其划分 Ubuntu 需要的几个分区：

1. EFI 系统分区：逻辑分区 >=512mb 用于加载和启动（不要太大浪费）（空间起始位置）
2. Ext4 日志文件系统：主分区、可以大一些，许多程序的默认安装地址在根目录的 `/opt` 中，挂载点：/
3. Ext4 日志文件系统：逻辑分区（看下默认的是啥）、剩下的都放在这，挂载点：/home

然后安装的时候需要选择刚刚分的系统分区 EFI，千万注意不要和 windows 搞混了，可以通过设备和大小来划分，后续按照引导来即可。

### ++Grub 开机引导界面美化

https://zhuanlan.zhihu.com/p/94331255

### BitLocker 科普

[【科普】Win10电脑的Bitlocker是什么](https://zhuanlan.zhihu.com/p/146450240)

## Remove Dual System 

参考资料:  [华为云-删除双系统]（ https://bbs.huaweicloud.com/blogs/303695 ）[知乎-删除双系统]（ https://zhuanlan.zhihu.com/p/392633489 ）

Outline：1 （option）备份 - 2 修改默认启动项 - 3 删除硬盘分区 -4 删除开机启动引导 - 5 （option）重新分配磁盘空间

### 1. Backup

有重要文件 / 对操作不完全清楚推荐备份，不在赘述。

### 2. 修改默认启动项

开机时，微星 F2 或 Del （不同品牌不同）进 Bios 修改 Boot 启动项，改回 windows 默认启动。

### 3. 删除 Ubuntu 分区

Windows + S 搜索硬盘分区打开磁盘管理器，删除 Ubuntu 相关分区，主要特征如下：

- 为主分区
- 非 EFI 系统分区（!）、非恢复分区、非基本数据分区
- 不是 windows 当前使用的分区（删除的时候会提示非Windows）
- 没有命名
- 不是未分配的分区

且一般会有磁盘 1-2 的区别，注意甄别。

删除完分区后，可以找到相邻的分区，使用拓展卷功能，将多余的空间分配过去即可。

折腾的话可以记住当前的系统大小分配备用。

### 4. 删除 Ubuntu 开机引导

A. 管理员身份打开 CMD/Powershell，进入磁盘管理

```powershell
list disk
```

B. 选择系统磁盘 

```powershell
select disk 1
```

C. 查看对应的分区信息

```powershell
list partition
```

其中类型为系统的是 EFI 分区，Win11 一般为 100M，也可以再去磁盘管理器里面看一下。

D. 为其分配盘符, 注意盘符当前未被使用，可以 Win+E 打开资源管理器看看。

```powershell
select partition 1
assign letter=k
```

E. 盘无法直接进入，使用记事本访问，打开开始菜单，找到记事本，管理员权限打开。

右上角【文件】->【打开】进入新的磁盘，看到 EFI 文件夹，进入 EFI 文件夹，删除 Ubuntu 文件夹。

F. 返回刚刚的命令行界面，删除分配的盘符即可

```powershell
remove letter=k
exit 
```

结束