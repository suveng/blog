title:  (6)Ansible其他常用模块
date: 2019-04-18 13:00:00 +0800
update: 2019-04-18 13:00:00 +0800
author: me
cover: https://ws1.sinaimg.cn/large/006jIRTegy1g24rob1vraj3334223b29.jpg
preview:   轻量级无客户端,使用playbook作为核心配置架构，统一的脚本格式批量化部署
tags:

  -  持续集成

---



[TOC]

![封面图]()

# (5)Ansible应用

## playbooks框架与格式

目录：

```shell
inventory/				#server清单目录
	testenv				#具体清单与变量声明文件
roles/					#roles任务列表
	testbbox/			#详细任务
		tasks/
			main.yml	#主任务文件
deploy.yml				#playbook任务入口
```

testenv:

```yml
[testservers] 				#server组列表
test.example.com			#目标部署服务器主机名

[testservers:vars]			#server组列表的参数
server_name=test.example.com
user=root
output=/root/test.txt
```

主任务文件main.yml

```yml
- name: print server name and user to remote testbox		#任务名称
  shell: "echo 'hello,world' > {{output}}"		#使用shell模块执行的命令
```

任务入口文件deploy.yml

```
- hosts: "testservers"		#server列表
  gather_facts: true		#获取server基本信息
  remote_user: root			#目标服务器系统指定用户
  roles:					
  	- testbox				#进入roles/testbox目录
```

注意：需要配置SSH免密码秘钥认证

步骤

1. Ansible服务器创建SSH本地秘钥

   ```shell
   ssh-keygen -t rsa
   ```

   

2. Ansible服务器建立与目标部署主机的秘钥认证

   ```shell
   ssh-copy-id -i /home/deploy/.ssh/id_rsa.pub root@test.example.com
   ```

## 执行playbook

1. 部署到testenv环境

   ```shell
   ansible-playbook -i inventory/testenv ./deploy.yml
   ```

   



## [我的主页](https://suveng.github.io/blog/)



