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

const config = async () => {
  return {
    input: 'src/moleculer/index.js',
    output: {
      name: 'Moleculer',
      file: `dist/moleculer.${isProduction ? 'min' : 'dev'}.js`,
      format: 'umd',
      sourcemap: true
    },
    plugins: [
      json(),
      commonjs(),
      alias({
        include: moleculerSrcPath,
        entries: aliasModules
      }),
      inject({
        // we need to override the process shim of kleur too
        include: [moleculerSrcPath, 'node_modules/kleur/index.js'],
        process: normalizePath(path.resolve('src/process.js')),
        setTimeout: normalizePath(path.resolve('src/timeout.js')),
        setInterval: normalizePath(path.resolve('src/interval.js'))
      }),
      replace({
        include: moleculerSrcPath,
        nodejs: 'type: "browser"',
        delimiters: ['type: "', '"']
      }),
      replace({
        include: 'src/moleculer/src/loggers/console.js',
        'log(...pargs)': '.log(pargs.join(" "));',
        'warn(...pargs)': '.warn(pargs.join(" "));',
        'error(...pargs)': '.error(pargs.join(" "));',
        delimiters: ['.', ';']
      }),
      isProduction && terser(),
      !isProduction && visualizer({ template: 'treemap' }),
      !isProduction && analyze({ hideDeps: true, limit: 0 })
    ]
  }
}

export default config()
