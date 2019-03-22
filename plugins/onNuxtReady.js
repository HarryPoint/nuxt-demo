export default () => {
  window.onNuxtReady(app => {
    console.log('onNuxtReady:ua/SET_LOCATION_HREF')
    app.$store.commit('ua/SET_LOCATION_HREF', location.href)
  })
}
