title:  element(1)表格的后台排序
date: 2019-03-21 13:00:00 +0800
update: 2019-03-21 13:00:00 +0800
author: me
cover: http://ww1.sinaimg.cn/large/006jIRTegy1g17bewj3nqj31kw11xk0o.jpg
preview:  element-ui 的表格-用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。
tags:

  -  element-ui

---



[TOC]

![封面图]()

# element(1)表格的后台排序

ElementUi文档已经说了，如果需要后端排序，需将sortable设置为custom，同时在 Table 上监听sort-change事件，在事件回调中可以获取当前排序的字段名和排序顺序，从而向接口请求排序后的表格数据。

```vue
<el-table @sort-change='sortChange'>
       <el-table-column sortable='custom' prop="dateTime" label="时间">
       </el-table-column>
</el-table>
```

`sort-change` : 方法自带三个参数，分别代表意义是：

`column`：当前列

`prop`：当前列需要排序的数据

`order`：排序的规则（升序、降序和默认[默认就是没排序]）

```vue
sortChange: function(column, prop, order) {
    // console.log(column + '-' + column.prop + '-' + column.order)
},
```

column.order是可以经过点击排序按钮后拿到的，然后就可以发送column.order给后台，后台再根据什么排序来返回排序过后的数据。

## [我的主页](https://suveng.github.io/blog/)



