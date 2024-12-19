---
catalog: true
categories:
- 前端三剑客入门笔记
cover:
  image: /cover/cover20.jpeg
date: 2024-04-30 14:44:51
description: null
lang: cn
mathjax: false
tags:
- Web
- JS
thumbnail: /img/header_img/lml_bg1.jpg
title: LearnWeb20-JS05-JSON使用
toc: true
---

>[!summary]+
>本篇是 [Mdn 使用 JSON](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/JSON) 一文的阅读笔记，对 web 开发中的 JSON 进行了介绍

## JSON 简介

JavaScript Object Notation(JSON)是将结构化数据表示为 JavaScript 对象的标准格式，通常用于网页上的表示和传输数据（服务端，客户端），熟悉 JSON 对象的创建，传输，解析，对于 JS 来说也是一门基本功了。

JSON 可以存在单独的文件中，后缀为 `.json`，同时在进行网络传输时，[MIME 类型](https://developer.mozilla.org/zh-CN/docs/Glossary/MIME_type)为 `application/json`

### 基本操作介绍

对 JSON 这类标记语言进行的操作通常就是下面的两种：

- 将字符串转换为原生对象的过程称为反序列化(deserialization)
- 将原生对象转换为字符串进行网络传输的字符串的过程则成为序列化(serialization)

因此可以理解为这就是一个 object-string 的相互转换过程，因此在一个语言中如何使用 json 这种标记语言，最核心的就是上述的这两个操作，随着后续的发展，JSON 在除了 js 的其他语言中也被广泛的使用到。

### JSON 结构和“语法” 

整个 JSON 是一个字符串，其非常类似于 JS 对象字面量的写法（无需命名对象名），且其中**仅包含要传输的数据（属性）而不包含方法**；

一般而言有两种方法来编写 JSON 文件，一种是类似对象字面量（字典），存储一个单体对象的方式；另一种则是 JSON 数组，最外层用数组的形式，在数组里面可以存储多个单独对象。下面分别给出示例：

**单对象形式**，对象字面量（like 字典），js 中反序列化获取之后就会得到一个对象，使用对象的方法去调用其中的属性即可。

```json
{
	"squadName": "Super hero squad",
 	"homeTown": "Metro City",
 	"formed": 2016,
 	"menbers": [
	 	{
	 		"name": "Molecule Man",
	      	"age": 29,
	      	"secretIdentity": "Dan Jukes",
	      	"powers": [
	      		"Radiation resistance", "Turning tiny", "Radiation blast"
	      	]
	 	},
	 	{
	 		"name": "Madame Uppercut",
	   		"age": 39,
	   		"secretIdentity": "Jane Wilson",
	   		"powers": [
	     		"Million tonne punch","Damage resistance", "Superhuman reflexes"
	  		]
	 	}
 	]
}
```

**数组多对象形式**,下面这种写法也是一种合法的 JSON，js 中反序列化获取后则会得到一个数组对象，使用下标去索引即可。

```json
[
	{
	   "name": "Molecule Man",
	   "age": 29,
	   "secretIdentity": "Dan Jukes",
	   "powers": ["Radiation resistance", "Turning tiny", "Radiation blast"]
	 },
	 {
	   "name": "Madame Uppercut",
	   "age": 39,
	   "secretIdentity": "Jane Wilson",
	   "powers": [
	     "Million tonne punch",
	     "Damage resistance",
	     "Superhuman reflexes"
	   ]
	 }
]
```

同时 JSON 还有以下的一些编写规范：

1. 纯数据，只包含属性不包含方法；
2. 要求字符串和属性名称使用双引号，单引号无效；
3. 错位的 `,` 和 `;` 都可能导致 json 文件出错，要做好检查，可以使用[JSONLint](https://jsonlint.com/)  这样的程序来验证；
4. JSON 实际上可以使任何可以有效包含在 JSON 中的数据类型的形式，例如，单个字符串或者单个数字也是一个有效的 JSON 对象；



## 序列化&反序列化

> 由于序列化和反序列化的操作在 web 环境中的普遍性，因此浏览器都有一个内建的 api `JSON` 来支持这些操作，主要是下面的两个方法
> 
> - `parse(string)` 以字符串形式接收 JSON 对象，并返回 js 的内建对象。
> - `stringify(obj)` 以对象作为参数，返回对应的 JSON 字符串。

### Deserialization 反序列化

获取 JSON 数据进行**反序列化**通常会有两种情况：传输格式为 JSON 是已知 && 接收到字符串，需要将其按照 JSON 的方式转换为对象；

第一种情况下可以直接使用 `response.json()` 直接将获取到的数据转换为对象：

```js
const superHeros = await response.json();
```

第二种情况下使用浏览器的 `JSON` api 来实现转换：

```js
const superHeros = JSON.parse(superHerostext);
```

### Serialization 序列化

和反序列化正好相反，序列化也很简单，使用下面 `stringify()` 方法：

```js
let myObj = {name: "aikenhong", age: "26"};
let myString = JSON.stringify(myObj);
myString;
```

可以将上述代码在控制台输入试试，序列化后就可以进行数据传输

## 数据传输
### Process with Fetch Date

> 序列化和反序列化过程避不开数据的获取和传输，因此这里会简单介绍一下 JSON 数据的获取和传输的方法。

这一部分给出一个典型的获取函数来进行说明整个数据获取流程的组成。

```js
async function getJsonData(){
	const requestURL = 
		"https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json";
	const request = new Request(requestURL);

	const response = await fetch(request);
	const superHeros = await response.json();
	
	// deserialization2 example.
	// const superHerosText = await response.text();
	// const superHeros = JSON.parse(superHerosText);

	methodUseObjReceived(superHeros);
}
```

1. 通过 `requestURL` 初始化一个新的 `Request` 对象（一个请求体）；
2. 使用 `fetch()` 方法对这个 `Request` 对象发起请求，返回一个 `response` 对象；
3. 使用 `response` 对象的 `json()` 以 JSON 的方式获取内容并返回对应的对象；

> fetch() API 是异步的，这个再后续的章节中会介绍异步函数的知识，目前仅需知道，调用了异步 api 的函数名称前要加入 `async` 关键字，并在异步 api 的调用之前添加 `await` 关键字。

### Reference

- [FetchAPI](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)
- [使用Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)
- [HTTP请求方法](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods)
- [JSON官网](https://www.json.org/json-zh.html)

上面这些资料有一些现在就可以看看，有一些在对相关知识了解的更全面之后可以进一步的学习一下。