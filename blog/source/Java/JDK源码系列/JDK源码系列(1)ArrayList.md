title:  JDK源码系列(1)ArrayList
date: 2015-01-02 13:00:00 +0800
update: 2015-01-02 13:00:00 +0800
author: me
cover: http://ww1.sinaimg.cn/large/006jIRTegy1g11jh56ishj31z41404qp.jpg
preview:  ArrayList 是动态数组，它是线程不安全的，允许元素为null，底层数据结构依然是数组，拥有随机快速访问的能力
tags:

  -  JDK源码系列

---



[TOC]

![封面图]()

# JDK源码系列(1)ArrayList

## 概要

### ArrayList总结

1. **底层数组实现，使用默认构造方法初始化出来的容量是10**
2. **扩容的长度是在原长度基础上加二分之一**
3. **实现了RandomAccess接口，底层又是数组，get读取元素性能很好**
4. **线程不安全，所有的方法均不是同步方法也没有加锁，因此多线程下慎用**
5. **顺序添加很方便**
6. **删除和插入需要复制数组 性能很差（可以使用LinkindList）**

| 关注点             | 结论       |
| ------------------ | ---------- |
| 是否允许空？       | 允许       |
| 是否允许重复数据？ | 允许       |
| 是否有序？         | 有序       |
| 是否线程安全？     | 非线程安全 |

概括的说，ArrayList 是一个动态数组，它是线程不安全的，允许元素为null。 
其底层数据结构依然是数组，它实现了`List<E>, RandomAccess, Cloneable, java.io.Serializable`接口，其中RandomAccess代表了其拥有随机快速访问的能力，ArrayList可以以O(1)的时间复杂度去根据下标访问元素。

因其底层数据结构是数组，所以可想而知，它是**占据一块连续的内存空间**（容量就是数组的length），所以它也有数组的缺点，**空间效率不高**。

由于数组的内存连续，可以根据下标以**O1**的**时间读写(改查)**元素，因此**时间效率很高**。

当集合中的元素超出这个容量，便会进行扩容操作。扩容操作也是ArrayList 的一个性能消耗比较大的地方，所以若我们可以**提前预知数据的规模**，应该通过public ArrayList(int initialCapacity) {}构造方法，指定集合的大小，去构建ArrayList实例，**以减少扩容次数，提高效率**。

或者在需要扩容的时候，手动调用`public void ensureCapacity(int minCapacity) {}`方法扩容。 
不过该方法是ArrayList的API，不是List接口里的，所以使用时需要强转: 
`((ArrayList)list).ensureCapacity(30);`

当每次修改结构时，增加导致扩容，或者删，都会修改`modCount`。

### 为什么ArrayList的elementData是用transient修饰的？

transient修饰的属性意味着不会被序列化，也就是说在序列化ArrayList的时候，不序列化elementData。

为什么要这么做呢？

1. elementData不总是满的，每次都序列化，会浪费时间和空间
2. 重写了writeObject 保证序列化的时候虽然不序列化全部 但是有的元素都序列化

所以说不是不序列化 而是不全部序列化。、

### ArrayList和Vector的区别

#### 标准答案

1. ArrayList是线程不安全的，Vector是线程安全的
2. 扩容时候ArrayList扩0.5倍，Vector扩1倍

#### ArrayList有没有办法线程安全？

Collections工具类有一个synchronizedList方法

可以把list变为线程安全的集合，但是意义不大，因为可以使用Vector

#### Vector为什么是线程安全的？

就代码实现上来说，和ArrayList并没有很多逻辑上的区别，但是在Vector的关键方法都使用了synchronized修饰。

> ## 1. 继承的父类和实现的接口

```java
public class ArrayList<E> extends AbstractList<E>
        implements List<E>, RandomAccess, Cloneable, java.io.Serializable
```

ArrayList 继承了 AbstractList 类，此类提供了 List 接口的骨干实现，继承此类的子类适合用于“随机访问”数据存储（如数组），Vector 也是此类的子类。

与 AbstractList 类对应的类是 AbstractSequentialList 类，继承该类的子类适合用于“连续访问”数据存储（如链接列表），代表的子类如 LinkedList 。

ArrayList 实现了 List 接口，List 接口通常表示一个列表（数组、队列、链表、栈等），其中的元素可以重复，代表的实现类有 ArrayList、LinkedList、Stack、Vector。

