# histories

```dataviewjs
// Headings you would like to summarise the text for
const headings = ['Context']

// You can update this to filter as you like.
// Here it is only returning results inside the "Daily notes" folder
const pages = dv.pages('"20_Private"').where(p=>dv.func.regexmatch("[0-9]{4}-[0-9]{2}", p.file.name)).sort(p=>p.file.name, 'asc')

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
        title: file.basename,
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
# current

