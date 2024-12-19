---
calendar_date: 2021-02-22
catalog: true
categories:
- Development-Tool
cover:
  image: /cover/cover13.jpeg
date: 2021-02-22 01:45:43
description: init ssh and set up remote services and ...
lang: cn
mathjax: false
tags:
- SSH
- Git
thumbnail: /img/header_img/lml_bg40.jpg
title: SSH 常用场景和操作
toc: true
---

主要介绍ssh服务在以下的几个方面（windows，linux）的使用情况：远程服务器连接（22），git&github（gitee），vscode免密登录。

## ssh-key

[GITHUB关于SSH的教程](https://docs.github.com/en/github/authenticating-to-github/checking-for-existing-ssh-keys) 👈可以直接切换成中文模式的

**查看是否已存在**

```bash
ls -al ~/.ssh
```

**初始化 / 生成 ssh key **

```bash
# github 推荐，优先度从上到下递减
ssh-keygen -t ed25519 -C "your_email@example.com"
# if not support 
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
# tradition
ssh-keygen -t rsa -C "chenlangl@outlook.com"

```

**将ssh添加到github的个人权限界面中**

**免密登录**

在github的教程中也有另一种方式来实现免密登录，好像是ssh-agent的方式安全的保存密码。


## Linux 开放ssh远程权限

参考资料：[设置sshd配置文件](http://frantic1048.logdown.com/posts/291498-resolve-the-ssh-password-is-correct-but-was-refused-connection) | [允许passwd登录root](https://www.cnblogs.com/zqifa/p/linux-ssh-2.html)

在开放远程权限之前，首先检查 ssh 服务是否已经启动/安装：

```bash
# Ps检查相关进程是否启动
ps aux | grep ssh
```

如果没有启动相关进程，可以检查一下是否存在相关服务：

```bash
# 重启ssh服务，下面是两种不同linux的写法
service ssh restart
systemctl restart sshd.service
```

如果也没有相关服务，需要在设备上先安装相关服务：

```bash
# 如果安装失败，可以尝试先更新apt， sudo apt-get update
sudo apt-get install openssh-server
```

服务安装完成后，需要修改一下默认配置，默认配置中可能会关闭允许密码登录等相关项：

```bash
# 按照如下入境编辑相关配置文件（非重新生成）
vim /etc/ssh/sshd_config
# 也有可能是下面这个文件名
vim /etc/ssh/ssh_config
```

检查以下几项（取消注释，NO 改为 YES，添加项）是否符合预期：

```conf
PasswordAuthentication yes        # 新建或注释，启用密码登录
PermitRootLogin prohibit-password # 若存在则注释掉该行
PermitRootLogin yes               # 新建/取消注释
PubkeyAuthentication yes          # [option]启用秘钥登录，用于免密认证
```

确保配置无误后，重启 SSH 服务，应该就可以通过 SSH 访问相关设备（ssh 的默认端口号为 22）

```bash
# 重启ssh服务，下面是两种不同linux的写法
service ssh restart
systemctl restart sshd.service
```
设置 ssh 服务开机自启（这里介绍 docker 版本的开机自启，）

```
vim /root/.bashrc
```

在.Bashrc 的末尾添加以下代码

```bash
service ssh start
```

重启测试。

如果是宿主机上直接设置开机自启可使用

```bash
sudo systemctl enable ssh
```

还有一种方式是使用[开机自动挂载](https://aikenh.cn/cn/%E5%B1%80%E5%9F%9F%E7%BD%91%E5%85%B1%E4%BA%AB/)一文中的办法，手动编写启动脚本实现。

## Git&Github

官方文档介绍的一些权限错误的地址：https://docs.github.com/en/github/authenticating-to-github/error-permission-denied-publickey

初始化git的用户配置，可以按照电脑id来进行命名其实区分起来还是好弄一些。

```bash
git config --global user.name "YOURNAME"
git config --global user.email YOUEMAILADRESS
git config --list
```

将本机的ssh公钥(public)放到GITHUB账户下的ssh管理地址，执行测试

```bash
ssh -T git@github.com
```

没有问题的话就可以直接进行clone，之类的git操作了

```bash
// 小trick，不拉取历史的commit
git clone --depth=1 REPO_ADRESS
```

## ssh 免密认证

windows(Local) - Linux(Services) :[Link1 Pro](https://blog.frytea.com/archives/409/)

实际上不光是VsCode，可以在本机上通过ssh服务免密登录服务器了，这一块好像可以通过公钥和私钥两种方式来做，在这里我们首先使用公钥来测试成功。

具体的操作如下：

```bash

cd ~/.ssh

# 创建authorized_kes 在其中填入我们需要远程登录的服务器的ssh pub key，在这里就是windows本机的。
touch authorized_kes

# 修改权限
sudo chmod 600 authorized_kes
sudo chmod 700 ~/.ssh/
```

**然后检查密钥登录的功能是否开启**

```bash
# 改相应的ssh配置文件
vim /etc/ssh/sshd_config
```

查看其中以下的配置项是否打开：

```
#PubkeyAuthentication yes
```

可以禁用密码登录，但是这样的方式可能会导致后面挂了以后直接GG，所以慎重。

**重启服务**

```bash
service ssh restart
# or 
systemctl restart sshd.service
```