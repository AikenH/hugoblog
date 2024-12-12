---
calendar_date: 2021-10-07
catalog: true
categories:
- Vim-NeoVim
cover:
  image: /cover/cover16.jpeg
date: 2021-10-07 15:00:42
lang: cn
mathjax: false
subtitle: deploy vim
tags:
- Vimscript
- Vim
thumbnail: /img/header_img/lml_bg16.jpg
title: Vim Configuration 01 vim的无插件基础设置
toc: true
---

> 该配置笔记于 20230521 重新整理。默认的 Vimrc 位置为 `/usr/share/vim/vimrc`，也可以在 vim 界面使用 `:echo $MYVIMRC` 查看当前的配置文件，默认使用的配置文件地址为 `~/.vimrc`

参考文献地址：[Good VimRC](https://dougblack.io/words/a-good-vimrc.html) | [Backspace](https://segmentfault.com/a/1190000021029480) | [AutoCmd](https://zhuanlan.zhihu.com/p/98360630) | [VIM配置入门](https://www.ruanyifeng.com/blog/2018/09/vimrc.html)
配置文件地址：[AikenDotfile](https://github.com/AikenH/aikenh-dotfile/tree/main/vim-dot)，本文这里只介绍部分配置，一些过于常见的配置等等这里就不再介绍，在 dotfile 中对每行配置均有的细致的注释。

基于 VimScript） 该 blog 主要记录基础 vim 的配置文件编写，旨在使用基础 vim 的时候也能有一个较好的代码编辑体验，同时提供部分 keymap 集成一些简单的功能，方便文档编写时候的格式转换等。这个配置文件在后续配置 nvim 的时候部分配置也会沿用。

## Vim 的基础配置

自动检测文件修改，以及对多个文件的 workspace 自动切换

```vim
" >>0-1 state detection.
set autoread " when file change outside, we will know
set autochdir " change workspace when we swtich file, when we open multi-file in one session.
```

### 鼠标和剪切板功能

设置 vim 对鼠标的支持，支持鼠标选择等

```vim
" reference the web get the best setting and use it always
" suppose the mouse operation
" but this function not work well in the weterm, we disable this part for work.
set mouse=a
"set selection=exclusive
"set selectmode=mouse,key
```

设置和系统同步的剪切板，WSL 下的剪切板设置可以参考下面文章 [WSL2 clipboard not shared between Linux and Windows](https://github.com/microsoft/WSL/issues/4440) || [Reddit - Dive into anything](https://www.reddit.com/r/bashonubuntuonwindows/comments/be2q3l/comment/el2vx7u/?utm_source#)

```vim
" set the clipboard
set clipboard+=unnamed

" WSL yank support
let s:clip = '/mnt/c/WINDOWS/system32/clip.exe'  " change this path according to your mount point
if executable(s:clip)
    augroup WSLYank
        autocmd!
        autocmd TextYankPost * if v:event.operator ==# 'y' | call system(s:clip, @0) | endif
    augroup END
endif

```

### 设置撤销历史记录

> 多次编辑同一个文件的时候保持 Undo 的历史记录，便于对同一个文件进行编辑。

```vim
" >>0-2 keep file history
set undofile " keep the undo history in file.
set undodir=~/.vim/.undo//
set history=1000
```

通过上述命令启用 undofile 的选项，并设置存储目录，这里需要注意的是，**存储目录需要手动创建**，undo 的历史记录才能生效。



### 搜索选项

搜索部分主要有以下的几个事：显示匹配的括号，逐字搜索，搜索高亮，忽略大小写

```vim
" >>1-3 Search Setting
set showmatch " highlight match parentheses
set incsearch " search as characters are entered
set hlsearch " highlight the search result.
set ignorecase " ignore cases when searching
```

其中需要注意的是，vim 中的搜索高亮不会自动关闭，因此我们需要设置快捷键映射来关闭搜索的高亮。

```vim
nnoremap <leader>ss :nohlsearch<CR> " turn off the highlight, bcus it will not auto close.
```

### 其他设置

```vim
set backspace=indent,eol,start " help to del special character.(or =2)
```

## 基本用户界面设置

设置滚动行和上下的间距：

```vim
set scrolloff=10
```

设置折行及折行不破坏单词完整性：

```vim
set wrap " wrap line and if line is too long
set linebreak " Line breaks do not break the word.
" set textwidth=80 " how many chacter in oneline
```

### 状态栏设置

首先设置命令窗口的大小，并使得状态栏仅在多文件窗口时打开，便于区分不同文件

```vim
" >>2-3 Status Line Setting
set cmdheight=2 " set the cmd line height
set laststatus=1 " enable:2 only in multi windows:1 off:0
set ruler " show row,col of cursor in status line.

" reference : https://blog.csdn.net/strategycn/article/details/7620261
set statusline=%F%m%r%h%w\ [FORMAT=%{&ff}]\ [TYPE=%Y]\ [POS=%04l,%04v][%p%%]\ [LEN=%L]\ [TIME=%{strftime('%c')}]

```

设置 VIm 的 CMD 指令显示状态以及补全办法：

```vim
" >>2-4 Command hint.
set showcmd " show the command we just type in. like 2d
set showmode " show insert or command mode now (seems like not working)

" >>2-5 show Bottom CMD Menu
set wildmenu " show completion list.
```

### 光标位置记录

```vim
" >>2-7 return to last edit pos when open same files.
autocmd BufReadPost *
    \ if line("'\"") > 0 && line("'\"") <= line("$") |
    \   exe "normal! g`\"" |
    \ endif
" Remember info about open buffers on close
set viminfo^=%

```

## 缩进方法和折叠

> 这里只以 Python 为例介绍默认的 indent 方案，同时 folder 这里只介绍 marker 方法，用 `{{{}}}` 来进行折叠，不同文件的 indent 方案用 filetype 和 autocmd 实现，具体参见配置文件中的 Part8.

### 缩进

```vim
" >>3.1 Indent (c-style)
set ai "autoindent, keep same indent with prev line.
set si "smartindent, add {, # special situation of ai. (for c or java)

" >>3.2 Tab(better using autocmd)
set tabstop=4 "tab==<n> space
set softtabstop=4 "when we type in tab == <n> space
set shiftwidth=4 "the auto indet(when change line or using > or < ) will be <n> better keep it same with tab.
set smarttab "will change <n> basis on others in this file.
set expandtab "make all tab as space

```

这里的 `<n>` 指的是空格的个数，具体的设置和注释如上，后续基于不同的文件类型进行配置的需要打开如下的内容：

```vim
" >>3.3 specific indent file.
" load filetype-specific indent files.
" *.py will load ~/.vim/indent/python.vim file
filetype on
filetype plugin on
filetype indent on
```

其他内容参见 dotfile，使用 autocmd 对不同文件的缩进进行区分设置。

### 折叠

```vim
" -----------------------6.Folder{{{-----------------------------
set foldenable " enable fold function
set foldlevelstart=10 " fold level at start. 0: all be closed; 99: always open.
set foldnestmax=10 " 10 nested fold max
set foldmethod=marker " could be indent. mark should use {{{}}}
"try help foldmethod
```

将折叠全开后的效果如下：

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20230524164856.png)


## 快捷键和函数

> 快捷键和函数的数量较多，这里不详细说，具体查看 dotfile，这里简要说明以下主要实现了哪些 KeyMap。

这里通过快捷键和函数实现了如下的一些功能。

1. 用 TAB 和 SHIFT-TAB 调整缩进
2. Toggle Wrap、Spell、Number、Paste
3. 快捷编辑配置文件
4. Windows、Tab 切换
5. 快捷注释
6. Tailing 和 Retab
7. 编译和执行当前代码文件
8. 自动添加指定的文件头（如 blog 的 meta 文件）

由于篇幅限制就不再赘述。

## 自动注释

感谢大神 [KarimElghamry](https://github.com/KarimElghamry/vim-auto-comment) 提供的方案，可以直接将其代码拷贝到自己的 vmrc 中来实现行注释和块注释，也可以很轻易的添加不同后缀的处理方式。

## FI

该版本的 Vimrc 应该是个人的最终版本了，如果有其他的点子和需求的话，欢迎到评论区讨论，如果有更新的话也会在这个 dotfile 上更新。