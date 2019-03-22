import fp from 'lodash/fp'

/**
 * 处理api请求的error,默认抛出后台出过来的错误信息
 */
export default function({ app }, inject) {
  if (process.client) {
    const { $toast } = app
    const imCatch = error => {
      console.error(error)
      $toast({
        type: 'error',
        txt: fp.get('ErrorInfo', error) || 'IM操作失败'
      })
    }
    inject('imCatch', imCatch)
  }
  if (process.server) {
    inject('imCatch', () => {})
  }
}
