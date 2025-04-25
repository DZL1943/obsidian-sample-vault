function generate_month_days({
  year,
  month,
  offset = 0,
  prefix = "- ",
  dataview = false,
  tp,
} = {}) {
  if (!(year && month)) {
    try {
      // 尝试从标题解析年月（格式示例：2023-10）
      const [titleYear, titleMonth] = tp.file.title.split("-");
      year = parseInt(titleYear);
      month = parseInt(titleMonth);

      // 验证解析结果有效性
      if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
        throw new Error("无效的日期格式");
      }
    } catch (e) {
      // 解析失败时回退到当前日期
      console.log(e);
      const now = new Date();
      year = now.getFullYear();
      month = now.getMonth() + 1;
    }
  }

  month += offset; //todo

  const weekdayMap = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

  const getLocalDate = (y, m, d) => {
    const date = new Date(y, m - 1, d);
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      weekday: date.getDay(),
    };
  };

  let lastDate = new Date(year, month, 0).getDate();
  let output = "";
  for (let day = 1; day <= lastDate; day++) {
    const {
      year: y,
      month: m,
      day: d,
      weekday,
    } = getLocalDate(year, month, day);
    const pad = (n) => n.toString().padStart(2, "0");
    const dateStr = `${y}-${pad(m)}-${pad(d)}`;

    output += dataview
      ? `${prefix}${weekdayMap[weekday]}  (date:: ${dateStr})  (weather:: )  (mood:: )  (diet:: )  (habits:: )  (summary:: )\n`
      : `${prefix}${dateStr}\n`;
  }
  return output;
}

module.exports = generate_month_days;