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



## mermaid 

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