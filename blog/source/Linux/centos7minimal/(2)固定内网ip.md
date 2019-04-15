title:  (2)固定内网ip
date: 2014-01-05 13:00:00 +0800
update: 2014-01-05 13:00:00 +0800
author: me
cover: http://ww1.sinaimg.cn/large/006jIRTegy1g17bewj3nqj31kw11xk0o.jpg
preview:  MVC设计思想
tags:

  -  centos7minimal

---



[TOC]

![封面图]()

# (2)固定内网ip

在 /etc/sysconfig/network-scripts 路径下找到 ifcfg-* ，* 代表具体网卡，本文修改的网卡是 ifcfg-enp0s3 ，你的有可能是 ifcfg-eth0 ，除 ONBOOT 和 BOOTPROTO 修改外，其他几项为新增。修改后内容参见下文。

```properties
#static assignment
ONBOOT=yes #开机启动
BOOTPROTO=static #静态IP
IPADDR=192.168.1.151 #本机地址
NETMASK=255.255.255.0 #子网掩码
GATEWAY=192.168.1.1 #默认网关
# Created by anaconda
DNS1=192.168.1.1
DNS2=8.8.8.8
```

## [我的主页](https://suveng.github.io/blog/)