ArrayList 实现了 RandomAccess 接口，该接口为标记接口，用来表明其支持快速随机访问。

ArrayList 实现了 Cloneable 接口，以指示 Object.clone() 方法可以合法地对该类实例进行按字段复制。

ArrayList 实现了 Serializable 接口，因此它支持序列化，能够通过序列化传输。

> ## 2. 属性

```java
/**
 * 序列版本号
 */
private static final long serialVersionUID = 8683452581122892189L;

/**
 * 默认容量
 */
private static final int DEFAULT_CAPACITY = 10;

/**
 * 无参的空数组常量
 */
private static final Object[] EMPTY_ELEMENTDATA = {};

/**
 * 有参的空数组
 */
private static final Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA = {};

/**
 * 存放元素的数组，从这可以发现ArrayList的底层实现就是一个Object数组
 */
transient Object[] elementData; 

/**
 * 当前的实际元素个数
 */
private int size;
```

> ## 3 构造方法

```java
//默认构造函数里的空数组
    private static final Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA = {};

    //存储集合元素的底层实现：真正存放元素的数组
    transient Object[] elementData; // non-private to simplify nested class access
    //当前元素数量
    private int size;

    //默认构造方法
    public ArrayList() {
        //默认构造方法只是简单的将 空数组赋值给了elementData
        this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;
    }

    //空数组
    private static final Object[] EMPTY_ELEMENTDATA = {};
    //带初始容量的构造方法
    public ArrayList(int initialCapacity) {
        //如果初始容量大于0，则新建一个长度为initialCapacity的Object数组.
        //注意这里并没有修改size(对比第三个构造函数)
        if (initialCapacity > 0) {
            this.elementData = new Object[initialCapacity];
        } else if (initialCapacity == 0) {//如果容量为0，直接将EMPTY_ELEMENTDATA赋值给elementData
            this.elementData = EMPTY_ELEMENTDATA;
        } else {//容量小于0，直接抛出异常
            throw new IllegalArgumentException("Illegal Capacity: "+
                                               initialCapacity);
        }
    }

    //利用别的集合类来构建ArrayList的构造函数
    public ArrayList(Collection<? extends E> c) {
        //直接利用Collection.toArray()方法得到一个对象数组，并赋值给elementData 
        elementData = c.toArray();
        //因为size代表的是集合元素数量，所以通过别的集合来构造ArrayList时，要给size赋值
        if ((size = elementData.length) != 0) {
            // c.toArray might (incorrectly) not return Object[] (see 6260652)
            if (elementData.getClass() != Object[].class)//这里是当c.toArray出错，没有返回Object[]时，利用Arrays.copyOf 来复制集合c中的元素到elementData数组中
                elementData = Arrays.copyOf(elementData, size, Object[].class);
        } else {
            //如果集合c元素数量为0，则将空数组EMPTY_ELEMENTDATA赋值给elementData 
            // replace with empty array.
            this.elementData = EMPTY_ELEMENTDATA;
        }
    }
```

  **小结一下，构造函数走完之后，会构建出数组elementData和数量size。**

这里大家要注意一下Collection.toArray()这个方法，在Collection子类各大集合的源码中，高频使用了这个方法去获得某Collection的所有元素。

关于方法：Arrays.copyOf(elementData, size, Object[].class)，就是根据class的类型来决定是new 还是反射去构造一个泛型数组，同时利用native函数，批量赋值元素至新数组中。 

如下：

```java
    public static <T,U> T[] copyOf(U[] original, int newLength, Class<? extends T[]> newType) {
        @SuppressWarnings("unchecked")
        //根据class的类型来决定是new 还是反射去构造一个泛型数组
        T[] copy = ((Object)newType == (Object)Object[].class)
            ? (T[]) new Object[newLength]
            : (T[]) Array.newInstance(newType.getComponentType(), newLength);
        //利用native函数，批量赋值元素至新数组中。
        System.arraycopy(original, 0, copy, 0,
                         Math.min(original.length, newLength));
        return copy;
    }
```

值得注意的是，`System.arraycopy`也是一个很高频的函数，大家要留意一下。

```java
    public static native void arraycopy(Object src,  int  srcPos,
                                        Object dest, int destPos,
                                        int length);
```



## 常用API

### 1 增

每次 add之前，都会判断add后的容量，是否需要扩容。

