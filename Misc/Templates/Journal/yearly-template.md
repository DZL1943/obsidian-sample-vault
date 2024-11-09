---
obsidianUIMode: preview
obsidianEditingMode: source
editor-width: 80
---

`$=dv.span(dv.func.link(dv.func.join(dv.func.list("#", dv.func.dateformat(dv.date("today"), "yyyy-'W'WW"), " (", moment().startOf("isoweek").format("MM/DD"), " ~ ", moment().endOf("isoweek").format("MM/DD"), ")"), ""), "本周"))` | `=link("#"+dateformat(date(today), "yyyy-MM"), "本月")`

# Daily

```dataview
table without id
dateformat(L.date, "MM/dd ccc") as date, L.weather as weather, L.mood as mood, L.habits as habits, L.summary+"<br>"+join(L.children.text,"<br>") as summary
where file.path = this.file.path
flatten file.lists as L
where L.summary or L.habits
sort L.date desc
limit 30
```

# Weekly

<% tp.file.include("[[weeks-h2.md]]") %>

# Monthly

<% tp.file.include("[[months-h2.md]]") %>

# Quarterly

# Summary

