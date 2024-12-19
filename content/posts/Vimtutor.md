---
calendar_date: 2021-10-14
catalog: true
categories:
- Vim-NeoVim
cover:
  image: /cover/cover7.jpeg
date: 2021-10-14 01:58:22
description: vim's basic operation
lang: cn
mathjax: false
tags:
- Vim
thumbnail: /img/header_img/lml_bg34.jpg
title: Vim 00 Basic Opeation
toc: true
---

this is the Note record the vimtutor (the basic usage of vim.)
@Aiken 2021

- write some word and we can use shift+a to insert in the end.
[the doc with Chinese](https://github.com/HanielF/VimTutor)

<!-- vim-markdown-toc GFM -->

- [delete command](#delete-command)
- [skip words and lines](#skip-words-and-lines)
- [undo and resume](#undo-and-resume)
- [replace and change](#replace-and-change)
- [location and file status](#location-and-file-status)
  - [search command](#search-command)
  - [find the matched parentheses 找到对应的括号](#find-the-matched-parentheses-找到对应的括号)
  - [substitute command 替换命令](#substitute-command-替换命令)
- [EXECUTE AN ECTERNAL COMMAND](#execute-an-ecternal-command)
- [THE OPEN COMMAND](#the-open-command)
- [COPY AND PASTE](#copy-and-paste)
- [SET OPTION](#set-option)
- [KEYSHORT](#keyshort)

<!-- vim-markdown-toc -->
## delete command

Most of the command can use `NUM` to repeat it.
`d num` command means delete `num` times with args below:
`c` means del and change mode to insert:  


- w delete next num words
- e delete cur word
- d delete this line which is not support 'c'
- $ delete to the end of the line

x means delete this cur

## skip words and lines

`e` means jump the end of the word
`3e`: means skip 3word distance
`2w`: means skip 2word
the `num` can be decide by ourself.(in the most commands)

## undo and resume

`u` means undo.
`U` undo the line.

`ctrl+r` means resume which is contrast undo.

## replace and change

`r` replace char with new input
`R` become replace mode, replace word by input util we press esc

## location and file status

`ctrl+g` will show the location in file and the file status.

- `gg`: move to the head of the file.
- `G`: move to the end of the file.
- `idx + G`: jump 2 the line.
- `shift+6`: jump 2 the head of the line.

### search command

1. typing: `/` <word_we_want> to search it.
2. if we want to search same word, just type `n`, in another order `N`
3. using ctrl+o to go back the cursor location, ctrl+i to go next
4. using `?` instand of `/` if we want search in the inverse order.

### find the matched parentheses 找到对应的括号

typing `%` near the ( { [, it'll jump to another.
this is very useful in debugging a program

### substitute command 替换命令

- :idx0,idx1s/old/new/g
  replace old with new in the line between [idx0,idx1]

- :%s/old/new/g
  replace all the old with new in whold file
- :%s/old/new/gc
  find out all old and we willdecide change it or not manually.

## EXECUTE AN ECTERNAL COMMAND

how to execute an command like shell command?

```bash
using :![command] -[args]
```

- :w [filename] can save this file in this position or save change or it.
- :!rm [filename]
- :v choose those text or code we want to save(not all this file,
    just what we selected) and :w [filename] to save it
- :r [filename] will resume the txt of the file in this cursor.
- :r !dir will read the command output and puts it below the cursor

## THE OPEN COMMAND

- `o` means will insert a line UNDER the cursor
- `O` will insert ABOVE the cursor

## COPY AND PASTE

- `y` copy command.
- `yw` copy a word
- `p` paste(put) command
- `v` visual mode, select those char we want.
- `$` jump to the end of the line

## SET OPTION  

set an option so a search or subsititute ignore case

- after type in ':/ignore'
- then type in `::set ic` will ignore case
- `:set is` 部分显示匹配的搜索短语
- `:set hls` 高亮显示所有匹配的短语
- `:set no+<command>` 前置no可以关闭选项

## KEYSHORT

1. Ctrl + f/b : 往下/上翻页
2. Ctrl + e/y : 往下/上滚动
3. V: 列选择模式  
4. U/u: 选中的单词变成大/小写
5. Ctrl + w: 光标窗口切换