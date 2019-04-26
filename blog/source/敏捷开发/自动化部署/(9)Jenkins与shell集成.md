title: (9)Jenkins与shell集成
date: 2019-04-22 13:00:00 +0800
update: 2019-04-22 13:00:00 +0800
author: me
cover: https://ws1.sinaimg.cn/large/006jIRTegy1g25y1edcfnj31p411v7ks.jpg
preview:   Jenkins是一个开源持续集成工具，是由Java开发，提供了软件开发的持续集成服务
tags:

  -  持续集成

---



[TOC]

![封面图]()

# (9)Jenkins与shell集成

1. 新建任务
2. 填写说明
3. 在构建选择shell模块
4. 编写shell脚本，点击构建

```shell
#!/bin/sh

user=`whoami`
if [ $user == 'deploy' ]
then
  echo "hello , my name is $user"
else
  echo "sorry, i am not $user"
fi

ip addr

cat /etc/system-release

free -m 

df -h

py_cmd=`which python`

$py_cmd --version
```



## [我的主页](https://suveng.github.io/blog/)



