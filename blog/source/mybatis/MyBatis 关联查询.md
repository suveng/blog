title: MyBatis 关联查询
date: 2018-12-29 12:00:00 +0800
update: 2018-12-29 12:00:00 +0800
author: me
cover: http://ww1.sinaimg.cn/large/006jIRTely1fynzlv29doj31hc0u0wom.jpg
preview:  表与表之间存在着一对多或是多对多的对应关系。Mybatis中是如何实现这种多表关系的映射
tags:

  - MyBatis

---



![封面图](http://ww1.sinaimg.cn/large/006jIRTely1fynzlv29doj31hc0u0wom.jpg)

# MyBatis 关联查询（一对多 & 多对一）

## 1、一对多

举个例子：一个国家有很多人。一对多

### 1）表结构

```sql
-- 国家country
CREATE TABLE `country` (
  `cid` int(5) NOT NULL AUTO_INCREMENT,
  `cname` varchar(20) NOT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
```

```sql
-- 人people
CREATE TABLE `people` (
  `pid` int(5) NOT NULL AUTO_INCREMENT,
  `pname` varchar(20) NOT NULL,
  `countryId` int(5) NOT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
```

在数据库中，哪个表里面有外键，则就是多方

2）实体类

```java
//国家
public class Country {
	private Integer cid;
	private String cname;
	private Set<People> peoples;
	//省略get set属性方法
	@Override
	public String toString() {
		return "Country [cid=" + cid + ", cname=" + cname + ", peoples="
				+ peoples + "]";
	}
}
//人
public class People {
	private Integer pid;
	private String pname;
	private Integer countryId;
	//省略get set属性方法
	@Override
	public String toString() {
		return "People [pid=" + pid + ", pname=" + pname + ", countryId="
				+ countryId + "]";
	}
}
```

### 3）Dao接口

```java
public interface ICountryDao {
	Country selectById(int id);
	Country selectById2(int id);
}
```

### 4）mapper.xml文件

```html
	<!-- 方法1 多表连接查询方式 -->
	<resultMap type="Country" id="countryMapper">
		<id column="cid" property="cid"/>
		<result column="cname" property="cname"/>
		<collection property="peoples" ofType="People">
			<id column="pid" property="pid"/>
			<result column="pname" property="pname"/>
		</collection>
	</resultMap>
	<select id="selectById" resultMap="countryMapper">
		select cid,cname,pid,pname
		from country,people
		where cid=countryId and cid = #{xxx}
	</select>
	<!-- 方法2 多表单独查询方式 -->
	<select id="selectPeople" resultType="People">
		select pid,pname from people where countryId=#{ooo}
	</select>
	<resultMap type="Country" id="countryMapper2">
		<id column="cid" property="cid"/>
		<result column="cname" property="cname"/>
		<collection property="peoples" 
					ofType="People"
					select="selectPeople"
					column="cid" />		
	</resultMap>
 	<select id="selectById2" resultMap="countryMapper2">
		select cid,cname from country where cid = #{xxx}
	</select>
```

方式一是将多张表先进行连接，连为一张表后进行查询。其查询本质是一张表。也只有一个select

<collection />是集合的意思，即有多个对象。

property：指定关联属性，即Country类中的集合属性

ofType：集合属性的泛型类型

方式二是将主表的查询结果联合其他表的查询结果，封装成一个对象。主表的查询结果中的数据，作为其他表查询的条件。

这多个查询是可以跨越多个映射文件的，即可以跨越多个namespace的。使用时，添加上其所在的namespace即可

关联属性<collection />的数据来源于另一个查询selectPeople，该查询<selectPeople />的动态参数countryId=#{ooo}的值则来自于查询<selectById2 />的查询结果字段cid

### 5）测试输出  

```java
方式一：
[DEBUG] ==>  Preparing: select cid,cname,pid,pname from country,people where cid=countryId and cid = ? 
[DEBUG] ==> Parameters: 3(Integer)
[TRACE] <==    Columns: cid, cname, pid, pname
[TRACE] <==        Row: 3, 日本, 1, 新垣结衣
[TRACE] <==        Row: 3, 日本, 5, 松岛枫
[DEBUG] <==      Total: 2
Country [cid=3, cname=日本, peoples=[People [pid=5, pname=松岛枫, countryId=null], People [pid=1, pname=新垣结衣, countryId=null]]]
方式二
[DEBUG] ==>  Preparing: select cid,cname from country where cid = ? 
[DEBUG] ==> Parameters: 2(Integer)
[TRACE] <==    Columns: cid, cname
[TRACE] <==        Row: 2, 美国
[DEBUG] ====>  Preparing: select pid,pname from people where countryId=? 
[DEBUG] ====> Parameters: 2(Integer)
[TRACE] <====    Columns: pid, pname
[TRACE] <====        Row: 3, 安妮·海瑟薇
[DEBUG] <====      Total: 1
[DEBUG] <==      Total: 1
Country [cid=2, cname=美国, peoples=[People [pid=3, pname=安妮·海瑟薇, countryId=null]]]
```

## 2、多对一

反过来，多个人对一个国家。每个人只对一个国家。当然不考虑双重国籍的吵架问题。

由于查询多对象时，也是一个一个查的。所以：一对一关联查询的实现方式与多对一的实现方式是相同的。

1）实体类稍有变化：

```java
//国家
public class Country {
	private Integer cid;
	private String cname;
	//省略get set属性方法
	@Override
	public String toString() {
		return "Country [cid=" + cid + ", cname=" + cname + "]";
	}
}
//人
public class People {
	private Integer pid;
	private String pname;
	private Integer countryId;
	private Country country;
	//省略get set属性方法
	@Override
	public String toString() {
		return "People [pid=" + pid + ", pname=" + pname + ", countryId="
				+ countryId + ", country=" + country + "]";
	}
}
```

国家没有了Set<People>人成员变量，人有了国家成员变量

### 2）Dao接口

```java
public interface IPeopleDao {
	People selectById(int id);
	People selectById2(int id);
}
```

### 3）mapper.xml配置文件

```html
	<!-- 方法1 多表连接查询方式 -->
	<resultMap type="People" id="peopleMapper">
		<id column="pid" property="pid"/>
		<result column="pname" property="pname"/>
		<association property="country" javaType="Country">
			<id column="cid" property="cid"/>
			<result column="cname" property="cname"/>
		</association>
		<!-- 用集合的方式尽然可以，集合无非是一个国家的集合 -->
		<!-- 
		<collection property="country" ofType="Country">
			<id column="cid" property="cid"/>
			<result column="cname" property="cname"/>
		</collection>
		-->
	</resultMap>
	<select id="selectById" resultMap="peopleMapper">
		select pid,pname,cid,cname
		from people,country
		where pid = #{xxx} and countryId=cid
	</select>
	<!-- 方法2 多表单独查询方式 -->
	<select id="selectCountry" resultType="Country">
		select cid,cname from country where cid=#{ooo}
	</select>
	<resultMap type="People" id="peopleMapper2">
		<id column="pid" property="pid"/>
		<result column="pname" property="pname"/>
		<association property="country" 
					 javaType="Country"
					 select="selectCountry"
					 column="countryId" />
	</resultMap>
 	<select id="selectById2" resultMap="peopleMapper2">
		select pid,pname,countryId from people where pid = #{xxx}
	</select>
```

方式一<association />标签体现出2个实体对象之间的关联关系，一对一时用。

property：指定关联属性，即People类中的country属性

javaType：关联属性的类型

### 4）测试输出

```java
方式一：
[DEBUG] ==>  Preparing: select pid,pname,cid,cname from people,country where pid = ? and countryId=cid 
[DEBUG] ==> Parameters: 5(Integer)
[TRACE] <==    Columns: pid, pname, cid, cname
[TRACE] <==        Row: 5, 松岛枫, 3, 日本
[DEBUG] <==      Total: 1
People [pid=5, pname=松岛枫, countryId=null, country=Country [cid=3, cname=日本]]
方式二：
[DEBUG] ==>  Preparing: select pid,pname,countryId from people where pid = ? 
[DEBUG] ==> Parameters: 5(Integer)
[TRACE] <==    Columns: pid, pname, countryId
[TRACE] <==        Row: 5, 松岛枫, 3
[DEBUG] ====>  Preparing: select cid,cname from country where cid=? 
[DEBUG] ====> Parameters: 3(Integer)
[TRACE] <====    Columns: cid, cname
[TRACE] <====        Row: 3, 日本
[DEBUG] <====      Total: 1
[DEBUG] <==      Total: 1
People [pid=5, pname=松岛枫, countryId=null, country=Country [cid=3, cname=日本]]
```

备注：

Country类中可以不删除Set<People> peoples ; 成员变量。

People类中可以一直有Country country；成员变量。

去掉是为了便于理解一对多、多对一

 

**\*注***：collection配置多条件 

```java
column="{userId=user_id,theme=theme}"
```

 collection 查询别的xml 方法

```java
select="要调用namesapce.对应方法id"
```

## [我的主页](https://suveng.github.io/blog/) 