title:  Java并发系列(1)线程基础
date: 2019-01-16 12:00:00 +0800
update: 2019-01-16 12:00:00 +0800
author: me
cover: https://ws1.sinaimg.cn/large/006jIRTegy1fz08sday3vj31jk15odv2.jpg
preview:  线程是一个独立执行的调用序列,同一个进程的线程在同一时刻共享一些系统资源,也能访问同一个进程所创建的对象资源
tags:

  -  Java并发系列

---



[TOC]

![封面图](https://ws1.sinaimg.cn/large/006jIRTegy1fz08sday3vj31jk15odv2.jpg)

# Java并发系列(1)线程基础

## 线程介绍

线程是一个独立执行的调用序列，同一个进程的线程在同一时刻共享一些系统资源（比如文件句柄等）也能访问同一个进程所创建的对象资源（内存资源）。java.lang.Thread对象负责统计和控制这种行为。

每个程序都至少拥有一个线程-即作为Java虚拟机(JVM)启动参数运行在主类main方法的线程。在Java虚拟机初始化过程中也可能启动其他的后台线程。这种线程的数目和种类因JVM的实现而异。然而所有用户级线程都是显式被构造并在主线程或者是其他用户线程中被启动。

### 线程分类

只要当前JVM实例中尚存任何一个非守护线程没有结束，守护线程就全部工作；只有当最后一个非守护线程结束是，守护线程随着JVM一同结束工作，Daemon作用是为其他线程提供便利服务，守护线程最典型的应用就是GC(垃圾回收器)，他就是一个很称职的守护者。

User和Daemon两者几乎没有区别，唯一的不同之处就在于虚拟机的离开：如果 User Thread已经全部退出运行了，只剩下Daemon Thread存在了，虚拟机也就退出了。 因为没有了被守护者，Daemon也就没有工作可做了，也就没有继续运行程序的必要了。

> User Thread(用户线程)

粗略理解，非守护线程约等于用户线程

```java
Thread one = new Thread();
one.setDaemon(false);
```

> DaemonThread(守护线程)

```java
Thread one = new Thread();
one.setDaemon(true);
```

### 线程信息

Thread类的对象中保存了一些属性信息能够帮助我们来辨别每一个线程，知道它的状态，调整控制其优先级。

部分Thread类的属性：

* ID: 每个线程的独特标识。
* Name: 线程的名称。
* Priority: 线程对象的优先级。优先级别在1-10之间，1是最低级，10是最高级。不建议改变它们的优先级，但是你想的话也是可以的。
* Status: 线程的状态。在Java中，线程只能有这6种中的一种状态： new, runnable, blocked, waiting, time waiting, 或 terminated.

```java
/**
* 打印线程信息
**/
private static void  printThreadInfo(Thread thread){
    System.out.println("线程ID："+thread.getId());
    System.out.println("线程名字："+thread.getName());
    System.out.println("线程优先级："+thread.getPriority());
    System.out.println("线程状态："+thread.getState());
    System.out.println("线程只能有这6种中的一种状态： new, runnable, blocked, waiting, time waiting, 或 terminated.");
    }

public static void main(String[] args) {
    System.out.println("建议单个测试");
    printThreadInfo(Thread.currentThread());
}
```



## 线程生命周期

#### 系统进程生命周期



#### Java线程状态转换

在Java中，线程只能有这6种中的一种状态： new, runnable, blocked, waiting, time waiting, 或 terminated.

在JDK源码中有个内部枚举类，如下：

```java
	/ **
      *线程状态。 线程可以处于以下状态之一：
      * #NEW
      *尚未启动的线程处于此状态。
      * #RUNNABLE
      *在Java虚拟机中执行的线程处于此状态
      * #BLOCKED
      *被阻塞等待监视器锁定的线程
      *处于这种状态
      *#WAITING
      *一个无限期等待另一个线程的线程
      *执行特定操作处于此状态。
      * #TIMED_WAITING
      *正在等待另一个线程执行操作的线程
      *在指定的等待时间内处于此状态。
      * #TERMINATED
      *已退出的线程处于此状态。
      *线程在给定时间点只能处于一种状态。
      *这些状态是虚拟机状态，不反映
      *任何操作系统线程状态。
      * @since 1.5
      * @see #getState
      * /
    public enum State {
        /**
         * 线程创建之后，但是还没有启动(not yet started)。这时候它的状态就是NEW
         */
        NEW,

        /**
         *RUNNABLE: 正在Java虚拟机下跑任务的线程的状态。在RUNNABLE状态下的线程可能会处于等待状态， 因为		*它正在等待一些系统资源的释放，比如IO
         */
        RUNNABLE,

        /**
         *BLOCKED: 阻塞状态，等待锁的释放，比如线程A进入了一个synchronized方法，
         *线程B也想进入这个方法，但是这个方法的锁已经被线程A获取了，这个时候线程B就处于BLOCKED状态
         */
        BLOCKED,

        /**
         *WAITING: 等待状态，处于等待状态的线程是由于执行了3个方法中的任意方法。 
         *1. Object的wait方法，并且没有使用timeout参数; 
         *2. Thread的join方法，没有使用timeout参数 
         *3. LockSupport的park方法。 处于waiting状态的线程会等待另外一个线程处理特殊的行为。 
         *再举个例子，如果一个线程调用了一个对象的wait方法，那么这个线程就会处于waiting状态
         *直到另外一个线程调用这个对象的notify或者notifyAll方法后才会解除这个状态
         */
        WAITING,

        /**
         *TIMED_WAITING: 有等待时间的等待状态
         * 比如调用了以下几个方法中的任意方法，并且指定了等待时间，线程就会处于这个状态。 
         * 1. Thread.sleep方法 
         * 2. Object的wait方法，带有时间 
         * 3. Thread.join方法，带有时间 
         * 4. LockSupport的parkNanos方法，带有时间 
         * 5. LockSupport的parkUntil方法，带有时间
         */
        TIMED_WAITING,

        /**
         *  线程中止的状态，这个线程已经完整地执行了它的任务
         */
        TERMINATED;
    }
```

![Java线程状态转换](https://ws1.sinaimg.cn/large/006jIRTegy1fz8kzagq1bj30u90hyac1.jpg)





## 线程创建并启动

## 优雅停止线程

## 线程优先级

## 线程组

## 线程池

## 线程同步

## 运行过程

## 线程异常处理

## 设计技巧

## happens-before

## 参考文章

* [importnew](http://www.importnew.com/26834.html)

## [我的主页](https://suveng.github.io/blog/)



