---
cssclasses: wide
editor-width: 80
obsidianUIMode: preview
obsidianEditingMode: source
---

```dataviewjs
function getISOWeek(d) {
  const date = new Date(d);
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  return Math.floor((date - new Date(date.getFullYear(), 0, 1)) / 6048e5) + 1;
}

function getTodayInfo(lang = 'zh') {
  const now = new Date();
  const year = now.getFullYear();
  
  // 创建统一的日期格式器（包含时区信息）
  const dateFormat = new Intl.DateTimeFormat(lang === 'zh' ? 'zh-CN' : 'en-US', {
    month: lang === 'zh' ? '2-digit' : 'short',
    day: '2-digit',
    year: 'numeric',
    weekday: 'long',
    timeZoneName: 'short' // 添加时区信息
  });
  
  // 一次性获取所有日期组件（包括时区）
  const dateParts = dateFormat.formatToParts(now);
  const parts = Object.fromEntries(
    dateParts
      .filter(part => ['month', 'day', 'weekday', 'year', 'timeZoneName'].includes(part.type))
      .map(part => [part.type, part.value])
  );
  
  const weekNumber = getISOWeek(now);

  // 根据语言构建输出
  if (lang === 'zh') {
    return `现在是 ${year}年${parts.month}月${parts.day}日, ${parts.weekday}, 第${weekNumber}周, ${parts.timeZoneName}`;
  } else {
    return `Today is ${parts.weekday}, ${parts.month} ${parts.day} ${parts.year}, Week ${weekNumber}, ${parts.timeZoneName}`;
  }
}

// 使用示例
dv.paragraph(getTodayInfo());
dv.paragraph(getTodayInfo('en'));
```

[Tasks](<Tasks.md>) [Moments](<Moments.md>) [Insights](<Insights.md>)

# Timestamps

```dataviewjs
dv.pages('').where(p=>dv.func.contains(p.file.folder, dv.current().file.folder)).where(p=>dv.func.regexmatch("^[0-9]{8,15}.*", p.file.name)).sort(p=>p.file.name, "desc").limit(30).forEach(p=>{
    dv.paragraph(`
>[!cite]- ${p.file.link} : ${p.title?p.title:""} : ${p.description?p.description:""}
>![[${p.file.link.path} | clean no-title]]
    `);
})
```

# Daily

```dataview
list rows.file.link
where contains(file.folder, this.file.folder)
where regexmatch("[0-9]{4}-[0-9]{2}-[0-9]{2}", file.name)
sort file.name desc
limit 30
```

# Weekly

```dataview
list rows.file.link
where contains(file.folder, this.file.folder)
where regexmatch("[0-9]{4}-W[0-9]{2}", file.name)
sort file.name desc
limit 12
```

# Monthly

```dataview
list rows.file.link
where contains(file.folder, this.file.folder)
where regexmatch("[0-9]{4}-[0-9]{2}", file.name)
sort file.name desc
limit 12
```

# Quarterly

# Yearly

```dataview
list rows.file.link
where contains(file.folder, this.file.folder)
where regexmatch("[0-9]{4}", file.name)
sort file.name desc
limit 10
```
