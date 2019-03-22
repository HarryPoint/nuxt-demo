import { getResData } from './getResData'
import { isWx } from './isWx'
import { invokeWxPay } from './invokeWxPay'
import { parseJSON } from './parseJSON'
import * as im from './im'
import { getMsgType } from './getMsgType'
import * as tdk from './tdk'
import * as imgAlt from './imgAlt'
import * as userAgent from './userAgent'
import { getOrderProcess } from './getOrderProcess'
// 需要注意有些插件只能在客户端使用
// 不常用的utils就可以不用再这个文件导出,而直接引用就可以了
export default ({}, inject) => {
  inject('utils', {
    getResData,
    isWx,
    invokeWxPay,
    im,
    parseJSON,
    getMsgType,
    tdk,
    imgAlt,
    userAgent,
    getOrderProcess
  })
}
