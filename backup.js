var exec = require('child_process').exec
console.log('--------post-deploy')
exec('rm -rf static/_nuxt && mv .nuxt/dist/client static/_nuxt')
