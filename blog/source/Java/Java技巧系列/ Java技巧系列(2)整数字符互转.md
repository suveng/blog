title:  Java技巧系列(2)整数字符互转
date: 2019-02-04 12:00:00 +0800
update: 2019-02-04 12:00:00 +0800
author: me
cover: https://ws1.sinaimg.cn/large/006jIRTegy1fz08sday3vj31jk15odv2.jpg
preview:  作为搬砖党的一族们，对类型转换一定再熟悉不过了，不要说你很少进行判空
tags:

  -  Java技巧系列

---



[TOC]

# ![封面图](https://ws1.sinaimg.cn/large/006jIRTegy1fz08sday3vj31jk15odv2.jpg)

# Java技巧系列(2)整数字符互转

## 示例

```java
  // 数字转换为字符串
    int   a = 332;
    String str = String.valueOf(a);
  //字符串转换为数字
    String str = "abcd";
     int a = Integer.parseInt(str);
   //字符串转化为字符数组
     String str = " acbd";
     char[] c = str.toCharArray();
  //字符数组转化为字符串
    char[] c = {'a','b','c'};
    String str = String.valueOf(c);
```

## [我的主页](https://suveng.github.io/blog/)