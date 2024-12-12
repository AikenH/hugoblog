---
calendar_date: 2022-02-01
catalog: true
categories:
- Development-Tool
cover:
  image: /cover/cover11.jpeg
date: 2022-02-01 12:19:34
lang: cn
subtitle: config git, usage, remote, bugs fixed
tags:
- Git
thumbnail: /img/header_img/lml_bg38.jpg
title: Git 01 入门与常用操作
toc: true
---

参考文献：[稀土掘金](https://juejin.cn/post/7131713973572861966) | ProGit2

## GIT 与 SVN 的区别

SVN 是集中式版本控制系统，其所有的版本管理都是集中在某个中央服务器，因此，在干活的时候，首先都需要从中央服务器中获取最新的版本，修改后将版本推送到中央服务器，因此大多数场景下需要进行联网使用。可能会更依托于相应的图形化客户端来进行同步和版本管理，便于管理美术资源等等。

GIT 是分布式版本管理系统，每个人的电脑就是一个完整的版本库，可以进行独立的版本管理，多人协作可能依托于 github 之类的中继节点，将修改同步给对方，解决冲突。

## Init 初始化

包含 ssh 的详细指令在 ssh 的文档中，这边只介绍设置完这一系列操作之后的 git 初始化，主要是初始化 ssh，并将私钥放到 github 或者 gitee 的账户中。

```shell
git config --global user.name "YourName"
git config --global user.email "YourEmailAdress"

# 查看相关的配置信息
git config --list

# 设置CRLF和LF的相关转换 第一条在提交的时候自动抓换位LF，迁出转换为CRLF
# 第二条拒绝混合换行符的提交
git config --global core.autocrlf true
git config --global core.safecrlf true 
```

### Github 设置

官方文档介绍的一些权限错误的地址：< https://docs.github.com/en/github/authenticating-to-github/error-permission-denied-publickey>

将本机的 ssh 公钥(public)放到 GITHUB 账户下的 ssh 管理地址，执行测试

```shell
ssh -T git@github.com
```

没有问题的话就可以直接进行 clone，之类的 git 操作了

```shell
# 小trick，不拉取历史的commit
git clone --depth=1 REPO_ADRESS
```


### Gitignore 文件编写

参考文件：【 [Git忽略提交规则](https://www.cnblogs.com/kevingrace/p/5690241.html) 】【 [gitignore 各语言模版](https://github.com/github/gitignore) 】

首先创建对应的 `.gitignore` 文件，根据自己的需求编写内容，这里也**推荐**通过 VsCode 的插件或者使用上述仓库中**对应语言的模版文件**来创建初始化 ignore 文件，会包含一些常用的通常无需上传的本地配置或者本地缓存等内容；

```shell
touch .gitignore
```

在覆盖了这些通用的忽略项后，可以根据项目情况添加特有的路径，通常主要包括以下的几类：

- **大文件**：如自用的测试数据等
- **敏感配置文件**：包含了敏感信息的配置项等（这里建议考虑使用 env 等，或者上传对应的 default 文件）
- **日志文件**

### 设置 Git 的代理

设置全局代理使用如下的方式：

```shell
git config --global http.proxy 127.0.0.1:1080
git config --global https.proxy 127.0.0.1:1080
```

同理取消全局代理如下

```shell
git config --global --unset http.proxy  
git config --global --unset https.proxy
```

## 常用指令与架构介绍

Git 整体的使用架构如[下图所示](https://juejin.cn/post/7131713973572861966)，一般而言开发者在工作区进行当前修改，将需要同步或者发布的修改内容通过暂存区存储到本地 & 远程仓库中，结合远程仓库的协作特性和分支功能，可以实现同个项目的多人同步分离开发，同时开发多种功能等。

因此 Git 或者 Svn 等 CLI 的使用技能，在公司中或者在项目参与中是相当重要的，建议每个人程序开发者都能对其有一定的了解。

<div align=center><img src=" https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20221204135313.png" style="zoom: 75%;" ></div>

下面是一些基本的命令使用，其中许多命令都有一些额外的参数可供使用，如果经常使用 Git 建议可以简单阅读一下 **ProGit**。

> 这里会简单记录一些命令，其中那些在 git 使用中会有所提示的命令就不再赘述，例如 pull 别的分支的时候取消 merge 到当前分支的 git merge --abort 之类就会有所提示。

| 普通           | command                          | 分支          | command                  |
| -------------- | -------------------------------- | ------------- | ------------------------ |
| 创建本地 repo   | git init                         | 创建/显示分支 | git branch name        |
| 工作区状态     | git status                       | 切换分支      | git checkout [branch]   |
| 添加到暂存区   | git add /.                       | 切换          | git checkout -b name     |
| 暂存区到本地   | git commit -m ‘mesg’             | 合并分支      | git merge branch       |
| 日志           | git log (–oneline)              | 删除分支      | git branch -d            |
| 拉取远程库     | git pull / git fetch             | 推送本地分支  | git push origin branch |
| 克隆远程库     | git clone                        |               |                          |
| **撤销**       |                                  |  **标签**      |                          |
| 撤销工作区修改 | git checkout – file-name       | 创建标签      | git tag tag-name       |
| 撤销暂存区修改 | git reset HEAD file-name       | 显示所有标签  | git tag                  |
| 撤销本地库修改 | git reset –hard commitID      | 删除标签      | git tag -d tag        |
| **远程**       |                                  | **储藏**      | ·                        |
| 同步本地库和   | git remote add origin xx@y repo | 保存现场      | git stash                |
| 远程库         | git push -u origin master        | 恢复现场      | git stash pop            |

### Commit 规范和相关命令

commit 命令实现将"将暂存区的文件以特定的注释提交到仓库中"，提交的 Message 建议建立统一的规范，这样可以方便后续使用 log 查阅的时候定位到特定修改的 commit。
#### Message Standard 标准提交内容

本人推荐的 Commit Message 格式如下，该格式并非是一成不变的，可以根据仓库中存放的项目类型来灵活变更 Tag 的数量和内容。

```shell
git commit -m "[tag1(modify scope)] [tag2(modify type)]: excatly modify info"
```

- Tag1 (modify scope): 说明修改的内容，泛一些例如修改代码 code，资源 res，细一些则例如修改的文件夹 tool、util
- Tag2（modify type）：说明修改的类型，主要有：`Feat`、`Fix`、`Refactor`、`Style`、`Test`、`Docs`、`Merge`，如果修改的是资源等文件可以忽略。
- Modify info：修改的详细信息，说明修改的目的和修改的内容即可

例如以下的几个写法：

```shell
git commit -m "[res]: add presonal conf file"
git commit -m "[code-util][Feat]: add function to parser conf file"
git commit -m "[code & res][Feat & Fix]: add function for merge conf, fix bug on parser conf, add my conf resource"
```

该部分没有什么硬性要求，只需要自己能够清晰的看懂自己的 commit 且具备一致性即可。

#### Extra Operation 撤销、重写、合并

> 有时候针对已经提交的 Commit 不满意，或者有一些新的更改需要添加到上一次的 Commit 中，可以参考下面的操作。

**撤销** Commit 或者**重写** Commit Message

```shell
git reset --soft HEAD^  # 撤销当前commit
git commit --amend      # 重写当前commit
```

**合并多次 Commit**：通过 rebase 命令来进行 merge，该命令通过整理多次的 Commit 来使得整个提交历史更为整洁有序，但是需要额外的精力去整理就是。具体的操作流程如下：

1. 首先查看 commit 的 hash
   
```shell
git log
```

2. 找到需要修改的 commit 的**前一个** commit 的 ID
   
```shell
# 找到需要合并的最早commit的上一个的ID
git rebase -i <ID>

# 也可以使用以下命令合并header往前多少n次的commit
git rebase -i HEAD~n
```

- square：将该次 commit 和上一次 commit 合并
- pick：保留该次 commit

通过修改 commit 提交界面的 square 和 pick 即可实现多次 commit 的合并。

### History 历史查看

查看当前分支的提交历史只需要通过 `git log` 即可看到基本的提交信息，这里简要介绍一些参数来帮助更清晰的定位 commit

- `git log -p -{n}`: 参数 `-p` 以 diff 的形式在显示基本提交信息的基础上还显示该提交的具体修改内容，由于内容较多；可以通过 `-{n}` 仅显示最近 n 次提交的内容
- `git log --stat` ：参数 `--stat` 显示每次提交的统计信息，包含修改的文件以及对该文件修改的行数的统计信息
- `git log --graph`： 参数 `--graph` 会使用简单的 ASCII 图像来可视化提交之间的分支关系，也就是 vscode 中 gitgraph 的命令行版本，可以帮助了解提交之间的合并和起始提交等信息

此外还有诸如 `--pretty` 等参数可以自定义 log 显示的具体格式，需要的话可以参阅 progit 或者官方文档进行了解。

### Add 一些额外操作

Add 命令主要将修改的内容提交到暂存区，不仅可以作为我们一次次的中间存储节点，也是为后续的提交做缓冲，但是难免会遇到以下的情况：

- 提交错文件或者修改了结构需要将一个或者多个文件从暂存区中撤退出来；
- 清除工作区中不需要提交的临时文件

如果是撤销所有提交的文件：

```shell
git reset HEAD .
```

撤销特定文件的提交

```shell
git reset HEAD <file>
```

以上两个命令不需要记录，只需要使用 `git status` 查看当前状态的时候会有提示。

清除工作区中不需要提交的临时文件，可以使用以下的命令

```shell
git clean -nf # 查看会被清除的未追踪文件
git clean -f  # 清除未追踪的文件
```

如果涉及到文件夹可以添加参数 d

```shell
git clean -ndf # 查看会被清除的未追踪文件和文件夹
git clean -fd  # 实际执行清除指令
```

其中-n 参数为查看而不实际执行的参数，避免文件的误删。具体可以通过 `git help clean` 查看。

### CherryPick 挑选 Commit

> 仅简要介绍其作用，详细使用等后续有使用场景再来补充。

Git CherryPick 命令实现从别的分支挑**选某个 Commit 的修改合并到当前分支中**，该命令在一些提交数少的分支中，可以代替 merge，实现一个更为线性整洁的 Master 分支。

可以结合 Rebase 合并提交使用，由此得到一个更为干净的提交历史。

## 暂存区 & Stash

暂存区指的是 git add. 后存储到的区域，用来作为本地和仓库之间的缓存。

### 暂存区处理

清除暂存区某个文件的指令（通常是为了修改.gitignore）的时候执行

```shell
git rm -r --cache filename
```

看暂存区有什么文件

```shell
git ls-files
git status
```

### stash 区域使用

是一个特殊的区域，本地的 git 存储区，一般来说使用场景较少，例如以下的场景。

>本地改了代码，但是突然有个人过来问你另一个分支的问题，同时这个时候你在实现某个功能，实现一半，又不想提交到 Git 仓库中，那么你就可以考虑使用 `git stash save "临时存一下"`，这个时候它就会帮你存到这个储存区，你去其他分支做完事情回来，再 `git stash pop`就好了。

主要使用的就是以下的几个命令：

- `git stash save "message"` 将当前的修改暂存
- `git stash list` 查看暂存了哪些修改
- `git pop ` 默认使用存储的堆栈中的第一个 stash
- `git stash apply stash@{n}` 使用第 n+1 个 stash，n 从 0 开始。

一般建议是不要使用太多的 stash，这样一个 save 和一个 pop 命令就可以 handle 。

> 如果 pop 操作导致冲突，希望撤销 `git stash pop` 行为，可以使用 `git reset --hard` 回退当前修改，该操作会保留 pop 出来的修改仍然在 stash 中。

## 一些 Git 工作流介绍

### 使用 Git Rebase 保持简洁的 History

参考资料： [优雅且安全的使用 GitRebase]( https://www.cnblogs.com/FraserYu/p/11192840.html ) 

> 前文已经介绍过了 git rebase 用于合并 merge 的功能，这里主要介绍的是 git rebase 在分支合并中的作用，何时在分支管理中使用 git rebase 取代 git merge 来进行分支合并。

git merge 是一种非破坏性的操作，当我们使用 git merge 进行分支合并的时候，会提供一个新的 commit ，其内容为两个分支的合并提交，这也是与 rebase 最大的区别。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20240804121843.png)

rebase 正如其单词所言，re-base，重构我们的 base，我们可以使用下面的命令将 master 分之合并到我们的 dev 分支中：

```bash
git checkout dev
git rebase master
```

这会将我们的 dev 分支的新增内容移动到 master 分支之后，相当于重新构建了 dev 分支上的每个 commit，将其在新的 master 之后再合入。

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/mac/20240804122136.png)

使用这种方式的话，项目的历史记录会更为线性，会使得分支的提交历史更加整洁，没有不必要的合并提交，考虑到可能在开发过程中我们可能会多次需要更新 master 分支的内容，这样能让我们的更新更加容易追溯和复原。

此外正如合并多次 commit 的操作，使用 -i 可以开启 rebase 的交互模式，交互模式中我们就可以将多次提交浓缩为单次提交(squash)，或者合并某两个连续的提交(fixup)。

> tips: 如果需要一次性将从 master 分出来的 dev 上的第一个提交到最后一个 dev 上的提交合并，避免用 Head~n 去数，或者手动去找对应的 commitID，也可以用 `git merge-base dev master`  代替，这里的 master 就是你的切出 dev 的原始分支，不一定是 master。

但是由于 rebase 操作是一个破坏性的操作，会修改我们之前的每次原始提交，因此在使用的时候需要慎重，遵循 rebase 使用的法则：**永远不要再公共分支上使用它**，在公共分支使用会导致所有人的原始 master 和远端无法对齐，导致一系列问题。

但是如果别人同样在远程开发 dev 分支，我们 fetch 后同样可以考虑使用 merge 或者 rebase 更新 dev 分支本身，因为这只影响了我们 local 端的后续提交。BTW，`git pull --rebase` 可以强制使用 rebase 的方式来集成远程分支。

最终开发完成后，使用 rebase 更新分支上 master 的内容，再去 master 上 merge，会产生最好的线性历史记录，也确保不会影响他人的开发：

```bash
git checkout dev
git rebase master
git checkout master
git merge dev
git push origin master:master
```

如果不确定 rebase 的使用是否正确，可以复制一个临时分支来执行 rebase，如果不小心搞乱了，还可以有原始的分支来复原。

### 使用 Git Merge --squash 保持简洁 History

除了上述使用 rebase 将分支上的 commit 逐个移动到 master 分支之后，进而维持 master 上的线性提交历史，上述还提到可以使用 rebase 合并多次 commit 后进行提交，但由于 rebase 本身会改变开发分支，所以实际上更推荐仅在 Merge 的时候进行分支上的 commit 合并（例如开发分支上的 commit 较为随意的情况），这种情况下可以在 rebase 的时候使用-i 操作或者使用 `git merge --squash {branch} ` 进行 merge


### 远程协作

考虑多用户，多分支的在线场景，如何有效的 Pull & Push.

#### 在本地仓库切换默认提交用户

在多用户的终端场景，推送前记得切换相关的用户设置。

```shell
git config --local user.name "YourName"
git config --local user.emali "YourEmail"
```

#### 推送、拉取远程分支

  ```shell
  # 冒号前本地，冒号后远程，
git push origin local_branch:remote_branch
git pull origin remote_branch:local_branch
  ```

#### 仅 Clone 指定分支

```shell
git clone -b {branch} {rep}
```

#### 拉取代码解决冲突

git fetch 实际上 pull = fetch + merge，可以解决完冲突再进行代码提交，相对 pull 更安全，结合 Vscode 中的 Gitgraph 等，用于解决冲突和验证修改方面更为安全简单。

  ```shell
git fetch
git log -p FETCH_HEAD
git merge FETCH_HEAD
  ```

通过使用 Stash 的方式，同样可以避免再拉取远程代码的时候不覆盖本地的代码，灵活选用吧，一般情况下使用 fetch 已经足够。
## 一些工具

一些好用的 CLI（命令行工具）和 VsCode 插件推荐：

- [Lazygit](https://github.com/jesseduffield/lazygit)（命令行工具，带一个比较酷炫的 GUI）
- Gitlens（VsCode）：在编辑界面显示每行代码的提交者，丰富 github 的 git 拓展选项
- Gitgraph（VsCode）：方便查看每次 commit 的修改内容，用对比窗口显示，便于发现冲突解决和修改内容
- Beyond Compare（差异对比工具）：类似 diff 命令，非常好用的对比和修改不同版本的文件，文件夹之间的差异。
- Win Merge （差异对比工具）： BC 的免费替代品，基本上是足够使用的。
- 还有一些诸如 tortoise 和 github 客户端等图形界面也可供尝试

## Troubleshooting

### 从 Commit 中删除大文件

避免.git 目录占用过多存储，这一部分写的有点小瑕疵，到时候就看超链接

[郑宇](https://www.zhihu.com/question/29769130/answer/315745139)；主要是要将大文件排除追踪，在 push 之前都还是比较好解决的，但是如果已经提交上去了就稍微比较麻烦，尝试将其中的大文件删掉。

```shell
# 1. 运行gc，生成pack文件`–prune = now` 表示对所有的文件都做修剪
git gc --prune=now

# 2. 找出最大的k个文件，以3为例
git verify -pack -v .git/objects/pack/*.idx |sort -k -3 -n |tail -3

# bug: cannot open ///bad ..
# 可能是由于地址出错了，修改地址，如下是查看地址的代码
find .git/objects/ -type -f

# 3. 查看那些大文件究竟是谁，按照上一步输出的hash value 进行搜索，（不用全长）
git rev-list --objects --all |grep <hashvalue>

# 4. 移除对该文件的追踪引用
git filter-branch --force --index-filter "git rm --cache --ignore-unmatch '<FILENAME HERER>'" --prune-empty --tag-name-filter cat -- --all

# 5. 进行repack
git for-each-ref --format='delete %(refname)' refs/original | git update-ref --stdin
git reflog expire --expire=now --all
git gc --prune=now

# 6. 查看pack的空间使用情况
git count-objects -v

# 7. 强制推送重构大文件
git push origin local-b:remote-b --force
```

### 连接问题

1. **openssl error 10054**

```shell
 git config --global http.postBuffer 524288000
```

2. **time out port443**

just wait for some time，应该是代理的问题，不行就使用国行版 github 把

3. **server certificate verification failed. CAfile**

使用`github.com.cnpmjs.org`国内镜像站的时候，可能会出现权限的问题，这种情况下就要对 git 的证书验证命令做调整，有两种策略，执行其中一种：

```bash
git config --global http.sshverify false
```

```bash
# carry out in the 
export GIT_SSL_NO_VERIFY=1
```

之后我们就可以正常的使用镜像站对原有的 repo 进行更新和拉取了，比如说 omz update.

## ToBeContinue

- Git Rebase专题：[GIt Merge和Git Rebase的区别](https://juejin.cn/post/7123826435357147166)
- Git Reset 和 Git Cherrypick 专题：[紧急修复](https://juejin.cn/post/7131713973572861966)
- Git tag 专题开发标签