import fp from 'lodash/fp'

/**
 * 处理api请求的error,默认抛出后台出过来的错误信息
 */
export default function({ app }, inject) {
  if (process.client) {
    const { $toast, $codeMessage } = app
    const fetchCatch = error => {
      console.error(error)
      $toast({
        type: 'error',
        txt:
          fp.get('response.data.msg', error) ||
          $codeMessage[fp.get('response.status', error)] ||
          '请求数据时发生异常'
      })
    }
    inject('fetchCatch', fetchCatch)
  }
  if (process.server) {
    inject('fetchCatch', () => {})
  }
}
