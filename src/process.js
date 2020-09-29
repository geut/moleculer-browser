/* global performance */
const process = require('bfs-process')

if (typeof queueMicrotask !== 'undefined') {
  process.nextTick = function nextTick (handler, ...args) {
    queueMicrotask(() => handler(...args))
  }
}

// memoryUsage
process.memoryUsage = () => {
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

module.exports = process
