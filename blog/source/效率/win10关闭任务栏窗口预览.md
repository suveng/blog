title: win10关闭任务栏窗口预览
date: 2018-12-21 12:00:00 +0800
update: 2018-12-21 12:00:00 +0800
author: me
cover: https://ws1.sinaimg.cn/large/006jIRTegy1fyebrct1o0j31kw0w07ig.jpg
preview:  Windows 10是美国微软公司研发的跨平台及设备应用的操作系统。是微软发布的最后一个独立Windows版本
tags:

  - 效率

---

[TOC]

![封面图](https://ws1.sinaimg.cn/large/006jIRTegy1fyebrct1o0j31kw0w07ig.jpg)

# win10关闭任务栏窗口预览

在Win10系统中，该如何将任务栏预览窗口关闭呢？

## 缘由

在windows 10系统中，当我们将某个程序窗口最小化后，鼠标从任务栏移过，就会弹出对应程序的预览窗口，对于大部分用户来说该功能还是不错的！对于像我这种强迫症，而且容易对开发造成影响，体验极差。

## 步骤

win10关闭任务栏窗口预览的操作方法：

1、在键盘上按下Win+R组合键打开运行，然后输入regedit  点击确定打开注册表编辑器；



2、在注册表左侧依次展开：

```
HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced ；
```



> 没有则新建

3、在右侧找到【ExtendedUIHoverTime】，将它的数值数据修改为9000；

4、接着我们回到左侧，依次定位到：

```xml
HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Taskband ；
```



> 没有则新建

5、在右侧新建个名为“NumThumbnails”的DWORD（32位）值，将数据数值修改为0 ；



6、设置完成后关闭注册表，按下【ctrl+shift+esc】打开任务管理器；



7、重启【Windows 资源管理器】 , 不会的直接重启系统吧

## 参考文章

[win10关闭任务栏窗口预览的操作方法！](http://www.w10zj.com/Win10xy/Win10yh_4500.html)

## [我的主页](https://suveng.github.io/blog/)