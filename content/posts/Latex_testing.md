---
calendar_date: 2022-04-13
catalog: true
categories:
- 博客功能测试系列文章
cover:
  image: /cover/cover5.jpeg
date: 2022-04-13 16:50:53
lang: cn
mathjax: true
subtitle: test hexo render
tags:
- Latex
- Blog
thumbnail: /img/header_img/lml_bg5.jpg
title: Latex tesing
toc: true
---

该文档主要目的是用于测试Latex语法对应前端的渲染能力，主要用于测试Hexo站点是否能正常渲染Latex。

Example1: 2 inline in one sentence.

When $a \ne 0$ , there are two solutions to $(ax^2 + bx + c = 0)$ and they are 
<div>
$$ x = {-b \pm \sqrt{b^2-4ac} \over 2a}. $$
</div>
 
Example2: Matrix Example

 
<div>
$$ 
\begin{bmatrix} 1&x&x^2\\ 1&y&y^2\\ 1&z&z^2 \end{bmatrix}
\\
\begin{bmatrix} 1&x&x^2\\\\ 1&y&y^2\\\\ 1&z&z^2 \end{bmatrix}
\\
vmatrix ||、Bmatrix{}、pmatrix()
 $$
</div>
 

Example3: the Conditional Formula

 
<div>
$$ 
f(x)=
\begin{cases}
0& \text{x=0}\\\\
1& \text{x!=0}
\end{cases}
 $$
</div>
 

Example4: Sprcial Symboy



 
<div>
$$ 
\lim_{\alpha \rightarrow +\infty} \frac{1}{\alpha(\beta+1)}
 $$
</div>
 

Example5: Complex Function Which Occurs Error in Much Situation

 
<div>
$$ 
\begin{gathered}
\mathcal{L}_{POD-final} = \frac{\lambda_c}{L-1}\sum_{l=1}^{L-1} \mathcal{L}_{POD-spatial}(f_l^{t-1}(x),f_l^t(x)) +  \\
\lambda_f \mathcal{L}_{POD-flat}(f_l^{t-1}(x),f_l^t(x))
\end{gathered}
 $$
</div>
 

Example6：Mathbb、Text、etc...

 
<div>
$$ 
\mathcal{L}_{\text {POD-pixel }}\left(\mathbf{h}_{\ell}^{t-1}, \mathbf{h}_{\ell}^{t}\right)=\sum_{c=1}^{C} \sum_{w=1}^{W} \sum_{h=1}^{H}\left\|\mathbf{h}_{\ell, c, w, h}^{t-1}-\mathbf{h}_{\ell, c, w, h}^{t}\right\|^{2}
 $$
</div>
 

Example7: Multiple Lines of Loss in Incremental Learning

 
<div>
$$ 
\begin{gathered}
\mathcal{L}_{\text {POD-channel }}\left(\mathbf{h}_{\ell}^{t-1}, \mathbf{h}_{\ell}^{t}\right)=\sum_{w=1}^{W} \sum_{h=1}^{H}\left\|\sum_{c=1}^{C} \mathbf{h}_{\ell, c, w, h}^{t-1}-\sum_{c=1}^{C} \mathbf{h}_{\ell, c, w, h}^{t}\right\|^{2} \\
\mathcal{L}_{\text {POD-gap }}\left(\mathbf{h}_{\ell}^{t-1}, \mathbf{h}_{\ell}^{t}\right)=\sum_{c=1}^{C}\left\|\sum_{w=1}^{W} \sum_{h=1}^{H} \mathbf{h}_{\ell, c, w, h}^{t-1}-\sum_{w=1}^{W} \sum_{h=1}^{H} \mathbf{h}_{\ell, c, w, h}^{t}\right\|^{2} \\
\mathcal{L}_{\text {POD-width }}\left(\mathbf{h}_{\ell}^{t-1}, \mathbf{h}_{\ell}^{t}\right)=\sum_{c=1}^{C} \sum_{h=1}^{H}\left\|\sum_{w=1}^{W} \mathbf{h}_{\ell, c, w, h}^{t-1}-\sum_{w=1}^{W} \mathbf{h}_{\ell, c, w, h}^{t}\right\|^{2}
\end{gathered}
 $$
</div>
 

如果这些都能正确渲染的话，基本整个文档中的Latex基本渲染应该都没问题，用该文档能验证当前本地渲染的版本是否是正确的。