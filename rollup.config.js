import path from 'path'

import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import alias from 'rollup-plugin-alias'
import inject from 'rollup-plugin-inject'
import analyze from 'rollup-plugin-analyzer'
import visualizer from 'rollup-plugin-visualizer'
import { terser } from 'rollup-plugin-terser'

import { externalResolve } from './rollup-config/module-resolver'
import { aliasModules, builtInModules } from './rollup-config/moleculer'

import pkg from './package.json'

const isProduction = process.env.NODE_ENV === 'production'

const config = async () => {
  const external = await externalResolve(builtInModules)

  return {
    input: 'src/index.js',
    output: {
      name: 'moleculer',
      file: pkg.main,
      format: 'umd',
      sourcemap: true
    },
    plugins: [
      alias(aliasModules),
      json(),
      resolve({
        preferBuiltins: true,
        only: ['moleculer']
      }),
      commonjs(),
      inject({
        modules: {
          setTimeout: path.resolve('src/set-timeout.js'),
          setInterval: path.resolve('src/set-interval.js'),
          process: path.resolve('src/process.js')
        }
      }),
      isProduction && terser(),
      !isProduction && visualizer({ template: 'treemap' }),
      analyze({ hideDeps: true, limit: 0 })
    ],
    external
  }
}

export default config()
