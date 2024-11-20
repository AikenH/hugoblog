---
title: "Latex Function Test"
date: 2020-09-15 11:30:03
description: "test website's function is normal "
tags: ["Util"]
draft: false
categories:
- Util
- Latex
# cover:
#     image: "https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/DSCF4104_%E5%89%AF%E6%9C%AC.JPG" # image path/url
#     alt: "CoverImg" # alt text
#     caption: "<text>" # display caption under cover
#     relative: false # when using page bundles set this to true
#     hidden: false # only hide on current single page
---


该文档主要目的是用于测试Latex语法对应前端的渲染能力，主要用于测试Hexo站点是否能正常渲染Latex。

Example1: 2 inline in one sentence.

When $a \ne 0$, there are two solutions to $(ax^2 + bx + c = 0)$ and they are $$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$
Example2: Matrix Example

$$
\begin{bmatrix} 1&x&x^2\\ 1&y&y^2\\ 1&z&z^2 \end{bmatrix}
\\
\begin{bmatrix} 1&x&x^2\\\\ 1&y&y^2\\\\ 1&z&z^2 \end{bmatrix}
\\
vmatrix ||、Bmatrix{}、pmatrix()
$$

Example3: the Conditional Formula

$$
f(x)=
\begin{cases}
0& \text{x=0}\\\\
1& \text{x!=0}
\end{cases}
$$

Example4: Sprcial Symboy

<!-- more -->

$$
\lim_{\alpha \rightarrow +\infty} \frac{1}{\alpha(\beta+1)}
$$

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

