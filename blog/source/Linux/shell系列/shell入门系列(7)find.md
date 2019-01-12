title: shell入门系列(7)find
date: 2019-01-12 10:00:00 +0800
update: 2019-01-12 10:00:00 +0800
author: me
cover: https://ws1.sinaimg.cn/large/006jIRTegy1fz3nft4nt0j31jk0v97p1.jpg
preview:  find命令主要用于文件搜索，它的功能非常强大，可以根据不同的标准搜索任何文件，可以在任何位置进行检索
tags:

  - shell系列

---



[TOC]

![封面图](https://ws1.sinaimg.cn/large/006jIRTegy1fz3nft4nt0j31jk0v97p1.jpg)

# shell入门系列(7)find

## 简介

find命令主要用于文件搜索，它的功能非常强大，可以根据不同的标准搜索任何文件，可以在任何位置进行检索

* 根据 文件名或者正则表达式匹配搜索
* 否定参数
* 基于目录深度搜索
* 根据文件类型搜索
* 根据文件时间搜索
* 基于文件大小搜索
* 删除匹配文件
* 基于文件权限和所有权的匹配搜索
* 结合find执行命令或动作
* 让find跳过特定目录

## 入门小案列

### 指定目录找文件（文件名）

```bash
find /usr -name '*.txt' -print

# -i 选项不分大小写
find /usr -iname '*.txt' -print 

# 寻找多个 类型文件名
find /usr/include \(-iname  '*.c'  -o -name "*.x" \) -print
```

指定目录找文件夹名

```bash
# 找文件夹 用 -path 选项
find /usr/include -path "X*" -print # 以X 开头的文件名字

```

