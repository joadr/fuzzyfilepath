'use babel'
/* global atom */
import fs from 'fs-plus'
import isArray from 'lodash/isArray'
import each from 'lodash/each'

export default function(relativePath, destinationPath) {
  if (relativePath.includes('../')) {
    try {
      const projectPath = atom.project.getPaths()[0]
      const content = fs.readFileSync(`${projectPath}/.babelrc`).toString()
      const config = JSON.parse(content)
      if (!config || !config.plugins || !isArray(config.plugins)) {
        return relativePath
      }
      const pluginConfig =
        config.plugins.find(p => p[0] === 'module-alias' || p[0] === 'babel-plugin-module-alias') ||
        config.plugins.find(
          p => p[0] === 'module-resolver' || p[0] === 'babel-plugin-module-resolver'
        )
      if (!pluginConfig[1].alias) {
        return relativePath
      }

      let aliasPath = ''
      each(pluginConfig[1].alias, function(src, alias) {
        if (src[0] === '.') {
          src = src.substring(1, src.length)
        }
        let dest = destinationPath.split(src)[1]
        if (!dest) return
        if (dest[0] === '/') {
          dest = dest.substring(1, dest.length)
        }
        if (destinationPath.split(alias).length > 1) {
          aliasPath = `${alias}/${dest}`
        }
      })
      return aliasPath || relativePath
    } catch (error) {
      console.log('Error:', error)
      return relativePath
    }
  }
  return relativePath
}
