title:  leetcode(7)整数反转
date: 2015-01-01 13:00:00 +0800
update: 2015-01-01 13:00:00 +0800
author: me
cover: http://ww1.sinaimg.cn/large/006jIRTegy1g17bgmf6szj31kw11xal6.jpg
preview:  leetcode题库第7题：给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。
tags:

  -  LeetCode

---



[TOC]

![封面图](http://ww1.sinaimg.cn/large/006jIRTegy1g17bgmf6szj31kw11xal6.jpg)

# leetcode(7)整数反转

```java
package 整数反转_7;

/**
 * @author suwenguang
 * suveng@163.com
 * since 2019/3/2
 * description:
 **/
public class Solution {
    public static void main(String[] args) {
        Solution solution = new Solution();
        System.out.println(solution.reverse(1999999999));
    }
    /**
     * 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。
     * <p>
     * 示例 1:
     * <p>
     * 输入: 123
     * 输出: 321
     * 示例 2:
     * <p>
     * 输入: -123
     * 输出: -321
     * 示例 3:
     * <p>
     * 输入: 120
     * 输出: 21
     **/
    public int reverse(int x) {
        //处理输入
        long res = 0;
        int max=0x7fffffff;
        int min = 0x80000000;

        //翻转逻辑
        while (x != 0){
            res = res*10 + (x%10);
            x/=10;
        }
        //判断溢出
        if (res<min || res>max){
            return 0;
        }
        return (int) res;
    }
}
```

## [我的主页](https://suveng.github.io/blog/)