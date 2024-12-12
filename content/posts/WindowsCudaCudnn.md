---
calendar_date: 2023-04-24
catalog: true
categories:
- Windows
cover:
  image: /cover/cover17.jpeg
date: 2023-04-24 09:50:01
lang: cn
mathjax: false
subtitle: null
tags:
- Windows
- WSL2
thumbnail: /img/header_img/lml_bg17.jpg
title: Windows Configuration05 CUDA & Cudnn
toc: true
---

> 在 Windows 和 WSL2 中安装 Cuda 和 Cudnn ，是配置 GPU 开发环境中重要的一步，其支撑了 AI 模型进行 Training 和 Interface 。本篇介绍安装 CUDA 和 Cudnn 的步骤和一些踩过的坑。

参考资料如下：[版本查看](https://blog.csdn.net/halou10200912/article/details/106048719) | [Win 安装 Cuda 和cuDNN](https://zhuanlan.zhihu.com/p/99880204) | [WSL 2 安装 CUDA 和cuDNN](https://blog.csdn.net/Apple_Coco/article/details/129293019)

## Win 11 安装 CUDA 和 cuDNN

### CUDA

首先在 Nvidia 的控制面板：**帮助-系统信息**的如下位置，查看 GPU 最大支持的 CUDA 版本：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230424130608.png)

也可以使用 Nvidia-smi 命令在 Powershell 或者 CMD 中查看:

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230424130700.png)

确定了版本之后到 [Nvidia CUDA下载页面](https://developer.nvidia.com/cuda-downloads) 下载指定版本的 CUDA 进行安装（根据安装指引进行）即可，安装位置等默认即可，其中有一些安装选项即是 Nvidia GeForce Experience 安装的内容。

安装完成后在 CMD 或者 PowerShell 确认是否安装完成（需要重启终端）：

```powershell
nvcc -V
```

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230424131341.png)



显示如上信息可看到指定的版本已经安装成功，然后我们可以在 CMD 中执行如下命令来获取安装地址/设置环境变量：

```powershell
set cuda
```

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230424131612.png)

完成这些后我们就可以开始安装 CuDNN 了，CuDNN 的安装需要我们记住 Cuda 的安装地址。

### cuDNN

在 Nvidia 官网注册账号，并在 [cuDNN 下载界面](https://developer.nvidia.com/rdp/cudnn-download)下载对应版本的 Package 后，讲 Package 中各个目录下的内容放到 CUDA 文件夹的对应目录下即可。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230424132305.png)

即 `mv cuDNN/lib/* CUDA/lib/*` ...；拷贝完成后可以执行 CUDA 中自带的校验工具查看安装情况：

- /cuda/extras/demo_suite/deviceQuery.exe
- /cuda/extras/demo_suite/bandwidthTest.exe

可以看到验证详细结果和是否通过。

## WSL 2 配置 CUDA 和 cuDNN

建议可以先看看： [NVIDIA GPU Accelerated Computing on WSL 2](https://docs.nvidia.com/cuda/wsl-user-guide/index.html#cuda-support-for-wsl-2)

新版的 WSL 2 对于 GPU 的支持已经相当的友善，能够直接调用 Windows 的 GPU，但是在使用过程前还是需要对环境进行一定的配置。具体分为以下的两步：

1. 安装 cuda-toolkit：注意不能重复安装 CUDA 驱动，避免和 Windows 系统的 CUDA 驱动产生冲突
2. 安装 cuDNN
3. （非必须）设置环境变量

以下以 Ubuntu WSL 2 为例，介绍以下具体的安装过程。

### CUDA-toolkit on WSL 2

通过 [Nvidia 的官方下载页面](https://developer.nvidia.com/cuda-downloads?target_os=Linux&target_arch=x86_64&Distribution=WSL-Ubuntu&target_version=2.0)选择 WSL-Ubuntu 即可找到对应的安装工具，我们这里选择 runfile 的方式进行，按照官方给出的安装指令进行，即：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230424133107.png)

```bash
wget https://developer.download.nvidia.com/compute/cuda/12.1.1/local_installers/cuda_12.1.1_530.30.02_linux.run

sudo sh cuda_12.1.1_530.30.02_linux.run
```

下载对应的 run 包后执行安装即可。

### cuDNN on WSL 2

在 Ubuntu 上安装 cuDNN 实际上除了网上资料很多的下载包进行安装，直接用以下的方式进行安装即可。

```bash
sudo apt install nvidia-cudnn
```

安装后执行 nvcc --version 验证版本。

### Env

>这一块的设置好像目前已经是不需要的，首先可以尝试不配置这一块内容。以下我会给出我这边的配置

环境配置这块好像并不需要执行，如果还是报错的话，可以按照以下的方式来配置 zshrc 或者 bashrc。

```bash
export CPATH=/usr/local/cuda/include:$CPATH
export LD_LIBRARY_PATH=/usr/local/cuda/lib64/:$LD_LIBRARY_PATH
export PATH=/usr/local/cuda/bin:$PATH
export CUDA_ROOT=/usr/local/cuda
```

or

```bash
export LD_LIBRARY_PATH=/usr/local/cuda-12.1/lib64/{LD_LIBRARY_PATH:+:{LD_LIBRARY_PATH}}
```

这里顺便给出一个路径 /usr/lib/wsl/lib 中会有相关的 so 文件的路径，应该是和主机互通的地方。

## 报错分析

Could not load library libcudnn_cnn_infer.so.8. Error: libcuda.so: cannot open shared object file: N
> 没有安装或者配置 cudnn