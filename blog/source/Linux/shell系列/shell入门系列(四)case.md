title: shell入门系列( 四 )case
date: 2019-01-04 12:00:00 +0800
update: 2019-01-04 12:00:00 +0800
author: me
cover: http://ww1.sinaimg.cn/large/006jIRTegy1fyuwcqv497j31dc0wwqr9.jpg
preview:  Shell本身是一个用 C 语言编写的程序，它是用户使用 Linux 的桥梁，用户的大部分工作都是通过 Shell 完成
tags:

  - shell系列

---

[TOC]

![延双师姐作品](http://ww1.sinaimg.cn/large/006jIRTegy1fyuwcqv497j31dc0wwqr9.jpg)

> 没有故事 就是海边的夕阳【捂脸】.jpg

# shell入门系列( 四 )case

## 介绍

> 相当于Java 中 switch ... case
> ;; 相当于 break;
>
> | 代表 or
>
> 条件可以用通配符

## 实践

### 一个小demo

```bash
#!/bin/bash


echo 'input'

read num

echo "the data is $num"

if [ $num -eq 1 ];then
echo 'lll ---1'
elif [ $num -eq 2 ]; then
echo 'lll-- 2'
elif [ $num -eq 3 ]; then
echo 'lll -- 3 '
fi

echo "下面是case"

case $num  in
 1) echo "case $num" ;;
 2) echo "case $num" ;;
 3) echo "case $num" ;;

 *) echo "默认 $num" ;;
esac
```

> 效果

![效果图](http://ww1.sinaimg.cn/large/006jIRTegy1fyuwi3sxdjg30ig0ab3yt.gif)



### 另一个小demo

```bash
#!/bin/bash

shopt -s ncasematch
echo "输入你的名字，特殊名字有奖励！"

read yourname

case $yourname in

su | veng | my)
        echo "你猜对了！我是suveng"
        ;;
李元芳 | 大乔 | 无双 | 牛逼)
        echo "没错！！！"
        ;;
*)
        echo "再猜一次？提示 suveng"
        ;;
esac

```

> 效果图

![效果图](http://ww1.sinaimg.cn/large/006jIRTegy1fyuwhaamcvg30ig0abmxw.gif)

## [我的主页](https://suveng.github.io/blog/)