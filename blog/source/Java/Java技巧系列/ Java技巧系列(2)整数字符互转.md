title:  Java技巧系列(2)整数字符互转
date: 2018-02-04 12:00:00 +0800
update: 2018-02-04 12:00:00 +0800
author: me
cover: https://ws1.sinaimg.cn/large/006jIRTegy1g0ivb0objsj31hc0u0b29.jpg
preview:  作为搬砖党的一族们，对类型转换一定再熟悉不过了，不要说你很少进行类型转换
tags:

  -  Java技巧系列

---



[TOC]

![封面图](https://ws1.sinaimg.cn/large/006jIRTegy1g0ivb0objsj31hc0u0b29.jpg)

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