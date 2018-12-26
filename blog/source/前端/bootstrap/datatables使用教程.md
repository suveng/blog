title: bootstrap-datatables使用教程
date: 2018-12-18 12:00:00 +0800
update: 2018-12-20 15:00:00 +0800
author: me
cover: https://ws1.sinaimg.cn/large/006jIRTegy1fyd7q1vnfgj31z4140k2q.jpg
preview:  Datatables是一款jquery表格插件。它是一个高度灵活的工具，可以将任何HTML表格添加高级的交互功能。
tags:

  - 前端

---

![封面图](https://ws1.sinaimg.cn/large/006jIRTegy1fyd7q1vnfgj31z4140k2q.jpg)

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

> 本文代码仓库：[点击这里获取源码](https://gitee.com/suwenguang/demo/tree/datatables%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B)

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

![datatables-简单使用效果截图](https://ws1.sinaimg.cn/large/006jIRTegy1fyd7q1lo46j31hc07dmx6.jpg)

可以看到，这些默认都是英文的，那怎么办呢？其实我们可以自己定制这个语言选项。

## 设置language 选项

下面给出详细点的解释，这些是通常能用到的。但是很多时候，项目开发是不需要这么多的。

### 关键代码

> 对应仓库的`datatables使用教程` 分支的 `language选项详解`

```js
$("#t1").dataTable({
  language: {
    "decimal": "",//小数的小数位符号  比如“，”作为数字的小数位符号
    "emptyTable": "没有数据哟~~",//没有数据时要显示的字符串
    "info": "当前 _START_ 条到 _END_ 条 共 _TOTAL_ 条",//左下角的信息，变量可以自定义，到官网详细查看
    "infoEmpty": "无记录",//当没有数据时，左下角的信息
    "infoFiltered": "(从 _MAX_ 条记录过滤)",//当表格过滤的时候，将此字符串附加到主要信息
    "infoPostFix": "",//在摘要信息后继续追加的字符串
    "thousands": ",",//千分位分隔符
    "lengthMenu": "每页 _MENU_ 条记录",//用来描述分页长度选项的字符串
    "loadingRecords": "加载中...",//用来描述数据在加载中等待的提示字符串 - 当异步读取数据的时候显示
    "processing": "处理中...",//用来描述加载进度的字符串
    "search": "搜索",//用来描述搜索输入框的字符串
    "zeroRecords": "没有找到",//当没有搜索到结果时，显示
    "paginate": {
      "first": "首页",
      "previous": "上一页",
      "next": "下一页",
      "last": "尾页"
    }
  }

});
```

### 效果截图

![datatables的定制language效果图](https://ws1.sinaimg.cn/large/006jIRTegy1fyd7q1log4j31hc06o0sq.jpg)

可以看到，datatables是提供接口让我们自定义的，当然，相对应的官网也会提供接口文档。具体可以看[这里](http://datatables.club/reference/option/)

## 设置开发常用选项

那么我们开发也只是用到其中的一些。比较常用的，适应大部分普通后台管理的需求。

### 示例代码

> 具体查看代码仓库：`datatables使用教程`分支的 `常用选项`

index.js

```js
$("#t1").dataTable({
  language: {
    "decimal": "",//小数的小数位符号  比如“，”作为数字的小数位符号
    "emptyTable": "没有数据哟~~",//没有数据时要显示的字符串
    "info": "当前 _START_ 条到 _END_ 条 共 _TOTAL_ 条",//左下角的信息，变量可以自定义，到官网详细查看
    "infoEmpty": "无记录",//当没有数据时，左下角的信息
    "infoFiltered": "(从 _MAX_ 条记录过滤)",//当表格过滤的时候，将此字符串附加到主要信息
    "infoPostFix": "",//在摘要信息后继续追加的字符串
    "thousands": ",",//千分位分隔符
    "lengthMenu": "每页 _MENU_ 条记录",//用来描述分页长度选项的字符串
    "loadingRecords": "加载中...",//用来描述数据在加载中等待的提示字符串 - 当异步读取数据的时候显示
    "processing": "处理中...",//用来描述加载进度的字符串
    "search": "搜索",//用来描述搜索输入框的字符串
    "zeroRecords": "没有找到",//当没有搜索到结果时，显示
    "paginate": {
      "first": "首页",
      "previous": "上一页",
      "next": "下一页",
      "last": "尾页"
    }
  },
  processing: true,//是否显示处理状态(排序的时候，数据很多耗费时间长的话，也会显示这个)
  lengthChange: true,//是否允许用户改变表格每页显示的记录数
  orderMulti: true,  //启用多列排序
  ordering: true,//使用排序
  bStateSave: true,//记录cookie
  paging: true,//是否分页
  pagingType: "full_numbers",//除首页、上一页、下一页、末页四个按钮还有页数按钮
  searching: false,//是否开始本地搜索
  stateSave: false,//刷新时是否保存状态
  autoWidth: true,//自动计算宽度
  deferRender: true,//延迟渲染
});
```

扯了那么多，只是定义一个大概雏形，接下来才是重头戏

## ajax异步带参数获取数据源，结合Java服务端模式

> 服务端采用springboot 的 ssm框架 + freemarkder视图（新手提示：类似jsp的东东）+pagehelper分页

#### 步骤

##### 前端的步骤

* 开启datatables的一些参数，serverSide: true
* 配置ajax源，即后端接口url
* 渲染，调用函数 `datatables.ajax.reload()`

##### 后端接口的步骤

* 编写接口
* 编写mapper
* 返回json数据

> 注意：前后端一定要定义好数据格式，还有传输模式
>
> 这里我统一使用 JSON

#### 示例代码

##### 前端

freemarker 

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
  </tr>
  </thead>
  <tbody>
  </tbody>
</table>
</body>
</html>
<#include "common/footer.ftl">
<script src="/js/index.js"></script>
```

> 这里我使用的静态模板引擎 freemarker

html只要表头，其他样式都不要了，懒！

js

```js
$("#t1").dataTable({
  language: {
    "decimal": "",//小数的小数位符号  比如“，”作为数字的小数位符号
    "emptyTable": "没有数据哟~~",//没有数据时要显示的字符串
    "info": "当前 _START_ 条到 _END_ 条 共 _TOTAL_ 条",//左下角的信息，变量可以自定义，到官网详细查看
    "infoEmpty": "无记录",//当没有数据时，左下角的信息
    "infoFiltered": "(从 _MAX_ 条记录过滤)",//当表格过滤的时候，将此字符串附加到主要信息
    "infoPostFix": "",//在摘要信息后继续追加的字符串
    "thousands": ",",//千分位分隔符
    "lengthMenu": "每页 _MENU_ 条记录",//用来描述分页长度选项的字符串
    "loadingRecords": "加载中...",//用来描述数据在加载中等待的提示字符串 - 当异步读取数据的时候显示
    "processing": "处理中...",//用来描述加载进度的字符串
    "search": "搜索",//用来描述搜索输入框的字符串
    "zeroRecords": "没有找到",//当没有搜索到结果时，显示
    "paginate": {
      "first": "首页",
      "previous": "上一页",
      "next": "下一页",
      "last": "尾页"
    }
  },
  processing: true,//是否显示处理状态(排序的时候，数据很多耗费时间长的话，也会显示这个)
  lengthChange: true,//是否允许用户改变表格每页显示的记录数
  orderMulti: true,  //启用多列排序
  ordering: true,//使用排序
  bStateSave: true,//记录cookie
  paging: true,//是否分页
  pagingType: "full_numbers",//除首页、上一·页、下一页、末页四个按钮还有页数按钮
  searching: false,//是否开始本地搜索
  stateSave: false,//刷新时是否保存状态
  autoWidth: true,//自动计算宽度
  deferRender: true,//延迟渲染
  serverSide: true,//开启服务器模式
  //获取数据
  ajax: {
    "url": ctx + "/getList",
    "type": 'POST',
    //绑定额外参数
    "data": function (d) {
      return $.extend({}, d,
          {
            "id":$("#user_id").val()
          });
    }
  },
  //设置数据
  columns: [
    {data: "userId", defaltContent:"空"},
    {data: "name", defaultContent:"空"},
    {data: "sex", defaultContent: "未知性别"},
    {data: "age", defaultContent: 0},
    {data: "birth", defaultContent: "未知",render:function (date) { return moment(date).format("yyyy-mm-dd hh:mm:ss") }}
  ]

});
```

主要：开启服务器模式；开启ajax获取数据；设置数据；

> 这里还用到了render函数，做数据处理，如果会js的同学应该一下就懂了，不懂就把它当成回调函数。



#### springboot服务端

##### controller层

DatatableController.java

```java
@Controller
public class DatatablesController {
    private final UserService userService;

    @Autowired
    public DatatablesController(UserService userService) {
        this.userService = userService;
    }

    /**
     * 返回视图
     * @return view
     */
    @RequestMapping("/index")
    public String index(){
        return "index";
    }

    /**
     * 获取全部数据
     * @return list
     */
    @RequestMapping("/getList")
    @ResponseBody
    public DataTable getList(User user,Order order, Integer start,Integer length, Integer draw){
        PageInfo pageInfo = userService.selectByPageNumSize(user, start, length);
        List<User> users =  pageInfo.getList();
        long total = pageInfo.getTotal();
        return DataTableBulid.build(draw, (int) total,users);
    }

    /**
     * 手动插入1000
     * @return string
     */
    @RequestMapping("/insert")
    @ResponseBody
    public String insert(){
        for (int i = 0; i < 1000; i++) {
            String s = RandomStringUtils.randomAscii(8);
                    User user = new User();
                    user.setName(s);
                    user.setAge(RandomUtils.nextInt(1, 1000));
                    user.setBirth(new Date());
                    user.setSex(RandomStringUtils.randomAscii(1));
                    userService.save(user);
        }
        return "success";
    }
}

```

> 当你开启服务器模式serverside，datatables会主动提交一些参数过来，具体查看官网http://datatables.club/manual/server-side.html，下面贴出一些官网的内容.

> 返回给datatables的数据也有点讲究，这里我是按照官网的说明，封装一个datatable的类。详细说明看官网http://datatables.club/manual/server-side.html

DT自动请求的参数(Sent parameters)
当开启了 服务器模式时，DataTables 会发送如下参数到服务器

* draw：绘制计数器。这个是用来确保Ajax从服务器返回的是对应的（Ajax是异步的，因此返回的顺序是不确定的）。 要求在服务器接收到此参数后再返回（具体看 [下面](http://datatables.club/manual/server-side.html#returndata)）
* start：第一条数据的起始位置，比如0代表第一条数据
* length：告诉服务器每页显示的条数，这个数字会等于返回的 `data`集合的记录数，可能会大于因为服务器可能没有那么多数据。这个也可能是-1，代表需要返回全部数据(尽管这个和服务器处理的理念有点违背)

服务器需要返回的数据(Returned data)
一旦 DataTables 发送了请求，上面的参数就会传送给服务器，那么你需要接受到这些参数并做相应的逻辑处理然后按照下面的格式讲组装好的JSON数据返回 （不是每个参数都需要接受处理，根据自己的业务需要）

* draw：**必要**。上面提到了，Datatables发送的draw是多少那么服务器就返回多少。 这里注意，作者出于安全的考虑，强烈要求把这个转换为整形，即数字后再返回，而不是纯粹的接受然后返回，这是 为了防止跨站脚本（XSS）攻击。
* recordsTotal: **必要**。即没有过滤的记录数（数据库里总共记录数）
* recordsFiltered: **必要**。过滤后的记录数（如果有接收到前台的过滤条件，则返回的是过滤后的记录数）
* data：**必要**。表中中需要显示的数据。这是一个对象数组，也可以只是数组，区别在于 纯数组前台就不需要用 `columns`绑定数据，会自动按照顺序去显示 ，而对象数组则需要使用 `columns`绑定数据才能正常显示。 注意这个 `data`的名称可以由 [`ajaxOption`](http://datatables.club/reference/option/ajax.html)[`ajax不定时一讲` ](http://datatables.club/manual/daily/2016/04/18/option-ajax.html)的 [`ajax.dataSrcOption` ](http://datatables.club/reference/option/ajax.dataSrc.html)[`ajax.dataSrc 1不定时一讲`](http://datatables.club/manual/daily/2016/04/19/option-ajax-dataSrc1.html)[`ajax.dataSrc 2不定时一讲` ](http://datatables.club/manual/daily/2016/04/20/option-ajax-dataSrc2.html)控制
* error：**可选**。你可以定义一个错误来描述服务器出了问题后的友好提示

##### service层

UserServiceImpl.java

> 这里我使用的tk.mybatis做通用service和通用mapper。
>
> 把datatables传过来的参数start 和 length 作为pagehelper的offset 和 pageSize.

```java
@Service
public class UserServiceImpl extends BaseService<User> implements UserService {

  @Resource
  UserMapper userMapper;
  @Override
  public PageInfo selectByPageNumSize(User user, int pageNum, int pageSize) {
    PageHelper.offsetPage(pageNum, pageSize);
    List<User> users = userMapper.selectByPageNumSize(user);
    return new PageInfo<>(users);
  }
}
```

##### dao层

UserMapper.java

```java
public interface UserMapper extends MyMapper<User> {

  /**
   * @param user
   * @return
   */
  List<User> selectByPageNumSize(
      @Param("user") User user);
}
```

UserMapper.xml

```xml
<select id="selectByPageNumSize" resultType="my.suveng.demo.model.domain.User">
select * from sys_user
</select>
```

##### 数据库文件

```mssql
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sex` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `age` int(11) NULL DEFAULT NULL,
  `birth` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11001 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

SET FOREIGN_KEY_CHECKS = 1;
```

> 测试数据的话，我已经写了一个接口放在controller那里了。
>
> 具体查看代码仓库：`datatables使用教程`分支的 `ajax异步带参数获取数据源 `

#### 效果截图

![ajax异步带参数获取数据](https://ws1.sinaimg.cn/large/006jIRTegy1fyd7zslhudj31hc0dzdga.jpg)

分页和数据展示都做好了，那么现在就来做一个搜索条件吧，项目来讲，搜索这个功能是必不可少的。

## 搜索条件，整合服务端，利用mybatis动态sql

### 步骤

#### 前端步骤：

* 添加搜索条件输入框和搜索框
* 获取搜索条件输入
* 添加datatables的额外参数，传给服务端接口

#### 服务端步骤：

* 编写controller接口，接收搜索参数，处理完，返回datatables对象（自己封装的）
* 编写service业务逻辑，处理数据，返回给controller
* 编写dao，自定义sql 筛选数据，返回给service

### 示例代码

#### 前端

index.ftl

添加搜索条件输入框和搜索框

```html
<html>
<#include "common/head.ftl">
<body>
<form>
  <input type="text" id="sch_userId" placeholder="请输入userID...">
  <input type="button" id="doQuery" value="搜索">
  <input type="reset" value="重置">
</form>
<table id="t1">
  <thead>
  <tr>
    <th>编号</th>
    <th>姓名</th>
    <th>性别</th>
    <th>年龄</th>
    <th>生日</th>
  </tr>
  </thead>
  <tbody>
  </tbody>
</table>
</body>
</html>
<#include "common/footer.ftl">
<script src="/js/index.js"></script>
```

添加datatables的额外参数，传给服务端接口

index.js

```js
$(function () {
  $("#doQuery").click(doQuery);
});
var doQuery=function (){
  datatables.api().ajax.reload();
};

var datatables = $("#t1").dataTable({
  language: {
    "decimal": "",//小数的小数位符号  比如“，”作为数字的小数位符号
    "emptyTable": "没有数据哟~~",//没有数据时要显示的字符串
    "info": "当前 _START_ 条到 _END_ 条 共 _TOTAL_ 条",//左下角的信息，变量可以自定义，到官网详细查看
    "infoEmpty": "无记录",//当没有数据时，左下角的信息
    "infoFiltered": "(从 _MAX_ 条记录过滤)",//当表格过滤的时候，将此字符串附加到主要信息
    "infoPostFix": "",//在摘要信息后继续追加的字符串
    "thousands": ",",//千分位分隔符
    "lengthMenu": "每页 _MENU_ 条记录",//用来描述分页长度选项的字符串
    "loadingRecords": "加载中...",//用来描述数据在加载中等待的提示字符串 - 当异步读取数据的时候显示
    "processing": "处理中...",//用来描述加载进度的字符串
    "search": "搜索",//用来描述搜索输入框的字符串
    "zeroRecords": "没有找到",//当没有搜索到结果时，显示
    "paginate": {
      "first": "首页",
      "previous": "上一页",
      "next": "下一页",
      "last": "尾页"
    }
  },
  processing: true,//是否显示处理状态(排序的时候，数据很多耗费时间长的话，也会显示这个)
  lengthChange: true,//是否允许用户改变表格每页显示的记录数
  orderMulti: true,  //启用多列排序
  ordering: true,//使用排序
  bStateSave: true,//记录cookie
  paging: true,//是否分页
  pagingType: "full_numbers",//除首页、上一·页、下一页、末页四个按钮还有页数按钮
  searching: false,//是否开始本地搜索
  stateSave: false,//刷新时是否保存状态
  autoWidth: true,//自动计算宽度
  deferRender: true,//延迟渲染
  serverSide: true,//开启服务器模式
  //获取数据
  ajax: {
    "url": ctx + "/getList",
    "type": 'POST',
    //绑定额外参数
    "data": function (d) {
      return $.extend({}, d,
          {
            "userId":$("#sch_userId").val()
          });
    }
  },
  //设置数据
  columns: [
    {data: "userId", defaltContent:"空"},
    {data: "name", defaultContent:"空"},
    {data: "sex", defaultContent: "未知性别"},
    {data: "age", defaultContent: 0},
    {data: "birth", defaultContent: "未知",render:function (date) { return moment(date).format("yyyy-mm-dd hh:mm:ss") }}
  ]

});
```

#### 服务端

controller层接收参数

> 还是原来的代码，只不过这次前端是会有值传过来了。这个值我一般会封装到vo对象里面，这里我封装到user里面

```java
@RequestMapping("/getList")
  @ResponseBody
  public DataTable getList(User user, Order order, Integer start, Integer length, Integer draw) {
    PageInfo pageInfo = userService.selectByPageNumSize(user, start, length);
    List<User> users = pageInfo.getList();
    long total = pageInfo.getTotal();
    return DataTableBulid.build(draw, (int) total, users);
  }
```

dao层：编写筛选条件的动态sql

UserMapper.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="my.suveng.demo.dao.mysql.UserMapper">
  <resultMap id="BaseResultMap" type="my.suveng.demo.model.domain.User">
    <!--
      WARNING - @mbg.generated
    -->
    <id column="user_id" jdbcType="BIGINT" property="userId" />
    <result column="name" jdbcType="VARCHAR" property="name" />
    <result column="sex" jdbcType="VARCHAR" property="sex" />
    <result column="age" jdbcType="INTEGER" property="age" />
    <result column="birth" jdbcType="TIMESTAMP" property="birth" />
  </resultMap>
  <sql id="search_condition">
    where 1=1
    <if test="record.userId !=null">
      and u.user_id = #{record.userId,jdbcType=BIGINT}
    </if>
  </sql>
  <select id="selectByPageNumSize" resultMap="BaseResultMap">
    select * from sys_user u
    <include refid="search_condition"/>
  </select>

</mapper>
```

> 具体查看代码仓库：`datatables使用教程`分支的 `搜索条件`

### 效果截图

![搜索条件](https://ws1.sinaimg.cn/large/006jIRTegy1fyd9m5j7b0j30mc064aa1.jpg)

## 参考文章

[官网的不定时讲一讲](http://datatables.club/blog/listall.html#%E4%B8%8D%E5%AE%9A%E6%97%B6%E4%B8%80%E8%AE%B2)

