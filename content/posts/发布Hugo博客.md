---
catalog: true
categories:
- 笔记系统和博客搭建
cover:
  image: /cover/cover3.jpeg
date: 2024-12-12 11:35:08
description: 通过 GithubPage 或者 Vercel, Netlify 发布 Hugo 博客的记录
lang: cn
mathjax: false
tags:
- Blog
- Hugo
- Github
- Vercel
- Netlify
thumbnail: /img/header_img/lml_bg1.jpg
title: 基于Github部署和发布Hugo博客
toc: true
---

## 托管平台选择

一些常见的托管平台 PaaS {{< sidenote >}} Platform as a Service [平台及服务](https://cloud.google.com/learn/what-is-paas?hl=zh-CN)，旨在使用户专注于应用代码开发 {{< /sidenote >}} 的免费情况如下；

|         Site         | Github Page | [Vercel](https://vercel.com/) | [Netfily](https://www.netlify.com/) | Coolify | [Zeabur](https://zeabur.com/) |
| :------------------: | ----------- | ----------------------------- | ----------------------------------- | ------- | ----------------------------- |
|        Free?         | Y           | Y                             | Y                                   | 自托管免费   | N（月费外无需额外）                    |
| Auto <br>Re-Deployed | Y           | Y                             | Y                                   | -       | -                             |

其实对于这些小型的静态网页的项目部署，大多都是免费的，整体部署的流程也是相对简单，选择一个顺眼，便于国内访问用即可，但是无论是哪个方案，都建议绑定一下自己的域名，一来是更便于记，二来也能便于国内访问。

> [!todo]+
> 了解一下 Coolify，是否是类似一个公网转发平台的方案，将特定端口的服务使用 Coolify 转发到公网上，然后可以绑定自己的域名，这样的话也不失为一个好东西，我之前的服务也就都能部署出去了；

最终选择的时候可以考虑以下都是谁在访问自己的博客，然后测一下对应地区平台访问的速度来做决定，国内的话 vercel 好像是被 DNS 污染了，如果要部署在 Vercel 上的的话，考虑在域名解析的地方更换为CF 的解析服务 {{< sidenote >}} 原因：[【多图预警】vercel部署及国内访问 | VuePress Theme Gungnir](https://www.zhongfw.online/posts/%E3%80%90%E5%A4%9A%E5%9B%BE%E9%A2%84%E8%AD%A6%E3%80%91vercel%E9%83%A8%E7%BD%B2%E5%8F%8A%E5%9B%BD%E5%86%85%E8%AE%BF%E9%97%AE.html)
 具体方案：[一招解决Vercel站点在国内无法访问的问题 | 程序猿DD](https://www.didispace.com/article/richang/20230917-vercel-china-dns.html) | [如何在国内访问vercel部署应用？我个人觉得vercel是做前端的大家都应该去了解并且掌握的一个非常方便的部署工具，能 - 掘金](https://juejin.cn/post/7301193497247727652)  ； {{< /sidenote >}}

## 直接使用 Public 文件夹进行部署


作为静态网页生成器，hugo 通过部署模式生成的 `public` 文件夹可以很轻松的在包括 [Github pages](https://docs.github.com/zh/pages/quickstart) 和 [Vercel](https://vercel.com/) 等第三方平台上的各个托管平台进行部署，部署起来相当简单，只需要将 Publish 文件夹推到github 上，后面的都比较简单了

- Github Page 直接在Setting-Pages 中设置选择源 Branch 即可，不需手动去写Github Action；
- Vercel, Netfily 也是直接绑定对应的Github 仓库的指定分支即可，framework 选择Other；

且均能根据 Publish 的变更对网页重新构建，这里就不再赘述。

## 基于源码直接部署

基于源码部署主要是考虑到同时将博文本身推送上去，一是使用 git 做版本管理，二是可以不再额外管理一个仓库；因此也可以采用此种方式；

但实际上如果要和本地的 Editor 如 Obsidian 做无缝集成的话，还是会需要一些额外的脚本去做处理，包括写完后自动更新 repo 和推送这些，后续如果笔者记得的话可能也会更新一下相应的脚本；

### 部署到 Github Page 

参考 [hugo官方教程](https://gohugo.io/hosting-and-deployment/hosting-on-github/)使用 Github Action 进行在线构建和实现 Github Page 的发布，修改其中自己需要进行构建的分支名称和部署命令等，然后直接 push 上去即可。

这里我对部署命令的修改部分如下：

```yaml
run: |
  hugo \
    --gc \
    --minify \
    --environment papermod \
    --baseURL "${{ steps.pages.outputs.base_url }}/"  
```

使用非 Master 分支进行构建可能会遇到以下的问题（build 成功，deploy 部分显示如下错误）

> [!Error]
>  Branch "x" is not allowed to deploy to github-pages due to environment protection rules.

解决方案：[Github community · Discussion #39054](https://github.com/orgs/community/discussions/39054) ，Repo 的 Setting 中找到 Environments 中的 github-pages 项中的 `Deployment branches and tags` 新增自己想要部署的分支即可；

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20241212011338.png)

>[!Error]
> Static 中的资源加载出现 404，导致界面表现不合预期的情况

此外，如果个人之前已经对其他的 GithubPage 绑定了域名（例如 http://aikenh.cn/ ），这样可能会导致由于网页部署在域名的子目录下( http://aikenh.cn/hugoblog/ )，导致一些资源的 url 绑定到域名上（资源被绑定到 http://aikenh.cn/ 中导致 404 ），无法获取到，这里的解决方式是，通过绑定子域名/二级域名 或者新的域名。

这里简单讲一下子域名的添加 {{< sidenote >}} [Github Docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-a-subdomain) {{< /sidenote >}} ，首先在 Github-Repo-Setting-Pages 中设置 Custom domain 如下

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20241212111721.png)

添加后去自己的域名控制台添加对应的 cname 子域名记录，然后稍后即可

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20241212111655.png)

添加子域名解析后可能会发现反而 CSS 等样式表加载不出来的问题（上一步的时候没问题），这时候就要考虑是不是 BaseURL 忘记更新了；记得修改项目配置（非 GithubAction 配置）中自己的 baseURL 再推上去使其重新构建，避免存在部分解析问题即可；

### 部署到其他 PaaS

>[!Error]
由于我们本地开发使用的 Git Submodule 中的地址通常是 git@github ,可能会导致第三方平台在拉取 Submodule 的时候出现一些权限错误导致拉取失败

因此当我们部署 Netlify 之前可以按照下面的方式更新 Submodule 为 http 链接，首先更改 `.gitmodules` 中子模块的URL

```ini
[submodule "themes/PaperMod"]
  path = themes/PaperMod
  url = https://github.com/AikenH/papermod-sidebar.git
```

然后执行下列命令来更新子模块的URL

```bash
git submodule sync
git submodule update --init --recursive
```

更新完以后将其推送到部署分支，例如 `netlify`

```bash
git checkout -b netlify
git add . 
git commit -m "[Conf] update submodule for third-party deploy"
git push origin netlify:netlify
```

#### 部署到 Netlify

**做完上述 Submodule 的准备之后**，在 Netlify 的dashboard 上导入Repo 进行发布：

- 导入仓库，选择好发布的分支

可以参考下列命令来设置自己的发布参数以及环境变量（hugo 版本）

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20241212142429.png)

环境变量的Key-Value 分别为：HUGO_VERSION 还有你本地的 hugo 版本，可以通过下列命令获取

```bash
hugo version
```

域名绑定：主要是参考官方指引，将需要的域名填入后，按照如下指引，在购买域名处添加CName 即可；

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20241212171616.png)

随后记得更新网站的 BaseURL 以便网站正常工作;


#### 部署到 Vercel

**做完上述 Submodule 的准备之后**，同样在 Vercel 处的设置也是比较简单的，导入指定的仓库后，将模版指定为Hugo，并修改部署配置如下：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20241212144416.png)

同样添加环境变量：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20241212144450.png)

