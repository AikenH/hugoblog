---
calendar_date: 2022-08-05
catalog: true
categories:
- SQL入门笔记
cover:
  image: /cover/cover3.jpeg
date: 2022-08-05 17:30:00
lang: cn
mathjax: false
subtitle: mySQL and business
tags:
- SQL
thumbnail: /img/header_img/lml_bg3.jpg
title: SQL Chapter5 mysql与事务
toc: true
---

廖雪峰的SQL教程的学习笔记

## mySQL

how to connect mysql? Using CMD(or MySQL Client) to carry out 

```shell
# local, default port is 3306
mysql -u root -p
# remote
mysql -h <ip> -u root -p
```

root here is the `<username>`, we may using other name in specific situation.

`mysql`实际上时MySQL的客户端，真正的MySQL服务器程序时`mysqld`在后台运行。



----

如果希望借助可视化图形界面进行操作，可以使用[MySQL Workbench](https://dev.mysql.com/downloads/workbench/)进行可视化的增删改查（底层还是基于sql的命令行指令进行）。

### 数据库

运行MySQL的服务器可以同时创建多个数据库

- 可以使用`SHOW DATABASES;`列出所有的数据库，其中`information_schema`、`mysql`、`performance_schema`和`sys`是系统库，不要去改动它们。其他的是用户创建的数据库。
- 新建数据库：`CREATE DATABASE <database_name>;`
- 删除数据库：`DROP DATABASE;`其中的数据将被完全删除
- 进入数据库（切换活动的数据库）:`USE <database_name>;`当我们切换到指定数据库的时候，我们才能对其进行操作

### 表

```sql
-- 列出所有表
SHOW TABLES；
-- 查看表的结构
DESC <tables_name>;
-- 查看创建表的语句
SHOW CREATE TABLE <tables_name>;
-- 创建表
CREATE TABLE <tables_name>;
-- 删除表
DROP TABLE <tables_name>;
```

如果要修改表的话，相对更为复杂一些，如果要为表增加一列`birth`,使用

```sql
ALTER TABLE students ADD COLUMN birth VARCHAR(10) NOT NULL;
```

名称后面指定类型和是否允许为NULL。

修改特定列的名称和属性的话：

```sql
ALTER TABLE students CHANGE COLUMN birth birthday VARCHAR(20) NOT NULL;
```

删除列使用：

```sql
ALTER TABLE students DROP COLUMN birthday;
```

## 实用SQL语句

### 插入或替换

如果我们希望插入一条新记录（INSERT），但如果记录已经存在，就先删除原记录，再插入新记录。此时，可以使用`REPLACE`语句，这样就不必先查询，再决定是否先删除再插入：

```sql
REPLACE INTO students (id, class_id, name, gender, score) VALUES (1, 1, '小明', 'F', 99);
```

若`id=1`的记录不存在，`REPLACE`语句将插入新记录，否则，当前`id=1`的记录将被删除，然后再插入新记录。

### 插入或更新

如果我们希望插入一条新记录（INSERT），但如果记录已经存在，就更新该记录，此时，可以使用`INSERT INTO ... ON DUPLICATE KEY UPDATE ...`语句：

```sql
INSERT INTO students (id, class_id, name, gender, score) VALUES (1, 1, '小明', 'F', 99) ON DUPLICATE KEY UPDATE name='小明', gender='F', score=99;
```

若`id=1`的记录不存在，`INSERT`语句将插入新记录，否则，当前`id=1`的记录将被更新，更新的字段由`UPDATE`指定。

### 插入或忽略

如果我们希望插入一条新记录（INSERT），但如果记录已经存在，就啥事也不干直接忽略，此时，可以使用`INSERT IGNORE INTO ...`语句：

```sql
INSERT IGNORE INTO students (id, class_id, name, gender, score) VALUES (1, 1, '小明', 'F', 99);
```

若`id=1`的记录不存在，`INSERT`语句将插入新记录，否则，不执行任何操作。

### 快照

如果想要对一个表进行快照，即复制一份当前表的数据到一个新表，可以结合`CREATE TABLE`和`SELECT`：

```sql
-- 对class_id=1的记录进行快照，并存储为新表students_of_class1:
CREATE TABLE students_of_class1 SELECT * FROM students WHERE class_id=1;
```

新创建的表结构和`SELECT`使用的表结构完全一致。

### 写入查询结果集

如果查询结果集需要写入到表中，可以结合`INSERT`和`SELECT`，将`SELECT`语句的结果集直接插入到指定表中。

例如，创建一个统计成绩的表`statistics`，记录各班的平均成绩：

```sql
CREATE TABLE statistics (
    id BIGINT NOT NULL AUTO_INCREMENT,
    class_id BIGINT NOT NULL,
    average DOUBLE NOT NULL,
    PRIMARY KEY (id)
);
```

然后，我们就可以用一条语句写入各班的平均成绩：

```sql
INSERT INTO statistics (class_id, average) SELECT class_id, AVG(score) FROM students GROUP BY class_id;
```

确保`INSERT`语句的列和`SELECT`语句的列能一一对应，就可以在`statistics`表中直接保存查询的结果：

```sql
> SELECT * FROM statistics;
+----+----------+--------------+
| id | class_id | average      |
+----+----------+--------------+
|  1 |        1 |         86.5 |
|  2 |        2 | 73.666666666 |
|  3 |        3 | 88.333333333 |
+----+----------+--------------+
3 rows in set (0.00 sec)
```

### 强制使用指定索引

在查询的时候，数据库系统会自动分析查询语句，并选择一个最合适的索引。但是很多时候，数据库系统的查询优化器并不一定总是能使用最优索引。如果我们知道如何选择索引，可以使用`FORCE INDEX`强制查询使用指定的索引。例如：

```sql
> SELECT * FROM students FORCE INDEX (idx_class_id) WHERE class_id = 1 ORDER BY id DESC;
```

指定索引的前提是索引`idx_class_id`必须存在。

## 事务

在执行SQL语句的时候，某些业务要求，一系列操作必须全部执行，而不能仅执行一部分。例如，一个转账操作：

```
-- 从id=1的账户给id=2的账户转账100元
-- 第一步：将id=1的A账户余额减去100
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
-- 第二步：将id=2的B账户余额加上100
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
```

这两条SQL语句必须全部执行，或者，由于某些原因，如果第一条语句成功，第二条语句失败，就必须全部撤销。

这种把多条语句作为一个整体进行操作的功能，被称为数据库*事务*。数据库事务可以确保该事务范围内的所有操作都可以全部成功或者全部失败。如果事务失败，那么效果就和没有执行这些SQL一样，不会对数据库数据有任何改动。

**可见，数据库事务需要具有ACID四个特性**

- A：Atomic，原子性，将所有SQL作为原子工作单元执行，要么全部执行，要么全部不执行；
- C：Consistent，一致性，事务完成后，所有数据的状态都是一致的，即A账户只要减去了100，B账户则必定加上了100；
- I：Isolation，隔离性，如果有多个事务并发执行，每个事务作出的修改必须与其他事务隔离；
- D：Duration，持久性，即事务完成后，对数据库数据的修改被持久化存储。

对于单条SQL语句，数据库系统自动将其作为一个事务执行，这种事务被称为***隐式事务***。

要手动把多条SQL语句作为一个事务执行，使用`BEGIN`开启一个事务，使用`COMMIT`提交一个事务，这种事务被称为*显式事务*，例如，把上述的转账操作作为一个显式事务：

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
```

`COMMIT`是指提交事务，即试图把事务内的所有SQL所做的修改永久保存。如果`COMMIT`语句执行失败了，整个事务也会失败。

有些时候，我们希望主动让事务失败，这时，可以用`ROLLBACK`回滚事务，整个事务会失败：

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
ROLLBACK;
```

对于两个并发执行的事务，如果涉及到操作同一条记录的时候，可能会发生问题。因为并发操作会带来数据的不一致性，包括脏读、不可重复读、幻读等。数据库系统提供了隔离级别来让我们有针对性地选择事务的隔离级别，避免数据不一致的问题。

SQL标准定义了4种隔离级别，分别对应可能出现的数据不一致的情况：

| Isolation Level  | 脏读（Dirty Read） | 不可重复读（Non Repeatable Read） | 幻读（Phantom Read） |
| :--------------- | :----------------- | :-------------------------------- | :------------------- |
| Read Uncommitted | Yes                | Yes                               | Yes                  |
| Read Committed   | -                  | Yes                               | Yes                  |
| Repeatable Read  | -                  | -                                 | Yes                  |
| Serializable     | -                  | -                                 | -                    |

我们会依次介绍4种隔离级别的数据一致性问题。

- 在这种隔离级别下，一个事务会读到另一个事务更新后但未提交的数据，如果另一个事务回滚，那么当前事务读到的数据就是脏数据，这就是脏读（Dirty Read）。
- 在Read Committed隔离级别下，一个事务可能会遇到不可重复读（Non Repeatable Read）的问题。不可重复读是指，在一个事务内，多次读同一数据，在这个事务还没有结束时，如果另一个事务恰好修改了这个数据，那么，在第一个事务中，两次读取的数据就可能不一致。
- 在Repeatable Read隔离级别下，一个事务可能会遇到幻读（Phantom Read）的问题，幻读是指，在一个事务中，第一次查询某条记录，发现没有，但是，当试图更新这条不存在的记录时，竟然能成功，并且，再次读取同一条记录，它就神奇地出现了。

Serializable是最严格的隔离级别。在Serializable隔离级别下，所有事务按照次序依次执行，因此，脏读、不可重复读、幻读都不会出现。

虽然Serializable隔离级别下的事务具有最高的安全性，但是，由于事务是串行执行，所以效率会大大下降，应用程序的性能会急剧降低。如果没有特别重要的情景，一般都不会使用Serializable隔离级别。

### 默认隔离级别

如果没有指定隔离级别，数据库就会使用默认的隔离级别。在MySQL中，如果使用InnoDB，默认的隔离级别是Repeatable Read。