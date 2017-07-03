'use babel'

import {$} from 'space-pen'
import find from 'lodash/find'

/* global atom */

export default function () {
  var selector = $('.fuzzy-finder').closest('.modal')
  var view = find(atom.workspace.getModalPanels(), {element: selector[0]})
  var filePath = view.item.selectListView.getSelectedItem().filePath
  view.item.cancel()

  return filePath
}
