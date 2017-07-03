'use babel'

import {CompositeDisposable} from 'atom'
import getSelectedFilePath from './getSelectedFilePath'
import generateImportCode from './generateImportCode'
import generateImportFromCode from './generateImportFromCode'

/* global atom */

export default {
  subscriptions: null,

  activate (state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('.fuzzy-finder atom-text-editor', {
      'fuzzyfilepath:import': function (e) {
        var destinationPath = getSelectedFilePath()
        var editor = atom.workspace.getActiveTextEditor()
        var sourcePath = editor.getPath()
        var code = generateImportCode(sourcePath, destinationPath)
        return editor.insertText(code)
      },
      'fuzzyfilepath:import-from': function (e) {
        var destinationPath = getSelectedFilePath()
        var editor = atom.workspace.getActiveTextEditor()
        var sourcePath = editor.getPath()
        var code = generateImportFromCode(sourcePath, destinationPath)
        return editor.insertText(code)
      }
    }))
  },

  deactivate () {
    this.subscriptions.dispose()
  }
}
