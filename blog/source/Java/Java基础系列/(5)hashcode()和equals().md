title:  (5)hashcode()和equals()
date: 2014-01-02 13:00:00 +0800
update: 2014-01-02 13:00:00 +0800
author: me
cover: http://ww1.sinaimg.cn/large/006jIRTegy1g17bewj3nqj31kw11xk0o.jpg
preview:  你在用HashMap的时候，Key部分，有没有放过自定义对象？而这个时候，候选人说放过，自相矛盾。
tags:

  -  Java基础系列

---



[TOC]

![封面图]()

#  (5)hashcode()和equals()

 hashCode()和equals()方法的重要性体现在什么地方?

**通过hashCode和equals方法保证元素的唯一性，当重写equals方法时，必须重写hashCode方法，因为如果不重写这两个方法，当hashSet/hashMap的key为对象时就会默认使用Object的方法，一般是不相同的，所以就会导致存储了重复值**

下面的例子就是以对象作为key时的一个场景：

目的：Key对象是锁的钥匙，key.id就是key的密码，也是唯一标识key对象的值。锁只有一个，钥匙可以多条。只要具有相同的key.id即可获得锁的内容。



```java
public class WithoutHashCode {
    public static void main(String[] args) {
        //key 1
        Key k1 = new Key(1000);
        //key 2
        Key k2 = new Key(1000);
        //key 3
        Key k3 = new Key(1000);
        //锁内容存储
        HashMap<Key, String> hm = new HashMap<Key, String>();
        //存储key.id=1000的锁内容
        hm.put(k1, "suveng's lock");
        hm.put(k2, "suveng's lock");
        //尝试获取锁内容，输出null
        System.out.println(hm.get(k3));
        //查看内容，id一样，但是重复内容了。id一样但是获取不到内容了
        for (Key k : hm.keySet()){
            System.out.println(hm.get(k));
        }
    }
}
class Key {
    private Integer id;

    public Integer getId() {
        return id;
    }

    public Key(Integer id) {
        this.id = id;
    }
    //故意先注释掉equals和hashCode方法
    //  public boolean equals(Object o) {
    //      if (o == null || !(o instanceof Key))
    //      { return false; }
    //      else
    //      { return this.getId().equals(((Key) o).getId());}
    //  }

    //  public int hashCode()
    //  { return id.hashCode(); }
}
```



## [我的主页](https://suveng.github.io/blog/)



