// 手机号
export const cellPhoneNumberReg = /^(1[34578]\d{9})|(\d{3,4}-\d{6,10})$/

// 邮箱
export const wechatNumberReg = /^\w[-.\w]*@([-a-z0-9]+\.)+[a-z]{2,4}$/

// qq
export const qqReg = /^\d{4,12}$/

// 最后一个字符是不是emoji
export const lastTextIsEmojiReq = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]$/
