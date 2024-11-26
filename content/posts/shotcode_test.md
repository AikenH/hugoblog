---
title: "ShortCode Function Test"
date: 2024-11-23 11:30:03
description: "test website's function is normal "
tags: ["Util"]
draft: false
categories:
- Util
- Hugo
cover:
    image: cover/cover0.jpg
# cover:
#     image: "https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/DSCF4104_%E5%89%AF%E6%9C%AC.JPG" # image path/url
#     alt: "CoverImg" # alt text
#     caption: "<text>" # display caption under cover
#     relative: false # when using page bundles set this to true
#     hidden: false # only hide on current single page
---

该文章会测试各种后续修改，包括基础字体，各种后续添加适配的shortcodes： 如 alert、视频、widget ，包括字体渲染，视频渲染，iframe渲染，以及相关的一些其他修改，
同时文章由于引入了大量的js，导致一些功能的渲染速度会下降，这也是我们需要测试的地方，包括找到加载的瓶颈；

## Extend ShortCodes

### sidenote

abc

{{< sidenote >}}
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
{{< /sidenote >}}

def Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.

### Timeline

{{< timeline date="2023-10-01" title="国庆节" description="祖国生日快乐" tags="节日" url="" >}}
{{< timeline date="2024-01-01" title="元旦节" description="上北京er" tags="节日&计划" url="" >}}


### Chat 

{{< chat position="left" name="metisy" timestamp="2024-11-25 19:31">}}
这是左边的消息内容。
{{< /chat >}}

{{< chat position="right" name="aikenh" timestamp="2024-11-25 19:32" >}} 
这是右边的消息内容，测试长长长长长长长长长长长长长长长长长长长长长长长长度。
{{< /chat >}}


### quota-center

{{< quote-center >}}
十里青山远，潮平路带沙<br>数声啼鸟怨年华<br>又是凄凉时候，在天涯<br>白露收残月，清风散晓霞<br>绿杨堤畔问荷花<br>记得年时沽酒，那人家
{{< /quote-center >}}

### quota 

{{< quote >}}
十里青山远，潮平路带沙。数声啼鸟怨年华。又是凄凉时候，在天涯。白露收残月，清风散晓霞。绿杨堤畔问荷花。记得年时沽酒，那人家。
{{< /quote >}}


### simple-notice 

{{< simple-notice simple-notice-warning >}}
十里青山远，潮平路带沙。数声啼鸟怨年华。又是凄凉时候，在天涯。白露收残月，清风散晓霞。绿杨堤畔问荷花。记得年时沽酒，那人家。
{{< /simple-notice >}}

{{< simple-notice simple-notice-info >}}
十里青山远，潮平路带沙。数声啼鸟怨年华。又是凄凉时候，在天涯。白露收残月，清风散晓霞。绿杨堤畔问荷花。记得年时沽酒，那人家。
{{< /simple-notice >}}

{{< simple-notice simple-notice-tip >}}
十里青山远，潮平路带沙。数声啼鸟怨年华。又是凄凉时候，在天涯。白露收残月，清风散晓霞。绿杨堤畔问荷花。记得年时沽酒，那人家。
{{< /simple-notice >}}


### notice 

{{< notice notice-warning >}}
十里青山远，潮平路带沙。数声啼鸟怨年华。又是凄凉时候，在天涯。白露收残月，清风散晓霞。绿杨堤畔问荷花。记得年时沽酒，那人家。
{{< /notice >}}


### github widget
  
{{< github name="Organic-Carbon-Estimating" link="https://github.com/guanqr/Organic-Carbon-Estimating" description="A program used in estimating organic carbon stocks in oceans. 计算指定海域的有机碳存量，包括颗粒有机碳与溶解有机碳，数据依赖于 NASA 中分辨率成像光谱仪 MODIS 遥感产品。" color="#e16737" language="MATLAB" >}}


### align 

{{< align left "文字居左" >}}

{{< align center "文字居中" >}}

{{< align right "文字居右" >}}


### Video Function

#### bilibili

{{< bilibili BV12NpBeYErP >}}

## Markdown Function Expand Support

### pangujs

这是一段测试pangu之白的article，看看渲染出来的效果如何

### Alert Block 

接下来测试各个关键词的渲染效果并进行调整， 首先就是 Note


> [!note]
> test note block's style.

其次是：important

> [!important]
>  重要内容

接着是：tip

> [!tip]
> 这是一些提示内容

再次是 warning

> [!warning]
> 这是一些告警内容

最后是caution

> [!caution]
> 重要内容

然后测试一个自己添加的

> [!summary]
> 总结

### mermaid 

mermaid 的跟随主题切换更改渲染的方式一直不work，暂时使用black theme加渲染的方式做处理。

```mermaid
flowchart LR

G[工作强度]
G --> A
G --> C
G --> E
A["主动"策略] --> B[卷，按照表现辞退， 工作时间长，薪资构成=基本工资+基金表现*贡献Rate]
C["被动"跟踪] --> D[WLB, 固定工资，晋升->管理]
E["混合"] --> F[介于两者之间，薪资与公司表现挂钩]
```

下面给出一个官方的不同实例来看不同的模式下的不同渲染情况

```mermaid
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
```

最后再来一个常规的流程图，或者说是概率图

```mermaid
---
title: Action Distrubution based on Feature
---
flowchart LR

A[DragonBeenAtkBySomeone] --> B1[Value 1] 
B1 -- 60% --> C[Atk Target is Dragon]
B1 -- 40% --> D[Other Action]

A --> B2[Value 0] --> E[All Action Possible]
```


## Default ShortCodes

### gist

https://www.andbible.com/post/hugo-content-management-shortcodes/

{{< gist spf13 7896402 "img.html" >}}

### youtube

{{< youtube id="w7Ft2ymGmfc"  >}}

### twitter

{{< tweet user="SanDiegoZoo" id="1453110110599868418" >}}

### ins

{{< instagram CxOWiQNP2MO >}}



## FI