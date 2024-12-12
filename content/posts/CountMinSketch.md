---
calendar_date: 2023-03-10
catalog: true
categories:
- Matching Algorithm
cover:
  image: /cover/cover9.jpeg
date: 2023-03-10 13:12:20
lang: cn
mathjax: false
subtitle: 计算大规模数据流中的元素出现频次的方法
tags:
- Matching
thumbnail: /img/header_img/lml_bg9.jpg
title: Count_Min Sketch算法
toc: true
---

本文介绍计算大规模数据流中的元素出现频次的方法 CMS，以及其简单改进Count-Mean-Min-Sketch

## Intro & Scene

在大数据场景下，比如网页的 TopK 问题，爬虫的是否访问过的问题，都是一种出现频次相关的问题，那么在系统设计的时候，如何选择策略和数据结构去存储相关的数据是最高效合适的呢？

计算元素的出现频次，如果出现与普通的场景下，简单的方案就是用 `hashmap` 来记录元素出现的次数：

```cpp
std::unordered_map<std::string, int> freq;
for(const auto& e: elements){
	if (freq.find(e) == freq.end()){
		freq[e] = 1;
	}else{
		freq[e] += 1;
	}
}
```

但是这种方式在大量数据流的情况下，如果存在大量唯一元素的情况下，会占用大量的内存，导致其**无法应对大数据场景**，因此在"时间换空间"like 的策略选择中，这里就需要考虑通过时间，或者准确率等其他的因素来换空间。

通常来说，针对大数据场景，会无限扩张的数据结构显然是不适用的，所以希望能用固定的空间来进行计数的管理，同时希望尽量不要影响到运行的时间，换言之，可以牺牲掉一定的准确性，来实现节省空间的效果。

基于上述需求，我们可以想到 Hash 算法：将无限大的空间映射到固定的 size 的输出上；而大数据场景下的 Hash 会遇到冲突会被无限放大的问题，如何解决冲突是最核心的问题

- 基于概率数据结构实现的 Blomm Filter 算法采取多 Hash 的方法来减少冲突
- 而其衍生出来的 CMS 算法以同样的思想，基于不同的设计，更为适应这种计数场景

下面介绍该方法的具体实现

## CMS 的具体实现

首先第一点，通过 hash 来实现数值空间的转换，通过哈希函数 H 将输入元素 x 映射到一维数组上，通过该 index 的值来判断元素的 Count（是否存在）

```cpp
# 伪代码
vector<int> array(size, 0); 初始数组
for (auto x : input_element)
{
	idx = H(x);
	array[idx] += 1;
}
```

实际上这就是 Blomm Filter 的基础思想，然而无论是定长数组的"有限"还是 Hash 函数本身，都需要考虑冲突问题（两个元素被映射到同一个 index 上），冲突会导致 Count 比真实的大。

于是接下来面临的问题就是：如何降低冲突的概率？如何提高计数的准确性（实际上也包含在降低冲突的概率中）

可以参考 Bloom Filter 的策略，其通过多个 Hash 函数来映射同一个数，从而来降低元素的冲突概率（未考虑超大数据场景），进而也能提高计数的准确性，那么我们看一下 bloom filter 方法：

> Bloom Filter 算法解决的是存在性问题，因此只需要一个 01 向量，当且仅当所有 Hash 计算出来的 index 的值都为 1 的时候，这个元素才可能存在；

考虑将该方法向 Count 问题上迁移：

- **计数过程中**：使用 n 个 Hash 函数计算 idx{1~n} ，然后 `vec[idx[i]] += 1` 对技术+1
- **查询过程中**：使用 n 个 Hash 函数计算 idx{1~n}，然后取 `vec[idx[i]]` 的最小值，考虑冲突场景可知，这个最小值>=实际的 count。

```cpp
int query_count = INT_MAX;
for (size_t i=0; i < function_size; ++i){
	int idx = Hash[i](query);
	int tmp_count = count_set[idx];
	query_count = (tmp_count < query_count)? tmp_count: query_count;
}
```

实际上取多个 hash 的最小值就是 Count-Min Sketch 的核心，但如果仅是如此很明显有个问题，就是多个 hash 函数算出的多个 idx 会进一步的“污染”计数，得不偿失，导致 Count 更加不准确。

