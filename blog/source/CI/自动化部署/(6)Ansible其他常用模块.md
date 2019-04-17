title:  (6)Ansible其他常用模块
date: 2019-04-19 13:00:00 +0800
update: 2019-04-19 13:00:00 +0800
author: me
cover: https://ws1.sinaimg.cn/large/006jIRTegy1g24rob1vraj3334223b29.jpg
preview:   轻量级无客户端,使用playbook作为核心配置架构，统一的脚本格式批量化部署
tags:

  -  持续集成

---



[TOC]

![封面图]()

# (6)Ansible其他常用模块

## File模块

在目录主机创建文件或者目录，并赋予其系统权限

task例子：

```yaml
- name: create a file 
  file: 'path=/root/foo.txt state=touch mode=0755 owner=foo group=foo'
```

## Copy模块

实现Ansible服务端到目标值主机的文件的传送

task例子：

```yaml
- name: copy a file
  copy: 'remote_src=no src=roles/testbox/files/foo.sh dest=/root/foo.sh mode=0644 force=yes'
```

## Stat模块

远程获取文件状态信息

```yaml
- name: check if foo.sh exists
  stat: 'path=/root/foo.sh'
  register: script_stat
```

## Debug模块：

打印语句到Ansible执行输出

```yaml
- debug: msg=foo.sh exists
  when: script_stat.exists
```

## Command/Shell模块

用来执行Linux目标主机命令行

shell默认调用bin/bash的命令，可以使用bash的环境变量。

```yaml
- name: run the script
  command: "sh/root/foo.sh"
  
- name: run the script
  shell: "echo 'test' > /root/test.txt"
  
```

## Template模块

实现Ansible服务器到目标主机的jinja2模板的传送

```yaml
- name: write the nginx config file
  template: src=roles/testbox/templates/nginx.conf.j2 dest=/etc/nginx/nginx.conf
```

## Pakaging模块

调用目标主机系统包管理工具yum,apt进行安装

```yaml
- name: ensure nginx is at the lastest version
  yum: pkg=nginx state=latest
```

```yaml
- name: ensure nginx
  apt: pkg=nginx state=latest
```

## Service模块

管理目标主机的系统服务

```yaml
- name: start nginx
  service: name=nginx state=started
```

## 综合实践

```yaml
- name: create a file
  file: 'path=/root/foo.txt state=touch mode=0755 owner=foo group=foo'
- name: copy a file
  copy: 'remote_src=no src=roles/testbox/files/foo.sh dest=/root/foo.sh mode=0644 force=yes'
- name: check if foo.sh exists
  stat: 'path=/root/foo.sh'
  register: script_stat
- debug: msg="foo.sh exists"
  when: script_stat.stat.exists
- name: run the script
  command: 'sh /root/foo.sh'
- name: write the nginx config file
  template: src=roles/testbox/templates/nginx.conf.j2 dest=/etc/nginx/nginx.conf
- name: ensure nginx
  yum: pkg=nginx state=latest
- name: start nginx
  service: name=nginx state=started
  
  
  
  
- name: 创建文件
  file: 'path=/root/foo.txt state=touch mode=0755 owner=foo group=foo'
- name: 复制文件
  copy: 'remote_src=no src=roles/testbox/files/foo.sh dest=/root/foo.sh mode=0644 force=yes'
- name: 检查文件状态
  stat: 'path=/root/foo.sh'
  register: script_stat
- debug: msg="foo.sh 存在"
  when: script_stat.stat.exists
- name: 运行脚本
  command: 'sh /root/foo.sh'
- name: template执行
  template: src=roles/testbox/templates/nginx.conf.j2 dest=/etc/nginx/nginx.conf
- name: 安装软件
  yum: pkg=nginx state=latest
- name: 启动服务
  service: name=nginx state=started
```



因为要安装nginx源，所以想把rpm源给部署好。

```shell
sudo rpm -Uvh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
```



## [我的主页](https://suveng.github.io/blog/)



