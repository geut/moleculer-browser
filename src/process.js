/* global performance */
const Process = require('bfs-process/js/cjs/process')

const _process = new Process()

if (typeof queueMicrotask !== 'undefined') {
  _process.nextTick = function nextTick (handler, ...args) {
    queueMicrotask(() => handler(...args))
  }
}

// memoryUsage
_process.memoryUsage = () => {
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

_process._getActiveHandles = function () {
  return []
}

_process._getActiveRequests = function () {
  return []
}

module.exports = _process
