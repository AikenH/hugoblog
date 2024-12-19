---
calendar_date: 2023-12-29
catalog: true
categories:
- 搭建我的家庭服务器
cover:
  image: /cover/cover21.jpeg
date: 2023-12-29 08:04:06
description: null
lang: cn
mathjax: false
tags:
- Backup
thumbnail: /img/header_img/lml_bg1.jpg
title: 家庭服务器的备份工具选择
toc: true
---

> [!summary]+
> 在搭建了 Immich 服务之后，考虑到数据本身的重要性，又对硬盘本身的寿命和各种数据安全的场景有所顾虑，对加密备份的需求就浮出水面了，希望能有一个备份的预案来对抗各种数据风险，因此有本篇文章，对各种备份工具做简单调研和选择。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20231229113137.png)

## 👾Intro 调研对象介绍

👍出场选手介绍，节选来自以下网站的备份方案：[awesome-sysadmin-backup](https://github.com/awesome-foss/awesome-sysadmin#backups)

- [kopia](https://kopia.io/) 
- [urBackUp](https://www.urbackup.org/)
- [restic](https://restic.net/)
- [rclone](https://rclone.org/)
- [duplicity](https://duplicity.gitlab.io/)
- [Duplicati](https://www.duplicati.com/)
- [Duplicacy](https://duplicacy.com/)
- 脚本实现简单的备份和上传：Crontab+自动 tar 加密+Webdav 接口进行上传


为了备份大量包含隐私的图像信息，这里最基础的需求有以下几点：**加密**，**支持云端存储**服务/Webdav，**增量备份**，**免费**；

额外如果能够支持以下的需求则额外加分：**压缩**，**去重**，**平台一致性**，**用户界面友好**（备份状态检查等）

## 🏓Compare 特性对比

| Name      | PSWD | Zip | Webdav | Add | Type | ui  | Consis | free | rate       |
| --------- | ---- | --- | ------ | --- | ---- | --- | ------ | ---- | ---------- |
| kopia     | y    | y   | y      | y   | Full | y   | y      | y    | 🔥🔥🔥🔥🔥 |
| urbackup  | y    | n   | n      | y   | C/S  | y   | y      | y    | 🔥         |
| restic    | y    | n   | r/o    | y   | CLI  | n   | y      | y    | 🔥         |
| duplicity | y    | n   | y      | y   | CLI  | n   | n      | y    | 🔥🔥       |
| duplicati | y    | n   | y      | y   | Full | y   | n      | y    | 🔥🔥🔥🔥   |
| duplicacy | y    | y   | y      | y   | Full | y-  | y      | y-   | 🔥🔥🔥🔥🔥 |
 


> C/S: Client & Server 的模式，在需要备份的机器上安装客户端，在存储备份的机器上安装服务端，通常用于 NAS 存储各个终端数据的场景，如**urbackup**。

PSWD: Password 支持加密访问数据或者服务，保证数据的安全。
Add: Incremental 额外支持快速增量备份，能够识别出新增文件。
Consis: Consistent 备份数据一致性，多个平台保持一致的备份数据格式，以及数据恢复能力。
Webdav：是否支持云端存储服务？
- y 表示支持 Aliyun 或者 webdav 实现对国内网盘的支持。
- o 表示支持 OSS 等对象存储服务。
- n 表示只支持本地存储，可能需要通过脚本手动和云端存储进行交互（如果可以表示备份状态也可以）
- r 表示支持 rclone 挂载的云端对象，rclone+alist 可以支持国内硬盘服务。

>[!udpate]+
>update：I really need to find this before I Wrote This.
>https://wiki.archlinux.org/title/Synchronization_and_backup_programs#Chunk-based_increments

### 🍴Features 具体特性

**Kopia**: 用户界面友好，支持压缩，支持快照映射到本地，支持定时备份，支持 webdav，支持各种备份策略，支持网页版管理，支持加密，支持同时备份到多个目的地，高效，使用简单。

参考资料：[Kopia: 全平台开源备份软件新秀](https://zhuanlan.zhihu.com/p/541234817)

**urbackup**: 可以对整个系统进行完整的定时备份，主要用于重要的服务器的容灾备份，也可灵活备份某个文件夹，但对当前的需求来说并不是最合适的。

**restic**: 命令行备份工具，支持备份到 OSS 或者 RClone 挂载的各种云端对象，通过快照的存储可以实现不同时间备份**单文件**的恢复，支持增量备份和完全备份，支持备份特定文件夹，支持 Docker 安装，目前看来可以通过 Rclone 和 Alist 的组合来彻底满足我们的需求，可能需要本地环境作中转。

参考资料：[restic操作指令详解](https://www.escapelife.site/posts/912084a4.html), [restic介绍](https://juejin.cn/post/7014803100074672135), [restic简介](https://zhuanlan.zhihu.com/p/381151432) 

**duplicity**: 命令行备份工具，优势在于直接支持 Webdav，极其高效的增量备份，支持单个文件的恢复，支持指定日期的恢复，可使用 GPG 秘钥进行加密解密；缺点在于目前仅支持 Linux 环境，可能需要编写脚本来支持定时运行，可以基于 WSL2 实现对 Windows 本机的备份，但是带宽和 CPU 等要素相对受限，无法完全发挥性能。

>duplicity 有一个严重的缺陷在于其增量备份方法，每一次备份都需要用户选择是否全量备份或者增量备份，并且其设计决定了在一个备份了很多次的仓库中删除任何一个历史的备份变得不可能。

参考资料：[Linux全新的备份神器Duplicity](https://www.vinchin.com/blog/vinchin-technique-share-details.html?id=18434) 

**duplicati**：带 UI 的备份工具，支持备份到 Webdav，也支持命令行工具，支持 docker，支持增量备份，操作简单，支持计划备份和清除，支持 NGINX 部署访问，单文件恢复可能不支持，但支持选中单文件夹进行恢复，完美符合需求。

参考资料：[Duplicity备份到Alist](https://nasdaddy.com/how-to-install-duplicati-on-your-nas/)，[Duplicity备份到COS](https://zhuanlan.zhihu.com/p/588678612)，[Docker搭建Duplicati](https://blognas.hwb0307.com/linux/docker/471)

**duplicacy**：CLI 免费，付费提供网页管理界面，支持 webdav，增量备份，支持加密备份，使用 Lock-Free(参考资料 1) 技术来节省空间，不会无法删除快照，支持多个客户端备份到同一个云端存储，支持 docker 安装（可能需要[许可证](https://duplicacy.com/buy.html)）

参考资料：[Duplicacy 增量备份工具使用](https://einverne.github.io/post/2021/06/duplicacy-backup-tool-usage.html)，[Duplicacy Docker安装](https://blog.csdn.net/wbsu2004/article/details/129459030)，[Duplicacy CLI使用](https://www.moewah.com/archives/5292.html)

>[!note]+
> 如果是存储各时段快照的版本，记得使用指定的命令删除过时的快照。

### ⛏️Pick 最终选择

<center>KOPIA</center>


- duplicati 在[查阅资料](https://www.reddit.com/r/selfhosted/comments/upbp99/kopia_vs_duplicati/)后提前出局，出现的 bug 等相对会多些
- duplicacy 看起来十分美好，但是网页管理功能需要付费使用，虽然可以接受，但是当 kopia 有更好选择的时候就暂时被搁置了。

如果后续使用中 kopia 没有 lock-free 的优势或者说在多次备份后需要保存大量快照且无法删除的硬伤，则不会再更新，如果发现 kopia 有所缺陷，则更新该部分内容。

参考资料：[kopia-duplicati-duplicacy-vorta](https://forum.duplicati.com/t/duplicati-vs-duplicacy-vs-kopia-vs-vorta/14493)
## 🦶脚本组成分析

如果要做一个功能完备，但是简单的自用备份服务，个人认为应该包含以下的内容：

- 定时任务：对定时脚本进行更改，执行和启用定时任务
- 文件加密：可以使用简单的打包命令进行加密打包，
- 文件传输：将备份文件传输至指定地方，包括 webdav 的上传，
- **增量备份**：无论是快照或者版本管理的思路，能够识别出新增内容并仅针对新增内容进行传输

上述任务中无论是定时，还是文件压缩、传输、都有较为简单的基础方式，里面最复杂的且我认为是比较重要的则恰恰是增量备份这一点，这一点对备份的效率和空间占用都是十分关键的，不会使得每次备份都需要较多时间和性能成本。

- [ ] 这里有时间希望去学习一下上述开源项目，学习如何建立一个快照系统。

## 🌻FI