但是 Vercel 中指定分支的方式相对较麻烦一些，在部署后，进入project 的dashboard 中，选择Setting

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20241212144613.png)

其中的 Git -> Production 跳转到指定页面去设置分支，设置完记得选择保存，同时下面有个环境变量也可以在设置一次。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20241212144707.png)

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20241212144752.png)

到此为止的话其他分支上的提交也会导致触发build，为此我们还需要进一步设置，在刚刚 Git 页面的最底下，选择 only build production 即可，这里参考 {{< sidenote >}} [oragekk](https://oragekk.me/tutorial/CI_CD/vercel-deploy.html#_2-%E6%AD%A5%E9%AA%A4) {{< /sidenote >}} ：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20241212173248.png)


后面再触发一次 Deploy 任务以后就可以看到分支切换到指定的分支即可

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20241212144841.png)

添加域名：待补充；

## TroubleShooting 问题解决

### 部署时 CSS 样式不显示问题

hugo 部署时遇到像 CSS 和 JS 或者图像等不显示的问题，可能有以下的两种原因：

一、假如图像, JS, CSS 都不显示，可以通过浏览器的开发者模式中的网络选项等去检查资源的对应地址是否是正确的，然后检查 hugo.yaml 中的 `base_url` 是否设置正确；

二、假如仅 CSS 不显示，只显示图像和文字，可以打开开发者模式中的控制台，看是否有如下报错：

>[!error]+
Failed to find a valid digest in the 'integrity' attribute for resource

如果是如下报错的话，可能是由于 minify 生成静态网页时，去掉了 html,js,css 等文件的部分空格和格式，来缩小文件的体积，但是修改后会导致文件校验失败，从而阻止加载，因此就会有两种解决方式：

**hugo 设置中关闭校验** {{< sidenote >}} [bj-Space](https://spartanmans.github.io/posts/hugobug/) {{< /sidenote >}} : 在 hugo.yaml 中添加，（使用toml 配置的情自行修改对应选项）

```yaml
params:
	assets:
		disableFingerprinting: true
```

**关闭 minify 选项** {{< sidenote >}} [3rd's blog](https://www.333rd.net/zh/posts/tech/hugo%E4%B8%A2%E5%A4%B1css%E5%AF%BC%E8%87%B4%E6%98%BE%E7%A4%BA%E5%BC%82%E5%B8%B8%E9%97%AE%E9%A2%98%E8%A7%A3%E5%86%B3/) {{< /sidenote >}}

还有一些其他的可能问题：http 和 https 混用

## FI