# Tasks
# Context
# Habit

```dataviewjs-
const data = [
    //{date: "2024-06-01", content: "666/111"},
]

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth()+1;
<%*
var title = tp.file.title;
if (/[0-9]{4}-[0-9]{2}/.test(title)) {
    var [year, month] = title.split('-')
    var output = `
const year = "${year}";
const month = "${month}";
`
tR += output
}
%>
try{//Habit Calendar Plugin
renderHabitCalendar(this.container, dv, {
    year,
    month,
    data: data.filter((function(e){return e["date"].startsWith(`${year}-${month.toString().padStart(2,0)}`)})),
})}catch(e){console.log(e)}
```

# Diary

<% tp.file.include("[[days-h2]]") %>
# Summary
```dataview
table without id
dateformat(date, "MM/dd ccc") as date, weather, mood, habits, summary
where file.path=this.file.path
```
