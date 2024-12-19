---
calendar_date: 2022-8-12
catalog: true
categories:
- Python
cover:
  image: /cover/cover24.jpeg
date: 2022-08-12 20:37:00
description: Create and Run Unittest for python in VsCode
lang: cn
mathjax: false
tags:
- Python
- VsCode
thumbnail: /img/header_img/lml_bg24.jpg
title: Python Unittest 单元测试的编写与执行
toc: true
---

该文章将介绍 Python 中的单元测试之 Unittest 模块，及其在 VsCode 中的集成和使用，主要参考的链接有以下的三个：

1. [Unittest的基本用法](https://blog.csdn.net/sinat_38682860/article/details/102838668)、[Python官方文档](https://docs.python.org/zh-cn/3/library/unittest.html)
2. [VsCode运行Unittest](https://blog.csdn.net/CloserSide/article/details/109175775)，其对应 VsCode 侧边栏中的“测试”模块，该部分就由本文来自行补充
3. 使用Unittest[模拟input的输入](https://blog.csdn.net/weixin_44520259/article/details/107840219)，便于测试基于命令行输入的代码



## 基本用法

在工作区中定义示例函数如下，基于该函数进行Unittest的测试和演示：

```python
# we save this function in function_module.py
def add_4_ut(a,b):
    return a+b
```

基本使用的代码如下：

```python
import unittest
from function_module import add_4_ut

# 使用TestCase基类构建测试样例和测试方法，运行的时候会对编写的所有测试方法进行测试
class TestAddFunction(unittest.TestCase):
    
    def test_ez(self):
        self.assertEqual(add_4_ut(3,5),8)
    
    def test_complex(self):
        self.assert(add_4_ut(1023,2032),3055)
    
    ...

# using the main function buildin the unittest, to run all the method we define in the TestCale.
if __name__ == '__main__':
    unittest.main()
```



### 模拟命令行输入

使用unittest.mock的patch模块进行输入输出模块的模拟和测试，具体的使用方法如下：

```python
import unittest
from unittest.mock import patch
from function_count import entry_point

# 使用TestCase基类构建测试样例和测试方法，运行的时候会对编写的所有测试方法进行测试
class TestAddFunction(unittest.TestCase):
    
    # 使用patch模块来替换默认模块中的input方法
    @patch('builtins.input')
    def test_ez(self, mock_input):
        # 利用return_value来模拟输入模块的输入
        mock_input.return_value = "1,2,3,4"
        self.assertEqual(entry_point(), 24)
```



## VsCode运行Unittest

VsCode配置了python的测试框架，更好的支持测试进程的进行，通过以下的方式进行相应的设置：

- 首先使用`ctrl`+`shift`+`p`调出命令行界面，输入`python configure test`，选择`unittest`，并选择放置`test_xxx.py`地址，以及测试文件的命名规则例如`test_<name>.py`的即可

- 在对应路径下编写对应的测试文件，可以在测试文件中出现，快捷测试的按钮，以及测试后的结果：

  ![image-20220813230817445](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/imgs/image-20220813230817445.png)

- 左侧的测试菜单也会显示当前路径下的所有测试方法，可以按照自己想要的方式进行测试。

  ![image-20220813230902633](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/imgs/image-20220813230902633.png)