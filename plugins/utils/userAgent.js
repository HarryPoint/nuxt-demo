// 通过userAgent检查当前环境是否是微信
export const isWx = (userAgent = '') => {
  const ua = userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true
  } else {
    return false
  }
}

// 通过userAgent检查当前环境是否是pc
export const isPC = (userAgent = '') => {
  const ua = userAgent.toLowerCase()
  if (ua.indexOf('mobile') !== -1) {
    // 移动端
    return false
  } else {
    // PC
    return true
  }
}
