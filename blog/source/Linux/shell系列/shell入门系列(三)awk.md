title: shell入门系列( 三 )awk
date: 2019-01-03 12:00:00 +0800
update: 2019-01-03 12:00:00 +0800
author: me
cover: http://ww1.sinaimg.cn/large/006jIRTely1fytufd87xij31hc0u0k3e.jpg
preview:  Shell本身是一个用 C 语言编写的程序，它是用户使用 Linux 的桥梁，用户的大部分工作都是通过 Shell 完成
tags:

  - shell系列

---

[TOC]

![封面图](http://ww1.sinaimg.cn/large/006jIRTely1fytufd87xij31hc0u0k3e.jpg)

# shell入门系列( 三 )awk

## 简介

对数据按行和列处理；

> AWK是一种处理文本文件的语言，是一个强大的文本分析工具。
>
> 之所以叫AWK是因为其取了三位创始人 Alfred Aho，Peter Weinberger, 和 Brian Kernighan 的Family Name的首字符。

## 基本语法

```bash
awk 'BEGIN{...} pattern{...} END{...}'
```

## 特殊变量

`$1  $2 $3 ` 这些都是列变量，`$1` 第一列， `$2` 第二列， `$3` 第三列

`NR` ：正在处理第几行

`NF`：正在处理的这一行有多少列

`getline` ：在BEGIN中使用，读取一行，内容就少了一行列的特殊变量对这个行是有效的;getline; 可以重复使用，列的特殊变量采取最近原则

```bash
awk 'BEGIN{getline; print $1} {print}' awk.log
```

## 实践

awk.log 文件内容

```bash
one OOO
two TTT
three oTE
four UYI
five ooi
```

### 按行打印文件内容

```bash
awk 'BEGIN{print "start"} {print} END{print "end"}' awk.log
```

### 使用变量统计文件行数

```bash
awk 'BEGIN{i=0} {i++} END{print i}' awk.log
```

### 使用正则表达式筛选行的内容

```bash
awk 'BEGIN{pring "start"} '/^T.+/'{print} END{print "end"}' awk.log
```

### 按行和列打印文件内容

```bash
awk 'BEGIN{print 'start'} {print $1 $2 $3} END{print 'end'}' awk.log 
```

### 通过管道获取所有进程id

```bash
ps auxw 打印所有进程信息
ps auxw | awk '{print $2}'
```

### 获取内存信息

```bash
cat /proc/meminfo 内存信息
cat /proc/meminfo | awk ' '/MemTotal/'{print $2 }'
```

### 获取ip

```bash
ifconfig 
ifconfig | grep 'inet' | grep 'broadcast' | awk '{print $2}'
```

> 变换切割符   `awk -F:`  表示使用 : 来做为列的分隔符

### 读取数据保存到变量

```bash
echo | awk ' {"grep root /etc/passwd" | getline cmdout; print cmdout} '
```

### 嵌套循环

```bash
awk 'BEGIN{} {for(ii=0 ; i<3; i++){ print i }} END{}' awk.log
```

## [我的主页](https://suveng.github.io/blog/)