export default function({ app, isDev }, inject) {
  app.router.onError(error => {
    const pattern = /Loading chunk (\d)+ failed/g
    const isChunkLoadFailed = error.message.match(pattern)
    const targetPath = router.history.pending.fullPath
    if (isChunkLoadFailed) {
      router.replace(targetPath)
    }
  })
}
