---
calendar_date: 2023-04-30
catalog: true
categories:
- 搭建我的家庭服务器
cover:
  image: /cover/cover19.jpeg
date: 2023-04-30 22:42:58
lang: cn
mathjax: false
subtitle: intro how we use potplayer with alist,
tags:
- Docker
- Windows
- NotDone
thumbnail: /img/header_img/lml_bg19.jpg
title: Windows App01 Potplayer & Alist
toc: true
---

> 本篇主要介绍一下播放器 PotPlayer 的设置以及结合 Alist&小雅 alist 的使用，这样就可以直接在播放器访问本地网盘上的内容，便于使用和观看。

## Alist Deploy

Alist 作为一个网盘管理中心，可以将各大网盘中的资源进行统一管理，同时支持视频的 webdav 播放，这里推荐的安装方式是使用 Docker-Compose 进行安装，根据自己的情况来选择对应的挂载和安装目录。

由于官方的文档已经事无巨细，这里就不在赘述如何安装和配置 alist 的各个网盘挂载，详情参见：[Home | AList Docs (nn.ci)](https://alist.nn.ci/)

安装完并**启动 Alist 服务**即可，记住自己的**端口**和设置的**账号密码**。

### Aria2离线下载支持

该部分介绍如何通过 docker 为 Alist 添加 Aria2 作为离线下载服务，以及一些常见的问题解决方法。

参考资料：[aria2-pro](https://p3terx.com/archives/docker-aria2-pro.html) |  [aira2-pro-github]( https://github.com/P3TERX/Aria2-Pro-Docker/blob/master/docker-compose.yml ) |  [aria2认证失败](https://yiwangmeng.com/aria2-status-page-to-prompt-the-solution-of) 

这里介绍使用 docker-compose 安装 aria2的方法，并将 docker 版本的 aria2和 alist 结合起来使用，在基于 docker 安装之前，我们先准备几个文件夹：

```bash
cd <your-path-2-aria2> && mkdir aria2-config && chmod 777 aria2-config
mkdir aria2-downloads && chmod 777 aria2-downloads
```

其中 downloads 目录是我们用来下载文件的目录，我们也可以使用挂载的目录或者共享的目录来存储下载的文件；然后我们准备一下 alist 中用于离线下载的目录，**该目录需要在 alist 的 docker 和 aria2的 docker 中都将该 volume 挂载到同一个地方**。

本文将 aria2的队名目录挂载到 alist 的对应目录中，对应的 alist 的 compose 文件有

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230709161919.png)

而 aria2的 compose 文件则有：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230709161956.png)

再将该目录的权限改成777，`chmod 777 <this-dir>` 之后即可再 alist 中离线下载成功，而且该下载文件会在指定的网盘中上传，当上传完成时会删除临时文件，不占用本地磁盘空间。

完整的 Compose 文件可以参考 [Aria2-Pro-Docker/docker-compose.yml at master · P3TERX/Aria2-Pro-Docker · GitHub](https://github.com/P3TERX/Aria2-Pro-Docker/blob/master/docker-compose.yml) 官方的配置进行安装，我个人的 compose 文件则会上传到[AikenH/aikenh-DockerComposeYML (github.com)](https://github.com/AikenH/aikenh-DockerComposeYML)中。

**Aria2Ng 界面认证失败**的问题，是因为我们再 compose 中设置了密码之后，要在该界面的设置中设置密码后才能正常认证。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230709162444.png)

密码需要到如下地方设置：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230709162537.png)

设置完成后应该就不会有认证失败的提示了。

**alist 设置 Aria2失败**，由于使用的 docker 部署的 aria2，这里不能使用 localhost，要使用对应的 ip 来设置该服务，如下图所示

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230709162724.png)

完成这些设置后应该就可以正常使用了，但是由于现在都是网盘场景更多，所以离线下载的可能使用场景也有限，而且通过测试发现，如果完全装在树莓派上的话，可能会对系统的性能造成一定的负担。

## Xiaoya Deploy

>Xiaoya 是基于 Alist 做改版的个人资源站，里面涵盖了大量的影视资源，并在不断的更新，通过在本地挂载 xiaoya 我们也可以用来通过 webdav 在播放器中直接选择视频进行播放，大多数情况下都免去了找资源的痛苦。

