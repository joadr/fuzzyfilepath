'use babel'

import { CompositeDisposable } from 'atom'

/* global atom */

export default {
  subscriptions: null,

  activate (state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('.fuzzy-finder atom-text-editor', {
      'fuzzyfilepath:import': function (e) {
        var ref = require('path')
        var relative = ref.relative
        var basename = ref.basename
        var dirname = ref.dirname

        var getSelectedFilePathFromFuzzyFinderAndCloseIt = function () {
          var $, filePath, view
          $ = window.require('atom-space-pen-views').$
          view = $(e.target).closest('.fuzzy-finder').view()
          filePath = view.getSelectedItem().filePath
          view.cancel()
          return filePath
        }

        var generateImportCode = function (sourcePath, destinationPath) {
          var identifierName, relativePath
          if (basename(destinationPath).match(/^index\./)) {
            destinationPath = dirname(destinationPath)
          }
          relativePath = relative(dirname(sourcePath), destinationPath)
          relativePath = relativePath.replace(/^([^.])/, './$1')
          relativePath = relativePath.replace(/\.jsx?$/, '')
          identifierName = basename(destinationPath).replace(/\..+/, '')
          identifierName = identifierName.charAt(0).toUpperCase() + identifierName.slice(1)
          return 'import ' + identifierName + " from '" + relativePath + "'\n"
        }

        return (function () {
          var code, destinationPath, editor, sourcePath
          destinationPath = getSelectedFilePathFromFuzzyFinderAndCloseIt()
          editor = atom.workspace.getActiveTextEditor()
          sourcePath = editor.getPath()
          code = generateImportCode(sourcePath, destinationPath)
          return editor.insertText(code)
        })()
      }
    }))
  },

  deactivate () {
    this.subscriptions.dispose()
  },

  toggle () {
    console.log('Fuzzy File path!')
  }
}
