import path from 'path'
import { promises as fs } from 'fs'

import fg from 'fast-glob'

const getNodeModules = async () => {
  let packages = await fg('**/package.json', { dot: true, cwd: 'node_modules' })

  packages = await Promise.all(packages
    .map(pathname => path.resolve(path.join('node_modules', pathname)))
    .map(pathname => fs.readFile(pathname)))

  return packages
    .map(packageJSON => JSON.parse(packageJSON).name)
    .filter(Boolean)
}

export function aliasResolve (modules, into, result = {}) {
  return modules.reduce((curr, next) => {
    curr[next] = path.resolve(into)
    return curr
  }, result)
}

export const externalResolve = async (builtInModules) => {
  const nodeModules = await getNodeModules()

  return (id) => {
    if (builtInModules.find(module => id.includes(module))) {
      return false
    }

    if (nodeModules.find(module => module.includes(id))) {
      return true
    }

    return false
  }
}
