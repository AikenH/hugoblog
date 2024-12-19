---
calendar_date: 2024-03-29
catalog: true
categories:
- 前端三剑客入门笔记
cover:
  image: /cover/cover17.jpeg
date: 2024-03-29 23:59:08
description: null
lang: cn
mathjax: false
tags:
- Web
- JS
thumbnail: /img/header_img/lml_bg1.jpg
title: LearnWeb17-JS02-Intro
toc: true
---

## JS 基础语法

> 该部分的学习除了 MDN 的相关知识，会结合数据结构的内容来进行学。 

语言的第一印象和 python 有许多相似的地方。语法上可能大差不差，在循环和其他一些变量上又有一些和 C#,CPP 相似的地方。

### Basic Rules 基础规则简介

首先介绍基本的编写规则:如注释、缩进规则、变量规则等...

- **注释**：CPP 相同使用 `//` 和 `/*  */` 进行行/块注释。
- **句尾** `;` ：单行单条语句结束可以无需 `;` (但为了规范和明确可以加上)，同行多个语句可以用 `;` 进行语句的区分。

### 变量

> 声明变量使用：[`var`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/var), [`let`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let), [`const`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const) 三个关键词；其中 `let` 和 `const` 是相似的，用于声明块级作用域的局部变量，只有在声明的位置之后才能使用，唯一的区别在于 `const` 声明的常量不能用赋值运算符直接更改，（但如果是个对象，它的属性可以被添加、更新、删除）

**变量定义：**(另起一个 Paragraph 表示尊重) JS 为非强类型语言(即类似 python 而非 cpp)，为**动态类型语言**，变量声明**无需指定类型**。但有以下几个注意的事项：

- （不推荐）不带关键字的变量声明会默认为全局变量。
- （推荐）可以使用 `let` 或 `var` 关键字定义变量。
- （最推荐）最推荐使用 `let` 进行变量的声明，var 对变量定义位置的要求更低，使用 var 编写可能会方便，但是在后续维护和阅读中可能会体验很差。使用 `let` 然后和别的语言一样声明和使用变量。
- 可以使用 `typeof` 来检查变量类型

