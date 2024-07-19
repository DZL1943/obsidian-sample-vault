# Tasks
# Context
# Habit

```dataviewjs-
const data = [
    //{date: "2024-06-01", content: "666/111"},
]
<%*
var title = tp.file.title;
var [year, month] = title.split('-')
var output = `
const year = "${year}";
const month = "${month}";
`
tR += output
%>
//Habit Calendar Plugin
renderHabitCalendar(this.container, dv, {
    year,
    month,
    data: data.filter((function(e){return e["date"].startsWith(`${year}-${month.toString().padStart(2,0)}`)})),
})
```

# Diary
<%*
const weekdays = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
var now = new Date()
var year = now.getFullYear()
var month = now.getMonth()+1
var lastDate = new Date(year, month+1, 0).getDate()
var days = new Array()
for (i=0; i<lastDate; i++){
    days[i] = new Date(year, month, i+1)
    var weekday = weekdays[days[i].getDay()]
    var output = `## (date:: ${days[i].toLocaleDateString('zh-CN', {year: "numeric", month: "2-digit", day: "2-digit"}).replace(/\//g, "-")}) ${weekday}  (weather:: )  (mood:: )  (habits:: )  (diet:: )  (summary:: )  `
    tR += output+"\n"
}
%>
# Summary