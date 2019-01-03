title: shell入门系列( 二 )别名
date: 2019-01-02 12:00:00 +0800
update: 2019-01-02 12:00:00 +0800
author: me
cover: http://ww1.sinaimg.cn/large/006jIRTegy1fysl1h4dkaj31hc0u0wq9.jpg
preview:  Shell本身是一个用 C 语言编写的程序，它是用户使用 Linux 的桥梁，用户的大部分工作都是通过 Shell 完成
tags:

  - shell系列

---

[TOC]

![封面图](http://ww1.sinaimg.cn/large/006jIRTegy1fysl1h4dkaj31hc0u0wq9.jpg)

# shell入门系列( 二 )别名

## 简介

在Linux下，有些命令是很长的，而且是重复的，并且是经常使用的，这时候我们就需要对这些命令起一些别名。很多shell都会自带一些别名。比如 `centos`  `~/.bashrc` 这个文件中就会自带一些别名，比如 

`alias ll='ls -alF'` 这个命令就是我们常用的 `ll ` 命令

## shell中起临时别名

直接在一个 shell 中 使用 `alias lm='ls -al | more'` 

那么就可以使用 `lm` 这个别名了。

> 当时作用域仅限于当前shell进程，当关闭这个shell的时候，别名就失效了。

## shell中取消别名

定义用 `alias` 取消用 `unalias` 

比如 `unalias lm`

## 当前用户持久化别名

怎么让这个别名，关闭shell也可以使用呢？

**很简单，只要在 `~/.bashrc` 文件中加上起别名的命令即可**

因为每一个 `bash` 启动前，都会执行 `~/.bashrc` 这个文件。

> bash 是 Linux shell 的一种。

## 所有用户持久化别名

上面的别名仅限于当前用户，因为修改的当前用户的 `.bashrc` 

怎么让所有用户都能使用别名？

`/etc/profile` 这个文件就是储存所有用户的环境变量，只要在这个文件里面添加别名的设置即可对所有用户生效；

比如 我在 `/etc/profile` 这个文件里面添加 `alias e='echo suveng'`

再执行 `source /etc/profile` 刷新配置。

e这个别名就对所有用户生效了。

## 如何安全的使用别名

其实别名这个操作是很危险的，比如 `alias cp='sudo rm  -rfA /'` 

当出现这个别名的时候，其他用户并不知道直接用 `cp` 命令时，就会删除所有文件。

如何解决这个问题呢？

只要在命令前加上 反斜杠 `\` 即可，这样就是不使用别名模式。比如 `\cp a b` 这样就是单纯的复制命令。