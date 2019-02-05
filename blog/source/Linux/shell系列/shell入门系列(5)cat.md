title: shell入门系列(5)cat
date: 2019-01-08 18:00:00 +0800
update: 2019-01-08 18:00:00 +0800
author: me
cover: https://ws1.sinaimg.cn/large/006jIRTegy1fyzcylktt2j31hc0u0aqp.jpg
preview:  Shell本身是一个用 C 语言编写的程序，它是用户使用 Linux 的桥梁，用户的大部分工作都是通过 Shell 完成
tags:

  - shell系列

---

[TOC]

![封面图](https://ws1.sinaimg.cn/large/006jIRTegy1fyzcylktt2j31hc0u0aqp.jpg)

# shell入门系列( 五 )cat

## 简介

cat 命令用于连接文件并打印到标准输出设备上。主要用于读取文件，拼接文件

## 简单demo

### 1.查看文件内容

> 准备两个文件的内容如下！

file1

```bash
one
one one
one one one
```

file2

```bash
two
two tow
tow tow
```

查看file1

```bash
cat file1
cat file2
cat file1 file2
```

#### 效果

![效果](https://ws1.sinaimg.cn/large/006jIRTegy1fyzda96ql7g30ig0abaad.gif)

###  2 `-` 号的使用

> `-` 代表 `cat` 要从标准输入读取内容，按 `ctrl+d` 结束输入，后面还可以加上其他输入源，比如文件

```bash
cat - file1 file2
```

#### 效果

![效果](https://ws1.sinaimg.cn/large/006jIRTegy1fyzdicfm4cg30ig0ab74f.gif)

> 注意： 由于 `ctrl+d` 是我这个连接工具的快捷键 复制，才会出现这个问题。

### 3 管道与cat

```bash
echo "标准输入"  | cat - file1 file2
```

##### 效果

![效果](https://ws1.sinaimg.cn/large/006jIRTegy1fyzephyyylg30ig0abt8q.gif)

### 4 `-s ` 去掉重复空行

修改文件 file2

file2

```bash
two



two tow





tow tow
```

操作

```bash
cat -s file2
```

效果

![效果](https://ws1.sinaimg.cn/large/006jIRTegy1fyzeqlbo4ug30ig0abq2w.gif)

### 5 消除空行，管道替换空行

```bash
cat file2 | tr -s '\n'
```

#### 效果

![效果](https://ws1.sinaimg.cn/large/006jIRTegy1fyzern6sbeg30ig0abglm.gif)

### 6 制表符特殊输出 `-T`

改变文件内容file2

file2

```bash
two



two tow





tow tow
        echo "hello"
                printf("hello")
        return;
```

操作

```bash
cat -T file2
```

效果

![效果](https://ws1.sinaimg.cn/large/006jIRTegy1fyzeveksm6g30ig0abdfu.gif)

### 7 显示行号 `-n`

操作

```bash
cat -n file2
ls -l | cat -n 
```

## [我的主页](https://suveng.github.io/blog/)