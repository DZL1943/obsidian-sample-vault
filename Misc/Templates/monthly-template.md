# Tasks
# Context
# Habit

<% tp.file.include("[[habit-calendar-dv]]") %>

# Diary

<% tp.file.include("[[days-h2]]") %>
# Summary
```dataview
table without id
dateformat(date, "MM/dd ccc") as date, weather, mood, habits, summary
where file.path=this.file.path
```
