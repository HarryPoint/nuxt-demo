// 储存接口/nav.json的数据....先放在这里,后面放到page store里面去
export const state = () => ({
  // 当前选中的城市
  city: '全部'
})

export const mutations = {
  SET_CITY(state, city = []) {
    state.city = city
  }
}