```java
public boolean add(E e) {
    ensureCapacityInternal(size + 1);  // Increments modCount!!
    elementData[size++] = e;//在数组末尾追加一个元素，并修改size
    return true;
}
    private static final int DEFAULT_CAPACITY = 10;//默认扩容容量 10
    private void ensureCapacityInternal(int minCapacity) {
        //利用 == 可以判断数组是否是用默认构造函数初始化的
        if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
            minCapacity = Math.max(DEFAULT_CAPACITY, minCapacity);
        }

        ensureExplicitCapacity(minCapacity);
    }


private void ensureExplicitCapacity(int minCapacity) {
    modCount++;//如果确定要扩容，会修改modCount 

    // overflow-conscious code
    if (minCapacity - elementData.length > 0)
        grow(minCapacity);
}

//需要扩容的话，默认扩容一半
private void grow(int minCapacity) {
    // overflow-conscious code
    int oldCapacity = elementData.length;
    int newCapacity = oldCapacity + (oldCapacity >> 1);//默认扩容一半
    if (newCapacity - minCapacity < 0)//如果还不够 ，那么就用 能容纳的最小的数量。（add后的容量）
        newCapacity = minCapacity;
    if (newCapacity - MAX_ARRAY_SIZE > 0)
        newCapacity = hugeCapacity(minCapacity);
    // minCapacity is usually close to size, so this is a win:
    elementData = Arrays.copyOf(elementData, newCapacity);//拷贝，扩容，构建一个新数组，
}
```

```java
public void add(int index, E element) {
    rangeCheckForAdd(index);//越界判断 如果越界抛异常

    ensureCapacityInternal(size + 1);  // Increments modCount!!
    System.arraycopy(elementData, index, elementData, index + 1,
                     size - index); //将index开始的数据 向后移动一位
    elementData[index] = element;
    size++;
}
```

```java
public boolean addAll(Collection<? extends E> c) {
    Object[] a = c.toArray();
    int numNew = a.length;
    ensureCapacityInternal(size + numNew);  // Increments modCount //确认是否需要扩容
    System.arraycopy(a, 0, elementData, size, numNew);// 复制数组完成复制
    size += numNew;
    return numNew != 0;
}
```

```java
public boolean addAll(int index, Collection<? extends E> c) {
    rangeCheckForAdd(index);//越界判断

    Object[] a = c.toArray();
    int numNew = a.length;
    ensureCapacityInternal(size + numNew);  // Increments modCount //确认是否需要扩容

    int numMoved = size - index;
    if (numMoved > 0)
        System.arraycopy(elementData, index, elementData, index + numNew,
                         numMoved);//移动（复制)数组

    System.arraycopy(a, 0, elementData, index, numNew);//复制数组完成批量赋值
    size += numNew;
    return numNew != 0;
}
```

#### **总结：** 

add、addAll。 
先判断是否越界，是否需要扩容。 
如果扩容， 就复制数组。 
然后设置对应下标元素值。

值得注意的是： 
1 **如果需要扩容的话，默认扩容一半。如果扩容一半不够，就用目标的size作为扩容后的容量。** 
2 **在扩容成功后，会修改modCount**

### 2 删

