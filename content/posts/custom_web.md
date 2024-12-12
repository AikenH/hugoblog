---
calendar_date: 2022-10-02
catalog: true
categories:
- Web
cover:
  image: /cover/cover5.jpeg
date: 2022-10-02 18:00:00
lang: cn
mathjax: false
password: aikenhong_blog
subtitle: build your website by django and vue, save info in mysql
tags:
- Vue
- Django
- Mysql
thumbnail: /img/header_img/lml_bg5.jpg
title: 一次基于Vue和Django的前后端开发实践
toc: true
---

{{% hugo-encryptor "aikenhong_blog" %}} 
@Aikenhong 2022 介绍基于Tdesign和Django的界面安装和前后端联调，ubuntu version，

该文章首先介绍如何配置环境，后续基于现有项目来介绍如何从零来构建基本的网页和后端服务。



## 基本信息

（已完成）下载编写好的网页压缩包：web-design，里面包含了vue和django模块。

路径两种方式打开：

1. （命令行） `cd ~/workspace/web_design_group10/`
2. （资源管理器）主目录下的workspace/web_design_group10

编辑代码方式：

1. 使用vscode打开该文件夹进行编辑

### 启动服务

（以下的操作都分别基于web_design_group10路径）完整的网页启动需要分别启动前后端的服务，并均保持开启状态，所以需要使用两个终端窗口来分别启动。

1. 前端服务：在view-design路径下使用命令:`npm run dev`，可参考VUE启动
2. 后端服务：在vuebackend页面使用命令：

```bash
python manager.py runserver
```

（python版本需要是3以上）

3. 数据库服务：数据库安装后好像是默认启动的，如果发现有数据库的错误，按照ubuntu 启动mysql执行。


在启动服务之前，有一些环境需要配置，接下来我们将描述初始的环境准备。

## 环境配置（Ubuntu）

配置主要有几个部分组成：配置前端环境（vue、node）、配置数据库（mysql）、配置后端（python包），我们首先描述前端环境的配置。

**特定项目迁移：**只需要安装node和NPM，然后再对应目录npm i即可

**初始化一个项目：**安装完node、npm之后，安装vue和tdesign，参考对应的官方文档即可，（npm install）

### 前端环境配置

前端项目基于NodeJS，所以我们需要首先安装Node和NPM，在Ubuntu中安装Node的命令如下：

```bash
# 首先更新NOdejs的软件源，基于基于需要的版本修改其中的版本号 14/16

# 接着使用apt命令下载nodejs 和 npm
sudo apt-get install npm, nodejs

# 查看版本验证安装是否成功
node -V
npm -V
```

接着对特定前端（NodeJS）项目安装依赖

```bash
cd /web-design-group10/view-design
# 执行如下命令可直接根据项目的进行package的安装
# npm install 可以简写为 npm i
npm install
```

安装完基本依赖后，即可启动前端服务看看页面是否正常运行，默认的访问路径是localhost:3001

```bash
# 启动前端项目在view-design目录下
npm run dev 
# 启动后可以看到对应的端口和ip（建议首先使用localhost对前后端进行调试）
```

启动服务后可以边修改页面边预览效果（感觉不对劲就手动重启下，有时候响应会出现问题）

### MySQL环境配置

由于Django（后面我们会讲）将诸多对于数据库，例如MySQL的操作都集成成了Python语句，所以对于MySQL配置的部分，我们只需要做如下的准备：

**安装MySQL** -> **初始化MySQL（设置密码）**->**为后端创建一个初始的数据库** -> **在DJango**中做好对应的设置。

在Ubuntu上安装mysql：

```bash
# install mysql(in ubuntu)
sudo apt-get install mysql-client
sudo apt-get install mysql-server
```

初始化MySQL（设置密码）：

```bash
# 进入mysql
sudo mysql
```

进入mysql之后，通过设置基本的密码来初始化sql的服务（执行别的命令之前我们需要该密码）

