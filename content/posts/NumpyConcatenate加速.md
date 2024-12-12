---
calendar_date: 2023-07-02
catalog: true
categories:
- Python
cover:
  image: /cover/cover0.jpeg
date: 2023-07-02 10:52:26
lang: cn
mathjax: false
subtitle: null
tags:
- Python
- Numpy
thumbnail: /img/header_img/lml_bg0.jpg
title: NumpyConcatenate加速
toc: true
---

>[!error]+
>多次循环进行 Numpy Concentrate 操作后，当原始数组变得过大的时，单步处理时间会逐渐变长，处理大量数据的时候时间成本极高。

## 解决思路

这里简单的讲一下问题的定位过程，通过装饰器 Check 每个函数的执行时间，重点关注执行时长逐渐变长的部分。

```python
from time import time

def timer(func):
    def func_wrapper(*args, **kwargs):
        time_start = time()
        result = func(*args, **kwargs)
        time_end = time()
        res = time_end - time_start
        print("{} cost time: {} s".format(func.__name__, res))
        return result
    return func_wrapper
```

就会发现当 np.Concatenate 导致 Array 很大之后，运行就会逐渐减缓。由于运行缓慢是由于对大数组操作导致的，因此这里考虑将大数组切分成多个小数组，然后再最后进行合并。

```python
with open(file, 'r') as rf:
	for line in rf:
		...
		new_row_array = ...
		key = ...
		if len(res_list[key][-1]) == 0 :
			res_list[key][-1] = new_row_array
		else:
			if len(res_list[key][-1]) >= MAX_LENGTH:
				res_list[key].append(new_row_array)
			else:
				res_list[key][-1] = np.concatenate([
					res_list[key][-1], new_row_array
				])
	for i in range(len(res_list)):
		res_list[i] = np.concatenate(res_list[i], axis=0)
```

可以看上述这段代码，通过对-1 的使用，来自动的切分 Array，最后再整体合并，这样就能避免每个数组过大的问题。

本地实验测试也成功，将原本耗时 400s 的处理过程减少到了 30s

## Fi