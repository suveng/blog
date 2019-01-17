title: shell入门系列(8)for
date: 2019-01-16 10:00:00 +0800
update: 2019-01-16 10:00:00 +0800
author: me
cover: http://ww1.sinaimg.cn/large/006jIRTegy1fz8sbu1674j31kw0w0wn3.jpg
preview:  Shell本身是一个用 C 语言编写的程序，它是用户使用 Linux 的桥梁，用户的大部分工作都是通过 Shell 完成
tags:

  - shell系列

---



[TOC]

![封面图](http://ww1.sinaimg.cn/large/006jIRTegy1fz8sbu1674j31kw0w0wn3.jpg)

# shell入门系列(8)for

## 简介

* 和C语言一样的for循环
* 处理列表数据的for循环
  处理数字序列
  处理字符序列
  处理文本字符串

## 入门小案例

### c语言的for

```bash
#! /bin/bash

declare -i i s
for((i=1;i<=10;i++))
do
        echo $i
done
```

![效果](http://ww1.sinaimg.cn/large/006jIRTegy1fz9cslcqrig30ig0abt8t.gif)

### 循环列表（数组）中的数据

#### 处理文本字符串

默认是以 空格，换行符，制表符作为 分隔符

可以重新自定义分隔符，设置 `IFS` 即可，记得用完要设置回来

```bash
data="name,sex,rollno,location"
oldIFS=$IFS
IFS=","

for item in $data
do
        echo $item
done;
IFS=$oldIFS
```

![效果](http://ww1.sinaimg.cn/large/006jIRTegy1fz9ec7obw0g30ig0abmxr.gif)

以 `:` 为分隔符

```bash
line="root:x:0:0:root:/root:/bin/bash"
oldIFS=$IFS;
IFS=":";

count=0
for item in $line;
do
        [ $count -eq 0 ] && user=$item
        [ $count -eq 6 ] && shell=$item
        let count++


done;
IFS=$oldIFS;
echo $user \'s shell is $shell;
```

![效果](http://ww1.sinaimg.cn/large/006jIRTegy1fz9ee5ju94g30ig0abdgj.gif)

#### 处理数字序列

刚刚说了，默认是以空格为分隔符，可以自定义的，这里使用默认的

```bash
for i in 1 2 3 4 5
do
        echo $i
done
```

![效果](http://ww1.sinaimg.cn/large/006jIRTegy1fz9efbk6a9g30ig0ab74t.gif)

另一种写法

```bash
for i in {10..20}
do
        echo $i
done
```

![效果](http://ww1.sinaimg.cn/large/006jIRTegy1fz9eghe2rng30ig0ab74s.gif)

#### 处理字符序列

```bash
for c in {a..h}
do
        echo $c
done
```

![效果](http://ww1.sinaimg.cn/large/006jIRTegy1fz9ehyyx6mg30ig0abgm5.gif)

### 与其他命令混合使用

这里可以与 `ls ` 混合使用

```bash
DIR="/root"
for f in $(ls $DIR)
do
        echo $f
done
```

![效果](http://ww1.sinaimg.cn/large/006jIRTegy1fz9ej9djxng30ig0abmxq.gif)

复杂一点，循环文件，并把文件夹的占用空间输出

```bash
DIR="/root"
cd $DIR
for f in $(ls $DIR)
do
        [ -d $f ] && du -s $f
done
```

![效果](http://ww1.sinaimg.cn/large/006jIRTegy1fz9eke5080g30ig0abdgj.gif)

## [我的主页](https://suveng.github.io/blog/)

