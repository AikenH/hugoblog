---
calendar_date: 2022-04-13
catalog: true
categories:
- 笔记系统和博客搭建
cover:
  image: /cover/cover21.jpeg
date: 2022-04-13 23:29:10
description: 设置 vscode, vim, obsidian 自动为 Markdown 添加 Hexo 所需Meta信息
lang: cn
mathjax: true
tags:
- Blog
- Obsidian
thumbnail: /img/header_img/lml_bg21.jpg
title: 设置各Editor自动添加meta信息
toc: true
---

Hexo和Gitee一致，都是由Markdown文件为基础，构建的博客，编写Markdown本身无需多言，由于Hexo并非笔者的首选笔记管理方式，故而再其他地方构建和编写文件是常态，该Blog主要是利用其他工具来方便Hexo博文的编写（Header）

默认的是 `hexo new [layout] title` 可简写为 `hexo n [layout] title`，其中布局应该是在博客目录中定义，该命令也局限于博客的对应目录。

> post(默认)、draft、page

除了默认的方法，本篇将介绍Obsidian、VsCode-like、Vim自动添加Header的方式，用以方便随时随地的编写博文。

同时为了方便已有笔记迁移，本文也编写了Python脚本，CPY后为Target Dir的版本自动添加Header，但是其中对应的Catagories最好还是手动修改一下。



## Obsidian

通过**template**插件，按照对应主题的Header样式添加，可以去官方文档中找对应的语法和说明。从而构建自己的Template

**Workflow**：插件市场添加Template -> 设置指定Template文件夹 -> 按照语法编写Template文件 -> 使用快捷键插入模板

