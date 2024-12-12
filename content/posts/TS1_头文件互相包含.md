---
catalog: true
categories:
- Cpp
cover:
  image: /cover/cover1.jpeg
date: 2024-10-22 17:05:32
lang: cn
mathjax: false
subtitle: 使用类前置声明来解决CPP头文件相互包含带来的编译问题
tags:
- Cpp
- Langs
thumbnail: /img/header_img/lml_bg1.jpg
title: CPP_头文件互相包含
toc: true
---

> [!Error]+
> 编写 C++ 代码时偶尔会遇到两个类需要相互引用的情况，如果在 h 文件中相互包含会导致 "has not been declared" 等声明问题，此时需要使用前置声明的方式来解决该问题

### Code Example

以一个实际场景为例：假设有工具类 Search Helper 提供一系列搜索功能，还有另一个 ObjectAttr 定义一系列操作对象的属性，在 ObjectAttr 中需要引用 SearchHelper 提供的某个基础函数，而 SearchHelper 中部分针对 ObjectAttr 设计的某些功能则需要将 ObjectAttr 中的类作为入参，此时我们可能会在 h 文件中相互引用；

在 obj_definition.h 中有 `GetSelfNearObj` 函数，其过程中需要调用 search_helper 中的 `GetDistObj` 函数进行辅助运算

```cpp
#include "util/search_helper.h"
namespace object_info{
	class ObjectAttr{
	public:
		LocationType location;
		int ObjId;
		int NearObjId;
	private:
		void GetSelfNearObj();
	};
}
```

在 search_helper.h 中有以下函数定义

```cpp
#include "base/obj_definition.h"
namespace search_helper{
	class SearchHelper{
	public:
		int GetDistObj(const object_info::ObjectAttr & obj1, const object_info::ObjectAttr & obj2);
	};
}
```

这种情况下编译会出现未定义，未声明，not a type 之类**缺少类型说明符**的错误。

```
error: ... has not been declared
```

### Fix & Analysis

上述错误是由于两个文件构成了循环依赖，类 `SearchHelper` 依赖于 `ObjectAttr`，`ObjectAttr` 又依赖于 `SearchHelper`；因此编译器会报错导致无法通过编译；

在这种情况下，可以通过前向声明的方式来解决这种问题，即不去进行循环引用，在search_helper 中不 `#include obj_definition.h`，但是对需要的 `ObjectAttr` 进行一个空声明，然后在 .cpp 中 `#include obj_definition.h`  具体如下，将 H 文件修改为；

```cpp
namespace objct_info{
	class ObjectAttr;
}

namespace search_helper{
	class SearchHelper{
 	public:
 		int GetDistObj(const object_info::ObjectAttr & obj1, const object_info::ObjectAttr & obj2);
	};
}
```

在对应的 `.cpp` 文件中添加对 `obj_definition` 的包含，这样在编译过程中，`ObjectAttr` 会被自动链接到正确的定义；

```cpp
#include "base/obj_definition.h"

// origin cpp file below...
// ...
```

上述例子展示了不同命名空间下的情况，这里秉持的原则就是不同文件中对类的前置声明要保持一致，无论是命名空间、参数、类型等，在同一个命名空间中的情况要更简单，可以以此类推，这里不再赘述；

### Reference

1. [c++ 头文件互相包含问题](https://blog.csdn.net/hfutljx/article/details/81508740)
2. [c++ 类声明 类前置声明范例](https://www.cnblogs.com/staring-hxs/p/3244251.html)