import { getSelectedText } from 'node-get-selected-text'

setTimeout(() => {
  const selectedText = getSelectedText()
  console.log('selected text: ', selectedText)
}, 2000)
