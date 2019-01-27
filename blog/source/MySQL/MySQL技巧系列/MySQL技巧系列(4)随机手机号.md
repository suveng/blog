title: MySQL技巧系列(4)随机手机号
date: 2019-01-24 15:00:00 +0800
update: 2019-01-24 15:00:00 +0800
author: me
cover: https://ws1.sinaimg.cn/large/006jIRTegy1fzk6obwqvmj31kw0w0n63.jpg
preview:  作为搬砖党的一族们，对MySQL一定再熟悉不过了，*MySQL* 是最流行的关系型数据库管理系统
tags:

  -  MySQL技巧系列

---



[TOC]

![封面图](https://ws1.sinaimg.cn/large/006jIRTegy1fzk6obwqvmj31kw0w0n63.jpg)

# MySQL技巧系列(4)随机手机号

## 缘由：

测试数据需要造一些手机号码、微信账号

## 代码：

```sql
-- 随机手机号
CREATE  FUNCTION `generatePhone`() RETURNS char(11) CHARSET utf8
    DETERMINISTIC
BEGIN
    DECLARE head VARCHAR(100) DEFAULT '000,156,136,176';
    DECLARE content CHAR(10) DEFAULT '0123456789';
    DECLARE phone CHAR(11) DEFAULT substring(head, 1+(FLOOR(1 + (RAND() * 3))*4), 3);
    
    #SET phone = CONCAT(phone, substring('156,136,123,456,789', 1+(FLOOR(1 + (RAND() * 4))*4), 3));
    
    DECLARE i int DEFAULT 1;
    DECLARE len int DEFAULT LENGTH(content);
    WHILE i<9 DO
        SET i=i+1;
        SET phone = CONCAT(phone, substring(content, floor(1 + RAND() * len), 1));
    END WHILE;
    
    RETURN phone;
END
```

## 转载

[宏宇天成](https://yq.aliyun.com/articles/632586)

## [我的主页](https://suveng.github.io/blog/)

















