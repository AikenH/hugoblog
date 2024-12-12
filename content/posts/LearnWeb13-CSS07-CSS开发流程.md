---
calendar_date: 2024-02-07
catalog: true
categories:
- 前端三剑客入门笔记
cover:
  image: /cover/cover13.jpeg
date: 2024-02-07 15:54:33
lang: cn
mathjax: false
subtitle: null
tags:
- Web
- CSS
thumbnail: /img/header_img/lml_bg14.jpg
title: LearnWeb13-CSS07-CSS开发流程
toc: true
---

>[!summary]+ 
> 这一章节主要是涵盖开发 css 的各部分，有一些需要掌握的技能的 TODO 还有一些代码风格之类的东西

### TODO

- [x] 后续如果初窥门路了可以研究整理一下如何去找参考文献的思路。
- [x] 熟练使用使用开发者工具进行网站调试的方式。
### DOC 查找

如何查阅 MDN 是一个很重要的技能（当今确实是可以使用 GPT 替代，但是也要掌握基础技能）：

- 当希望知道一个模块有什么属性可以设置的时候应该在 Modules 中查找对应的模块内容，例如[表格的相关属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_table)
- 当希望属性用法的时候才去查看对应的属性

### Debug 调试

尝试熟练去使用开发者模式去查看盒模型，调整颜色，布局，查看属性，添加属性等。

### 编写规范

可以参考: [MDN 的 CSS 代码规范的示例](https://developer.mozilla.org/zh-CN/docs/MDN/Writing_guidelines/Writing_style_guide/Code_style_guide/CSS)的同时，遵循[组织 CSS](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Organizing) 的一些准则，来确定自己的编写规范。

我的开发流程：

1. 使用 Layer 导入组件库
2. 使用 Layer 设置默认层，包括表格预设，各种预设的东西
3. 使用 Layer 设置主题层
4. 定义 custom 内容，内容的组织可以参考： OOCSS 面向对象的 CSS 设计，或者基于文章结构的组织（基础如 body,h -> 组件，例如不带 index 的列表-> 站点 level 如导航栏 -> 特指内容）

编写过程中：

- 保持命名方式统一
- 添加注释说明各部分内容
- 保持缩进和换行
- 为一些颜色之类的数值设置变量，避免重复修改多个地方