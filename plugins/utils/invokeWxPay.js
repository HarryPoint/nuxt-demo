/**
 * 微信内通过WeixinJSBridge调起支付https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=7_7&index=6
 */
export const invokeWxPay = (payInfo, cbSuc = () => {}, cbErr = () => {}) => {
  console.log('invokeWxPay', payInfo)
  let _payInfo = payInfo
  function onBridgeReady() {
    _payInfo.timeStamp = String(_payInfo.timeStamp)
    WeixinJSBridge.invoke('getBrandWCPayRequest', _payInfo, res => {
      console.log('微信内支付回调结果', res)
      if (res.err_msg === 'get_brand_wcpay_request:ok') {
        cbSuc(res)
      } else {
        cbErr(res)
      }
    })
  }
  if (typeof WeixinJSBridge === 'undefined') {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
    }
  } else {
    onBridgeReady()
  }
}
