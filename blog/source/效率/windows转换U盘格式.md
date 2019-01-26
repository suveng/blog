title: windows转换U盘文件系统格式
date: 2019-01-07 12:00:00 +0800
update: 2019-01-07 12:00:00 +0800
author: me
cover: https://ws1.sinaimg.cn/large/006jIRTegy1fyz6tlyfcfj31jk0v9x1r.jpg
preview:  FAT32 不可以传超过4G的文件，而NTFS格式可以，如何转换？一句windows的DOS命令即可
tags:

  - 效率

---

[TOC]

![封面图](https://ws1.sinaimg.cn/large/006jIRTegy1fyz6tlyfcfj31jk0v9x1r.jpg)

# windows转换U盘文件系统格式

```bash
convert X: /FS:NTFS
```

`X:` 是U盘的盘符，比如H盘

## [我的主页](https://suveng.github.io/blog/)