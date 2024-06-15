---
created: "2023-06-10 18:37"
modified: "2024-05-21 16:59"
---
```dataview
table rows.file.link as filename
from ""
where file.name != "sortspec"
sort file.name
group by file.folder
sort file.folder
```
