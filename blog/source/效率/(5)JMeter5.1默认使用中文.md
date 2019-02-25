title: (5)JMeter5.1默认使用中文
date: 2019-02-25 8:00:00 +0800
update: 2019-02-25 8:00:00 +0800
author: me
cover: https://ws1.sinaimg.cn/large/006jIRTegy1fyljrzvpjsj31jk0v9gqg.jpg
preview:  JMeter是Apache组织开发的基于Java的压力测试工具,用于测试静态和动态资源;
tags:

  - 效率

---

[TOC]

![封面图]()

# (5)Window  JMeter5.1默认使用中文

## 操作步骤

### 1. 下载JMeter5.1

[download](http://mirrors.shu.edu.cn/apache//jmeter/binaries/apache-jmeter-5.1.zip)

### 2. 启动后设置中文

进入JMeter的bin目录下，windows系统双击jmeter.bat文件即可启动，启动后按照下图进行设置

![界面图](https://ws1.sinaimg.cn/large/006jIRTegy1g0io1xhl4aj31680mxmyd.jpg)

### 3. 默认启动使用中文

修改启动文件jmeter.bat,把默认language 改为zh_CN

源文件为：

```sh
rem Get standard environment variables
if exist "%JMETER_HOME%\bin\setenv.bat" call "%JMETER_HOME%\bin\setenv.bat"

if not defined JMETER_LANGUAGE (
    rem Set language
    rem Default to en-EN
    set JMETER_LANGUAGE=-Duser.language="en" -Duser.region="EN"
)

rem Minimal version to run JMeter
```

修改后的文件为：

```sh
rem Get standard environment variables
if exist "%JMETER_HOME%\bin\setenv.bat" call "%JMETER_HOME%\bin\setenv.bat"

if not defined JMETER_LANGUAGE (
    rem Set language
    rem Default to zh-CN
    set JMETER_LANGUAGE=-Duser.language="zh" -Duser.region="CN"
)

rem Minimal version to run JMeter
```

## [我的主页](https://suveng.github.io/blog/)

