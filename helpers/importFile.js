'use babel'
import addImport from './addImport'

export default function({importString, editor}) {
  const fileContent = editor.getText()
  if (fileContent.includes(importString)) return

  const bufferPosition = editor.getCursorBufferPosition()

  const newPosition = {
    row: bufferPosition.row + 1,
    column: bufferPosition.column
  }

  const newContent = addImport(fileContent, importString)
  editor.setText(newContent)
  editor.setCursorBufferPosition(newPosition)
}
