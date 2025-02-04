---
title: QuickLinks
created: 2024-10-18 17:28
modified: 2024-10-18 17:43
editor-width: 88
---

# QuickLinks

## Root files

```dataviewjs
var files = app.vault.getFiles().filter(f => f.parent.path == "/" && !["sortspec", "Vault", "broken links output"].some(s => f.name.includes(s))).sort((a,b)=>a.name.localeCompare(b.name));
//console.log(files);
dv.list(files.map(f => dv.fileLink(f.path)));
```

## Starred

```dataview
list
rows.file.link
where file.starred and file.folder
group by split(file.folder, "/")[0]
```

## Recents

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

## All

```dataview
table rows.new_title as name, rows.file.cday as created, rows.file.mday as modified
from "" and -"Misc" and -"Ext"
where !econtains(["sortspec", "broken links output"], file.name)
sort file.name, created desc, modified desc
flatten choice(title and title!=file.name, file.link+" "+title, file.link) as new_title
group by file.folder as folder
sort file.folder
```