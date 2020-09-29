import path from 'path'

const aliasModules = {
  './cpu-usage': path.resolve('src/cpu-usage.js'),
  'node-fetch': path.resolve('src/fetch.js'),
  os: path.resolve('src/os.js'),
  zlib: path.resolve('src/zlib.js')
}

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
  aliasModules[dep] = path.resolve('src/no-impl.js')
})

incompatibleFiles.forEach(dep => {
  aliasModules[dep] = path.resolve('src/no-impl.js')
})

export default aliasModules