```sql
mysql> 
alter user 'root'@'localhost' indentify with mysql_native_password by 'passwd@of@my';

# 退出mysql数据库，验证是否正确初始化
mysql>
exit;
```

​	上述命令中，密码的小引号不能省略

接着验证密码：

```bash
mysql -u root -p
# 输入密码，如果正确的话会进入数据库，到这里已经可以了，我们开始创建后续django使用的数据库
# 通过show databases; 可以查看现在创建好的所有数据库
```

创建项目所需的数据库（建议和项目文件夹同名，方便记忆）

```mysql
# 创建数据库并设定utf8编码，避免编码问题
mysql>
create database <project-name> character set utf8;
# 使用show databass查看是否正确创建
mysql>
show databases;
# 使用use <database-name> 进入对应的数据库
mysql>
use <databases-name>;
# 使用show tables查看已经创建好的表格
mysql>
show tables;
```

到这里对于数据库的配置就告一段落，后续只需要在Django中设置如下的内容即可：

- 使用的数据库架构（mysql or else）
- 使用的具体数据库，（我们为后端创建的那个）
- 数据库的访问密码

之后就可以在Django的python代码中执行常见的数据库操作来进行响应的增删改查。

**参考链接**：[install](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04)、[刘江](https://www.liujiangblog.com/course/django/165)

### Django环境配置（with mysql）

[Django](https://docs.djangoproject.com/zh-hans/4.1/)作为Python的一个库（Lib）安装过程实际上是配置一个python环境，这里主要考虑到结合mysql需要安装一些额外的库和设置，同样，会分成以下的几步：

**安装Django**->**安装Django-Mysql需要的库**->**建立Django和mysql连接**（填写上面提到的密码等）->**初始化项目**

1. **安装Django**

```bash
# 如果没有pip的话试试pip3，如果是pip3安装的，最后启动服务的时候要记得用python3来启动
pip install django
```

2. **安装mysqlclient**

```bash
pip install mysqlclient
```

3. **创建一个空的Django项目**：

（cd）移动到一个我们放置项目的空目录（忽略<>），就会创建一个my-project-name的项目：

```bash
django-admin startproject <my-project-name>
```

其文件结构如下（具体作用解析：https://docs.djangoproject.com/zh-hans/4.1/intro/tutorial01/）：

```bash
mysite/
    manage.py
    mysite/
        __init__.py
        settings.py
        urls.py         # 接口的路由管理,也就是我们的接口在哪边访问
        asgi.py
        wsgi.py
```

创建一个具体的“APP”，又被称作**应用**，这里的**应用**和上面创建的**项目**的区别在于（摘自官网）：

> 项目和应用有什么区别？应用是一个专门做某件事的网络应用程序——比如博客系统，或者公共记录的数据库，或者小型的投票程序。项目则是一个网站使用的配置和应用的集合。项目可以包含很多个应用。应用可以被很多个项目使用。

个人讲项目理解为项目，主要提供Django的基本功能和设置环境；应用则是我们进行具体功能开发的主要地方，比如我们这里创建一个webapi的应用，用来编写特定网站需要的所有接口：

```bash
# 初始化APP
python manager.py startapp webapi
```

Django会创建路径如下：

```bash
webapi/
    __init__.py 
    admin.py            # 包含django管理界面的设置
    apps.py             # 包含webapi配置的设置
    migrations/
        __init__.py
    models.py            # 定义数据库中的表
    tests.py
    views.py             # 定义API
```

创建完APP（应用后），我们需要在项目的设置中安装

```bash
vim vuebackend/vuebackend/setting.py
```

找到INSTALLED_APPS字段，添加创建的APP，最终如下：

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'webapi',
]
```

4. **启动项目**

```bash
python manage.py runserver
# 如果希望除了localhost都能访问启动的时候可以监听所有的ip
# 然后在allow url中填上自己的ip
python manager.py runserver 0.0.0.0:8000
```

5. **安装其他依赖项**（启动项目，缺啥就pip install啥，搞定后关掉）

如果不需要数据库的话到这里就已经可以了，如果需要数据库的话，我们继续往下看。

6. **建立和数据库的连接**

```bash
vim vuebackend/vuebackend/setting.py
```

​	修改其中的DATABASES字段如下：

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'vuebackend',
        'USER': 'root',
        'PASSWORD': '__',
        'HOST': '127.0.0.1',
        'PORT': '3306',
    }
}
```

- ENGINE，如果是mysql的引擎就填这个，别的数据去再去看，

- NAME：mysql中为后端创建的数据库的名称

- USER：直接使用root用户，

- PASSWORD：我们初始化mysql时设置的密码

- HOST：127.0.0.1 指代本机

- PORT：3306为mysql默认的启动端口

7. **测试数据库功能**

Django中model.py编写的内容，Django会用其自身的形式进行“包装”（封装），转换成对应的数据库操作，然后在数据库中执行对应的命令。（好像被称作ORM）

而我们主要用到的功能是：创建类，会自动在数据库中生成表格，其中支持的数据类型可以在[官网中找到参考](https://docs.djangoproject.com/zh-hans/4.1/ref/models/fields/)。

```python
from django.db import models
# Create your models here.


class Gamerecords(models.Model):
    """
    the table for saving abs and the create info
    """

    m_id = models.AutoField(primary_key=True)
    game_name = models.CharField(max_length = 150)
    author = models.CharField(max_length = 150)
    file_type = models.CharField(max_length = 150, default="Java")
    create_time = models.DateTimeField()   # 对应python中的Datetime类型

```

定义之后，命令行执行命令，将这些字段映射成数据库中的一张表，下述命令执行数据库操作

```bash
python manage.py makemigrations (应用名，选填)
python manage.py migrate (应用名，选填)
python manager.py runserver 启动服务
```

执行完后可以去mysql对应的数据库中，使用show tables查看是否新建表成功。

然后照常启动后端服务。

参考链接：[offical with mysql](https://docs.djangoproject.com/zh-hans/4.1/ref/databases/)、[simple start with mysql](https://blog.csdn.net/diligentkong/article/details/79129820)

8. 配置跨域便于和vue项目链接：需要安装`django-cors-headers`模块，并在设置setting.py中导入

```bash
pip install django-cors-headers
```

然后在项目中添加模块：

```python
# books_demo/settings.py
INSTALLED_APPS = [
    ...
    # demo
    'corsheaders',
    ...
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware', # 需注意与其他中间件顺序，这里放在最前面即可
    ...
]

# 支持跨域配置开始
CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True 
```



## 开发指南

开发界面会基于如下的几个部分进行描述：**前端开发**、**后端开发**、**前后端联通**，每一部分的开发会从一个空项目开始，以现有的代码为例，来介绍各个部分的开发和联通。最后给出一个从0开始设计前端模块、后端功能、前后端传输的Task（demo）。其中也会介绍最raw的debug方式。

一些不错的参考链接：[前后端从零开始构建流程demo，包含使用curl测试api](https://juejin.cn/post/6974565289484615693#heading-3)、[也是前后端搭建的Demo](https://developer.aliyun.com/article/932995)

## VUE和Tdesign前端开发

前端部分由于个人能力有限，仅了解到代码结构的大体构筑，和如何修改，因此不做从零开始的参数，仅以自己的认知去介绍如何修改代码，以及各个模块的交互方式介绍。

参考链接：[页面外观配置](https://tdesign.tencent.com/starter/docs/vue/custom-config)、[vue中引入html界面](https://blog.csdn.net/qq_18671415/article/details/119118905)

[必看！！！核心配置，整体的文件逻辑](https://tdesign.tencent.com/starter/docs/vue/develop)

具体介绍模块：**代码结构**、**路由结构（如何删除页面的路由，对应的页面在什么地方）**、**页面的简单设计逻辑**、**页面之间的跳转**


前端的代码我们基本上只关注`src`路径下的代码，所有的页面和逻辑基本都在其中：

整体的架构参考上面的链接，我们主要关注的是以下几个文件夹：

page: 存放所有的页面
router： 存放路由跳转逻辑，其中index.js中*定义了默认的主页，其他文件中，定义页面的具体url，[参考链接](https://tdesign.tencent.com/starter/docs/vue/router-menu)

### 页面的组成

可以参考page中的每个文件夹，核心就是：每个index.vue是一个页面。

每个页面基本有三个部分组成：

```vue
<tempalte>
	样式布局，也就是基本的外观，按钮，乱七八糟的，去tdesign vue之类的网站上找模版，进行组合即可
</tempalte>

<script>
  
  export default{
    data
    	初始化和设置各种变量
  	created
    	里面的函数在页面创建的时候执行
  	mounted
  		里面的函数在页面挂载时候执行
		method
  		定义的各种奇奇怪怪的函数，与后端交互的函数，
  }

</script>

<style>
  定义一些加粗之类的样式，用来对template的的基本组件进行加工
</style>
```

其中script中各个部分里面放的函数在不同时候执行：生命周期可以参考https://juejin.cn/post/6874855535234170887，其实就是字面意思，在创建页面之前执行beforecreate啥的（大概意思，具体我也没有太了解）。

method里面就是单纯的函数定义，我们的上传之类的交互代码可以放在这里，然后把函数：

1. 绑定到按下按钮等事件上或者
2. 绑定到（放到）某些生命周期中，比如创建页面的时候执行一次，或者页面挂载的时候执行一次之类的

### 页面的跳转（结果页跳转之类）

我实现的**逻辑（Pipeline）**是这样的：

（前置）跳转到的页面需要再router中注册过 -> 编写一个函数，按下以后跳转到对应的页面，并传递一个id->跳转到的页面打开的时候读取id，读取数据。

**router的注册**

在router那个路径，我不确定是path还是name,还是重定向地址，反正调试的时候试试

```tsx
	{
		"path": "modelbase",
		"name": "modelbase",
		"component": () => import("@/pages/list/modelbase/index.vue"),
		"meta": {
			"title": "上传模型"
		}
	},
```

**页面跳转的函数**

Router.push就会跳转到对应的页面,name页面名字，query就是传递过去的参数

参考commandtable.vue，row是列表中的参数，代表列表中的某一项，

```js
    handleClickDetail( row ) {
      const m_id_detail = row['row'].m_id;
      this.$router.push({ name: 'modelbase', query: { ids: m_id_detail } });
    },

```

**跳转过去的页面加载参数**

根据传递过来的参数生成相应的数据用来展示，或者二次跳转？

跳转过去的页面，在生成的生命周期中，使用whtch方法，route传递过来的参数以变化我们就执行下面的函数。

```js

  created() {
    this.$watch(() => this.$route.query, (to_params, old_params) => {
      console.log(this.$route.query);
      this.gettaskinfo();  // your function here  using the route.query中的参数
      console.log(this.$route.query);
    });
  },

```

然后生成对应的报告之类的

参考文献：[详情页](https://blog.csdn.net/weixin_46547740/article/details/109254290)

关键词：vue详情页 商品页之类

### 文件传输前端接口的编写

该部分的编写依托于`elementui`或者`tdesign`的`upload`组件封装

其基本的编写逻辑如下：

- `action`中填写我们编写的后端接口url

- `formatResponse`中填写对后端返回值的格式处理，用以适应组件识别传输事件是否成功

  1. 参考 suceess和fail事件的触发条件，用来编写format
  2. tdesign事件是在response中添加url信息和如果失败的话就用error字段传回失败原因

  ```js
  return {...res, url: xxx.xxx.xxx.xxx:xxxx, error : "why you fail"}
  ```

- 即可在可视化组件上绑定对应的文件上传

### 静态HTML页面加载

再编写前端页面的时候，有时候需要处理后端生成的html页面，我们希望能够跳转到指定的html文件的。

1. 需要将HTML作为静态文件存储到VUE project中静态目录（`public`）中（防止VUE对HTML文件进行二次编译处理）
2. 假如我们存储的目录为：`public/result/index.html`我们可以在vue中通过下列函数打开对应页面

函数如下:

```js
loadLocalHtml(){
  windows.open('/result/index.html');
}
```

如果需要灵活加载详情页面，我们可以根据传入的参数来确定最后存储的地址（或者在后端对文件进行移动）

### 前后端的联通

同样也是在mehtod中定义一个访问接口的方法，然后在合适的时候调用这个访问接口的函数就行。放在下面的前后端联动的部分


## Django后端开发

实现基础功能的话，后端的逻辑和实现相对较为简单，本文介绍：开发api的流程（将自己的功能嵌入）、提供对数据库进行**增删改查**的例子、提供**文件传输**api的例子。文件传输好像有更优的解法，后续进行更新

**后端开发Pipeline**

（optional）`model.py`设计数据表 -> `view`中设计api（数据获取，数据上传等任何功能）->注册api到特定的url->测试api->done.

1. 如果有数据库需求才使用，可以简单的存储（用户，时间，存储html路径，语言类型，项目名称等）
2. view中有特定的八股文，下面为会讲到特定的`<func>`占位部分，填入自己的功能，实现：**根据传来的数据或者GET请求，执行特定的操作，返回特定信息（不返回也行）**的流程即可。
3. 将该域名注册个特定的api，便于访问该api

### 数据表设计

参考上述的例子（环境配置-Django-6数据库测试），在`model.py`文件中创建一个类，定义需要的表结构，然后执行两部数据库操作即可：

下面给出一个Coverage-Test的上传信息类设计Demo：

```python
from django.db import models

Class CoverageInfo(models.Model):
  m_id = models.AutoField(primary_key=True)
  task_name = models.CharField(max_length = 150, default = "coverage test")
  author = models.CharField(max_length = 150, default = "anmous")
  create_time = models.DateTimeField()
  lang_type = models.CharField(max_length = 150, default = "JAVA")
  res_path = models.CharField(max_length = 1000, defailt = "~/workspace/coverage-res/author_default/")
  code_path = models.CharField(max_length = 1000, default = '~/workspace/coverage-code/author_default/')
```

该Table的处理逻辑如下：

- task_name、author、lang_type交由前端用户填写，传递到后端；
- m_id为mysql自动递增的数据逻辑我们无需处理，create_time在后端接受请求的时候自动计算
- res_path在执行完覆盖率测试后，将文件存储指定定地点，然后将该地点返回，将该地点存进数据库，这样我们就可以随时查询任一个记录的覆盖率结果。

将这些信息存入数据库，便于增删改查，文件和结果则存储本地。

**mysql中生成表**

```bash
python manage.py makemigrations 
python manage.py migrate
```

### API设计

主要从前端接受两种请求：GET、POST，然后基于这两种请求，我们实现对数据增删改查的操作，或者其他的特定操作。API的定义在`views.py`中完成。基础的范式如下：

需要注意的是，前后端之间的数据传输，基本都是约定为JSON这种KEY-VALUE格式的，故而我们好像需要进行什么序列化反序列化的操作，来对信息进行解读（理论后续补充）

```python
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.core import serializers

@require_http_methods(['GET'])
def get_games_index(request):
    response = {}
    try:
      
      # using get to get value from front ---->
      receive = {}
      reveive['info1'] = request.GET.get('info1')
      ... # like that ， 应该也可以循环取出
      # <----- using get to get value from front 

      
      
      # your function here 「-----------------
      # 基于我们从前端获取到的数据，做任何事情，执行任何函数
      # -------------- your function here 」

      
      
      # 可以给前端返回一些数据 response['res'] = ... 之类的,传过去之前要对数据进行序列话处理
      # yourdata需要时{}存kv形式
      response['res'] = json.loads(serializers.serialize("json", yourdata))

      
      
      response['msg'] = 'success'
      response['error_num'] = 0

    except Exception as e:
      response['msg'] = str(e)
      response['error_num'] = 1

      return JsonResponse(response)

```

（带文件的post会比较特殊，后面在例子里面单独讲）POST例子和GET例子主要的区别在于：获取传递过来的数据的方式不同，注意这里的JSON.loads。

```python
@require_http_methods(["POST"])
def get_info_games(request):
      response = {}
    try:
      
      
      # 获取前端post过来的文件什么的
      post_message = json.loads(request.body)
      # 获取前端post过来的参数什么的还是使用get
      reveive['params'] = request.GET.get('params')
      
      
      games = json.loads(serializers.serialize("json", games))
      response['games'] = games
      response['mag'] = 'success'
      response['error_num'] = 0
      
    except Exception as e:
      response['msg'] = str(e)
      response['error_num'] = 1

      return JsonResponse(response)
```

#### 增删改查demo

以上述设计的coverage_test表格为例子，“增删改查”实际上都是对数据库进行的操作，因此实际上的操作范例都较为相似，下面废话不多说，直接给出demo进行讲解。

```python
# 增：实际上就是获取数据（post），将数据存储进数据库中，所以我们首先使用post协议，在根据上述的八股文，用json.load(request.body)获取post传过来的数据，其表现为字典的形式。
# 由于文件传输的类型是2进制数据流，没办法用json load，所以和普通的post处理比较不同，我们后面讲，这里先讲基本的post。
from models import CoverageInfo

@require_http_methods(["POST"])
def update_task(request):
    response = {}
    try:
        post_message = json.loads(request.body)
        # print(post_message)
        # 讲数据存进我们定义的类结构中。
        tasks = CoverageInfo(task_name = post_message['task_name'],
                            author = post_message['author'],
                            lang_type = post_message['lang_type'],
                            create_time = datetime.datetime.now(),
                            )
        # 使用save命令将其存进数据库中
        task.save()
        
        #可以返回一下我们存储起来的数据
        response['task'] = json.loads(serializers.serialize("json", games))

        response['mag'] = 'success'
        response['error_num'] = 0
    except Exception as e:
        response['msg'] = str(e)
        response['error_num'] = 2

    return JsonResponse(response)
```

删除/修改/查询，实际上是类似的，都是先找到然后再进行操作，这里一并讲了

```python
# 显示近期的5个task
@require_http_methods(['GET'])
def recent_tasks(request):

    response = {}
    num_to_show = 5
    try:
      	# .objects.filter()会返回符合filter条件的所有记录，如果是空的就会返回所有
        # 所以删，改，查，就是从前端传递一个id回来，然后我们用filter找到他，然后print、覆盖、删除。
        tasks = CoverageInfo.objects.filter()
        response['tasks'] = json.loads(serializers.serialize("json", models))
        response['tasks'] = response['tasks'][-num_to_show:]
        # print(response['models'])
        response['msg'] = 'success'
        response['error_num'] = 0
    except Exception as e:
        response['msg'] = str(e)
        response['error_num'] = 1

    return JsonResponse(response)
```

删、改、查，（使用get方法用参数来找到就行了）

```python
@require_http_methods(["GET"])
def delete_models(request):

    response = {}
    try:
      
        get_id = request.GET.get("ID") # ID是在前端定义好的传回来的key，随便定啥都行
        # 查询
        results = CoverageInfo.objects.filter(m_id = get_id)
        # 删除
        CoverageInfo.objects.filter(m_id=get_id).delete()
        # 修改（基于查询那一步）
        results.author = request.GET.get('Author')
        ... # 重复操作每一条属性
        
        response['mag'] = 'success'
        response['error_num'] = 0
    except Exception as e:
        response['msg'] = str(e)
        response['error_num'] = 1

    return JsonResponse(response)

```

#### 文件接受API demo

由于我这边还没有完全掌握文件传输的方法，这里我的实现会和基本的post方法获取有一点区分，下面讲解文件传输的后端操作：

```python
@require_http_methods(['POST'])
def accept_code_file(request): # 原版test_api

    response = {}
    # （存在本地）定义一个存储文件的基本地址，（本地先新建这个目录）
    base_path = "/data/home/metis/workspace/code_file"
    try:
      	# 用作者名来管理文件的存储地址
        author_name = request.GET.get('author')
        if not author_name: 
            author_name = 'tmp'
        # 把地址和提交者名拼起来，没有的话新建文件夹
        real_path = os.path.join(base_path, author_name)
        if not os.path.exists(real_path):
            os.mkdir(real_path)
        
        # 循环存储传过来的所有文件
        for filename, file in request.FILES.items():
            print(filename, file)
            tmp = file.read() # 文件的二进制数据流，也就是实际要存下来的数据
            newfilename = random_filename(file.name) # 可以对文件名进行简单的处理
            final_path = os.path.join(real_path, newfilename) # 拼接地址
            print(final_path)
            # 讲文件存起来(使用chunk便于大文件的断点续传，避免大文件传输出现问题)
            # (TBD) 测试验证是否正确 （可能需要使用request.FILES['file']替代后面的file.chunks）
            with open(final_path, 'wb') as f:
                for chunk in file.chunks():
                  f.write(chunk)
            # 小文件传输的例子
            with open(final_path, 'wb') as f:
             		f.save(tmp)
                 
        
        # 获取代码的类型,执行对应的代码,生成html文件,返回文件的地址
        lang_type = request.GET.get('lang_type')
        # 逻辑是这样，如果处理覆盖率的时间比较长，可能要在后台跑，这个研究下怎么处理。
        # 关键词 Django后台、Django多线程、还没查好，先放一些参考资料，可能就是用一个线程来执行任务
        # https://www.tioit.cc/index.php/archives/6/
        # https://zhuaxia.xyz/detail/11847
        
        html_path = coverage_test(final_path, lang_type)
        
        # 建立数据库词条，可以新增一条代码存储的路径(数据)
        tasks = CoverageInfo(
          									task_name = request.GET.get('task_name'),
                            author = request.GET.get('author'),
                            lang_type = request.GET.get('lang_type'),
                            create_time = datetime.datetime.now(),
                            res_path = request.GET.get('html_path'),
          									code_path = final_path,
                            )
        task.save() # 将词条存进数据库里。
        response['task'] = json.loads(serializers.serialize("json", tasks))
        response['msg'] = 'success'
        response['error_num'] = 0
    except Exception as e:
        response['msg'] = str(e)
        response['error_num'] = 1

    return JsonResponse(response)
```

**注意pipeline**写完接口后要去注册url。

### API注册

首先将我们的所有api都注册到/api/（可以自己改） 下面：在项目（vuebackend）的`urls.py`配置文件（这个可能是自己生成或者默认的）

```bash
"""vuebackend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
import vueapi.urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(vueapi.urls)),   # 改这里可以了（就初始化的时候改一下就行）
]
```

然后注册我们的每个API具体的地址`/api/<specifal>`中

```python
# from django.urls import path, re_path
from django.urls import re_path
from . import views

urlpatterns = [
    re_path(r'accept_code_file$', views.accept_code_file),
    
]
```

注册完成后可以用curl命令测试api

**命令行使用curl命令测试API**

1. 测试get

```bash
curl  http://127.0.0.1:8000/api/<api_name>?<key>=<value>
```

`<api>` 填我们在django的后端中注册的名字、key-value的形式输入我们传入后端的数据。

```bash
curl http://127.0.0.1:8000/api/accept_code_file?author=aiken&task_name=test
```

2. 测试post

```bash
curl -d "Key=Value" 'http://127.0.0.1:8000/api/accept_code_file?author=aiken7task_name=test' 
```

-d后面是post获取的

？后面是get获取的

## 前后端联动

该部分主要从这几个部分开始介绍：**Get请求后端操作返回数据**、**Post传输数据给后端并接受返回值**、**Debug方式**、具体demo（文件传输、数据的增删改查、最近的数据显示）。

前后端进行接口的交互主要是前端基于[axios](http://axios-js.com/zh-cn/docs/index.html)这个模块向后端发送请求的（文件传输我用的这个写法），在[tdesign](https://tdesign.tencent.com/starter/docs/vue/request-data)中还封装了一种形式，好像也是基于axios封装的（其他的我都用的这种写法）

这一部分方法都在method（）中定义，然后在需要的地方定义，通常为更新data中的数据，

### 发起一个Get请求

```js
    getModelList() {
      this.$request
        .get('http://9.134.13.0:8000/api/recent_models')  # url
        .then((res) => {                                  # 前端返回的数据在res中
          const m_model_list = res.data.models;           
          # 通过 res.data.<key>的方式取出数据，就是我们返回的一整个json
          看前端的console.log打印出来的值，可以知道其是一个列表形式的，而我们返回值是列表中的list[i].field.将其存进临时的列表中
          const m_list_test = [];

          for (let i = 0; i < m_model_list.length; ++i){  
            m_list_test.push(m_model_list[i].fields);
          }
          # this取全局变量，在data中定义好的，我们更新这个值用来渲染数据
          this.model_list = m_list_test;
          console.log(this.model_list);
        })
        .catch((e) => {
          console.log(e)
        });
    },

```



### 发起一个POST请求

```js
    getGameInfo() {
      console.log("start")
      this.$request
      	 // 将上个路由界面穿过来的id作为参数，传到后端去，然后请求后端返回特定的数据
        .post('http://9.134.13.0:8000/api/get_info_games', this.$route.query['ids'])
        .then((res) => {
          const task_list = res.data.games[0].fields;
          console.log(JSON.stringify(res));
          const m_list_res = Array();
          // 赋值变量
          for (var key in task_list) {
            m_list_res.push({
              name: key,
              value: task_list[key],
            })
          }
          console.log(m_list_res);
          // 赋值全局变量
          this.baseInfoData = m_list_res;

        })
        .catch((e) => {
          console.log(e);
        });
    },

```



### 文件传输的特殊POST请求

普通的post

```js
    onSubmitPost() {
      console.log('submit! post');
      this.$request
      	// 将全局参数中的formdata用post传递到后端，接受后端返回到信息
        .post("http://9.134.13.0:8000/api/create_battel", this.formData)
        .then((res) => {
          console.log(JSON.stringify(res));
          console.log('---------------------------');
          console.log(JSON.stringify(this.formData));
        })
        .catch((e) => {
          console.log(e);
          alert(' create battel fail');
        });
    }

```



对应页面跳转的post

```js
    submit_file(file) {
      console.log(file)
      // 获取文件到临时的变量formdatas中
      let formdatas = new FormData()
      formdatas.append('file', file)
      
      console.log(this.formData.author)
      axios({
        url: 'http://9.134.13.0:8000/api/test_api',
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        // data传递文件数据 params传递参数数据
        data: formdatas,
        params: { 'author': this.formData.author },
        
      }).then((res) => {
        console.log(res)
        this.$message.success(`文件 ${file.name} 上传成功`);
      }).finally(() => {
        // this.handleSuccess();
      });
    },

```





## Debug

**首先介绍简单的变更查看方式，方便知道别人在基础的项目上做了啥改动**

1. 借助VsCode和Git，安装git，vscode，vscode的git插件

2. 初始化一个项目（无论是Django还是vue还是任何其他）
3. git init，git add，git commit 提交一次原始版本
4. 将别人的代码文件拖进来覆盖掉，即可在vscode边栏中的git项目管理中，看到与上次提交的不同，从而看出别人有多少改变，借助该工具也能轻松的还原回原始的样子。

（该指令是基于git diff的，但是在命令行中没有那么易于查看，因此借助vscode，git diff也可以了解一下）



**node重新安装依赖包**

```bash
rm -rv node_modules # del those files we downlaods
rm package-lock.json # del the install info 
npm cache clear --force
npm install
```



**NPM中包的安装路径**

节选自参考链接[Link](https://cloud.tencent.com/developer/article/1834667)

1. 本地安装 `npm install` 安装到当前路径的node_modules中
1. 全局安装添加`-g`参数

全局文件的安装地址在: `npm root -g `
{{% /hugo-encryptor %}}