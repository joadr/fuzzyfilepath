'use babel'

import ref from 'path'
import moduleresolver from './moduleresolver'
const relative = ref.relative
const basename = ref.basename
const dirname = ref.dirname

export default function(sourcePath, destinationPath) {
  if (basename(destinationPath).match(/^index\./)) {
    destinationPath = dirname(destinationPath)
  }
  let relativePath = relative(dirname(sourcePath), destinationPath)
  relativePath = relativePath.replace(/^([^.])/, './$1')
  relativePath = moduleresolver(relativePath, destinationPath, sourcePath)
  relativePath = relativePath.replace(/\.js?$/, '')
  return `import '${relativePath}'\n`
}
