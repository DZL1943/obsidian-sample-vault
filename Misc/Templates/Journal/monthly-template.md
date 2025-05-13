# Plan

# Log

<% tp.user.generate_month_days({tp, prefix:"## "})%>
# Summary

```dataview
table without id
dateformat(date, "MM/dd ccc") as date, weather, mood, habits, summary
where file.path=this.file.path
```
