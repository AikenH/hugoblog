---
calendar_date: 2021-10-08
catalog: true
categories:
- Vim-NeoVim
cover:
  image: /cover/cover15.jpeg
date: 2021-10-08 07:45:42
lang: cn
mathjax: false
subtitle: Using Vimscript to deploy my nvim(<=0.5)
tags:
- Vimscript
- Neovim
thumbnail: /img/header_img/lml_bg42.jpg
title: Vim Configuration 02 Nvim的插件配置
toc: true
---

@Aikenhong 2021

Vim is a important consistant for editing file in shell. It's Hightly Customized for Everyone, In this part I'll Show my personal Vim comfigurations

And I'll Discuss about the diff between Spacevim & Neovim.

Give a conclusion in advance: **Recommand Config the Vim for Yourself**

- You only need to config once, then you should save it in the cloud.
- You will Know all the Keyshot you setting up, and you can customize it as you want.

![image-20211014192437083](https://raw.githubusercontent.com/AikenH/md-image/master/img/image-20211014192437083.png)

## Based on neovim

基于NeoVim进行配置，不采用SpaveVim的配置文件，这里需要建议采用最新的测试版的NeoVim(>= 0.5)，Stable的NVim已经很久没有更新，对一些新的插件缺乏支持。

### Install

[Installing Neovim ](https://github.com/neovim/neovim/wiki/Installing-Neovim) Download NeoVim Package and Install from source

or [Install from neovim-ppa](https://thomasventurini.com/articles/install-neovim-05-in-ubuntu/) Like Following:

```bash
sudo add-apt-repository ppa:neovim-ppa/unstable
sudo apt-get update
sudo apt-get install neovim
```



在安装了Python之后安装对NVim的适配

```bash
pip install neovim
pip install pynvim
```

同时在配置文件中设置

```ini
let g:python3_host_prog='/home/aikenhong/anaconda3/bin/python'
" the path to your python"
```

检查python配置情况：

```ini
” check lang suppose for neovim
“ focus on the python part
:CheckHealth
```

![image-20211014195016009](https://raw.githubusercontent.com/AikenH/md-image/master/img/image-20211014195016009.png)

### Update

if we Install the old version of neovim(5.0 which install before add ppa), we can update by apt.

```bash
# add the stable or unstable source for new nvim
sudo add-apt-repository ppa:neovim-ppa/unstable
sudo apt-get update

# update your nvim
sudo apt-get install --only-upgrade neovim
```

### Where is Config File

可以在vim中使用`:version`然后在其中调用`:echo $MYVIMRC`查看对应的`vimrc`存放的地址

`vim`的配置文件地址：

```bash
# this time is in
ls -l /etc/vim/vimrc

# or we can touch one in
ls -l ~/.vim/vimrc
```

`nvim`的配置文件的地址：

```bash
ls -l ~/.config/nvim/init.vim
# if not, touch one
```

有了配置文件以后就可以开始对Nvim进行配置

## Basic Config

this part I'll explain those basic configurations in Vim(NVim). Besides I will simplely introduce the syntax of `.ini` for writing config.

### Basic Setting

nvim初始情况就是完全没有配置的记事本，但是相应的定制化程度高，下面这些是一些固定的配置

```ini
"===========================基本配置
set nowrap " 不自动换行
set nu  "显示行号
set clipboard=unnamed "共享剪切板
set nocompatible " 不适配vi避免不兼容
set backup "生成临时文件（maybe we should make it no）
set noswapfile " i dont like swap files
set history=1000

" 文件在外部被修改过，就重新读入
set sessionoptions+=globals
" 延迟绘制提升性能
set lazyredraw
" 显示确认
set confirm

"set paste
autocmd InsertLeave * set nopaste "结束插入模式的时候关闭paste
```
配置搜索视图：

```ini
" 高亮搜索结果，逐词高亮
set hlsearch
set incsearch
" 搜索忽视大小写
set ignorecase
set smartcase
" 显示匹配的括号
set showmatch
```

配置Tab和Indent：

```ini
” tab 和indent设置
set tabstop=4 " Tab键的宽度
set expandtab
set smarttab
set shiftwidth=4
set autoindent
set cindent
set si
```

设置修改配置文件直接应用

```ini
autocmd BufWritePost $MYVIMRC source $MYVIMRC
```

配置调试`python`,`cpp`,`sh`：使用F5执行输出，默认删除编译的c++

```ini
set showcmd "show the cmd before carry out on vim
map <F5> :call CompileRunGcc()<CR>
func! CompileRunGcc()
    exec "w"
    if &filetype == 'cpp'
        exec '!g++ % -o %<'
        exec '!time ./%<'
        exec '!rm ./%<'
    elseif &filetype == 'python'
        exec '!python %'
    elseif &filetype == 'sh'
        :!time sh %
    endif
endfunc<Paste>

"running python in nvim
"nnoremap <F5> :echo system('python3 "' . expand('%') . '"')<cr>

" running cpp in nvim
" map <F8> :w <CR> :!g++ % -o %< && ./%< <CR>
" nnoremap <silent> <F8> :!clear;g++ % -o % && ./%< <CR>
```

支持中文编码：

```ini
set encoding=utf-8
set termencoding=utf-8
set fileencodings=utf-8,ucs-bom,gb18030,gbk,gb2312,cp936
```

支持鼠标操作：

```ini
set mouse=a
set selection=exclusive
set selectmode=mouse,key
```

### Folding Setting

![image-20211014210253777](https://raw.githubusercontent.com/AikenH/md-image/master/img/image-20211014210253777.png)

THE RESULT AFTER SETTING WILL BE LIKE THIS

And the Folding can be ：`mark`,`indent`,`syntax`

This is not the final version of folding setting, we will contiune complete it.

```ini
" https://www.cnblogs.com/zlcxbb/p/6442092.html
"
set foldmethod=indent
set foldlevel=1 "预设开始时不收起

autocmd FileType vim set foldmarker={{{,}}}
autocmd FileType vim set foldmethod=marker
autocmd FileType vim set foldlevel=0

autocmd FileType python,cpp set foldmethod=indent
autocmd FileType python,cpp set foldlevel=1

"autocmd FileType cpp set foldmethod=marker
"autocmd FileType cpp set foldmarker={,}
"autocmd FileType cpp set foldlevel=1

" let php_folding=1
set foldnestmax=3
```



### Color And Theme(basic)

[Trending vim color schemes | vimcolorschemes](https://vimcolorschemes.com/)

```bash
mkdir ~/.config/nvim/colors
# them we dowmload theme in this dir
```

在`Plug`同级目录下创建`colors`文件夹，将对应的配色文件放到`colors`，`autoload`中，

```ini
set wildmenu
set background=dark
colorscheme NeoSolarized

highlight Visual cterm=NONE ctermbg=236 ctermfg=NONE guibg=Grey40
highlight LineNr cterm=none ctermfg=240 guifg=#2b506e guibg=#000000

" 背景透明
"hi Normal ctermfg=252 ctermbg=none "背景透明
autocmd vimenter * hi Normal guibg=NONE ctermbg=NONE " transparent bg

“ 语法高亮，高亮当前行，当前列
syntax on
set cul "highlight cursorline
set cuc

" set termguicolors
set t_Co=256
" 设置状态栏
set laststatus=2
set ruler

" set themes
" gruvbox
" colorscheme gruvbox

” =====================指定的主题设置
" NeoSolarized
colorscheme NeoSolarized
let g:neosolarized_termtrans=1
runtime ./colors/NeoSolarized.vim

" Onedark
" https://github.com/joshdick/onedark.vim
" we should change this in the airline setting
" colorscheme onedark
" let g:airline_theme = 'onedark'

" space-vim-dark
" https://github.com/liuchengxu/space-vim-dark
" colorscheme space-vim-dark
" hi Comment cterm=italic
" hi LineNr ctermbg=NONE guibg=NONE

" one-half
" https://github.com/sonph/onehalf/tree/master/vim
" colorscheme onehalfdark
```

### Mapping Shortcut

快捷键映射是配置自定义的核心内容，这一块会分享一些比较特别的映射。

Shortcut key mapping is the core content of configuration customization. This section will share some special mappings.

| 快捷键配置     | 修改位置和方法                                               |
| -------------- | ------------------------------------------------------------ |
| 插件的默认配置 | `.config/nvim/plugins/NAME/PLUG.vim` <br />1. 修改对应的快捷键<br />2. 主配置文件中duplicate 对应的命令 |
| 默认的配置文件 | 在不同的命令下分别对应<br />1. 普通模式下的映射<br />2. 可视模式下的映射 |

配置使用`<Alt>`进行`windows`的切换

```ini
" https://vim.fandom.com/wiki/Switch_between_Vim_window_splits_easily
nmap <silent> <A-Up> :wincmd k<CR>
nmap <silent> <A-Down> :wincmd j<CR>
nmap <silent> <A-Left> :wincmd h<CR>
nmap <silent> <A-Right> :wincmd l<CR>
```

配置tab和shift tab来实现vscode中的行缩进配置

```ini
nmap <tab> V>
nmap <S-tab> V<
vmap <tab> Vg>
vmap <S-tab> Vg<
```

特殊命令：

```ini
" del the end space of line
nnoremap <leader>de :%s/\s\+$//<cr>:let @/=''<CR>
" edit the nvim config file
nnoremap <leader>ev :vsp $MYVIMRC<CR>
```

复制粘贴全选：

```ini
map <C-A>ggVGY
map! <C-A> <Esc>ggVGY
map <F12> gg=G
” 选中状态下ctrl+c复制
vmap <C-c> "+y
```

## Plugs

插件是个性化配置的另一个核心点；Plugs is another core of personalized configuration

使用插件来支持语法，外观，补全，文件管理 ；Use plugins to support syntax, appearance, completion, and file management ；

- 安装插件的时候，如果遇到一些安装失败的时候，我们可以通过以下的命令来获取对应的详细信息`:messages`

### VIM-PLUG

[junegunn/vim-plug: Minimalist Vim Plugin Manager (github.com)](https://github.com/junegunn/vim-plug)

你只需打开终端并运行以下命令：

```bash
curl -fLo ~/.vim/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

Neovim 用户可以使用以下命令安装 Vim-plug：

```bash
curl -fLo ~/.config/nvim/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

安装完插件管理器，我们可以在配置文件中通过一下的操作来安装插件：

```ini
# 设置存放插件的地址
call plug#begin('~/.config/nvim/plugged')
# 添加我们需要的插件
call plug#end()
```

常用的一些命令：

| Command     | Desc                                                       |
| ----------- | ---------------------------------------------------------- |
| PlugInstall | Install Package                                            |
| PlugUpdate  | Update those packages                                      |
| PlugStatus  | Show The Status of all the package                         |
| PlugClean   | Clean the error Plug or del those Plug not Define any more |
| PlugUpgrade | Update Vim-Plug itself                                     |


常用的一些命令优化下载速度更换源：

[加速vim-plug安装](https://blog.csdn.net/liudglink/article/details/118483261)，[cnpm，github](https://tinker.run/article/13)

```ini
# 在调用call plug之前设置下载的源地址
# 这里实际上可以参考各种镜像站去写
let g:plug_url_format='https://git::@hub.fastgit.org/%s.git'
```

或者我们借助Windows主机的代理服务器来对Github进行加速，如果存在稳定的代理的话，这个方式可能是更优的一个
    参考[[Envs/Windows.md]]中的Proxy

### Langs Support

这一部分介绍各种语言的支持LSP，以及对应的配置操作。


## Appendix

### Add Header for Langs

```ini
“ head can write like this
" 新建.c,.h,.sh,.java文件，自动插入文件头
autocmd BufNewFile *.cpp,*.[ch],*.sh,*.py exec ":call SetTitle()"
""定义函数SetTitle，自动插入文件头
func SetTitle()
    "如果文件类型为.sh文件
    if &filetype == 'sh'
        call setline(1, "##########################################################################")
        call append(line("."), "# File Name: ".expand("%"))
        call append(line(".")+1, "# Author: AikenHong ")
        call append(line(".")+2, "# mail: h.aiken.970@gmail.com")
        call append(line(".")+3, "# Created Time: ".strftime("%c"))
        call append(line(".")+4, "")
    endif
    if &filetype == 'cpp'
        call setline(1, "/*")
        call append(line("."), "# File Name: ".expand("%"))
        call append(line(".")+1, "# Author: AikenHong ")
        call append(line(".")+2, "# mail: h.aiken.970@gmail.com")
        call append(line(".")+3, "# Created Time: ".strftime("%c"))
        call append(line(".")+4, " */")
        call append(line(".")+5, " ")
        call append(line(".")+6, "#include <iostream>")
        call append(line(".")+7, "#include <algorithm>")
        call append(line(".")+8, "#include <vector>")
        call append(line(".")+9, "#include <stack>")
        call append(line(".")+10, "#include <queue>")
        call append(line(".")+11, "#include <list>")
        call append(line(".")+12, "#include <map>")
        call append(line(".")+13, "#include <cmath>")
        call append(line(".")+14, "#include <set>")
        call append(line(".")+15, "")
        call append(line(".")+16, "using namespace std;")
        call append(line(".")+17, "")
        call append(line(".")+18, "int main()")
        call append(line(".")+19, "{")
        call append(line(".")+20, "    ")
        call append(line(".")+21, "    ")
        call append(line(".")+22, "    return 0;")
        call append(line(".")+23, "}")
    endif
    if &filetype == 'python'
        call setline(1, "\"\"\"")
        call append(line("."), "# File Name: ".expand("%"))
        call append(line(".")+1, "# Author: AikenHong ")
        call append(line(".")+2, "# mail: h.aiken.970@gmail.com")
        call append(line(".")+3, "# Created Time: ".strftime("%c"))
        call append(line(".")+4, "\"\"\"")
        call append(line(".")+5, "")
    endif
    "新建文件后，自动定位到文件末尾
    autocmd BufNewFile * normal G
endfunction

```

### Dependency

This Session I’ll intrduce some dependency for those PLUGs and the env

### Reference

- [Yggdroot/LeaderF](https://github.com/Yggdroot/LeaderF) : basic config and keyshort setting
- [liuchengxu/vim-which-key](https://github.com/liuchengxu/vim-which-key#special-keys)
- [Config your which key](https://www.chrisatmachine.com/Neovim/15-which-key/)
- [ vim-airline-themes](https://github.com/vim-airline/vim-airline/wiki/Screenshots)
- [Vim Awesome](https://vimawesome.com/)
- [plasticboy/vim-markdown](https://github.com/plasticboy/vim-markdown)
- [Neovim+Coc.nvim配置 目前个人最舒服终端编辑环境(Python&C++) - zprhhs - 博客园 (cnblogs.com)](https://www.cnblogs.com/cniwoq/p/13272746.html)
- [init.vim · SpringHan/nvim - Gitee.com](https://gitee.com/springhan/nvim/blob/master/init.vim)
- [Python](https://stackoverflow.com/questions/18948491/running-python-code-in-vim)；
- [C](https://stackoverflow.com/questions/2627886/how-do-i-run-a-c-program-from-vim)：Using g++ instead of gcc will support C++

### Configuration File

```ini

```

### COC安装注意事项

安装npm，node

```bash
npm install -g neovim
```

build/index.js not found, please install dependencies and compile coc.nvim by: yarn insta

切换到coc目录，yarn install，

```bash
cd ~/.config/nvim/plugged/coc.nvim
yarn install
yarn build
```

安装clang：

[Getting started (llvm.org)](https://clangd.llvm.org/installation.html)

### Airline

Install Powerline Font [powerline/fonts: Patched fonts for Powerline users. (github.com)](https://github.com/powerline/fonts)

### Tagbar

该安装依赖于ctags为了支持Markdown情况下的Tagbar,这里推荐安装Universal Ctags

1. 使用镜像站clone

   ```bash
   cd .install/
   sudo git clone https://github.com.cnpmjs.org/universal-ctags/ctags.git
   cd ctags
   ```



2. 安装前置依赖

   ```bash
   sudo apt-get install make \
     autoconf \
     ppkg-config

   sudo apt install \
       gcc make \
       pkg-config autoconf automake \
       python3-docutils \
       libseccomp-dev \
       libjansson-dev \
       libyaml-dev \
       libxml2-dev
   ```

3. 在`ctags`目录下安装

   ```bash
   ./autogen.sh
   ./configure --prefix=/where/you/want # defaults to /usr/local
   make
   sudo make install
   ```

4. 验证安装成功与否

   ```bash
   ctags
   # sueecess will output
   # ctags: No files specified. Try "ctags --help"
   ```

5. support [markdown](https://github.com/preservim/tagbar/wiki#markdown)

   Add those into vimrc

   ```ini
   let g:tagbar_type_markdown = {
     \ 'ctagstype'  : 'markdown',
     \ 'kinds'      : [
       \ 'c:chapter:0:1',
       \ 's:section:0:1',
       \ 'S:subsection:0:1',
       \ 't:subsubsection:0:1',
       \ 'T:l4subsection:0:1',
       \ 'u:l5subsection:0:1',
     \ ],
     \ 'sro'            : '""',
     \ 'kind2scope' : {
       \ 'c' : 'chapter',
       \ 's' : 'section',
       \ 'S' : 'subsection',
       \ 't' : 'subsubsection',
       \ 'T' : 'l4subsection',
     \ },
     \ 'scope2kind' : {
       \ 'chapter' : 'c',
       \ 'section' : 's',
       \ 'subsection' : 'S',
       \ 'subsubsection' : 't',
       \ 'l4subsection' : 'T',
     \ },
   \ }
   ```

### Startify 起始页设置

[Code Yarns – How to create ASCII art of text using FIGlet](https://codeyarns.com/tech/2013-07-12-how-to-create-ascii-art-of-text-using-figlet.html)

[Vim project switcher using Startify (ricostacruz.com)](https://ricostacruz.com/til/project-switcher-using-startify)

### Improve NPM download

[Download Npm Improve](https://blog.csdn.net/weixin_46351593/article/details/112359906)

临时设置：

```bash
npm --registry https://registry.npm.taobao.org install express
```

全局使用：

```bash
npm config set registry https://registry.npm.taobao.org
```

验证配置是否成功:

```bash
npm config get registry
```

通过cnpm使用：

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

### Vim中执行程序

### Markdown Preview WSL

在WSL中无法调出preview的问题，运行时使用`message`查看err，若为'Cannot find module 'tslib'':

    到插件目录执行`yarn install`或者`npm install`

## Split Windwos 窗口切分

this part is about windows split which is like tmux.
vim的窗口切分命令,在命令行的模式下执行

```bash
:vsp filepath/filename
# 垂直切分屏幕
:sp filepath/filename
# 横向切分屏幕
```

窗口,缓冲区切换快捷键

```ini
# cursor change in diff windows
ctrl + <- ->
ctrl + w + direction

# change buffer in diff tabs
alt + <- ->

```

## Vim Folding 折叠

[vim折叠快捷键 ](https://www.cnblogs.com/zlcxbb/p/6442092.html)

## Vim Grammer 特殊用法

Using Vim KEYSHORT like write an article with special grammar.
In the way, there'll be some interesting usage.
这里有一些有趣的用法，通过vim的语法可以列出来

### Voice 语态

动词：r replace, d delete, y yank, f find, v visual
介词: i in, a around, t to, f forward
名词: w word, p paragraph, t tag, s sentence