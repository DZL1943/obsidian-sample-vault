# Tasks

# Context

# Habit

<% tp.file.include("[[habit-calendar-dv.md]]") %>

# Diary

<% tp.file.include("[[days-h2.md]]") %>
# Summary
```dataview
table without id
dateformat(date, "MM/dd ccc") as date, weather, mood, habits, summary
where file.path=this.file.path
```
