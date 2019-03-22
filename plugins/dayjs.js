import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

export default ({}, inject) => {
  // https://github.com/iamkun/dayjs/issues/376
  const _dayjs = (date, c) => {
    dayjs.locale('zh-cn')
    dayjs.extend(relativeTime)
    if (typeof date === 'string') date = date.replace(/-/g, '/')
    return dayjs(date, c)
  }
  inject('dayjs', _dayjs)
}
