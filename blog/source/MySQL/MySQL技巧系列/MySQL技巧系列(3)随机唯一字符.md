title:  MySQL技巧系列(3)随机唯一字符
date: 2019-01-24 14:00:00 +0800
update: 2019-01-24 14:00:00 +0800
author: me
cover: https://ws1.sinaimg.cn/large/006jIRTegy1fzk6nsxqxmj31jk0v9as5.jpg
preview:  作为搬砖党的一族们，对MySQL一定再熟悉不过了，*MySQL* 是最流行的关系型数据库管理系统
tags:

  -  MySQL技巧系列

---



[TOC]

![封面图](https://ws1.sinaimg.cn/large/006jIRTegy1fzk6nsxqxmj31jk0v9as5.jpg)

# MySQL技巧系列(3)随机唯一字符

## 缘由

写测试数据需要用到生成随机唯一字符作为主键

## 代码

```sql
SELECT UUID(); 
SELECT MD5(RAND()) ;
```

### 介绍

UUID：通用唯一识别码（英语：Universally Unique Identifier，UUID），是用于计算机体系中以识别信息数目的一个128位标识符，还有相关的术语：全局唯一标识符（GUID）。根据标准方法生成，不依赖中央机构的注册和分配，UUID具有唯一性，这与其他大多数编号方案不同。重复UUID码概率接近零，可以忽略不计。

## [我的主页](https://suveng.github.io/blog/)























