---
created: "2023-06-10 18:37"
modified: "2024-05-21 16:59"
cssclasses: wide
---
```dataview
table rows.file.link as filename, rows.created as created, rows.modified as modified
from ""
where file.name != "sortspec"
sort file.name, created desc, modified desc
group by file.folder
sort file.folder
```
