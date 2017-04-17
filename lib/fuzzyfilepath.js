'use babel'

import { CompositeDisposable } from 'atom'
import {$} from 'space-pen'

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
          var view = $(e.target).closest('.fuzzy-finder').view()
          var filePath = view.getSelectedItem().filePath
          view.cancel()
          return filePath
        }

        var generateImportCode = function (sourcePath, destinationPath) {
          if (basename(destinationPath).match(/^index\./)) {
            destinationPath = dirname(destinationPath)
          }
          var relativePath = relative(dirname(sourcePath), destinationPath)
          relativePath = relativePath.replace(/^([^.])/, './$1')
          relativePath = relativePath.replace(/\.jsx?$/, '')
          var identifierName = basename(destinationPath).replace(/\..+/, '')
          identifierName = identifierName.charAt(0).toUpperCase() + identifierName.slice(1)
          return 'import ' + identifierName + " from '" + relativePath + "'\n"
        }

        var destinationPath = getSelectedFilePathFromFuzzyFinderAndCloseIt()
        var editor = atom.workspace.getActiveTextEditor()
        var sourcePath = editor.getPath()
        var code = generateImportCode(sourcePath, destinationPath)
        return editor.insertText(code)
      }
    }))
  },

  deactivate () {
    this.subscriptions.dispose()
  }
}