官方网站：[主页 | 小雅的分类 Alist (xiaoya.pro)](http://alist.xiaoya.pro/)

拥有了 Docker 环境后，就可以基于 xiaoya 提供的脚本实现一键拉取镜像和启动 Docker，默认的端口是 5678，安装指令如下：

```bash
sudo bash -c "$(curl -s http://docker.xiaoya.pro/update_new.sh)"
```

安装过程中会需要填入如下内容：token、open_token、转存目录的 folder id，具体和后续更新参考[配置页](https://xiaoyaliu.notion.site/xiaoya-docker-69404af849504fa5bcf9f2dd5ecaa75f)，（跟随安装引导界面进行安装即可。）


|                      | 对应文件                                | 获取方式                                                                                                                                                   |     |
| -------------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| token                | /etc/xiaoya/mytoken.Txt                 | [link 1](https://aliyuntoken.vercel.app/) [link 2](https://alist.nn.ci/zh/guide/drivers/aliyundrive.html)                                                  |     |
| open token           | /etc/xiaoya/myopentoken.Txt             | https://alist.nn.ci/zh/guide/drivers/aliyundrive_open.html                                                                                                 |     |
| 转存目录的 folder id | /etc/xiaoya/temp_transfer_folder_id.Txt | 在阿里网盘网页版上创建一个转存目录，比如“temp”，然后点击目录，浏览器显示的 URL https://www.aliyundrive.com/drive/folder/640xxxxxxxxxxxxxxca8a 最后一串就是 |     |

安装完成后确保服务启动正常，该部分的准备即结束，但是该端口我们还是要记住，因为在大量资源中搜索的时候还是得**借助网页版中的搜索功能**。

安装完成后后续使用 Potplayer 挂载 Dav 时，账号密码为：

```txt
guest
guest_Api789
```

## PotPlayer 设置

> 支持 WebDav 的免费视频播放器，同时也支持音乐播放，录频截图等功能，虽然支持 Iptv 源，但是实际上很多频道都比较卡，所以不是很推荐（也可能是我没找到好用的源，如果有的话感谢分享。）

参考资料：[Potplayer全面设置教程](https://zhuanlan.zhihu.com/p/163458215)，最后配置完的设置和对应的皮肤文件我会到处到我的 dotfile 仓库。

### 基础设置

具体的设置和皮肤下载路径如下：

- **下载**：[Search 'potplayer' on DeviantArt](https://www.deviantart.com/search?q=potplayer)
- **基本** -> 皮肤/配色 -> 打开皮肤文件夹 -> 进阶皮肤 -> 启用 Direct3D 渲染。
- **播放** -> 打开多线程，旋转，标题，记忆位置，隐蔽指针，进度条显示缩略图，以及设置是否循环播放。
	- 时间跨度 -> 设置一下方向键快进的时间
	- 列表 -> 显示缩略图和两行信息，按文件路径排序并全部对齐
	- 宽高比 -> 缩放时保持宽高比
- **字幕** -> 画面底部、自动重载被修改的字幕
	- 可以通过播放时右键 -> 实时字幕翻译 -> 使用
	- 详细的设置在：选项 -> 拓展功能 -> 实时字母翻译
- 滤镜相关的我这里不懂就不设置
- **声音** -> 最大音量调整到 200

效果展示如下：

{{< galleries >}} 
{{<gallery src="https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230501003002.png" >}}
{{<gallery src="https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230501003054.png" >}}
{{<gallery src="https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230501003504.png" >}}
{{< /galleries >}}


### Webdav 挂载 Alist 和小雅

播放列表中新建专辑，按照下图的方式进行填写，其中端口就是你 Alist 或者小雅在本地部署的端口，IP 如果是本地部署的话就按下列的方式填写，否则就填写提供的 IP，用户名和密码使用自己设置的用户密码即可（小雅的话可以参考默认账号和密码）

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230501003740.png)

至此，PotPlayer 和对应的 Alist 列表就挂载成功了，可以畅爽实现本地看剧了。

### Iptv 列表

虽然不推荐使用 Iptv 因为大多数源是真的卡，看起来要么卡，要么不够高清，要么找一个频道找半天，确实是不是很想费心折腾这块，也不建议，但是还是简单介绍。

使用的话就将下载的 iptv 源文件拖入播放列表即可，下面有几个 iptv 源的地址：

- [iptv-org/iptv: Collection of publicly available IPTV channels from all over the world (github.com)](https://github.com/iptv-org/iptv)
- [imDazui/Tvlist-awesome-m3u-m3u8: 直播源相关资源汇总](https://github.com/imDazui/Tvlist-awesome-m3u-m3u8)
- [每天更新：中国电视IPTV直播源.m3u](https://blog.xn--9kq250g.fun/index.php/iptv%E7%9B%B4%E6%92%AD%E6%BA%90/%E6%AF%8F%E5%A4%A9%E6%9B%B4%E6%96%B0%EF%BC%9A%E4%B8%AD%E5%9B%BD%E7%94%B5%E8%A7%86iptv%E7%9B%B4%E6%92%AD%E6%BA%90-m3u-1080p%E5%85%8D%E8%B4%B9%E9%AB%98%E6%B8%85%E7%89%88-2023%E5%B9%B41%E6%9C%881/)
- [fanmingming/live: ✯ 一个国内可直连的直播源分享项目 ✯ 🔕 永久免费 直连访问 完整开源 不含广告 完善的台标 直播源支持IPv4/IPv6双栈访问 🔕 (github.com)](https://github.com/fanmingming/live)
- [电视直播源搜索｜最新东森多线路直播源分享 (foodieguide.com)](https://www.foodieguide.com/iptvsearch/)


使用前可以使用 iptv-checker 来检查源的可用性，然后过滤掉一些不可用的源。