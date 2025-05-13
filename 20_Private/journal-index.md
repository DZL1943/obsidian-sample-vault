---
cssclasses: wide
editor-width: 80
obsidianUIMode: preview
obsidianEditingMode: source
---

[tasks](tasks.md) [moments](moments.md) [insights](insights.md)

# Timestamps

```dataviewjs
dv.pages('').where(p=>dv.func.contains(p.file.folder, dv.current().file.folder)).where(p=>dv.func.regexmatch("^[0-9]{8,15}.*", p.file.name)).sort(p=>p.file.name, "desc").limit(30).forEach(p=>{
    dv.paragraph(`
>[!cite]- ${p.file.link} : ${p.title?p.title:""} : ${p.description?p.description:""}
>![[${p.file.link.path} | clean no-title]]
    `);
})
```

# Daily

```dataview
list rows.file.link
where contains(file.folder, this.file.folder)
where regexmatch("[0-9]{4}-[0-9]{2}-[0-9]{2}", file.name)
sort file.name desc
limit 30
```

# Weekly

```dataview
list rows.file.link
where contains(file.folder, this.file.folder)
where regexmatch("[0-9]{4}-W[0-9]{2}", file.name)
sort file.name desc
limit 12
```

# Monthly

```dataview
list rows.file.link
where contains(file.folder, this.file.folder)
where regexmatch("[0-9]{4}-[0-9]{2}", file.name)
sort file.name desc
limit 12
```

# Quarterly

# Yearly

```dataview
list rows.file.link
where contains(file.folder, this.file.folder)
where regexmatch("[0-9]{4}", file.name)
sort file.name desc
limit 10
```
