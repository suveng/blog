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

### 基于目录深度搜索

```bash
# -maxdepth 1 指定递归深度为当前一层
find /usr/include -maxdepth 1 -type f -print

# -mindepth 2 指定最低深度为 第二层
find /usr/include -mindepth 2 -type f -print 
```

### 根据文件时间搜索

```bash
# -atime 访问时间 7与系统时间相比大于等于7天 -7 与系统时间比小于7天  +7与系统时间币大于7天
find /usr/include  -type f  -atime -7 -print
# -mtime 修改时间 
find /usr/include -type f -mtime -7 -print
# -ctime 元数据修改时间，比如权限，拥有者等被修改
find /usr/include -type f -ctime -7 -print
# 以分钟为单位
find /urs/include -type f -amin -7 -print
# 比某一文件 时间更 新 -newer
find /usr/include -newer out.txt -type f -print

```

### 基于文件大小搜索

```bash
# -size 指定大小 + 表示大于 - 表示小于 不填默认大于等于
find /usr/include -type f -size +2k -print
find /usr/include -type f -size +2M -print 
find /usr/include -type f -size +2G -print 
```

### 结合find执行命令或动作

> 上面的 -print 操作都是打印匹配的文件路径，删除就是 -delete
>
> 当然还有其他操作，比如将匹配的文件复制到指定文件路径下，使用 `-exec cp {} ./temp;` 参数

```bash
find . -type f -size -2k -delete 
# -exec XXXX \;是执行其他操作 以分号结束 {}代表匹配到每一条记录
find . -type f -size -2k -exec cp {} ./temp/
```

### 让find跳过特定目录

```bash
# 使用 -prune 跳过 指定路径
find / -path "/root" -prune -o -type d -print 
```

### 基于文件权限和所有权的匹配搜索

```bash
# 使用-perm 指定文件权限 匹配
find . -type f -name "*.c" -perm 644 -print
# 使用否定参数 联合使用
find . -type f -name "*.c" ! -perm 644 -print
```

[我的主页](https://suveng.github.io/blog/)