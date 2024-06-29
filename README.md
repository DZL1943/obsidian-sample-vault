---
created: "2024-06-11 10:48"
modified: "2024-06-28 10:43"
tags: [Obsidian]
url: "https://github.com/DZL1943/obsidian-sample-vault"
---

# obsidian-sample-vault

> [!attention]+ 适用性说明
> 1. 本库源自本人在 macOS 上的 Obsidian(1.6.x) 实践, 对其他系统未做适配, 请自行调整相关设置.
> 2. 若在移动端使用, 建议在 `设置-文件与链接-切换配置文件夹` 处自行创建新的配置目录以免加载卡顿, 建议默认编辑模式设为源码模式.

![](90_Misc/Attachments/README-20240611204632938.png)  
![](90_Misc/Attachments/README-20240611203835624.png)

## 主流的笔记软件

- 编辑器类: Typora、MarkText
- 本地类: Obsidian、Zettlr、SiYuan、Logseq、Anytype
- 云笔记类: Notion、Craft、飞书、语雀

>[!hint]+ 对于编程类笔记, 优先用代码编辑器处理. 或者将笔记与代码分离开.

> [!quote]+ 一点忠告
> - 永远不要 all-in-one 一个你无法完全掌控的(笔记)软件, 例如云笔记软件、非透明存储的本地笔记软件.
> - 不要把分类和笔记方法看得过重, 分类再完美没有内容也只是空壳, 绝大多数人能把一个类别细分下去就不错了.
> - 不要花费过多时间在工具的打磨上, 尤其在你对自己的目标需求并不明确的时候.
> - 只在自己能力范围内有限度地折腾. (很多东西离开了 obsidian 就啥也不是, 就简单地把其当做是一个带双链的比 vscode 更合适的 markdown 编辑器就好了)
> - 越小白, 越不该瞎折腾, 认真记笔记就行. (回答小白的问题尤其费劲)
> - 当远离笔记工具一段时间后再回看, 你会发现曾经折腾的那些花里胡哨的东西并没有你想得那样完美和必要, 默认和精简才是王道.
> - 越是复杂、长期的事情, 越应该尽量避免不必要的熵增.

## 安装

