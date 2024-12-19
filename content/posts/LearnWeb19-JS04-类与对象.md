---
catalog: true
categories:
- 前端三剑客入门笔记
cover:
  image: /cover/cover19.jpeg
date: 2024-04-28 16:46:21
description: null
lang: cn
mathjax: false
tags:
- Web
- JS
thumbnail: /img/header_img/lml_bg1.jpg
title: LearnWeb19-JS04-类与对象
toc: true
---

> [!summary]+
> JS 中的一切变量皆为对象，可以将对象理解为一个包含相关数据和方法的集合（变量 & 函数）我们也将其称之为属性和方法，就像我们在 python 里做的那样，本篇为 [mdn_JS对象基础](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Basics)，[mdn_JS对象原型](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Object_prototypes) 的阅读笔记

如果 [面向对象编程基本概念](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Object-oriented_programming) 不太清楚的话，可以看一下这个链接，了解一下下面这些基本概念：derive 派生 | oriented 面向 | polymorphism 多态 | override 重写/重载 | encapsulation 封装 | private 私有 | delegation 委派 |

## 从声明对象开始

### 手动声明对象（字面量）

在 JS 中声明一个对象实际上和声明一个字典一样，使用 `{}` 就可以声明一个对象，{}中可以包含属性甚至函数，下面给出一个例子：

```js
const person = {
	name: ["aiken", "metis"],
	age: 26,
	bio: function () {
		console.log(`${this.name[0]} ${this.name[1]} now is ${this.age} years old`);
	}
	introduce() {
		console.log(`hello! i'm ${this.name[0]}.`);
	}
}
```

可以看出该声明的对象中，不仅包含属性: name, age, 还包含方法 bio, introduce,可以看出方法存在两种不同的写法，更常用的是第二种简写。

这种手动写出对象的内容来创建的特定对象叫做对象字面量(object literal)，与从定义好的类实例化出来的对象不同。

### 基于函数来批量声明对象

当我们需要批量创建多个同类对象的时候，按照上面的方法来定义就会显得十分麻烦，这个时候我们可以使用函数来批量声明对象。

```js
function createPerson(name, age)
{
	const obj = {};
	obj.name = name;
	obj.age = age;
	obj.bio = function(){
		console.log(`${this.name} now is ${this.age} years old`);
	};
	return obj;
}
const aiken = createPerson('aiken','26');
const metisy = createPerson('metis', '25');
```

通过函数来声明对象的时候：用首先定义一个空对象，然后去修改对象属性和对象的方法，实现批量处理。

### "this" 使用和含义

this 指代代码运行时调用 this 的对象本身，这在定义单个对象字面量的时候可能没什么用，但是当我们有多个对象，这样这种时候通过使用 this，就可以使得函数定义是更通用的，就像上面的例子中，`aiken.bio` 和 `metisy.bio` 都能正确的打印出其年纪和名称。

### 使用类(构造函数)来声明对象

使用类来声明对象是各种编程语言中最通用的一种声明对象的方式，JS 一切皆为对象的设计思想，使得 JS 中定义类的方式和定义函数的方式实际上是十分相似的，这里主要的区分在于用构造函数声明新对象的时候，我们使用 `new` 关键字。下面给出一个例子：

```js
function Person(name, age)
{
	// 命名类的时候和其他语言一样，使用大写字母开头。
	this.name = name;
	this.age = age;
	this.bio = function(){
		console.log(`${this.name} now is ${this.age} years old`);
	};
}

