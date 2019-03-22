import fp from 'lodash/fp'
// 储存页面的全局数据
export const state = () => ({
  // skill页面
  skill: {
    // 是否显示筛选条件遮罩层
    showOkamiFiltersPopup: false
  },
  // 视频播放页面
  videoPlay: {
    // 当前播放视频url
    url: ''
  },
  // 优惠券选择页面
  chooseCoupons: {
    // 技能id
    skillId: '',
    // 下单开始时间
    beginTime: '',
    // 开始时间字符串
    startTimeText: '现在',
    // 下单数量
    num: '',
    // 选中的优惠券的id
    selectedId: ''
  },
  // 回调页面
  pageCallback: {
    aim: undefined,
    result: undefined,
    msg: undefined
  },
  // 聊天页面
  pageChat: {
    // 技能的id,没有这个id将会在顶部显示该大神最受欢迎的技能
    skillId: ''
  }
})

export const mutations = {
  SET_SKILL(state, skill = {}) {
    state.skill = {
      ...state.skill,
      ...skill
    }
  },
  // 通用的MERGE_STATE方法
  MERGE_PAGE_STATE(state, { key, value }) {
    if (Object.prototype.toString.call(state[key]) === '[object Object]') {
      state[key] = {
        ...state[key],
        ...value
      }
    } else {
      state[key] = value
    }
  }
}
