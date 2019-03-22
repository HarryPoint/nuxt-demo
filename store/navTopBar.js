// 主要为了改变layout中导航的参数才有的该store
const defaultState = {
  // 标题
  title: '...',
  // 关联的滚动容器的scrollY
  scrollY: 0,
  // 透明导航是否展示标题
  showTitleInTransparent: false,
  // 透明导航返回键的主题,可选white和black
  ThemeInTransparent: 'white'
}
export const state = () => ({ ...defaultState })

export const mutations = {
  SET_TITLE(state, title = '标题') {
    state.title = title
  },
  SET_SCROLLY(state, scrollY = 0) {
    state.scrollY = scrollY
  },
  SET_SHOW_TITLE_IN_TRANSPARENT(state, showTitleInTransparent = false) {
    state.showTitleInTransparent = showTitleInTransparent
  },
  SET_BACK_COLOR_TRANSPARENT(state, backColorTransparent = false) {
    state.backColorTransparent = backColorTransparent
  },
  // 还原所有设置
  RESET(state) {
    state = { ...defaultState }
  }
}