const aiken = new Person('aiken', 26);
const metis = new Person('metis', 25);
```

可以看出，使用构造函数的方式的时候，我们无需指定返回值，但需要使用 new 关键词去声明新的对象。



## 对象属性和方法的访问和修改

>[!summary]+
>调用对象的属性和方法主要有两种方式：点访问法和括号访问法；两种方式在大多数情况下是通用的，但是诸如希望遍历其中的属性，或者说要访问的属性是一个不确定的变量的时候，这种时候只能使用括号访问法。

### 访问对象成员 

这里我们以上文的 `Person` 类构造出来的对象 `aiken` 为例，当我们需要访问其中的属性值或者方法的时候：

- 点表示法：`console.log(aiken.name)` 这里的对象可以按照一个命名空间去理解，选择 aiken 命名空间中的 name 变量；
- 括号表示法：`console.log(aiken['name'])` 就像字典/数组一样去访问其中的属性；

通常而言但就对象属性访问而言，点表示法是更通用优雅的一种，而括号表示法主要在我们希望访问一个不确定的属性的时候，使用变量存储要访问的字段的情况；

```js
function classFactor(attrName)
{
	console.log(aiken[attrName]);
}
classFactor("name"); // 访问aiken的name
classFactor("age");  // 访问aiken的age
```

这种情况也经常用于交互场景，通过 UI 设置对应的属性名称和属性值；

```js
let myDataName = nameInput.value;
let myDataValue = nameInput.value;
aiken[myDataName] = myDataValue;
```

### 对象成员设置

通过上述的访问对象成员的方法，我们可以获取到一个对象的任一成员（属性、方法），可以通过简单的赋值符号 = 去修改（更新）改成员。

```js
aiken.age = '27';
aiken['age'] = '28';
```

也可以用同样的操作去创建新的成员（属性、方法）

## 原型与继承

> [!summary]+
> 原型实际上就是别的语言中所说的"基类"或者"父类"，js 的继承方法和其他语言中我们熟悉的方法有所不同，这里需要注意区分。

JS 中的继承和其他语言一样，会继承父类中的属性和方法，当我们在调用的时候还是沿着继承的链条逐渐查询的（先子，后父），这里就不在赘言。

### 一些基础特性

开始[学习原型与继承](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Object_prototypes)之前，这里要介绍两个后面会比较常用到的小特性：

第一个特性是，使用 `Object.getPrototypeOf` 函数可以获取到对应对象的原型，这个时候结合一个 do...while 循环我们就可以打印出整条原型链。

```js
function getPrototypeLink(object)
{
	do{
		object = Object.getPrototypeOf(object);
		console.log(object);
	}while(object);
}
// 当找不到原型的时候就会返回unll终止循环
// 通常而言最基础的原型是Object.prototype,所有的对象都会默认拥有它，再往前就是null
```

第二个特性是，定义完一个对象，例如 `Person`,这个时候在控制台键入

```js
person.
```

控制台会将对象可用的一系列属性列出，该特性可以用来检查继承的发生与否，以及情况；同时可以发现，除了我们定义的各种属性之外，还有一些隐式继承至默认原型的属性：

```js
__defineGetter__
__defineSetter__
__lookupGetter__
__lookupSetter__
__proto__
city
constructor
greet
hasOwnProperty
isPrototypeOf
propertyIsEnumerable
toLocaleString
toString
valueOf
```

> 其中像是 `toString` 或者 `valueOf` 这些方法，可以适当的去了解下，后面用到的情况可能会比较多。

可以发现 JS 中**所有的对象**都有一个内置属性 `__proto__` ，该属性指向我们对象的原型（父类），通常用 `Object.getPrototypeOf` 去获取对应的对象，同样**如果修改/指定该属性的值，在 js 中，就是继承操作**，这个后续进行讲解。

### 属性遮蔽

当对象和其原型同时定义了同名的属性，在访问该属性的时候，首先会在对象本身的命名空间中进行搜索，当搜索不到的时候才会去搜索父类，因此这个时候对象的这个属性就对原型中的对应属性出现了遮蔽；

### 设置原型（类似继承）

JS 中设置原型有几种不同的方式，包括使用 `Object.create()` 和使用构造函数的方式；

#### Object.Create

`Object.create(ptorotype-object)` 方法可以创建一个新的对象，并允许指定一个用作新对象原型的对象。

```js
const personPrototype = {
	greet(){
		console.log("hello!");
	}
}

const aiken = Object.create(personPrototype);
aiken.greet(); // hello!
```

#### 使用构造函数

JS 中，所有的函数都有一个 `prototype` 属性，当调用一个函数作为构造函数时（即使用 `new`）这个**属性本身**会被设置为新构造对象的原型（按照惯例会存在 `__proto__` 的属性中），因此，如果设置构造函数的 `prototype` 属性到某个原型上，就能确定构造出来的新的对象都会继承该原型。

具体的操作如下, 这里沿用上述的 `personPrototype` 来做说明。

```js
function Person(name){
	this.name = name;
}

