```dataviewjs
const data = [
    //{date: "2024-06-01", content: "666/111"},
]
<%*
var title = tp.file.title;
if (/[0-9]{4}-[0-9]{2}/.test(title)) {
    var [year, month] = title.split('-')
} else {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth()+1;
}
var output = `
const year = "${year}";
const month = "${month}";
`
tR += output
%>
try{//Habit Calendar Plugin
renderHabitCalendar(this.container, dv, {
    year,
    month,
    data: data.filter((function(e){return e["date"].startsWith(`${year}-${month.toString().padStart(2,0)}`)})),
})}catch(e){console.log(e)}
```