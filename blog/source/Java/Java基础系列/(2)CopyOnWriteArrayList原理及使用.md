title:  (2)CopyOnWriteArrayList原理及使用
date: 2019-03-17 13:00:00 +0800
update: 2019-03-17 13:00:00 +0800
author: me
cover: http://ww1.sinaimg.cn/large/006jIRTegy1g162hcewk8j31kw11xe05.jpg
preview:  CopyOnWriteArrayList这是一个ArrayList的线程安全的变体。避免了ConcurrentModificationException
tags:

  -  Java基础系列

---



[TOC]

![封面图](http://ww1.sinaimg.cn/large/006jIRTegy1g162hcewk8j31kw11xe05.jpg)

# (2)CopyOnWriteArrayList原理及使用

## 原理

CopyOnWriteArrayList:CopyOnWriteArrayList这是一个ArrayList的线程安全的变体，其原理大概可以通俗的理解为:

初始化的时候只有一个容器，很常一段时间，这个容器数据、数量等**没有发生变化的时候**，大家(多个线程)，都是读取(假设这段时间里只发生读取的操作)**同一个容器中的数据**，所以这样大家读到的数据都是唯一、一致、安全的，但是后来有人往里面**增加了一个数据**，这个时候CopyOnWriteArrayList 底层实现添加的原理是**先copy出一个容器**(可以简称副本)，**再往新的容器里添加**这个新的数据，最后把**新**的容器的引用地址**赋值**给了之前那个**旧**的的容器地址，但是在添加这个数据的期间，其他线程如果要去读取数据，仍然是读取到旧的容器里的数据。

## 示例

> 报错版

```java
public class Resource3 {
 
    public static void main(String[] args) throws InterruptedException {
        List<String> a = new ArrayList<String>();
        a.add("a");
        a.add("b");
        a.add("c");
        final ArrayList<String> list = new ArrayList<String>(
                a);
        Thread t = new Thread(new Runnable() {
            int count = -1;
 
            @Override
            public void run() {
                while (true) {
                    list.add(count++ + "");
                }
            }
        });
        t.setDaemon(true);
        t.start();
        Thread.currentThread().sleep(3);
        for (String s : list) {
            System.out.println(s);
        }
    }
}
```

这段代码运行的时候就会抛出java.util.ConcurrentModificationException错误。这是因为主线程在遍历list的时候，子线程在向list中添加元素。

> 正确版

```java
public class Resource3 {
 
    public static void main(String[] args) throws InterruptedException {
        List<String> a = new ArrayList<String>();
        a.add("a");
        a.add("b");
        a.add("c");
        final CopyOnWriteArrayList<String> list = new CopyOnWriteArrayList<String>(a);
        Thread t = new Thread(new Runnable() {
            int count = -1;
 
            @Override
            public void run() {
                while (true) {
                    list.add(count++ + "");
                }
            }
        });
        t.setDaemon(true);
        t.start();
        Thread.currentThread().sleep(3);
        for (String s : list) {
            System.out.println(list.hashCode());
            System.out.println(s);
        }
    }
}
```

## [我的主页](https://suveng.github.io/blog/)