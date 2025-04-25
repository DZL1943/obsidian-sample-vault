function generate_week_days({offset=0, prefix="- ", dataview=true, tp}={}){
  const weekdayMap = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];

  let output = "";
  for(let i=0;i<7;i++){
    let date = tp.date.weekday("YYYY-MM-DD", i, tp.date.weekday("YYYY-MM-DD", 0+offset*7));
    output += dataview
      ? `${prefix}${weekdayMap[i]}  (date:: ${date})  (weather:: )  (mood:: )  (diet:: )  (habits:: )  (summary:: )\n`
      : `${prefix}${weekdayMap[i]}  ${date}\n`;
  }
  return output;
}

module.exports = generate_week_days;