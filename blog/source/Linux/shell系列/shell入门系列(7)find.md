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

# 使用通配符寻找多个 类型文件名
find /usr/include \(-iname  '*.c'  -o -name "*.x" \) -print
```

### 指定目录找文件夹名

```bash
# 找文件夹 用 -path 选项 会把路径 符合规则的全部取出
find /usr/include -path "X*" -print # 以X 开头的文件名字
```

### 使用正则表达式搜索

```bash
# 启用正则表达式 -regextype "posix-egrep" -regex
find /usr/include -regextype "posix-egrep" -regex '.*(\.c|\.x)$'   -print # 搜索以.c 或者 .x 结尾的文件
```

### 排除搜索

```bash
# 使用 ！过滤掉符合规则的文件
find /usr/find ! -iname "*.h" -print
```

### 查找文件类型

```bash
# f 是所有文件  d 是所有目录
find /usr/include -type  f -print 
```

