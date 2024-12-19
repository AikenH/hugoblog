---
calendar_date: 2022-08-05
catalog: true
categories:
- SQL入门笔记
cover:
  image: /cover/cover20.jpeg
date: 2022-08-05 15:20:00
description: 增删改（查）
lang: cn
mathjax: false
tags:
- SQL
thumbnail: /img/header_img/lml_bg20.jpg
title: SQL Chapter4  增删改相关操作
toc: true
---

基本操作无非就是增删改查，查询在上一章Select已经学习完毕，而剩下的增、删、改对应的关键词分别是：

- INSERT：插入新纪录
- UPDATE：更新现有记录
- DELETE：删除已有记录

接下来具体讨论各种用法：

## 插入

使用关键字`INSERT`进行数据和记录的插入，其基本语法如下：

```SQL
INSERT INTO <表名>(字段1,字段2,...) VALUES(值1，值2,...)
```

例如向`students`表中插入一条新数据，先列出需要添加数据的字段，然后按照字段的次序添加值

```sql
-- 添加记录
INSERT INTO students (class_id, name, gender, score) value(2,'大牛','M',80);
```

自增字段（id）或者其他有默认值的字段可以省略。其中需要注意的是：

- 字段顺序不必和数据库表的字段顺序一致
- 但是值的顺序必须和字段顺序一致

同时**插入多条记录**的写法如下：

```sql
INSERT INTO students (class_id, name, gender, score) VALUES
  (1, '大宝', 'M', 87),
  (2, '二宝', 'M', 81);
```



## 更新

使用关键字`update`更新数据表中的记录，其基本语法如下：

```sql
UPDATE <表名> SET 字段1=值1, 字段2=值2, ... WHERE ...;
```

前面填写修改后的值，通过`WHERE`选出我们需要修改的记录

```sql
UPDATE students SET name='大牛', score=66 WHERE id=2
```

由于基于条件记录的特性，我们可以**一次**修改条件筛选出来的**多个记录**，同时可以在更新过程中使用表达式，

```sql
UPDATE students SET score=score+10 WHERE score<80;
```

上式会将所有80分以下的同学的分数＋10分

当没有使用WHERE的时候将会对表的整体进行更新，需要谨慎使用。

> 在使用真实的MySQL这类关系数据库时，update会返回更新的行数以及WHERE条件匹配的行数。

## 删除

删除显然使用的时`DELETE`语句，其基本语法如下：

```sql
DELETE FROM <表名> WHERE ...;
```

例如：删除students表中id=1的记录

```sql
DELETE FROM students WHERE id=1;
```

和更新类似，基于条件也可能一次删除多个记录，如果没有匹配就没有删除，不带条件的删除将会删除整个表格。

> 在使用真实的MySQL这类关系数据库时，delete会返回删除的行数以及WHERE条件匹配的行数。