function generate_week_days({
  offset = 0,
  prefix = "- ",
  dataview = true,
  tp,
} = {}) {
  const weekdayMap = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];

  return Array.from({ length: 7 }, (_, i) => {
    const date = tp.date.weekday(
      "YYYY-MM-DD",
      i,
      tp.date.weekday("YYYY-MM-DD", offset * 7)
    );
    return dataview
      ? `${prefix}${weekdayMap[i]}  (date:: ${date})  (weather:: )  (mood:: )  (diet:: )  (habits:: )  (summary:: )  `
      : `${prefix}${weekdayMap[i]}  ${date}`;
  }).join("\n");
}

module.exports = generate_week_days;
