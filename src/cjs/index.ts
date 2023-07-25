async function start (params: unknown) {
  const esmPkg = await import('../index.js')
  return esmPkg.start(params)
}

async function download (edgeVersion?: string, cacheDir?: string) {
  const esmPkg = await import('../index.js')
  return esmPkg.download(edgeVersion, cacheDir)
}

exports.start = start
exports.download = download
module.exports = { start, download }
