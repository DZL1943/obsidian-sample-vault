---
title: README
created: "2024-07-30 13:30"
modified: "2025-02-16 10:30"
editor-width: 88
---

# README

## Overview

![](<Misc/Attachments/Obsidian-20240908154942.png>)

- Obsidian 版本 | 1.8.4-mac-arm64
- 主题 | 默认
- ribbon | 基本上不用
- 标题栏 | 隐藏 | 用 editing-toolbar 和 quick-explorer 替代

## Top folders

```dataview
LIST
FROM "" AND -"Ext"
WHERE file.folder != "" AND length(split(file.folder, "/")) <=2
GROUP BY "`" + file.folder + "`"
```

## Queries

### Root files

```dataviewjs
var files = app.vault.getFiles().filter(f => f.parent.path == "/" && !["sortspec", "Vault", "broken links output"].some(s => f.name.includes(s))).sort((a,b)=>a.name.localeCompare(b.name));
//console.log(files);
dv.list(files.map(f => dv.fileLink(f.path)));
```

### Starred

```dataview
list
rows.file.link
where file.starred and file.folder
group by split(file.folder, "/")[0]
```

### Recents

```dataview
TABLE length(rows) as count, rows.new_title as name
WHERE date(today) - file.mtime <= dur(30 days)
WHERE !econtains(["temp", "sortspec", "broken links output"], file.name) and !startswith(file.path, "Misc/")
SORT file.mtime DESC
LIMIT 100
flatten choice(title and title!=file.name, file.link+" "+title, file.link) as new_title
group by file.mday as date
sort date desc
limit 5
```

### All

```dataview
table rows.new_title as name, rows.file.cday as created, rows.file.mday as modified
from "" and -"Misc" and -"Ext"
where !econtains(["sortspec", "broken links output"], file.name)
sort file.name, created desc, modified desc
flatten choice(title and title!=file.name, file.link+" "+title, file.link) as new_title
group by file.folder as folder
sort file.folder
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
