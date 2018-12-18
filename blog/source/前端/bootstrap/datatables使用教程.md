title: bootstrap-datatables使用教程
date: 2018-12-18 12:00:00 +0800
update: 2018-12-18 12:00:00 +0800
author: me
cover: http://pjxmrlmux.bkt.clouddn.com/wallhaven-715203.jpg
tags:

  - 前端
preview:  Datatables是一款jquery表格插件。它是一个高度灵活的工具，可以将任何HTML表格添加高级的交互功能。

---

#  bootstrap-datatables使用教程

## 介绍

Datatables是一款jquery表格插件。它是一个高度灵活的工具，可以将任何HTML表格添加高级的交互功能。

* 分页，即时搜索和排序
* 几乎支持任何数据源：DOM， javascript， Ajax 和 服务器处理
* 支持不同主题 DataTables, jQuery UI, Bootstrap, Foundation
* 各式各样的扩展: Editor, TableTools, FixedColumns ……
* 丰富多样的option和强大的API
* 支持国际化
* 超过2900+个单元测试
* 免费开源 （ [MIT license](http://datatables.net/license/mit) ）！[ 商业支持](http://datatables.net/support)
* 更多特性请到官网查看

## 安装配置

### 步骤

* 引入文件 css,jq,datatables
* 拿到table对象，执行初始化

### 示例代码

```html
<!--第一步：引入Javascript / CSS （CDN）-->
<!-- DataTables CSS -->
<link rel="stylesheet" type="text/css" href="http://cdn.datatables.net/1.10.15/css/jquery.dataTables.css">
 
<!-- jQuery -->
<script type="text/javascript" charset="utf8" src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
 
<!-- DataTables -->
<script type="text/javascript" charset="utf8" src="http://cdn.datatables.net/1.10.15/js/jquery.dataTables.js"></script>
 
 
<!--或者下载到本地，下面有下载地址-->
<!-- DataTables CSS -->
<link rel="stylesheet" type="text/css" href="DataTables-1.10.15/media/css/jquery.dataTables.css">
 
<!-- jQuery -->
<script type="text/javascript" charset="utf8" src="DataTables-1.10.15/media/js/jquery.js"></script>
 
<!-- DataTables -->
<script type="text/javascript" charset="utf8" src="DataTables-1.10.15/media/js/jquery.dataTables.js"></script>
 
 
 
 
<!--第二步：添加如下 HTML 代码-->
<table id="table_id_example" class="display">
    <thead>
        <tr>
            <th>Column 1</th>
            <th>Column 2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Row 1 Data 1</td>
            <td>Row 1 Data 2</td>
        </tr>
        <tr>
            <td>Row 2 Data 1</td>
            <td>Row 2 Data 2</td>
        </tr>
    </tbody>
</table>
 
 
 
<!--第三步：初始化Datatables-->
$(document).ready( function () {
    $('#table_id_example').DataTable();
} );
```

### 原理介绍

对table进行渲染，前提table的数据源得有，如上面的是HTML页面本来就有一定的数据了，所以可以直接调用函数进行渲染；

但是在大多数情况下，项目开发并不会采用这种做法，而是要结合服务端，采用ajax方式获取数据源。

做法有很多，可以ajax异步拿到数据后，进行dom操作，把数据填入table中，在进行`datatables.ajax.reload()`  这样当然可以，但是代码很乱，难看。

然而datatables支持我们开启服务端模式，通过配置一些选项即可做到。那么下面开始我们开发中比较好的用法。当然，你也可以通过自己去[官网去了解更多的使用技巧](http://datatables.club/manual/#install)。

上面的只是最简单的入门，还有更多自定义参数，自定义选型。

下面我们来看一下，在开发中最常用的一些用法。

## 简单使用

### 步骤

* 前端准备好静态的表格数据
* 引入datatables
* 在js中调用函数渲染

### 示例代码

#### 前端准备好静态的表格数据

```html
<html>
<#include "common/head.ftl">
<body>
<table id="t1">
  <thead>
  <tr>
    <th>编号</th>
    <th>姓名</th>
    <th>性别</th>
    <th>年龄</th>
    <th>生日</th>
    <th>操作</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>Row 1 Data 1</td>
    <td>Row 1 Data 2</td>
    <td>Row 1 Data 1</td>
    <td>Row 1 Data 2</td>
    <td>Row 1 Data 1</td>
    <td>Row 1 Data 2</td>
  </tr>
  <tr>
    <td>Row 2 Data 1</td>
    <td>Row 2 Data 2</td>
    <td>Row 1 Data 1</td>
    <td>Row 1 Data 2</td>
    <td>Row 1 Data 1</td>
    <td>Row 1 Data 2</td>
  </tr>
  </tbody>
</table>
</body>
</html>
<script src="/js/index.js"></script>
```

#### 引入datatables

> 我是在head.ftl 中公共部分引入的。并且是使用maven去管理webjars,具体代码请clone 我的GitHub上的代码查看，每一步都是有commit tag 可以查看的。

```html
<head>
  <link rel="stylesheet" href="/webjars/bootstrap/3.3.6/css/bootstrap.min.css"/>
  <link rel="stylesheet" type="text/css"
        href="/webjars/datatables/1.10.16/css/jquery.dataTables.css">
  <script src="/webjars/jquery/1.12.3/jquery.min.js"></script>
  <script src="/webjars/bootstrap/3.3.6/js/bootstrap.min.js"></script>
  <script type="text/javascript" charset="utf8"
          src="/webjars/datatables/1.10.16/js/jquery.dataTables.js"></script>
  <#--设置request变量-->
  <script>
    var ctx = "${request.contextPath}";
  </script>
</head>
```

#### 在js中调用函数渲染

```js
$("#t1").dataTable({});
```

### 效果截图

![datatables-简单使用效果截图](http://piezqhqs4.bkt.clouddn.com/datatables%E7%AE%80%E5%8D%95%E4%BD%BF%E7%94%A8.png-common)

## ajax异步带参数获取数据源，结合Java服务端模式

> 服务端采用springboot 的 ssm框架 + freemarkder视图（新手提示：类似jsp的东东）+pagehelper分页

#### 步骤

#### 前端的步骤

* 开启datatables的一些参数
* 配置ajax源
* 渲染

#### 后端接口的步骤

* 编写接口
* 编写mapper
* 返回json数据

> 注意：前后端一定要定义好数据格式，还有传输模式
>
> 这里我统一使用 JSON

#### 示例代码

##### 前端

html

```html

```

js

```js

```

#### springboot服务端

```java

```

#### 效果截图



## 参考文章

[官网的不定时讲一讲](http://datatables.club/blog/listall.html#%E4%B8%8D%E5%AE%9A%E6%97%B6%E4%B8%80%E8%AE%B2)

