'use babel'

import {CompositeDisposable} from 'atom'
import getSelectedFilePath from './getSelectedFilePath'
import generateImportCode from './generateImportCode'
import generateImportFromCode from './generateImportFromCode'
import importFile from '../helpers/importFile'

/* global atom */

export default {
  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    // Register command that toggles this view
    this.subscriptions.add(
      atom.commands.add('.fuzzy-finder atom-text-editor', {
        'fuzzyfilepath:import': function(e) {
          const destinationPath = getSelectedFilePath()
          const editor = atom.workspace.getActiveTextEditor()
          const sourcePath = editor.getPath()
          const importString = generateImportCode(sourcePath, destinationPath)
          importFile({importString, editor})
        },
        'fuzzyfilepath:import-from': function(e) {
          const destinationPath = getSelectedFilePath()
          const editor = atom.workspace.getActiveTextEditor()
          const sourcePath = editor.getPath()
          const importString = generateImportFromCode(sourcePath, destinationPath)
          importFile({importString, editor})
        }
      })
    )
  },

  deactivate() {
    this.subscriptions.dispose()
  }
}
