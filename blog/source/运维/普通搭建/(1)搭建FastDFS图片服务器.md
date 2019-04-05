title:  (1)搭建FastDFS图片服务器
date: 2019-04-05 13:00:00 +0800
update: 2019-04-05 13:00:00 +0800
author: me
cover: http://ww1.sinaimg.cn/large/006jIRTegy1g1rzuiknbij31kw0zhwqh.jpg
preview:  基于腾讯云服务器搭建一个图片服务器，使用FastDFS搭建。FastDFS是由淘宝的余庆先生开发
tags:

  -  运维

---



[TOC]

![封面图](http://ww1.sinaimg.cn/large/006jIRTegy1g1rzuiknbij31kw0zhwqh.jpg)

# (1)搭建FastDFS图片服务器

需要的工具

- 系统: centos7

  ```shell
  yum install git gcc gcc-c++ make automake autoconf libtool pcre pcre-devel zlib zlib-devel openssl-devel -y
  ```

- 1.libfastcommon-master.zip #libfastcommon包含了FastDFS运行所需要的一些基础库。

  ```shell
  wget https://github.com/happyfish100/libfastcommon/archive/master.zip
  ```

- 2.FastDFS版本：fastdfs-5.11.zip 

  ```shell
  wget https://github.com/happyfish100/fastdfs/archive/V5.11.zip
  ```

  

- 3.注意这里使用的FastDFSV5.11版本：所以这个要使用git log 为 return 416 for HTTP Range error的提交版本否则在nginx编译的是否会报错。clone后自己reset

  ```shell
  git clone https://github.com/happyfish100/libfastcommon/
  ```

- 4.Nginx版本：nginx-1.15.7.tar.gz : #官网下载:

  ```shell
  wget http://nginx.org/download/nginx-1.15.7.tar.gz
  ```

  

# 1. 安装FastDFS

## 1.1 安装libfastcommon

```shell
#下载并且解压
  $ wget https://github.com/happyfish100/libfastcommon/archive/master.zip
  $ unzip master.zip
  #编译
  $ ./make.sh
  #安装 
  $ ./make.sh install
```

## 1.2 安装FastDFS

```shell
 #下载并且解压
  $ wget https://github.com/happyfish100/fastdfs/archive/V5.11.zip
  $ unzip V5.11.zip
  #编译
  $ ./make.sh
  #安装 
  $ ./make.sh install
```

## 1.3 新建目录作为FastDFS文件存储目录

由于现在只有一个Storage所以只需要创建一个目录就可以了，为了方便，我将该目录创建在自己的家目录中

```shell
mkdir -p /home/fdfs
```

## 1.4 配置跟踪服务器tracker

```shell
  $ cd /etc/fdfs
  $ mv tracker.conf.sample tracker.conf
  $ vi tracker.conf

#注意：仅修改了如下数据
22: base_path=/home/fdfs
```

## 1.5 配置存储服务器storge

```shell
cd /etc/fdfs
  $ mv storage.conf.sample storage.conf
  $ vi storage.conf

#注意：仅修改了如下数据
41: base_path=/home/fdfs
...
109: store_path0=/home/fdfs
...
#注意，这里的ip为tracker的id地址,填自己的ip
118: tracker_server=192.168.15.132:22122
```

## 1.6 启动tracker与storage

找到对应的可执行文件执行启动操作即可

```shell
cd /usr/bin
fdfs_trackerd /etc/fdfs/tracker.conf restart
fdfs_storaged /etc/fdfs/storage.conf restart
```

## 1.7 测试上传

截止目前，fastdfs已经搭建好了，实际上很简单，无非就是linux系统下的软件安装与配置。

```shell
$ mv client.conf.sample client.conf
$ vi client.conf

# 修改了如下数据
10: base_path=/home/fdfs
14: tracker_server=192.168.15.132:22122
```

```shell
#随便上传一个图片
fdfs_upload_file /etc/fdfs/client.conf /home/briup/tutu.jpeg 
```

返回值 group1/M00/00/00/wKgPhFuXVdaAbeLFAADJj3NnELQ56.jpeg表示该文件在fastDFS中的位置。

# 2. 安装nginx与fastdfs-nginx-module

```shell
$ cd ~
$ git clone https://github.com/happyfish100/fastdfs-nginx-module.git
$ cd fastdfs-nginx-module/src
$ vi config
```

nginx会被安装到/usr/local/nginx中

## 2.4配置nginx

```shell
$ cd /usr/local/nginx
$ vi conf/nginx.conf

35: server {
36:         listen       8888;
37:         server_name  192.168.15.132;
38:         ...
            location ~/group([0-9])/M00 {
                ngx_fastdfs_module;
            }
# 修改完成后重新启动
$ ./sbin/nginx -s reload
```

这时候如果访问你会发现nginx没有响应。这是由于你没有加载插件配置的原因

将fastdfs-5.11/conf中的http.conf与mime.types拷贝到/etc/fdfs目录中以备fastdfs-nginx-module的配置文件调用。

```shell
$ cd /usr/local/src/fastdfs-5.11/conf 
$ cp http.conf /etc/fdfs/
$ cp mime.types /etc/fdfs/
```

将fastdfs-nginx-module/src中的mod_fastdfs.conf 也拷贝到/etc/fdfs目录中

```shell
$ cd /usr/local/src/fastdfs-nginx-module/src
$ cp mod_fastdfs.conf /etc/fdfs/
```

修改mod_fastdfs.conf

```shell
10  base_path=/home/fdfs
40  tracker_server=192.168.15.132:22122
52  url_have_group_name = true
61  store_path0=/home/fdfs
```

重启nginx即可.

## [我的主页](https://suveng.github.io/blog/)



