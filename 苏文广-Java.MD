# 联系方式


- 手机：18320664028  （联系时间：周一至周五:8:00-9:00，19:00-22:00,周末全天）
- Email：suveng@163.com 
- 微信号：GG19961230


# 个人信息

 - 苏文广/男/1996 
 - 本科/韩山师范学院/计算机与信息工程学院/软件工程专业
 - 工作年限: 1年
 - Github：[http://github.com/suveng](http://github.com/suveng) 
 - 码云: [https://gitee.com/suveng](https://gitee.com/suveng)
 - 期望职位：运维开发/大数据/SDK平台开发


# 工作经历

## 广州趣丸网络科技有限公司 （ 2018年11月 ~ 至今 ）

## 校园招聘系统(2019.8.20-2019.8.28)

1. 项目概况：校园招聘系统目前包含 网申系统,和小程序助力宣传活动.[h5网申入口](http://game-lyact.ttwanjia.com/campus_front/formInfo.html),其他模块不对外开发

2. 项目分工：2人。1人负责服务端接口编写和数据管理后台,1人负责h5前端和小程序前端编写

3. 实现技术：SpringBoot2.X+MongoDB+Spring JPA + Redis + Shiro CAS+POI

4. 我的职责：负责系统整个流程的把控,流程图,时序图以及系统文档编写;负责服务端接口编写和数据管理后台;接入内部管理后台CAS服务,全局请求id+全局异常处理+业务告警通知,负责编写 h5+小程序对应的接口以及后台数据的增删查改,导出和统计

5. 我的收获：敏捷开发方法实践,一周从HR需求转化为开发的每一个任务.周期的控制以及版本的跟进.



###  T豆虚拟货币系统(2017~至今)

1. 项目概况：T豆系统是承接了语音、直播、小游戏、分发等多个业务的用户充值消费行为的系统,日流水数据达到2百万,充值订单日超6万笔,消费订单日超70万笔
2. 项目分工：3人。1人负责架构设计,其余两人进行业务开发.
3. 实现技术：Spring+SpringMVC+Mybatis+Nginx+MySQL(主从架构)+Redis+clickhouse集群
4. 我的职责：接手时,我负责定时核对clickhouse数据库与MySQL的数据一致,并删除历史数据.
5. 我的收获：学习了列式数据库clickhouse的使用,将clickhouse与mybatis整合使用,有效解决后台大量数据查询困难的难题.通过删除MySQL数据的任务,深入了解MySQL锁机制.实践flume-ng自定义source和自定义sink同步数据

### 佣金系统(2016~至今)

1. 项目概况：这是支撑TT语音APP, 内部游戏后台, 内部娱乐后台的佣金和实名系统,包含佣金模块和实名模块;佣金是用于会长以及一些直播提现佣金而使用到的模块,实名模块是TT语音APP和直播实名以及游戏实名等等应用调用的实名模块接口
2. 项目分工：2人。初期由娱乐事业部接管,后期由货币组接管,后期对其进行项目架构优化,并发优化,分布式优化,一人负责架构,我负责佣金模块&&实名模块.
3. 实现技术：Spring+SpringMVC+Mybatis+Nginx+Feign+MySQL(主从架构)+Redis集群
4. 我的职责：负责实名模块和佣金模块的开发,对接faceid人脸识别服务,项目代码优化,加入全局requstId追踪整个业务请求的生命周期,抽象日志对象,统一规范日志打印;抽象PaaS平台的调用跟踪,增加云服务对账功能
5. 我的收获：得到项目架构演进优化的经验.我负责从以前的单体架构迁移至分布式架构的代码优化,从中解决了高并发以及分布式带来的问题,比如线程锁迁移至分布式锁,共享session,共享缓存等等;在实现全局requestId时,对ThreadLocal等关于线程的知识以及分布式唯一ID的深入,

### SDK公告后台(2017.07~至今)
1. 项目概况：这是TT语音游戏事业部的游戏公告后台，主要提供发布公告，获取公告列表，公告下线接口给TT玩+后台调用。这是一个独立服务模块。
2. 项目分工：1人。项目创建1人，后期维护1人。属于研发中心-支撑线-货币组的维护项目。
3. 实现技术：Spring+SpringMVC+Mybatis+Nginx+MySQL(主从架构)+Redis集群+kafka集群
4. 我的职责：维护发布公告，获取公告列表，公告下线三个接口。同时负责删除过期公告的定时任务
5.  我的收获：熟悉公司SDK业务开发流程。熟悉maven多模块开发。熟悉高性能接口编写。

### 广告系统(2017.04~至今)
1. 项目概况：这是公司TTSDK平台的广告对接后台，通过订阅kafka同步事件对接渠道广告产生回调信息，从而统计广告收益，存储并可视化渠道广告点击数据。目前已对接的渠道有腾讯广点通，TT语音聚合平台（公司产品），百度，头条，舜飞等等渠道商。于2019年完成广告投放的自动化配置以及数据归因,投放数据分析等功能
2. 人员分工：3人，一人负责项目架构和kafka消息事件的数据定义，两人负责渠道广告商对接。
3. 实现技术：Spring+SpringMVC+Mybatis+Nginx+MySQL(主从架构)+Redis集群+kafka集群
4. 我的职责：我负责接入各种渠道广告商
5. 我的收获：深入了解kafka消息同步原理，了解kafka HA机制，熟练使用kafka进行异构系统/平台之间交互

### GS运营后台(2016.10~至今)
1. 项目简介：公司对付费玩家信息管理，游戏信息管理以及关于玩家每日新增,累计新增,累计流失等数据分析模块.
2. 人员分工：3人，1人负责web端展示，1人负责后端数据同步，1人日常维护（维护web端以及数据同步）
3. 实现技术：Spring+SpringMVC+Mybatis+Nginx+MySQL(主从架构)+Redis集群+kafka集群
4. 我的职责：我负责日常维护.我在此项目中完成玩家累计流失模块开发以及专服VIP模块的开发，更新累计新增和筛选器的业务逻辑。其中项目中数据分析模块的运营数据隔离做的出色。在这个项目中，最困难的问题是千万级数据隔离,千万级数据同步，我将数据隔离功能抽离成独立模块。
5. 我的收获：熟悉springMVC+spring+Mybatis技术栈的操作，熟悉了Nginx负载均衡，熟悉thrift远程调用。熟悉Linux shell 操作，resin项目部署操作。熟悉Apache POI库的使用。熟悉了MySQL慢查询调优过程，了解cas + shiro 的运行过程。
# 熟练技术

以下均为我熟练使用的技能

- 开发环境: MacOS10.14 / deepin Linux / centos 6&7
- Web开发语言：Java
- Web框架：SpringMVC/SpirngBoot/Mybatis/JPA/SpringSecurity
  - 微服务: SpringCloud 
- 中间件：
  - 消息队列:kafka/RabbitMQ
  - 一致性: ZooKeeper,etcd
  - 数据同步: Flume
- 服务器容器：Tomcat/Resin
- 数据库相关：MySQL/Redis/MongoDB/ElasticSearch/ClickHouse/TiDB
- 管理工具：
  - 代码管理: Svn/Git
  - 文档管理: showdoc/seafile
  - 部署管理: Maven/TravisCI/Jenkins/devops/Docker
- 运维:
  - 监控: prometheus,zabbix,grafana
  - 日志分析: ELK平台
- 其他工具:  IDEA,xshell,xftp,secureCRT,xmind
- 前端框架：Vue.js/Bootstrap/JQuery
- 单元测试：Junit
- 云和开放平台：旷视科技FaceID/微信小程序/腾讯云

# 自我评价
有事业心与责任心，工作积极认真，新项目上手很快。
对新事物有很强的好奇心，喜欢做有挑战的事情。
为人踏实，具有很强的团队意识和协作能力。

# 公司事件一览

## 公司研发中心文化墙

## 实习等级评定结果: S

![](http://ww1.sinaimg.cn/large/006jIRTegy1g4bcwlnei3j313z0o4tfn.jpg)

## 技术分享会: MySQL分析和优化

![](http://ww1.sinaimg.cn/large/006jIRTegy1g4bczkahlhj312a0or4p6.jpg)

# 致谢
感谢您花时间阅读我的简历，期待能有机会和您共事。

