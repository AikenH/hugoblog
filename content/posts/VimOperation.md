---
calendar_date: 2022-04-07
catalog: true
categories:
- Vim-NeoVim
cover:
  image: /cover/cover1.jpeg
date: 2022-04-07 14:15:25
lang: cn
mathjax: false
subtitle: recorder of neovim
tags:
- Vim
thumbnail: /img/header_img/lml_bg1.jpg
title: Vim 01 Recorder
toc: true
---

**Chose Your Dotfile to start the vim**

```shell
vim -u {path to your .vimrc}
```

## Recorder of Vim

This Chapter mainly introduces the **Recorder** in vim,Which is used to do some **repeated** operations.This function is also called a **macro**.

for more information try `:help recording`

### Registers(related with recording)

This section will introduce related **concept/function** of recording function. Which help us to understand how this works, and what we should pay attention to it.

**register of vim**: register is a superset of macro, it contains more function. In this part we should know, register can **store** some string or operations to help subsequent use. 

**Status**:
Using `:registers` or `:reg` to check those **we have registered**, or add the registers's name behind to show those u're interested in.

```vim
:reg a b c 
--- Registers ---
"a register a content
"b register b content
"c register c content
```

**Lifecycle**
The information in registers will **not disappear** with the window closed. But maybe with the system-level's open-close. we should **test this**!!! So we can store some **snippet**,**pwd**,etc. 


**Pick**
There are many registers like `0~9`,`a~z`,unnamed,etc. `0~9` are the **default registers** for many operations like del,copy,command,etc.  
So for recording, we better using `a~z`. And It should be noted that the upper version `A~Z` means add operations to an existing command.'a~z' is to overwrite it.

**Modified**
Besides the `A~Z` works like `append` in python. There are several way to **modify** the registers; 
Like: 

```vim
# using 'w' as an example of reg.
:let @w='<what command u want>'

# general version is: (ignore the [])
:let @[reg u want to modify]='[what command u want]'
```

TODO: we should write a indipendent chapter for the registers in vim.

### Usage

This section shows the Usage of Recording. And we will continue to collect some good examples. Then put it below.

- Change to **Normal** mode and **pressed** "q"
- Chose reg u want (`a~z` normally) to start record a macro
- { **operations** u want to be recorde }
- ->in **non-insert** mode<- **pressed** "q" to end recording
- Using "@+reg" to repeat this operations/macro
- `10@+reg` to repeat this macro 10times

**Example1** setting the pwd/useid of server.  
**Example2** fill up some sheet infomation.

## References

**recording**

- official doc : `:help recording`
- [registers in vim](https://einverne.github.io/post/2017/11/vim-registers.html)
- [registers in vim2](https://juejin.cn/post/6906120745228632077)
- [how to use recording in vim](https://www.jianshu.com/p/f08ed3d6273e)