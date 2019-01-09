title: shell入门系列( 六 )vmstat
date: 2019-01-09 10:00:00 +0800
update: 2019-01-09 10:00:00 +0800
author: me
cover: https://ws1.sinaimg.cn/large/006jIRTegy1fz08m96klgj31z4140aqo.jpg
preview:  这是Linux命令和性能监控系列的一部分。vmstat和iostat两个命令都适用于所有主要的类unix系统
tags:

  - shell系列

---

[我的主页](https://ws1.sinaimg.cn/large/006jIRTegy1fz08sday3vj31jk15odv2.jpg)

[TOC]

![封面图](https://ws1.sinaimg.cn/large/006jIRTegy1fz08m96klgj31z4140aqo.jpg)

# shell入门系列( 六 )vmstat

## 简介

这是Linux命令和性能监控系列的一部分。vmstat和iostat两个命令都适用于所有主要的类unix系统（Linux/unix/FreeBSD/Solaris）

如果vmstat和iostat命令在你的系统中不可用，请安装sysstat软件包。vmstat，sar和iostat命令都包含在sysstat（系统监控工具）软件包中。iostat命令生成CPU和所有设备的统计信息。你可以从[这个连接](http://sebastien.godard.pagesperso-orange.fr/download.html)中下载源代码包编译安装sysstat，但是我们建议通过命令进行安装；

## 入门小案例

### 每列的意义

常用的：

`Free` – 空闲的内存空间

`si` – 每秒从磁盘中交换进内存的数据量（以KB为单位）。

`so` – 每秒从内存中交换出磁盘的数据量（以KB为单位）。

具体的：

> 建议使用man vmstat 查看具体，vmstat 分模式分字段的，下面是vm模式下的

proc:
​	`r`：可运行进程的数量（正在运行或等待运行时）。

​	`b`：不间断睡眠中的进程数。

memory:

​	`swpd`：使用的虚拟内存量。

​	`free`：空闲内存量。

​	`buff`：用作缓冲区的内存量。

​	`cache`：用作缓存的内存量。

​	`inact`：非活动内存量。  （-a选项）

​	`active`：活动内存量。  （-a选项）

io:

​	`bi`：从块设备接收的块（块/ s）。

​	`bo`：发送到块设备的块（块/ s）。

system:

​	`in`：每秒的中断数，包括时钟。

​	`cs`：每秒上下文切换次数。

CPU:

​	`us`：运行非内核代码所花费的时间。  （用户时间，包括美好时光）

​	`sy`：运行内核代码所花费的时间。  （系统时间）

​	`id`：空闲时间。 在Linux 2.5.41之前，这包括IO等待时间。

​	`wa`：等待IO的时间。 在Linux 2.5.41之前，包含在空闲状态。

​	`st`：从虚拟机中窃取的时间。 在Linux 2.6.11之前，未知。

### 1. 列出活动和非活动的内存

```bash
vmstat -a 
```

效果

![预览](https://ws1.sinaimg.cn/large/006jIRTegy1fz08nsl4ceg30j50ab0sr.gif)

### 2. 每X秒执行vmstat，共执行N次

`vmstat 2 6` 每2秒执行一次，执行6次

```bash
vmstat 2 3
```

效果

![预览](https://ws1.sinaimg.cn/large/006jIRTegy1fz08omieqwg30j50ab3yn.gif)

### 3. 带时间戳的vmstat命令

带-t参数执行vmstat命令，该命令将会在每一行输出后都带一个时间戳

```bash
vmstat -t 2 3
```

效果

![预览](https://ws1.sinaimg.cn/large/006jIRTegy1fz08pet03tg30j50ab0sx.gif)

### 4. 统计各种计数器

vmstat命令的-s参数，将输出各种事件计数器和内存的统计信息。	

```bash
vmstat -s
```

效果

![预览](https://ws1.sinaimg.cn/large/006jIRTegy1fz08q9rtvlg30j50fvwer.gif)

### 5. 磁盘统计信息

vmstat的-d参数将会输出所有磁盘的统计信息。

```bash
vmstat -d
```

效果

![预览](https://ws1.sinaimg.cn/large/006jIRTegy1fz08qykuxtg30j50fvt8s.gif)

### 6. 以MB为单位输出统计信息

vmstat的-S和-M参数（大写和MB）将会以MB为单位输出。vmstat默认以KB为单位输出统计信息。

```bash
vmstat	-S M 2 3
```

效果

![预览](https://ws1.sinaimg.cn/large/006jIRTegy1fz08rx26etg30j50fvt8v.gif)

## 参考文章

[系统运维](https://linux.cn/article-4024-1.html)

## [我的主页](https://suveng.github.io/blog/)