# <% tp.file.title %>

```dataviewjs
function getISOWeek(d) {
  const date = new Date(d);
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  return Math.floor((date - new Date(date.getFullYear(), 0, 1)) / 6048e5) + 1;
}

const currentWeek = getISOWeek(new Date());
let toc = ">MM: " + Array.from({length:12}, (_,i) => 
  `[M${(i+1).toString().padStart(2,'0')}](#M${(i+1).toString().padStart(2,'0')})`
).join(' ');

for (let q = 1; q <= 4; q++) {
  const start = (q - 1) * 13 + 1;
  toc += `\n>[Q${q}](#Q${q}): ` + Array.from({length:13}, (_,i) => {
    const week = start + i;
    return week === currentWeek 
      ? `[**W${week.toString().padStart(2,'0')}**](#W${week.toString().padStart(2,'0')})` 
      : `[W${week.toString().padStart(2,'0')}](#W${week.toString().padStart(2,'0')})`;
  }).join(' ');
}

dv.paragraph(`> [!info]- TOC\n${toc}`);
```

```dataview
table without id
dateformat(L.date, "MM/dd ccc") as date, L.weather as weather, L.mood as mood, L.habits as habits, L.summary+"<br>"+join(L.children.text,"<br>") as summary
where file.path = this.file.path
flatten file.lists as L
where L.summary or L.habits
sort L.date desc
limit 30
```

## M01
## M02
## M03
## M04
## M05
## M06
## M07
## M08
## M09
## M10
## M11
## M12

## Q1

### W01
### W02
### W03
### W04
### W05
### W06
### W07
### W08
### W09
### W10
### W11
### W12
### W13

## Q2

### W14
### W15
### W16
### W17
### W18
### W19
### W20
### W21
### W22
### W23
### W24
### W25
### W26

## Q3

### W27
### W28
### W29
### W30
### W31
### W32
### W33
### W34
### W35
### W36
### W37
### W38
### W39

## Q4

### W40
### W41
### W42
### W43
### W44
### W45
### W46
### W47
### W48
### W49
### W50
### W51
### W52