其中对于变量的定义上，Var 和 let 的详细差别可以参考 [var与let的区别](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Variables#var_%E4%B8%8E_let_%E7%9A%84%E5%8C%BA%E5%88%AB)，[var变量提升](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/var#%E5%8F%98%E9%87%8F%E6%8F%90%E5%8D%87)，简单的讲 var 的定义会先于所有的语句执行，声明一个全局的变量。下面简单介绍一下各种不同的数据类型：

**对象**：JavaScript 里一切皆对象，一切皆可储存在变量里。这一点要牢记于心，字典也是一种对象，定义方式和 Python 一致：

```js
let dog = { name: "Spot", breed: "Dalmatian" };
dog.name // 访问name属性。
```


**数值：** JS 只有一种数值类型 Number，不需要像 cpp 执行 int 和 float 之类的转换，说到数值类型，就需要对基本的运算符进行说明，这里简单列一下支持的一些运算符类型

| Idx  | Col1 | Col2    | Col3    | Col4 | Col5 | Colo6 |
| :--: | ---- | ------- | ------- | ---- | ---- | ----- |
|  基础  | +    | -       | \*      | /    | %    | **    |
| 自增自减 | \*=  | (var)++ | (var)-- | +=   | -=   | /=    |
|  比较  | !==  | ===     | <       | >    | <=   | >=    |

**基本运算符**：和大多数语言的基本运算符保持一致，这里需要特殊说明的只有**相等的判断符**，区别于其他语言，JS 中使用三个等号来判断相等；

```python
if a == b:
	print("a is equal to b")
```

```javascript
if (a === b)
{
	console.log("a is equal to b");
}
```

> 这里的函数定义和条件判断都更接近 cpp，使用{}将代码块来区分，而非单纯使用缩进。



**字符串**：JS 中字符串的定义方式支持使用 `""`、`''` ，这和其他语言的支持是类似的，如果字符串中需要使用引号，也可以使用 `\` 进行转义，同时字符串支持 `+` 进行拼接。

此外，JS 还支持使用 \`\`**反引号**来包裹字符串，使用反引号的时候就可以很容易的在字符串中包含引号；而这不是反引号字符串最重要的特性，该反引号字符串的使用更类似于 shell 语言：

- 使用反引号的字符串时，可以利用 `${}` 符号来包装变量和表达式。

```js
const output = `我喜欢歌曲《${song}》。我给它打了 ${
  (score / highestScore) * 100
} 分。`;
```

上面这是一个很典型的嵌入了表达式的情况，这种方式能够很方便的进行变量之间的交互，也具备比较好的可读性（如果变量命名的比较科学的话），此外反引号还具备以下的特性：

- 多行表达可以直接换行，无需如 `""` 等方式定义的字符串，需要嵌入 `\n` 转义的换行符
- 使用 ` ${sub}:$ {value}:${pos}` 进行字符串拼接的可读性通常>= 使用 `+` 进行字符串拼接

介绍完了字符串的定义，介绍一下字符串的相关操作：

- 首先，字符串可以使用 `string[idx]` 去获取字符串中 idx 的字符；
- 其次，字符串本身实际上也是一个**对象类型**，我们可以使用 ` obj.method ` 调用对应的字符串方法，这点和其他语言是一致的，无需多言，下面列出一些常用的字符串函数。

| IDX | Col 1            | Col 2                     | Col3                 |
| :-: | ---------------- | ------------------------- | -------------------- |
|  1  | `.length`        | `.indexOf()` 找到对应字符(串)的下标 | `.slice(start, end)` |
|  2  | `.toLowerCase()` | `.toUpperCase()`          | `.replace(old, new)` |
|     |                  |                           |                      |
可以看出，字符串实际上和数组类型避不开亲属关系，下面就介绍一下数组

**数组**：Python 一样可以存储多种类型在一个 Array 中，同样使用 `array[idx]` 访问对应 idx 的元素，使用 `.length` 获取数组的长度，通常用于循环中。

- 支持 `push` , `pop` 在数组末尾增加或删除元素，pop 会返回刚删除的元素；
- 支持 `unshift`，`shift` 在数组前面添加和删除元素；


**数组和字符串转换**: 使用 split 从 string 到 array，使用 joint('符号') 从 array 到指定符号链接的字符串，或者使用 toString()使用默认符号链接成字符串

```js
let myStringData = "Manchester,London,Liverpool,Birmingham,Leeds,Carlisle";
let myArrayString = myStringDate.split(",");
let StringAgain = myArrayString.join("-");
StringAgain = myArrayString.toString();
```

### Function 函数

JS 的函数关键字和 Shell 的一样只需要使用 function 即可，实际上和 CPP 也是一样的只是无需指定类型。

```javascript
function multipy(a, b)
{
	let result = a + b;
	return reuslt;
}

let res = multipy(3, 5);
console.log(res);
```

有趣的地方在于 `JS` 的类也是用 function 定义的，这可能是由于**一切皆为对象**这个特性，所谓函数可能实际上是一个只有单个调用结构的类。并没有作区分。

**定义默认参数**：默认参数和可选参数是息息相关的，当我们定义了默认的参数，这个参数就可以选择性的不赋值，通过默认参数去赋值。

```js
function hello(name="aiken"){
  console.log(`hello ${name}!`);
}

hello('aikenhong');
hello();
```

#### 匿名函数和箭头函数

当有些函数我们并不打算复用，或者当一些函数希望接受另一个函数作为参数时，我们经常会看到匿名函数的使用，匿名函数经常用于这种函数作为参数的场景，这种场景下也经常使用箭头函数的写法来定义这个匿名函数。

匿名函数的基本定义方法如下：

```js
textBox.addEventListener("keydown", function (event) {
  console.log(`You pressed "${event.key}".`);
});
```

通常使用箭头函数的写法去实现这样的匿名函数

```js
textBox.addEventListener("keydown", (event) => {
  console.log(`You pressed "${event.key}".`);
});
```

如果只给匿名函数传入一个参数的时候，该参数两侧的圆括号可以省略

```js
textBox.addEventListener("keydown", event => {
  console.log(`You pressed "${event.key}".`);
});
```

甚至如果只有一个 return 的时候还能省略外层的大括号

```js
textBox.addEventListener("keydown", event =>
  console.log(`You pressed "${event.key}".`),
);
```

函数本身的作用域仅存在于内部，函数外面的都是全局作用域，
### Event 事件

> 接下来我把用于 web 开发的 javascript 用 web-js 代称用来区分服务端的 js，服务端的 js 我直接用 nodejs 代称好了。

在 web-js 中，与事件的交互应该是最为关键的一个环节了，通过浏览器和用户触发的各种事件（如点击，页面滚动，页面跳转）来触发 js 中编写的一个个行为，正是所谓赋予网页动态交互特性。

> 可以复习 [LearnWeb00-Web入门](tmp/LearnWeb00-Web入门.md) 中 How JavaScript Works 中讲到的原生异步处理机制，此处有使用 windows 监听的。

下面引一个 MDN 中的例子做一些简单的说明：

```javascript
document.querySelector("html").addEventListener("click", () => {
  alert("别戳我，我怕疼。");
});
```

👍 这里有个有趣的**匿名函数写法**，使用 `() => {}` 定义一个匿名函数，实际上也可以用下面这个完整的表达方式：

```js
document.querySelector('html').addEventListener('click', function() {
	alert("别戳我");
})
```

此处的例子可解释为：使用 document（DOM）接口中的 `querySelector` 选择 html 元素添加对于 `click` 时间的监听，并在监听到点击行为的时候弹出别戳我的弹窗。

Selector 可以参考 HTML 部分选择器的含义去理解，具体可选择可能还是要参考 DOM API 中的说明，但是理论上应该会和 HTML 中的定义方式保持一致。

**例子 2** 监听图片点击事件，切换背景图片，这里有两种写法和重要的 API 函数 `getAttribute` 和 `setAttribute`。

写法一：使用图片变量的 `OnClick` 事件（这里说明了变量本身是会携带一些事件定义，并非只有 AddListner 一种监听）

```javascript
ele_img.onclick = function() {
    let src = ele_img.getAttribute("src");
    if (src === "https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/80a5366f89dfbd27ec46f669e0eac84.jpg")
    {
        ele_img.setAttribute("src", "https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20231005005911.png");
    }
    else
    {
        ele_img.setAttribute("src", "https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/80a5366f89dfbd27ec46f669e0eac84.jpg");
    }
};
```

写法二：使用原本的事件监听方法：

```js
ele_img.addEventListener("click", () => {
    let src = ele_img.getAttribute("src");
    if (ele_img.src === "https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/80a5366f89dfbd27ec46f669e0eac84.jpg")
    {
        ele_img.setAttribute("src", "https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20231005005911.png");
    }
    else
    {
        ele_img.setAttribute("src", "https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/80a5366f89dfbd27ec46f669e0eac84.jpg");
    }
});

```

写法三：将具体函数内容独立出去为 `ImgSwitch`，这里直接调用函数名

```js
ele_img.addEventListener("click", ImgSwitch);
```

也可放在匿名函数或者函数里：

```js
ele_img.addEventListener("click", () => {
    ImgSwitch();
);
```

**例子三** HTML 中添加 Button，CSS 对 Button 简单渲染，然后 JS 中添加输入事件，HTML 和 CSS 部分不在赘述。

> button 同样可以使用 onclick 事件来监听点击。

```js
let ele_button = document.querySelector("button");
ele_button.onclick = () => {
    addUserName();
}

function addUserName() {
    let name = prompt("请输入您的姓名：");
    let message = "欢迎您，" + name + "/";
    localStorage.setItem("name", name);
    Heading.textContent = message;
}

if (!localStorage.getItem("name")) {
    Heading.textContent = "欢迎您！";
} else {
    Heading.textContent = "欢迎您，" + localStorage.getItem("name") + "/";
}
```

- 这里主要是 prompt 可以唤出一个输入框，将信息输入 name 中
- LocalStorage 将信息存到本地的浏览器中
- 然后最后的判断做一个初始化，如果浏览器中缓存有相关信息就直接输出，否则输入一个 default 值。

如何**写入浏览器的缓存**也是后续很重要的一个事情，有存储对于多次页面交互来说十分关键。

后续章节 [[tmp/LearnWeb18-JS03-事件]] 会更详细的讲解事件相关的 JS 代码。

### Loop 循环

| TYPE  | A     | B        | C          |
| :---- | ----- | -------- | ---------- |
| 循环范式  | for   | while    | do...while |
| 常见关键词 | break | continue |            |

#### For 循环

> FOR 循环的方式和 cpp 比较相似，可以对列表直接进行循环，列表元素可以是 Obj 和 Dom 元素等。

普通的 FOR 循环方式：

```js
const fruits = ["apples", "bananas", "cherries"];
for (let i = 0; i < fruits.length; i++){
	console.log(fruit);
}
```

类似 auto 的循环变体：

```js
const fruits = ["apples", "bananas", "cherries"];
for (const fruit of fruits) {
  console.log(fruit);
}
```

例如下面的方式对 Dom 进行循环清空内容

```js
const resetParas = document.querySelectorAll(".resultParas p");
for (const resetPara of resetParas) {
  resetPara.textContent = "";
}
```

这里的 `querySelectorALL` 是 `querySelect` 的延伸，找出.resultParas 中所有的 p 元素，并将其放于列表之中。

> focus 是 input 的一个可用属性函数，可以将光标聚焦于输入框中，方便控制和减少用户的操作，善用 focus 切换关注的输入框能提升交互体验。

JS 中 Continue 和 Break 的用法也和其他的语言一致，分别是跳过单词循环和跳出当前循环。

#### While 循环

```js
initializer
while(condition)
{
  // code run in while.

  // condition change statement. eg:
  i++;
}
```

#### do...while 循环

```js
initializer
do {
  // code run in do ... while
  
  // condition change statement. eg:
  i++;  
} while(condition)
```

两种形式的 while 的区别就是在执行循环之前还是之后，判断当前是否满足条件。

### Condition 条件语句

JS 条件语句的语法和 CPP 基本一致，下面是 JS 的条件语句单元

```js
if (condition) {}
else if (condition) {}
else {}
```

JS 中的与或非运算符如下：

| Title    | 与   | 或    | 非   |
| -------- | --- | ---- | --- |
| Operator | &&  | \|\| | !   |

条件语句中往往还会涉及到 `switch` 语句，对于需要很多个 `if else` 的场景，可能会更方便一些，`switch` 的模板如下：

```js
switch(expression){
	case value1:
		LOGIC1
		break;
		
	case value2:
		LOGIC2
		break;
		
	default:
		LOGIC3
}
```

`default` 不需要使用 `break` 跳出，如果没有hit 任何的value，就执行默认的逻辑块，`switch` 很多时候用于选择页面的选择框情况。

```html
<label for="weather">选择今天的天气：</label>
<select id="weather">
  <option value="">--作出选择--</option>
  <option value="sunny">晴天</option>
  <option value="rainy">雨天</option>
</select>
<p></p>
```

```js
const select = document.querySelector("select");
const para = document.querySelector("p");

select.addEventListener("change", setWeather);
function setWeather() {
  const choice = select.value;

  switch (choice) {
    case "sunny":
      para.textContent = "阳光明媚。穿上短裤吧！去海滩，或公园，吃个冰淇淋。";
      break;
    case "rainy":
      para.textContent = "外面下着雨；带上雨衣和雨伞，不要在外面呆太久。";
      break;
    default:
      para.textContent = "";
  }
}
```

对于一些简单的选择和条件判断的情况，也可以使用三元运算符来实现，和 CPP 一样是问号冒号表达式吧，从下面的 case 可以看出三元表达式非常时候在类似明亮和暗黑主题切换的场景中。

```js
select.addEventListener("change", () =>
  select.value === "black"
    ? update("black", "white")
    : update("white", "black"),
);
```