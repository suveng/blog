title: (8)Jenkins Job应用
date: 2019-04-21 13:00:00 +0800
update: 2019-04-21 13:00:00 +0800
author: me
cover: https://ws1.sinaimg.cn/large/006jIRTegy1g25y1edcfnj31p411v7ks.jpg
preview:   Jenkins是一个开源持续集成工具，是由Java开发，提供了软件开发的持续集成服务
tags:

  -  持续集成

---



[TOC]

![封面图]()

# (8)Jenkins Job应用

## 介绍

jenkins job 代表一个任务或者项目

可配置与可执行

执行后的记录称之为Build

日志监控与记录

所有文件集中保存

## Freestyle Job:

1.需要在页面添加模块设置项与参数完成配置

2.每个job仅能实现一个任务功能

3.无法将配置代码化，不利于job配置迁移与版本控制

4.逻辑相对简单 ，无需额外学习成本

## Pipeline Job:

匹配持续集成与持续交付的概念

CI：提交即构建

CD：自动化测试与自动化部署

1.所有模块，参数配置都可以体现为一个pipline脚本

2.可以定义多个stage构建一个管道工作集

3.所有配置代码化，方便job迁移与版本控制

4.需要pipline脚本语法基础

## Jenkins Job 构建配置

### 环境准备

1. 配置Jenkins Server本地Gitlab DNS
2. 安装git client，curl 工具依赖
3. 关闭系统Git http.sslVerify安全认证 git config --global http.sslVerify false
4. 添加Jenkins后台 Git Client user 与 email
5. 添加git credential凭据

## Jenkins freestyle job 构建配置

1.创建一个freestyle project

2.编辑描述信息

3.参数配置

4.源代码管理

5.build配置

## Pipeline Job 编写规范

### pipeline 基础架构

所有代码包裹pipline{}层内

stages{}层用来包含pipeline所有stage子层

stage{}层用来包含具体我们要编写任务的steps{}子层

steps{}层用来添加我们具体需要调用的模块语句

例子：

```yaml
pipeline{
  agent any
  environment{
    host='test.example.com'
	  user='deploy'
  }
  stages{
    stage('build'){
      steps{
        sh "cat $host"
        echo $deploy
      }
    }
  }
}
```

agent区域

1.agent定义pipeline在哪里运行
可以使用any，none，或者具体的jenkins node 主机名等
例如指定在 node1上执行，可以写成：

```yaml
agent{node {label 'node1'}}
```

2.environment区域

* “变量名称=变量值”定义我们的环境变量
* 可以定义全局环境变量，应用所有stages任务
* 可以定义stage环境变量，应用到单独的stage任务

3.script区域（可选）

* 在steps内定义script
* groovy脚本语言
* 用来进行脚本逻辑运算

4.steps区域

* echo
* sh
* git url

## Jenkins pipeline Job 构建配置

1.创建一个pipeline project

2.添加描述信息

3.pipeline 脚本配置

```groovy
#!groovy
pipeline{
	agent { node {label 'master'} }
	environment {
		PATH="/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin"
		
	}
	parameters{
		choice(
			choices: 'dev\nprod',
			description: 'choose deploy environment',
			name: 'deploy_env'
		)
		string(
			name: 'version',
			defaultValue: '1.0.0',
			description: 'build version'
		)
	}
	stages{
		stage("checkout test repo"){
			steps{
				sh 'git config --global http.sslVerify false'
				dir("${env.WORKSPACE}"){
					git branch: 'master', credentialsId: "16e2c276-8370-40c4-a540-d35ba79d7ec1", url: 'https://gitlab.example.com/root/test_repo.git'
				}
			}
		}
		stage("print variable"){
			steps{
				dir("${env.WORKSPACE}"){
					sh """
					echo "[INFO] print variable env"
					echo "current env is $deploy_env" >> test.properties
					echo "the build version is $version"
					echo "[INFO] done..."
					"""
				}
			}
		}
		stage("check test.properties"){
			steps{
				dir("${env.WORKSPACE}"){
					sh """
					echo "[INFO] Check test.properties"
					if [ -s test.properties ]
					then 
						cat test.properties
						echo "[INFO] done..."
					else 
						echo "test.properties doesn't exists"
					fi
					
					"""
					echo "[INFO] build finished..."
				}
			}
		}
	}
}
```



## 推荐阅读



## [我的主页](https://suveng.github.io/blog/)



