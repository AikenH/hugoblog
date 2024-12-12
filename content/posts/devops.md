---
calendar_date: 2023-03-25
catalog: true
categories:
- Development-Tool
cover:
  image: /cover/cover10.jpeg
date: 2023-03-25 09:55:32
lang: cn
mathjax: false
subtitle: Explain Devops, CI, CD and How it works
tags:
- Devops
thumbnail: /img/header_img/lml_bg10.jpg
title: Whats DevOps?
toc: true
---

在一个庞大的组织架构中，CI/CD 和 Devops 的概念是避不开的，了解它的工作原理和概念能帮助我们更好的与他人进行协作。

## CI/CD 介绍

<div style="text-align:center">
    <img src= https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20230403173436.png title="devops">
</div>

这是一个用来描绘 CI/CD 的示意图，其描绘了 CI/CD 的工作流和各自的一些职责，接下来本文分别对两者进行介绍。

### CI (Continuous integration) 持续集成

持续集成是面向开发者（Developer）的环节。从上述的图也可以看出，整体的流程如下：

Developer 基于给出的需求进行**编码（code）**，完成 Feature 或者 Bug 修复后，**提交（Commit）代码**，然后平台会对这些需要（Merge Request）代码进行**编译（Build）**，编译通过后，执行自动化的**持续测试（Continuous Test）**，待测试通过后才会正式合并入主干。

也就是说，CI 工具在检测到代码变更后，自动对其执行编译和单元测试，验证其代码的正确性和可用性，以及是否适合与源代码进行集成，然后进行自动集成。

该流程有以下的优势：

- 能够避免不同开发环境带来的不一致问题
- 减少手动操作
- 清晰的版本管理和控制
- 降低人为操作的风险



### CD (Continuous deployment)持续部署

持续部署则是面向 IT 运维技术人员（ops）的环节，整体流程如下：

Devs 成功 **发布代码(release)** 后，CD 工具会自动 **部署（deploy）** 该 service 到服务器上，进行发布，直接部署到生产环境中，可供 **操作（operate）**，并通过 **监控（monitor）** 来确保服务的正常运行，如果出现问题后，就即时 FeedBack 给开发者。

>持续交付是一种软件开发实践，它与 CI 结合使用，可自动执行基础结构预配和应用程序发布过程。作为 CI 过程的一部分测试和构建代码后，CD 会在最后阶段接管，以确保它包含随时部署到任何环境所需的一切。CD 可以涵盖从调配基础结构到将应用程序部署到测试或生产环境的所有内容。使用 CD，软件的构建使其可以随时部署到生产环境。然后，可以手动触发部署或移动到持续部署，其中部署也是自动化的。

该流程提供了这样的能力：

- 确保随时随地能进行部署
- 确保更新能够正常执行

### CT (Continuous Test) 持续测试

>持续测试是一种软件测试实践，其中测试持续运行，以便在错误引入代码库后立即识别错误。在 CI/CD 管道中，持续测试通常是自动执行的，每次代码更改都会触发一系列测试，以确保应用程序仍按预期工作。

持续测试能够在早期就识别潜在的问题，也能在交付的初期发现 Bug，避免后期 Debug 的困难，也能帮助提示和提高开发人员的代码质量，其主要依赖的测试类型为：

-   **单元测试**，检查各个代码**单元**是否按预期工作
-   **集成测试**，验证应用程序中的不同模块或服务如何协同工作
-   **回归测试**，在修复错误后执行，以确保特定错误不会再次发生

### CI/CD工具介绍

该部分内容来自 [reference](< [Day12 什麼是 CICD - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天 (ithome.com.tw)](https://ithelp.ithome.com.tw/articles/10219083) >) 该文

-   GitLab (Version Control)
-   GitHub (Version Control)
-   Jenkins (自动 build 工具)
-   Drone (自动 build 工具)
-   Circle (自动 build 工具)
-   Docker (迅速佈署環境工具)
-   K8S (管理 Docker Container 工具)
-   Helm (快速建置各環境 K8S 工具)
-   Grafana (機器數據監控工具)
-   ELK (Log 蒐集工具)
-   Telegram (通訊、錯誤通知工具)
-   Slack (通訊、錯誤通知工具)

### CI/CD 的优点

参考 Gitlab 该文中的相关部分 [什么是 CI/CD？ |吉特实验室 (gitlab.com)](https://about.gitlab.com/topics/ci-cd/)，无非是更安全，更快速，更透明，更易于开发，减少 merge 地狱。

## DevOps 介绍

DevOps 实际上是一种方法论：主要强调软件开发测试运维的一体化，目标是减少各个部门之间的沟通成本从而实现软件的快速高质量的发布。
>（**Dev**elopment和**Op**erations的[混成词](https://zh.wikipedia.org/wiki/%E6%B7%B7%E6%88%90%E8%A9%9E "混成词")）是一种重视“软件开发人员（Dev）”和“IT运维技术人员（Ops）”之间沟通合作的文化、运动或惯例。通过自动化“软件交付”和“架构变更”的流程，来使得构建、测试、发布软件能够更加地快捷、频繁和可靠。

而 CI/CD 实际上就是 DevOps 的核心，可以看下面这张图，实际上与 CI、CD 高度重合，但是 DevOps 并不完全等同于 CI/CD，要实现 DevOps 还依靠公司的各种架构组织等。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20230403212256.png)

下面这些是对应的工作流和相应的软件：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20230403212454.png)
![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20230403212516.png)
![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20230403212527.png)
![v2-681fb4c6f6fac9cb893b623d74bab09d_r.jpg](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/v2-681fb4c6f6fac9cb893b623d74bab09d_r.jpg)

## Reference

- [Day12 什麼是 CICD - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天 (ithome.com.tw)](https://ithelp.ithome.com.tw/articles/10219083)
- [DevOps漫谈之一：DevOps、CI、CD都是什么鬼？ - 晶晶的博客 (jjonline.cn)](https://blog.jjonline.cn/linux/238.html)
- [什么是 CI/CD？ |吉特实验室 (gitlab.com)](https://about.gitlab.com/topics/ci-cd/)
- [What Is CI/CD and How Does It Work? | Synopsys](https://www.synopsys.com/glossary/what-is-cicd.html)
- [How to build a CI/CD pipeline with GitHub Actions in four simple steps | The GitHub Blog](https://github.blog/2022-02-02-build-ci-cd-pipeline-github-actions-four-steps/)
- [CI/CD - Wikipedia](https://en.wikipedia.org/wiki/CI/CD)
- [DevOps - Wikipedia](https://en.wikipedia.org/wiki/DevOps)
- [持续集成cicd和devops - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/127093414)