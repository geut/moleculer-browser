export { default as cpus } from 'cpus';
import getCpuUsage from './cpu-usage.js';

/* global performance */

const hostname = () => {
  if (typeof location !== 'undefined') {
    return location.hostname
  } else return ''
};

const release = () => {
  if (typeof navigator !== 'undefined') {
    return navigator.appVersion
  }
  return ''
};

const userInfo = () => ({
  uid: 1000,
  gid: 1000,
  username: 'moleculer',
  homedir: '/home/moleculer',
  shell: '/bin/bash'
});
const endianness = () => 'LE';
const uptime = () => Date.now();
const type = () => 'Browser';
const networkInterfaces = () => ({});
const getNetworkInterfaces = () => ({});
const arch = () => 'javascript';
const platform = () => 'browser';
const tmpdir = () => '/tmp';
const tmpDir = () => '/tmp';
const EOL = '\n';
const homedir = () => '/';
const loadavg = getCpuUsage.loadavg;
const totalmem = () => performance ? performance.memory.totalJSHeapSize : Number.MAX_VALUE;
const freemem = () => performance ? performance.memory.totalJSHeapSize - performance.memory.usedJSHeapSize : Number.MAX_VALUE;

export { EOL, arch, endianness, freemem, getNetworkInterfaces, homedir, hostname, loadavg, networkInterfaces, platform, release, tmpDir, tmpdir, totalmem, type, uptime, userInfo };
//# sourceMappingURL=os.js.map
