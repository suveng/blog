title:  (1)MVC
date: 2014-01-01 13:00:00 +0800
update: 2014-01-01 13:00:00 +0800
author: me
cover: 
preview:  MVC设计思想
tags:

  -  韩师

---



[TOC]


# (1)MVC设计思想
MVC模式（Model–view–controller）是软件工程中的一种软件架构模式，把软件系统分为三个基本部分：模型（Model）、视图（View）和控制器（Controller）。

1. 控制器（Controller）- 负责转发请求，对请求进行处理。
2. 视图（View） - 界面设计人员进行图形界面设计。
3. 模型（Model） - 程序员编写程序应有的功能（实现算法等等）、数据库专家进行数据管理和数据库设计(可以实现具体的功能)。

JavaEE中的spring框架具体体现为：

浏览器 -> Controller层（controller）-> Service层 -> DAO层(model) -> jsp视图(view) -> 浏览器

![springMVC流程](https://ws1.sinaimg.cn/large/006jIRTegy1g16zynnl5yj30oe0ekgnv.jpg)

springMVC源码调用过程：

![源码调用过程](https://ws1.sinaimg.cn/large/006jIRTegy1g1701m9zzqj30ij0d9q3k.jpg)

技术更新迭代，设计思想几乎没变，但是其中的技术更新迭代很快。尤其是model以及view层。

1. model一般是MySQL数据库，其中还包括一些其他用于存储数据的model，比如MongoDB，Redis，elasticsearch，solr，HDFS，kafka等等
2. view层
   1. 可以像jsp那样耦合在同一个工程内，类似jsp的模板引擎还有其他，比如freemarker，Thymeleaf，webfulx等等很多，jsp已经是很少人用了。
   2. 重点是前后端分离开发，利用json作为中间媒介传输消息。

