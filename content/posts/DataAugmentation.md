---
calendar_date: 2021-11-28
catalog: true
categories:
- Machine_Learning
cover:
  image: /cover/cover23.jpeg
date: 2021-11-28 06:24:20
description: null
lang: cn
mathjax: false
tags:
- ML-DataProcessing
thumbnail: /img/header_img/lml_bg23.jpg
title: Data Augmentation
toc: true
---

intergrate with those augmentation method.

this doc will

- Record those theory and the effect after transformation
- Show the codes for ez use

And the complete `.py` will be intergrate in my classification pipeline

**reference** below:arrow_down_small:, if use them,start it for respect for his work.

- [aleju/imgaug](https://github.com/aleju/imgaug#documentation)
- :star:[albumentations-team/albumentations: ](https://github.com/albumentations-team/albumentations)
- [torchvision](https://pytorch.org/vision/stable/transforms.html#transforms-on-pil-image-and-torch-tensor)
- [PIL/ImageEnhance CCBS](https://pillow.readthedocs.io/en/stable/reference/ImageEnhance.html)
- opencv

## Principle

**Principle 1** of coding: Don’t reinvent the wheel unless it’s needed

- 具体而言，仅在函数的拓展性较差，无法对其定制化，满足我们的日常需求的时候，我们会自行编写函数从而满足我们的需求，否则我们直接引用已知的库，提升我们的实现效率。




**Principle 2** of coding 图像增强的两种使用方式：

- 做全集的增强后存储在本地，然后通过**随机**载入或者按一定**batch**的载入来实现我们增强的作用，（or contrasive），这种方式实际上是使用空间来换时间，由于处理是一次性的，所以如果空间充足的话，是更为充足的方式。

- 动态的在线增强：这种方式比较消耗io和cpu，不推荐，但是如果本地的空间不够，就只能采用这种方式了。

**Principle 3** of saving 如果我们要存储本地副本的话，推荐的存储格式和方式

- **文件格式**：`npz` 由于多种增强，实际上这种方式还蛮适合使用`npz`格式作为我们的存储，这种既保留了对应的`np`还可以保留对应的字典信息，此外这种方式的存取速度也不算慢，（相较之下好像没有特别突出的一种格式）

- **路径格式**：`imagenet`也就是对应的train-class-data的层级关系，通过这种约定俗称的存储关系我们得以在我们框架中的dataset格式方便读入

## PIL，CV2，SkImage的选择

[pytorch图像的加载/读取方式](https://www.jianshu.com/p/cfca9c4338e7) | [cv2、PIL、matplotlib](https://zhuanlan.zhihu.com/p/357069891) 

在这里讲解三个模块之间的基本区别和其中的选择，目前希望将已有的算法从PIL转向CV2，后续也会添加一下三个模块对于Torch的适配性等等

### 数据读写

基于下列的代码和注释给出相应的之间的区别，通过这些区别我们可以知道几乎所有的格式在使用的时候都是需要对应的转换的，

```python
import cv2
img  = cv2.imread('lena.png') # numpy格式，HWC，【0，255】，BGR
img = cv2.cvtColor(img,cv2.COLOR_BGR2RGB) # 除了最下方的转换方式外也可以通过这种方式进行转换
cv2.imwrite('lena.jpg', img) # img 需为BGR格式的numpy array

import PIL
from PIL import Image
img = Image.open('lena.png') # PIL格式，RGB，【0，255】
img = np.array(img) # 转换为numpy格式, HWC
Img.fromarray(img).save('lena.png') # x需要转换为PIL.Image格式才能保存

from skimage import io 
img = io.imread('lena.png') # numpy 格式， RGB，【0，1】 HWC
io.imsave('lena.jpg')

import matplotlib.pyplot as plt
img = plt.imread('lena.png') # numpy 格式，HWC [0,255] RGB
plt.imsave('lena.jpg')

# BGR 转换 RGB, 转回来也是一样的操作 
img_rgb = img_bgr[:,:,::-1]
```

基于上述的代码，我们可以总结出：

当我们使用matplotlib的时候

- 当我们用cv2读取图像的时候若要进行matplotlib的展示，我们需要对其做`bgr2rgb`的转换，PIL则需要做到numpy的转换，skimage考虑归一化方面的问题

当我们要使用tensror格式的时候

- 我们需要对cv2转换成RGB

- 对三个方法都是用`transpose`或者类似的方法转换到CHW

  ```python
  import torch 
  import numpy as np
  torch_img = torch.from_numpy(np.transpose(img,(2,0,1)))
  ```

## 简单图像增强

在这里由于opencv更为强大且全面，我们将框架转移到opencv中进行图像增强处理，于是本章节会主要介绍`opencv`, `torchvision中的图像增强，同时也会对`pillow`,`skimage`进行简单的介绍。

### TorchVision

torchvision的使用实际上是最简单便捷的，为了协调统一，该类变换我们在totensor后进行使用，接在其他所有变换的后面，实际上有一些变换是可以获取参数的，要调用的对应函数我们可以在对应[文档](https://pytorch.org/vision/stable/transforms.html#scriptable-transforms)中查询

**随机机制：**现已向后兼容torch

```python
# 随机种子采用torch
import torch 
torch.manual_seed(17)

# KEY FUNCTION: 给一个transformers加上概率，以一定的概率执行该操作
transformers.RandomApply(transforms,p=0.5)

# Key Function：从给定的一系列transforms中选一个进行操作
transformers.RandomChoice(transforms)
```

由于存在`randomapply`这个函数，所以实际上我们在调用变换的时候，我们可以用prefix random去搜补全，如果没有的话，也可以使用`RandomApply`来手动赋予随机性。



**组合机制：**同时使用多种变换，这种方法将一组强关联的变换进行组合，简化后续的使用，但是对于我们如果需要做多种增强的话，实际上并不是一个合适的方式。

```python
# a simple example for torchvision's transformer
transform = transforms.Compose([
	transforms.CenterCrop(10),
	transforms.PILtoTensor(),
	transforms.ConvertImageDtype(torch.float)
])
```

**常见的一些增强：**[列在下面](https://www.bilibili.com/read/cv7313702/)

- 裁剪系列：

  ```python
  # cental crop
  transforms.CenterCrop(size), 
  
  # five corners and the cental crop
  transforms.FiveCrop(size), 
  lambda(lambda crops: torch.stack[ToTensor()(crop) for crop in crops])
  
  # 随机裁剪到对应的尺寸，
  transforms.RandomCrop(size, padding=None, pad_if_needed=False, fill=0, padding_mode='constant') 
  
  # 随机裁剪后resize到指定的尺寸
  transforms.RandomResizedCropsize, scale=(0.08, 1.0), ratio=(0.75, 1.33), interpolation=<InterpolationMode.BILINEAR: 'bilinear'>)
                               
  # Padding 无需多言
  transformers.Pad(padding,fill=0,padding_mode='constant')
  ```

- 色彩变换增强

  ```python
  # 色彩抖动,随机改变亮度对比度饱和度和色调
  transforms.Colorjitter(brightness=0, contrast=0, saturation=0, hue=0)
  
  # 图像转换为灰度
  transforms.grayscale(num_output_channel=1)
  
  ```

- 几何变换增强

  ```python
  # 仿射变换
  transformers.RandomAffine(degrees, translate=None, scale=None, shear=None, interpolation=<InterpolationMode.NEAREST: 'nearest'>, fill=0, fillcolor=None, resample=None)
  # 可以通过以下函数获取变换矩阵
  get_params(degrees: List[float], translate: Optional[List[float]], scale_ranges: Optional[List[float]], shears: Optional[List[float]], img_size: List[int]) → Tuple[float, Tuple[int, int], float, Tuple[float, float]]
  
  transforms.RandomHorizontalFlip(p=0.5)
  transforms.RandomPerspective(distortion_scale=0.5, p=0.5, interpolation=<InterpolationMode.BILINEAR: 'bilinear'>, fill=0)
  RandomResizedCrop
  ```

### OpenCV

#### Install

Ubuntu：安装opencv的python版本

```bash
apt-get -y python3-opencv
pip install opencv-python
```

#### Usage

这一部分可能主要还是对OpenCV基础使用方式的介绍，至于数据增强方面，上面有一个库已经集成了很大一部分图像增强的操作，且在效率上也有了很高的优化和证实，简单的使用方式如下。

```python
try:
    import albumentations as A
except ImportError:
    os.system("pip install - U albumentations")
    import albumentations as A
import cv2

# Declare an augmentation pipeline
transform = A.Compose([
    A.RandomCrop(width=256, height=256),
    A.HorizontalFlip(p=0.5),
    A.RandomBrightnessContrast(p=0.2),
])

# Read an image with OpenCV and convert it to the RGB colorspace
image = cv2.imread("image.jpg")
image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

# Augment an image
transformed = transform(image=image)
transformed_image = transformed["image"]
```

下面我们会讲一些opencv中的简单使用方式：

[(一)OpenCV-Python学习—基础知识 - silence_cho - 博客园 (cnblogs.com)](https://www.cnblogs.com/silence-cho/p/10926248.html)

### Pillow 

Using PIL do [some augmentation](https://zhuanlan.zhihu.com/p/74053773)

1. CCBS： color，contrast，brightness，shapen

```python
# way1：PIL
from PIL import ImageEnhance
ccbs_img = ImageEnhance.Color(img).enhance(factor1)
...
```

2. Blur，Detail，Edge_Enhance，Smooth，Sharpen…

   自行在文档中找到对应的方法，实际上不是很多

```python
from PIL import Image
from PIL.ImageFillter import SMOOTH,BLUR
img = Image.open(image_pah)
img_1 = img.filtter(BLUR)
img_2 = img.filtter(SMOOTH)
```

### SkImage

...

## 混合图像增强（For ML）

==ALL in one 不是什么好点子==
为了对Machine Learning中的任务进行图像增强任务，我们在过程中可能会使用一些Github Repo，主要可能就是albumation，在进行图像增强和数据混合的过程中，我们会遇到的问题包括：

- PIL和NP，Tensor的三者格式不对应的关系
- Channel混杂的关系
- 调用transformer的形式不统一的问题

为此我们特地开了这个专题，介绍一下使用的方式，以及使我们在后续的使用过程中注意最终转换到datalist中最好采用统一的存储形式

1. path（load by cv or pil，st np）
2. data （np（else），tensor（cuda）for instant use）

以此来规范我们的dataset，and sampler or mixer

我们可以尝试使用如下的方式来进行transformer的管理操作，此外如果我们要用的是纯粹的数据增强而不是用来dataloader的transformer，我们就不要用这个逻辑去做，我们直接集成Augmentation就好了
ch

```python

class mytransformer():
	# if augs is not none we need to add ToPIL to get the right data type
	def get_transformers():
		self.transformer = {
			'augs': Augs.Compose([]),
			'trans': transformers.Compose([
				tranformers.ToPIL(),
				...
			]),
		}

	# then we using k-v pair to do all my transformer, 
	def __call__(img):
		for k,v in transformer:
			img = transformer['augs'](image=img)['image']
			img = transformer['trans'](img)
		return img
	
```

## 特殊图像增强

...