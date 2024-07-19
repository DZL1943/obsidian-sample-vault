```dataviewjs
const data = [
    //{date: "2024-06-01", content: "666/111"},
]

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth()+1;

renderHabitCalendar(this.container, dv, {
    year,
    month,
    data: data.filter((function(e){return e["date"].startsWith(`${year}-${month.toString().padStart(2,0)}`)})),
})
```