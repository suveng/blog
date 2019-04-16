title:  (4)Ansible
date: 2019-04-16 13:00:00 +0800
update: 2019-04-16 13:00:00 +0800
author: me
cover: http://ww1.sinaimg.cn/large/006jIRTegy1g210ip96hlj31kw11zwtm.jpg
preview:  轻量级无客户端,使用playbook作为核心配置架构，统一的脚本格式批量化部署
tags:

  -  持续集成

---



[TOC]

![封面图]()

# (4)Ansible

## 特点：

1. 轻量级无客户端
2. 开源免费，学习成本低，快速上手
3. 使用playbook作为核心配置架构，统一的脚本格式批量化部署
4. 完善的模块化扩展，支持目前主流的开发场景
5. 稳定性和兼容性
6. 活跃社区

## 环境依赖：

隔离安装依赖。

1. centos7
2. python3.6
3. ansible2.5

安装：

1. yum包管理安装，潜在危险和冲突

   ```shell
   yum install -y ansible 
   ```

2. git源代码安装

   ```shell
   git clone https://github.com/ansible/ansible.git
   ```

推荐第二种方式

## 步骤：

1. 预先安装python3.6

   ```shell
   wget http://www.python.org/ftp/python/3.6.5/Python-3.6.5.tar.xz
   tar xf  Python-3.6.5.tar.xz 
   ./configure --prefix=/usr/local --with-ensurepip=install -enable-shared LDFLAGS="-Wl,-rpath /usr/local/lib" #--prefix 安装目录 --with使用包管理工具
   make && make altinstall
   
   ln -s /usr/local/bin/pip3.6 /usr/local/bin/pip
   
   pip install virtualenv
   ```

   

2. 安装virtualenv

   ```python
   pip install virtualenv
   ```

3. 创建ansible账户并安装python3.6的virtualenv实例

   ```shell
   useradd deploy && su - deploy
   virtualenv -p /usr/local/bin/python3.6 .py3-a2.5-env
   ```

4. git源代码安装ansible2.5

   ```shell
   cd  /home/deploy/.py3-a2.5-env
   git clone https://github.com/ansible/ansible.git
   cd ansible && git checkout stable-2.5
   ```

5. 加载python3.6  virtualenv的环境

   ```shell
   source /home/deploy/.py3-a2.5-env/bin/activate
   ```

6. 安装ansible依赖包

   ```shell
   pip install paramiko PyYAML jinja2
   ```

7. 在python3.6的虚拟环境加载ansible2.5

   ```shell
   source /home/deploy/.py3-a2.5-env/ansible/hacking/env-setup -q
   ```

8. 验证ansible2.5

   ```shell
   ansible --version
   ```

   

## [我的主页](https://suveng.github.io/blog/)



