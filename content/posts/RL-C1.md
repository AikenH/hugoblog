---
calendar_date: 2021-05-23
catalog: true
categories:
- Machine_Learning
cover:
  image: /cover/cover6.jpeg
date: 2021-05-23 13:50:06
lang: cn
mathjax: false
subtitle: Reinforcement learning Notebook 01
tags:
- RL
thumbnail: /img/header_img/lml_bg6.jpg
title: RL Notebook 01
toc: true
---

Created by: Aiken H
Detail: survey
Finished?: No
Tags: Paper
URL1: https://www.cnblogs.com/pinard/category/1254674.html
URL2: https://github.com/ljpzzz/machinelearning
URL3: https://datawhalechina.github.io/easy-rl/#/

# Chapter1 模型基础

[强化学习（一）模型基础](https://www.cnblogs.com/pinard/p/9385570.html)

强化学习是介于监督和无监督学习之间的，强化学习没有输出值，但是有**reward：** 同时这个reward是事后给出的，而不是及时回馈的。而无监督学习是只有数据特征，同时数据之间是独立的，没有前后依赖的关系。

![https://images2018.cnblogs.com/blog/1042406/201807/1042406-20180729163058011-290427357.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/imgs/img/20210911210000.png)

## Theory理论基础


- 简化模型介绍：

    上面的大脑代表我们的算法执行个体，我们可以操作个体来做决策，即选择一个合适的动作（Action）At。下面的地球代表我们要研究的环境,它有自己的状态模型，我们选择了动作At后，环境的状态(State)会变，我们会发现环境状态已经变为St+1,同时我们得到了我们采取动作At的延时奖励(Reward)Rt+1。然后个体可以继续选择下一个合适的动作，然后环境的状态又会变，又有新的奖励值。。。这就是强化学习的思路。

强化学习的模型关键要素：

1. 环境的状态S：t时刻环境的状态 $S_t$ 是它环境状态集中的某一个状态
2. 个体的动作A：个体在某个时刻可能做出的动作集合
3. 环境的奖励R：个体在某个时刻对应状态下做出的动作 $A_t$ 得到的奖励会在t+1时刻得到
4. 个体的策略 $\pi$ ：个体根据当前的环境选择采取动作的策略分布（函数），一般表示为一个条件概率分布的形式，概率大的动作被个体选择的概率显然更高

    
<div>
$$ \pi(a|s)= P(A_t = a | S_t = s) $$
</div>
 

5. 在策略 $\pi$ 和状态s采行动后的价值 $v_\pi(s)$ ：一般是一个期望函数，因为我们不能每次只能选择当前的reward最大的策略，而是需要考虑大局，所以我们要有一个综合的（当前和后续）的延时奖励。

    
<div>
$$ v_\pi(s) = \mathbb{E}(R_{t+1} + \gamma R_{t+2} + \gamma ^2 R_{t+3} + ... |S_t = s) $$
</div>
 

6. 奖励衰减因子 $\gamma$ ：也就是上式的权重，极端值考虑贪婪和一致等同，范围在[0,1]
7. 环境的状态转移模型：也就是环境从s经过a后转化下一个状态的状态机，也可以表示为一个概率模型 $P_{ss^‘}^a$ (s→s' , a)
8. 探索率 $\epsilon$ ：主要用于训练迭代中，我们一般选择当前价值最大的动作，但是为了搜索空间的完备，我们会用 $\epsilon$ 的概率去选择非最大价值的动作，来提升训练的鲁棒性

**SUMMARY：主要介绍了强化学习模型的workflow以及其中需要考虑的8个主要参数和函数架构。最主要的机制还是Policy和reward设计这一块**

# Chapter2 马尔可夫决策过程（MDP）

[强化学习（二）马尔科夫决策过程(MDP)](https://www.cnblogs.com/pinard/p/9426283.html)

[Easy-RL](https://datawhalechina.github.io/easy-rl/#/chapter2/chapter2)

在这里可能需要补充一下马尔可夫链的相关理论知识，先粗略的看完这部分再说

## 马尔可夫性简化

环境的真实转化状态可能和之前的多个时刻相关，这样会导致建模困难，于是我们对环境的状态转移模型进行马尔可夫性假设。也就是：

转化到下一个状态s'只和当前的状态s相关，与之前的状态无关

同样的我们对Policy、价值函数也做了同样的马尔可夫性假设来简化。

其中： $G_t$ 代表收获（return），是从某一个状态开始采样直到终止状态时所有奖励的有衰减的和。

 
<div>
$$ 1.\ P_{ss'}^a = \mathbb{E}(S_{t+1} = s'|S_t=s,A_t=a) $$
</div>
 

 
<div>
$$ 2. \ \pi(a|s) = P(A_t = a | S_t = s) $$
</div>
 

 
<div>
$$ 3. \ v_\pi(s) =\mathbb{E}_\pi(G_t|S_t =s) = \mathbb{E}(R_{t+1} + \gamma R_{t+2} + \gamma ^2 R_{t+3} + ... |S_t = s) $$
</div>
 

**SUMMARY：由于环境的复杂时序关系，我们需要进行相应的马尔可夫性的假设，让下一个时刻的状态或者预测值只和当前时刻有关，从而简化并假设出模型**

## MDP的价值函数和贝尔曼方程

在上述价值表达式的基础上，加入考虑动作a带来的价值影响，我们就可以得到下面的动作价值函数：

 
<div>
$$ q_{\pi}(s, a)=\mathbb{E}_{\pi}\left(G_{t} \mid S_{t}=s, A_{t}=a\right)=\mathbb{E}_{\pi}\left(R_{t+1}+\gamma R_{t+2}+\gamma^{2} R_{t+3}+\ldots \mid S_{t}=s, A_{t}=a\right) $$
</div>
 

我们可以通过价值函数的公式得到价值函数的递推关系（贝尔曼方程）：

 
<div>
$$ \begin{aligned}
v_{\pi}(s) &=\mathbb{E}{\pi}\left(R{t+1}+\gamma R_{t+2}+\gamma^{2} R_{t+3}+\ldots \mid S_{t}=s\right) \\
&=\mathbb{E}{\pi}\left(R{t+1}+\gamma\left(R_{t+2}+\gamma R_{t+3}+\ldots\right) \mid S_{t}=s\right) \\
&=\mathbb{E}{\pi}\left(R{t+1}+\gamma G_{t+1} \mid S_{t}=s\right) \\
&=\mathbb{E}{\pi}\left(R{t+1}+\gamma v_{\pi}\left(S_{t+1}\right) \mid S_{t}=s\right)
\end{aligned} $$
</div>
 

一个状态的价值由该状态的奖励以及后续状态价值按照一定衰减比例联合而成，同样的有：

 
<div>
$$ q_{\pi}(s, a)=\mathbb{E}_{\pi}\left(R_{t+1}+\gamma q_{\pi}\left(S_{t+1}, A_{t+1}\right) \mid S_{t}=s, A_{t}=a\right) $$
</div>
 

SUMMARY：基于马尔可夫假设之后，我们可以将价值函数（动作、状态）表示一个递推的形式，这个递推的形式也被叫做贝尔曼方程。

## 状态价值函数和动作价值函数的递推关系

基于状态价值函数的定义以及动作价值函数的定义，我们很容易得到两个价值函数之间的转化关系：

状态价值函数是动作价值函数对于所有可能动作对于policy的期望。

利用贝尔曼方程，我们也能反推得状态价值函数来表示动作价值函数：

当前的reward和可能转移到所有后续状态的价值函数的加权和

 
<div>
$$ v_\pi(s) = \sum_{a\in A} \pi({a|s}) q_\pi(s,a) $$
</div>
 

 
<div>
$$ q_\pi(s,a) = R_s^a + \gamma \sum _ {s'\in S} P_{ss'}^a v_\pi(s') $$
</div>
 

将上述两个式子互相结合起来，我们可以得到如下的简化（变量）算式（只包含一种价值函数）

 
<div>
$$ \begin{gathered}v_{\pi}(s)=\sum_{a \in A} \pi(a \mid s)\left(R_{s}^{a}+\gamma \sum_{J \in S} P_{s s^{\prime}}^{a} v_{\pi}\left(s^{\prime}\right)\right) \\q_{\pi}(s, a)=R_{s}^{a}+\gamma \sum_{s^{\prime} \in S} P_{s s^{\prime}}^{a} \sum_{a^{\prime} \in A} \pi\left(a^{\prime} \mid s^{\prime}\right) q_{\pi}\left(s^{\prime}, a^{\prime}\right)\end{gathered} $$
</div>
 

## 最优价值函数

这一部分看原文，结合相应的例子一起看，后续可能需要看EasyRL中的markov的相关解读来进行深入的理解和计算的分析。

解决一个强化学习的问题意味着要找一个最有的policy（策略），让Argent在和环境交互的过程中获得比其他所有策略都更多的收获，找到这个策略，也就意味着我们解决了这样一个强化学习的问题。

求解最优策略→ 求解最优的价值函数，使得（动作、状态）价值函数获取到最大值的策略就是最优策略。

对于最优策略我们将动作函数定义为：

 
<div>
$$ \pi_{*}(a \mid s)=\left\{\begin{array}{ll}1 & \text { if } a=\arg \max _{a \in A} q_{*}(s, a) \\0 & \text { else }\end{array}\right. $$
</div>
 

有：

 
<div>
$$ v_*(s) = \max_a q_*(s,a)\\q_{*}(s, a)=R_{s}^{a}+\gamma \sum_{s^{\prime} \in S} P_{s s}^{a} v_{*}\left(s^{\prime}\right) $$
</div>
 

这样我们就可以最终得到：

 
<div>
$$ \begin{gathered}v_{*}(s)=\max _{a}\left(R_{s}^{a}+\gamma \sum_{g^{\prime} \in S} P_{s s^{\prime}}^{a} v_{*}\left(s^{\prime}\right)\right) \\q_{*}(s, a)=R_{s}^{a}+\gamma \sum_{s^{\prime} \in S} P_{s s^{\prime}}^{a} \max _{a^{\prime}} q_{*}\left(s^{\prime}, a^{\prime}\right)\end{gathered} $$
</div>
 

# Chapter3 动态规划（DP）求解

[强化学习（三）用动态规划（DP）求解](https://www.cnblogs.com/pinard/p/9463815.html)

- 用动态规划来求解强化学习是自然的

    **关键的两点**：

    - 问题的最优解可以由递归的最优解来得到
    - 子问题状态间的转移

    从上面推出的贝尔曼方程，这个递推公式实际上就是DP求解的状态转移等式，然后相应的Value什么的也和DP求解过程的需求是一一对应的。

- 关键的方程，通过这种递推公式，我们可以通过上一个迭代周期的状态价值去计算当前迭代周期状态S的状态价值，这也就是动态规划的一个求解的自然过程。

    基于贝克曼方程推导出来，推导过程已经在上面了

 
<div>
$$ v_{\pi}(s)=\sum_{a \in A} \pi(a \mid s)\left(R_{s}^{a}+\gamma \sum_{J \in S} P_{s s^{\prime}}^{a} v_{\pi}\left(s^{\prime}\right)\right) $$
</div>
 

---

已知条件：状态集S, 动作集A, 模型状态转化概率矩阵P, 即时奖励R，衰减因子γ, 给定策略π

## 策略评估求解预测问题

策略评估：求解给定策略的状态价值函数的问题，即强化学习的预测问题。

求解思路： 从任何一个状态价值函数开始，按照给定的策略，结合关键的贝尔曼递推期望方程，状态转移，reward，更新状态价值函数，直至最终收敛。

- 具体而言：

    假设第k轮我们已经计算出了所有的状态的状态价值，然后再k+1轮的时候利用k轮的值通过贝尔曼方程来进行更新。

 
<div>
$$ v_{k+1}(s)=\sum_{a \in A} \pi(a \mid s)\left(R_{s}^{a}+\gamma \sum_{s' \in S} P_{s s^{\prime}}^{a} v_{\pi}\left(s^{\prime}\right)\right) $$
</div>
 

具体案例上面的网站中去看：（很容易理解）

## 策略迭代求解控制问题

控制问题：需要同时求解状态价值函数和策略

策略迭代：从一个初始任意的策略状态，不断地迭代，调整我们的策略，从而得到一个最优的策略。

求解思路：贪婪法

- 具体而言：

    个体在某个状态下选择的行为，是其能够达到后续所有可能的状态中，状态价值最大的那个状态，

![https://images2018.cnblogs.com/blog/1042406/201808/1042406-20180812191537706-1156414836.jpg](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/imgs/img/20210911210046.jpg)

策略迭代过程的演示：逐步的迭代策略和相应的价值函数，最终使得两者同时收敛

## 价值迭代求解控制问题

和上述的策略迭代的问题一样，如果我们使用贪婪的策略去及时调整策略，而不是等到收敛了才调整策略的话，就能很快的减少迭代次数，这样我们状态价值的更新方法也会不太一样，也能更快的收敛

 
<div>
$$ v_{k+1}(s)=\max_{a \in A} \left(R_{s}^{a}+\gamma \sum_{s' \in S} P_{s s^{\prime}}^{a} v_{\pi}\left(s^{\prime}\right)\right) $$
</div>
 

## 异步动态规划算法

> 在前几节我们讲的都是同步动态规划算法，即每轮迭代我会计算出所有的状态价值并保存起来，在下一轮中，我们使用这些保存起来的状态价值来计算新一轮的状态价值。
另一种动态规划求解是异步动态规划算法，在这些算法里，每一次迭代并不对所有状态的价值进行更新，而是依据一定的原则有选择性的更新部分状态的价值，这类算法有自己的一些独特优势，当然有额会有一些额外的代价。
常见的异步动态规划算法有三种：
第一种是原位动态规划 (in-place dynamic programming)， 此时我们不会另外保存一份上一轮计算出的状态价值。而是即时计算即时更新。这样可以减少保存的状态价值的数量，节约内存。代价是收敛速度可能稍慢。
第二种是优先级动态规划 (prioritised sweeping)：该算法对每一个状态进行优先级分级，优先级越高的状态其状态价值优先得到更新。通常使用贝尔曼误差来评估状态的优先级，贝尔曼误差即新状态价值与前次计算得到的状态价值差的绝对值。这样可以加快收敛速度，代价是需要维护一个优先级队列。
第三种是实时动态规划 (real-time dynamic programming)：实时动态规划直接使用个体与环境交互产生的实际经历来更新状态价值，对于那些个体实际经历过的状态进行价值更新。这样个体经常访问过的状态将得到较高频次的价值更新，而与个体关系不密切、个体较少访问到的状态其价值得到更新的机会就较少。收敛速度可能稍慢。

**SUMMARY 动态规划是我们讲到的第一个系统求解强化学习预测和控制问题的方法。它的算法思路比较简单，主要就是利用贝尔曼方程来迭代更新状态价值，用贪婪法之类的方法迭代更新最优策略。**

- 动态规划的缺点：实际上是一种遍历的方式

    动态规划算法使用全宽度（full-width）的回溯机制来进行状态价值的更新，也就是说，无论是同步还是异步动态规划，在每一次回溯更新某一个状态的价值时，都要回溯到该状态的所有可能的后续状态，并利用贝尔曼方程更新该状态的价值。这种全宽度的价值更新方式对于状态数较少的强化学习问题还是比较有效的，但是当问题规模很大的时候，动态规划算法将会因贝尔曼维度灾难而无法使用。因此我们还需要寻找其他的针对复杂问题的强化学习问题求解方法。

# Chapter 4 用蒙特卡罗法求解

[强化学习（四）用蒙特卡罗法（MC）求解](https://www.cnblogs.com/pinard/p/9492980.html)

❓ 由 1. DP方法的全回溯机制（完全遍历）带来的过度的计算复杂度，对于复杂问题的求解困难
             2.  很多时候对于状态转化模型P的未知

- DP中问题预测和控制问题的定义是在P已知的情况下定义的，这种称之为：基于模型的强化学习问题
- 而一般性预测和控制，也就是在状态转化概率矩阵P未知的情况下求解1. 状态价值函数 和2. 1+最优策略的问题

我们需要考虑其他的方法，而不能使用DP方法来求解这样的RL问题——Monto-Calo是一种可行的方法

已知条件：状态集S, 动作集A,  即时奖励R，衰减因子γ，探索率ε

## Monto-Calo 求解

基于采样的思路：蒙特卡罗法通过采样若干经历完整的状态序列(episode)来估计状态的真实价值。

经历完整就是这个序列必须是达到终点的。比如下棋问题分出输赢，驾车问题成功到达终点或者失败。
有了很多组这样经历完整的状态序列，我们就可以来近似的估计状态价值，进而求解预测和控制问题了。

关键公式回顾：

 
<div>
$$ v_\pi(s) = \mathbb{E}(R_{t+1} + \gamma R_{t+2} + \gamma ^2 R_{t+3} + ... |S_t = s) $$
</div>
 

## MC求解预测问题（策略评估）

思路：求解某个s的状态价值：对所有采样到的状态序列中，出现该状态之后的收获再取平均值来近似求解。

 
<div>
$$ G_t = R_{t+1} + \gamma R_{t+1} + ...+ \gamma ^{T-t+1}R_T \\
V_\pi (s) \approx average(G_t), s.t. S_t = s $$
</div>
 

**一个状态在一个状态序列中多次出现的处理**

主要有两种解决方式：

1. First Visit： 只统计第一次出现的来进行均值的计算
2. Every Visit：每一次出现都加入均值的计算，这种方式更适合样本量少的情况，但是计算量要更大一些。

**累进更新平均值（Incremental mean）**

如果我们将每个状态序列的值都记录下来在最后进行更新的话，会耗费大量的存储空间，所以我们使用累计更新均值的方法来进行不同轮次之间的迭代。

换言之：统计当前的均值和状态遍历到的次数。

 
<div>
$$ \mu_k = \frac{1}{k} \sum_{j=1}^{k}x_j = \frac{1}{k}(x_k+\sum_{j=1}^{k-1}x_j) = \frac{1}{k}(x_k+(k-1)\mu_{k-1}) = \mu_{k-1} + \frac{1}{k}(x_k-\mu_{k-1}) $$
</div>
 

然后我们就可以将状态价值公式的更新过程修改成：

 
<div>
$$ N(S_t) = N(S_t)+1\\
V(S_t) = V(S_t) + \frac{1}{N(S_t)}(G_t-V(S_t)) $$
</div>
 

这种情况下的存储空间（内存消耗）就是固定的了。

对海量数据做分布式迭代的时候 $N(S_t)$ 计算不确定的情况

 
<div>
$$ V(S_t) = V(S_t) + \alpha(G_t-V(S_t)) $$
</div>
 

动作价值函数也是类似的方法。

## MC求解控制问题（策略迭代）

和策略迭代的方式也是类似的，也是先做策略评估，然后通过一定的方法（比如贪婪策略）更新策略。

- 和DP相比的不同有如下几点：
    1. 策略评估的方法不同
    2. MC优化最优动作价值函数而不是状态价值函数
    3. DP一般使用贪婪法，MC使用 $\epsilon$ -贪婪法

 $\epsilon$ -贪婪法：

一般设置一个较小的值，然后用1- $\epsilon$ 来选择最大行为价值的行为，然后剩下的就随机在m个可行行为中随机选择

 
<div>
$$ \pi(a \mid s)=\left\{\begin{array}{ll}\epsilon / m+1-\epsilon & \text { if } a^{*}=\arg \max _{a \in A} Q(s, a) \\\epsilon / m & \text { else }\end{array}\right. $$
</div>
 

为了使得算法收敛； $\epsilon$ 会逐渐减小，并趋于0。

这样会得到一个和动态规划类似的图

![https://raw.githubusercontent.com/AikenH/md-image/master/img/1042406-20180817164828651-1814136312.jpg](https://raw.githubusercontent.com/AikenH/md-image/master/img/1042406-20180817164828651-1814136312.jpg)

**具体的算法流程：**

在这里总结下蒙特卡罗法求解强化学习控制问题的算法流程，这里的算法是在线(on-policy)版本的,相对的算法还有离线(off-policy)版本的。在线和离线的区别我们在后续的文章里面会讲。同时这里我们用的是every-visit,即个状态序列中每次出现的相同状态，都会计算对应的收获值。

输入：状态集S, 动作集A, 即时奖励R，衰减因子γ, 探索率ϵ　
输出：最优的动作价值函数q∗和最优策略π∗　
1.  初始化所有的动作价值Q(s,a)=0， 状态次数N(s,a)=0，采样次数k=0，随机初始化一个策略π　

2.  k=k+1, 基于策略π进行第k次蒙特卡罗采样，得到一个完整的状态序列:S1,A1,R2,S2,A2,...St,At,Rt+1,...RT,ST

3. 对于该状态序列里出现的每一状态行为对(St,At)，计算其收获Gt, 更新其计数N(s,a)和行为价值函数Q(s,a)：

 
<div>
$$ G_t = R_{t+1} + \gamma R_{t+1} + ...+ \gamma ^{T-t+1}R_T \\N(S_t,A_t) = N(S_t,A_t)+1\\
Q(S_t,A_t) = Q(S_t,A_t) + \frac{1}{N(S_t,A_t)}(G_t-Q(S_t,A_t)) $$
</div>
 

4. 基于新计算出的动作价值，更新当前的ϵ−贪婪策略：

 
<div>
$$ \epsilon = \frac{1}{k}\\\pi(a \mid s)=\left\{\begin{array}{ll}\epsilon / m+1-\epsilon & \text { if } a^{*}=\arg \max _{a \in A} Q(s, a) \\\epsilon / m & \text { else }\end{array}\right. $$
</div>
 

5. 如果所有的Q(s,a)收敛，则对应的所有Q(s,a)即为最优的动作价值函数q∗。对应的策略π(a|s)即为最优策略π∗。否则转到第二步。

**SUMMARY:实际上MC方法就是一个简单的采样渐进求平均的方法，在不断的迭代过程中找到相应的槿近似值。**

# Chapter5 用时序差分法（TD）求解

[强化学习（五）用时序差分法（TD）求解](https://www.cnblogs.com/pinard/p/9529828.html)

蒙特卡洛法虽然灵活，不需要环境转化概率模型，但是也有限制：所有的采样序列都需要是完整的状态序列，如果没有完整的状态序列，就不能使用Monto-Calo了。

在不完整的状态序列的情况下，可以使用时序差分算法（Temporal-Difference，TD），这也是一种不基于模型的算法（也就是没有环境转移的情况下）

关键公式回顾：

 
<div>
$$ 蒙特卡洛：G_t = R_{t+1} + \gamma R_{t+1} + ...+ \gamma ^{T-t+1}R_T \\

贝尔曼（TD）：v_{\pi}(s) = =\mathbb{E}{\pi}\left(R_{t+1}+\gamma v_{\pi}\left(S_{t+1}\right) \mid S_{t}=s\right)
 $$
</div>
 

由于如果使用G的公式的话，我们需要有T时刻的R来进行计算分析， 为了简化这个过程，我们使用贝尔曼的递推式来进行时序差分的分析（实际上是同个等式）

也就是：

使用 $R_{t+1} + \gamma v(S_{t+1})$ （也称为TD目标值） 来代替收获 $G_t$ ，同时令 $R_{t+1} + \gamma v(S_{t+1}) - V(S_t)$ 称为TD误差，用TD目标值来代替收获G的过程称为引导。这样的话我们只需要两个连续的状态和对应的奖励，就可以尝试求解强化学习的问题了。

## TD预测问题求解

预测问题的求解思路大体上是类似的，但是和MC有两个主要的不同点:

**一个是 $G_t$ 收获的表达式不同**

 
<div>
$$ G(t) = R_{t+1} + \gamma v(S_{t+1}) $$
</div>
 

**二是迭代的系数稍微有些不同，因为没有完整的序列，所以就没有对应的次数N，所以就用一个[0,1]的系数来代替**

 
<div>
$$ V\left(S_{t}\right)=V\left(S_{t}\right)+\alpha\left(G_{t}-V\left(S_{t}\right)\right) $$
</div>
 

具体的例子请参考相应的链接，这里写的特别的清楚！GO TO URL

**从例子中我们可以看到MC和TD主要的几点区别：**

1. 时序差分法在知道结果之前就可以学习，也可以在没有结果时学习，还可以在持续进行的环境中学习，而蒙特卡罗法则要等到最后结果才能学习，时序差分法可以更快速灵活的更新状态的价值估计，这在某些情况下有着非常重要的实际意义。‘
2. 时序差分法在更新状态价值时使用的是TD 目标值，即基于即时奖励和下一状态的预估价值来替代当前状态在状态序列结束时可能得到的收获，是当前状态价值的有偏估计，而蒙特卡罗法则使用实际的收获来更新状态价值，是某一策略下状态价值的无偏估计，这一点蒙特卡罗法占优。
3. 虽然时序差分法得到的价值是有偏估计，但是其方差却比蒙特卡罗法得到的方差要低，且对初始值敏感，通常比蒙特卡罗法更加高效。

所以后续的主流的强化学习方法都是基于时序差分的，后面的文章也会主要基于时序差分来拓展讨论。

SUMMARY: 实际上TD和对应的DP最大的区别就在于G(t)的计算，从这里可以体现出DP主要依靠的是当前值再所有出现的序列中的状态值的平均，而TD可以依靠其他变量进行递推的这点优势。

## n步时序差分

前面我们的递推式只考虑了一步差分来进行近似，但是实际上我们可以将差分式子变形，变成二次差分项

 
<div>
$$ G_t^{(2)} = R_{t+1} + \gamma R_{t+2} + \gamma^2 V(S_{t+1}) $$
</div>
 

也可以一次类推到n步的差分项，当n趋于无穷的时候，实际上就等价于MC方法了。

## TD（ $\lambda$ ）

n步时序差分选择多少步数是一个超参数调优的过程，为了再不增加计算复杂度的时候综合考虑所有步数的预测，引入一个新的[0,1]的参数λ，定义λ-收获是n从1到∞所有步的收获*权重的和，每一步的权重带有一定的比例，如下：

 
<div>
$$ G_t^\lambda = (1-\lambda)\sum_{n=1}^\infin \lambda^{n-1}G_t^{(n)} $$
</div>
 

因此我们就能得到TD（λ）的迭代公式：Q也是类似的，就不重新写一次了

 
<div>
$$ V(S_t) = V(S_t)+\alpha(G_t^\lambda - V(S_t)) $$
</div>
 

权重衰减的原因如下，随着n增大，权重成集合级数衰减，在T时刻把所有剩余的权重给最终状态，这样可以使得权重嘉禾为1，里当前越远权重越小。

![https://raw.githubusercontent.com/AikenH/md-image/master/img/1042406-20180824163740251-607605293.jpg](https://raw.githubusercontent.com/AikenH/md-image/master/img/1042406-20180824163740251-607605293.jpg)

从前向来看TD(λ)， 一个状态的价值V(St)由Gt得到，而Gt又间接由所有后续状态价值计算得到，因此可以认为更新一个状态的价值需要知道所有后续状态的价值。也就是说，必须要经历完整的状态序列获得包括终止状态的每一个状态的即时奖励才能更新当前状态的价值。这和蒙特卡罗法的要求一样，因此TD(λ)有着和蒙特卡罗法一样的劣势。当λ=0 时,就是第二节讲到的普通的时序差分法，当λ=1 时,就是蒙特卡罗法。

从反向来看TD(λ)，它可以分析我们状态对后续状态的影响。比如老鼠在依次连续接受了3 次响铃和1 次亮灯信号后遭到了电击，那么在分析遭电击的原因时，到底是响铃的因素较重要还是亮灯的因素更重要呢？如果把老鼠遭到电击的原因认为是之前接受了较多次数的响铃，则称这种归因为频率启发(frequency heuristic) 式；而把电击归因于最近少数几次状态的影响，则称为就近启发(recency heuristic) 式。

如果给每一个状态引入一个数值：效用(eligibility, E) 来表示该状态对后续状态的影响，就可以同时利用到上述两个启发。而所有状态的效用值总称为效用迹(eligibility traces,ES)。定义为：

 
<div>
$$ \begin{gathered}E_{0}(s)=0 \\E_{t}(s)=\gamma \lambda E_{t-1}(s)+1\left(S_{t}=s\right)=\left\{\begin{array}{ll}0 & t<k \\(\gamma \lambda)^{t-k} & t \geq k\end{array}, \text { s.t. } \lambda, \gamma \in[0,1], s \text { is visited once at time } k\right.\end{gathered} $$
</div>
 

![https://raw.githubusercontent.com/AikenH/md-image/master/img/20200218133233516.png](https://raw.githubusercontent.com/AikenH/md-image/master/img/20200218133233516.png)

可以看到一个状态要是重复出现的话都会让效用迹增加，不然的话就会一直衰减。

这样最终TD（λ）的股票公式就可以更新为：（反向公式这应该是）

 
<div>
$$ \begin{gathered}\delta_{t}=R_{t+1}+\gamma v\left(S_{t+1}\right)-V\left(S_{t}\right) \\V\left(S_{t}\right)=V\left(S_{t}\right)+\alpha \delta_{t} E_{t}(s)\end{gathered} $$
</div>
 

然后可以看出这两个公式是存在一致性的。

## TD控制问题求解

实际上还是使用同样的ε-贪婪进行策略和价值迭代。

在线控制最常见的是SARSA算法

离线控制比在线控制多了一个策略，用贪婪发来更新价值函数，用一样的来进行动作选择，最常见的是Q-Learning算法。