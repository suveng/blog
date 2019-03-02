title: Spring(1)Spring集成AOP
date: 2019-02-22 12:00:00 +0800
update: 2019-02-22 12:00:00 +0800
author: me
cover: https://ws1.sinaimg.cn/large/006jIRTegy1g0ogkggxraj31z4140qjo.jpg
preview:  AOP通过提供另一种思考程序结构的方式来补充面向对象编程（OOP），在AOP模块化的单位是切面
tags:

  - Spring

---

![封面图](https://ws1.sinaimg.cn/large/006jIRTegy1g0ogkggxraj31z4140qjo.jpg)

#  Spring(1)Spring集成AOP

## SpringMVC集成AOP

### 步骤

1. 引入 `jar` 包 `maven` 依赖
2. 在配置文件开启AOP
3. 编写切面方法，配置切面

> 1.引入 `jar` 包 `maven` 依赖

注意版本问题，目前只测试过`spring.version` 4.3.3 和 5.0.2

```xml
<!--spring aop start-->
<dependency>
<groupId>org.springframework</groupId>
<artifactId>spring-aop</artifactId>
<version>${org.springframework.version}</version>
</dependency>
<!--spirng aop end-->

<!--spring aspects start-->
<dependency>
<groupId>org.springframework</groupId>
<artifactId>spring-aspects</artifactId>
<version>${org.springframework.version}</version>
</dependency>
<!--spring aspects end-->
```



> 2.在配置文件开启AOP

在 `xml` 的命名空间 `xsi:schemaLocation` 加上

```xml
xmlns:aop="http://www.springframework.org/schema/aop"
xsi:schemaLocation= "http://www.springframework.org/schema/aop
        http://www.springframework.org/schema/aop/spring-aop.xsd"
```

AOP配置有两种方式：

1. xml 配置文件，[详情点击](https://blog.csdn.net/qq_37933685/article/details/81637432)
2. 使用注解

这里只介绍第二种，因为方便。

首先要在spring 的配置文件开启 切面自动代理

```xml
<aop:aspectj-autoproxy/>
```



> 3.编写切面方法，配置切面

```java
/**
 * author: Veng Su
 * email: suveng@163.com
 * date: 2018/8/14 16:22
 */

@Component(value = "annotationAspect")
@Aspect
public class AnnotationAspect {

    //before 切
    @Before(value = "execution(* *..*.*.say())")
    public void beforeF(){
        System.out.println("我是before");
    }
    //after 切
    @After(value = "execution(* *..*.*.say())")
    public void afterF(){
        System.out.println("我是after");
    }
    //after_throwing 切
    @AfterThrowing(value = "execution(* *..*.*.say())")
    public void afterTF(){
        System.out.println("我是after-throwing");
    }
    //after-returning 切
    @AfterReturning(value = "execution(* *..*.*.say())")
    public void afterRF(){
        System.out.println("我是after-returning");
    }
    //around 切 要把joinpoint给传进来
    @Around(value = "AnnotationAspect.say()")
    public void aroundF(ProceedingJoinPoint joinPoint){
        System.out.println("前around");
        try {
            joinPoint.proceed();
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        }
        System.out.println("后 around");
    }
    // 如果切入表达式，大部分都是一样的话，则可考虑抽取出来，简单利用
    @Pointcut(value = "execution(* *..*.*.say())")
    public void say() {}
}

```

具体看翻看我上次写的博文，[链接](https://blog.csdn.net/qq_37933685/article/details/81673831)



## SpringBoot集成AOP

### 步骤

1. 引入AOP的maven依赖，即可

如果需要配置AOP相关属性，则需要自定义配置

> 1.引入AOP的maven依赖，即可

```xml
<!--###############springboot-aop模块################-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```



## 自定义注解配合AOP

> AOP+注解实现统计执行时间

切面类：CostTimeAspect

```java
/**
 * @author suwenguang
 * suveng@163.com
 * since 2019/2/27
 * description:
 **/
@Aspect
@Component
@Slf4j
public class CostTimeAspect {
    @Pointcut(value = "execution(* *..*.*.*()) ")
    public void anyMethod() {
    }

    /**
     * 环绕通知，计算执行时间
     * @param pjp joinPoint
     * @param costTime 自定义注解
     */
    @Around(value = "execution(* *..*.*.*()) && @annotation(costTime)", argNames = "pjp,costTime")
    public void aroundMethod(ProceedingJoinPoint pjp, CostTime costTime) {
        log.info("开始执行");
        DateTime start = DateTime.now();
        try {
            pjp.proceed();
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        }
        DateTime end = DateTime.now();
        long cost = new Duration(start, end).getMillis();
        log.info("{}:执行完成,耗时：{}",pjp.getSignature().toString(),cost);
    }
}

```

注解类：

```java
/**
 * @author suwenguang
 * suveng@163.com
 * since 2019/2/27
 * description: 自定义注解，打上注解可计算方法执行时间。
 **/
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface CostTime {
    /**
     * 方法名
     *
     * @return 方法名
     */
    String name() default "";
}
```



## [我的主页](https://suveng.github.io/blog/)