Object.assign(Person.prototype, personPrototype);
const aiken = new Person('aiken');
aiken.greet();
```

这也解释了为什么我们查找原型的时候，总会在原型的名称后面加上 `.prototype`，在上述的对象 `aiken` 中，自身特有的属性叫做**自有属性**，可以使用 `Object.hasOwn(obj, attr)` 检查 attr 是不是 obj 的自有属性。

```js
Object.hasOwn(aiken, "name"); // true
Object.hasOwn(aiken, "greet"); // false;
```

## JS 面向对象编程的特点

[面向对象编程基本概念](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Object-oriented_programming) 这一文中除了对整个面向对象编程的基本概念有讲解，也说明了 JS 的面向对象编程的特点，建议阅读，简单一点：

1. 其他大多语言都是基于类的面向对象编程，对象必须有类创建出来，两者是不同的概念，定义类和实例化对象的方法是不同的，而 js 从创建对象字面量的方式就可以知道，JS 无需类就可以创建对象（类本身也会是一个对象）.
2. 基于(类本身也是一个对象)这个假定，就可以发现，原型链和继承有一样的层级结构，但是本质上是不一样的，原型链实际上是一个链表，一个对象的原型实际上是另一个对象，之间通过 `_proto_` 属性进行连接，这是一种委派。

但是整体在使用上，原型和 js 的构造函数可以基本上实现面向对象的编程特性，但是可能还不太够用，因此 JS 还提供了一些别的特性：参见下一节。

## JavaScript 中的类

> [!summary]+ 
> 这里介绍的类实际上底层使用的仍然是原型，这是通过引入 class 的关键字来使创建原型链更加的便捷以及和其他语言对齐。

```js
class Person{
	name;
	constructor(name){
		this.name = name;
	}
	introduceSelf(){
		console.log(`hi! I'm ${this.name}`);
	}
}

const aikenhong = new Person("aikenhong");
aikenhong.introduceSelf();
```

上面这个 JS 中的类的声明中有以下的几点：

- 声明有 name 属性（可选，构造函数中使用 this 那行会在初始化 name 属性前自动创建它，但是列出来可以方便阅读）
- 一个需要 `name` 参数的构造函数
- 一个成员方法

也可以初始化默认值，就像 `name = ""; `,构造函数使用 `constructor` 关键字来声明，这里的 new 创建新的对象的时候，就会创建新的对象，将 `this` 绑定到新的对象,执行 `constructor` 函数，返回新的对象。

### 省略构造函数

如果不需要初始化什么变量，只需要提供基准方法，那就可以省略构造函数，这个会自动生成。

### 继承

使用 `extends` 指定基类，实现继承，并用 `super` 调用父类的构造函数，然后覆盖父类的方法，并新增一个新的方法，例子如下：

```js
class Professor extends Person{
	teaches;
	constructor(name, teaches){
		super(name);
		this.teaches = teaches;
	}
	introduceSelf(){
		console.log(
			`My name is ${this.name}, and i will be your ${this.teaches} profesor.`
		);
	}
	grade(paper){
		const grades = Math.floor(Math.random() * (5-1)+1);
		console.log(grades);
	}
}

const aiken = new Professor("Aiken", "CS");
```

### 封装（私有变量和私有方法）

这一节主要就介绍一下怎么将对象和方法变成私有的，在命名之前添加 `#`

```js
class Person {
	#name;
	constructor(name){
		this.name = name;
	}
	introduceSelf(){
		console.log(`my name is ${name}`);
	}
	#privateLogHead(){
		console.log("log head");
	}
	publicLogHead(){
		privateLogHead();
	}
}

const examplePerson = new Person();
examplePerson.#name; // syntax error
examplePerson.introduceSelf();
examplePerson.#privateLogHead(); // syntax error
examplePerson.publicLogHead(); 

```

## 练习

- [碰撞弹球](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Object_building_practice) ：可以帮助熟悉原型等相关概念，建议尝试或者阅读。
- [碰撞弹球2](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Adding_bouncing_balls_features)： 添加恶魔圈来消除原本的弹球，实战。