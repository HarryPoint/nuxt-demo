/**
 * 通过userAgent检查当前环境是否是微信
 * @returns {Boolean}
 */
export const isWx = userAgent => {
  if (!userAgent) {
    return false
  }
  const ua = userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true
  } else {
    return false
  }
}
