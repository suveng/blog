title:  leetcode(78)subset
date: 2019-03-27 13:00:00 +0800
update: 2019-03-27 13:00:00 +0800
author: me
cover: http://ww1.sinaimg.cn/large/006jIRTegy1g1h6hj2mxrj31q512v7wh.jpg
preview:  给定一组不同的整数，nums，返回所有可能的子集（幂集）。解决方案集不得包含重复的子集。
tags:

  -  LeetCode

---



[TOC]

![封面图](http://ww1.sinaimg.cn/large/006jIRTegy1g1h6hj2mxrj31q512v7wh.jpg)

# leetcode(78)subset

![](http://ww1.sinaimg.cn/large/006jIRTegy1g1h6n5p2uzj30d6083aad.jpg)



```java
public class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> results = new ArrayList<>();
        if (nums == null || nums.length == 0) {
            return results;
        }
        List<Integer> subset = new ArrayList<>();
        dfsHelper(nums, 0, results, subset);
        
        return results;
    }
    
    private void dfsHelper(int[] nums, int startIndex, List<List<Integer>> results, List<Integer> subset) {
        // deep copy and add to results
        results.add(new ArrayList<>(subset));
        
        for (int i = startIndex; i < nums.length; i++) {
            subset.add(nums[i]);
            dfsHelper(nums, i + 1, results, subset);
            subset.remove(subset.size() - 1);
        }   
    }
}
```

## [我的主页](https://suveng.github.io/blog/)



