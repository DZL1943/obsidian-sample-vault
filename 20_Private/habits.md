## 2024

```dataviewjs-
// for habit calendar plugin
const data =[
    {date: "2024-06-01", content: "666"},
    {date: "2024-07-01", content: "777"},
    {date: "2024-07-02", content: "a\nb"},
]

const year = "2024"

for (let month=1; month<=12; month++) {
    renderHabitCalendar(this.container, dv, {
        year,
        month,
        data: data.filter((function(e){return e["date"].startsWith(`${year}-${month.toString().padStart(2,0)}`)})),
    })
}
```