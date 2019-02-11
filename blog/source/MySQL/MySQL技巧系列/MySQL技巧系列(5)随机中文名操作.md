title: MySQL技巧系列(5)随机中文名操作
date: 2019-02-05 16:00:00 +0800
update: 2019-02-05 16:00:00 +0800
author: me
cover: https://ws1.sinaimg.cn/large/006jIRTegy1fzk6p3007qj31z4140jz7.jpg
preview:  作为搬砖党的一族们，对MySQL一定再熟悉不过了，*MySQL* 是最流行的关系型数据库管理系统
tags:

  -  MySQL技巧系列

---



[TOC]

![封面图](https://ws1.sinaimg.cn/large/006jIRTegy1fzk6p3007qj31z4140jz7.jpg)

# MySQL技巧系列(5)随机中文名操作

## 缘由：

测试数据需要造随机中文名

## 代码：

```sql
-- 随机中文名 默认3位

drop FUNCTION if EXISTS `generateUserName`;
CREATE FUNCTION `generateUserName`() RETURNS varchar(255) CHARSET utf8
    DETERMINISTIC
BEGIN
    DECLARE xing varchar(2056) DEFAULT '赵钱孙李周郑王冯陈楮卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳酆鲍史唐费廉岑薛雷贺倪汤滕殷罗毕郝邬安常乐于时傅皮齐康伍余元卜顾孟平黄和穆萧尹姚邵湛汪祁毛禹狄米贝明臧计伏成戴谈宋茅庞熊纪舒屈项祝董梁杜阮蓝闽席季麻强贾路娄危江童颜郭梅盛林刁锺徐丘骆高夏蔡田樊胡凌霍虞万支柯昝管卢莫经裘缪干解应宗丁宣贲邓郁单杭洪包诸左石崔吉钮龚程嵇邢滑裴陆荣翁';

    DECLARE ming varchar(2056) DEFAULT '嘉懿煜城懿轩烨伟苑博伟泽熠彤鸿煊博涛烨霖烨华煜祺智宸正豪昊然明杰诚立轩立辉峻熙弘文熠彤鸿煊烨霖哲瀚鑫鹏致远俊驰雨泽烨磊晟睿天佑文昊修洁黎昕远航旭尧鸿涛伟祺轩越泽浩宇瑾瑜皓轩擎苍擎宇志泽睿渊楷瑞轩弘文哲瀚雨泽鑫磊梦琪忆之桃慕青问兰尔岚元香初夏沛菡傲珊曼文乐菱痴珊恨玉惜文香寒新柔语蓉海安夜蓉涵柏水桃醉蓝春儿语琴从彤傲晴语兰又菱碧彤元霜怜梦紫寒妙彤曼易南莲紫翠雨寒易烟如萱若南寻真晓亦向珊慕灵以蕊寻雁映易雪柳孤岚笑霜海云凝天沛珊寒云冰旋宛儿绿真盼儿晓霜碧凡夏菡曼香若烟半梦雅绿冰蓝灵槐平安书翠翠风香巧代云梦曼幼翠友巧听寒梦柏醉易访旋亦玉凌萱访卉怀亦笑蓝春翠靖柏夜蕾冰夏梦松书雪乐枫念薇靖雁寻春恨山从寒忆香觅波静曼凡旋以亦念露芷蕾千兰新波代真新蕾雁玉冷卉紫山千琴恨天傲芙盼山怀蝶冰兰山柏翠萱乐丹翠柔谷山之瑶冰露尔珍谷雪乐萱涵菡海莲傲蕾青槐冬儿易梦惜雪宛海之柔夏青亦瑶妙菡春竹修杰伟诚建辉晋鹏天磊绍辉泽洋明轩健柏煊昊强伟宸博超君浩子骞明辉鹏涛炎彬鹤轩越彬风华靖琪明诚高格光华国源宇晗昱涵润翰飞翰海昊乾浩博和安弘博鸿朗华奥华灿嘉慕坚秉建明金鑫锦程瑾瑜鹏经赋景同靖琪君昊俊明季同开济凯安康成乐语力勤良哲理群茂彦敏博明达朋义彭泽鹏举濮存溥心璞瑜浦泽奇邃祥荣轩';

    DECLARE I_xing int DEFAULT LENGTH(xing) / 3;
    DECLARE I_ming int DEFAULT LENGTH(ming) / 3;
    DECLARE return_str varchar(2056) DEFAULT '';

    SET return_str = CONCAT(return_str, substring(xing, floor(1 + RAND() * I_xing), 1));
    SET return_str = CONCAT(return_str, substring(ming, floor(1 + RAND() * I_ming), 1));
    IF RAND() > 0.400 THEN
        SET return_str = CONCAT(return_str, substring(ming, floor(1 + RAND() * I_ming), 1));
    END IF;
		

    RETURN return_str;
END
```

## 转载

[宏宇天成](https://yq.aliyun.com/articles/632586)

## [我的主页](https://suveng.github.io/blog/)



























