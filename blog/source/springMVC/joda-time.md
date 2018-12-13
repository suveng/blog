title: joda-time
date: 2018-12-12 12:00:00 +0800
update: 2018-12-12 12:00:00 +0800
author: suveng
cover: images/wallhaven-714079.jpg
tags:

  - springMVC
preview:  Joda项目为Java平台提供了高质量的低级库。Joda-Time为Java日期和时间类提供了高质量的替代品

---

#  joda-time使用教程

## 介绍

> The Joda project provides quality low-level libraries for the Java platform.
> Joda项目为Java平台提供了高质量的低级库。https://www.joda.org/
> Joda-Time为Java日期和时间类提供了高质量的替代品。Joda-Time是Java SE 8之前Java的事实上*标准日期和时间库。现在要求用户迁移到`java.time`（JSR-310）。Joda-Time根据业务友好Apache 2.0许可证（https//www.joda.org/joda-time/licenses.html）获得许可。https://www.joda.org/joda-time/
> [官方文档-快速开始](https://www.joda.org/joda-time/quickstart.html)

## 类总览

* LocalDate  - 没有时间的日期
* LocalTime  - 没有日期的时间
* Instant - 时间线上的瞬时点
* DateTime  - 带时区的完整日期和时间
* DateTimeZone  - 一个更好的时区
* Duration  - 时间量
  Interval - 两个瞬间之间的时间

## 环境

IntelliJ IDEA 2018.2.7 (Ultimate Edition)
JRE: 1.8.0_152-release-1248-b22 amd64
JVM: OpenJDK 64-Bit Server VM by JetBrains s.r.o
Windows 10 10.0

## 配置

使用maven导包

**注意**：jdk版本问题，这里选用依赖jdk1.5的版本，即2.3版，jdk1.8选用更高版本吧，因为jdk1.8的java.time 里面的api估摸着够用了。

```xml
<dependency>
    <groupId>joda-time</groupId>
    <artifactId>joda-time</artifactId>
    <version>2.4</version>
</dependency>
```

## 简单使用

* String转换为joda-time

```java
 @Test
    public void testStrToJodaDate(){
        DateTimeFormatter dateTimeFormatter = DateTimeFormat.forPattern(DATETIME_PATTERN);

        DateTime parse = DateTime.parse("2018-12-11 17:06:30", dateTimeFormatter);

        System.out.println(parse);
    }
```

* date 转 joda-time

```java
@Test
    public void testDateToJodaDate(){
        Date date = new Date();

        DateTime dateTime = new DateTime(date);

        System.out.println(dateTime);

    }
```

* calendar 转 joda-time

```java
@Test
    public void testCalendarToJodaDate(){
        Calendar instance = Calendar.getInstance();

        DateTime dateTime = new DateTime(instance);

        System.out.println(dateTime);
    }
```

* string 转 date

```java
@Test
    public void testStrToDate(){
        DateTimeFormatter dateTimeFormatter = DateTimeFormat.forPattern(DATE_PATTERN);

        String str="2018-12-07";

        DateTime parse = DateTime.parse(str, dateTimeFormatter);

        Date date = parse.toDate();

        System.out.println(date);

    }
```

* joda 转 calendar

```java
@Test
    public void testJodaToCalendar(){
        DateTime dateTime = new DateTime(new Date());

        Calendar calendar = dateTime.toCalendar(Locale.CHINA);
        System.out.println(calendar);
    }
```

* joda 转 str

```java
    @Test
    public void testJodaToStr(){
        DateTime dateTime = new DateTime();
        String string = dateTime.toString(TIME_PATTERN);
        String string2 = dateTime.toString(TIME_PATTERN,Locale.CHINA);
        System.out.println(string+string2);
    }
```

* date 转 str

```java
    @Test
    public void testDateToStr(){
        Date date = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(DATETIME_PATTERN);
        String format = simpleDateFormat.format(date);
        System.out.println(format);
    }
```