[Download - Obsidian](https://obsidian.md/download)  
[Releases · obsidianmd/obsidian-releases](https://github.com/obsidianmd/obsidian-releases/releases)

## 目录结构说明

```bash title:"create essential dirs"
folders=(Local 10_Inbox 20_Journals 30_Jottings 40_Pages 50_Projects 60_Areas 70_Resources 80_Archives 90_Misc/{Attachments,Templates})

for folder in "${folders[@]}";do mkdir -p "$folder" && touch "$folder"/.gitkeep;done
```

- 10_Inbox/: 临时笔记
- 20_Journals/: 日记 (建议每年一个目录, 每月或每周一个文件)
    - tasks
    - journals
    - context
- 30_Jottings/: 非正式笔记
- 40_Pages/: 原创笔记、主题笔记
- 50_Projects/: 项目笔记[^1]
- 60_Areas/: 领域知识笔记、卡片笔记
- 70_Resources/: 附件以外的资源文件
- 80_Archives/: 归档
- 90_Misc/: 杂项(比如附件、模版等)
    - Attachments/
    - Templates/
- Vaults/: 可通过 `ln -s source_path Vaults/` 的方式临时处理其他位置的文件 (该方法目前还没有正式的支持, 也不被推荐)
- Local/: 本地目录, 不进行同步
- draft: (进行中的)草稿, 可以每个设备单独一个文件, 互不冲突
- quicknotes: 快速记录
- README

> [!hint]+ 这里的目录结构还是偏传统的, 好处就是避免了分库. 子库可以作为一个目录存在并且设置独立的 git.

>[!hint]+ 最简单的笔记结构, 只需要一个 inbox 和 outbox, 其他结构也大都是基于此构建的.

>[!hint]+ 关键在于解耦笔记输入、笔记整理这两大过程.

## 已启用的[插件](https://obsidian.md/plugins)

```json
[
  "any-block",
  "attachment-flow-plugin",
  "attachment-management",
  "better-fn",
  "canvas-keyboard-pan",
  "cmdr",
  "code-styler",
  "cycle-in-sidebar",
  "dataview",
  "dust-calendar",
  "easy-typing-obsidian",
  "editing-toolbar",
  "editor-width-slider",
  "file-tree-alternative",
  "find-unlinked-files",
  "float-search",
  "floating-toc",
  "fuzzy-chinese-pinyin",
  "hotkey-helper",
  "hotkeysplus-obsidian",
  "janitor",
  "keyboard-analyzer",
  "legacy-vault-switcher",
  "nldates-obsidian",
  "note-refactor-obsidian",
  "obsidian-advanced-uri",
  "obsidian-columns",
  "obsidian-completr",
  "obsidian-emoji-toolbar",
  "obsidian-excalidraw-plugin",
  "obsidian-excel-to-markdown-table",
  "obsidian-footnotes",
  "obsidian-git",
  "obsidian-heading-shifter",
  "obsidian-hider",
  "obsidian-hover-editor",
  "obsidian-kanban",
  "obsidian-linter",
  "obsidian-minimal-settings",
  "obsidian-opener",
  "obsidian-outliner",
  "obsidian-plugin-update-tracker",
  "obsidian-quiet-outline",
  "obsidian-regex-replace",
  "obsidian-sidebar-expand-on-hover",
  "obsidian-style-settings",
  "obsidian-tagfolder",
  "obsidian-tasks-plugin",
  "privacy-glasses",
  "quick-explorer",
  "quickadd",
  "settings-search",
  "show-whitespace-cm6",
  "surfing",
  "table-editor-obsidian",
  "tag-wrangler",
  "templater-obsidian",
  "unicode-search",
  "url-into-selection",
  "various-complements"
]
```

> [!hint]+ 希望后续 obsidian 插件能够以中央库的方式集中管理而不必每个库都冗余.

## 快捷键设置
> [!attention] 此处快捷键基于 macOS 系统

| command                                                               | keys                |
| --------------------------------------------------------------------- | ------------------- |
| app:go-back                                                           | Mod+[               |
| app:go-forward                                                        | Mod+]               |
| app:toggle-left-sidebar                                               | Ctrl+L              |
| app:toggle-right-sidebar                                              | Ctrl+R              |
| app:toggle-ribbon                                                     | Mod+Ctrl+B          |
| cycle-in-sidebar:cycle-left-sidebar                                   | Ctrl+[              |
| cycle-in-sidebar:cycle-left-sidebar-reverse                           | Ctrl+Shift+[        |
| cycle-in-sidebar:cycle-right-sidebar                                  | Ctrl+]              |
| cycle-in-sidebar:cycle-right-sidebar-reverse                          | Ctrl+Shift+]        |
| cycle-through-panes:cycle-through-panes                               | Ctrl+Tab            |
| cycle-through-panes:cycle-through-panes-reverse                       | Ctrl+Shift+Tab      |
| daily-notes                                                           | Mod+J               |
| darlal-switcher-plus:switcher-plus:open-commands                      | Mod+Shift+P         |
| darlal-switcher-plus:switcher-plus:open-headings                      | Ctrl+H              |
| darlal-switcher-plus:switcher-plus:open-starred                       | Ctrl+M              |
| editing-toolbar:editor:toggle-bold                                    | Alt+B               |
| editing-toolbar:editor:toggle-highlight                               | Alt+H               |
| editing-toolbar:editor:toggle-italics                                 | Alt+I               |
| editing-toolbar:editor:toggle-strikethrough                           | Alt+S               |
| editing-toolbar:underline                                             | Alt+U               |
| editor:swap-line-down                                                 | Alt+ArrowDown       |
| editor:swap-line-up                                                   | Alt+ArrowUp         |
| editor:table-col-left                                                 | Mod+Alt+ArrowLeft   |
| editor:table-col-right                                                | Mod+Alt+ArrowRight  |
| editor:table-row-down                                                 | Mod+Alt+ArrowDown   |
| editor:table-row-up                                                   | Mod+Alt+ArrowUp     |
| editor:toggle-source                                                  | Alt+Mod+E           |
| float-search:search-obsidian-globally                                 | Mod+Shift+F         |
| fuzzy-chinese-pinyin:execute-command                                  | Mod+P               |
| fuzzy-chinese-pinyin:open-search                                      | Mod+O               |
| homepage:open-homepage                                                | Ctrl+Alt+H          |
| hotkey-helper:browse-plugins                                          | Ctrl+P              |
| hotkeysplus-obsidian:duplicate-lines-down                             | Alt+Shift+ArrowDown |
| hotkeysplus-obsidian:duplicate-lines-up                               | Alt+Shift+ArrowUp   |
| make-md:mk-blink                                                      | Mod+Shift+O         |
| obsidian-another-quick-switcher:search-command_file-name-fuzzy-search | Mod+Shift+O         |
| obsidian-footnotes:insert-autonumbered-footnote                       | Alt+0               |
| obsidian-footnotes:insert-named-footnote                              | Alt+-               |
| obsidian-hover-editor:open-new-popover                                | Ctrl+Alt+H          |
| obsidian-kanban:toggle-kanban-view                                    | Alt+V               |
| quickadd:choice:3c55de5c-97b0-429c-9e0c-3335df22fa10                  | Ctrl+C              |
| quickadd:choice:d03adf12-a165-4b3e-b1e0-4d05983a64dd                  | Mod+R               |
| quickadd:runQuickAdd                                                  | Alt+Q               |
| workspace:split-horizontal                                            | Ctrl+Alt+ArrowDown  |
| workspace:split-vertical                                              | Ctrl+Alt+ArrowRight |

> [!tip]+ macOS 下按 `` cmd+ ` `` 可以在多个前台窗口之间切换.

## 主题

- 桌面端: [Minimal](https://minimal.guide/)、Blue Topaz、Border
- 移动端: Things

## snippets

## templates

## 同步、备份、加密

- 本机
    - Git
    - Obsidian 自带的文件恢复功能
    - rsync/FreeFileSync
    - Local Backup 插件
    - [Kopia](https://github.com/kopia/kopia): 推荐
    - macOS 时间机器
- 同步到其他设备
    - 官方同步
    - Syncthing: 推荐
    - Remotely Save 插件
    - LiveSync 插件
- 云
    - GitHub
    - iCloud: 不推荐
    - OneDrive: 不推荐
    - 阿里云盘
- 加密
    - Cryptomator
    - VeraCrypt
    - [Encrypto](https://macpaw.com/encrypto)
    - git-crypt
## 剪藏、发布、导出

- 简悦
- [mika-cn/maoxian-web-clipper](https://github.com/mika-cn/maoxian-web-clipper)
- [web-clipper](https://github.com/webclipper/web-clipper): 不支持 Obsidian
- [obsidian-web](https://github.com/coddingtonbear/obsidian-web): 需要插件 Local REST API
- [deathau/markdownload](https://github.com/deathau/markdownload): 需要插件 Advanced URI, 支持 Obsidian (记得勾选允许访问文件 URL)
- [obsidian-clipper](https://github.com/jplattel/obsidian-clipper): 无需插件, 相比 markdownload 更简单.(但可能剪藏不到内容)

发布
- [Notion](https://www.notion.so/) /Share to NotionNext 插件
- 飞书
- 语雀
- 微信
- 知乎
- GitHub/Enveloppe 插件
- Docusaurus/Obisidiosaurus 插件
- Digital Garden 插件
## 参考

- Official
    - [Home - Obsidian Help](https://help.obsidian.md/)
    - [Home - Developer Documentation](https://docs.obsidian.md/Home)
    - [Obsidian Changelog - Obsidian](https://obsidian.md/changelog)
    - [Obsidian Roadmap - Obsidian](https://obsidian.md/roadmap/)
    - [GitHub - obsidianmd/obsidian-releases: Community plugins list, theme list, and releases of Obsidian.](https://github.com/obsidianmd/obsidian-releases)
    - [Community - Obsidian](https://obsidian.md/community)
    - [Obsidian Forum](https://forum.obsidian.md/)
    - [Obsidian 中文论坛 - Obsidian 知识管理 笔记](https://forum-zh.obsidian.md/)
- Third-party
    - [PKMer](https://pkmer.cn/)
    - [2021年新教程 - Obsidian中文教程 - Obsidian Publish](https://publish.obsidian.md/chinesehelp/01+2021%E6%96%B0%E6%95%99%E7%A8%8B/2021%E5%B9%B4%E6%96%B0%E6%95%99%E7%A8%8B)
    - [Basic writing and formatting syntax - GitHub Docs](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
    - [Markdown Cheat Sheet | Markdown Guide](https://www.markdownguide.org/cheat-sheet/)
    - [GitHub - Yakitrak/obsidian-cli: Interact with Obsidian in the terminal. Open, search, create, update, move and delete notes!](https://github.com/Yakitrak/obsidian-cli)
    - [GitHub - sytone/obsidian-remote: Run Obsidian.md in a browser via a docker container.](https://github.com/sytone/obsidian-remote)
    - [GitHub - secure-77/Perlite: A web-based markdown viewer optimized for Obsidian](https://github.com/secure-77/Perlite)
    - [GitHub - doocs/md: ✍ WeChat Markdown Editor | 一款高度简洁的微信 Markdown 编辑器：支持 Markdown 语法、色盘取色、多图上传、一键下载文档、自定义 CSS 样式、一键重置等特性](https://github.com/doocs/md)
- Themes & CSS Snippets
    - [Home - Minimal Documentation](https://minimal.guide/)
        - [Minimal Theme Settings - Minimal Documentation](https://minimal.guide/plugins/minimal-theme-settings)
        - [Style Settings - Minimal Documentation](https://minimal.guide/plugins/style-settings)
    - [GitHub - Dmytro-Shulha/obsidian-css-snippets: Most common appearance solutions for Obsidian now in a single place. Initially collected by Klaas: https://forum.obsidian.md/t/how-to-achieve-css-code-snippets/8474](https://github.com/Dmytro-Shulha/obsidian-css-snippets)
    - [GitHub - efemkay/obsidian-modular-css-layout: CSS Layout hack for Obsidian.md](https://github.com/efemkay/obsidian-modular-css-layout)
- Plugins
    - [Thino | PKMer.net](https://thino.pkmer.net/)
    - [Outliner.md - Supercharged outliner plugin](https://outliner.md/)
    - [Dataview](https://blacksmithgu.github.io/obsidian-dataview/)
    - [Introduction - Templater](https://silentvoid13.github.io/Templater)
    - [Introduction - Tasks User Guide - Obsidian Publish](https://publish.obsidian.md/tasks/)
    - [Home | QuickAdd](https://quickadd.obsidian.guide/)
    - [Home - Various Complements](https://tadashi-aikawa.github.io/docs-obsidian-various-complements-plugin/)
    - [pdf++](https://ryotaushio.github.io/obsidian-pdf-plus/)
    - [GitHub - remotely-save/remotely-save: Yet another unofficial Obsidian plugin allowing users to synchronize notes between local device and the cloud service. Supports S3, Dropbox, OneDrive, webdav.](https://github.com/remotely-save/remotely-save)
    - [GitHub - tgrosinger/advanced-tables-obsidian: Improved table navigation, formatting, and manipulation in Obsidian.md](https://github.com/tgrosinger/advanced-tables-obsidian)
    - [GitHub - NicoNekoru/obsidan-advanced-table-xt: Plugin that adds features to tables in obsidian including merging, vertical headers, and custom css](https://github.com/NicoNekoru/obsidan-advanced-table-xt)
    - [GitHub - artisticat1/obsidian-latex-suite: Make typesetting LaTeX as fast as handwriting through snippets, text expansion, and editor enhancements](https://github.com/artisticat1/obsidian-latex-suite)
- Others
    - [Moment.js | Docs](https://momentjs.com/docs/#/displaying/format/)
    - [luxon - Immutable date wrapper](https://moment.github.io/luxon/#/formatting?id=table-of-tokens)
    - [Git - gitignore Documentation](https://git-scm.com/docs/gitignore/zh_HANS-CN)
    - [Ignoring Files — Syncthing documentation](https://docs.syncthing.net/users/ignoring.html)
    - [Getting Started Guide | Kopia](https://kopia.io/docs/getting-started/)

## Issues & Tips

> [!faq]+ 首次启动时侧边栏按钮混乱  
> 点击侧边栏第一个图标, 选择一个工作区加载一下, 最好再重启一下 ob.  
> 建议每次更新插件之前保存工作空间布局.

> [!faq]+ 报错找不到文件  
> 比如 Various Complements 的配置文件, QuickAdd、Dataview 的相关脚本文件.  
> 到对应的插件设置页面先关闭相关功能.

> [!warning]+ 清理附件之前, 务必先检查一下是否有坏链接.

> [!tip]+ 阅读模式渲染不正常时, 可以尝试(`cmd+r`)刷新一下.

> [!tip]+ 文件列表选择多个文件: (macOS 下)按住 alt 键, 用鼠标点选.

> [!tip]+ GitHub 支持的 Callout 类型 (关键是首行得留空)
> - note 蓝色
> - tip 绿色
> - important 紫色
> - warning 黄色
> - caution 红色

> [!bug]+ %% 2024/06/18 %% minimal 主题 7.7.3 版本, [dataview 表格空属性错行问题](https://github.com/kepano/obsidian-minimal/issues/754). 降至 [7.4.3](https://github.com/kepano/obsidian-minimal/releases/tag/7.4.3) 无此问题.

> [!bug]+ %% 2024/06/12 %%create-note-in-folder 插件在修改配置之后可能需要重启才能生效.

> [!bug]+ obsidian-scroll-to-top-plugin 在开启缩放时无效

> [!bug]+ obsidian-visually-numbered-headings 插件
> - 修改标题起始层级可能不生效, 需手动改配置文件
> - 标题折叠按钮下移
> - 增添标题时, 可能需手动刷新

> [!bug]+ obsidian-folder-focus-mode

> [!question]+ [Have Obsidian be the handler of .md files / Add ability to use Obsidian as a markdown editor on files outside vault (file association) - Feature requests - Obsidian Forum](https://forum.obsidian.md/t/have-obsidian-be-the-handler-of-md-files-add-ability-to-use-obsidian-as-a-markdown-editor-on-files-outside-vault-file-association/314/26?page=6)

#

[^1]: 比如记录学习 xxx 的笔记, 可以先在 Projects 目录下建立一个 xxx 的目录, 在学习的过程中给每个知识点建立卡片笔记, 完事后归档到对应领域目录.