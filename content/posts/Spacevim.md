---
calendar_date: 2021-10-09
catalog: true
categories:
- Vim-NeoVim
cover:
  image: /cover/cover10.jpeg
date: 2021-10-09 12:15:41
lang: cn
mathjax: false
subtitle: Install and Set up LSP and UI
tags:
- Spacevim
thumbnail: /img/header_img/lml_bg37.jpg
title: Vim Configuration 03 Spacevim Setup
toc: true
---

@Aiken 2021 this file is use to record how to config out vim' by spacevim.  
I'll write this doc with three Parts:

- Install and envs, Plugins(including the LSP), KeyShort  
- Attention: we have much to do if we want to install some other plugins.
    maybe it not a good way to set the vim.

<!-- vim-markdown-toc GFM -->

- [INSTALL SPACEVIM AND CONFIG IT](#install-spacevim-and-config-it)
- [INSTALL LANGs'](#install-langs)
  - [COCNVIM](#cocnvim)
- [KEYSHORT and special USAGE](#keyshort-and-special-usage)
  - [SPLIT WINDOWS and CHECKOUT](#split-windows-and-checkout)
- [Plugins](#plugins)

<!-- vim-markdown-toc -->

---

## INSTALL SPACEVIM AND CONFIG IT

**Install:** SpaceVim via the offical websize:

- [spacevim](https://spacevim.org/cn/quick-start-guide/)
- [layers](https://spacevim.org/cn/layers/)
- [colorscheme](https://spacevim.org/cn/layers/colorscheme/)

```shell
The COMMAND is like:
curl -sLf https://spacevim.org/cn/install.sh | bash
```


After that, the spacevim will install for the vim and neovim.

**Basic Configuration:**

1. modify the spacevim configuration in the file below
    `~/.SpaceVim.d/init.toml`

2. And enable some layers we need: which can select from `spc + h + l`
    after enable those layer, **DEIN** will install those plugins
    we need use GLOBAL VPN to download plugins.

3. something like `set: wrap` will be add in `~/.SpaceVim/vimrc` (end of it)

## INSTALL LANGs'

This is the most important part for coding: lint,autocomplete,warning..  
At the same time, this part is hardest to install,
because the coc.nvim which is not design for spacevim.  

**FIRST OF ALL:** enable those langs' layer: python(first), markdown, c++;  
We can install those module according to the Docs,
  then install sth like pynvim(pip), node js, yarn, neovim, make...  
**THEN:** run `:CheckHealth` after install coc to check the env status.  
**NEXT:** try install debug, c++, c, for the future dev.  

### COCNVIM

Using Python As a example to show how to install this.  
Hardest Part here: [CPP with Coc](https://zhuanlan.zhihu.com/p/137840336),
  [Coc Offical](https://github.com/neoclide/coc.nvim/wiki/Install-coc.nvim#using-vim-plug)  
  [Coc_issues](https://github.com/SpaceVim/SpaceVim/issues/2564)

- Install nodejs and yarn:  

```bash
# add & update apt source before install nodejs.
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get update

# install nodejs after that.
sudo apt-get install -y nodejs

# install yarn in shell refer to the hint
like: 
curl --compressed -o- -L https://yarnpkg.com/install.sh | bash
```

- Install Coc in SpaceVim by dein in init.toml:

```yaml
[options]
  autocomplete_method = 'coc'

[[layers]]
  name = 'lsp'
  filetype = [
    'c',
    'cpp',
    'dart']

[layers.override_cmd]
  c = ['ccls']
  cpp = ['ccls']
  python = ['pyls']

[[cusiom_plugins]]
  repo = "neoclide/coc.nvim"
  merge = 0
  rev = 'release'
```

after install using `:checkhealth` 'CocInfo' to comfirm.

- Install some basic part(jedi):  

```shell
conda install jedi
:CocInstall coc-jedi coc-python coc-snippets 
:CocInstall coc-python
:CocInstall coc-clangd
```

**coc_keyword:**
some basic coc command we may use often

- `CocInstall [PackageName]`
- `CocUninstall [PackageName]`

## KEYSHORT and special USAGE

- reinstall some plugins can use: `SPReinstall coc.nvim`.
- running/debug info will record in `SPDebugInfo`
- to_tree will show in `spc a o` after we save the modify of file

### SPLIT WINDOWS and CHECKOUT

split windows to show more info and make it easily to code.

- `sp [filename]` to splite windows with new files. u-d
- `vsp [filename]` to splite windows with new files. l-r
- `spc [num]` checkout cursor in diff windows
- `g t` checkout from tag to tag

## Plugins

This part is depending the `DEIN`, so we can reference this plugins.
Many useful plugins had been add in those layers, learn it from offical website.

1. [recommand1](https://zhuanlan.zhihu.com/p/58816186)