```dataviewjs
// 按子目录分组, 列出其中的所有文件 
const fs = require('fs')

var basedir = app.vault.adapter.basePath
var currentdir = dv.current().file.folder
var subfolders = fs.readdirSync(`${basedir}/${currentdir}`)
subfolders.sort((a,b)=>a.localeCompare(b))

for (let d of subfolders){
    let p = `${basedir}/${currentdir}/${d}`
    if (fs.statSync(p).isDirectory()){
        dv.header(2, d)
        dv.list(dv.pages(`"${currentdir}/${d}"`).where(p=>p.file.name != 'sortspec').sort(p=>p.file.name, 'asc').file.link)
    }
}
```