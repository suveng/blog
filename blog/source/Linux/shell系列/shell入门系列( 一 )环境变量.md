title: shell入门系列( 一 )环境变量
date: 2019-01-01 12:00:00 +0800
update: 2019-01-01 12:00:00 +0800
author: me
cover: https://ws1.sinaimg.cn/large/006jIRTegy1fyr6vg8t8dj31kw0w0tl6.jpg
preview:  Shell本身是一个用 C 语言编写的程序，它是用户使用 Linux 的桥梁，用户的大部分工作都是通过 Shell 完成
tags:

  - Linux
  - shell系列

---

[TOC]

![封面图](https://ws1.sinaimg.cn/large/006jIRTegy1fyr6vg8t8dj31kw0w0tl6.jpg)

# shell入门系列( 一 )环境变量





## 环境变量

定义：进程可以随意访问的变量

### 系统内置的变量

`$HOME`：当前用户主目录

`$PWD` ：当前目录

`$USER` ： 当前用户

`$UID` ： 当前用户id

`$SHELL` ： 当前shell 

> 还有很多内置的变量比如$PATH等等

## 查看某个进程的环境变量

`ps -A` 查看所有进程

`pgrep 进程名` 查看进程名的PID

`cat /proc/PID/environ` 查看PID的所有环境变量

## 通过管道转换不可打印字符

`cat /proc/PID/environ | tr '\0' '\n'` tr 是 转换 字符命令

## 自定义变量导出为环境变量

`export  VARIABLE`

## 给已有的环境变量追加

`export 　PATH ="$PATH:/usr/local/java"`

## 获取变量的字符长度

`${#PATH} #可以计算字符长度`

## 判断是否是超级用户

```bash
if $USER -ne 0; then
else 
fi
```

## vi编辑器的一般设置

在用户目录下建立 `.vimrc` 文件，或者在 `/etc/` 下建立，在主目录建立就只对当前用户生效，在 `/etc/` 下就对所有用户生效

```bash
set number
set hlsearch            "高亮度反白   
set backspace=2         "可随时用退格键删除   
set autoindent           "自劢缩排   
set ruler              "可显示最后一行癿状态   
set showmode             "左下角那一行癿状态   
set nu                   "可以在每一行癿最前面显示行号啦！   
syntax on
```

## bash提示符的变量

`$PS1` 改变这个，就改变bash 的提示符的样式。