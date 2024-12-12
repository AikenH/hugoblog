---
calendar_date: 2023-11-06
catalog: true
categories:
- 搭建我的家庭服务器
cover:
  image: /cover/cover7.jpeg
date: 2023-11-06 20:49:16
lang: cn
mathjax: false
subtitle: null
tags:
- Ipv6
- nginx
thumbnail: /img/header_img/lml_bg1.jpg
title: 使用Ipv6部署服务02 Nginx和Https
toc: true
---

> 本系列主要介绍通过公网的 ipv6 访问局域网设备并部署自己的服务供公网访问；本篇是其中的第二篇，以腾讯云和 Nginx 为例，介绍如何将服务部署到 https://域名 。

需要以下的事前准备：

- 腾讯云/阿里云/Cloudflare 等随便一个地方购买一个自己的域名
- 公网 ipv4/ipv6 地址
- 本地部署一个服务以供测试

## Nginx(Docker) 安装

> 这里选择 Docker 来分离安装 Nginx 服务，Docker 部署的优势这里就不再赘述，这里建议使用 portainer 进行容器管理和运行状态查看。

首先创建存放 Nginx 配置文件和证书文件的目录，后续挂载给 Nginx Contrainer 使用：

```shell
mkdir -p /home/username/docker-file/nginx/conf.d
mkdir -p /home/username/docker-file/nginx/cert
```

> 配置文件存放到 `conf.d` 中，**各种 SSL 证书则存放到** `cert` 文件夹中；

接着部署 Nginx，这次先不挂载目录，将 Nginx 中一些默认配置拷贝出来，以供后续使用和修改：

```shell
# run会自己执行镜像拉取，pull可以不执行
# docker pull nginx
sudo docker run --name nginx -p 80:80 -d nginx 
```

将配置文件复制出来：

```shell
sudo docker cp nginx:/etc/nginx/conf.d/default.conf /home/username/docker-file/nginx/conf.d/default.conf
sudo docker cp nginx:/etc/nginx/nginx.conf /home/username/docker-file/nginx/conf.d/nginx.conf
sudo docker cp nginx:/etc/nginx/mime.types /home/username/docker-file/nginx/conf.d/mime.types
```

基于原始的配置文件挂载后查看 nginx 是否正常运行：

```shell
sudo docker rm -f nginx
sudo docker run --name nginx -p 80:80 -p 443:443 -v /home/username/docker-file/nginx/conf.d/nginx.conf:/etc/nginx/nginx.conf -v /home/username/docker-file/nginx/conf.d/default.conf:/etc/nginx/conf.d/default.conf -v /home/username/docker-file/nginx/conf.d/mime.types:/etc/nginx/mime.types -v /home/username/docker-file/nginx/cert:/etc/nginx/cert -d nginx
```

参考资料：[使用docker部署nginx并配置https - 逊老头 - 博客园 (cnblogs.com)](https://www.cnblogs.com/Aamir-Ye/p/16823739.html)



## 域名解析及申请免费 SSL 证书

> 账号应该是有50个 SSL 证书限额，但是注意每个二级域名都需要单独申请 SSL 证书，例如 aiken.Com 和 videos.Aiken.Com 需要分别申请 SSL 证书。

### 域名解析

注册完域名后到域名控制台，选择特定的域名进行解析：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20231107004308.png)

主机记录可以设置 `www` 等二级域名，@既是基础域名（没有二级域名），IPV6的话设置记录类型为 AAAA，记录值这里填入公网 ipv6 地址（基于安全性考虑 Ipv6 地址大多会动态变化，包括 windows 会提供临时 ipv6 地址等等，后续会使用 DDNS-go 动态更新该地址）

![1699289330400.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/1699289330400.png)

### SSL 证书申请

进入 SSL 证书管理界面 -> 申请免费证书 -> 提交证书申请 -> 

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20231107005919.png)

提交证书申请界面按照指引填写即可，域名部分记得二级域名也要单独申请即可。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20231107010036.png)

验证域名部分按照要求添加解析信息后点击验证域名即可，下载证书文件

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20231107011115.png)

耐心等待证书签发后，在我的证书界面下载证书，并将证书文件（解压后）放到挂载的 nginx 的 cert 目录中

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20231107011305.png)

## Nginx 配置部署服务

> 不同服务的 Nginx 配置在细节上会有一些差别，如果基础的设置不对，可以 Google 以下 Server+Nginx 查看是否有相关的文档说明，该部分简单介绍以下基本的一些写法。

