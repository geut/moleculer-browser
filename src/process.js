const mitt = require('mitt')
const hrtime = require('browser-process-hrtime')

if (!process) {
  throw new Error('moleculer-browser: Node `process` polyfill missing.')
}

// events
const ev = mitt()
process.setMaxListeners = () => {}
process.emit = ev.emit.bind(ev)
process.on = ev.on.bind(ev)
process.off = ev.on.bind(ev)
process.addListener = process.on
process.removeListener = process.off

// hrtime
process.hrtime = hrtime

// versions
if (!process.versions) {
  process.versions = {}
}

if (!process.versions.node) {
  process.versions.node = '11.9.0'
}

module.exports = process
