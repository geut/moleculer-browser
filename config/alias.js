import path from 'path'
import { normalizePath } from './utils'

const aliasModules = {
  './cpu-usage': 'src/cpu-usage.js',
  'node-fetch': 'src/fetch.js',
  os: 'src/os.js',
  events: 'src/events.js',
  zlib: 'src/zlib.js'
}

Object.keys(aliasModules).forEach(prop => {
  aliasModules[prop] = normalizePath(path.resolve(aliasModules[prop]))
})

const incompatibleDependencies = [
  'moleculer-repl',
  'v8',
  'event-loop-stats',
  'moleculer-repl',
  'gc-stats'
]

const incompatibleFiles = [
  './amqp',
  './amqp10',
  './mqtt',
  './nats',
  './kafka',
  './tcp',
  './stan',
  './redis',
  './avro',
  './msgpack',
  './notepack',
  './protobuf',
  './thrift',
  './datadog',
  './log4js',
  './etcd3',
  './csv',
  './prometheus',
  './statsd',
  './jaeger',
  './hot-reload',
  './file',
  './bunyan',
  './debug',
  './pino',
  './winston',
  './src/runner'
]

incompatibleDependencies.forEach(dep => {
  aliasModules[dep] = normalizePath(path.resolve('src/no-impl.js'))
})

incompatibleFiles.forEach(dep => {
  aliasModules[dep] = normalizePath(path.resolve('src/no-impl.js'))
})

export default aliasModules
