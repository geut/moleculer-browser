import * as fflate from 'fflate'

export const deflateRaw = (...args) => fflate.deflateSync(...args)
export const inflateRaw = (...args) => fflate.inflateSync(...args)
export const gzip = (...args) => fflate.gzip(...args)
export const gunzip = (...args) => fflate.gunzip(...args)
export const deflate = (...args) => fflate.zlibSync(...args)
export const inflate = (...args) => fflate.unzlibSync(...args)
