---
calendar_date: 2021-10-27
catalog: true
categories:
- Python
cover:
  image: /cover/cover23.jpeg
date: 2021-10-27 14:19:13
lang: cn
mathjax: false
subtitle: my personal notebook for python, record basic knowledge
tags:
- Python
thumbnail: /img/header_img/lml_bg23.jpg
title: Python01 数据模型和常用数据结构
toc: true
---

个人的《Python Cookbook》 && 《Fluent Python》阅读笔记。

# 数据模型（Python结构的通用范式）

（Magic method）dunder method：Python特有的双下划线方法，这些方法能够支持Python进行特殊的调用，实现通用方法在新定义的数据结构上的使用，比如最典型的:

- `__len__()`后可以支持`len()`，获得结构的长度
- `__getitem__()`后可以支持`data[index]`来获取相应的元素，切片，等等数组的操作；

    ```python
    # 也可以支持类似如下的一些操作
    # 从数据结构中随机选出一个items
    from random import choice
    choice(datas)
    # 也可以支持迭代方法和反迭代方法
    for data in datas:
        ...
    for data in reversed(datas):
        ...
    # 也可以支持sort函数
    
    ```

到这里也就说明了，只要我们在数据结构（class）中定义了相应的dunder method，该class就能支持相应的一系列操作，getitems就可以类比为列表，相应的操作都能够在python解释器下自动的赋予支持。

还有一些好用但不常用的方法：

- `__contain__`实现的是`in` ，当没有实现contain的方法的时候会按照顺序在list中进行搜索
- `__abs__`
- `__repr__`实现的是输出的format设置，也就是print的时候的输出形式
- `__eq__` 实现的是  == 命令，同时in调用的是__eq__

下面附上一张特殊方法表：


### 基本命名规范

相关的文件和函数等命名规则。

[命名样例表](Python%20Notebook%20ad3f0aafe5a54942bdcc3694a9a88976/%E5%91%BD%E5%90%8D%E6%A0%B7%E4%BE%8B%E8%A1%A8%2039d2a928f8bf4624afc2e0006ffcd528.csv)


# 变量赋值传递时的引用和拷贝

Python 变量的传递类型：（赋值过程）
https://www.runoob.com/w3cnote/python-variable-references-and-copies.html

Python 赋值过程中不明确区分拷贝和引用，一般对静态变量的传递为拷贝，对动态变量的传递为引用。（注，对静态变量首次传递时也是引用，当需要修改静态变量时，因为静态变量不能改变，所以需要生成一个新的空间存储数据）。

```
•  字符串，数值，元组 均为静态变量
• 列表，字典为动态变量。
```

可以用id（）查看指向的地址

在修改列表值之类的时候要注意这一点，不然可能会影响到源列表，可能要使用深拷贝的方法，
copy.deepcopy()

