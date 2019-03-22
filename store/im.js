import fp from 'lodash/fp'

// 格式化时间的方法
const formatTime = timestamp => {
  function zeroize(num) {
    return (String(num).length == 1 ? '0' : '') + num
  }

  const curTimestamp = parseInt(new Date().getTime() / 1000) //当前时间戳

  const curDate = new Date(curTimestamp * 1000) // 当前时间日期对象
  const tmDate = new Date(timestamp * 1000) // 参数时间戳转换成的日期对象

  const Y = tmDate.getFullYear(),
    m = tmDate.getMonth() + 1,
    d = tmDate.getDate()
  const H = tmDate.getHours(),
    i = tmDate.getMinutes(),
    s = tmDate.getSeconds()

  if (
    curDate.getFullYear() == Y &&
    curDate.getMonth() + 1 == m &&
    curDate.getDate() == d
  ) {
    return zeroize(H) + ':' + zeroize(i)
  } else {
    var newDate = new Date((curTimestamp - 86400) * 1000) // 参数中的时间戳加一天转换成的日期对象
    if (
      newDate.getFullYear() == Y &&
      newDate.getMonth() + 1 == m &&
      newDate.getDate() == d
    ) {
      return '昨天' + zeroize(H) + ':' + zeroize(i)
    } else if (curDate.getFullYear() == Y) {
      return zeroize(m) + '月' + zeroize(d) + '日 '
    } else {
      return Y + '年' + zeroize(m) + '月' + zeroize(d) + '日 '
    }
  }
}

// 格式化消息的方法
const formatMsgText = msg => {
  const MsgType = fp.get('LastMsg.MsgBody[0].MsgType', msg)
  console.log('msg', fp)
  if (MsgType === 'TIMCustomElem') {
    try {
      let _data = JSON.parse(
        fp.get('LastMsg.MsgBody[0].MsgContent.data', msg) ||
          fp.get('LastMsg.MsgBody[0].MsgContent.Data', msg) ||
          ''
      )
      let _key = Object.getOwnPropertyNames(_data)[0]
      switch (_key) {
        case 'extra_gift_key':
          return '[礼物]'
        case 'extra_red_packet_key':
          return '[红包]'
        case 'extra_game_count_share_key':
          return '[账号分享]'
        default:
          return '[其他]'
      }
    } catch (error) {}
  }
  console.log(MsgType)

  switch (MsgType) {
    case 'TIMTextElem':
      return fp.get('LastMsg.MsgBody[0].MsgContent.Text', msg)
    case 'TIMImageElem':
      return '[图片]'
    case 'TIMSoundElem':
      return '[语音]'
    default:
      return '[其他]'
  }
}

export const state = () => ({
  // 是否已经登录
  isImLogged: false,
  // im id
  imId: '',
  // im token
  imToken: '',
  identifierNick: '',
  // 消息列表
  msgsList: [],
  // 是否需要重新拉数据,每当需要更新的时候就设置为true
  isFetchMsgsListNeeded: true,
  // 有新的消息,在页面中可以同过监听这个state的改变来感知有的消息
  newMsgNotify: {}
})

export const mutations = {
  // 设置是否已经登录
  SET_IM_IS_LOGGED(state, isImLogged = false) {
    state.isImLogged = isImLogged
  },
  // 设置imId
  SET_IM_ID(state, imId = '') {
    state.imId = imId
  },
  // 设置imToken
  SET_IM_TOKEN(state, imToken = '') {
    state.imToken = imToken
  },
  // 设置msgsList
  SET_IM_MSGS_LIST(state, msgsList = []) {
    state.msgsList = msgsList
  },
  // 设置isFetchMsgsListNeeded
  SET_IS_FETCH_MSGS_LIST_NEEDED(state, isFetchMsgsListNeeded = false) {
    state.isFetchMsgsListNeeded = isFetchMsgsListNeeded
  },
  // 设置newMsgNotify
  SET_NEW_MSG_NOTIFY(state, newMsgNotify = {}) {
    state.newMsgNotify = newMsgNotify
  }
}

export const getters = {
  // 系统消息To_Account
  systemAccount() {
    return [
      '3377271179',
      '4113142680',
      '352881030',
      '2567542906',
      '1783472091',
      '1485041667',
      '1402457643'
    ]
  },
  // 消息列表需要的数据格式
  gImMsgsList({ msgsList }, { systemAccount }) {
    return fp.flowRight(
      // 格式转换
      fp.map(item => ({
        // 可根据这个id取得yay用户的id
        id: item.To_Account,
        avatarUrl: item.C2cImage,
        title: item.C2cNick,
        text: fp.unescape(formatMsgText(item)),
        time: formatTime(item.MsgTimeStamp),
        badgeNum: item.UnreadMsgCount,
        linkTo: ''
      })),
      // 过滤掉系统消息
      fp.filter(item => systemAccount.indexOf(item.To_Account) === -1)
    )(msgsList)
  },
  // 总的未读消息数
  gImTotalUnreadCount({}, { gImMsgsList }) {
    return fp.reduce(
      (rs, item) => {
        if (item.badgeNum > 0) {
          rs += item.badgeNum
        }
        return rs
      },
      0,
      gImMsgsList
    )
  }
}

