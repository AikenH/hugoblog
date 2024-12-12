---
catalog: true
categories:
- 搭建我的家庭服务器
cover:
  image: /cover/cover2.jpeg
date: 2024-07-15 13:05:22
lang: cn
mathjax: false
subtitle: null
tags:
- Docker
- NotDone
thumbnail: /img/header_img/lml_bg1.jpg
title: Docker_Container_Collection
toc: true
---

## Immich 备份

>[!important]+
> 备份 immich 的资料，除了做好本地的图片文件管理以外，还要对用户配置等信息做好备份，不然在后续恢复的时候无法将对应的图片绑定到账号上，会需要使用外部库或者重新上传的方式实现资料的还原，而且会导致大量重复照片等问题。

用户数据的备份方式可以参考 [Backup and Restore](https://immich.app/docs/administration/backup-and-restore)，使用数据库备份的策略，这是因为 immich 将文件的路径存储在数据库中，而不是一直扫描文件夹来更新；

对于备份的操作和文件路径等信息的保存和修改，建议好好读一下备份和恢复这篇文章。

备份命令：

```bash
docker exec -t immich_postgres pg_dumpall --clean --if-exists --username=postgres | gzip > old_immich/backup_database/dump.sql.gz
```

将备份命令添加到 crontab 的定时任务中，结合本地的 kopia 策略来实现定期备份

## 小雅常见问题解决方案

遇到问题可以参见：[小雅使用说明](https://www.kdocs.cn/l/cvEe3cv6dGkH)，基础的安装部署可以参考：[如何设置小雅的docker](https://xiaoyaliu.notion.site/xiaoya-docker-69404af849504fa5bcf9f2dd5ecaa75f#8e226c10e0b049a8ad3ff28a4e90a5a5)，小雅使用说明文档的更新会更频繁一点，而如何设置小雅的 docker 文档对于基础的部署则是更加详细一些。

- 定时更新：bash -c "$(curl http://docker.xiaoya.pro/update_data.sh )"
- 定时清理： https://github.com/DDS-Derek/xiaoya-alist/tree/master/xiaoyahelper

结合 Crontab 实现定时任务

## Linkstack 备份

和 immich 一样，要做好用户数据的备份，虽然不做好备份的话重新设置也不是太麻烦，但是毕竟还是一些没必要的工作量，最简单的可以导出链接到一个 json 文件做好保存即可。

## Alist 配置反代和离线下载

### aria2 pro

参考资料： [aria2 pro](https://p3terx.com/archives/docker-aria2-pro.html#google_vignette) | [Alist 离线下载](https://alist.nn.ci/zh/guide/advanced/offline-download.html) | [aria2-alist]( https://hub.docker.com/r/xhofe/alist-aria2 ) && [docker安装alist](https://alist.nn.ci/zh/guide/install/docker.html#%E5%BC%80%E5%8F%91%E7%89%88%E6%9C%AC) 如果需要使用 aria2，推荐使用这个镜像替代，直接预装了，免去了麻烦的配置，只需要再安装一个可视化界面即可，但是我个人感觉下来要将该下载速度提上去的还是稍显复杂。

### aria2 反代

参考资料：[Alist 反向代理](https://alist.nn.ci/zh/guide/install/reverse-proxy.html) | [Alist使用子目录进行反代](https://alist.nn.ci/zh/faq/howto.html#%E5%A6%82%E4%BD%95%E5%AF%B9%E5%AD%90%E7%9B%AE%E5%BD%95%E8%BF%9B%E8%A1%8C%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86) | [Alist配置文件说明](https://alist.nn.ci/zh/config/configuration.html#%E5%88%9D%E5%A7%8B%E9%85%8D%E7%BD%AE)

修改了 Site_url 子地址后，参考第一个链接中设置 nginx 的反代即可。