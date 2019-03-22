const pushScriptId = 'baidupush'
const hmtScriptId = 'baidupushHmt'

const removeRelativeScript = () => {
  if (process.client) {
    const pushScript = document.getElementById(pushScriptId)
    const hmtScript = document.getElementById(hmtScriptId)
    pushScript && pushScript.remove()
    hmtScript && hmtScript.remove()
  }
}

const addGa = () => {
  if (process.client) {
    console.log('addGa')
    // 添加百度主动推送代码
    var bp = document.createElement('script')
    bp.id = pushScriptId
    var curProtocol = window.location.protocol.split(':')[0]
    if (curProtocol === 'https') {
      bp.src = 'https://zz.bdstatic.com/linksubmit/push.js'
    } else {
      bp.src = 'http://push.zhanzhang.baidu.com/push.js'
    }
    var s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(bp, s)
    // 添加百度统计代码
    var _hmt = _hmt || []
    _hmt.id = hmtScriptId
    var hm = document.createElement('script')
    hm.src = 'https://hm.baidu.com/hm.js?8902081d107ae3d85405f455750d0942'
    var s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(hm, s)
  }
}

export default ({ app: { router } }) => {
  router.afterEach(() => {
    if (process.client) {
      console.log('afterEach')
      removeRelativeScript()
      setTimeout(() => {
        addGa()
      }, 0)
    }
  })
}
