---
title: QuickLinks
created: 2024-10-18 17:28
modified: 2024-10-18 17:43
editor-width: 80
---

# QuickLinks

## Root files

```dataviewjs
var files = app.vault.getFiles().filter(f => f.parent.path == "/" && !["sortspec", "Vault", "broken links output"].some(s => f.name.includes(s)));

dv.list(files.map(f => dv.fileLink(f.path)));
```

## Starred

```dataview
list
rows.file.link
where file.starred
group by file.folder
```

## Recents

```dataview
TABLE rows.new_title as name
WHERE date(today) - file.mtime <= dur(7 days)
WHERE !econtains(["sortspec", "broken links output"], file.name) and !startswith(file.path, "Misc/")
SORT file.mtime DESC
LIMIT 50
flatten choice(title=file.name, file.link, file.link+" "+title) as new_title
group by file.mday as date
sort date desc
limit 3
```

## All

```dataview
table map(rows,(r) => choice(r.title=r.file.name, r.file.link, r.file.link+" "+r.title)) as title, map(rows.created, (x)=>split(x," ")[0]) as created, map(rows.modified, (x)=>split(x," ")[0]) as modified
from "" and -"Misc" and -"Ext"
where !econtains(["sortspec", "broken links output"], file.name)
sort file.name, created desc, modified desc
group by file.folder
sort file.folder
```