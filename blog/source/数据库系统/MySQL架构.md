title: MySQL架构
date: 2019-08-10 11:00:00 +0800
update: 2019-08-10 11:00:00 +0800
author: me
cover: images/wallhaven-714079.jpg
tags:

  -  MySQL

---

# MySQL架构

## 1. 逻辑架构

### 1.1 逻辑架构图

![逻辑架构图](https://oscimg.oschina.net/oscnet/5ba18429e607aef4dff10d2613af85d8d5c.jpg)

### 1.2 架构分层

#### 1.2.1 连接层

MySQL 客户端连接到MySQL server都是经过这一层的, 用与处理连接,授权校验,安全.

#### 1.2.2 服务层

服务层是MySQL的核心服务层:

1. 查询分析
2. SQL优化
3. 缓存机制
4. 内建函数
5. 触发器
6. 视图
7. 存储过程
8. .....等等



#### 1.2.3 存储层

存储层就是 MySQL用于存放数据的处理程序--存储引擎

MySQL内置的存储引擎有: 

- InnoDB
- MyISAM
- Memory
- NDB
- Archive 

MySQL5.7的默认存储引擎是InnoDB,至于关于各个存储引擎的详细会在之后的系列文章讲到



