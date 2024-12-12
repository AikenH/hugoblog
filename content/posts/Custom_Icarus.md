---
calendar_date: 2023-03-11
catalog: true
categories:
- 笔记系统和博客搭建
cover:
  image: /cover/cover15.jpeg
date: 2023-03-11 23:46:37
lang: cn
mathjax: false
subtitle: 基于Icarus的主题的个人配置
tags:
- Blog
- Hexo
thumbnail: /img/header_img/lml_bg15.jpg
title: 折腾 Hexo 的 Icarus 主题
toc: true
---

本文的博客页面基于 [Hexo]([Hexo](https://hexo.io/zh-cn/))+[Icarus](https://ppoffice.github.io/) 主题搭建，在使用过程中对该主题做了一些简单的配置，以适应自己的需求。这里介绍一下自己粗浅的方案。

> 十分推荐 Icarus 这个主题，功能支持十分全面而且作者的文档也较为详实，推荐大家去了解。

## 拓宽显示页面区域

`include/style/base.styl`  中定义了各种基本页面尺寸：

```js
$gap ?= 64px
$tablet ?= 769px
$desktop ?= 1088px
$widescreen ?= 1280px
$fullhd ?= 1472px
```

可以在 `include/style/responsive.styl`  中定义 2 栏 3 栏情况下所使用的宽度：

```js
+widescreen()
    .is-3-column .container
        max-width: $fullhd- $gap
        width: $fullhd - $gap

    .is-1-column .container, .is-2-column .container
        max-width: $widescreen - 2 * $gap
        width: $widescreen- 2 * $gap
```


## 移动端优化

该主题在移动端表现的时候，两侧的 widget 会自动挪到下方，这样每个文章看完的时候体验很差，所以我希望在移动端的时候能隐藏这些 widget。

`source/js/main.js` 中仿照下面的格式添加对应 widget 的 type 即可：

```js
$('div.container div.card[data-type=categories]').addClass('is-hidden-mobile');
```

但是该代码会有问题，就是相应 disable 的 widget 对应的单独界面在移动端会失效。

## 自定义 404 界面

在 hexo 的默认配置（非 icarus 的配置）`_config.yml` 中跳过对 404.html 的渲染，直接使用该静态 html 页面进行页面的配置。

```yml
skil_render:
	- 404.html
```

404 静态页面可以使用腾讯公益界面，或者网上找一个[模版](https://freefrontend.com/html-css-404-page-templates/)使用，效果如下：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20230312150155.png)

## 夜间模式（切换 variant）

夜间模式的实现主要参考[]()，网上大多用的都是这个方案，但是个人非常喜欢 cyberpunk 的变体，所以希望实现夜间模式的时候切换成 cyberpunk 的 variant ，本文基于其实现做了一些改动，基本实现了该功能，但是目前而言还存在一些问题。

> 本人不是很懂前端，因此这个 dom 加载完成后重新加载 css 过程中，导致的页面畸变问题目前不知道该如何解决，望前端大大给点指导

### 添加主题切换按钮

在 `layout/common/navbar.jsx` 中添加夜间模式切换按钮，绑定 `night-nav` 事件，

```jsx
//{showSearch ? <a class="navbar-item search" title={searchTitle} href="javascript:;">
//	<i class="fas fa-search"></i>
//</a> : null}

<a class="navbar-item night" id="night-nav" title="Night Mode" href="javascript:;">
	<i class="fas fa-lightbulb" id="night-icon"></i>
</a>
```

### 预先载入两个 css 文件

在 `layout/common/head.jsx` 中预先载入可选的第二个 stylesheet（css 文件）

```jsx
{/* <link rel="stylesheet" href={url_for('/css/' + variant + '.css')} /> */}

<link rel="stylesheet" href={url_for('/css/' + 'default' + '.css')} title='default'/>
<link rel="alternate stylesheet" href={url_for('/css/' + 'cyberpunk' + '.css') } title='cyberpunk'/>
```

### 编写 js 实现 css 跳转

本部分主要来自 [imagegoo](https://www.imaegoo.com/) 的夜间模式实现，修改了一下其调用的文件和变体变量，在 `source/js/night.js` 中实现。

```js
(function () {
    /**
     * Icarus 夜间模式 by iMaeGoo
     * https://www.imaegoo.com/
        */
      var isNight = localStorage.getItem('default');
      var nightNav;
  
    function applyNight(value) {
        $(window).trigger('resize');
        if (value.toString() === 'true') {
            // document.body.classList.remove('light');
            // document.body.classList.add('night');
            setStyleSheet('cyberpunk');
            
        } else {
            // document.body.classList.remove('night');
            // document.body.classList.add('light');
            setStyleSheet('default');
        }
        
    }
  
    function findNightNav() {
        nightNav = document.getElementById('night-nav');
        if (!nightNav) {
            setTimeout(findNightNav, 100);
        } else {
            nightNav.addEventListener('click', switchNight);
        }
    }
  
    function switchNight() {
        location.reload();
        isNight = isNight ? isNight.toString() !== 'true' : true;
        applyNight(isNight);
        localStorage.setItem('default', isNight);
        
    }

    function setStyleSheet(title){
        var link_list = document.getElementsByTagName("link");
        if (link_list){
            for (var i=0; i<link_list.length; i++){
                if (link_list[i].getAttribute("rel").indexOf("style") != -1 && link_list[i].getAttribute("title")){
                    link_list[i].disabled = true;
                    if (link_list[i].getAttribute("title") == title) link_list[i].disabled = false;
                }
            }
        }
    }
  
    findNightNav();
    isNight && applyNight(isNight);
  }());
```

并在 `layout/common` 完成对该 js 的引入。

```js
	<script src={url_for('/js/main.js')} defer></script>
	<script src={url_for('/js/night.js')} defer={true}></script>
</Fragment>;
```

## 添加访客数和访问次数

该主题原本就支持 busuanzi 的访客统计，在设置中打开就行，但是只显示其中一种，如果想要全部打开，可以仿照其原本的补充编写：

```js
// 在如下的地方依照类似的方法添加访客计数pv
visitorCounterTitle: _p('plugin.visitor_count', '<span id="busuanzi_value_site_uv">0</span>'),
visitorCounterTitle: _p('plugin.visitor_count', '<span id="busuanzi_value_site_pv">0</span>')
```

同样对该值的调用和渲染也要到相应的地方注册。

```js
visitorCounterTitle,
visitCounterTitle
```

并添加渲染：

```js
{showVisitorCounter ? <span id="busuanzi_container_site_pv"
	dangerouslySetInnerHTML={{ __html: visitorCounterTitle }}></span> : null}

{showVisitorCounter ? " and ": null}
	{showVisitorCounter ? <span id="busuanzi_container2_site_uv"
		dangerouslySetInnerHTML={{ __html: visitCounterTitle }}></span> : null}
```

## 所有图片居中

参考资料：[请问如何实现文章中图片居中显示](https://github.com/ppoffice/hexo-theme-icarus/issues/386)

单张图片居中可以使用：

```js
<div style="text-align:center">
    <img src= https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20230403173436.png title="devops">
</div>
```

全部图片居中可以在 hexo-theme-icarus/source/css/style.styl 中的 article 部分添加如下的最后四行：

```javascript
.article
    .article-meta
        margin-bottom: 0.5rem !important
    .content
        font-size: 1.1rem
        blockquote.pullquote
            float: right
            max-width: 50%
            font-size: 1.15rem
            position: relative
        a
            img
                margin: auto
                display: block
```

新版的修改的地址已经迁移到：`themes/icarus/include/style/article.styl` 中,同样还是找到这一段描述中添加最后四行即可。

## 文章以更新时间排序

修改 `node_modules\hexo-generator-index\lib\generator.js` 文件为以下内容重新 `hexo s` 即可：

> 修改之前记得备份

```js
'use strict';  
var pagination = require('hexo-pagination');  
module.exports = function(locals){  
  var config = this.config;  
  var posts = locals.posts;  
    posts.data = posts.data.sort(function(a, b) {  
        if(a.top && b.top) { // 当两篇文章top都有定义时  
            if(a.top == b.top) return b.updated - a.updated; // 若top值一样，则按照文章更新日期降序排列  
            else return b.top - a.top; // 否则按照top值降序排列  
        }  
        else if(a.top && !b.top) { // 以下两种情况是若只有一篇文章top有定义，则将有top的排在前面（这里用异或操作居然不行233）  
            return -1;  
        }  
        else if(!a.top && b.top) { //上一条已解释  
            return 1;  
        }  
        else return b.updated - a.updated; // 若都没定义，则按照文章更新日期降序排列  
    });  
  var paginationDir = config.pagination_dir || 'page';  
  return pagination('', posts, {  
    perPage: config.index_generator.per_page,  
    layout: ['index', 'archive'],  
    format: paginationDir + '/%d/',  
    data: {  
      __index: true  
    }  
  });  
};
```

## Troubleshooting 

### map 迭代错误

执行 `hexo cl && hexo g` 会出现以下的错误：

> Uncaught TypeError: Cannot read properties of undefined (reading ‘map‘)

该错误主要是由于使用 map 进行循环之前未判断变量是否非空，导致对 undefined 变量做遍历导致，因此只需要在循环之前加上判断即可。

主要出错的是在一下的两个文件里：

- Layout/category.Jsx
- Layout/index.Jsx

使用如下的方式在使用 map 对变量进行遍历之前做一个非空判断：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20231031000315.png)

[在react中使用map遍历，出现错误：Uncaught TypeError: Cannot read properties of undefined (reading ‘map‘)_学习前端的渣渣的博客-CSDN博客](https://blog.csdn.net/fangqi20170515/article/details/126030610)

### spawn failed 解决方法

执行 `hexo d` 进行部署的时候可能会遇到 spawn failed 的各种问题，主要有两种情况

- 网络问题
- 文件结构问题

网络问题可以使用 `ss -T git@github` 测试连接情况；而文件结构问题的话，其实就是我们的链接库 `.deploy_git` 文件夹无法正常推送到 github，这种情况下可以考虑以下几种解决方式：

- 【重置部署文件夹】 删除 `.depoly_git` 文件夹，重新执行 `hexo d`
- 【不推荐】进入 `.deploy_git` 文件夹强制推送，`git push -f`
- 【多系统编写导致文件混合编码问题】 `git config –global core.autocrlf false`

参考资料：[Hexo错误：spawn failed的解决方法 | 张洪Heo (zhheo.com)](https://blog.zhheo.com/p/128998ac.html)

## Reference

- [博客主题源码和配置文件 - iMaeGoo's Blog](https://www.imaegoo.com/2022/dec-27/)
- [Hexo theme: icarus| Highly personalize it - Karobben](https://karobben.github.io/2021/02/11/Blog/hexo_icarus/#Giscus)
- [Icarus 主题自定义 - Alpha Lxy](https://www.alphalxy.com/2019/03/customize-icarus/#%E7%9B%AE%E5%BD%95%E7%B2%98%E6%80%A7%E5%AE%9A%E4%BD%8D)
- [hexo及icarus主题个性定制 - Jingjing's blog (angericky.github.io)](https://angericky.github.io/2018/12/24/icarus%E4%B8%AA%E6%80%A7%E5%AE%9A%E5%88%B6/)
- [干志雄的博客 (ganzhixiong.com)](https://ganzhixiong.com/)
- [hexo笔记：文章排序 | 高深远的博客 (gsy00517.github.io)](https://gsy00517.github.io/hexo20200207151318/)

and here are some theme I may want to try：

- [Arknights (yue.zone)](https://arknights.theme.hexo.yue.zone/)
- [Hexo 主题 Ringo - Hexo Theme Ringo (heliumoi.github.io)](https://heliumoi.github.io/ringoExample/2022/07/07/Hexo-%E4%B8%BB%E9%A2%98-Ringo/)
- [二丫讲梵 (eryajf.net)](https://wiki.eryajf.net/)