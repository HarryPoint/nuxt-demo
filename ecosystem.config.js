let HOST = '0.0.0.0'
let PORT = 5050
let deploy = {
  repo: 'git@github.com:HarryPoint/nuxt-demo.git',
  path: '/var/www/node-server/nuxt-demo'
}
module.exports = {
  apps: [
    {
      name: 'nuxt-demo',
      instances: 2,
      script: 'server/index.js',
      // 正式服
      env_production: {
        NODE_ENV: 'production',
        HOST,
        PORT
      },
      // 测试服
      env_test: {
        NODE_ENV: 'production',
        HOST,
        PORT,
        TEST: true
      }
    }
  ],

  deploy: {
    production: {
      ...deploy,
      ref: 'origin/master',
      user: 'root',
      host: '148.70.244.109',
      'post-deploy':
        'node backup.js && yarn install && yarn build && pm2 reload ecosystem.config.js --env production'
    },
    test: {
      ...deploy,
      ref: 'origin/develop',
      user: 'root',
      host: '119.27.167.20',
      'post-deploy':
        'yarn install && yarn build-test && pm2 reload ecosystem.config.js --env test'
    }
  }
}
