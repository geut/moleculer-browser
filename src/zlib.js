const fflate = require('fflate')

module.exports = {
  deflateRaw: (...args) => fflate.deflateSync(...args),
  inflateRaw: (...args) => fflate.inflateSync(...args),
  gzip: (...args) => fflate.gzip(...args),
  gunzip: (...args) => fflate.gunzip(...args),
  deflate: (...args) => fflate.zlibSync(...args),
  inflate: (...args) => fflate.unzlibSync(...args)
}
