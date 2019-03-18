title:  (1)iframe自适应高度
date: 2015-01-03 13:00:00 +0800
update: 2015-01-03 13:00:00 +0800
author: me
cover: https://ws1.sinaimg.cn/large/006jIRTegy1g16uf9wqcdj31kw11xtil.jpg
preview:  [JS](http://caibaojian.com/javascript/)自适应高度，其实就是设置iframe的高度，使其等于内嵌网页的高度，从而看不出来滚动条和嵌套痕迹。
tags:

  -  web前端

---



[TOC]

![封面图](https://ws1.sinaimg.cn/large/006jIRTegy1g16uf9wqcdj31kw11xtil.jpg)

# (1)iframe自适应高度

```js
//更新iframe高度
function updateFrameHeight() {
    var iframe = window.parent.document.getElementById('iframeMain');

    if(iframe != null) {
        var viewHeight = $(window.top).height() - 54;
        var pageHeight = $(document.body).outerHeight(true);
        iframe.height = viewHeight > pageHeight ? viewHeight : pageHeight;
    }
}
```

## [我的主页](https://suveng.github.io/blog/)