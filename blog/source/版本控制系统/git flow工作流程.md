title: git flow工作流程
date: 2019-08-11 11:00:00 +0800
update: 2019-08-11 11:00:00 +0800
author: me
cover: images/wallhaven-714079.jpg
tags:

  -  git

---

# git flow工作流程

这是一种以发布为中心的开发模式。该模式以荷兰程序员 [Vincent Driessen](https://links.jianshu.com/go?to=http%3A%2F%2Fnvie.com%2Fabout%2F)发表的 [A successful Git branching model](https://links.jianshu.com/go?to=http%3A%2F%2Fnvie.com%2Fposts%2Fa-successful-git-branching-model%2F)为基础，组合了 [GitHub](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com)的开发流程。

![](https://oscimg.oschina.net/oscnet/48001bae12f3a3997b6916b2ae2bfc331e4.jpg)

该流程以分支名表示软件开发中开发状态的迁移。

1. 从开发分支（develop）创建特性分支（feature branches），进行功能的实现或修改
2. 特性分支（feature branches）的修改结束后，与开发分支（develop）合并
3. 重复上述 `1`和 `2`，不断实现功能直至可以发布
4. 创建用于发布的分支（ release branches），处理发布的各项工作
5. 发布准本工作完成后与 master 分支合并，打上版本标签（Tag）进行发布
6. 如果发布的软件出现 BUG，以打了标签的版本为基础进行修正（hotfixs）

## 导入 Git Flow 前的准本

### 安装 git-flow

**Mac 下的安装**

```
$ brew install git-flow
```

**Linux 下的安装**

```
$ sudo apt-get install git-flow
```

**确认运行状况**

```
$ git flow
```

### 仓库的初始设置

**创建仓库**

首先，在 GitHub 上新建一个 Git 仓库。这里我们创建一个附带 README.md 文件的名为 blog 的仓库。

然后在本地 clone 这个仓库。

```
$ git clone git@github.com:lw1024/blog.git
```

**进行 git flow 的初始化设置**

```
$ cd blog
$ git flow init -d
```

*注：这里的 -d参数是表示使用默认值进行设置*

查看已创建的分支。

```
$ git branch -a
* develop
  master
  remotes/origin/HEAD -> origin/master
  remotes/origin/master
```

此时仓库中的分支状况如上所示。

**在远程仓库中也创建 develop 分支**

```
$ git push -u origin develop
$ git branch -a
* develop
  master
  remotes/origin/HEAD -> origin/master
  remotes/origin/develop
  remotes/origin/master
```

## 模拟体验 Git Flow

### master 分支与 develop 分支的区别

在 Git Flow 中和两个分支至关重要，它们会贯穿整个开发流程，绝对不会被删除。

**master 分支**

master 分支始终保持着软件可以正常运行的状态。由于要维持这一状态，所以不允许开发者直接对 master 分支的代码进行修改和提交。

只有在其他分支的开发工作进展到可以发布的程度后，才会合并到 master 分支中，而且这一合并只在发布成品是进行。发布时会附加包含版本编号的标签（Tag）。

**develop 分支**

develop 分支是开发过程中的代码中心分支。与 master 分支一样，这个分支也不允许开发者直接进行修改和提交。

程序员要以 develop 分支为起点新建 feature 分支，在 feature 分支中进行新功能的开发或者代码的修改。

### 在 feature 中进行的工作

1. 从 develop 分支创建 feature 分支
2. 在 feature 分支中实现目标功能
3. 通过 GitHub 向 develop 分支发送 Pull Request
4. 接受其他开发者审查后，将 Pull Request 合并至 develop 分支

与 develop 分支合并后，已经完成工作的 feature 分支就可以在适当的时候删除。

**创建分支**

前提，我们目前在 develop 分支下

```
$ git pull
$ git flow feature start add-user
```

现在我们已经创建并切换到了 feature/add-user 分支。

**在分支中进行作业**

接下来在刚刚创建的 feature/add-user 分支中实现目标功能并进行提交。

### 发送 Pull Request

功能实现之后，需要通过 GitHub 发送 Pull Request，请求 develop 分支合并 feature/add-user 分支的内容。*注意，这里不能与本地的 Git 仓库进行合并，而要利用 GitHub 的 Pull Request 功能接受代码审查，然后在合并到远程仓库的分支中。*

首先，我们将 feature/add-user 分支 push 到 GitHub 端远程仓库。

```
$ git push origin feature/add-user
```

如果是与其他开发者共同开发同一个 feature 分支，那么远程仓库的的 add-user 分支可能已经被更新，要记得通过 pull 操作获取 add-user 分支的最新代码。另外，我们在开发这个 feature 分支的过程中，develop 分支可能有了最新版本，所以要养成在 push 之前先获取最新 develop 分支的习惯。确保上述两点之后再进行 push。

如果在开发这个 feature 分支的的时候，develop 分支已经有了新版本，那可以先 merge 这个 develop 分支到这个 feature 分支。
　　
现在，打开 GitHub 的仓库页面，切换到 feature/add-user 分支，然后发送 Pull Request。

### 通过代码审查提高代码质量

发送 Pull Request 之后，通过下列步骤利用 Pull Request 从其他开发者哪里获取反馈，不断精炼代码。
　　1. 由其他开发者进行代码审查，在 Pull Request 中提供反馈
　　2. 修正代码以反映反馈的内容（在本地 feature/add-user 分支中）
　　3. 将 feature/add-user 分支 push 到远程仓库（自动添加至之前的 Pull Request）
　　4. 重复前三步
　　5. 确认 Pull Request 没有问题后，由其他开发者将其合并至 develop 分支

下面是几个反馈的要点。
　　* 没有测试/测试未通过
　　* 违反编码规则
　　* 代码品质过低（命名不明确，方法冗长等）
　　* 还有重构的余地
　　* 有重复部分

### 更新本地的 develop 分支

```
$ git checkout develop
$ git pull
```

每当需要从 develop 分支创建 feature 等分支是，记得一定要先执行上述操作，保证 develop 分支处于最新状态。
　　
另外，如果本地还有其他正在开发中的 feature 分支时，可以将更新后的 develop 分支 merge 到该 feature 分支中。

### 在 release 分支中进行的工作

假设我们的软件已经可以发布，接下来需要给软件分配一个版本号进行发布。今后对这个版本的软件制作 BUG 修复，不再进行其他支持。如果发布所需的工作尚未全部完成，那么绝对不可以进入接下来的工作阶段。
　　
　　*接下来的操作，都需要发布管理员负起责任认真执行。*

**创建分支**

```
$ git checkout develop
$ git pull
$ git flow release start '1.0.0'
```

release/1.0.0 分支已经成功创建，它就是这次的 release 分支。

**分支内的工作**

在这个分支中，我们只处理与发布相关的提交。比如版本编号变更等元数据的添加工作。如果软件部署到预演环境后经测试发现 BUG，相关的修正也要提交给这个分支。但要记住，该分支中绝对不可以包含需求变更或功能变更等重大修正。这一阶段的提交数应该限制到最低。

**进行发布与合并**

发布前的修正全部处理完后，我们结束这一分支

```
$ git flow release finish '1.0.0'
```

1. release 分支将合并至 master 分支。分支在合并时会询问提交信息，如果没有需要特别声明的事项，可以直接保持默认状态。
2. 接下来，合并后的 master 分支会提示需要一个版本号，填写上我们写的即可。
3. 随后，release 分支的状态会合并至 develop 分支。

**查看版本标签**

```
$ git tag
1.0.0
```

### 更新到远程仓库

先从 develop 分支开始

```
$ git push origin develop
```

然后是 master 分支

```
$ git checkout master
$ git push origin master
```

再 push 标签信息

```
$ git push --tags
```

### 在 hotfix 分支中进行的工作

hotfix 分支都是以发布版本的标签或 master 分支为起点。借助 hotfix 分支，可以在不影响 develop 分支正常开发的情况下，有其他开发者处理 bug 修复工作。

**创建分支**

遇到下述情况时需要创建 hotfix 分支进行应对。

- 最新的 1.0.0 版中发现了 bug 或漏洞
- develop 分支正在开发新功能，无法面向用户进行发布
- 漏洞需要及早处理，无法等到下一次版本发布

假设修复 bug 后的版本升至 1.0.1

首先，从 GitHub 端远程仓库获取 Tag 信息。

```
$ git fetch origin
```

现在以 1.0.0 为起点，创建名为 1.0.1 的 hotfix 分支。

```
$ git flow hotfix start '1.0.1' '1.0.0'
```

在这个分支中修复软件的漏洞并进行提交。

等修复工作全部结束后，将 hotfix 分支 push 到 GitHub 端远程仓库，并向 master 分支发送 Pull Request。

```
$ git push origin hotfix/1.0.1
```

**创建标签和进行发布**

假设发送的 Pull Request 经过了其他开发者的审查，并且已经与 master 分支合并。现在就该利用 GitHub 的功能创建 1.0.1 的标签了。
　　
访问 GitHub 的仓库页面，从菜单中选择 release，打开该仓库的布信息。点击 Draft a new release 按钮，再输入标签的相关信息。在 Tag version 中输入 1.0.1，在 Target 中指定 master 分支。
　　
现在让本地仓库再获取一次标签。

```
$ git fetch origin
$ git tag
1.0.0
1.0.1
```

**从 hotfix 分支合并至 develop 分支**

操作很简单，只需登录 GitHub，从 hotfix/1.0.1 分支向 develop 分支发送 Pull Request 即可。
　　
如果合并后 develop 分支出现了异常，切记不要在 hotfix/1.0.1 分支中进行修正。此时应该先完成 hotfix 分支与 develop 分支的合并工作，然后在 develop 分支中尽快修复相关问题。

*最后记得在本地更新 master 分支和 develop 分支。*