import path from 'path'

import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import alias from '@rollup/plugin-alias'
import inject from '@rollup/plugin-inject'
import replace from '@rollup/plugin-replace'
import analyze from 'rollup-plugin-analyzer'
import visualizer from 'rollup-plugin-visualizer'
import { terser } from 'rollup-plugin-terser'

import aliasModules from './config/alias'
import { normalizePath } from './config/utils'

const isProduction = process.env.NODE_ENV === 'production'

const moleculerSrcPath = 'src/moleculer/**'

const plugins = [
  json(),
  commonjs({
    requireReturnsDefault: 'default'
  }),
  alias({
    include: moleculerSrcPath,
    entries: aliasModules
  }),
  inject({
    include: moleculerSrcPath,
    Buffer: ['buffer', 'Buffer'],
    process: normalizePath(path.resolve('src/process.js')),
    setTimeout: normalizePath(path.resolve('src/timeout.js')),
    setInterval: normalizePath(path.resolve('src/interval.js')),
    global: normalizePath(path.resolve('src/global.js'))
  }),
  replace({
    include: moleculerSrcPath,
    nodejs: 'type: "browser"',
    delimiters: ['type: "', '"']
  }),
  isProduction && terser(),
  !isProduction && visualizer({ template: 'treemap' }),
  !isProduction && analyze({ hideDeps: true, limit: 0 })
]

const config = async () => {
  return {
    input: 'src/index.js',
    output: [{
      name: 'Moleculer',
      file: 'dist/umd/moleculer.js',
      format: 'umd',
      sourcemap: true
    }, {
      name: 'Moleculer',
      dir: 'dist/esm',
      format: 'esm',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true
    }],
    plugins
  }
}

export default config()
