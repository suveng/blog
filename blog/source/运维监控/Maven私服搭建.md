title: Maven私服
date: 2019-09-14 11:00:00 +0800
update: 2019-09-14 11:00:00 +0800
author: me
cover: images/wallhaven-714079.jpg
tags:

  -  运维监控

---

# Maven私服

## 环境

centos7

Docker version 18.06.3-ce, build d7080c1

[sonatype/nexus3:3.18.1](https://hub.docker.com/r/sonatype/nexus3/)

## 搭建方式

- 二进制包搭建
- docker搭建

## docker搭建

- `docker pull sonatype/nexus3:3.18.1`

- `mkdir -p /docker/nexus-data && chown -R 200 /docker/nexus-data`
  创建挂在数据的目录.

- `docker run -d --restart=always --name nexus -p 8081:8081 -v /docker/nexus-data:/nexus-data sonatype/nexus3:3.18.1 `
  `-d` 后台运行

  `--restart=always` 开机启动

  `--name` docker的container的名字

  `-v` 挂载本地文件系统路径

  `-p` 挂载端口

- 查看默认账号密码
  查看`cat /docker/nexus-data/admin.password`

- 登录

  ![image-20190914165029614](https://imgconvert.csdnimg.cn/aHR0cHM6Ly90dmExLnNpbmFpbWcuY24vbGFyZ2UvMDA2eThtTjZneTFnNno1OGkzd2I0ajMxaGIwcHE3N2ouanBn?x-oss-process=image/format,png)

- 改密码 `admin/admin`
  ![image-20190914165153704](https://imgconvert.csdnimg.cn/aHR0cHM6Ly90dmExLnNpbmFpbWcuY24vbGFyZ2UvMDA2eThtTjZneTFnNno1OXg0bnBkajMxaDMwcHh0YzguanBn?x-oss-process=image/format,png)

  ![image-20190914165213522](https://imgconvert.csdnimg.cn/aHR0cHM6Ly90dmExLnNpbmFpbWcuY24vbGFyZ2UvMDA2eThtTjZneTFnNno1YTlmcmloajMwOHcwNzdxM2EuanBn?x-oss-process=image/format,png)

  

## 配置

- 中央仓库代理配置
  ![image-20190914165635906](https://imgconvert.csdnimg.cn/aHR0cHM6Ly90dmExLnNpbmFpbWcuY24vbGFyZ2UvMDA2eThtTjZneTFnNno1ZXQ4c3A3ajMxaGIwcHV0ZHUuanBn?x-oss-process=image/format,png)

  ![image-20190914165754825](https://imgconvert.csdnimg.cn/aHR0cHM6Ly90dmExLnNpbmFpbWcuY24vbGFyZ2UvMDA2eThtTjZneTFnNno1ZzZmcTFnajMxaGIwbzE0MnYuanBn?x-oss-process=image/format,png)

- 新建自定义的仓库
  ![image-20190914170041549](https://imgconvert.csdnimg.cn/aHR0cHM6Ly90dmExLnNpbmFpbWcuY24vbGFyZ2UvMDA2eThtTjZneTFnNno1ajJxZXg3ajMxaGIwbzJqdzIuanBn?x-oss-process=image/format,png)
  ![image-20190914170245839](https://imgconvert.csdnimg.cn/aHR0cHM6Ly90dmExLnNpbmFpbWcuY24vbGFyZ2UvMDA2eThtTjZneTFnNno1bDg0b203ajMxaGIwbzNncHcuanBn?x-oss-process=image/format,png)

  ![image-20190914170600212](https://imgconvert.csdnimg.cn/aHR0cHM6Ly90dmExLnNpbmFpbWcuY24vbGFyZ2UvMDA2eThtTjZneTFnNno1b2xleW43ajMxYXEwY2JhYzYuanBn?x-oss-process=image/format,png)

## 使用

- 对本地 Maven 配置文件 setting.xml 进行配置

  - 设置 server 账户信息每个server元素配置指定的仓库ID和用户信息

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">
    
      <localRepository>${user.home}/.m2/repository</localRepository>
    
      <servers>
            <server>
                <id>private-release</id>
                <username>admin</username>
                <password>admin</password>
            </server>
            <server>
                <id>private-snapshot</id>
                <username>admin</username>
                <password>admin</password>
            </server>
        </servers>
    
        <profiles>
            <profile>
                <id>dev</id>
                <repositories>
                    <repository>
                        <id>private-release</id>
                        <url>http://192.168.9.233:8081/repository/private-release/</url>                 
                    </repository>
                    <repository>
                        <id>private-snapshot</id>
                        <url>http://192.168.9.233:8081/repository/private-snapshot/</url>
                    </repository>
                </repositories>
            </profile>
        </profiles>
    
        <activeProfiles>
            <activeProfile>dev</activeProfile>
        </activeProfiles>
    
    </settings>
    ```

    

- pom.xml配置

  ```xml
  <distributionManagement>
    <repository>
      <id>private-release</id>
      <url>http://192.168.9.233:8081/repository/private-release/</url>
    </repository>
    <snapshotRepository>
      <id>private-snapshot</id>
      <url>http://192.168.9.233:8081/repository/private-snapshot/</url>
    </snapshotRepository>
  </distributionManagement>
  
  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <configuration>
          <source>8</source>
          <target>8</target>
        </configuration>
      </plugin>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-source-plugin</artifactId>
        <version>3.0.0</version>
        <executions>
          <execution>
            <id>attach-sources</id>
            <goals>
              <goal>jar</goal>
            </goals>
          </execution>
        </executions>
      </plugin>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-javadoc-plugin</artifactId>
        <version>3.0.0</version>
        <executions>
          <execution>
            <id>attach-javadocs</id>
            <goals>
              <goal>jar</goal>
            </goals>
          </execution>
        </executions>
      </plugin>
    </plugins>
  </build>
  ```

- 在对应项目执行`mvn deploy`
  这样即可将对应jar包deploy到private-release的私服库中,如下图
  ![image-20190914174045560](https://imgconvert.csdnimg.cn/aHR0cHM6Ly90dmExLnNpbmFpbWcuY24vbGFyZ2UvMDA2eThtTjZneTFnNno2b3I5eDRxajMxaGIwbzN3Z24uanBn?x-oss-process=image/format,png)

## 备份

只要将挂在的 `/docker/nexus-data` 里面的数据备份即可

## 还原

将备份的 `/data/nexus-data` 数据挂载到 `nexus` 镜像即可,注意版本的镜像环境变量

可以通过 `docker inspect image` 即可查到对应镜像的环境参数

## 资料

https://mp.weixin.qq.com/s/VAAuIF_1JeRa-lmoU481Zg