由于这一块没有什么存在歧义的操作，就不赘述，唯一需要注意的是语法，简单参考一下[官方的Example](https://silentvoid13.github.io/Templater/)即可，无需过于深入

本文使用的是Live my Life的Hexo-Theme，模板文件如下：

```ts
---
title: <% tp.file.title %>
catalog: true
data: <% tp.date.now("YYYY-MM-DD HH:mm:ss") %>
subtitle:
lang: cn
header-img: /img/header_img/lml_bg1.jpg
tag:
- 
categories:
-
mathjax: true
sticky: 22

---
```

实际上各个模块的操作思想都是一致的Snippet方案。

## Vim/Nvim

通过Vimscript设置或者Lua的设置文件，令Vim，Neovim再新建`.md`的同时，为其添加默认Header。Lua实际上调用的是Vimscript的接口，这里仅给出`.lua`版本，相应的转换不在赘言。

配置NeoVim中的 `~/.config/nvim/lua/basic/config.lua`

```lua
vim.cmd('autocmd BufNewFile *.md,*.sh,*.cpp,*.py,*.lua exec ":lua set_title()"')
function set_title()
    filetype = vim.fn.expand("%:e")
    -- set title for markdown
    if filetype == "md" then
		vim.fn.setline("1", "--- " .. vim.fn.expand("%"))
        vim.fn.append(vim.fn.line("."), "")
        vim.fn.append(vim.fn.line(".")+1, "Author: AikenHong  ")
        vim.fn.append(vim.fn.line(".")+2, "Mail: h.aiken.970@gmail.com  ")
        vim.fn.append(vim.fn.line(".")+3, "Date: " .. os.date("%Y-%m-%d %H:%M:%S  "))
        vim.fn.append(vim.fn.line(".")+4, "Desc: ")](<vim.fn.setline("1", "---")
        vim.fn.append(vim.fn.line("."), "title: " .. vim.fn.expand("%"))
        vim.fn.append(vim.fn.line(".")+1, "catalog: true")
        vim.fn.append(vim.fn.line(".")+2, "subtitle: ")
        vim.fn.append(vim.fn.line(".")+3, "date: " .. os.date("%Y-%m-%d %H:%M:%S  "))
        vim.fn.append(vim.fn.line(".")+4, "lang: cn")
        vim.fn.append(vim.fn.line(".")+5, "header-img: /img/header_img/lml_bg1.jpg")
        vim.fn.append(vim.fn.line(".")+6, "tag: ")
        vim.fn.append(vim.fn.line(".")+7, "-  ")
        vim.fn.append(vim.fn.line(".")+8, "categories: ")
        vim.fn.append(vim.fn.line(".")+9, "-  ")
        vim.fn.append(vim.fn.line(".")+10, "mathjax: true")
        vim.fn.append(vim.fn.line(".")+11, "sticky: ")
        vim.fn.append(vim.fn.line(".")+12, "")
        vim.fn.append(vim.fn.line(".")+13, "---")>)
    end
end        
```

这样当我们用`nvim newblog.md`的时候，会自动添加上Header。

## Vscode

使用Snippet插件添加代码片段，等待补充。

## Convert md2Blogs

使用Python脚本为原有`.md` 批量添加Header，缺点是不太灵活，但是用于初始化还是能省不少事。如果原本按照Tag，或者Categories进行文件夹归类的话，倒是能起到不错的初始化效果。

Shut Out and Show my **Code**：

```python

# define the path of saving and the target path.
# Specific for windows or Linux version yourself

def get_all_blogs(path):
    # get all blog path.
    dirs = os.listdir(BlogPath)
    blogs = []

    for blog_dir in dirs:
        if blog_dir not in ['.obsidian','_book', 'Day Planners', 'node_module','Draft']:
            tmpdir = os.path.join(BlogPath, blog_dir)
            blogs += glob.glob(tmpdir + '/*.md')
    # del using _ replace space of filename.
    for blog in blogs:
        if ' ' in blog:
            blog = blog.replace(' ', '_')
            print(blog)

    return blogs

```

获取文件后我们需要得到文件的一些基本属性，用于Header中对应值的填充

```python
# TODO: get the basic info of each blog
# title(name of files) \ catalog: true \ data: create time \ subtitle: desc \ lang cn\en
# header-img: we can create a loop to generate this part.
# tags, categories, mathjax.
def change_realtime(timestamp):
    time_struct = time.localtime(timestamp)
    return time.strftime('%Y-%m-%d %H:%M:%S', time_struct)

def get_attribute(blog, verbose=False):
    attr = {}
    # get timestamp.
    create_time = os.path.getctime(blog)
    modify_time = os.path.getmtime(blog)
    attr['data'] = change_realtime(create_time)
    attr['m_data'] = change_realtime(modify_time)

    # get tags and categories.
    tags = blog.split('\\')[-2]
    attr['tags'] = tags
    attr['categories'] = tags

    # get title.
    with open(blog, 'r', encoding='UTF-8') as f:
        lines = f.readlines()
        title = lines[0].strip().split('#')[1]
        attr['title'] = title

    # default attr
    attr['lang'] = 'cn'
    # verbose:
    if verbose: print(blog, '\n', attr)
    return attr

```

为了不意外损坏源文件，同时保持源文件的结构、组织和属性等等，我们Cpy并只对副本进行操作，cpy的同时转移文件路径到所需地点。

```python
def cpy_files(blog,target):
    """cpy files to the target path"""
    filename = os.path.basename(blog)
    os.system('cp ' + blog + ' ' + target + filename)
    return target + filename
```

在获取完基本属性和转移后，我们需要开始对文件进行添加header的处理,在这里我们添加了一个Loop为Blog设置不同的背景图片，根据自己有多少图片进行自定义设置吧。

```python

def add_header(blog,index=0,attr=None):
    """add default header for each files"""
    header_imgs = ["",1, 2, 3, 4,5]
    with open(blog, "r+", encoding='UTF-8') as f:
        old = f.read()
        f.seek(0)
        f.write("---\n")
        f.write("title: " + attr['title'] + "\n")
        f.write("catalog: true\n")
        f.write("date: " + attr['data'] + "\n")
        f.write("subtitle: \n")
        f.write("lang: " + attr['lang'] + "\n")
        f.write("header-img: " + '/img/header_img/lml_bg{}.jpg'.format(index%6) + "\n")
        f.write("tags: " + "\n")
        f.write("-  " + attr['tags'] + "\n")
        f.write("categories: " + "\n")
        f.write("-  " + attr['categories'] + "\n")
        f.write("---\n")
        f.write(old)
    return


```

然后就是执行文件夹的批量处理了。可以添加args便于对多个文件夹进行处理，或者控制只变换单个文件等，应该需求不大，且代码比较简单，这里就暂时不贴出了。

```python
def dir_process():
    blogs = get_all_blogs(BlogPath)
    for i,blog in enumerate(blogs):
        b_attr = get_attribute(blog)
        new_blog = cpy_files(blog, TargetPath)
        add_header(new_blog, index=i, attr=b_attr)

if __name__ == '__main__':
    dir_process()
    print('Done!')
```