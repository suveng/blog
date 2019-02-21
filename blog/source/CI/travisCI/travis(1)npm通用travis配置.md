title:  TravisCI(1)npm通用travis配置
date: 2019-02-21 13:00:00 +0800
update: 2019-02-21 13:00:00 +0800
author: me
cover: http://ww1.sinaimg.cn/large/006jIRTegy1fzwiafdswej31jk0v9qp2.jpg
preview:  TravisCI是在软件开发领域中的一个在线的，分布式的持续集成服务，用来构建及测试在GitHub托管的代码。
tags:

  -  算法

---



[TOC]

![封面图]()

# travis(1)npm通用travis配置

## 简介

**Travis CI**是在[软件开发](https://zh.wikipedia.org/wiki/%E8%BD%AF%E4%BB%B6%E5%BC%80%E5%8F%91)领域中的一个在线的，分布式的[[1\]](https://zh.wikipedia.org/wiki/Travis_CI#cite_note-1)[持续集成](https://zh.wikipedia.org/wiki/%E6%8C%81%E7%BA%8C%E6%95%B4%E5%90%88)服务，用来构建及测试在[GitHub](https://zh.wikipedia.org/wiki/GitHub)[[2\]](https://zh.wikipedia.org/wiki/Travis_CI#cite_note-2)托管的代码。这个软件的代码同时也是[开源](https://zh.wikipedia.org/wiki/%E5%BC%80%E6%BA%90)的，可以在GitHub上下载到[[3\]](https://zh.wikipedia.org/wiki/Travis_CI#cite_note-3)，尽管开发者当前并不推荐在闭源项目中单独使用它。[[4\]](https://zh.wikipedia.org/wiki/Travis_CI#cite_note-4)

它提供了多种编程语言的支持，包括[Ruby](https://zh.wikipedia.org/wiki/Ruby)、[JavaScript](https://zh.wikipedia.org/wiki/JavaScript)、[Java](https://zh.wikipedia.org/wiki/Java)、[Scala](https://zh.wikipedia.org/wiki/Scala)、[PHP](https://zh.wikipedia.org/wiki/PHP)、[Haskell](https://zh.wikipedia.org/wiki/Haskell)和[Erlang](https://zh.wikipedia.org/wiki/Erlang)在内的多种语言[[5\]](https://zh.wikipedia.org/wiki/Travis_CI#cite_note-infoq-5)。许多知名的开源项目使用它来在每次提交的时候进行构建测试，比如[Ruby on Rails](https://zh.wikipedia.org/wiki/Ruby_on_Rails)，[Ruby](https://zh.wikipedia.org/wiki/Ruby)和[Node.js](https://zh.wikipedia.org/wiki/Node.js)[[5\]](https://zh.wikipedia.org/wiki/Travis_CI#cite_note-infoq-5)[[6\]](https://zh.wikipedia.org/wiki/Travis_CI#cite_note-ror-6)。

------wiki

## node.js与TravisCI集成

### 1. 登陆github 以及 一个项目

要使用travisCI工具，首先必须要有一个github的账号，自己去注册！如果不知道git怎么使用，百度搜索廖雪峰git教程

其次，注册完成后，在你自己的账号下创建一个项目仓库，并把你的vue项目代码提交到上面。

### 2. 通过github登陆travisCI官网

进入[travisCI官网](https://travis-ci.org/) ，使用github登录。

同步你的仓库。

选择其中一个仓库，进行设置。

这里需要设置一些变量，以便第3步的配置。

```xml
GH_REF：仓库地址
GH_TOKEN：生成的令牌
P_BRANCH：推送的pages分支
U_EMAIL：邮箱
U_NAME：名称
```

### 3. 配置travisCI



### 4. 配置github page

### 5. push 并 自动构建

## 参考文章

[阮一峰](http://www.ruanyifeng.com/blog/2017/12/travis_ci_tutorial.html)

[易墨](https://yimogit.github.io/2017/07/24/%E4%BD%BF%E7%94%A8travis-ci%E8%87%AA%E5%8A%A8%E9%83%A8%E7%BD%B2github%E4%B8%8A%E7%9A%84%E9%A1%B9%E7%9B%AE/)

## [我的主页](https://suveng.github.io/blog/)