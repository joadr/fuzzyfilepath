'use babel'

import ref from 'path'
var relative = ref.relative
var basename = ref.basename
var dirname = ref.dirname

export default function (sourcePath, destinationPath) {
  if (basename(destinationPath).match(/^index\./)) {
    destinationPath = dirname(destinationPath)
  }
  var relativePath = relative(dirname(sourcePath), destinationPath)
  relativePath = relativePath.replace(/^([^.])/, './$1')
  relativePath = relativePath.replace(/\.jsx?$/, '')
  var identifierName = basename(destinationPath).replace(/\..+/, '')
  return `import ${identifierName} from '${relativePath}'\n`
}
