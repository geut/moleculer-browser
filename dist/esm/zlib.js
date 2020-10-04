import { deflateSync, inflateSync, gzip as gzip$1, gunzip as gunzip$1, zlibSync, unzlibSync } from 'fflate';

const deflateRaw = (...args) => deflateSync(...args);
const inflateRaw = (...args) => inflateSync(...args);
const gzip = (...args) => gzip$1(...args);
const gunzip = (...args) => gunzip$1(...args);
const deflate = (...args) => zlibSync(...args);
const inflate = (...args) => unzlibSync(...args);

export { deflate, deflateRaw, gunzip, gzip, inflate, inflateRaw };
//# sourceMappingURL=zlib.js.map
