---
title: QuickLinks
created: "2024-10-18 17:28"
modified: "2024-10-18 17:43"
---

# QuickLinks

## ContributionGraph

```contributionGraph
title: Contributions
graphType: default
dateRangeValue: 90
dateRangeType: LATEST_DAYS
startOfWeek: 1
showCellRuleIndicators: true
titleStyle:
  textAlign: center
  fontSize: 15px
  fontWeight: normal
dataSource:
  type: PAGE
  value: ""
  dateField: {}
fillTheScreen: true
enableMainContainerShadow: false
mainContainerStyle:
  boxShadow: rgba(0, 0, 0, 0.16) 0px 1px 4px
cellStyleRules: []
```

## Root files

```dataview
LIST
WHERE !file.folder and !econtains(["sortspec", "Vault", "broken links output"], file.name)
```

## Starred

```dataview
list
file.path
where file.starred
sort file.path
```

## Recents

```dataview
TABLE rows.file.link as file, rows.title as title, rows.file.path as path
WHERE date(today) - file.mtime <= dur(3 days)
WHERE file.name != this.file.name and !startswith(file.path, "Misc/")
SORT file.mtime DESC
LIMIT 30
group by file.mday as date
sort date desc
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