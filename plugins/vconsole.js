// 在开发环境的客户端启用vconsole
export default function({ app, isDev }, inject) {
  if (process.client && process.env.API_FORMAL !== 'apiFormal') {
    const VConsole = require('vconsole')
    new VConsole()
  }
}
