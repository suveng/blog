title:  (2)自动化部署平台搭建
date: 2019-04-01 13:00:00 +0800
update: 2019-04-01 13:00:00 +0800
author: me
cover: http://ww1.sinaimg.cn/large/006jIRTegy1g17bewj3nqj31kw11xk0o.jpg
preview:  gitlab是一个开源分布式版本控制系统,管理项目源代码/版本控制/代码复用与查找
tags:

  -  持续集成

---



[TOC]

![封面图]()

# (2)gitlab平台搭建

## 相关介绍

### GitLab介绍

gitlab是一个开源分布式版本控制系统

开发语言：Ruby

功能：管理项目源代码/版本控制/代码复用与查找

优势：

- 开源免费
- 差异化版本管理，离线 同步以及强大分支管理功能
- 集成度很高
- 内置HA，在高并发下仍旧实现高可用性

主要服务：

- Nginx静态web服务器
- gitlab-workhorse 反向代理服务器
- gitlab-shell用于处理git命令和修改authorized key列表
- logrotate日志文件管理工具
- postgresql数据库
- redis缓存服务器

工作流程：

- 创建并克隆项目
- 创建项目某feature的分支
- 编写代码并提交至分支
- 推送该项目分支至远程gitlab服务器
- 进行代码检查并提交master主分支合并申请
- 项目领导审查代码并确认合并申请

## gitlab安装配置：

- 安装前的配置

  - 关闭firewalld防火墙

    ```shell
    systemctl stop firewalld
    systemctl disable firewalld
    ```

  - 关闭selinux并重启

    ```shell
    vi /etc/sysconfig/selinux
    修改
    ...
    SELINUX=disabled
    ...
    修改完后
    reboot
    ```

- 安装 Omnibus Gitlab-ce package 

  - 安装gitlab组件

    ```shell
    yum -y install curl policycoreutils openssh-server openssh-clients postfix
    ```

  - 配置yum源

    ```shell
    curl -sS https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.rpm.sh | sudo bash
    ```

  - 启动postfix邮件服务

    ```shell
    systemctl start postfix &&	systemctl enable postfix
    ```

  - ### 镜像切换

    Gitlab 国外镜像速度一向感人，而且是不是的还抽风，所以在国内搭建 Gitlab 使用的时候，还是切换成墙内镜像比较放心。目前官方支持的国内镜像是清华大学的镜像站，地址：[https://mirror.tuna.tsinghua.edu.cn/help/gitlab-ce/](https://link.jianshu.com/?t=https%3A%2F%2Fmirror.tuna.tsinghua.edu.cn%2Fhelp%2Fgitlab-ce%2F)

    ##### 1. 新建镜像 repo

    新建 `/etc/yum.repos.d/gitlab-ce.repo`，内容为:

    ```
    [gitlab-ce]
    name=Gitlab CE Repository
    baseurl=https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el$releasever/
    gpgcheck=0
    enabled=1
    ```

  - 安装gitlab-ce 社区版

    ```shell
    yum install -y gitlab-ce 
    ```

- Omnibus gitlab 等相关配置初始化并完成安装

  - 证书创建与配置加载

    ```shell
    mkdir -p /etc/gitlab/ssl
    
    openssl genrsa -out "/etc/gitlab/ssl/gitlab.example.com.key" 2048
    
    openssl req -new -key "/etc/gitlab/ssl/gitlab.example.com.key" -out "/etc/gitlab/ssl/gitlab.example.com.csr"
    
    openssl x509 -req -days 365 -in "/etc/gitlab/ssl/gitlab.example.com.csr" -signkey "/etc/gitlab/ssl/gitlab.example.com.key" -out "/etc/gitlab/ssl/gitlab.example.com.crt"
    
    openssl dhparam -out /etc/gitlab/ssl/dhparams.pem 2048
    
    chmod 600 /etc/gitlab/ssl/*
    
    ```

    

  - nginx ssl 代理服务配置

    ```shell
    vi /etc/gitlab/gitlab.rb
    修改 external_url 'http://gitlab.example.com' 为 external_url 'https://gitlab.example.com'
    
    修改 #nginx['redirect_http_to_https'] = false 
    为 nginx['redirect_http_to_https'] = true 
    
    修改**为 自己的路径# nginx['ssl_certificate'] = "/etc/gitlab/ssl/gitlab.example.com.crt"
    # nginx['ssl_certificate_key'] = "/etc/gitlab/ssl/gitlab.example.com.key"
    
    修改**为 # nginx['ssl_dhparam'] = /etc/gitlab/ssl/dhparams.pem  # Path to dhparams.pem, eg. /etc/gitlab/ssl/dhparams.pem
    保存退出
    ```

    

  - 初始化gitlab相关服务并完成安装

    ```shell
    gitlab-ctl reconfigure
    
    vi /var/opt/gitlab/nginx/conf/gitlab-http.conf
    在server_name 下添加
    rewrite ^(.*)$ https://$host$1 permanent
    
    gitlab-ctl restart
    
    在本机的hosts文件 添加ip 解析gitlab.example.com
    ```

  - 访问https://gitlab.example.com即可

## 



## [我的主页](https://suveng.github.io/blog/)



