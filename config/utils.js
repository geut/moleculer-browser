import path from 'path'

export function normalizePath (p) {
  return p.split(path.sep).join('/')
}
