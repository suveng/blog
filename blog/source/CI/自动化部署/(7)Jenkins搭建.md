title:  (7)Jenkins搭建
date: 2019-04-20 13:00:00 +0800
update: 2019-04-20 13:00:00 +0800
author: me
cover: https://ws1.sinaimg.cn/large/006jIRTegy1g25y1edcfnj31p411v7ks.jpg
preview:   Jenkins是一个开源持续集成工具，是由Java开发，提供了软件开发的持续集成服务
tags:

  -  持续集成

---



[TOC]

![封面图](https://ws1.sinaimg.cn/large/006jIRTegy1g25y1edcfnj31p411v7ks.jpg)

# (7)Jenkins搭建

 Jenkins是一个开源持续集成工具，是由Java开发，提供了软件开发的持续集成服务.支持主流软件配置管理，配合实现软件配置管理，持续集成功能

优势：

1. 主流的运维开发平台，兼容所有主流开发环境
2. 插件市场可与海量业内主流开发工具实现集成
3. Job为配置单位与日志管理，使运维与开发人员能协同
4. 权限管理划分不同Job不同角色
5. 强大的负载均衡功能，保证我们项目的可靠性

安装和配置：

1. 创建测试服务器

2. 安装前的配置准备

   1. 添加yum仓库源

      ```shell
      wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
      rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
      ```

   2. 保证系统Java版本为8或以上

   3. 关闭防火墙

   4. 关闭selinux

3. jenkins安装

   1. yum安装Jenkins最新版本

      ```
      yum install jenkins
      ```

   2. 创建jenkins系统用户

      ```shell
      useradd deploy
      ```

   3. 更改jenkins启动用户和Duang口

      ```
      vi /etc/sysconfig/jenkins
      ....
      JENKINS_USER="root"
      JENKINS_PORT=8080
      ....
      
      chown -R deploy:deploy /var/lib/jenkins/
      chown -R deploy:deploy /var/log/jenkins/
      ```

   4. 启动Jenkins

      ```shell
      systemctl start jenkins
      ```

   5. 初始化密码，访问8080端口





## [我的主页](https://suveng.github.io/blog/)



