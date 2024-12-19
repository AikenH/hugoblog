---
calendar_date: 2021-11-29
catalog: true
categories:
- Machine_Learning
cover:
  image: /cover/cover0.jpeg
date: 2021-11-29 13:12:05
description: MoCo V3 An Empirical Study of Training Self-Supervised Visual Transformers
lang: cn
mathjax: false
tags:
- SSL
thumbnail: /img/header_img/lml_bg0.jpg
title: SSL-MoCov3
toc: true
---

@Aiken 2021 

恺明大神对自监督学习+transformer的实证研究，针对Transformer再自监督学习学习框架中的训练不稳定问题提出了**Random Patch Projection**的解决方案。

[Article](https://mp.weixin.qq.com/s/waqkJkwqxU-7utfNnwr2Gg)；[Paper](https://arxiv.org/abs/2104.02057)；

## Motivation

ViT的方法在自监督学习的任务中，精度下降的主要原因是由于算法的不稳定性，容易陷入局部的最优值，本文主要聚焦于**采用视觉领域的自监督框架进行Transformer的训练**，CNN的训练方法已经是一个比较明确约定俗称的方法，而Transformer的训练架构实际上还没有被完全的构建。