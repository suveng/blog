title: Prometheus使用
date: 2019-09-12 11:00:00 +0800
update: 2019-09-12 11:00:00 +0800
author: me
cover: images/wallhaven-714079.jpg
tags:

  -  运维监控

---

# Prometheus使用

## 环境

- 查看上一篇[安装篇](https://blog.csdn.net/qq_37933685/article/details/100602068)
- MacOS
- Centos 7
- [prometheus-2.12.0.linux-amd64.tar.gz](https://github.com/prometheus/prometheus/releases/download/v2.12.0/prometheus-2.12.0.linux-amd64.tar.gz)
- [grafana-6.3.5-1.x86_64](https://dl.grafana.com/oss/release/grafana-6.3.5-1.x86_64.rpm)
- [node_exporter-0.18.1.linux-amd64](https://github.com/prometheus/node_exporter/releases)
- [pushgateway-0.9.1.linux-amd64](https://github.com/prometheus/pushgateway/releases/download/v0.9.1/pushgateway-0.9.1.linux-amd64.tar.gz)

## 命令行入门实例

- CPU使用率计算

  CPU在t1到t2时间段总的使用时间 = `( user2+ nice2+ system2+ idle2+ iowait2+ irq2+ softirq2) - ( user1+ nice1+ system1+ idle1+ iowait1+ irq1+ softirq1)`
  CPU在t1到t2时间段空闲使用时间 =` (idle2 - idle1)`

  CPU在t1到t2时间段即时利用率 =  `1 - CPU空闲使用时间 / CPU总的使用时间`

  `increase()` 函数:解决counter类型的时间增量

  多核CPU计算

  `sum() `结果求和

  - 获取CPU时间
  - 获取空闲时间`idle`

获取总的时间



- 单台机器的CPU总利用率

  ```go
  1-(sum(increase(node_cpu_seconds_total{instance="192.168.9.232:9100",mode="idle"}[1m]))/sum(increase(node_cpu_seconds_total{instance="192.168.9.232:9100"}[1m])))
  ```

- by(instance): 区分不同实例

- ```go
  (1-( sum(increase(node_cpu_seconds_total{mode="idle"}[1m])) by(instance) / sum(increase(node_cpu_seconds_total{}[1m]) ) by(instance) )) * 100
  ```

- 计算其他CPU状态时间的使用

  - iowait io等待时间

    `
    sum(increase(node_cpu_seconds_total{mode="iowait"}[1m])) by(instance) / sum(increase(node_cpu_seconds_total{}[1m]) ) by(instance)
    `

    

  - irq 硬中断 

    `
    sum(increase(node_cpu_seconds_total{mode="irq"}[1m])) by(instance) / sum(increase(node_cpu_seconds_total{}[1m]) ) by(instance)
    `

    
    
  - soft irq 软中断  
  
    `
  sum(increase(node_cpu_seconds_total{mode="softirq"}[1m])) by(instance) / sum(increase(node_cpu_seconds_total{}[1m]) ) by(instance)
    `

    

  - steal 虚拟机的分片时间

    `
    sum(increase(node_cpu_seconds_total{mode="steal"}[1m])) by(instance) / sum(increase(node_cpu_seconds_total{}[1m]) ) by(instance)
    `
  
    
  
  - nice 进程分配nice值的时间
  
    `
    sum(increase(node_cpu_seconds_total{mode="nice"}[1m])) by(instance) / sum(increase(node_cpu_seconds_total{}[1m]) ) by(instance)
    `
  
    
  
  - idle空闲
  
    `
    sum(increase(node_cpu_seconds_total{mode="idle"}[1m])) by(instance) / sum(increase(node_cpu_seconds_total{}[1m]) ) by(instance)
    `
  
    
  
  - user用户态
  
    `
    sum(increase(node_cpu_seconds_total{mode="user"}[1m])) by(instance) / sum(increase(node_cpu_seconds_total{}[1m]) ) by(instance)
    `
  
  - sytem内核态 
  
    `sum(increase(node_cpu_seconds_total{mode="system"}[1m])) by(instance) / sum(increase(node_cpu_seconds_total{}[1m]) ) by(instance)
  	 	`
    
  



## 命令行扩展使用

- 过滤

  - 标签过滤 `key{label=""}`
    - 模糊匹配 ` key{label=~"web.*"}`
  - 数值过滤
    - 四则运算 `key{.} > 400`

- 函数

  - `rate(.[5m])` 搭配counter型数据, 按照设置的一个时间段,取`counter`在这个时间段的增量的平均每秒

     $value = ∆S/∆t$

    - 时间段的取值 要考虑采集数据的程序采集间隔

  - `increase(.[5m]) `搭配`counter`型数据,取一个时间段的增量
    $value=∆S$ 

  - `sum()`加和

    - 结合 `by()`

  - `topk(x,key)` 取最高前x位

    - 不适合 `graph` ;  适用于`console` 查看
    - 适合瞬时报警

  - `count()` 

    - 模糊监控判断



## 采集数据

### 服务端启动-适用于生产

- Peometheus加载配置文件
  - 向prometheus进行发信号
    -  kill -HUP pid
  - 向prometheus发送HTTP请求
    -  curl -XPOST http://prometheus.chenlei.com/-/reload

- 后台运行

  - [使用 `screen` 工具](https://linux.cn/article-8215-1.html) 

  - [使用 `daemonize`](https://github.com/bmc/daemonize)

    ```shell
    > yum install -y kernel-devel 
    > yum groupinstall -y Development tools
    > git clone https://github.com/bmc/daemonize.git
    > cd daemonize
    > ./configure && make && make install 
    ```

- 启动`prometheus`额外参数

  - --web.listen-address : 监听地址 `0.0.0.0:9090`
  - --web.read-timeout : 请求链接最大等待时间 `2m`
  - --web.max-connections: 最大连接数 `10`
  - --storage.tsdb.retention: 数据保存期限 `90d`
  - --storage.tsdb.path: 数据保存路径 `/data/prometheus/server/data`
  - --query.max-concurrency: 最大并发数 `20`
  - --query.timeout: 查询超时时间 `2m`

- 存储结构

  ```shell
  server/
  └── data
      ├── 01DM9HP1PHHK2BD1MGC7J1C0YC
      │   ├── chunks
      │   │   └── 000001
      │   ├── index
      │   ├── meta.json
      │   └── tombstones
      ├── 01DM9ZDG8QKWTPYZ86K7XW6FKZ
      │   ├── chunks
      │   │   └── 000001
      │   ├── index
      │   ├── meta.json
      │   └── tombstones
      ├── 01DMAM0NM51YSQ4EVRRV46X2E1
      │   ├── chunks
      │   │   └── 000001
      │   ├── index
      │   ├── meta.json
      │   └── tombstones
      ├── 01DMAM0P4CGJWSSA15QPWJGZXF
      │   ├── chunks
      │   │   └── 000001
      │   ├── index
      │   ├── meta.json
      │   └── tombstones
      ├── lock
      ├── queries.active
      └── wal
          ├── 00000011
          ├── 00000012
          ├── 00000013
          ├── 00000014
          ├── 00000015
          ├── 00000016
          ├── 00000017
          ├── 00000018
          └── checkpoint.000010
              └── 00000000
  ```

- 近期数据保存在`wal/`目录中,防止突然断电或者重启,以用来恢复内存中的数据

### 服务端配置文件写法

```yml
global:
  scrape_interval:     5s #抓取频率
  evaluation_interval: 1s 



alerting:
  alertmanagers:
  - static_configs:
    - targets:



rule_files:

scrape_configs:	

  - job_name: 'prometheus'

    static_configs:
    - targets: ['localhost:9090']

  - job_name: '233-node-exporter'

    static_configs:
    - targets: ['192.168.9.233:9100']

  - job_name: '232-node-exporter'

    static_configs:
    - targets: ['192.168.9.232:9100']

  - job_name: '239-node-exporter'

    static_configs:
    - targets: ['192.168.9.239:9200']
```



### node_exporter

[github地址](https://github.com/prometheus/node_exporter)

- 采集服务器的指标
- 有足够多的默认采集项
- 可以通过启动时,开启或者禁用某些指标



### pushgateway

- 介绍
  主动推送数据到`prometheus server`

  可以单独运行在不同节点上,并不要求是监控节点

- 安装
  - [0.9.1 / 2019-08-01](https://github.com/prometheus/pushgateway/releases/tag/v0.9.1)
  - 下载地址: [链接](https://github.com/prometheus/pushgateway/releases/download/v0.9.1/pushgateway-0.9.1.linux-amd64.tar.gz)
  - 解压
  - 运行

- 自定义采集脚本发送到pushgateway

  - 安装pushgeteway

  - prometheus配置job关联pushgateway

  - 目标主机编写脚本采集数据

  - [定时执行发送metric数据到pushgateway](https://blog.csdn.net/y_z_w123/article/details/79816474)

    ```bash
    #!/bin/bash
    instance_name=instance_name
    
    label=label
    value=123
    
    echo "$label $value" | curl --data-binary @- http://192.168.9.233:9091/metrics/job/test/instance/$instance_name
    ```

- 缺点
  - 单点瓶颈
  - 没有数据过滤

### 自定义exporter

- 开发流程
  - [官网介绍](https://prometheus.io/docs/instrumenting/writing_exporters/)
  - web HTTP 服务, 响应外部GET请求
  - 运行在后台,定期触发抓取本地的监控数据
  - 响应结果 必须符合prometheus的metrics的格式

- [Java]Spring版exporter
  
  - [自定义Metrics：让Prometheus监控你的应用程序（Spring版）](http://ylzheng.com/2018/01/24/use-prometheus-monitor-your-spring-boot-application/)
  
  - Go语言开发Prometheus Exporter[示例](https://blog.csdn.net/lisonglisonglisong/article/details/81743555)



## 界面可视化

### grafana

- 介绍
  开源数据绘图工具

- 安装

  - [grafana官网](https://grafana.com/)
  - [官网安装引导](https://grafana.com/grafana/download?platform=linux)
  - 默认端口: 3000

- 配置
  - 添加`prometheus`数据源

    ![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly90dmExLnNpbmFpbWcuY24vbGFyZ2UvMDA2eThtTjZneTFnNndtdDU4eXN1ajMxaGIwcWkwdnUuanBn?x-oss-process=image/format,png)

  

  - 添加`dashboard`
    ![image-20190910175959926](https://imgconvert.csdnimg.cn/aHR0cHM6Ly90dmExLnNpbmFpbWcuY24vbGFyZ2UvMDA2eThtTjZneTFnNndtc3RmZmZiajMxaGMwcjJnbm4uanBn?x-oss-process=image/format,png)

  - 建立Dashboard

    - 数据源配置
      ![image-20190910175917439](https://imgconvert.csdnimg.cn/aHR0cHM6Ly90dmExLnNpbmFpbWcuY24vbGFyZ2UvMDA2eThtTjZneTFnNnVrcmM1cmozajMxaGMwcjI3Y2ouanBn?x-oss-process=image/format,png)

- 图形配置

  - Visualization
    ![image-20190910175754722](https://imgconvert.csdnimg.cn/aHR0cHM6Ly90dmExLnNpbmFpbWcuY24vbGFyZ2UvMDA2eThtTjZneTFnNnVrcHdpbnR0ajMxaGMwcjI3Y3UuanBn?x-oss-process=image/format,png)
  - Axes
    ![image-20190910175814132](https://imgconvert.csdnimg.cn/aHR0cHM6Ly90dmExLnNpbmFpbWcuY24vbGFyZ2UvMDA2eThtTjZneTFnNnVrcThyeXhkajMxaGMwcjI3Y2suanBn?x-oss-process=image/format,png)
  - Legend
    ![image-20190910175830342](https://imgconvert.csdnimg.cn/aHR0cHM6Ly90dmExLnNpbmFpbWcuY24vbGFyZ2UvMDA2eThtTjZneTFnNnVrcWoyeGFkajMxaGMwcjIxMHcuanBn?x-oss-process=image/format,png)
  - Thresholds & Time Regions
    ![image-20190910175852153](https://imgconvert.csdnimg.cn/aHR0cHM6Ly90dmExLnNpbmFpbWcuY24vbGFyZ2UvMDA2eThtTjZneTFnNnVrcXdrOHlkajMxaGMwcjIxMG0uanBn?x-oss-process=image/format,png)
  - Data link

- 通用配置
  ![image-20190910180031703](https://imgconvert.csdnimg.cn/aHR0cHM6Ly90dmExLnNpbmFpbWcuY24vbGFyZ2UvMDA2eThtTjZneTFnNnVrc21oOWdwajMxaGMwcjJ3bWUuanBn?x-oss-process=image/format,png)

- 告警配置
    ![image-20190910180042705](https://imgconvert.csdnimg.cn/aHR0cHM6Ly90dmExLnNpbmFpbWcuY24vbGFyZ2UvMDA2eThtTjZneTFnNnVrc3RldHlpajMxaGMwcjJ0ZzMuanBn?x-oss-process=image/format,png)

  

- 备份
  - 导出json
  - save as 
- 还原
  - 导入json/粘贴json
- 报警功能 
  报警是 `grafana 4.0` 的新功能
  - 钉钉告警
  - pageduty



## 实践

- 内存使用率
  - 数据来源
    node_exporter
  - 计算公式
    $value=available/Sum$
    实际可用内存=free+buffers+cached
  - 公式实现
    `((node_memory_MemFree_bytes+node_memory_Buffers_bytes+node_memory_Cached_bytes)/node_memory_MemTotal_bytes)*100`

- 硬盘io监控
  - 数据来源
    node_exporter
  - 计算公式
    $value=读速度+写速度$
  - 公式实现
    函数: predict_linear(), 预测趋势
    `(rate(node_disk_read_bytes_total[1m])+rate(node_disk_written_bytes_total[1m]))`

- 网络监控

  - 数据来源
    bash脚本+pushgateway

  - 脚本编写
    采集内网流量ping延迟和丢包率

    ```bash
    instance=`hostname -f`
    #外网联通
    lostpk=`timeout 5 ping -q -A -s 500 -W 1000 -c 100 baidu.com | grep transmitted | awk '{print $6}'`
    #时间
    rrt=`timeout 5 ping -q -A -s 500 -W 1000 -c 100 baidu.com | grep transmitted | awk '{print $10}'`
    
    # value只允许数值型
    value_lostpk=${lostpk%%\%}
    value_rrt=${rrt%%ms}
    
    # 通过 pushgateway 发送给prometheus
    echo "lostpk_$instance : $value_lostpk"
    echo "lostpk_$instance $value_lostpk" | curl --data-binary @- http://192.168.9.233:9091/metrics/job/network-traffic/instance/$instance
    
    echo "rrt_$instance : $value_rrt"
    echo "rrt_$instance $value_rrt" | curl --data-binary @- http://192.168.9.233:9091/metrics/job/network-traffic/instance/$instance
    
    ```

  - 定时执行
    [资料](https://blog.csdn.net/y_z_w123/article/details/79816474)
    定时执行步骤: 

    - 安装crontab
    - 在`/etc/crontab`配置cron运行对应可执行脚本

  - 查看结果

    - 在prometheus查看targets有没有在线,如果没有需要到prometheus配置,记得刷新配置
      ![image-20190912115039938](https://imgconvert.csdnimg.cn/aHR0cHM6Ly90dmExLnNpbmFpbWcuY24vbGFyZ2UvMDA2eThtTjZneTFnNndsY3JmeDRoajMxaGIwbjYweG8uanBn?x-oss-process=image/format,png)
    - 查看配置

    ![image-20190912115136770](https://imgconvert.csdnimg.cn/aHR0cHM6Ly90dmExLnNpbmFpbWcuY24vbGFyZ2UvMDA2eThtTjZneTFnNndtcTg4cGtsajMwbDEwOXB3ZjUuanBn?x-oss-process=image/format,png)

    - 看指标,在命令行输入刚刚自定的key应该会有提示出现`lostpk` `rrt`
      ![image-20190912124023780](https://imgconvert.csdnimg.cn/aHR0cHM6Ly90dmExLnNpbmFpbWcuY24vbGFyZ2UvMDA2eThtTjZneTFnNndtcm1mZHY1ajMwcnkwZTIwdGkuanBn?x-oss-process=image/format,png)

- `ping` 和 `port`监控问题,prometheus不适合

  - 如果在pushgateway到脚本之间 或者 prometheus 到 pushgateway之间出现网络问题, 那么数据就无法采集, 会出现误报情况
  - 使用`nagios`可以替换这种监控的缺点

  