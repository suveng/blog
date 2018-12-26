title: Java爬虫之JSoup使用教程
date: 2018-12-24 8:00:00 +0800
update: 2018-12-24 8:00:00 +0800
author: me
cover: https://ws1.sinaimg.cn/large/006jIRTegy1fyhl621hvrj31kw0w0nc6.jpg
preview:  JSoup是一个用于处理HTML的Java库，它提供了一个非常方便类似于使用DOM，CSS和jquery的方法的API来提取和操作数据
tags:

  - 第三方类库
。

---

[TOC]

![封面图](https://ws1.sinaimg.cn/large/006jIRTegy1fyhl621hvrj31kw0w0nc6.jpg)

# Java爬虫之JSoup使用教程

## 代码下载地址

> https://github.com/suveng/demo/releases/tag/jsoupDemo 
>
> 实战获取githubpages的链接，并生成sitemap

## 介绍

JSoup是一个用于处理HTML的Java库，它提供了一个非常方便类似于使用DOM，CSS和jquery的方法的API来提取和操作数据。

jsoup实现WHATWG HTML5规范，并将HTML解析为与现代浏览器相同的DOM。

* 从URL，文件或字符串中提取并解析HTML。
* 查找和提取数据，使用DOM遍历或CSS选择器。
* 操纵HTML元素，属性和文本。
* 根据安全的白名单清理用户提交的内容，以防止XSS攻击。
* 输出整洁的HTML。

jsoup旨在处理发现所有格式有差异的HTML; 从原始和验证，到无效的标签; jsoup将创建一个明智的解析树。

[项目地址](https://github.com/jhy/jsoup/)

**能用Jsoup实现什么？**

* 从URL，文件或字符串中刮取并解析HTML
* 查找和提取数据，使用DOM遍历或CSS选择器
* 操纵HTML元素，属性和文本
* 根据安全的白名单清理用户提交的内容，以防止XSS攻击
* 输出整洁的HTML

[文档地址](https://jsoup.org/cookbook/)

## 主要类

### 1. org.jsoup.Jsoup类

Jsoup类是任何Jsoup程序的入口点，并将提供从各种来源加载和解析HTML文档的方法。

Jsoup类的一些重要方法如下：

| 方法                                                        | 描述                                                         |
| ----------------------------------------------------------- | ------------------------------------------------------------ |
| `static Connection connect(String url)`                     | 创建并返回URL的连接。                                        |
| `static Document parse(File in, String charsetName)`        | 将指定的字符集文件解析成文档。                               |
| `static Document parse(String html)`                        | 将给定的html代码解析成文档。                                 |
| `static String clean(String bodyHtml, Whitelist whitelist)` | 从输入HTML返回安全的HTML，通过解析输入HTML并通过允许的标签和属性的白名单进行过滤。 |

### 2. org.jsoup.nodes.Document类

该类表示通过Jsoup库加载HTML文档。可以使用此类执行适用于整个HTML文档的操作。

Element类的重要方法可以参见 - <http://jsoup.org/apidocs/org/jsoup/nodes/Document.html> 。

### 3. org.jsoup.nodes.Element类

HTML元素是由标签名称，属性和子节点组成。 使用Element类，您可以提取数据，遍历节点和操作HTML。

Element类的重要方法可参见 - <http://jsoup.org/apidocs/org/jsoup/nodes/Element.html> 。

## 简单使用

### 安装

> 使用maven导包，也可以使用jar

```xml
<dependency>
  <!-- jsoup HTML parser library @ http://jsoup.org/ -->
  <groupId>org.jsoup</groupId>
  <artifactId>jsoup</artifactId>
  <version>1.10.2</version>
</dependency>
```

### 加载文档

#### 1. URL加载文档

从URL加载文档，使用`Jsoup.connect()`方法从URL加载HTML。

```java
try
{
    Document document = Jsoup.connect("http://www.yiibai.com").get();
    System.out.println(document.title());
} 
catch (IOException e) 
{
    e.printStackTrace();
}
```

#### 2. 从文件加载文档

使用`Jsoup.parse()`方法从文件加载HTML。

```java
try
{
    Document document = Jsoup.parse( new File( "D:/temp/index.html" ) , "utf-8" );
    System.out.println(document.title());
} 
catch (IOException e) 
{
    e.printStackTrace();
}
```

#### 3. 从String加载文档

使用`Jsoup.parse()`方法从字符串加载HTML。

```java
try
{
    String html = "<html><head><title>First parse</title></head>"
                    + "<body><p>Parsed HTML into a doc.</p></body></html>";
    Document document = Jsoup.parse(html);
    System.out.println(document.title());
} 
catch (IOException e) 
{
    e.printStackTrace();
}
```

### 提取数据

#### 使用DOM方法导航文档

元素提供了一系列类似DOM的方法来查找元素，并提取和操作它们的数据。DOM getter是上下文的：在父文档上调用，他们在文档下找到匹配的元素; 他们在一个子元素上调用了那个孩子下面的元素。通过这种方式，您可以了解所需的数据。

##### 寻找元素

* `getElementById(String id)`
* `getElementsByTag(String tag)`
* `getElementsByClass(String className)`
* `getElementsByAttribute(String key)` （及相关方法）
* 元素的兄弟姐妹：`siblingElements()`，`firstElementSibling()`，`lastElementSibling()`，`nextElementSibling()`，`previousElementSibling()`
* 图：`parent()`，`children()`，`child(int index)`

##### 处理元素数据

* `attr(String key)`获取和
  `attr(String key, String value)`设置属性
* `attributes()` 获得所有属性
* `id()`，`className()`和`classNames()`
* `text()`获取和
  `text(String value)`设置文本内容
* `html()`获取和
  `html(String value)`设置内部HTML内容
* `outerHtml()` 获取外部HTML值
* `data()`获取数据内容
  （例如`script`和`style`标签）
* `tag()` 和 `tagName()`

##### 操纵HTML和文本

* `append(String html)`， 
  `prepend(String html)`
* `appendText(String text)`， 
  `prependText(String text)`
* `appendElement(String tagName)`，
   `prependElement(String tagName)`
* `html(String value)`

### 使用selector-syntax查找元素

#### 使用CSS或类似jquery的选择器语法来查找或操作元素。

使用`Element.select(String selector)`
和`Elements.select(String selector)`方法

> jsoup元素支持[CSS](http://www.w3.org/TR/2009/PR-css3-selectors-20091215/)（或[jquery](http://jquery.com/)）之类的选择器语法来查找匹配元素，从而允许非常强大和健壮的查询。
>
> 该`select`方法在一个可用`Document`，`Element`或在`Elements`。它是上下文的，因此您可以通过从特定元素中进行选择或通过链接选择调用来进行过滤。
>
> Select返回一个Elements列表（as `Elements`），它提供了一系列提取和操作结果的方法。[更多选择器的语法](https://jsoup.org/cookbook/extracting-data/selector-syntax)

### 从元素中提取属性，文本和HTML

在解析文档并找到一些元素之后，您将需要获取这些元素中的数据。

* `Element.id()`
* `Element.tagName()`
* `Element.className()` 
  和 `Element.hasClass(String className)`

#### 您有一个包含相对URL的HTML文档，您需要将其解析为绝对URL

> 在HTML元素中，URL通常是相对于文档的locat编写的IOn : `<a href="/download">...</a>`. 当您使用该`Node.attr(String key)`方法获取href属性时，它将按照源HTML中的指定返回。
>
> 如果要获取绝对URL，则会有一个属性键前缀`abs:`，该前缀将导致根据文档的基URI解析属性值（原始位置）ION）： `attr("abs:href")`
>
> 对于此用例，在解析文档时指定基URI很重要。
>
> 如果您不想使用`abs:`前缀，还有一个方法`Node.absUrl(String key)`可以执行相同的操作，但可以通过自然属性键进行访问。

## 示例程序：列出链接

```java
public class ListLinks {
    public static void main(String[] args) throws IOException {
        Validate.isTrue(args.length == 1, "usage: supply url to fetch");
        String url = args[0];
        print("Fetching %s...", url);

        Document doc = Jsoup.connect(url).get();
        Elements links = doc.select("a[href]");
        Elements media = doc.select("[src]");
        Elements imports = doc.select("link[href]");

        print("\nMedia: (%d)", media.size());
        for (Element src : media) {
            if (src.tagName().equals("img"))
                print(" * %s: <%s> %sx%s (%s)",
                        src.tagName(), src.attr("abs:src"), src.attr("width"), src.attr("height"),
                        trim(src.attr("alt"), 20));
            else
                print(" * %s: <%s>", src.tagName(), src.attr("abs:src"));
        }

        print("\nImports: (%d)", imports.size());
        for (Element link : imports) {
            print(" * %s <%s> (%s)", link.tagName(),link.attr("abs:href"), link.attr("rel"));
        }

        print("\nLinks: (%d)", links.size());
        for (Element link : links) {
            print(" * a: <%s>  (%s)", link.attr("abs:href"), trim(link.text(), 35));
        }
    }

    private static void print(String msg, Object... args) {
        System.out.println(String.format(msg, args));
    }

    private static String trim(String s, int width) {
        if (s.length() > width)
            return s.substring(0, width-1) + ".";
        else
            return s;
    }
}
```

> 示例输出

```java
Media: (38)
 * img: <http://ycombinator.com/images/y18.gif> 18x18 ()
 * img: <http://ycombinator.com/images/s.gif> 10x1 ()
 * img: <http://ycombinator.com/images/grayarrow.gif> x ()
 * img: <http://ycombinator.com/images/s.gif> 0x10 ()
 * script: <http://www.co2stats.com/propres.php?s=1138>
 * img: <http://ycombinator.com/images/s.gif> 15x1 ()
 * img: <http://ycombinator.com/images/hnsearch.png> x ()
 * img: <http://ycombinator.com/images/s.gif> 25x1 ()
 * img: <http://mixpanel.com/site_media/images/mixpanel_partner_logo_borderless.gif> x (Analytics by Mixpan.)
 
Imports: (2)
 * link <http://ycombinator.com/news.css> (stylesheet)
 * link <http://ycombinator.com/favicon.ico> (shortcut icon)
 
Links: (141)
 * a: <http://ycombinator.com>  ()
 * a: <http://news.ycombinator.com/news>  (Hacker News)
 * a: <http://news.ycombinator.com/newest>  (new)
 * a: <http://news.ycombinator.com/newcomments>  (comments)
 * a: <http://news.ycombinator.com/leaders>  (leaders)
 * a: <http://news.ycombinator.com/jobs>  (jobs)
 * a: <http://news.ycombinator.com/submit>  (submit)
 * a: <http://news.ycombinator.com/x?fnid=JKhQjfU7gW>  (login)
 * a: <http://news.ycombinator.com/vote?for=1094578&dir=up&whence=%6e%65%77%73>  ()
 * a: <http://www.readwriteweb.com/archives/facebook_gets_faster_debuts_homegrown_php_compiler.php?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+readwriteweb+%28ReadWriteWeb%29&utm_content=Twitter>  (Facebook speeds up PHP)
 * a: <http://news.ycombinator.com/user?id=mcxx>  (mcxx)
 * a: <http://news.ycombinator.com/item?id=1094578>  (9 comments)
 * a: <http://news.ycombinator.com/vote?for=1094649&dir=up&whence=%6e%65%77%73>  ()
 * a: <http://groups.google.com/group/django-developers/msg/a65fbbc8effcd914>  ("Tough. Django produces XHTML.")
 * a: <http://news.ycombinator.com/user?id=andybak>  (andybak)
 * a: <http://news.ycombinator.com/item?id=1094649>  (3 comments)
 * a: <http://news.ycombinator.com/vote?for=1093927&dir=up&whence=%6e%65%77%73>  ()
 * a: <http://news.ycombinator.com/x?fnid=p2sdPLE7Ce>  (More)
 * a: <http://news.ycombinator.com/lists>  (Lists)
 * a: <http://news.ycombinator.com/rss>  (RSS)
 * a: <http://ycombinator.com/bookmarklet.html>  (Bookmarklet)
 * a: <http://ycombinator.com/newsguidelines.html>  (Guidelines)
 * a: <http://ycombinator.com/newsfaq.html>  (FAQ)
 * a: <http://ycombinator.com/newsnews.html>  (News News)
 * a: <http://news.ycombinator.com/item?id=363>  (Feature Requests)
 * a: <http://ycombinator.com>  (Y Combinator)
 * a: <http://ycombinator.com/w2010.html>  (Apply)
 * a: <http://ycombinator.com/lib.html>  (Library)
 * a: <http://www.webmynd.com/html/hackernews.html>  ()
 * a: <http://mixpanel.com/?from=yc>  ()
```

## 实战爬取个人博客链接，并生成sitemap.xml

### 步骤

* 1 确定爬取链接
* 2 获取当前链接页面所有链接
* 3 过滤非本域名链接
* 4 保存当前链接，判断当前链接是否已经被保存过了（set集合），若已保存，跳过，若未保存，跳回1
* 5 根据生成的链接，构造符合google的sitemap标准的xml文件

### 核心代码

#### 入口类main.java

```java
public class Main {
  public static void main(String[] args) throws IOException {
    Links links = new Links();
    //获取链接，并保存到links.log
    links.myblog(links);
    SiteMapXML siteMapXML = new SiteMapXML();
    siteMapXML.createSiteMap("links.log");
    //生成后删除
    FileUtils.deleteQuietly(new File("links.log"));
  }
}
```

#### link.java 实现爬取链接

```java
/**
 * @author 苏文广 created at 2018/12/22
 * @Description: jsoup 教程 实战 爬取连接
 */
@Data
public class Links {

  /**
   * 我的域名
   */
  private static final String DOMAIN = "https://suveng.github.io";
  /**
   * 目标域名
   */
  private String targetDomain = "https://suveng.github.io";
  /**
   * 保存了的链接
   */
  private Set<String> saved = new HashSet<>();

  /**
   * 最终链接
   */
  String targetHref;

 public void myblog(Links jsoupMain) throws IOException {
  Document doc = Jsoup.connect(Links.DOMAIN+"/blog").get();
  Elements links = doc.select("a[href]");
  jsoupMain.saveLinksByElements(links);

}
  private void saveLinksByElements(Elements links) throws IOException {
    if (links == null) {
      return;
    }
    for (Element element : links) {
      //处理连接类型
      dealwithHref(element);
      if (!saved.contains(targetHref)) {
        System.out.println("\nlink : " + targetHref);
        System.out.println("text : " + element.text());
        Elements targetLink = getLinks(targetHref);
        if (targetLink == null) {
          return;
        }
        saveLinks();
        saveLinksByElements(targetLink);
      }
    }
  }

  /**
   * 处理连接
   */
  private void dealwithHref(Element element) {

    targetHref=element.attr("abs:href");
    //处理编码
    try {
      this.targetHref = URLDecoder.decode(targetHref, "utf-8");
    } catch (UnsupportedEncodingException e) {
      System.err.println("不支持的编码，建议换成utf-8");
      this.targetHref = null;
      return;
    }
    dealwithDomain();
  }

  /**
   * 判断是否是当前域名，只有当前域名才支持爬取，不支持跨域
   */
  private void dealwithDomain() {
    if (!this.targetHref.contains(this.targetDomain)){
      this.targetHref=null;
    }
  }

  /**
   * 获取链接
   * @param url targetHref
   * @return  document.select("a[href]");
   */
  private Elements getLinks(String url) {
    try {
      Connection connect = Jsoup.connect(url);
      Document document;
      document = connect.get();
      return document.select("a[href]");
    } catch (Exception e) {
      System.err.println("错误链接");
      return null;
    }
  }

  /**
   * 保存链接
   * @throws IOException 读写文件
   */
  private void saveLinks() throws IOException {
    saved.add(this.targetHref);
    File links = new File("links.log");
    FileUtils.writeStringToFile(links, this.targetHref + '\n', "utf-8", true);
  }
}
```

#### siteMapXML.java 实现构造sitemap 

> 采用dom4j 类库，估计还会写一个关于dom4j的文章

```java
/**
 * @author 苏文广 created at 2018/12/22
 * @Description: sitemap 生成工具类
 */
public class SiteMapXML {


  public void createSiteMap(String linksPath) throws IOException {
    Document document = DocumentHelper.createDocument();
    Element locs = document.addElement("urlset","http://www.sitemaps.org/schemas/sitemap/0.9");
    List<String> strings = FileUtils.readLines(new File(linksPath), Charset.forName("utf-8"));
    for (String url : strings) {
      Element loc = locs.addElement("url","http://www.sitemaps.org/schemas/sitemap/0.9");
      loc.addElement("loc").setText(url);
      loc.addElement("lastmod")
          .setText(LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE));
    }
    writeAndFlush(document);
  }

  public void writeAndFlush(Document document) {
    try {
      OutputFormat format = OutputFormat.createPrettyPrint();
      format.setEncoding(document.getXMLEncoding());
      Writer fileWriter = new FileWriter("sitemap.xml");
      XMLWriter xmlWriter = new XMLWriter(fileWriter, format);
      xmlWriter.write(document);
      xmlWriter.close();
    } catch (IOException e) {
      System.err.println("导出xml失败，检查 writeandflush()");
    }
  }

  /**
   * 对xml格式化并写入文件
   */
  protected void writeFile4Pretty(File file, Document document) throws IOException {

    OutputFormat format = OutputFormat.createPrettyPrint();
    format.setEncoding(document.getXMLEncoding());
    XMLWriter writer = new XMLWriter(new FileWriter(file), format);
    writer.write(document);
    writer.flush();
    writer.close();
  }

  /***
   * 格式化xml为string
   */
  protected String prettysString(Document document) throws IOException {
    OutputFormat format = OutputFormat.createPrettyPrint();
    format.setEncoding(document.getXMLEncoding());
    StringWriter stringWriter = new StringWriter();
    XMLWriter writer = new XMLWriter(stringWriter, format);
    writer.write(document);
    writer.close();
    return stringWriter.toString();
  }


}
```

> https://github.com/suveng/demo/releases/tag/jsoupDemo 
>
> 实战获取githubpages的链接，并生成sitemap

## 参考文章

https://www.yiibai.com/jsoup

