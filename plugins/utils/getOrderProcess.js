/**
 * 根据订单status获取订单进度数组、当前进度索引和主要操作按钮文字的方法(后面要用起来,暂时还没有用起来)
 * @param {Number} status
 * @returns {Object} 订单进度信息
 */
export const getOrderProcess = status => {
  console.log({ status })
  // 操作按钮文字
  let oprationText = ''
  // 订单付款状态文字
  let payStatusText = ''
  // 进度数组
  let processNodeTextArr = []
  // 当前进度索引
  let currentProcessNodeIndex = 0

  // 处理操作按钮文字
  if ([1].indexOf(status) !== -1) {
    oprationText = '支付'
  } else if ([3, 4].indexOf(status) !== -1) {
    oprationText = '完成'
  } else if (status === 5) {
    oprationText = '评价'
  } else if ([6].indexOf(status) !== -1) {
    oprationText = '再来一单'
  } else {
    oprationText = ''
  }

  // 订单付款状态文字
  if ([0, 1].indexOf(status) !== -1) {
    payStatusText = '需付款'
  } else if ([3, 4].indexOf(status) !== -1) {
    payStatusText = '已付款'
  } else {
    payStatusText = '订单金额'
  }

  // 处理进度数组
  if ([-2].indexOf(status) !== -1) {
    processNodeTextArr = ['待确定', '待服务', '退款中', '已完成']
  } else {
    processNodeTextArr = ['待确定', '待服务', '进行中', '已完成']
  }

  // 处理当前进度索引
  if ([3].indexOf(status) !== -1) {
    // 待服务
    currentProcessNodeIndex = 1
  } else if ([-2, 4].indexOf(status) !== -1) {
    // 进行中或退款中
    currentProcessNodeIndex = 2
  } else if ([-1, -3, 5, 6, 7, 8].indexOf(status) !== -1) {
    // 已完成
    currentProcessNodeIndex = 3
  } else {
    // 待确定
    currentProcessNodeIndex = 0
  }

  return {
    oprationText,
    processNodeTextArr,
    currentProcessNodeIndex,
    payStatusText
  }
}
