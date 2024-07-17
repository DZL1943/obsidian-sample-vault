---
editor-width: 40
---
# Daily

```dataview
table without id
dateformat(date, "MM/dd ccc") as date, weather, mood, habits, summary
from "20_Private"
where regexmatch("[0-9]{4}-[0-9]{2}", file.name)
sort file.name desc
limit 1
```

```dataview
list
from "20_Private"
where regexmatch("[0-9]{4}-[0-9]{2}-[0-9]{2}", file.name)
sort file.name desc
limit 30
```
# Weekly

```dataview
list
from "20_Private"
where regexmatch("[0-9]{4}-W[0-9]{2}", file.name)
sort file.name desc
limit 12
```

# Monthly

```dataview
list
from "20_Private"
where regexmatch("[0-9]{4}-[0-9]{2}", file.name)
sort file.name desc
limit 12
```

# Quarterly

# Yearly

```dataview
list
from "20_Private"
where regexmatch("[0-9]{4}", file.name)
sort file.name desc
limit 10
```