为了最大化的利用域名和单机服务，通常而言我们希望仅仅使用一个域名（包括其二级域名和二级目录）能够分别部署单机上分布于多个端口的多个服务，这里简单分别介绍如何为不同服务部署二级域名和二级目录。

需要注意的是，不同服务在部署的时候有不同的要求，**有些服务涉及到一些 url 的跳转等问题，不支持二级目录的域名反代**，会导致功能异常，具体需要参见相关文档，这种时候就推荐使用二级域名进行服务代理。

同时配置过程中**需要注意反斜杠不要缺失，使用正确**，不同的反斜杠最终会导致转向地址的不一致，参考：[nginx 反向代理斜杠问题_clonetx的博客-CSDN博客](https://blog.csdn.net/clonetx/article/details/122305089)
### 证书配置部分

证书配置部分主要按照签发处的指引，会给一个基础的模板，比如腾讯云：[SSL 证书 Nginx 服务器 SSL 证书安装部署-证书安装-文档中心-腾讯云 (tencent.com)](https://cloud.tencent.com/document/product/400/35244?from_cn_redirect=1)

### 二级地址反代：

在挂载的 conf.d 目录下的 default.conf 中新增 server 如下：

```conf
server {
     listen 443 ssl ;
     listen [::]:443 ssl;
     expires 12h;
     server_name metisy.cool;
     ssl_certificate /etc/nginx/cert/<your domain>.crt;
     ssl_certificate_key /etc/nginx/cert/<your domain>.key;
     ssl_session_timeout 5m;
     ssl_prefer_server_ciphers on;
    
    # FIXME: for safe reason disable this ---below---.
     location /dashboard/ {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Range $http_range;
        proxy_set_header If-Range $http_if_range;
        proxy_redirect off;
        proxy_pass <url_local_server_address>:<port>/;
        # the max size of file to upload
     }
}
```

其中

- <url_local_server_address>填写本地的局域网 ip 例如192.168.11.23
- port 则填写该 ip 对应设备上提供服务的端口，例如1234
- ssl_certificate 和 ssl_certificate_key 填写 ssl 证书对应的 crt 和 key 文件的路径

### 二级域名反代

在挂载的 conf.D 目录下的 default.Conf 中新增 server 如下：

```conf
server {
	listen 443 ssl ; 
	listen [::]:443 ssl;
	server_name {prefix_your domain}; 
	client_max_body_size 50000M;
	ssl_certificate /etc/nginx/cert/{prefix_your domain}.crt; 
	ssl_certificate_key /etc/nginx/cert/{prefix_your domain}.key; 
	ssl_session_timeout 5m;
	ssl_prefer_server_ciphers on;
	
	location / {
		proxy_set_header Host $host;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Proto $scheme;
		proxy_set_header X-Forwarded-Protocol $scheme;
		proxy_set_header X-Forwarded-Host $http_host;
		proxy_buffering off;
		proxy_pass <url_local_server_address>:<port>/;
		#root /usr/share/nginx/html;
		#index  index.html index.htm;
	}
}
```

因为二级域名可以相当于一个新的域名，所以只需要把证书和 server_name 修改为新域名即可

### Http 跳转Https

在挂载的 conf.D 目录下的 default.Conf 中修改最上面的 server 为如下：

```conf
server {
    listen       80 default_server;
    listen  [::]:80 default_server;
    server_name  _;
    # rewrite ^(.*)$ https://metisy.cool:443/$1 permanent;
	return       301 https://$host$request_uri;
    #access_log  /var/log/nginx/host.access.log  main;

    # location / {
    #     root   /usr/share/nginx/html;
    #     index  index.html index.htm;
    # }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

使用 return(新) 或者 rewrite(旧) 命令，将针对该域名的 http 请求都重定向到 https 中。

### Alist 的反向代理

Alist 的反向代理参考如下文章：[反向代理 | AList文档 (nn.ci)](https://alist.nn.ci/zh/guide/install/reverse-proxy.html)，如果不修改配置的话需要将其挂载在/根路径下，否则会导致出错，二级路径会导致无法正常运行，如果要挂载到子级目录/alist/下需要按照该文修改配置文件：[怎么做 | AList文档 (nn.ci)](https://alist.nn.ci/zh/faq/howto.html#%E5%A6%82%E4%BD%95%E5%AF%B9%E5%AD%90%E7%9B%AE%E5%BD%95%E8%BF%9B%E8%A1%8C%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86)

此外，挂载完成后会发现由于 Nginx 缓存，会导致卡在登录界面无法进到主页面的问题，该问题可以通过在配置中取消缓存修复，修改 nginx 配置，添加该行：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20231107133129.png)


### Immich 的反向代理

为了安全性和诸多其他考虑，不支持二级目录，建议使用二级域名挂载到根目录，具体的配置参考：

-  [Reverse Proxy | Immich](https://immich.app/docs/administration/reverse-proxy)

### xiaoya Alist 的反向代理

这里提一嘴，xiaoya 的 alist 的挂载目前也仅支持挂载到根路径，因此使用一个二级域名，个人暂时没找到如何挂载到子路径下，欢迎指正，万分感谢。

而如果是 xiaoya 的 emby 的反向代理，则需要手动重新映射一下 strm 资源库目录下的播放直链，将其改为挂载小雅的公网地址，可以使用以下脚本批量修改：

```shell
find /home/user-dockerfile-dir/emby_res/xiaoya -name "*.strm" -exec sed \-i "s#http://{locahost}:{port}#https://{domain}/#g; s# #%20#g;     s#|#%7C#g" {} \;
```

这里的{localhost} {port} {domain}请自行修改成自己的对应地址，这样挂载出来的 emby 就可以在公网进行播放了。

### 重启 Nginx

>完成上述所有对应的配置后，启动 Nginx，即可实现 https 访问对应的网站了。

```shell
# 可以删除当前contrainer重新部署
docker rm -f nginx
sudo docker run --name nginx -p 80:80 -p 443:443 -v /home/username/docker-file/nginx/conf.d/nginx.conf:/etc/nginx/nginx.conf -v /home/username/docker-file/nginx/conf.d/default.conf:/etc/nginx/conf.d/default.conf -v /home/username/docker-file/nginx/conf.d/mime.types:/etc/nginx/mime.types -v /home/username/docker-file/nginx/cert:/etc/nginx/cert -d nginx
```

但是实际没必要那么麻烦，直接执行：

```shell
docker restart nginx
```

即可，观察容器是否正常运行，如果运行失败查看 log 看是否哪里配置出错。

参考资料：

- [Nginx通过二级目录（路径）映射不同的反向代理，规避IP+端口访问 | 张戈博客 (zhang.ge)](https://zhang.ge/5054.html)
- [Docker Nginx 配置安装 SSL 证书（支持 Https 访问） - 犬小哈教程 (quanxiaoha.com)](https://www.quanxiaoha.com/docker/docker-nginx-install-ssl.html)
- [基于网盘挂载的emby服务端并实现直链播放 - syqman折腾笔记](https://syq.pub/archives/27/?scroll=comment-4) 基于小雅的方式的话无需参考该文，仅需将 address 文档替换成公网连接即可。
- [小雅Emby反代](https://note.youdao.com/ynoteshare/index.html?id=34790ec69ccaf38687664e96e0d8e46d&type=note&_time=1699094094800)
- [nginx反向代理关闭缓存 (baidu.com)](https://baijiahao.baidu.com/s?id=1630860688840962591)
- [Reverse proxy using NGINX - Community Guides - Home Assistant Community (home-assistant.io)](https://community.home-assistant.io/t/reverse-proxy-using-nginx/196954)

## TroubleShooting 问题解决

> [!bug]+
> 访问域名 Nginx 显示 504 超时 error，直接使用局域网 ip 访问各个服务并无超时现象，各个服务运行正常，Nginx 使用默认页面也能正常访问。

怀疑是由于 Docker、Windows、WSL2 更新之后网络的问题，导致 wsl2 可以访问各个局域网，但是 nginx 的 container 无法对各个局域网上的服务进行访问，因此采用 windows 宿主机直接安装 nginx 来避免此类网络问题，将 Nginx 添加到启动服务中，并将 WSL2 中的 nginx 配置迁移过来即可。

> WIN+R shell:starup 可打开启动文件夹，建立 nginx 的快捷方式后就可以在任务管理器中设置为启动项了。

## Fi

本章就到这边，下一章节讲解由于 Ipv6 的动态特性，需要部署动态域名解析服务，这里以 ddns-go 为例，自动更新对应域名解析中的主机记录值。