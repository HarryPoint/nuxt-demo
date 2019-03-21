var exec = require('child_process').exec
exec('rm -rf static/_nuxt && mv .nuxt/dist/client static/_nuxt', function(
  error,
  stdout,
  stderr
) {
  if (error) {
    console.log(error)
  } else {
    console.log('成功')
  }
})