export const actions = {
  // im 登录https://cloud.tencent.com/document/product/269/1595#.E7.94.A8.E6.88.B7.E4.BF.A1.E6.81.AF.E5.AF.B9.E8.B1.A1-logininfo
  async imLogin(
    { commit, dispatch },
    {
      // 用户信息对象
      loginInfo = {},
      // 事件回调对象
      listeners = {},
      // 其他对象
      options = {}
    }
  ) {
    loginInfo = {
      ...{
        sdkAppID:
          process.env.API_FORMAL === 'apiFormal' ? '1400059779' : '1400062395',
        accountType: '21621'
      },
      ...loginInfo
    }
    listeners = {
      ...{
        onMsgNotify: msg => {
          console.log('有新的im消息', msg)
          dispatch('fetchImMsgsListIfNeeded')
          commit('SET_IS_FETCH_MSGS_LIST_NEEDED', true)
          commit('SET_NEW_MSG_NOTIFY', fp.cloneDeep(msg))
        },
        onBigGroupMsgNotify: () => {},
        onC2cEventNotifys: () => {},
        onGroupSystemNotifys: () => {},
        onGroupInfoChangeNotify: () => {},
        onFriendSystemNotifys: () => {},
        onProfileSystemNotifys: () => {},
        onC2cEventNotifys: () => {},
        onAppliedDownloadUrl: () => {},
        onKickedEventCall: () => {}
      },
      ...listeners
    }
    options = {
      ...{
        isLogOn: false
      },
      options
    }
    try {
      const resp = await this.$utils.im.login(loginInfo, listeners, options)
      console.log('imLogin', resp)
      commit('SET_IM_IS_LOGGED', true)
    } catch (error) {
      this.$imCatch(error)
    }
  },
  // im 登录 如果需要的话
  async imLoginIfNeeded({ state, commit, dispatch }) {
    if (state.isImLogged) {
      return Promise.resolve()
    } else {
      try {
        const imInfoRes = await this.$api.getImLoginInfo()
        const { im_id, im_token } = fp.get('data.data', imInfoRes)
        commit('SET_IM_ID', im_id)
        commit('SET_IM_TOKEN', im_token)
        return await dispatch('imLogin', {
          loginInfo: {
            identifier: im_id,
            userSig: im_token
          }
        })
      } catch (error) {
        this.$imCatch(error)
      }
    }
  },
  // im 取得最近联系人列表
  async fetchImMsgsList({ commit }) {
    try {
      const res = await this.$utils.im.getRecentContactList({})
      let msgsList = res.SessionItem
      await this.$utils.im.syncMsgs({})
      const sessMap = webim.MsgStore.sessMap()
      // 处理未读消息数
      fp.forEach(sess => {
        const id = sess.id()
        if (id) {
          fp.forEach(msg => {
            if (msg.To_Account === id) {
              msg.UnreadMsgCount = sess.unread()
              return false
            }
          }, msgsList)
        }
      }, sessMap)
      commit('SET_IM_MSGS_LIST', msgsList || [])
      commit('SET_IS_FETCH_MSGS_LIST_NEEDED', false)
    } catch (error) {
      this.$imCatch(error)
    }
  },
  // im 取得最近联系人列表 如果需要的话
  async fetchImMsgsListIfNeeded({ state, dispatch }) {
    // 判断条件还不好用....所以永远请求
    return await dispatch('fetchImMsgsList')
  },
  // 删除最近联系人
  async deleteImChat({ state, dispatch }, { toAccount }) {
    // 校验该联系人有没有在列表里面
    const msg = fp.find(msg => msg.To_Account === toAccount, state.msgsList)
    if (!msg) {
      console.log('该联系人不存在')
      throw new Error({
        message: '删除失败,该联系人不存在'
      })
    }
    console.log('该联系人存在', {
      To_Account: toAccount,
      chatType: msg.Type
    })
    try {
      const resp = await this.$utils.im.deleteChat({
        To_Account: toAccount,
        chatType: msg.Type
      })
      if (resp.ActionStatus === 'OK') {
        // 重新更新整个列表
        await dispatch('fetchImMsgsList')
        return resp
      } else {
        throw {
          ErrorInfo: '删除失败'
        }
      }
    } catch (error) {
      throw error
    }
  }
}
