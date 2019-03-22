export default ({ store, app: { router } }) => {
  router.afterEach(() => {
    // hack...难道还是要放到mixins里面去
    // setTimeout(() => {
    //   store.commit('ua/SET_LOCATION_HREF', location.href)
    // }, 400)
  })
}
