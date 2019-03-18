title:  docker(1)win10安装docker
date: 2019-03-04 13:00:00 +0800
update: 2019-03-04 13:00:00 +0800
author: me
cover: http://ww1.sinaimg.cn/large/006jIRTegy1g17bdn6999j31kw11xwkp.jpg
preview:  Docker for Windows 10使用Microsoft Hyper-V来同时驱动Linux和Windows容器。
tags:

  -  Docker

---



[TOC]

![封面图](http://ww1.sinaimg.cn/large/006jIRTegy1g17bdn6999j31kw11xwkp.jpg)

# docker(1)win10安装docker

> ## 环境说明

前言：
Docker发布了Docker for Windows的正式版，于是就可以在Windows下运行Docker容器了。要在Windows下运行Docker，需要满足以下先决条件：

* 64位Windows 10 Pro、Enterprise或者Education版本（Build 10586以上版本，需要安装1511 November更新）
* 在系统中启用Hyper-V。如果没有启用，Docker for Windows在安装过程中会自动启用Hyper-V（这个过程需要重启系统）
  不过，如果不是使用的Windows 10，也没有关系，可以使用[Docker Toolbox](http://www.docker.com/products/docker-toolbox)作为替代方案。

> ### 启用系统的Hper-V 和容器

* 打开程序和功能，右击开始选择应用和功能
* 此时， 计算机会重启。重启后执行下一步。

![](https://ws1.sinaimg.cn/large/006jIRTegy1g0qympzuiaj30880hi0sp.jpg)

![](https://ws1.sinaimg.cn/large/006jIRTegy1g0qymzz8tij30rs0f6jro.jpg)

![](https://ws1.sinaimg.cn/large/006jIRTegy1g0qynxakztj30k409v3yx.jpg)

![](https://ws1.sinaimg.cn/large/006jIRTegy1g0qyn9pav5j30k70k9gmg.jpg)





> ## 安装步骤

* 下载
* 添加docker用户
  * 打开**计算机管理**
    * 按下windows键+R键 输入`compmgmt.msc`
  * 选择**本地和用户组**
  * 打开**docker-users**, 添加你的系统用户名就可以了，然后保存

**下载**

在Windows 10中，请[点击此处](https://download.docker.com/)下载Docker for Windows的安装包，然后开始安装。

**添加docker用户**

![](https://ws1.sinaimg.cn/large/006jIRTegy1g0qyquzd3mj30m80f63zo.jpg)

![](https://ws1.sinaimg.cn/large/006jIRTegy1g0qyr57bzhj30db0gc0sv.jpg)



## [我的主页](https://suveng.github.io/blog/)

