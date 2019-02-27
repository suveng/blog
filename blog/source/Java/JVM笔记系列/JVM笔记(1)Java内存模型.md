title:  JVM笔记(1)Java内存模型
date: 2019-02-26 12:00:00 +0800
update: 2019-02-26 12:00:00 +0800
author: me
cover: https://ws1.sinaimg.cn/large/006jIRTegy1g0iv1b5idrj31hc0u0wwj.jpg
preview:  JVM是一种用于计算设备的规范，它是一个虚构出来的计算机，是通过在实际的计算机上模拟各种计算机功能来实现
tags:

  -  JVM笔记

---



[TOC]

![封面图](https://ws1.sinaimg.cn/large/006jIRTegy1g0iv1b5idrj31hc0u0wwj.jpg)

# JVM笔记(1)Java内存模型

## 什么是Java内存模型？

内存模型描述了**程序中各个变量（实例域、静态域和数组元素）之间的关系**，以及在实际计算机系统中将变量存储到内存和从内存中取出变量这样的底层细节，对象最终是存储在内存里面的，这点没有错，但是编译器、运行库、处理器或者系统缓存可以有特权在变量指定内存位置存储或者取出变量的值。

【JMM】（Java Memory Model的缩写）允许编译器和缓存以数据在处理器特定的缓存（或寄存器）和主存之间移动的次序拥有重要的特权，除非程序员使用了volatile或synchronized明确请求了某些可见性的保证。



## [我的主页](https://suveng.github.io/blog/)