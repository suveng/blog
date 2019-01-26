title: shell入门系列(9)grep
date: 2019-01-20 10:00:00 +0800
update: 2019-01-20 10:00:00 +0800
author: me
cover: https://ws1.sinaimg.cn/large/006jIRTegy1fzk6vxq7vqj31kw0w0qej.jpg
preview:  Shell本身是一个用 C 语言编写的程序，它是用户使用 Linux 的桥梁，用户的大部分工作都是通过 Shell 完成
tags:

  - shell系列

---



[TOC]

![封面图](https://ws1.sinaimg.cn/large/006jIRTegy1fzk6vxq7vqj31kw0w0qej.jpg)

# shell入门系列(9)grep

## 简介

搜索文本文件内容,默认输入匹配到的那一行

* 通配符
* 正则表达式

## 入门小案例

### 搜索单个文件

```bash
# grep "内容" 文件
grep "bash" ~/.bashrc
grep bash ~/.bashrc
```

![效果](http://ww1.sinaimg.cn/large/006jIRTegy1fzde10nbtog30ig0abweg.gif)

### 搜索多个文件

```bash
# 
grep "bash" ~/.bashrc ~/.oneinstack
```

![效果](http://ww1.sinaimg.cn/large/006jIRTegy1fzde227m49g30ig0abwei.gif)

## 选项

###  `-E` 使用正则表达式

使用正则表达式

```bash
#
grep -E "[0-9]+" ~/.bashrc
egrep "[0-9]+" ~/.bashrc
```

![效果](http://ww1.sinaimg.cn/large/006jIRTegy1fzde5ckqulg30ig0abweg.gif)

### `-v` 排除内容

排除内容。

```bash
#
grep -v "bash" ~/.bashrc
```

![效果](http://ww1.sinaimg.cn/large/006jIRTegy1fzde66ubuag30ig0abdfw.gif)

### `-c` 显示搜索行数

显示搜索行数

```bash
#
grep -c "bash" ~/.bashrc
```

![效果](http://ww1.sinaimg.cn/large/006jIRTegy1fzde6ssfg5g30ig0abt8p.gif)

### `-o` 输出匹配到的内容

输出匹配到的内容

```bash
#
grep -o "bash" ~/.bashrc 
```

通过管道 传给 `wc` 计算行数

```bash
#
grep -o "bash" ~/.bashrc | wc -l
```

![效果](http://ww1.sinaimg.cn/large/006jIRTegy1fzde7uoulog30ig0abwen.gif)

### `-n`带行号显示

带行号显示

```bash
#
grep -n "bash" ~/.bashrc
```

![效果](http://ww1.sinaimg.cn/large/006jIRTegy1fzde8ev7lig30ig0abaa1.gif)

### `-l` 输出匹配到内容的源

输出匹配到内容的源，这里我们用的源是文件。

```bash
#
grep -l "bash" ~/.bashrc ./test1.txt ./test2.txt ./test3.txt
```

下面给出测试文件内容！

test1.txt

```bash
bash 我是第一行
lll 
kkk lll kkk
kkk
```

test2.txt

```bash
我是第一行
nice work world
keyborad black
red
```

test3.txt

```bash
bash kkk lll kkk
kkl ddk llkd 
```

![效果](http://ww1.sinaimg.cn/large/006jIRTegy1fzdeadkndng30ig0abt8r.gif)

###  `-L` 输出没有匹配到的源

与 `-l` 相反 ，输出没有匹配到的源

```bash
#
grep -L "bash" ~/.bashrc ./test1.txt ./test2.txt ./test3.txt
```

![效果](http://ww1.sinaimg.cn/large/006jIRTegy1fzdeb4xmdrg30ig0abq2x.gif)

###  `-R` 递归搜索

`-R` 可以递归某一个目录下的文件，搜索其每一个文件的内容。

```bash
#
grep -R -n "main" /usr/include
```

![效果](http://ww1.sinaimg.cn/large/006jIRTegy1fzdecaav4lg30sn0d8n50.gif)

### `-i` 不分大小写

```bash
#
grep -i "main" ~/.bashrc
```

![]()

### `-e` 多重搜索

```bash
#
grep -e "bash" -e "m" ~/.bashrc -n
```



### `--include` 指定文件类型

```bash
#
grep "bash" /usr/include -R -n --include "*.c"
grep "bash" /usr/include -R -n --include "*.{c,cpp,h}"
```



### `--exclude` 排除文件类型

```bash
#
grep "bash" /usr/include -R -n --exclude "*.c"
```



### `-q` 安静模式

`-q` 不会显示任何东西，但是可以通过输出 命令结果查看

```bash
# 如果echo 输出为0 则搜到了， 如果不等于0 则没有搜到
grep -q "bash" ~/.bashrc
echo $?
```

最好使用脚本模式进行这个操作

q.sh

```
#! /bin/bash
if [ $# -eq 2 ];
then
	echo "$0  match_text filename"
	exit
fi
match_text=$1
filename=$2

grep -q $match_text $filename

if [ $? -eq 0 ];
then 
	echo "exit"
else 
	echo "does not exit"
fi
```



### `-A` 向后匹配

把匹配到的后几行都显示出来

```bash
#
grep "bash" ~/.bashrc -A 3
```



### `-B` 向前匹配

把匹配到的前几行都显示出来

```bash
#
grep "bash" ~/.bashrc -B 3
```



### `-C` 同时向前向后匹配

把匹配到的后几行和前几行都显示出来

```bash
#
grep "bash" ~/.bashrc -C 3
```



### `-Z` 消除间隔

```bash
# 以 0 分隔
grep "bash" /usr/include/*.c -LZ 
grep "bash" /usr/include/*.c -LZ | xags -0 rm
```



## [我的主页](https://suveng.github.io/blog/)