```java
public E remove(int index) {
    rangeCheck(index);//判断是否越界
    modCount++;//修改modeCount 因为结构改变了
    E oldValue = elementData(index);//读出要删除的值
    int numMoved = size - index - 1;
    if (numMoved > 0)
        System.arraycopy(elementData, index+1, elementData, index,
                         numMoved);//用复制 覆盖数组数据
    elementData[--size] = null; // clear to let GC do its work  //置空原尾部数据 不再强引用， 可以GC掉
    return oldValue;
}
    //根据下标从数组取值 并强转
    E elementData(int index) {
        return (E) elementData[index];
    }

//删除该元素在数组中第一次出现的位置上的数据。 如果有该元素返回true，如果false。
public boolean remove(Object o) {
    if (o == null) {
        for (int index = 0; index < size; index++)
            if (elementData[index] == null) {
                fastRemove(index);//根据index删除元素
                return true;
            }
    } else {
        for (int index = 0; index < size; index++)
            if (o.equals(elementData[index])) {
                fastRemove(index);
                return true;
            }
    }
    return false;
}
//不会越界 不用判断 ，也不需要取出该元素。
private void fastRemove(int index) {
    modCount++;//修改modCount
    int numMoved = size - index - 1;//计算要移动的元素数量
    if (numMoved > 0)
        System.arraycopy(elementData, index+1, elementData, index,
                         numMoved);//以复制覆盖元素 完成删除
    elementData[--size] = null; // clear to let GC do its work  //置空 不再强引用
}

//批量删除
public boolean removeAll(Collection<?> c) {
    Objects.requireNonNull(c);//判空
    return batchRemove(c, false);
}
//批量移动
private boolean batchRemove(Collection<?> c, boolean complement) {
    final Object[] elementData = this.elementData;
    int r = 0, w = 0;//w 代表批量删除后 数组还剩多少元素
    boolean modified = false;
    try {
        //高效的保存两个集合公有元素的算法
        for (; r < size; r++)
            if (c.contains(elementData[r]) == complement) // 如果 c里不包含当前下标元素， 
                elementData[w++] = elementData[r];//则保留
    } finally {
        // Preserve behavioral compatibility with AbstractCollection,
        // even if c.contains() throws.
        if (r != size) { //出现异常会导致 r !=size , 则将出现异常处后面的数据全部复制覆盖到数组里。
            System.arraycopy(elementData, r,
                             elementData, w,
                             size - r);
            w += size - r;//修改 w数量
        }
        if (w != size) {//置空数组后面的元素
            // clear to let GC do its work
            for (int i = w; i < size; i++)
                elementData[i] = null;
            modCount += size - w;//修改modCount
            size = w;// 修改size
            modified = true;
        }
    }
    return modified;
}
```

**从这里我们也可以看出，当用来作为删除元素的集合里的元素多余被删除集合时，也没事，只会删除它们共同拥有的元素。**

#### 小结： 

1 删除操作一定会修改modCount，且可能涉及到数组的复制，相对低效。 
2 批量删除中，涉及高效的保存两个集合公有元素的算法，可以留意一下。

### 3 改

不会修改modCount，相对增删是高效的操作。

```java
public E set(int index, E element) {
    rangeCheck(index);//越界检查
    E oldValue = elementData(index); //取出元素 
    elementData[index] = element;//覆盖元素
    return oldValue;//返回元素
}
```

### 4 查

**不会修改modCount，相对增删是高效的操作。**

```java
public E set(int index, E element) {
    rangeCheck(index);//越界检查
    E oldValue = elementData(index); //取出元素 
    elementData[index] = element;//覆盖元素
    return oldValue;//返回元素
}
```



### 5 清空，clear

**会修改modCount。**

```java
public void clear() {
    modCount++;//修改modCount
    // clear to let GC do its work
    for (int i = 0; i < size; i++)  //将所有元素置null
        elementData[i] = null;

    size = 0; //修改size 
}
```

### 6 包含 contain

```java
//普通的for循环寻找值，只不过会根据目标对象是否为null分别循环查找。
public boolean contains(Object o) {
    return indexOf(o) >= 0;
}
//普通的for循环寻找值，只不过会根据目标对象是否为null分别循环查找。
public int indexOf(Object o) {
    if (o == null) {
        for (int i = 0; i < size; i++)
            if (elementData[i]==null)
                return i;
    } else {
        for (int i = 0; i < size; i++)
            if (o.equals(elementData[i]))
                return i;
    }
    return -1;
}
```

### 7 判空 isEmpty()

```java
public boolean isEmpty() {
    return size == 0;
}
```



### 8 迭代器 Iterator.

```java
public Iterator<E> iterator() {
    return new Itr();
}
/**
 * An optimized version of AbstractList.Itr
 */
private class Itr implements Iterator<E> {
    int cursor;       // index of next element to return //默认是0
    int lastRet = -1; // index of last element returned; -1 if no such  //上一次返回的元素 (删除的标志位)
    int expectedModCount = modCount; //用于判断集合是否修改过结构的 标志

    public boolean hasNext() {
        return cursor != size;//游标是否移动至尾部
    }

    @SuppressWarnings("unchecked")
    public E next() {
        checkForComodification();
        int i = cursor;
        if (i >= size)//判断是否越界
            throw new NoSuchElementException();
        Object[] elementData = ArrayList.this.elementData;
        if (i >= elementData.length)//再次判断是否越界，在 我们这里的操作时，有异步线程修改了List
            throw new ConcurrentModificationException();
        cursor = i + 1;//游标+1
        return (E) elementData[lastRet = i];//返回元素 ，并设置上一次返回的元素的下标
    }

    public void remove() {//remove 掉 上一次next的元素
        if (lastRet < 0)//先判断是否next过
            throw new IllegalStateException();
        checkForComodification();//判断是否修改过

        try {
            ArrayList.this.remove(lastRet);//删除元素 remove方法内会修改 modCount 所以后面要更新Iterator里的这个标志值
            cursor = lastRet; //要删除的游标
            lastRet = -1; //不能重复删除 所以修改删除的标志位
            expectedModCount = modCount;//更新 判断集合是否修改的标志，
        } catch (IndexOutOfBoundsException ex) {
            throw new ConcurrentModificationException();
        }
    }
//判断是否修改过了List的结构，如果有修改，抛出异常
    final void checkForComodification() {
        if (modCount != expectedModCount)
            throw new ConcurrentModificationException();
    }
}
```

