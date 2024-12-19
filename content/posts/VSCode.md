---
calendar_date: 2021-10-27
catalog: true
categories:
- VSCode
cover:
  image: /cover/cover15.jpeg
date: 2021-10-27 14:19:13
description: Some configurations of VsCode
lang: cn
mathjax: false
tags:
- VsCode
thumbnail: /img/header_img/lml_bg42.jpg
title: VsCode's Configuration
toc: true
---

## 编辑相关设置
### 自定义分词机制

当我们选择变量的时候，往往希望双击能够选中整个文本，但是由于分词机制，例如 `pre-word` 双击的话会被 `-` 划分为两个单词，这种时候可能不是我们希望的，VsCode 支持我们自定义这些分隔符，我们可以将其 `-` 从设置中删除即可

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20240420172643.png)

### 终端部分的输出双击复制

```json
"terminal.integrated.copyOnSelection": true
```

### 禁止通过拖放来移动选择内容

```json
"editor.dragAndDrop": false
```

## Launch 文件配置

配置Launch.json 能够帮助我们更好的进行debug的操作，有一些比较特别的文件名和相关编码。 

- `${workspaceFolder}` 指代当前运行目录
- `${file}`指代当前文件

找到launch文件并打开，自定义JSON：执行工作文件夹下的main.py进行调试。

```json
{
    "name": "experiment",
    "type": "python",
    "request": "launch",
    "program": "${workspaceFolder}/main.py",
    "console": "integratedTerminal",
    "args": ["--data_path","${workspaceFolder}/data",
            "--mode","0","--resume","false"]
},
```

默认 JSON：执行当前文件


```json
{
    "name": "current file",
    "type": "python",
    "request": "launch",
    "program": "${file}",
    "console": "integratedTerminal"
}
```

## Snippets

学会编写VsCode的用户代码片段，实际上也就是snippets，在我们编写代码的时候用来输出。

例子：

```json
{
	// Place your snippets for cpp here. Each snippet is defined under a snippet name and has a prefix, body and 
	// description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
	// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the 
	// same ids are connected.
	// Example:
	// "Print to console": {
	// 	"prefix": "log",
	// 	"body": [
	// 		"console.log('$1');",
	// 		"$2"
	// 	],
	// 	"description": "Log output to console"
	// }
	"Print to console": {
		"prefix": "tencent-header",
		"body": [
			"/*===============================================================",
			"*   Copyright (C) 2019 Tencent Technology Company Limited.",
			"*",
			"*   Name：$TM_FILENAME",
			"*   Author：aikenhong@tencent.com",
			"*   Date：$CURRENT_YEAR年$CURRENT_MONTH月$CURRENT_DATE日",
			"*   Desc：$1",
			"*",
			"*   Update History：",
			"*",
			"================================================================*/",
			"#ifndef $TM_FILENAME",
			"#define $TM_FILENAME",
			"#pragma once",
			"",
			"#include <map>",
			"#include <math.h>",
			"#include <string>",
			"#include <studio.h>",
			"#include \"label_helper.h\"",
			"#include \"feature_select.h\"",
			"#include \"sgame_ai_src/common/util.h\"",
			"#include \"sgame_ai_src/common/target_finder.h\"",
			"#include \"game_ai_src/tactics/tactics_multi_task_two_hand_action.h\""
		],
		"description": "header for the humanlike indicator development"
	}
}
```

其中` $<number>` 是按下光标后跳转的位置，`$ <keyword>` 可以有诸多表达式，建议去上网查一下。

## Todo Tree 

打开设置-打开json文件（设置右上角）

添加如下内容：（颜色和关键词可自定义）

```json
"todo-tree.tree.showScanModeButton": true,
    "todo-tree.highlights.enabled": true,
    "todo-tree.highlights.defaultHighlight": {
        "type": "text and comment",
    },
    "todo-tree.highlights.customHighlight": {
        "TODO": {
            "foreground": "#2f3542",
            "background": "#f6b93b",
            "iconColour": "#f39c12",
            "icon": "issue-opened",
            "type": "line"
        },
        "FIXME": {
            "foreground": "#2f3542",
            "background": "#e55039",
            "iconColour": "#e55039",
            "icon": "flame",
            "type": "line"
        },
        "NOTE": {
            "foreground": "#2f3542",
            "background": "#9980FA",
            "iconColour": "#6c5ce7",
            "icon": "eye",
            "type": "line"
        },
        "RECORD": {
            "foreground": "#2f3542",
            "background": "#7bed9f",
            "iconColour": "#2ed573",
            "icon": "info",
            "type": "line"
        }
    },
    "todo-tree.general.tags": [
        "TODO",
        "FIXME",
        "NOTE",
        "RECORD"
    ],
```

## Plugins 

introduce some plugins or special usage

### Monokai Pro

切换到目录`user/aiken/.vscode/extensions/monokaipro/js/app.js` 类似的文件，

找到`key: "isValidLicense"`

将下方的`if`和`return`的判定值1即可

最终代码如下：

```js
key: "isValidLicense",
value: function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
    if (!e || !t) return 1;
    var o = s()("".concat(i.APP.UUID).concat(e)),
        r = o.match(/.{1,5}/g),
        n = r.slice(0, 5).join("-");
    return t === 1
}
```

### List

列出已经安装的插件列表可以靠以下的命令：

```bash
code --list-extensions > extensions.txt
```

插件列表和配置文件可以在我的 [dotfile](https://github.com/AikenH/aikenh-dotfile/blob/main/vscode/extensions.txt) 仓库获取。