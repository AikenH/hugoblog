---
calendar_date: 2021-11-28
catalog: false
categories:
- Linux
cover:
  image: /cover/cover20.jpeg
date: 2021-11-28 06:24:21
lang: cn
mathjax: false
subtitle: config your linux from begin
tags:
- Linux
thumbnail: /img/header_img/lml_bg20.jpg
title: Linux 基础操作 01
toc: false
---

## 学习资源汇总

manual：[菜鸟Shell](https://www.runoob.com/w3cnote/linux-common-command-2.html) | [ExplainShell](https://www.explainshell.com/explain/1/ps)

收录一些Linux的工具书以及相关的OnLine-Doc，方便后续进行学习和查阅：

1. [鸟哥的Linux私房菜](http://cn.linux.vbird.org/linux_basic/linux_basic.php)：相对全面一点但是内容有点太多了
2. [Linux就该这么学](https://www.linuxprobe.com/chapter-00.html)：从开始到结束的流程挺完善的，但是这个网站做的是纯傻逼
3. [Linux Tools Quick Tutorial](https://linuxtools-rst.readthedocs.io/zh_CN/latest/index.html#)：简单入门教程好像是
4. Linux命令行于Shell脚本编程大全：本地PDF，在当前文件夹下面进行查看

## 文件架构&系统信息

[Linux各文件夹的含义](https://www.cnblogs.com/sijizhen/p/10576049.html)分析LInux下的文件架构体系，包括最外层的一些系统文件夹的基础作用以及对应的特殊功能等等，帮助我们能够更清楚我们文件的存储体系以及系统文件的存储地址。



- `/tmp`：临时文件夹，系统会定期清理其中的文件，用来存放一些下载和安装的文件
- `/mnt`: mount挂载文件夹，作为挂载目录来使用，比如在WSL中，对应的就是windows系统的文件
- `/etc `:用来存放所有的系统管理所需要的配置文件和子目录，linux正是因为这些文件才能正常运行
- `/home`: 个人文件夹，在home下会有自己的user dir,通常情况下我们的工作区和对应的其余资料都会放在这个部分
- `/bin`: 是binary的缩写,包含了引导系统启动所需的命令和普通用户可以使用的常用命令
- `/root`: 系统管理员的主目录
- `/var`:这个目录中存放着那些不断在扩充着的东西，为了保持/usr的相对稳定那些经常被修改的目录可以放在这个目录下，实际上许多系统管理员都是这样干的顺带说一下系统的日志文件就在/var/log目录中。
- `/usr`: 最庞大的目录，要用到的应用程序和文件几乎都在这个目录

### GPU & CPU信息

Linux查看显卡信息：

```shell
lspci | grep -i vga
# 如果是nvidia还可以
lspci | grep -i nvidia
# 最常用：或者使用nvidia的自带命令
nvidia-smi
```

监视GPU使用情况

```bash
watch nvidia-smi
# or
gpustat --watch
```

显示CUDA版本

```bash
cat /usr/local/cuda/version.txt
```

查看CPU：[相关信息](https://blog.csdn.net/qq_38025219/article/details/88849637)

```shell
cat /proc/cpuinfo
```

显示CPU个数：

```shell
cat /proc/cpuinfo |grep "processor"|wc -l
```

### 软件安装工具介绍

开源的 Linux 有许多发行版本，其中有不同类型的包管理器，`dnf` 和 `apt` 管理器分别针对 `rpm` 和 `deb` 的包，这里介绍一下 RPM 包管理器的发展。

`RPM ` (red-hat program manager) 其是最早的软件安装工具，最早只能基于源码安装，但是其无法分析安装的软件和已安装软件间的依赖关系，这样很容易导致在安装的时候出现问题; 于是后续有了 `Yum` ;

`YUM` 管理了很多 rpm 软件包，并能自动分析其中的依赖关系，避免安装软件出错，但是 yum 仍然存在分析不准确和内存占用的问题，所以后面再2015年的时候又有了更新，也就是 `DNF`;

`DNF` 和 yum 的使用命令是完全一致的，即从 `yum install <package>` 变成了 `dnf install <package>`;

## 系统服务

Linux 中控制系统服务的命令在 RHEL5/6 中为 `service` ，而在 RHEL7/8 中则改为 `systemctl` ，其对应的使用范式分别为：

- `service <server> <action>`
- `systemctl <action> <server>`

其对应执行服务的 `<action>` 都是一致的，例如 start、restart 等服务启动命令。

### 启动ssh服务
         
```shell
service ssh start
# or 
systemctl restart sshd
```

ssh 配置免密登陆和远程登录，可以参考 [SSH 常用场景和操作](https://aikenh.cn/cn/SSH/) 文章。

### 添加用户以及赋予 Sudo 权限

存在两个命令 `useradd` 和 `adduser` 都能添加新用户，但是 `useradd` 不会设置用户目录和 unix-name 的选项，所以推荐使用 `adduser` 指令来新建用户。

> 对应的删除命令为 `userdel` 和 `deluser`, 管理用户组的文件为 `/etc/group` 

```bash
adduser <aikenhong>
# 安装之时输入密码后会提示你输入ROOM等个人信息可以跳过
```

为用户添加 root 权限

```
sudo vim /etc/sudoers
# 可能需要w!来保存
```

## 基础环境配置

配置环境之前首先要清楚自己所使用的Linux发行版以及对应的内核版本，如果使用的是Ubuntu，可通过以下指令查看所属的版本：

```shell
cat /proc/version
# or 
cat /etc/issue
```

在进行一切配置之前，首先使用`passwd`指令修改密码。

### 编辑器 Vim or Neovim

接下来是安装vim或者neovim（或是spacevim等各种变体），其中服务器上推荐以vim作为主力配置的编辑器，neovim和插件的版本迭代和兼容性差，应对版本更新需要更多的精力，相对没有那么稳定（暂时。

安装vim后手动创建配置文件

```shell
sudo apt-get install vim 
```

安装neovim，需要首先安装neovim的ppa发布源后，才能下载

```shell
sudo apt-add-repository ppa:neovim-ppa/stable
sudo apt-get update 
sudo install neovim
```

安装vim的各种其他变体可参考对应的官方站点或github，在完成安装之后，就是配置其使用，这里vim和neovim的配置单独开blog来讲，个人的配置可参考：[AikensDotfile](https://github.com/AikenH/configs_scripts)

### ZSH && OMZ Install：

参考资料：[WSL终端美化](https://0xffff.one/d/716)、[zsh & oh-my-zsh 的配置与使用](https://zhuanlan.zhihu.com/p/58073103)、
[zsh、oh-my-zsh、tmux、vim](https://traceme.space/blog/page/6/zshoh-my-zshtmuxvimdocker/)

**查看**当前使用的 shell：

```shell
echo $SHELL 
# 可以产看系统默认的shell
```

**安装Zsh和OMZ**对命令行进行优化：

```shell
# 安装zsh，很多会内置，其一些语法和调用逻辑相比默认的bash更好
sudo apt-get install zsh

# omz参考官网安装连接，可以使用wget、curl、or github
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

sh -c "$(wget https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"

git clone https://github.com/robbyrussell/oh-my-zsh.git ~/.oh-my-zsh
cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc
 
```

**切换默认终端**，以及恢复：

```shell
chsh -s /bin/zsh
chsh -s /bin/bash root
```

[官方主题](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes )预览，在zsh配置文件中修改`vim ~/.zshrc`

**Zsh插件安装**：[zsh插件安装](https://segmentfault.com/a/1190000039860436)；[zsh插件配置 ](https://www.jianshu.com/p/8a912dc8de57)，主要是两个插件zsh-synyax-highlighting高亮命令和zsh-autosuggestions自动补全。

1. 语法高亮安装：

```shell
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

2. 自动补全安装：

```shell
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

这两个命令将插件安装到相应的位置中，找到后在.zshrc 中进行配置，再通过 `source ~/.zshrc` 刷新配置即可。

其他的一些插件推荐（除了上述两个需要额外下载的，其他大多都是内置的插件，zshrc 中设置后 source 即可）：[推荐几个常用的 zsh 插件](https://www.5lian.ink/developer/%E6%8E%A8%E8%8D%90%E5%87%A0%E4%B8%AA%E5%B8%B8%E7%94%A8%E7%9A%84%20zsh%20%E6%8F%92%E4%BB%B6/) |  [ohmyzsh插件推荐_JASON凯伊](https://blog.csdn.net/weixin_39802884/article/details/121721263) | [Plugins·ohmyzsh/ohmyzsh Wiki](https://github.com/ohmyzsh/ohmyzsh/wiki/Plugins)

```zshrc
plugins=(
        z
        git
        zsh-syntax-highlighting
        zsh-autosuggestions
        colored-man-pages
        safe-paste
        themes
        sudo
        )
```

**删除zsh后远程无法连接**：可能是由于接受ssh启动的默认shell被改成了zsh，而zsh已经卸载，导致无法进入终端页面，因此需要想办法进入console，然后修改默认的登陆项为bash。`vim /etc/passwd`。

>zsh作为基本的shell，可以不删；此外若要删除，记得优先将默认启动项改回bash，此外，不要修改root的默认登录shell，[LINK](https://www.v2ex.com/amp/t/270407?__cf_chl_jschl_tk__=6264f73af1e0c5f14959dfe3604b3da795b3d4da-1602866582-0-AUHrxUdAsZyuwjIUeBGnWQk2x9m6JknAuUFnv_qwxCjCjaoGV7HaIyGQK7SX0QYCHTb6ccqqxizj0GWSRT0gwCDPIh_0G41kPJ14qBcs8570f6hF1r86Lx3o1VkOSC3JXbNzrH6ybDKpmyPmZtPFnfRtPFabzNlgFjbqE8cV_BDenHLDsSBAkENttf13tiKG39tLcUdWcZXQfwVOmyLkoNajKXCqFXwAFSwXqHyW1egKxBQ1bkmCllJGtyBh9D0CD0VsRq6vjVpfeenxOc-1XEqCEPQ2ahzDWEMfNzfjnYcktOSWpkhnUFbqw0L1vss8Y9jG7uooSAxoGS1tgr_XfT022kedjZm1fVCd4AmwSGvo)

**Conda 相关指令消失：**

```shell
# 基于别的shell，例如bash，执行
conda init zsh
```

**添加Alias**方便使用，个人常用的一些alias如下:

```shell
alias g="git"
alias ltr="ls -rsthl"
alias lwc="ll | grep '^-' | wc -l "
alias cl="clear"
alias nvim="vim -u {my .vimrc}"
alias hsp="history | grep "
```

### 进程管理 Monitors

进程和性能检测工具安装，可以检测系统的运行状态，以及对相应的进程进行查看，同时也能起到装逼的作用，主要有以下几个工具：`Htop`，`Bottom`，`Zenith`

Htop 是最general且相对实用的一个版本，主要侧重于进程管理，安装也最为简单。

```shell
sudo apt-get install htop
htop
```

Bottom 需要下载对应内核的安装包后再命令行中执行安装指令，因此也需要curl来下载对应的软件包：

```shell
# 以ubuntu为例，下载deb版本
curl -s https://api.github.com/repos/ClementTsang/bottom/releases/latest | grep browser_download_url | grep amd64.deb | cut -d '"' -f 4 | wget -qi -

sudo apt install ./bottom*.deb
btm
```

Zenith 可能需要系统中支持cargo或者rust，安装放方式类似btm，但是两者之间可做一个相互替代，均着重于可视化系统用量，因此二选一即可：

首先安装rust

```shell
sudo apt-get install rustc
```

下载对应的安装包，解压，并安装

```shell
# download the package of Zenith
curl -s https://api.github.com/repos/bvaisvil/zenith/releases/latest | grep browser_download_url | grep linux | cut -d '"' -f 4 | wget -qi -

# unzip it and install
tar -xvf zenith.linux.tgz

# change the mode of shell
chmod +x zenith
sudo mv zenith /usr/local/bin
```

似乎从源码编译能支持GPU的信息显示，后续有需要的情况下进行拓展。

参考资料:

- [Top Terminal Based Monitoring Tools for Linux | ComputingForGeeks](https://computingforgeeks.com/top-terminal-based-monitoring-tools-for-linux/)
- [Zenith (reposhub.com)](https://reposhub.com/linux/miscellaneous/bvaisvil-zenith.html)
- [ClementTsang/bottom (github.com)](https://github.com/ClementTsang/bottom)
- [bvaisvil/zenith (github.com)](https://github.com/bvaisvil/zenith)

### ZIP支持

tgz应该是linux内置的压缩命令，而许多时候在windows中的压缩包会有zip等格式，所以这里也添加一下ZIP支持。

```shell
sudo apt-get install zip 
```

zip指令的基础使用如下：

```shell
# r means recurrent
zip -r newpackage.zip dir1
```

```shell
# -d 解压到特定文件夹
unzip package.zip -d dir/*
```

```txt
-m: 压缩文件删除源文件
-o: 将压缩文件的最新变动时间设置为压缩的时间
-r: 递归压缩，目录下的所有子级目录一并压缩
-x: “文件列表”，压缩时排除文件列表中的文件
```

## 额外配置

只保留必要的额外配置，帮助系统的使用更加便捷，遵循奥卡姆剃刀原则。

### 资源管理器 Ranger

**安装Ranger**

参考[offical-site](https://github.com/ranger/ranger)，可使用对应发行版本的package-manager进行安装：

```shell
sudo apt-get install ranger
```

**配置Ranger**

```shell
ranger --copy-config=all
```

该命令能将基础的配置复制到相应的地址，随后根据我们的需要对其进行配置，包括是否启用边框等，配置结构如下：

```text
rc.conf     - 选项设置和快捷键
commands.py - 能通过 : 执行的命令
rifle.conf  - 指定不同类型的文件的默认打开程序。
scope.sh    - 用于指定预览程序的文件
```

这些生成的配置文件的所在目录为：`/Users/test/.config/ranger/`

详细配置参考资料：[Ranger使用](https://www.52gvim.com/post/ranger-tool-usage)

### 终端复用器 Tmux

为了避免远程终端执行的代码由于ssh连接的不稳定而中断，可以使用nohup挂起进程，或者使用tmux和screen类的session软件来保持进程，但是鉴于Tmux优秀的终端复用和诸多特性，这里选择tmux。

```shell
sudo apt-get install tmux
```

**配置TMUX**

新版本的时候出现了问题，等待更新，[official example](https://github.com/tmux/tmux/blob/master/example_tmux.conf)，[tutor](http://louiszhai.github.io/2017/09/30/tmux/#%E6%96%B0%E5%A2%9E%E9%9D%A2%E6%9D%BF)

在`~`目录下生成配置文件，然后写入我们希望的配置，后续合并到Dotfile中

```bash
vim ~/.tmux.conf
```

主要包含相关的按键映射以及页面主题等等操作

```bash
# use alt+arrpw to switch panes
bind -n M-Left select-pane -L
bind -n M-Right select-pane -R
bind -n M-Up select-pane -U
bind -n M-Down select-pane -D

# mouse mode
set -g mouse on

# set easier window split keys
bind-key v split-window -h
bind-key h split-window -v

#Enable oh my zsh in tmux
set -g default-command /usr/bin/zsh

#################################### config color ######################################
set -g default-terminal "screen-256color"

## COLORSCHEME: gruvbox dark
set-option -g status "on"

# default statusbar color
set-option -g status-style bg=colour237,fg=colour223 # bg=bg1, fg=fg1

# default window title colors
set-window-option -g window-status-style bg=colour214,fg=colour237 # bg=yellow, fg=bg1

# default window with an activity alert
set-window-option -g window-status-activity-style bg=colour237,fg=colour248 # bg=bg1, fg=fg3

# active window title colors
set-window-option -g window-status-current-style bg=red,fg=colour237 # fg=bg1

# pane border
set-option -g pane-active-border-style fg=colour214 #fg2
set-option -g pane-border-style fg=colour237 #bg1

# message infos
set-option -g message-style bg=colour239,fg=colour223 # bg=bg2, fg=fg1

# writing commands inactive
set-option -g message-command-style bg=colour239,fg=colour223 # bg=fg3, fg=bg1

# pane number display
set-option -g display-panes-active-colour colour214 #fg2
set-option -g display-panes-colour colour237 #bg1

# clock
#set-window-option -g clock-mode-colour colour109 #blue
set-window-option -g clock-mode-colour colour239 #blue

# bell
set-window-option -g window-status-bell-style bg=colour167,fg=colour235 # bg=red, fg=bg

## Theme settings mixed with colors (unfortunately, but there is no cleaner way)
set-option -g status-justify "left"
set-option -g status-left-style none
set-option -g status-left-length "80"
set-option -g status-right-style none
set-option -g status-right-length "80"
set-window-option -g window-status-separator ""

#################################### config status ######################################
set-option -g status-left "#[fg=colour248, bg=colour241] #S #[fg=colour241, bg=colour237, nobold, noitalics, nounderscore]"
set-option -g status-right "#{prefix_highlight}#[fg=colour239, bg=colour237, nobold, nounderscore, noitalics]#[fg=colour246,bg=colour239] %Y-%m-%d %H:%M #[fg=colour248, bg=colour239, nobold, noitalics, nounderscore]#[fg=colour237, bg=colour248] #h"

set-window-option -g window-status-current-format "#[fg=colour237, bg=colour214, nobold, noitalics, nounderscore] #[fg=colour239, bg=colour214] #I #[fg=colour239, bg=colour214, bold] #W #[fg=colour214, bg=colour237, nobold, noitalics, nounderscore]"
set-window-option -g window-status-format "#[fg=colour237,bg=colour239,noitalics]#[fg=colour223,bg=colour239] #I#[fg=colour223, bg=colour239] #W #[fg=colour239, bg=colour237, noitalics]"
```

**TMUX基本操作**

- tmux 前缀按键：`ctrl+b`

```bash
# tmux 新建，离开，重连，关闭，列表，重命名
tmux new -s <session-name>
tmux detach  # 或者prefixKey + d
tmux attach -t <session-name>
tmux kill-session -t <session-name>  # 或者直接exit
tmux kill-windows -t <windows-name>
tmux ls
tmux rename-session -t <old-session-name> <new-session-name>  # prefixkey + b
```

## Anaconda 安装

参考资料：[如何在 Ubuntu 20.04 上安装 Anaconda](https://cloud.tencent.com/developer/article/1649008)；[oh-my-zsh主题支持conda虚拟环境](https://www.lyytaw.com/%E6%9D%82%E9%A1%B9/oh-my-zsh%E4%B8%BB%E9%A2%98%E6%94%AF%E6%8C%81conda%E8%99%9A%E6%8B%9F%E7%8E%AF%E5%A2%83/#%E8%83%8C%E6%99%AF)；[oh-my-zsh主题显示conda环境名称](https://blog.csdn.net/zw__chen/article/details/100748928)

### 安装

找到最新的安装包版本：[Index of anaconda](https://repo.anaconda.com/archive/) 后选择对应的版本安装

```bash
wget -P /tmp https://repo.anaconda.com/archive/Anaconda3-2021.05-Linux-x86_64.sh
```

可选）验证下载版本的正确性：

```bash
sha256sum /tmp/Anaconda3-2021.05-Linux-x86_64.sh
# 查看输出的哈希值和对应的archive上的值是一致的
```

安装anaconda

```bash
sh /tmp/Anaconda3-2021.05-Linux-x86_64.sh
# 按照intro应该会执行conda init 等等操作，如果没有我们可以自行执行
```

### 环境配置

在安装完成后记得执行`conda init`初始化环境，而针对其他的shell，例如zsh，可以按照以下的流程执行初始化。

```bash
# 假如当前的shell是zsh
bash
source ~/.bashrc
conda init zsh
# 退出bash回到zsh
```

**关闭conda的命令行提示:**

```shell
conda config --set changeps1 false
```

**安装没安装完成的包：**

`sudo apt-get install package --fix-missing`

**更新源：**

很多情况下Ubuntu的Source是被屏蔽的，所以我们需要使用国内源进行替代，来提升我们的下载和安装的速度

```bash
# backup the source files in cases that sth wrong
sudo cp /etc/apt/sources.list /etc/apt/source.list.bak

# using sudo to modify or recreate the source.list files
sudo nvim /etc/apt/source.list

# replace the content of it
=== TSINGHUA SOURCE ===

# update the source info
sudo apt update

# update the files to varify the speed.
sudo apt upgrade
```

实际上换源只要找到对应的ubuntu的发行版，也就是在源链接后面的形式，然后将前面的url改成对应的源即可

[All the source list](https://www.myfreax.com/how-to-change-the-software-source-of-ubuntu-20-04/)；[清华源更新地址](https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/);[聚合](https://www.cxyzjd.com/article/amyzhang1234/101555284)；[XJTU](https://mirrors.xjtu.edu.cn/help/ubuntu.html)；[Alibaba](https://developer.aliyun.com/mirror/ubuntu?spm=a2c6h.13651102.0.0.3e221b11newPW7)

```ini
==================== aliyun source ===================
deb http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
```

其他的相关操作参见Anaconda的相关文档，这里只涉及对应的安装和初始化。


## 注意事项

@Aiken 2020

本文档主要记录一些Linux下面遇到的问题解决方法：

### python环境无法识别

安装完linux以后在bash没法执行conda命令，以及识别不出conda中安装的环境，而从portainer中可以直接启动python的非对等偏差问题。

```bash
source  /opt/conda/bin/activate
conda activate base
```

应该是由于没有将conda的自启动加入docker中的自动运作中，所以需要自行对conda 命令进行启动。

**solve update：**

直接在portainer的terminal中执行如下命令即可一劳永逸

```bash
 conda init
```

### apt-get 找不到包

```bash
# 首先执行apt-get的更新
 sudo apt-get update
```

### apt-get /var/lib/dpkg/lock-frontend

```bash
sudo rm /var/lib/dpkg/lock-frontend
sudo rm /var/lib/dpkg/lock
sudo rm /var/cache/apt/archives/lock
```

不知道哪个真正起了作用，都试试把

### chsh: PAM: Authentication failure

```sh
code /etc/passwd
# 里面可能有一些配置出现了问题，包括 bin/bash 漏了前面的斜杠这种
```

### NVCC command not found

在安装CUDA后还是找不到命令的话，可以去以下地址找一下对应的cuda文件是否存在

```bash
ls -l /usr/local/cuda
# 如果存在的话，将cuda的路径导入到bashrc中
```

```ini
export LD_LIBRARY_PATH=/usr/local/cuda/lib64:$LD_LIBRARY_PATH
export PATH=/usr/local/cuda/bin:$PATH
```

### GDBus.Error:

>GDBus.Error:org.freedesktop.DBus.Error.Spawn.ExecFailed: Failed to execute program org.freedesktop.PackageKit: Permission denied

其实就是两行命令来修复 dbus 文件的执行权限：

```bash
Sudo chown root:messagebus /usr/lib/dbus-1.0/dbus-daemon-launch-helper
Sudo chmod 4754 /usr/lib/dbus-1.0/dbus-daemon-launch-helper
```

————————————————
版权声明：本文为 CSDN 博主「Main(happy)」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接： https://blog.csdn.net/baidu_31628641/article/details/108586804

### Syntax error: "(" unexpected

该错误可能由于 Ubuntu 本身默认的 sh 指定的为 dash，而我们通常编写的脚本都是基于 Bash 的，因此这里介绍一下切换 sh 的命令

```bash
# 查看当前默认的sh
ls -l /bin/sh

# 切换为bash，在弹出的对话框选择no则切换为bash，yes则为dash
sudo dpkg-reconfigure dash 

```

切换完成后使用 sh 执行脚本应该不会出现上述问题了，验证的话也可以使用 bash 执行脚本。