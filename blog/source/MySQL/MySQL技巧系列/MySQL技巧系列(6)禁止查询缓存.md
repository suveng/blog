title: MySQL技巧系列(6)禁止查询缓存
date: 2019-02-06 17:00:00 +0800
update: 2019-02-06 17:00:00 +0800
author: me
cover: https://ws1.sinaimg.cn/large/006jIRTegy1fzk6pphwuvj31hd0u0174.jpg
preview:  作为搬砖党的一族们，对MySQL一定再熟悉不过了，*MySQL* 是最流行的关系型数据库管理系统
tags:

  -  MySQL技巧系列

---



[TOC]

![封面图](https://ws1.sinaimg.cn/large/006jIRTegy1fzk6pphwuvj31hd0u0174.jpg)

# MySQL技巧系列(6)禁止重置查询缓存

## 代码

```sql
SELECT SQL_NO_CACHE * FROM TABLE //禁止缓存当前查询的结果
RESET QUERY CACHE //充值查询缓存
```

## [我的主页](https://suveng.github.io/blog/)