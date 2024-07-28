---
editor-width: 40
cssclasses: wide
---

# Habit, Task, Context

```dataviewjs
// Headings you would like to summarise the text for
const headings = ['Habit', 'Task', 'Context']

// You can update this to filter as you like.
// Here it is only returning results inside the "Daily notes" folder
const pages = dv.pages('"20_Private"').where(p=>dv.func.regexmatch("[0-9]{4}-[0-9]{2}", p.file.name)).sort(p=>p.file.name, 'desc').limit(12)

const output = {}
headings.forEach(x => output[x] = [])
for (const page of pages) {
  const file = app.vault.getAbstractFileByPath(page.file.path)
  // Read the file contents
  const contents = await app.vault.read(file)
  for (let heading of headings) {
    // Sanitise the provided heading to use in a regex
    heading = heading.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&')
    const regex = `(?<=^|\n)#+ ${heading}\r?\n(.*?)(?=\n#+ |\n---|$)`
    // Extract the summary
    for (const block of contents.match(new RegExp(regex, 'isg')) || []) {
      const match = block.match(new RegExp(regex, 'is'))
      output[heading].push({
        title: page.file.link,
        text: match[1].trim()
      })
    }
  }
}
Object.keys(output).forEach(heading => {
  dv.header(2, heading)
  output[heading].forEach(entry => {
    dv.header(3, entry.title)
    dv.paragraph(entry.text)
  })
})
```

# Timestamp

```dataview
list rows.file.link + title + ":" + description
where contains(file.folder, this.file.folder)
where regexmatch("[0-9]{8,15}", file.name)
sort file.name desc
limit 30
```

# Daily
```dataview
table without id
dateformat(date, "MM/dd ccc") as date, weather, mood, habits, summary
where contains(file.folder, this.file.folder)
where regexmatch("[0-9]{4}-[0-9]{2}", file.name)
sort file.name desc
limit 1
```

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
