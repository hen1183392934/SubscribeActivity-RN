/**
 * 根据选择的时间段获取时间范围
 * @param {number} selectedDateIndex  选择的时间段
 * @param {Date} afterDate  自定义的时间 当选择时间段为later时使用
 * @param {Date} beforeDate  自定义的时间 当选择时间段为later时使用
 * @return {after,before}
 */
export const getTimeRange = (
  selectedDateIndex: number,
  afterDate?: Date,
  beforeDate?: Date
): { after: number; before: number } => {
  const now = new Date()
  now.setHours(0)
  now.setMinutes(0)
  now.setSeconds(0) // now 先定位到当天0点0分
  const oneDay: number = 24 * 60 * 60 * 1000
  let after = 0
  let before = 0

  switch (selectedDateIndex) {
    case 1: {
      // TODAY
      after = now.valueOf()
      before = after + oneDay
      break
    }
    case 2: {
      // TOMORROW
      after = now.valueOf() + oneDay
      before = after + oneDay
      break
    }
    case 3: {
      // THIS WEEK
      let day = now.getDay()
      if (day === 0) {
        day = 7
      }
      after = now.valueOf() - oneDay * (day - 1)
      before = after + oneDay * 7
      break
    }
    case 4: {
      // THIS MONTH
      now.setDate(1) // 定位到当月一号 0点
      after = now.valueOf()
      const month = now.getMonth()
      if (month === 11) {
        // 当为12月份时
        // before 定位到明年一月一日0点
        const year = now.getFullYear()
        now.setFullYear(year + 1)
        now.setMonth(1)
        now.setDate(1)
        before = now.valueOf()
      } else {
        now.setMonth(month + 1) // 定位到下个月1号1点
        before = now.valueOf()
      }
      break
    }
    case 5: {
      //LATER
      if (afterDate && beforeDate) {
        before = beforeDate.valueOf()
        after = afterDate.valueOf()
      }
      break
    }
    default:
      break
  }
  return {
    after,
    before,
  }
}
export const englishMonths = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
/**
 * 根据传入的时间获取转化格式后的时间
 * @param {string} timestamp
 * @return string
 */
export const timeFormat = (timestamp = ''): string => {
  const time = timestamp ? new Date(timestamp) : new Date()
  return `${time.getDate()} ${
    englishMonths[time.getMonth()]
  } ${time.getFullYear()} ${time.getHours()}:${
    time.getMinutes() >= 10 ? '' : '0'
  }${time.getMinutes()} `
}
