title: Mybatis(3)SQL语句控制台打印
date: 2019-02-27 12:00:00 +0800
update: 2019-02-27 12:00:00 +0800
author: me
cover: https://ws1.sinaimg.cn/large/006jIRTely1g0kz9p2y8jj31hc0u0gs2.jpg
preview:  使用Mybatis的时候，快速debug可以使用Mybatis的SQL debug 功能，快速定位SQL语句。快速debug
tags:

  - MyBatis

---

![封面图](https://ws1.sinaimg.cn/large/006jIRTely1g0kz9p2y8jj31hc0u0gs2.jpg)

#  Mybatis(3)SQL语句控制台打印

## SpringMVC 配置

### 步骤

1. 找到对应的sping的mybatis的配置文件，引入mybatis-config.xml
2. 配置mybatis-config.xml

> 1.找到对应的sping的mybatis的配置文件，引入mybatis-config.xml

部分spring配置如下：

```xml
<!-- define the SqlSessionFactory -->
    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <property name="dataSource" ref="dataSource" />
        <!-- 在这里引入> mybatis-config.xml -->
        <property name="configLocation" value="classpath:mybatis-config.xml" />
        <property name="typeAliasesPackage" value="com.***.mapper" />
        <property name="mapperLocations">
            <list>
                <!--<value>classpath*:*.xml</value>-->
            </list>
        </property>
    </bean>
```

> 2.配置mybatis-config.xml

打开SQL打印的功能，配置文件全体如下，如果已有直接在响应的位置添加即可

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <settings>
        <!-- 打印sql日志 -->
        <setting name="logImpl" value="STDOUT_LOGGING" />
    </settings>
</configuration>
```



## SpringBoot 配置

### 步骤

1. 修改application.yml

```properties
mybatis:
    configuration:
      log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
```

## 参考文章

[BIGEC](https://blog.csdn.net/u012666996)

## [我的主页](https://suveng.github.io/blog/)