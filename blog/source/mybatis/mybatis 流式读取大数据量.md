title: MyBatis 流式读取MySQL大量数据
date: 2018-12-19 12:00:00 +0800
update: 2018-12-19 12:00:00 +0800
author: me
cover: images/wallhaven-715203.jpg
tags:

  - MyBatis
preview:  JDBC三种读取方式：
1.一次全部（默认）：一次获取全部。
2.流式：多次获取，一次一行。
3.游标：多次获取，一次多行。
由于生成报表逻辑要从数据库读取大量数据并在内存中加工处理后再生成Excel返回给客户端。

---

#  MyBatis 流式读取MySQL大量数据

## 背景：

最近公司提了个需求，说公司的旧系统的报表导出的时候，数据量超过一万就导不出来了。经过分析，是旧系统做了限制。在更新的时候，查看了导出时虚拟机GC情况，发现原先程序执行时，内存激增，经过Google决定采用流式读取对sql进行优化。

> JDBC三种读取方式：
> 1.一次全部（默认）：一次获取全部。
> 2.流式：多次获取，一次一行。
> 3.游标：多次获取，一次多行。
>
> mybatis默认采取第一种。

## 开发环境：

jdk1.8 、intellij IDEA 2018

mybatis 3 、 springMVC 、Spring 4

## 实现步骤：

实现流式读取的方式不止一种，但是我只能说我解决的这种，对不起，我不是大神级的。

> 这里采用的 controller、service、dao分层开发

* 在service层调用dao接口是，增加一个回调参数ResultHandler<>。
* 对应的dao接口返回值为void
* mapper 填写 parameterType、resultMap、resultSetType="FORWARD_ONLY"、fetchSize="-2147483648"

> 为什么dao返回值为void还要在mapper写resultMap?因为回调要用你的resultMap处理，但是不应该返回给service，因为回调处理好了

## 示例代码

controller层：

```java
@RequestMapping("/export")
  public void export(Vo vo, String props,
      HttpServletResponse response) {

    //.......
      list = ossVipCustomService.selectForwardOnly(vo, Order.build());
    //......
  }
```

service层：(重点)

```java
public List<Bo> selectForwardOnly(Vo vo, Order order) {
     final List<Bo> list = new ArrayList<>();
    mapper.selectForwardOnly(vo, order, new ResultHandler<Bo>() {
      @Override
      public void handleResult(ResultContext<? extends Bo> resultContext) {
        /**回调处理逻辑 */
        list.add(resultContext.getResultObject());
      }
  });
    return list;
  }
```

dao层：(重点)

```java
  /**
   * 流式读取数据
   * @param vo 查询对象
   * @param order 排序
   * @param ossVipCustomerBoResultHandler 回调处理
   */
  void selectForwardOnly(@Param("record") Vo vo, @Param("order") Order order,
      ResultHandler<Bo> handler);
```

mapper:(重点)

```xml
<select id="selectForwardOnly"
  parameterType="com.*.Vo" resultMap="GetListBo"
    resultSetType="FORWARD_ONLY" fetchSize="-2147483648">
    SELECT
    *
    FROM
    customer
  </select>
```

> 个人原因：删除非关键部分代码。你肯定看的懂得。

## 心路历程

Google了好久的一个原因，就是因为dao接口不应该返回值的。还麻烦了老大过来看了一眼。

还有就是google出来的那些，要改框架配置的，我的确跟着改了，改了mysql连接参数，还有mybatis setting的配置。嗯，没用。