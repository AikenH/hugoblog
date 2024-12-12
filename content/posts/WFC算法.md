---
calendar_date: 2022-07-10
catalog: true
categories:
- Game Generate
cover:
  image: /cover/cover13.jpeg
date: 2022-07-10 09:42:50
lang: cn
mathjax: true
subtitle: 对波函数坍塌算法的理解
tags:
- WFC
- ALgorithm
thumbnail: /img/header_img/lml_bg40.jpg
title: Wave Function Collapse
toc: true
---

@Reference: [Github-Mxgmn](https://github.com/mxgmn/WaveFunctionCollapse) | [zhihu](https://zhuanlan.zhihu.com/p/66416593)

## 概念简介和复习

本质上该方法的底层思想就是条件概率的启发式随机生成算法。

### 波函数坍塌

在介绍算法之前首先需要明确几个概念，第一个就是**“波函数坍塌”**（名字的来源是量子力学中的概念），参考**“薛定谔的猫”**，可以理解成：在一系列的不确定像素（存在多种可能）的基础之上，通过**确定的规则**、**相关关系**，随机的将所有的像素变成确定的状态。（可以通过给定种子来启动，也可以通过随机规则来启动），实现在一定规则或者模式下的随机生成。



### 熵

**熵**作为热力学中，表示物理状态的参量，其含义在于表示物质的**混乱程度**（正相关）。在当前的场景下，使用信息熵（而非热熵）来衡量变量的**不确定程度**（完全随机，或者有限随机，或者二选一等等）。
 
<div>
$$ 
H(X) = \sum_{x\in X}p(x)log p(x)
 $$
</div>
 
式中描述的是信息熵的计算公式，在实际应用中，可以使用任何表示状态不确定程度的度量来进行一下的计算。

## 算法原理-流程

动态地使可选的范围越来越小，直到最后整体都是确定的状态。而缩小范围的方法核心可以总结为（数独）：

- **约束规则**、**状态传播**、**回溯**

- 从最小熵的单位开始坍缩，保证最小概率的坍缩失败，从而**减少大量的回溯**过程，来减少计算量。

以**地图生成**为例：

**约束规则**：（选择一个熵最小的slot开始）针对于每个slot的坍缩，是在ModuleSet（可选模块集合）中随机取一个概率最高的模块，进行合成，而这个概率受我们制定的**规则**，**周边的Slot**的状态影响。
**状态传播**：模块确定后就将该状态和规则传递到相邻的moduleset中，删除不匹配的模块等。
**回溯**：当坍缩陷入矛盾（与规则相互矛盾，坍缩失效），就对状态进行回溯（Backtrack）重新进行状态搜索和回溯。

> 1. Read the input bitmap and count NxN patterns.
>    1. (optional) Augment pattern data with rotations and reflections.
> 2. Create an array with the dimensions of the output (called "wave" in the source). Each element of this array represents a state of an NxN region in the output. A state of an NxN region is a superposition of NxN patterns of the input with boolean coefficients (so a state of a pixel in the output is a superposition of input colors with real coefficients). False coefficient means that the corresponding pattern is forbidden, true coefficient means that the corresponding pattern is not yet forbidden.
> 3. Initialize the wave in the completely unobserved state, i.e. with all the boolean coefficients being true.
> 4. Repeat the following steps:
>    1. Observation:
>       1. Find a wave element with the minimal nonzero entropy. If there is no such elements (if all elements have zero or undefined entropy) then break the cycle (4) and go to step (5).
>       2. Collapse this element into a definite state according to its coefficients and the distribution of NxN patterns in the input.
>    2. Propagation: propagate information gained on the previous observation step.
> 5. By now all the wave elements are either in a completely observed state (all the coefficients except one being zero) or in the contradictory state (all the coefficients being zero). In the first case return the output. In the second case finish the work without returning anything.

## Code
             
官方仓库中有诸多样例和各种代码版本的实现，可以参考并实现部分版本。

### 样例解读



### 样例实现