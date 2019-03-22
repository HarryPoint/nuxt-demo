// 由于选型的限制,要使用$axios,目前在这里整理所有的api
export default function({ $axios }, inject) {
  const api = {}

  // 主动使用微信授权登陆 GET跳转
  api.wxLogin =
    process.env.API_FORMAL === 'apiFormal'
      ? 'http://m.yay.com.cn/api/login/wxauthorized'
      : 'http://test.m.yay.com.cn/api/login/wxauthorized'

  // 登录
  api.login = ({ username, password }) => {
    return $axios.post('/api/login', { username, password })
  }

  // 注销
  api.logout = () => {
    return $axios.post('/api/logout')
  }

  // 获取im登陆凭证
  api.getImLoginInfo = () => {
    return $axios.get('/api/my/iminfo.json')
  }

  // 通过im_id获取user_id
  api.getUserIdByImId = ({ im_id }) => {
    return $axios.get('/api/member/getinfobyimid.json', {
      params: {
        im_id
      }
    })
  }

  // WX用户绑定手机号
  api.wxBindPhone = ({ mobilephone, captcha }) => {
    return $axios.post('/api/member/bindphone.json', {
      mobilephone,
      captcha
    })
  }

  // 获取用户个性信息
  api.getMember = () => {
    return $axios.get('/api/member.json')
  }

  // 首页banner接口
  api.getBanner = () => {
    return $axios.get('/api/banner.json')
  }

  // 获取首页顶部导航接口
  api.getNav = () => {
    return $axios.get('/api/nav.json')
  }

  // 获取动态广播
  api.getBarrage = () => {
    return $axios.get('/api/barrage.json')
  }

  // 获取首页推荐大神
  api.getIndexRecommend = () => {
    return $axios.get('/api/skill/indexRecommend.json')
  }

  // 单个分类的技能列表接口
  api.getSkillList = ({
    type = 'recommend',
    product_id = '',
    city_name,
    sex = 3,
    city_code,
    level,
    page = 1,
    row = 4
  }) => {
    return $axios.get('/api/skill/list.json', {
      params: {
        type,
        product_id,
        city_name,
        sex,
        city_code,
        level,
        page,
        row
      }
    })
  }

  // 获取热门大神
  api.getServerHot = ({ row = 8 }) => {
    return $axios.get('/api/server/hot.json', {
      params: {
        row
      }
    })
  }

  // 全局搜索大神
  api.getServerSearch = ({ value = '' }) => {
    return $axios.get('/api/server/search.json', {
      params: {
        value
      }
    })
  }

  // 获取大神个人中心数据接口
  api.getServerInfo = ({ server_id = '' }) => {
    return $axios.get('/api/member/serverInfo.json', {
      params: {
        server_id
      }
    })
  }

  // 获取技能详情的接口
  api.getSkillInfo = ({ skill_id }) => {
    return $axios.get('/api/skill/info.json', {
      params: {
        skill_id
      }
    })
  }

  // 根据用户id和技能alias获取
  api.getSkillbyAlias = ({ alias = '', server_id = '' }) => {
    return $axios.get('/api/skill/getskillbyalias.json', {
      params: {
        alias,
        server_id
      }
    })
  }

  // 获取技能的评论列表
  api.getSkillCommentList = ({ skill_id, page = 1, row = 20 }) => {
    return $axios.get('/api/comment/skillCommentList.json', {
      params: {
        skill_id,
        page,
        row
      }
    })
  }

  // 获取手机验证码
  api.getSMSVerificationCode = ({ mobilephone = '' }) => {
    return $axios.post('/api/captcha/send.json', {
      mobilephone
    })
  }

  // 手机验证码登录
  api.loginBySMS = ({ mobilephone, captcha }) => {
    return $axios.post('/api/member/mobilePhoneLogin.json', {
      mobilephone,
      captcha
    })
  }

  // 得到用户个人信息
  api.getMember = () => {
    return $axios.get('/api/member.json')
  }

  // 获取订单列表
  api.getOrderList = ({ status, page = 1, row = 20 }) => {
    return $axios.get('/api/order/list.json', {
      params: {
        status,
        page,
        row
      }
    })
  }

  // 获取单个订单详情接口
  api.getOrder = ({ order_id, alloc_action }) => {
    return $axios.get('/api/order.json', {
      params: {
        order_id,
        alloc_action
      }
    })
  }

  // 下单接口
  api.createOrder = ({
    skill_id,
    num,
    begin_time,
    desc,
    member_contact_way,
    coupon_id,
    alloc_status
  }) => {
    return $axios.post('/api/order.json', {
      skill_id,
      num,
      begin_time,
      desc,
      member_contact_way,
      coupon_id,
      alloc_status
    })
  }

  // 订单支付接口
  api.payOrder = ({ order_id, pay_way }) => {
    return $axios.post('/api/order/pay.json', {
      order_id,
      pay_way
    })
  }

  // 评价订单
  api.createOrderComment = ({
    order_id,
    score,
    tags,
    content,
    anonymous = 0
  }) => {
    return $axios.post('/api/comment.json', {
      order_id,
      score,
      tags,
      content,
      anonymous
    })
  }

  // 获取订单原因列表接口
  api.getOrderReasonList = ({ type }) => {
    return $axios.get('/api/order/getReason.json', {
      params: {
        type
      }
    })
  }

  // 用户订单申诉接口
  api.createOrderComplain = ({ order_id, content }) => {
    return $axios.post('/api/order/complain.json', {
      order_id,
      content
    })
  }

  // 用户订单退款接口
  api.createOrderRefund = ({ order_id, refund_apply_desc }) => {
    return $axios.post('/api/order/refund.json', {
      order_id,
      refund_apply_desc
    })
  }

  // 取消订单接口
  api.createOrderCancel = ({ order_id, cancel_desc }) => {
    return $axios.post('/api/order/cancel.json', {
      order_id,
      cancel_desc
    })
  }

  // 用户结束订单接口
  api.finishOrder = ({ order_id }) => {
    return $axios.post('/api/order/finish.json', {
      order_id
    })
  }

  // 请求区域列表
  api.getRegion = () => {
    return $axios.get('/api/region.json')
  }

  // 获取帐户优惠券列表 优惠券状态 0可用的 1已使用的 -1已失效的(过期)
  api.getCouponList = ({ status = 0, page = 1, row = 10 }) => {
    return $axios.get('/api/coupon/list.json', {
      params: {
        status,
        page,
        row
      }
    })
  }

  //13062599366
  // 获取定向单优惠券列表
  api.getExplicitOrderCouponList = ({ skill_id, begin_time, num }) => {
    return $axios.get('/api/coupon/explicitOrderCoupon.json', {
      params: {
        skill_id,
        begin_time,
        num
      }
    })
  }

  // 计算费用
  api.getOrderCalculateFeeD = ({ skill_id, num, begin_time, coupon_id }) => {
    return $axios.get('/api/order/calculateFeeD.json', {
      params: {
        skill_id,
        num,
        begin_time,
        coupon_id
      }
    })
  }

  // 意见反馈
  api.createFeedback = ({ contact_way, content }) => {
    return $axios.post('/api/question/feedback.json', {
      contact_way,
      content
    })
  }

  // 充值接口 result = 1
  api.recharge = ({ total_fee, pay_way, activity_id }) => {
    return $axios.post('/api/recharge.json', {
      total_fee,
      pay_way,
      activity_id
    })
  }

  // 获取充值信息接口
  api.getRecharge = ({ recharge_id }) => {
    return $axios.get('/api/recharge.json', {
      params: {
        recharge_id
      }
    })
  }

  // 获取充值的金额及支付方式的接口
  api.getRechargeInfo = () => {
    return $axios.get('/api/recharge/info.json')
  }

  // 获取礼物配置数据
  api.getGiftResource = () => {
    return $axios.get('/api/gift/resource.json')
  }

  // 送礼物给大神/用户
  api.giveGift = ({ gift_id, object_id }) => {
    return $axios.post('/api/gift.json', {
      gift_id,
      object_id
    })
  }

  // 一对一红包接口
  api.giveRedpacket = ({ fee, object_id }) => {
    return $axios.post('/api/gift/redpacket.json', {
      fee,
      object_id
    })
  }

  // 聊天获取窗口技能或订单
  api.getDialogBar = ({ object, first_open, skill_id }) => {
    return $axios.get('/api/my/dialogbar.json', {
      params: {
        object,
        first_open,
        skill_id
      }
    })
  }

  // 用户主动操作转单
  api.createAllocate = ({ order_id }) => {
    return $axios.post('/api/order/allocate.json', {
      order_id
    })
  }

  // 大神确认接收待接单订单
  api.receiveOrder = ({ order_id }) => {
    return $axios.post('/api/order/receive.json', {
      order_id
    })
  }

  // 联合注册api，可以通过$api在实例和上下文中访问
  inject('api', api)
}
