title: (1)joda-time使用教程
date: 2018-12-12 12:00:00 +0800
update: 2018-12-12 12:00:00 +0800
author: me
cover: https://ws1.sinaimg.cn/large/006jIRTegy1fyd7oyvhzuj31z4140tm1.jpg
preview:  Joda项目为Java平台提供了高质量的低级库。Joda-Time为Java日期和时间类提供了高质量的替代品
tags:

  - 第三方类库

---

![封面图](https://ws1.sinaimg.cn/large/006jIRTegy1fyd7oyvhzuj31z4140tm1.jpg)

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

* 创建DateTime

```java
//方法一：取系统点间  
DateTime dt1 = new DateTime();  
  
//方法二：通过java.util.Date对象生成  
DateTime dt2 = new DateTime(new Date());  
  
//方法三：指定年月日点分秒生成(参数依次是：年,月,日,时,分,秒,毫秒)  
DateTime dt3 = new DateTime(2012, 5, 20, 13, 14, 0, 0);  
  
//方法四：ISO8601形式生成  
DateTime dt4 = new DateTime("2012-05-20");  
DateTime dt5 = new DateTime("2012-05-20T13:14:00");  
  
//只需要年月日的时候  
LocalDate localDate = new LocalDate(2009, 9, 6);// September 6, 2009  
  
//只需要时分秒毫秒的时候  
LocalTime localTime = new LocalTime(13, 30, 26, 0);// 1:30:26PM 
```

* String转换为joda-time

```java
 @Test
    public void testStrToJodaDate(){
        DateTimeFormatter dateTimeFormatter =
            DateTimeFormat.forPattern(DATETIME_PATTERN);

        DateTime parse = 
            DateTime.parse("2018-12-11 17:06:30",
                           dateTimeFormatter);

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
        DateTimeFormatter dateTimeFormatter = 
            DateTimeFormat.forPattern(DATE_PATTERN);

        String str="2018-12-07";

        DateTime parse = DateTime.parse(str, 
          							dateTimeFormatter);

        Date date = parse.toDate();

        System.out.println(date);

    }
```

* joda 转 calendar

```java
@Test
    public void testJodaToCalendar(){
        DateTime dateTime = new DateTime(new Date());

        Calendar calendar =
            			dateTime.toCalendar(Locale.CHINA);
        System.out.println(calendar);
    }
```

* joda 转 str

```java
    @Test
    public void testJodaToStr(){
        DateTime dateTime = new DateTime();
        String string = dateTime.toString(TIME_PATTERN);
        String string2 = 
            dateTime.toString(TIME_PATTERN,Locale.CHINA);
        System.out.println(string+string2);
    }
```

* date 转 str

```java
    @Test
    public void testDateToStr(){
        Date date = new Date();
        SimpleDateFormat simpleDateFormat = 
            new SimpleDateFormat(DATETIME_PATTERN);
        String format = simpleDateFormat.format(date);
        System.out.println(format);
    }
```

* 获取年月日点分秒

```java
DateTime dt = new DateTime();  
//年  
int year = dt.getYear();  
//月  
int month = dt.getMonthOfYear();  
//日  
int day = dt.getDayOfMonth();  
//星期  
int week = dt.getDayOfWeek();  
//点  
int hour = dt.getHourOfDay();  
//分  
int min = dt.getMinuteOfHour();  
//秒  
int sec = dt.getSecondOfMinute();  
//毫秒  
int msec = dt.getMillisOfSecond();  
```

* 星期的处理

```java
DateTime dt = new DateTime();  
  
//星期  
switch(dt.getDayOfWeek()) {  
case DateTimeConstants.SUNDAY:  
    System.out.println("星期日");  
    break;  
case DateTimeConstants.MONDAY:  
    System.out.println("星期一");  
    break;  
case DateTimeConstants.TUESDAY:  
    System.out.println("星期二");  
    break;  
case DateTimeConstants.WEDNESDAY:  
    System.out.println("星期三");  
    break;  
case DateTimeConstants.THURSDAY:  
    System.out.println("星期四");  
    break;  
case DateTimeConstants.FRIDAY:  
    System.out.println("星期五");  
    break;  
case DateTimeConstants.SATURDAY:  
    System.out.println("星期六");  
    break;  
}  
```

* 日期前后推算

```java
DateTime dt = new DateTime();  
  
//昨天  
DateTime yesterday = dt.minusDays(1);         
//明天  
DateTime tomorrow = dt.plusDays(1);       
//1个月前  
DateTime before1month = dt.minusMonths(1);        
//3个月后  
DateTime after3month = dt.plusMonths(3);          
//2年前  
DateTime before2year = dt.minusYears(2);          
//5年后  
DateTime after5year = dt.plusYears(5);  

```

* 取特殊日期 

```java
DateTime dt = new DateTime();     
  
//月末日期    
DateTime lastday = dt.dayOfMonth().withMaximumValue();  
  
//90天后那周的周一  
DateTime firstday = dt.plusDays(90).dayOfWeek().withMinimumValue(); 

```

* 时区 

```java
//默认设置为日本时间  
DateTimeZone.setDefault(DateTimeZone.forID("Asia/Tokyo"));  
DateTime dt1 = new DateTime();  
  
//伦敦时间  
DateTime dt2 = new DateTime(DateTimeZone.forID("Europe/London"));  

```

* 日期比较 

```java
DateTime d1 = new DateTime("2012-02-01");  
DateTime d2 = new DateTime("2012-05-01");  
  
//和系统时间比  
boolean b1 = d1.isAfterNow();  
boolean b2 = d1.isBeforeNow();  
boolean b3 = d1.isEqualNow();  
  
//和其他日期比  
boolean f1 = d1.isAfter(d2);  
boolean f2 = d1.isBefore(d2);  
boolean f3 = d1.isEqual(d2);  

```

*  格式化输出

```java
DateTime dateTime = new DateTime();  
  
String s1 = dateTime.toString("yyyy/MM/dd hh:mm:ss.SSSa");  
String s2 = dateTime.toString("yyyy-MM-dd HH:mm:ss");  
String s3 = dateTime.toString("EEEE dd MMMM, yyyy HH:mm:ssa");  
String s4 = dateTime.toString("yyyy/MM/dd HH:mm ZZZZ");  
String s5 = dateTime.toString("yyyy/MM/dd HH:mm Z");  

```

## [我的主页](https://suveng.github.io/blog/)