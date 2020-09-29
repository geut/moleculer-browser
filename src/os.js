/* global performance */

const os = require('os-browserify')
const cpus = require('cpus')
const cpuUsage = require('./cpu-usage')

os.cpus = cpus
os.loadavg = cpuUsage.loadavg
os.totalmem = () => performance ? performance.memory.totalJSHeapSize : 0
os.freemem = () => performance ? performance.memory.totalJSHeapSize - performance.memory.usedJSHeapSize : 0

module.exports = os
