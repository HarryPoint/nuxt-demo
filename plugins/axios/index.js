export default function(context) {
  let { $axios, redirect, store } = context
  $axios.onRequest(config => {
    // config.baseURL = store.state.apiUrl
  })
  $axios.onResponse(response => {
    // 修改返回的数据
    return response.data
  })
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
