/* global performance */

import cpuUsage from './cpu-usage'

export const hostname = () => {
  if (typeof location !== 'undefined') {
    return location.hostname
  } else return ''
}

export const release = () => {
  if (typeof navigator !== 'undefined') {
    return navigator.appVersion
  }
  return ''
}

export const userInfo = () => ({
  uid: 1000,
  gid: 1000,
  username: 'moleculer',
  homedir: '/home/moleculer',
  shell: '/bin/bash'
})
export const endianness = () => 'LE'
export const uptime = () => Date.now()
export const type = () => 'Browser'
export const networkInterfaces = () => ({})
export const getNetworkInterfaces = () => ({})
export const arch = () => 'javascript'
export const platform = () => 'browser'
export const tmpdir = () => '/tmp'
export const tmpDir = () => '/tmp'
export const EOL = '\n'
export const homedir = () => '/'
export { default as cpus } from 'cpus'
export const loadavg = cpuUsage.loadavg
export const totalmem = () => performance ? performance.memory.totalJSHeapSize : Number.MAX_VALUE
export const freemem = () => performance ? performance.memory.totalJSHeapSize - performance.memory.usedJSHeapSize : Number.MAX_VALUE
