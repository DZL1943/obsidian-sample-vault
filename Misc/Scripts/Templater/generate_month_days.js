function generate_month_days({
  year,
  month,
  offset = 0,
  prefix = "- ",
  dataview = false,
  tp,
} = {}) {
  const isValidDate = (y, m) =>
    Number.isFinite(y) && Number.isFinite(m) && m >= 1 && m <= 12;

  if (!isValidDate(year, month)) {
    [year, month] = tp.file.title.split("-").map(Number);
  }

  if (!isValidDate(year, month)) {
    const now = new Date();
    [year, month] = [now.getFullYear(), now.getMonth() + 1];
  }

  month += offset;  //todo

  const lastDate = new Date(year, month, 0).getDate();
  const weekdayMap = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const pad = (n) => n.toString().padStart(2, "0");

  return Array.from({ length: lastDate }, (_, i) => {
    const date = new Date(year, month - 1, i + 1);
    const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    // const dateStr = new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);

    return dataview
      ? `${prefix}${
          weekdayMap[date.getDay()]
        }  (date:: ${dateStr})  (weather:: )  (mood:: )  (diet:: )  (habits:: )  (summary:: )`
      : `${prefix}${dateStr}`;
  }).join("\n");
}

module.exports = generate_month_days;
