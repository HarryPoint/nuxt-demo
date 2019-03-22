/**
 * userAgent相关的内容放在这个store
 */
import fp from 'lodash/fp'
import bowser from 'bowser'

export const state = () => ({
  // userAgent
  userAgent: '',
  // initial request的host
  initialHost: '',
  locationHref: ''
})

export const getters = {
  // userAgent's parse
  parse({ userAgent }) {
    if (!userAgent) return ''
    const browser = bowser.getParser(userAgent)
    const parse = browser.getResult()
    return parse
  },
  // 小写的userAgent
  userAgentLowerCase({ userAgent = '' }) {
    return userAgent.toLowerCase()
  },
  // 浏览器信息
  browser({}, { parse }) {
    return parse.browser
  },
  // engine(浏览器内核) 信息
  engine({}, { parse }) {
    return parse.engine
  },
  // os信息
  os({}, { parse }) {
    return parse.os
  },
  // platform信息
  platform({}, { parse }) {
    return parse.platform
  },
  // 是否是pc
  isPC({}, { platform }) {
    return fp.flowRight(
      fp.equals('desktop'),
      fp.toLower,
      fp.get('type')
    )(platform)
  },
  // 是否是手机
  isMobile({}, { platform }) {
    return fp.flowRight(
      fp.equals('mobile'),
      fp.toLower,
      fp.get('type')
    )(platform)
  },
  // 是ios吗
  isIOS({}, { os }) {
    return fp.flowRight(
      fp.equals('ios'),
      fp.toLower,
      fp.get('name')
    )(os)
  },
  // 是否是安卓
  isAndroid({}, { os }) {
    return fp.flowRight(
      fp.equals('android'),
      fp.toLower,
      fp.get('name')
    )(os)
  },
  // 是微信吗
  isWx({}, { userAgentLowerCase }) {
    return userAgentLowerCase.indexOf('micromessenger') !== -1
  },
  // 是悦动吗
  isYeDone({ locationHref = '' }) {
    // 这样子判断不准确....
    // return initialHost.indexOf('yedone') !== -1
    // 这样子才准确(在这里不管怎么样使用location貌似都会出问题)
    return locationHref.indexOf('yedone') !== -1
    // return true
  }
}

export const mutations = {
  SET_USER_AGENT(state, userAgent) {
    state.userAgent = userAgent
  },
  SET_INITIAL_HOST(state, initialHost) {
    state.initialHost = initialHost
  },
  SET_LOCATION_HREF(state, locationHref) {
    state.locationHref = locationHref
  }
}
