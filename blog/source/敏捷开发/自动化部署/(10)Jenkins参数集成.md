title: (10)Jenkins参数集成
date: 2019-04-23 13:00:00 +0800
update: 2019-04-23 13:00:00 +0800
author: me
cover: https://ws1.sinaimg.cn/large/006jIRTegy1g25y1edcfnj31p411v7ks.jpg
preview:   Jenkins是一个开源持续集成工具，是由Java开发，提供了软件开发的持续集成服务
tags:

  -  持续集成

---



[TOC]

![封面图]()

# (10)Jenkins参数集成

1. 新建一个freestyle-job
2. 添加参数构建
3. 添加脚本，在脚本中使用变量

```shell
#!/bin/sh

echo "current deploy environment is $deploy_env"
echo "the build is $version"
echo "the password is $pass"

if $bool
then
  echo "request is approved"
else
  echo "request is rejected"
fi  
```



## [我的主页](https://suveng.github.io/blog/)



