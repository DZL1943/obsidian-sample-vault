---
obsidianUIMode: preview
obsidianEditingMode: source
---

# Weekly

<% tp.file.include("[[weeks-h2.md]]") %>

# Monthly

<% tp.file.include("[[months-h2.md]]") %>

# Quarterly

# Data

```dataviewjs
// Headings you would like to summarise the text for
// 注意标题前后不能有多余的空格, 前后应有空行
const headings = ['Context', 'Habit']

// 修改这里
const pages = dv.pages('"20_Private"').where(p=>dv.func.contains(p.file.folder, dv.current().file.folder)).where(p=>dv.func.regexmatch("[0-9]{4}-[0-9]{2}", p.file.name)).sort(p=>p.file.name, 'desc').limit(12)

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

# Summary

```dataview
table without id
dateformat(date, "MM/dd ccc") as date, weather, mood, habits, summary
where file.path=this.file.path
```
