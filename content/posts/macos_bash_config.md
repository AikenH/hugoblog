---
calendar_date: 2023-04-02
categories:
- MacOS Configuration
cover:
  image: /cover/cover26.jpeg
date: 2023-04-02 19:28:48
lang: cn
mathjax: false
subtitle: null
tags:
- MacOS
- Configuration
thumbnail: /img/header_img/lml_bg26.jpg
title: 配置 MacOS 的终端
toc: true
---

Mac 的 Terminal 和 Ubuntu 的操作上较为相似，都是 Unix 的吧，但是要注意一下安全和软件管理库。

其他的参考资料： https://www.youtube.com/watch?v=RNqDkF17ogY&t=787s

## Temrinal 终端

The default terminal is zsh, so we do not need to install zsh from scratch.

### Brew 

we install brew follow the [official website](https://brew.sh) settings : 
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Iterm 2

After install brew we can install iterm 2 like this :

```bash
brew install iterm2 --cask
```

Then we download and config its' setting in the preference menu. Or export the profile.

Those following settings are what i'm most concerned about, and because of the simple UI, we will not introduce too much.

- Transparent
- Snippets
- Status line
- Split windows

这将会是我们的主终端应用，后续会结合 fig 一起使用，这给我们提供了媲美，甚至超越 windows terminal 的使用体验。

Seems like 可以取代 tmux 来进行分屏



**Themes** & **Snipnet**

### Fig 

**[Fig](https://github.com/withfig/autocomplete) adds autocomplete to your terminal.**  Install it from brew.

```bash
brew install fig --cask
```

After install Fig, we need to start the dashboard to config our terminal (vscode & iterm 2)

### Warp

A modern terminal design for macOS, which is like terminal + fig + multi-tabs but without transparent.

we could download this from [warps](https://www.warp.dev), it provide another good  terminal experience.

Deprecate for now

### Omz

Like in all bash: [omz](https://ohmyz.sh/#install), Use it with [powerlevel10k](https://github.com/romkatv/powerlevel10k);

### NeoVim

Configuration: We download the dotfile from our [GitHub rep](https://github.com/AikenH/configs_scripts) o then replace it.

[Download](https://github.com/neovim/neovim/wiki/Installing-Neovim): 

```bash
brew install --HEAD neovim
```

### Tar 的使用事项

Mac 使用 tar 压缩，每个文件会多生成 `"._"` 文件副本，该文件在 mac 中解压的时候，他自己能删除这些多余的文件，而在多平台使用的时候，就会很麻烦，因此我们使用 `COPYFILE_DISABLE` 防止生成此类文件

```shell
COPYFILE_DISABLE=1 tar -zcvf files.tar files_dir
```

### Others

- Ranger
- Zenith
- Duf: disk usage/ free utility
- Dust: file tree