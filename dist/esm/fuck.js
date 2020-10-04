export { default as cpus } from 'cpus';
import getCpuUsage from './cpu-usage.js';
import * as osBrowserify from 'os-browserify';
export * from 'os-browserify';

/* global performance */
const loadavg = getCpuUsage.loadavg;
const totalmem = () => performance ? performance.memory.totalJSHeapSize : 0;
const freemem = () => performance ? performance.memory.totalJSHeapSize - performance.memory.usedJSHeapSize : 0;

export { freemem, loadavg, totalmem };
//# sourceMappingURL=fuck.js.map