python 定义方法时候指定[参数，返回值和变量的类型](https://www.cnblogs.com/xxpythonxx/p/12198876.html)：

```python
def test(a:int, b:str) -> str:
    print(a, b)
    return 1000

if __name__ == '__main__':
    test('test', 'abc')
```



# 类与函数

args，kwargs的用法和解包，主要将字典作为参数整体传入的这种方法值得学习

```python
可以用*，**定义和解包

```

id()可以获取变量的地址，type（）查看数据类型，isinstance判断类型

locals().keys() 获得当前已经声明的变量列表

sys.argv[0] 可获取当前工作区的地址

## 匿名函数

## 单下划线

定义的函数，属性，或者方法 这表明这个member是受保护的：

- 是用来指定私有变量和方法的方式（只是一种约定习惯）,不希望被下游的程序员直接访问的函数。
- 如果使用`from a_module import`导入时，这部分变量和函数不会被导入
- 但是如果使用 `import a_module`这样导入模块，仍然可以用`a_module._pythonPoint`这样的形式访问到这样的对象。

## Bool and or not

基本的就不用daaaaaaaaaaaaaaaaaaa说了，主要是一些特殊的用法举例

```python
# not 会先于 and 执行
if not flag1 and flag2 == True

```

用逻辑运算符做参数选择

```python
judge = index == 0 and num1 or num2

```

## Argparse

基本的用法：参考universal framework即可，主要是bool类型无法通过命令行传入

```python
# 使用store_true属性，就可以执行默认的True or False
parser.add_argument("--bool_chose",default=False ,action='store_true',help='a switch of bool variable')
# 👇选择上与原本完全是相反的
parser.add_argument("--bool_chose",default=True ,action='store_true',help='a switch of bool variable')

```

## Random

使用**sample**不重复的选取字典或者列表中的指定项

```python
list = [1,2,3,4,5]
choose = random.sample(list,2)

```

使用**choice**进行可重复的选取

```python
c_r = np.arange(20)
for i in range(10):
    c_i = random.choice(c_r)
    print(c_i)

```

**打乱列表排序**

```python
A = [1,2,3,4,5,6]
# 得到index的列表
B = np.arange(len(A))
# 对该列表进行打乱，通过打乱的列表进行索引
random.shuffle(B)
print(B)

```

# Logging System

[日志 HOWTO — Python 3.9.4 文档](https://docs.python.org/zh-cn/3.9/howto/logging.html#logging-basic-tutorial)；[日志操作手册 — Python 3.9.4 文档](https://docs.python.org/zh-cn/3.9/howto/logging-cookbook.html#logging-cookbook)

[Python logging模块](https://www.cnblogs.com/yyds/p/6901864.html)；[logging模块的简单使用](https://blog.csdn.net/hunt_ing/article/details/82080923)

## 基础使用

从一个非常简单的例子开始，默认的命令行输出等级是warning

```python
import logging
logging.debug('this message should only show up in log file')
logging.info('so do this one ')
logging.warning('this one will also show up in the console')
logging.error('And non-ASCII stuff, too, like resund and Malm')

```

假如我们设置log文件的存储以及输出的格式（包括算法运行的时间）

- 但是注意这个config是一次性设置，只有第一次设置是有效的

```python
logging.basicConfig(format='%(asctime)s %(levelname)s %(message)s ', datefmt='%Y-%m-%d %I:%M:%S %p',   filename="exampleFile.log",level=logging.DEBUG)
# 这里设置了文件的输出名称和输出的格式，以及相应的记录到文件中的等级

```

也可以从命令行设置日志等级,可以获取当前的等级

```bash
--log = INFO
# getattr 这个方法目前好像还有点问题，

```

## 进阶使用

通过4个module的组合来实现record log的功能，通过Logger载入多个Handler，可以通过不同的标准和方式在多个File以及控制台输出不同Level的东西，这就是主要的功能。

[Untitled](Python%20Notebook%20ad3f0aafe5a54942bdcc3694a9a88976/Untitled%20Database%209ccf70326eeb44a0b8e876f6a26ea12c.csv)

具体的实现样例如下：

```python
import logging

# create logger to record log messages
logger = logging.getLogger('textlogger')
# 避免等级c
logger.propagate = 0
logger.setLevel(logging.DEBUG)
# create file handler which logs even debug messages
fh = logging.FileHandler('exampleFile.log')
fh.setLevel(logging.WARNING)
# creatr console handler...
ch = logging.amHandler()
ch.setLevel(logging.DEBUG)
# create output format  for all the handler
formatter = logging.Formatter('%(asctime)s %(levelname)s %(message)s ',
                    datefmt='%Y-%m-%d %I:%M:%S %p')
ch.setFormatter(formatter)
fh.setFormatter(formatter)
# add handler to logger
logger.addHandler(ch)
logger.addHandler(fh)
# record logs
logger.debug('this message should only show up in log file {}'.format('test is'))
logger.info('so do this one ')
logger.warning('this one will also show up in the console')
logger.error('show up twice')

```

但是这种格式的时候怎么实现跨文件传输呢？

```python
再同个文件中我们只需要进行getlogger使用同一个名字即可获得同一个logger，但是跨文件的话可能还是需要传递logger把。

```

我认为应该传递该`logger`,然后通过该Logger进行统一的输出，遇到不同的输出要求的时候，我们可以对handler进行不一样的处理从而能够得到多样化的logger输出

## Logger与装饰器的组合使用

参见后续的装饰器解读模块

# FIles System

## Import manage

### __init__.py 文件的作用

[**init**.py 文件使用](https://www.cnblogs.com/BlueSkyyj/p/9415087.html)

其实主要就是控制着包的导入功能，使用`__all__`来对应`from package import *`的功能，我们可以在`init`中批量的导入我们需要的模块，这样我们就不在需要一个个的进行导入了，基于这种特性，我们也可以编写一个manage fuction，通过config来进行选择性的导入。

- 主要的左右是python中package的标识，不能删除
- 定义`__all__`用来进行模糊导入
- 编写python代码，会在import package的时候同时import，但是推荐在包中创建另外的模块来写，尽量保证该文件简单

## Path Manage

### 路径切分

将路径切分成地址和文件：

```python
import os
p,f = os.path.split(origin)
print("path == ",p)
print("file == ",f)

```

切分出文件的盘符和文件名

```python
dev,left = os.path.splitdrive(origin)

```

切分出文件和拓展名

```python
f,ext = os.path.splittext(origin)

```

## 文件遍历

### os.walk()

简单好用的**目录遍历器**用于在目录树中游走输出目录中的文件名，向上或者向下。

```python
os.walk(top,topdown,onerror,followlinks)

```

- top：遍历的目录地址
- （option）topdown：True的话优先遍历top目录，否则会优先遍历子目录
- （option）onerror：当需要异常的时候，会调用
- （option）followlinks：是否要跳转到快捷方式（或者软连接遍历）

**RETURN：（root，dirs，files）**

1. root：根目录
2. dirs：文件夹中所有目录的名字（子文件夹）
3. files：目录中所有文件的名字

**层序遍历每次是该层的所有文件和目录的名字**

### Glob.glob()

文件遍历方法

## 文件读写

# Data Structural

## 位运算

位运算判断奇偶一致性

```bash
# T：奇偶性不一致 F：奇偶性一致
(a ^ b) & 1
```

## 二进制操作

与或非就不用多说，主要是介绍一个module bitarray

## 序列构成的数组

这一部分主要有几个重点：**列表推导式的使用**、**元组特性和使用**

### 列表推导式的使用

```python
# 将字符串变成Unicode码位
symbols = 'sdac@#'
codes = [ord(symbol) for symbol in symbols if ord(symbol) >127]
# 与map和filter的比较
lists(filter(lambda c:c>127, map(ord,symbols)))

```

可以看出列表推导式的表达更为简洁易懂，而且实际上运行的效率也不低

### 使用列表推导式生成笛卡尔积

举例：每个size有不同的颜色

```python
colors = ['black','blue','red']
sizes = ['S','M','L']
# 先按颜色循环再按size循环，内外层循环的关系
tshirts = [(color,size) for color in colors for size in sizes]

```

### 生成器表达式

我们可以使用列表推导来初始化元组、数组、或者其他的数据类型，但是生成器表达式符合了迭代器的协议，可以逐个的产出元素，而不是先建立一个完整的列表，能够节省内存

**语法上和列表推导差不多，只不过把方括号换成圆括号而已**

```python
tuple(ord(symbol) for symbol in symbols)
import array
array.array('I',ord(symbol) for symbol in symbols)

```

**利用生成器表达式来计算笛卡尔积**

```python
# 这样可以更好的体现逐个生成的特性？但是实际上列表推导式也可以把？
# 但是总之是由这样的特性的，能够避免额外的内存占用
for tshirt in ('%s %s' %(c,s) for c in colors for s in sizes):
    print(tshirt)

```

### 元组不仅是不可变的列表

## 列表的基本操作

### 列表的条件加和

有不少类似和条件语句相关的操作，列举一些基本实例如下：

```python
# np.random.randint?
A = np.random.randint(0,3,5)
B = np.random.randint(0,3,5)
print('origin A　is {} \n And B is {}'.format(A,B))
# style 1 相当于转换成一个ToF的list，然后对这样的list直接进行sum
same = (A == B).sum()
print('\nthe num of same element in same posi is', same)

```

```python
'''列表的+=，也就是简单拼接操作'''
[1,2,3]+[2,3,4]

```

### 列表的数乘

列表的数乘是对列表的项数进行一个重复性的扩充，但是注意这种重复不能针对那种特殊类型（也就是赋值会直接基于地址的：引用？）
所以这是对于**项数的操作**而不是对列表中数值的直接操作，参考变量赋值的部分

```python
value = 5
unlist = [value]
outlist = unlist * 5
print('the output is like that : {}'.format(outlist))

```

### range函数常用操作

- https://docs.python.org/zh-cn/3.7/library/stdtypes.html?highlight=range#range
- range生成的并不是列表，而是一个range组而已

```python
reallist = list(range(20))
# range的步长设置
for i in range(0,20,5):
    print(i)

```

## Universal Method

### Sort（）对列表进行排序

sort用于对源列表进行排序，如果指定参数，则使用指定的比较函数
参考资料：https://www.runoob.com/python/att-list-sort.html

```python
# 纯数字的情况就按基本方式进行排列
list1 = [1,2,4,5,6,23,4]
list1.sort()
list1

# 类似的string就按找字母表进行逐项排序吧，我是这样理解的

```

## 队列queue & deque

## SET集合

https://www.runoob.com/python3/python3-set.html

{}可以定义字典，也可以用于创建集合
但是空的集合只能用set()定义（因为{}定义的是空字典）
基本的method：

1. add、remove、discard（也是移除，但是假如元素不存在的话也不会报错）
2. len，clear

主要是可以利用其中不会重复的元素的特性来进行特殊的操作

```python
basker = {'apple', 'organge', 'apple', 'pear'}
print('basker:', basker)
'orange' in basker

```

```python
a = set('go straight forward')
# 可以在集合中做交并等等集合的操作
```

### 利用set进行去重

如何利用set对unhashable的data structure进行去重，这里采取的方式是使用tuple对数组进行变换；

实际上unhashable的原因在于对象是可变对象：比如np.array，所以我们将其转换为不可变的tuple之后就可以进行hash的计算从而进行去重了。

```python
# 二维数组为例
array1 = np.random.rand(3,4)
array1_t = tuple(map(tuple,array1))
resume = np.array(array1_t)
# 进行转换的时候注意不要进行过度的拆分，上述的方法只适用于二维数组的情况，
text = ['abcsd','dsdc','cdsda']
text = tuple(text)
# 即可，不然可能会将其中的文本全部拆分出来
# 后续补充一下map的其他用法。[func,iterator?]
```

## Dict，Hashmap

实际上python中的字典就是hashmap的具体实现，是一个无序的结构

### 判断字典中的key是否存在的方法

**首先如果我们调用的key不存在的话**： `keyerror`

```python
>>> 'key1' in dict1
false

```

或者使用get方法，能给不存在的key赋予默认的value,在这个时候出现的则是`nameerror`

```python
>>> d.get('key1')
>>> d.get('key1', -1)
-1

```

### 字典中的常用方法

…

### collections.defaultdict 指定dict中未定义key的value

- 通过指定的默认值，在一些使用场景下可以对dict进行简化的定义
- 同时也能针对一些特殊的情况，比如说未见数据的情况，进行定义

```python
# 指定list类型用于未定义类别的填充
from collections import defaultdict
dict1 = {}
dict2 = defaultdict(list)
try:
    print(dict1['a'])
except:
    print('dict1 print key error')
    print('dict2 is like ', dict2['a'])

```

```
dict1 print key error
dict2 is like  []

```

```python
# 用法2，避免keyerror更容易对其进行赋值
from collections import defaultdict
bags = ['apple', 'orange', 'cherry', 'apple','apple', 'cherry', 'blueberry']
count = defaultdict(int)
for fruit in bags:
    count[fruit] += 1
print('the count output is like \n', count)
# print(locals().keys())

```

```
the count output is like
 defaultdict(<class 'int'>, {'apple': 3, 'orange': 1, 'cherry': 2, 'blueberry': 1})

```

```python
# 用法3：可以自定义函数作为初始化的函数参数
# 基于这样的方法我们可以定义各种各样的默认值
from collections import defaultdict
def defaultvalue(value=2): return value
dict3 = defaultdict(defaultvalue)
dict3['hello']

```

## Vars（）

**vars()** 函数返回对象object的属性和属性值的字典对象。

## Python中的数字日期时间计算

@Aiken 2020

@Source：《Python Cookbook》 Chapter3 数字日期和时间

主要针对Python中的数字数字运算的运算做一个笔记

### 获取本机时间的几种方法

主要为了**方便格式化时间**输出，我们需要将机器时间转换成指定的年月日之类的。
分别来自于time 和 datatime，这两种方式的时间复杂度好像实际上并没有太大的差别，姑且用着把暂时。

```python
import time
from datetime import datetime
def get_time(type=1):
    if type == 0: now = time.strftime('%m/%d:%H:%M')
    else: now = datetime.now().strftime('%m/%d:%H:%M')
    return now
get_time(0)

```

### 精确数字运算

我们知道python中的计算不是绝对精准的， 浮点的精度是有限的，但是当我们需要进行金融领域或者数学领域的一些高精度要求的计算，可以为其牺牲一定的复杂度的时候👉decimal模块

```python
from decimal import Decimal
a = Decimal('4.2')
b = Decimal('2.1')
print(a + b, a+b==Decimal('6.3'))
# 注意数据的类型实际上也是Decimal
# 能控制计算的每一方面，包括数字位数和四舍五入之类的，需要创建一个本地的上下文
from decimal import localcontext
# 精确度控制
with localcontext() as ctx:
    ctx.prec = 3
    print(a/b)

```

**计算方法中的大数吃小数的情况**

(运算中的量纲差异超过17位的浮点数精度的情况)使用math.fsum()函数

```python
import math
nums = [1.23e+18，1，-1.23e+18]
assert sum(nums) != math.fsum(nums), 'the correct ans is fsum {}, error ans is sum {}'.format(math.fsum(nums),sum(nums))
# we can find it what we meet and waht we want.

```

### 数字的格式化输出

控制输出的格式（精确度，对齐，千分位分割符）`format`

```python
x = 1234.56789
anslist = []
value = format(x, '0.2f')   # 👈 两位小数
anslist.append(value)

```

[Untitled](Python%20Notebook%20ad3f0aafe5a54942bdcc3694a9a88976/Untitled%20Database%20400b9d461cf240e18dd2268ce561adf1.csv)

**进制转换：**

> 2,8,16 -> bin（） oct（） hex（）  OR format(x, ‘b’) format(x, ‘o’) format(x, ‘h’)

**复数运算**

> `complex(real, imag)``numpy`好像能处理复数`cmath`一些math无法处理的复数运算

**正负无穷于NaN（非数字）**

> inf，-inf，nan， 可以使用float(‘inf’)创建验证 `math.isinf()`

**分数运算**

> Fractions（5，4）==5/4.numerator 分子 .denominator 分母

# 迭代器

主要包括迭代的模块和解包的一些相关操作：

### enumerate 、items、zip

1. `enumerate`可以将可迭代对象，除了dict，解压出来，并自带序号（多加入一个维度）。
2. 字典的解包主要靠`items（）`
3. `zip`将可迭代对象作为参数，把每一项可迭代对象中取出一个值，组合成一个个元组，，然后返回。

    ```python
    for a,b,c in zip(A,B,C):
        ...
    
    ```

# 元编程

## Some Rules

- `->`in python: 常常出现在python函数定义的函数名后面，为函数添加元数据，描述函数的返回类型，从而方面开发人员使用。
- 拓展：进行函数内的参数定义的时候也可以用冒号指定类型，以及默认值

    ```python
    def func(isPre: bool = True): pass
    
    ```

-

## 装饰器模块

装饰器在我个人的理解里面更像是一个嵌套的函数结构，编写装饰器实际上是为了给函数**套壳**，最根本的目的仍然是为了repeat coding，而这样的写法最直接适用的有以下的几种情况：

- Timing or Logging
- 当成函数指针进行函数的传递（但是这点上实际上用类传递的方式可能会更常见一点）

### Basic Type

最基本的编写样例：

```python
import time
from functional import wraps
def timethis(func):
    '''Decorator that report the execution time.
    this Decorator can not accept parameters'''
    # 通过下面这个内置的装饰器来保留func的元信息 __name__ __doc___之类的
    @wraps(func)
    def wrapper(*args,**kwargs):
        # * ** 来保证可以对func传入各种参数
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(func.__name__, end - start)
        return result
    return wrapper

```

### 接受参数传递

但是这个装饰器实际上不满足我们的需求，我们希望装饰器能**接受传入的参数**，这样的话，我们才能更好的进行print或者是使用logging这个模块。

Then we can write it like this :

```python
# 实际上直观的理解的话，就是在外面再多嵌套一层函数，通过这个函数来对我们的decorator传递需要的参数
from functional import wraps
import logging

# 实现对装饰器的参数传递，同时和
def logged(level, name=None,message=None):
    '''通过最外层接受参数并将其传递到内层的装饰器中'''
    def decorate(func):
        # setting paramter we passing here
        logname = name if name else func.__moudule__
        log = logging.getLogger(logname)
        logmsg = message if message else func.__name__

        @wraps(func)
        def wrapper(*args,**kwargs):
            log.log(level,logmsg)
            return func(*args,**kwargs)
        return wrapper
    return decorate

# 但是实际上我们要传递的就是一些输出结果，所以我们不需要用到这一点，只要再内部赋予logging就行了，所以这里我们设定的就是基本的level和logger_nanme

```

### 修改装饰器参数

对上面这个装饰器模块进行简单的改进，**就能使得用包装器包装的函数，能够调用附加函数来修改装饰器的参数**

（相当于赋予被装饰方法一个对装饰器的类外访问函数）

```python
# 这里有个模块就比较猎奇了，以前倒是没见过
from functional import wraps,partial
import logging

# utility decorator to attach a functional as an attribute of obj
def attach_wrapper(obj, func=None):
    if func is None:
        return partial(attach_wrapper, obj)
    setattr(obj, func.__name__,func)
    return func

#原有装饰器上面添加东西即可
def logged(level, name=None,message=None):
    '''通过最外层接受参数并将其传递到内层的装饰器中'''
    def decorate(func):
        # setting paramter we passing here
        logname = name if name else func.__moudule__
        log = logging.getLogger(logname)
        logmsg = message if message else func.__name__

        @wraps(func)
        def wrapper(*args,**kwargs):
            log.log(level,logmsg)
            return func(*args,**kwargs)

        '''使用nonlocal添加属性修改的模块'''
        @attach_wrapper(wrapper)
        def set_level(newlevel):
            nonlocal level
            level = newlevel

        @attach_wrapper(wrapper)
        def set_message(newmsg):
            nonlocal logmsg
            logmsg = newmsg

        return wrapper
    return decorate

@logged(logging.DEBUG)
def add(x,y):
    return x + y

@logged(logging.CRITICAL,'example')
def spam():
    print('Spam')

# 使用范例:可以再类外调用内内的属性设置了
add.set_message('add called')
add(2,3)

add.set_level(logging.WARNING)
add(2,3)

```

### 带可选参数的修饰器

```python
# 感觉没太理解这个文章中说到的不带参数的意思，难道可以不传入函数吗
# 先把模板放在这
def logged(func = None, *, level=logging.DEBUG,name=None, message=None):
    if func is None:
        return partial(logged,level=level,name=name,message=message)
    logname = name if name else func.__moudule__
    log = logging.getLogger(logname)
    logmsg = message if message else func.__name__

    @wraps(func)
    def wrapper(*args,**kwargs):
        log.log(level,logmsg)
        return func(*args,**kwargs)
    return wrapper

```

### @property的用法

将类别方法转换为类别属性，可以直接用.获取属性值或者对属性进行赋值。

**具体的实现和要求在后面再看看**

# Exception

@Aiken 2020

Python的异常处理操作：主要内容包括捕捉异常，抛出异常，基于异常进行判断处理等。
基本原理:

参考资料：  [python3_错误和异常](https://www.runoob.com/python3/python3-errors-execptions.html) 、 [python3_错误和异常2](https://www.runoob.com/python/python-exceptions.html)

## Python3 错误和异常

**错误：**一般语法解析器的解析错误，换句话说也就是基本的语法错误。
**异常：**语法正确，但是运行期间出现的错误，

异常有很多种类：未定义，类型异常，除数0异常，etc.
...在附录附加常用常见的错误类型

## 异常捕捉try except

通过try exception 捕捉可能会出现的异常，然后用except，指定当该异常出现时候要执行的命令，可以指定多种异常。

基本的算法流程是：

- 首先，执行 try 子句（在关键字 try 和关键字 except 之间的语句）。
- 如果没有异常发生，忽略 except 子句，try 子句执行后结束。
- 如果在执行 try 子句的过程中发生了异常，那么 try 子句余下的部分将被忽略。如果异常的类型和 except 之后的名称相符，那么对应的 except 子句将被执行。

如果一个异常没有与任何的 except 匹配，那么这个异常将会传递给上层的 try 中。
完整的算法逻辑如图所示👇，通常可以指使用t-e部分即可

![https://raw.githubusercontent.com/AikenH/md-image/master/img/try_except_else_finally.png](https://raw.githubusercontent.com/AikenH/md-image/master/img/try_except_else_finally.png)

Image1

```python
#主要依赖模块
import time
import sys
```

**写法的优点**

- 在可预见的Exception出现的时候不会中断程序的进行， 可以以指定的方式进行规避，或者针对该情况进行特定的异常处理。

**else的优势**

- 如果try中出现了多个异常，我们可能会忽视其中的一些异常。
- 可以针对性的进行异常算法设计，这样会使得可读性和便于分析。

```python
# 用try except的方式最好的一点在于，他不会终端程序的执行。
try:
    x = int(input("please type in NUMBER "))
except ValueError:
    print('your input is not NUMBER')

# if we donot use t-e
x = int(input("repeat you input"))

# 通过对比，我们可以知道这样执行的好处，在一些无关紧要的地方，
# 可以让程序继续运行而不必因为这些而中断。

```

### exception的多种写法和多异常分支

try中的语句可能有**多种异常抛出**的情况：

1. 针对不同的异常进行处理。
2. 统一处理不同异常。
3. 统一处理所有类型

以上面的代码为例：

1. try except except ...
2. EXCEPT (TUPLE)
3. except不带任何参数

```python
# type 1
try:
    x = 123
except ValueError:
    t = 123
except TypeError:
    y = 123

# type 2
try:
    x = int(input("please type in NUMBER "))
except (ValueError,TypeError,NameError):
    print('your input is not NUMBER')

```

**Try Import** 使用try的结构来避免import过程中出现的问题：

[Python try import (programcreek.com)](https://www.programcreek.com/python/?CodeExample=try+import)

```python
def try_import(package, message=None):
    try:
        return __import__(package)
    except ImportError as e:
        if not message:
            raise e
        raise ImportError(m)
```

## 抛出异常 Raise Exception

使用raise 语句能够抛出指定类型的异常，从而终止程序的运行，和assert断言起到相似的作用。

**关键用法：**设置异常抛出，然后用try except捕捉，然后进行指定的分支操作。
`raise [Exception [, args [, traceback]]]`

![https://raw.githubusercontent.com/AikenH/md-image/master/img/raise.png](https://raw.githubusercontent.com/AikenH/md-image/master/img/raise.png)

raise_exception

```python
x = 10
if x >= 5:
    raise Exception('x 不能大于5，当前值为 {} '.format(x))

```

# Numpy Tips

## reshape

和numpy格式的reshape的相关内容整合

1. 基本reshape的使用
2. reshape不改变原数据

```python
bk1_a = np.array([1,2,3,4,5,6,7,8])
bk1_b = np.array([[1,1,1,1],[2,2,2,2]])
bk1_c = bk1_a.reshape(bk1_b.shape)
print("b's datashpe is {}".format(bk1_b.shape))
print("reshape by b。shape is ↓ \n {}".format(bk1_c))
# 测试是否改变原数据
print("b's shape is {} ".format(bk1_b.shape))
assert bk1_a ==  bk1_c, 'do not change the origin data, a is like {}'.format(bk1_a)

```

## tolist

numpy array 和list之间的互相转换，在大规模编程中有比较广泛的应用场景。

- **有^次方的意思
- arange 包含下限，不包含上线

```python
bk2_a= (2 ** np.arange(4,6))
# bk2_a
bk2_b = bk2_a.tolist()
# bk2_b

```

## 用array给list中的元素赋值

以下是这种方式建立一个类似one-hot的函数介绍
可以很容易的从输出看出规律，而且最外层仍然是列表，也就是其中的元素是array

```python
list1 = [1,2,3,4,12,3,4]
for i in range(len(list1)):
    temp = list1[i]-1
    list1[i] = np.zeros(13)
    list1[i][temp] = 1
list1

```

## flatten & flat operation

flatten：将数据摊开降维成一维的数组/矩阵，以副本形式生成，不影响原数据
flat，生成一个迭代器，按行的形式迭代

```python
# A:flatten function B:flat function
bk3_a = np.random.rand(2,3)
print('A is just like\n {}'.format(bk3_a))
bk3_a2 = bk3_a.flatten()
print('A2 is just like\n {}'.format(bk3_a2))
printz('********************clip*************************')
bk3_b = np.random.rand(2,3)
print('B is just like \n{}'.format(bk3_b))
print(bk3_b.flat, 'as we can see, this is a iter')
for i in bk3_b.flat:
    print(i)

```

## Numpy.pad

pad，就是拓展原本数据的维度，方便后面机器学习中的其他步骤，主要用处包括：

1. 维度保持
2. 增加对图像边界的重视

```python
## numpy.pad
x = np.random.randint(0,5,(3,4,4))
x = np.pad(x,2)
print(x.shape)
h,w = x.shape[1:]
new_h,new_w = 3,3

top = np.random.randint(0,h-new_h)
left = np.random.randint(0,w-new_w)

x = x[:,top: top+new_h,left:left+new_w]
x.shape

```

## :: Numpy 索引中双冒号的实际用途

参照该文章进行分析，主要用途包括：对图像进行反转等操作
https://blog.csdn.net/GracePro/article/details/102079331

```python
a = np.random.rand(3,2,2)
print(a)
print('----------------------------')
a = a[:,::-1]
print(a)

```

## Argpartition()

借助于 argpartition()，Numpy 可以找出 N 个最大数值的索引，也会将找到的这些索引输出。<br>然后我们根据需要对数值进行排序。

```python
x = np.array([12, 10, 12, 0, 6, 8, 9, 1, 16, 4, 6, 0])
index_val = np.argpartition(x, -5)[-5:]
index2 = np.argmin(x)
print(index2)
index_val

```

基于numpy的sort函数，输出找出的最大的几个数，要全体排序的话，还是考sort

```python
np.sort(x[index_val])

```

## Allclose()

allclose() 用于匹配两个数组，并得到布尔值表示的输出。如果在一个公差范围内（within a tolerance）两个数组不等同，<br>
则 allclose() 返回 False。该函数对于检查两个数组是否相似非常有用。

```python
array1 = np.array([0.12,0.17,0.24,0.29])
array2 = np.array([0.13,0.19,0.26,0.31])
# with a tolerance of 0.1, it should return False:
print(np.allclose(array1,array2,0.1))
# with a tolerance of 0.2, it should return True:
print(np.allclose(array1,array2,0.2))

```

## Clip()

使得一个数组中的数值保持在一个区间内。有时，我们需要保证数值在上下限范围内。为此，我们可以借助 Numpy 的 clip() <br>函数实现该目的。给定一个区间，则区间外的数值被剪切至区间上下限（interval edge）。

```python
x = np.array([3, 17, 14, 23, 2, 2, 6, 8, 1, 2, 16, 0])
np.clip(x,2,5)

```

## extract()

顾名思义，extract() 是在特定条件下从一个数组中提取特定元素。
借助于 extract()，我们还可以使用 and 和 or 等条件。

```python
array = np.random.randint(20, size=12)
print('basic array is {} '.format(array))
#  Divide by 2 and check if remainder is 1
cond = np.mod(array, 2)==1
print('是否符合条件的list，条件list\n  {}'.format(cond))
# Use extract to get the values
# 提取出表现为True的哪些元素
print('按照条件提取出元素:\n {}'.format(np.extract(cond, array)))

# Apply condition on extract directly
# 更直接的指定条件
print('复杂条件下的表现情况')
print(np.extract(((array < 3) | (array > 15)), array))

```

## where()

Where() 用于从一个数组中返回满足特定条件的元素。比如，它会返回满足特定条件的数值的索引位
Where() 与 SQL 中使用的 where condition 类似，如以下示例所示：

```python
y = np.array([1,5,6,8,1,7,3,6,9])
# Where y is greater than 5, returns index position
print(np.where(y>5))
# First will replace the values that match the condition,
# second will replace the values that does not
print(np.where(y>5, "Hit", "Miss"))

```

# DEBUG

记录一些典型错误，便于后续Debug的时候查找原因

## 避免重复/冲突的import

在工程实现中，对于同一个module。最好能做到**不需要重复的import**，但是在跨文件的工程项目中，或者说是一些跨文件调用的情况下，可能有一些基本的module会需要这样的时候，那我们最好做到**不冲突**，以同样的形式来进行import，不然有时候这样的重定义方式会出现一定的问题或者bug。
for example `from time import time` 和 `import time`同时出现的情况。

## 内存调用与Method的定义

在较为复杂的工程项目中，应该使用Method（Function）模块化的解决问题；这样做的优势可以从一下几点来看：

1. 易于阅读分析，写好相关method的Doc，然后做好注释，方便阅读和后续修改
2. 能够在迭代过程中有效的释放暂态的变量，节约在主进程中无效的参数存储空间，节省内存或者显存。

## TypeError：

一：**cannnot unpack not-iterable NoneType object**（无法解包非迭代类型的NoneType对象）

```python
def test():
    if value == 1:
        a=b=1
        return a, b
a,b = test()
print(a,b)

```

**原因分析**，当python函数没有确定的return的时候默认的返回值是None，这样在进行检查的时候，就会到导致编译的错误

**解决**：指定默认的return，或者使用else方法完善所有情况下的return值的个数是一致的

二：**missing 1 required positional argument： “self”**

对象的声明需要括号，我们可能在调用类内函数的时候，用错了变量，用了**类而不是类的实例**去调用这个函数，导致执行出现了错误。

三：**builtin_function_or_method  error**

很多时候都是由于前面的数据操作少加了`()`导致的问题

四：**bad operand type for unary -: ‘NoneType’**

输入的数据存在着值为空的情况，可能没定义之类的，问题要根据后面的具体报错来进行分析。