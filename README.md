---
title: README
created: "2024-07-30 13:30"
modified: "2025-01-31 20:32"
editor-width: 88
---

# README

## Overview

![](<Misc/Attachments/Obsidian-20240908154942.png>)

- Obsidian 版本 | 1.8.3-mac-arm64
- 主题 | 默认
- ribbon | 基本上不用
- 标题栏 | 隐藏 | 用 editing-toolbar 和 quick-explorer 替代

## Top folders

```dataview
LIST
FROM "" AND -"Ext"
FLATTEN regexreplace(file.folder, "^([^\/]+\/[^\/]+).*$", "$1") as folder
WHERE folder != "" AND (length(split(folder, "/")) = 1 OR startswith(folder, "Misc/"))
GROUP BY folder
```

## Settings

```json
{
  "defaultViewMode": "preview",
  "livePreview": true,
  "readableLineLength": true,
  "strictLineBreaks": false,
  "propertiesInDocument": "visible",
  "useTab": false,
  "trashOption": "local",
  "promptDelete": false,
  "alwaysUpdateLinks": true,
  "newFileLocation": "current",
  "newLinkFormat": "relative",
  "useMarkdownLinks": true,
  "showUnsupportedFiles": true,
  "attachmentFolderPath": "Misc/Attachments",
  "showInlineTitle": false,
  "showRibbon": false,
  "vimMode": false,
  "showLineNumber": false,
  "pdfExportSettings": {
    "pageSize": "A4",
    "landscape": false,
    "margin": "0",
    "downscalePercent": 100
  },
  "mobileToolbarCommands": [
    "editor:undo",
    "editor:redo",
    "editor:swap-line-up",
    "editor:swap-line-down",
    "editor:indent-list",
    "editor:unindent-list",
    "editor:insert-wikilink",
    "editor:insert-embed",
    "editor:insert-tag",
    "editor:attach-file",
    "editor:set-heading",
    "editor:toggle-bold",
    "editor:toggle-italics",
    "editor:toggle-strikethrough",
    "editor:toggle-highlight",
    "editor:toggle-code",
    "editor:toggle-blockquote",
    "editor:insert-link",
    "editor:toggle-bullet-list",
    "editor:toggle-numbered-list",
    "editor:toggle-checklist-status",
    "editor:configure-toolbar"
  ]
}
```

### Hotkeys

```dataviewjs
dv.list(Object.entries(app.hotkeyManager.customKeys).filter(([k, v]) => v && v[0]).map(([k, v]) => `${k} \`${v[0].modifiers.join('+')}+${v[0].key}\``).sort())
```

## Plugins

```dataviewjs
dv.list(Object.keys(app.plugins.plugins).sort());
```

## Templates

```dataview
list rows.file.link
from "Misc/Templates"
sort file.name desc
group by file.folder
```

## Changelog

- [2024-07-13] 重命名 90_Misc 为 Misc
- [2024-07-18] 重命名 20_Journals 为 20_Private; 增加 Changelog
- [2024-07-18] 更改日期格式 YYYY/MM/DD 为 YYYY-MM-DD
- [2024-07-20] 将 Local、draft 移到 Inbox 中
- [2024-07-27] ~~取消顶层目录名中的前缀编号~~
- [2024-07-28] 禁用 Surfing 插件(不影响 canvas 中的网页)
- [2024-10-04] 拆分库, 重新启用本 repo
- [2024-12-29] 更改日记存储目录
- [2024-12-31] 修复 yearly-template 的问题
- [2025-01-21] 对 pages 内容进行分类
