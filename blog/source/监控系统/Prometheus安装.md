title: Prometheus安装
date: 2019-09-07 11:00:00 +0800
update: 2019-09-07 11:00:00 +0800
author: me
cover: images/wallhaven-714079.jpg
tags:

  -  运维监控

---

# Prometheus安装

下载地址: https://prometheus.io/download/

现在时间是: 2019.09.07

安装环境: [Linux centos7 minimal](centos.org/download/) 虚拟机; 宿主主机 MacOS; 软件: virtualBox 6.0.10 r132072

选用版本: 
- [prometheus-2.12.0.linux-amd64.tar.gz](https://github.com/prometheus/prometheus/releases/download/v2.12.0/prometheus-2.12.0.linux-amd64.tar.gz)
- [grafana-6.3.5-1.x86_64](https://dl.grafana.com/oss/release/grafana-6.3.5-1.x86_64.rpm)
- [node_exporter-0.18.1.linux-amd64](https://github.com/prometheus/node_exporter/releases)
- [pushgateway-0.9.1.linux-amd64](https://github.com/prometheus/pushgateway/releases/download/v0.9.1/pushgateway-0.9.1.linux-amd64.tar.gz)



## 二进制包安装

### 1.安装虚拟机

- 下载镜像

- 在virtualbox安装虚拟机

  - [配置网络](https://blog.csdn.net/qq_37933685/article/details/81169794)

  - [更换国内源](https://www.jianshu.com/p/e63903fd09f0) 

  - [【CentOS7】yum安装时出现错误[Errno 14] curl#6 - "Could not resolve host: mirrors.aliyuncs.com; Unknown e的解决办法](https://blog.csdn.net/oschina_41140683/article/details/82426831)

  - [必装类库](https://www.icode9.com/content-3-361221.html)
  
    

### 2.配置 以及 安装依赖

- 配置网络使用网络地址转换模式

- 主机名
  配置主机名可以快速辨识

- 时钟
  prometheus是个时序数据库,对时间要求极高,所以安装时间同步的工具,设置时区为东八区, Asia/shanghai
  [资料](https://blog.csdn.net/zonghua521/article/details/78239212)

  ```shell
  #安装服务
  > yum install ntp -y
  #开机启动
  > systemctl enable ntpd
  #设置时区
  > timedatectl set-timezone Asia/Shanghai
  #查看时区
  > timedatectl 
  ```

  

### 3.安装prometheus

我是本地加速下载好压缩包上传的,所以要另外配置 Linux上传下载文件的命令 `rz`

[资料](https://blog.51cto.com/oldboy/588592)

```shell
#上传下载命令
> yum install lrzsz -y
#下载
> wget https://github.com/prometheus/prometheus/releases/download/v2.12.0/prometheus-2.12.0.linux-amd64.tar.gz
#解压
> tar -zxvf prometheus-2.12.0.linux-amd64.tar.gz
# 配置环境变量
> vi /etc/profile
# 加入以下
# 设置prometheus的环境变量
PATH=$PATH
PATH=$PATH:/root/prometheus/server/prometheus-2.12.0.linux-amd64
export PATH
....
> source /etc/profile

# 启动promethus
> promethus 
```

### 4.测试联通性

看看输入对应ip:9090能否进入.

如果不能,检查 ping网络状态, telnet端口是否开启

```shell
# 停止防火墙
> systemctl stop firewalld
# 关闭开机启动防火墙
> systemctl disable firewalld
# 关闭安全策略
> vi /etc/sysconfig/selinux

# This file controls the state of SELinux on the system.
# SELINUX= can take one of these three values:
#     enforcing - SELinux security policy is enforced.
#     permissive - SELinux prints warnings instead of enforcing.
#     disabled - No SELinux policy is loaded.
# 这里修改为disabled
SELINUX=disabled
# SELINUXTYPE= can take one of three values:
#     targeted - Targeted processes are protected,
#     minimum - Modification of targeted policy. Only selected processes are protected.
#     mls - Multi Level Security protection.
SELINUXTYPE=targeted
```

[centos7关闭防火墙](https://blog.csdn.net/qq_37933685/article/details/89342051)

### 5.安装成功

![](https://img2018.cnblogs.com/blog/1419387/201909/1419387-20190907160549962-1261486624.png)




## Docker安装

```shell
docker run --name prometheus -d -p 127.0.0.1:9090:9090 quay.io/prometheus/prometheus
```



## 参考资料

官网: https://prometheus.io/docs/prometheus/latest/getting_started/

https://songjiayang.gitbooks.io/prometheus/content/install/binary.html


