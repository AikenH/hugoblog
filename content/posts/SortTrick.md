---
calendar_date: 2021-12-06
catalog: true
categories:
- Algorithm
cover:
  image: /cover/cover14.jpeg
date: 2021-12-06 17:05:03
description: Implementation of Sorting Algorithm
lang: cn
mathjax: true
tags:
- Algorithm
- Sort
thumbnail: /img/header_img/lml_bg14.jpg
title: Algorithm Sort
toc: true
---

记录各种排序操作，暂时不补充最基础的排序方式和理论，只记录排序算法的拓展应用。

在理论分析的部分主要使用cpp进行撰写，而在具体使用的时候，目前会主要按照python来进行编写，这主要是面向的场景不同决定的。

>基础的排序理论，包括快排等等算法的分析在另一篇文章中记录（当初实习准备的时候有整理过，后续重新整理出来）

## 排序算法和理论

placeholder

## 排序算法应用

placeholder

### 同步排序

常用于Machine Learning中，将数据集中的数据和标签进行同步排序，避免打乱其中的对应关系。

使用numpy的 `argsort`功能来进行排序：
```python
idx = np.argsort(labels)
labels = labels[idx]
datas = datas[idx,...]
```


使用`sort`中的`args: key`来进行同步排序，选出一个作为依据, 但是这种方式不支持存在np的情况，因为np无法建立hash，除非我们转化成tuple再转回来。

```python
# 默认按照第0维度进行排序
lables, datas = [list(x) for x in zip(*sorted(zip(labels, datas)))]
# 若要指定特定维度
from operator import itemgetter
datas, labels = [list(x) for x in zip(*sorted(zip(datas, labels), key=itemgetter(1)))]
```

额外介绍**我的愚蠢**实现思路：

- 用 $index/length$  作为小数位添加到 $labelList$ 上
- $SORT$ 排序列表，分离并复原Index
- 基于Index对列表进行排序赋值

```python
def sort_dataset(dataset):
    # the num_new_class can be calculate by some formula, but in this part make it HARD
    # sort those data and label which make it easier to del class.
    num_data = len(dataset)
    up_limit = pow(10, len(str(num_data)))
    index = [index /up_limit for index in num_data]
    
    # using this mark to sort the data
    for i, _ in enumerate(dataset.targets):
        dataset.targets[i] += index[i]
    dataset.targets.sort()
    
    # get the new order 
    new_order = [target - int(target) for target in dataset.targets] * up_limit
    dataset.targets = [int(target) for target in dataset.targets]
    # it's necessary for us to swith to list or not?
    dataset.data = list(np.array(dataset.data)[new_order])

    return None
```