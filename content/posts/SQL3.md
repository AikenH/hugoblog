---
calendar_date: 2022-08-04
catalog: true
categories:
- SQL入门笔记
cover:
  image: /cover/cover19.jpeg
date: 2022-08-04 14:40:00
description: Query in SQL
lang: cn
mathjax: false
tags:
- SQL
thumbnail: /img/header_img/lml_bg19.jpg
title: SQL Chapter3 查询命令
toc: true
---

该章节介绍SQL中的查询命令，根据[廖雪峰网站](https://www.liaoxuefeng.com/wiki/1177760294764384/1179610888796448)进行一步步的测试和学习即可。

- 其中`–`为sql语言中的注释符号。
- 关键词不区分大小写

## 基本查询

查询表中的所有数据主要使用关键词`SELECT`

```sql
SELECT * FROM <表名>
```

- `SELECT`表明要执行查询
- `*`代表“所有列”
- `FROM`表明要从哪个表查询

当指定特定列名的时候（也就是所谓的**投影查询**）格式如下：

```sql
SELECT <KEY1>,<KEY2>, FROM <表名>
-- 注释
```

此外，许多工具会使用`SELECT 1;`来测试数据库链接的有效性；`SELECT 100+200`也可以用来做简单的计算。



## 条件查询

**条件查询详细资料**：[sql](https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_between)，通过官方网站可以找到更完整的条件语句和用法

在`SELECT`命令中添加`WHERE`关键词进行条件查询

```sql
SELECT * FROM <表名> WHERE <条件表达式>
-- 一个典型的例子如下
SELECT * FROM students WHERE score>80 AND gender='M'
```

在sql中主要的条件语句关键字为：`AND`，`OR`，`NOT`

可以使用`()`来组合条件语句（3个或或者更多条件常用）

```sql
SELECT * FROM students WHERE (score < 80 OR score > 90) AND gender = 'M';
```

如果不使用括号组合的话，就按照传统的条件语句的优先级来执行即`NOT`，`AND`，`OR`

还有一些其他的规则如下

| 条件             | 表达式举例1     | 表达式举例2     | 说明                     |
| ---------------- | --------------- | --------------- | ------------------------ |
| =                | score=80        | name=’abc‘      | 字符串需要用单引号括起来 |
| <>判断不相等     | score<>80       | name<>‘abc’     |                          |
| 使用LIKE判断相似 | name LIKE ’ab%‘ | name like ’%ab% | %表示任意数量的任意字符  |

## 基于排序显示结果

使用`SELECT`查询时，结果通常按照`id`进行排序，也就是按照主键进行排序，这也是默认的做法，如果我们希望结果按照某些特定的条件来排序可以使用：`ORDER BY`语句。

例如我们希望按照成绩从低到高显示结果：

```sql
SELECT id, name, gender, score FROM students ORDER BY score;
```

从高到低的话则加入`DESC`关键词来使用倒序的输出，（默认的升序ASC可以省略）

```sql
SELECT id, name, gender, score FROM students ORDER BY score DESC;
```

 考虑到单项排序可能出现值相同的情况，可以加入第二关键词，当score相同的时候就用gender排序

```sql
SELECT id, name, gender, score FROM students ORDER BY score DESC, gender;
```

如果在基于排序的情况下还要使用条件语句的话，需要将`WHERE`子句放在`ORDER BY`子句前面。

```sql
SELECT id, name, gender, score
FROM students
WHERE class_id = 1
ORDER BY score DESC;
```

## 分页查询

使用`SELECT`查询时，如果结果数据量很大，一页显示的话数据量太大，我们最好分页显示，实现的代码如下：

```sql
SELECT id, name, gender, score
FROM students
ORDER BY score DESC
LIMIT 100 OFFSET 0;
```

`LIMIT`表示最多取几条，`OFFSET`表示从第几条开始，第二页就是`LIMIT 100, OFFSET 100.

- `LIMIT`总是设定为`pageSize`
- `OFFSET`计算公式为`pageSize * (pageIndex-1)`

如果`OFFSET`超过了最大的数量，会得到空的结果集，该命令可以简写为

```sql
LIMIT 100,100
```

## 聚合查询

SQL提供了聚合函数来针对查询结果进一步的统计分析，使用聚合函数进行查询就是聚合查询，它可以快速的获得结果。

比如计数，通过聚合函数就不需要一个个去数了

```sql
SELECT COUNT(*) FROM students;
```

`COUNT(*)`表示查询所有列的行数，要注意聚合的计算结果虽然是一个数字，但查询的结果仍然是一个二维表，只是这个二维表只有一行一列，并且列名是`COUNT(*)`，因此我们应该给该参数设置一个名字（变量名）

```sql
SELECT COUNT(*) num FROM students;
```

这样列名就是num了。

此外聚合查询，支持`WHERE`等语句，还有其他的聚合函数如下（更多可以上官网等去查询）：

| 函数 | 说明                                         |
| ---- | -------------------------------------------- |
| SUM  | 合计值，必须为数值类型                       |
| AVG  | 平均值，必须为数值类型                       |
| MAX  | 计算某一列的最大值，字符类型会返回排序最后的 |
| MIN  | 计算某一列的最大值，字符类型会返回排序最前的 |

要特别注意：如果聚合查询的`WHERE`条件没有匹配到任何行，`COUNT()`会返回0，而`SUM()`、`AVG()`、`MAX()`和`MIN()`会返回`NULL`：

### 分组聚合

如果我们要统计一班的学生数量，我们知道，可以用`SELECT COUNT(*) num FROM students WHERE class_id = 1;`。如果要继续统计二班、三班的学生数量，难道必须不断修改`WHERE`条件来执行`SELECT`语句吗？

对于聚合查询，SQL还提供了“分组聚合”的功能。我们使用下列的聚合查询方法：

```sql
SELECT COUNT(*) num FROM students GROUP BY class_id;
```

实现值和变量的相互对应，我们可以将二维表每行的名称加上：

```sql
SELECT class_id, COUNT(*) num FROM students GROUP BY class_id;
```

更进一步的，如果我们希望得到每个班的男女人数可以使用：

```sql
SELECT class_id, gender, COUNT(*) num FROM students GROUP BY class_id, gender;
```

练习：

1. 查询查出每个班级的平均分：

	```sql
	SELECT class_id, AVG(score) avgs FROM students GROUP BY class_id;
	```

2. 查出每个班级的男女生的平均分

   ```sql
   SELECT class_id, gender, AVG(score) avgs FROM students GROUP BY class_id, gender;
   ```
   

## 多表查询

由于不止存在一张表，当我们需要从多张表查询数据的时候，语法如下：

```sql
SELECT * FROM students, classes;
```

查询结果会显示两张表的乘积，也就是暴力累加起来，具体而言：

- 列数为两表的列数之和
- 行数为两表的行数之积

这种粗暴叠加，没有什么实际存在的意义，也**容易产生列名歧义**和**数据爆炸**。针对列名重复的问题，可以通过设置列名Alias来缓解：

```sql
-- set alias:
SELECT
    students.id sid,
    students.name,
    students.gender,
    students.score,
    classes.id cid,
    classes.name cname
FROM students, classes;
```

为了简化该操作，避免大量的编写students和classes，sql存在如下的操作：

```sql
-- set table alias as the same time
SELECT 
	s.id sid,
	s.name,
	s.gender,
	s.score,
	c.id cid,
	c.name cname
FROM students s, classes c;
```

同样别名的设置不影响条件语句的使用。

## 连接查询

### 内联

和多表查询相对应的，我们真正需要的是将主表中（部分）链接的次表数据链接到主表中，为此我们需要采用连接查询的内联语法将其中的数据取出来。具体的语法表示如下，主要包括：

- 使用Alias避免重名（非必须）
- 定义所内联的表格`inner join`
- 选择内联的列`on`

```sql
select s.id, s.name, s.class_id, c.name class_name, s.gender, s.score
from students s
inner join classes c
on s.class_id = c.id;
```

同样可以选择加入Where或者Order by字段。

### 外联

```sql
SELECT s.id, s.name, s.class_id, c.name class_name, s.gender, s.score
FROM students s
RIGHT OUTER JOIN classes c
ON s.class_id = c.id;
```

有RIGHT OUTER JOIN，就有LEFT OUTER JOIN，以及FULL OUTER JOIN。它们的区别是：

INNER JOIN只返回同时存在于两张表的行数据，由于`students`表的`class_id`包含1，2，3，`classes`表的`id`包含1，2，3，4，所以，INNER JOIN根据条件`s.class_id = c.id`返回的结果集仅包含1，2，3。

RIGHT OUTER JOIN返回右表都存在的行。如果某一行仅在右表存在，那么结果集就会以`NULL`填充剩下的字段。

LEFT OUTER JOIN则返回左表都存在的行。如果我们给students表增加一行，并添加class_id=5，由于classes表并不存在id=5的行，所以，LEFT OUTER JOIN的结果会增加一行，对应的`class_name`是`NULL`：

FULL OUTER JOIN，它会把两张表的所有记录全部选择出来，并且，自动把对方不存在的列填充为NULL：

![image-20220805150740235](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/imgs/image-20220805150740235.png)