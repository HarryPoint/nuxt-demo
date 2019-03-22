//SDK 登录
export const login = (loginInfo, listeners, options) => {
  return new Promise((resolve, reject) => {
    webim.login(loginInfo, listeners, options, resolve, reject)
  })
}

// 获取最近联系人 https://cloud.tencent.com/document/product/269/1597
export const getRecentContactList = ({ Count = 10 }) => {
  return new Promise((resolve, reject) => {
    webim.getRecentContactList({ Count }, resolve, reject)
  })
}

// 获取未读 C2C 消息 https://cloud.tencent.com/document/product/269/1597
export const syncMsgs = () => {
  return new Promise((resolve, reject) => {
    webim.syncMsgs(resolve, reject)
  })
}

// 删除最近联系人
export const deleteChat = data => {
  return new Promise((resolve, reject) => {
    webim.deleteChat(data, resolve, reject)
  })
}

// 获取 C2C 历史消息 https://cloud.tencent.com/document/product/269/1597#.E8.8E.B7.E5.8F.96.E6.9C.AA.E8.AF.BB-c2c-.E6.B6.88.E6.81.AF
export const getC2CHistoryMsgs = options => {
  return new Promise((resolve, reject) => {
    webim.getC2CHistoryMsgs(options, resolve, reject)
  })
}

// 发送消息（文本+表情）https://cloud.tencent.com/document/product/269/1597#.E5.8F.91.E9.80.81.E6.B6.88.E6.81.AF.EF.BC.88.E6.96.87.E6.9C.AC.2B.E8.A1.A8.E6.83.85.EF.BC.89
export const sendTextAndEmojiMsg = options => {
  options = {
    ...{
      // 必填
      msgtosend: '',
      // 必填
      selToID: null,
      isSend: true,
      seq: -1,
      random: Math.round(Math.random() * 4294967296),
      msgTime: Math.round(new Date().getTime() / 1000),
      // 必填im_id
      identifier: '',
      subType: webim.C2C_MSG_SUB_TYPE.COMMON,
      // 必填
      identifierNick: ''
    },
    ...options
  }
  const selSess = new webim.Session(
    webim.SESSION_TYPE.C2C,
    options.selToID,
    options.selToID,
    '',
    Math.round(new Date().getTime() / 1000)
  )
  const msg = new webim.Msg(
    selSess,
    options.isSend,
    options.seq,
    options.random,
    options.msgTime,
    options.identifier,
    options.subType,
    options.identifierNick
  )
  let text_obj, face_obj, tmsg, emotionIndex, emotion, restMsgIndex
  //解析文本和表情
  const expr = /\[[^[\]]{1,3}\]/gm
  const msgtosend = options.msgtosend
  const emotions = msgtosend.match(expr)
  if (!emotions || emotions.length < 1) {
    text_obj = new webim.Msg.Elem.Text(msgtosend)
    msg.addText(text_obj)
  } else {
    for (let i = 0; i < emotions.length; i++) {
      tmsg = msgtosend.substring(0, msgtosend.indexOf(emotions[i]))
      if (tmsg) {
        text_obj = new webim.Msg.Elem.Text(tmsg)
        msg.addText(text_obj)
      }
      emotionIndex = webim.EmotionDataIndexs[emotions[i]]
      emotion = webim.Emotions[emotionIndex]
      if (emotion) {
        face_obj = new webim.Msg.Elem.Face(emotionIndex, emotions[i])
        msg.addFace(face_obj)
      } else {
        text_obj = new webim.Msg.Elem.Text(emotions[i])
        msg.addText(text_obj)
      }
      restMsgIndex = msgtosend.indexOf(emotions[i]) + emotions[i].length
      msgtosend = msgtosend.substring(restMsgIndex)
    }
    if (msgtosend) {
      text_obj = new webim.Msg.Elem.Text(msgtosend)
      msg.addText(text_obj)
    }
  }
  return new Promise((resolve, reject) => {
    webim.sendMsg(msg, resolve, reject)
  })
}

