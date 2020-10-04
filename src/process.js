import EventEmitter from 'eventemitter2'
import hrtime from 'browser-process-hrtime'
import global from './global'

class Process extends EventEmitter {
  constructor () {
    super()

    this.title = 'browser'
    this.browser = true
    this.env = {}
    this.argv = []
    this.version = ''
    this.versions = {
      http_parser: '0.0',
      node: '12.18.4',
      v8: '0.0',
      uv: '0.0',
      zlib: '0.0',
      ares: '0.0',
      icu: '0.0',
      modules: '0',
      openssl: '0.0'
    }
    this.hrtime = hrtime
    this.pid = 0
    this.exitCode = 0
    this.connected = true
    this._startTime = Date.now()
    this._errorCallback = null
  }

  exit (code) {
    this.exitCode = code
    this.emit('exit', [code])
    throw new Error('process.exit() called.')
  }

  setUncaughtExceptionCaptureCallback (cb) {
    if (this._errorCallback) {
      window.removeEventListener('error', this._errorCallback)
    }
    this._errorCallback = cb
    if (cb) {
      window.addEventListener('error', cb)
    }
  }

  hasUncaughtExceptionCaptureCallback () {
    return this._errorCallback !== null
  }

  cwd () {
    return '/'
  }

  uptime () {
    return Math.floor((Date.now() - this._startTime) / 1000)
  }

  memoryUsage () {
    if (!performance && !performance.memory) {
      return {
        rss: 0,
        heapTotal: Number.MAX_SAFE_INTEGER,
        heapUsed: 0,
        external: 0
      }
    }

    const { memory } = performance

    return {
      rss: 0,
      heapTotal: memory.totalJSHeapSize,
      heapUsed: memory.usedJSHeapSize,
      external: 0
    }
  }

  nextTick (handler, ...args) {
    queueMicrotask(() => handler(...args))
  }

  _getActiveHandles () {
    return []
  }

  _getActiveRequests () {
    return []
  }
}

const proc = new Process()

//
// We monkey patch the current process shim to use our updated version.
//
if (typeof process !== 'undefined') {
  for (const prop in proc) {
    if (typeof proc[prop] === 'function') {
      process[prop] = proc[prop].bind(proc)
      continue
    }

    process[prop] = proc[prop]
  }
}
global.process = proc

export default proc