### 总结

增删改查中， 增导致扩容，则会修改modCount，删一定会修改。 改和查一定不会修改modCount。
扩容操作会导致数组复制，批量删除会导致 找出两个集合的交集，以及数组复制操作，因此，增、删都相对低效。 而 改、查都是很高效的操作。
因此，结合特点，在使用中，以Android中最常用的展示列表为例，列表滑动时需要展示每一个Item（element）的数组，所以 查 操作是最高频的。相对来说，增操作 只有在列表加载更多时才会用到 ，而且是在列表尾部插入，所以也不需要移动数据的操作。而删操作则更低频。 故选用ArrayList作为保存数据的结构。
在面试中还有可能会问到和Vector的区别，我大致看了一下Vector的源码，内部也是数组做的，区别在于Vector在API上都加了synchronized所以它是线程安全的，以及Vector扩容时，是翻倍size，而ArrayList是扩容50%。



> ArrayList的实现中大量地调用了Arrays.copyof()和System.arraycopy()方法。我们有必要对这两个方法的实现做下深入的了解。

首先来看Arrays.copyof()方法。它有很多个重载的方法，但实现思路都是一样的，我们来看泛型版本的源码：

```java
public static <T> T[] copyOf(T[] original, int newLength) {
    return (T[]) copyOf(original, newLength, original.getClass());
}
```

很明显调用了另一个copyof方法，该方法有三个参数，最后一个参数指明要转换的数据的类型，其源码如下：

```java
public static <T,U> T[] copyOf(U[] original, int newLength, Class<? extends T[]> newType) {
    T[] copy = ((Object)newType == (Object)Object[].class)
        ? (T[]) new Object[newLength]
        : (T[]) Array.newInstance(newType.getComponentType(), newLength);
    System.arraycopy(original, 0, copy, 0,
                     Math.min(original.length, newLength));
    return copy;
}
```

这里可以很明显地看出，该方法实际上是在其内部又创建了一个长度为newlength的数组，调用System.arraycopy()方法，将原来数组中的元素复制到了新的数组中。

下面来看System.arraycopy()方法。该方法被标记了native，调用了系统的C/C++代码，在JDK中是看不到的，但在openJDK中可以看到其源码。该函数实际上最终调用了C语言的memmove()函数，因此它可以保证同一个数组内元素的正确复制和移动，比一般的复制方法的实现效率要高很多，很适合用来批量处理数组。Java强烈推荐在复制大量数组元素时用该方法，以取得更高的效率。

> 注意ArrayList的两个转化为静态数组的toArray方法。

第一个，Object[] toArray()方法。该方法有可能会抛出java.lang.ClassCastException异常，如果直接用向下转型的方法，将整个ArrayList集合转变为指定类型的Array数组，便会抛出该异常，而如果转化为Array数组时不向下转型，而是将每个元素向下转型，则不会抛出该异常，显然对数组中的元素一个个进行向下转型，效率不高，且不太方便。

第二个，<T> T[] toArray(T[] a)方法。该方法可以直接将ArrayList转换得到的Array进行整体向下转型（转型其实是在该方法的源码中实现的），且从该方法的源码中可以看出，参数a的大小不足时，内部会调用Arrays.copyOf方法，该方法内部创建一个新的数组返回，因此对该方法的常用形式如下：

```java
public static Integer[] vectorToArray2(ArrayList<Integer> v) {  
    Integer[] newText = (Integer[])v.toArray(new Integer[0]);  
    return newText;  
}
```


## [我的主页](https://suveng.github.io/blog/)