// 发送消息 老版
export const sendMsg = options => {
  options = {
    ...{
      // 消息类型text image gift redPacket
      type: 'text',
      // 消息体 可能是文字 图片 礼物 等等
      content: '',
      // 必填
      selToID: null,
      isSend: true,
      seq: -1,
      random: Math.round(Math.random() * 4294967296),
      msgTime: Math.round(new Date().getTime() / 1000),
      // 必填im_id
      identifier: '',
      subType: webim.C2C_MSG_SUB_TYPE.COMMON,
      // 必填
      identifierNick: '',
      // 必填
      myAvatarUrl: ''
    },
    ...options
  }
  const selSess = new webim.Session(
    webim.SESSION_TYPE.C2C,
    options.selToID,
    options.selToID,
    '',
    Math.round(new Date().getTime() / 1000)
  )
  const msg = new webim.Msg(
    selSess,
    options.isSend,
    options.seq,
    options.random,
    options.msgTime,
    options.identifier,
    options.subType,
    options.identifierNick
  )
  // 文本消息
  if (options.type === 'text') {
    const textObj = new webim.Msg.Elem.Text(options.content)
    msg.addText(textObj)
    // 图片消息
  } else if (options.type === 'image') {
    const imagesObj = new webim.Msg.Elem.Images(options.content.File_UUID)
    let type
    let newImg
    for (let i in options.content.URL_INFO) {
      let img = options.content.URL_INFO[i]
      switch (img.PIC_TYPE) {
        case 1:
          // 原图
          type = 1
          break
        case 2:
          // 小图（缩略图）
          type = 3
          break
        case 4:
          // 小图
          type = 2
          break
        default:
          break
      }
      newImg = new webim.Msg.Elem.Images.Image(
        type,
        img.PIC_Size,
        img.PIC_Width,
        img.PIC_Height,
        img.DownUrl
      )
      imagesObj.addImage(newImg)
    }
    msg.addImage(imagesObj)
    // 礼物消息
  } else if (options.type === 'gift') {
    const giftObj = new webim.Msg.Elem.Custom(
      JSON.stringify({
        extra_gift_key: JSON.stringify({ ...options.content })
      }),
      '[礼物]'
    )
    msg.addCustom(giftObj)
  } else if (options.type === 'redPacket') {
    const redPacketObj = new webim.Msg.Elem.Custom(
      JSON.stringify({
        extra_red_packet_key: JSON.stringify({ ...options.content })
      }),
      '[红包]'
    )
    msg.addCustom(redPacketObj)
  }
  msg.addCustom(
    new webim.Msg.Elem.Custom(
      JSON.stringify({
        from: 'yay',
        os: 'h5',
        user_avatar: options.myAvatarUrl,
        user_nick: options.identifierNick
      }),
      '',
      ''
    )
  )
  return new Promise((resolve, reject) => {
    webim.sendMsg(
      msg,
      resp => {
        resolve({
          resp,
          msg
        })
      },
      reject
    )
  })
}

// 上传图片 （高版本浏览器）https://cloud.tencent.com/document/product/269/1597#.E4.B8.8A.E4.BC.A0.E5.9B.BE.E7.89.87-.EF.BC.88.E9.AB.98.E7.89.88.E6.9C.AC.E6.B5.8F.E8.A7.88.E5.99.A8.EF.BC.89
export const uploadPic = options => {
  options = {
    ...{
      // 必填
      file: '',
      onProgressCallBack: () => {},
      // 必填
      From_Account: '',
      // 必填
      To_Account: '',
      businessType: webim.UPLOAD_PIC_BUSSINESS_TYPE.C2C_MSG
    },
    ...options
  }
  return new Promise((resolve, reject) => {
    webim.uploadPic(options, resolve, reject)
  })
}
