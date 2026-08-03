

# Aiken's Hugo Blog

A lightweight, highly customized static blog built with **Hugo** and the **[PaperMod](https://github.com/adityatelange/hugo-PaperMod)** theme. This repository powers [aikenh.cn](https://aikenh.cn) and features custom styling, advanced shortcodes, client-side content encryption, and automated text spacing for mixed CJK/Latin scripts.

## ✨ Features

- **Theme**: PaperMod with extensive custom CSS overrides for glassmorphism post entries, fixed parallax backgrounds, and styled alert/callout blocks.
- **Custom Shortcodes**: Built-in components for embedding Bilibili videos, GitHub repository cards, interactive chat bubbles, image galleries, and text alignment.
- **Client-Side Encryption**: AES-CBC decryption (`decrypt.js`) for password-protected posts or sensitive content blocks.
- **Text Formatting**: Integrated `pangu.js` for automatic spacing between Chinese and Latin characters.
- **Math & LaTeX**: Native support for inline and block math using `$$` and `\[...\]` delimiters via Goldmark passthrough extensions.
- **Smart Comments**: Lazy-loaded Disqus comments using `IntersectionObserver` to optimize initial page load performance.
- **Content Organization**: Dedicated sections for blog posts, a curated linklog, search, and personal archives.
- **Search**: Built-in Fuse.js search functionality.

## 🛠️ Prerequisites

- [Go](https://golang.org/dl/) (v1.17+)
- [Hugo](https://gohugo.io/installation/) (Extended version recommended)
- Git

## 📦 Installation & Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/AikenH/hugoblog.git
   cd hugoblog
   ```

2. Initialize the PaperMod theme (if using Git submodules or Hugo modules):
   ```bash
   git submodule update --init --recursive
   ```

3. Start the local development server:
   ```bash
   hugo server -D
   ```
   The site will be available at `http://localhost:1313`. Drafts are included with the `-D` flag.

4. Build for production:
   ```bash
   hugo --minify
   ```
   The compiled static site will be generated in the `public/` directory.

## 🎨 Customizations & Usage

### Theme Configuration
Main site settings are defined in `hugo.yaml`, with PaperMod-specific overrides in `config/papermod/hugo.yaml`. Update the `baseURL`, `params.author`, social icons, and favicon paths to match your profile before deployment.

### Custom CSS
Extended styles are stored in `assets/css/extended/`:
- `alert.css`: Styled callout blocks (`alert-note`, `alert-tip`, `alert-warning`, `alert-error`, etc.)
- `background.css`: Fixed background images with blur overlays for light/dark themes
- `entry-post.css` & `footer.css`: Glassmorphism effects, tag styling, and layout tweaks

### Custom Shortcodes
Place shortcodes in your markdown content to render specialized components:

**Bilibili Video Embed**
```markdown
{{< bilibili BV1Wg411t7EE 1 >}}
```

**GitHub Repository Card**
```markdown
{{< github name="AikenH/hugoblog" link="https://github.com/AikenH/hugoblog" description="Personal Hugo Blog" language="Hugo" color="#ff6600" >}}
```

**Chat Bubble**
```markdown
{{< chat position="left" name="Alice" timestamp="2023-05-01 10:00" >}}
Hello! How are you?
{{< /chat >}}
```

**Image Gallery**
```markdown
{{< galleries >}}
{{< gallery src="https://example.com/image1.jpg" >}}
{{< gallery src="https://example.com/image2.jpg" >}}
{{< /galleries >}}
```

**Text Alignment**
```markdown
{{< align center "This text will be centered." >}}
```

### JavaScript Utilities
- `static/js/decrypt.js`: Handles AES decryption for encrypted content blocks. *(Requires CryptoJS library to be loaded in your base template)*
- `static/js/pangu.js`: Automatically inserts spaces between CJK and Latin text for improved readability.

### Math & LaTeX
Enable math rendering by wrapping equations in `$$` for block display or `\( \)` for inline. The `hugo.yaml` Goldmark configuration handles passthrough rendering seamlessly.

## 🚀 Deployment

This blog can be deployed to any static hosting provider:
- **GitHub Pages**: Push to a `gh-pages` branch or use GitHub Actions.
- **Netlify/Vercel**: Connect the repository and set the build command to `hugo --minify` with the output directory as `public`.
- **Custom Server**: Upload the `public/` directory contents to your web server (Nginx/Apache).

> ⚠️ **Important**: Always update the `baseURL` in `hugo.yaml` to match your production domain before deploying.

## 📄 Credits & Acknowledgments

- **Framework**: [Hugo](https://gohugo.io/)
- **Theme**: [PaperMod](https://github.com/adityatelange/hugo-PaperMod)
- **Utilities**: [pangu.js](https://github.com/vinta/pangu.js) for intelligent text spacing
- **Comments**: [Disqus](https://disqus.com/) with custom lazy-loading implementation
- **Icons**: Custom SVG assets in `data/SVG.toml`

This repository is structured for easy fork-and-customize workflows. Feel free to adapt it for your own static site projects!
