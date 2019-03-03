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

> ## 什么是Java内存模型？
>

内存模型描述了**程序中各个变量（实例域、静态域和数组元素）之间的关系**，以及在实际计算机系统中将变量存储到内存和从内存中取出变量这样的底层细节，对象最终是存储在内存里面的，这点没有错，但是编译器、运行库、处理器或者系统缓存可以有特权在变量指定内存位置存储或者取出变量的值。

【JMM】（Java Memory Model的缩写）允许编译器和缓存以数据在处理器特定的缓存（或寄存器）和主存之间移动的次序拥有重要的特权，除非程序员使用了volatile或synchronized明确请求了某些可见性的保证。

![java memory model](http://ww1.sinaimg.cn/large/006jIRTegy1g0q000qdx6j30sg0h9dlc.jpg)

> ## Java内存模型分类
>

java 内存结构分为以下5类：

1. 方法区（Method Area）
2. 堆（Heap）
3. 虚拟机栈（JVM Stacks）
4. 本地方法栈（Native Method Stacks）
5. 程序计数器（Program Counter Register）

![内存结构](http://ww1.sinaimg.cn/large/006jIRTegy1g0q0hhno6lj30k70dagm8.jpg)

再通过一张图来了解如何通过参数来控制各区域的内存大小

![各区域的内存大小](http://ww1.sinaimg.cn/large/006jIRTegy1g0pzxyf87ej30sg0h940g.jpg)

**控制参数**

- -Xms设置堆的最小空间大小。
- -Xmx设置堆的最大空间大小。
- -XX:NewSize设置新生代最小空间大小。
- -XX:MaxNewSize设置新生代最大空间大小。
- -XX:PermSize设置永久代最小空间大小。
- -XX:MaxPermSize设置永久代最大空间大小。
- -Xss设置每个线程的堆栈大小。

> ### 方法区（Method Area）
>

***线程共享***

**描述：**

**它用于存储已被虚拟机加载的类信息、常量、静态变量、即时编译器编译后的代码等数据**

即时编译器编译后的代码（比如spring 使用IOC创建bean时，或者使用cglib反射的形式动态生成代理类class信息等）。

![](http://ww1.sinaimg.cn/large/006jIRTegy1g0q0yt834kj30rs0pot8u.jpg)

*注意：JDK 6 时，String等字符串常量的信息是置于方法区中的，但是到了JDK 7 时，已经移动到了Java堆。所以，方法区也好，Java堆也罢，到底详细的保存了什么，其实没有具体定论，要结合不同的JVM版本来分析。*



> ### 堆（Heap）
>

***线程共享***

**描述：**

Java堆是被所有线程共享的一块内存区域，在虚拟机启动时创建。此内存区域的唯一目的就是存放对象实例，**几乎所有的对象实例都在这里分配内存**。

#### 组成

- 新生代
  - Eden空间
  - From Survivor空间
  - To Survivor空间
- 老年代

![](http://ww1.sinaimg.cn/large/006jIRTegy1g0q000qdx6j30sg0h9dlc.jpg)

> ### 虚拟机栈（JVM Stacks）
>

***线程独享***

**描述：**

**虚拟机栈描述的是Java方法执行的内存模型**：每个方法被执行的时候都会同时创建一个栈帧（Stack Frame）用于存储局部变量表、操作栈、动态链接、方法出口等信息。**每一个方法被调用直至执行完成的过程，就对应着一个栈帧在虚拟机栈中从入栈到出栈的过程。**

#### 组成

- 栈帧(Stack Frame)
  - 局部变量表
  - 操作数栈
  - 动态连接
  - 方法返回地址
  - 附加信息

![内存结构](http://ww1.sinaimg.cn/large/006jIRTegy1g0q0hhno6lj30k70dagm8.jpg)

> ### 本地方法栈（Native Method Stacks）
>

***线程独享***

**描述：**

本地方法栈（Native Method Stacks）与虚拟机栈所发挥的作用是非常相似的，其区别不过是虚拟机栈为虚拟机执行Java方法（也就是字节码）服务，而**本地方法栈则是为虚拟机使用到的Native方法服务。**虚拟机规范中对本地方法栈中的方法使用的语言、使用方式与数据结构并没有强制规定，因此具体的虚拟机可以自由实现它。甚至有的虚拟机（譬如Sun HotSpot虚拟机）直接就把本地方法栈和虚拟机栈合二为一。



> ### 程序计数器（Program Counter Register）
>

***线程独享***

**描述：**

程序计数器（Program Counter Register）是一块较小的内存空间，它的作用可以看做是当前线程所执行的字节码的行号指示器。在虚拟机的概念模型里（仅是概念模型，各种虚拟机可能会通过一些更高效的方式去实现），字节码解释器工作时就是通过改变这个计数器的值来选取下一条需要执行的字节码指令，分支、循环、跳转、异常处理、线程恢复等基础功能都需要依赖这个计数器来完成。

由于Java虚拟机的多线程是通过线程轮流切换并分配处理器执行时间的方式来实现的，在任何一个确定的时刻，一个处理器（对于多核处理器来说是一个内核）只会执行一条线程中的指令。因此，为了线程切换后能恢复到正确的执行位置，每条线程都需要有一个独立的程序计数器，各条线程之间的计数器互不影响，独立存储，我们称这类内存区域为“线程私有”的内存。

如果线程正在执行的是一个Java方法，这个计数器记录的是正在执行的虚拟机字节码指令的地址；如果正在执行的是Natvie方法，这个计数器值则为空（Undefined）。

## 参考文章

[纯洁的微笑](https://zhuanlan.zhihu.com/p/34426768)

[Jam](https://okayjam.com/index.php/jam/)

## [我的主页](https://suveng.github.io/blog/)