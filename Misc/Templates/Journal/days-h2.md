<%*
const weekdays = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
//var [year, month] = tp.file.title.split('-')
var now = new Date()
var year = now.getFullYear()
var month = now.getMonth()
var lastDate = new Date(year, month+1, 0).getDate()
var days = new Array()
for (i=0; i<lastDate; i++){
    days[i] = new Date(year, month, i+1)
    var weekday = weekdays[days[i].getDay()]
    var output = `## (date:: ${days[i].toLocaleDateString('zh-CN', {year: "numeric", month: "2-digit", day: "2-digit"}).replace(/\//g, "-")}) ${weekday}  (weather:: )  (mood:: )  (diet:: )  (habits:: )  (summary:: )  `
    tR += output+"\n"
}
%>