实际上很容易想到，为了通过多个 hash 来减少冲突，并使得多 hash 的索引更加的唯一，最好的办法就是使得每个 hash 对应的计数空间是独立的，也就是将我们的计数空间在拓展成二维数组，其 size 为 $depth \times width$ 其中 depth 就代表 hash 函数的个数。

那么假设每个 Hash 函数的冲突概率是 $p_i$ 那么优化后的冲突概率就从 $min(P_i)$ 减小到

 
<div>
$$ 
P = \prod_{i=1}^{n} p_i
 $$
</div>
 

```cpp
for (size_t i=0; i<function_size; ++i){
	int idx = Hash[i](query);
	int tmp_count = count_set[i][idx];
	query_count = (tmp_count < query_count)? tmp_count: query_count;
}
```

结合了这个二维数组就是完整的 CMS 算法了，最终求得的 count 是实际 Count 的近似值（上界）。

### CMS 的参数选择

如果确定使用 CMS，接下来面对的就是计数的精度问题，那么如何选择这个数组的 shape 才能尽可能的减少误差呢？（很明显都是越大越好，那么怎么样是最优/达标的呢）

确定一些变量参数：

- 数据流大小： $n$ 
- 实际计数： $c_x$ 
- 估计计数： $\hat c_x$ 
- hash 函数数目 $k$ ，存储向量长度 $w$ 

设定误差范围：

 
<div>
$$ (c_x \leq \hat c_x \leq c_x + \epsilon n) $$
</div>
 

以及结果在这个范围内的概率为: 

 
<div>
$$ 
P(c_x \leq \hat c_x \leq c_x + \epsilon n) \geq 1-\sigma
 $$
</div>
 

那么可以计算出： $e$ 是自然常数

 
<div>
$$ 
d = [\frac{e}{\epsilon}] , w = [ln(\frac{1}{\sigma})]
 $$
</div>
 

计算公式来自论文，有效性分析也可以从论文中阅读

>添加一个新哈希函数以指数级别迅速降低超出边界异常数据的概率；当然，增加矩阵的宽度也可以增加减少冲突的概率，但这个只是线性级别。


### Count-Mean-Min-Sketch 

由于 Hash 的冲突，CMS 对于低频的元素误差还是太大了，引入噪音对于高频元素可以接受（topk）但是对于低频长尾来说太不准确了，因此有了以下的改进：

- 首先按照 CMS 的流程取出 d 可 sketch
- 对于每个 hash 估计出一个噪音，噪音为该行的所有整数（除了被查询元素）的平均值
- 该行的 sketch 减去该行的噪音，作为真正的 sketch
- 返回 d 个 sketch 的中位数

```cpp
class CountMeanMinSketch {
    // initialization and addition procedures as in CountMinSketch
    // n is total number of added elements
    long estimateFrequency(value) {
        long e[] = new long[d]
        for(i = 0; i < d; i++) {
            sketchCounter = estimators[i][ hash(value, i) ]
            noiseEstimation = (n - sketchCounter) / (m - 1)
            e[i] = sketchCounter – noiseEstimator
        }
        return median(e)
    }
}
```

该算法显著改善了在长尾数据上的精确度。

## 其他解决方式

### 数据分片 + Hashmap

假设有 k 台机器，使用以下的方式进行分片后进行 hashmap 的存储，但是这种方式基本上不降低什么存储需求。

```cpp
hash(elem) % k = i
```

## Reference
-  [Bloom Filter](https://zhuanlan.zhihu.com/p/140545941) 
-  [CountMinSketch](https://zhuanlan.zhihu.com/p/369981005) 
	- [Paper](https://www.cse.unsw.edu.au/~cs9314/07s1/lectures/Lin_CS9314_References/cm-latin.pdf)
	- [Top K Problem](https://www.youtube.com/watch?v=kx-XDoPjoHw&ab_channel=SystemDesignInterview)
	- [iwiki](https://en.wikipedia.org/wiki/Count%E2%80%93min_sketch)
	- [Advanced Data Structures: Count-Min Sketches - YouTube](https://www.youtube.com/watch?v=mPxslXpg8wA&ab_channel=NiemaMoshiri)
- [Hash](https://www.liaoxuefeng.com/wiki/1252599548343744/1304227729113121) 
- [频率估计 System Design](https://soulmachine.gitbooks.io/system-design/content/cn/bigdata/frequency-estimation.html)