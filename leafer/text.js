;(() => {
  const { top = 0, right = 1, bottom = 2, left = 3 } = {}

  function getDrawData(content, style) {
    if (typeof content !== 'string') content = String(content)
    let x = 0,
      y = 0
    let width = style.width || 0
    let height = style.height || 0
    const { textDecoration, __font, __padding: padding } = style
    if (padding) {
      if (width) {
        x = padding[left]
        width -= padding[right] + padding[left]
      }
      if (height) {
        y = padding[top]
        height -= padding[top] + padding[bottom]
      }
    }
    const drawData = {
      bounds: { x, y, width, height },
      rows: [],
      paraNumber: 0,
      font: (Platform.canvas.font = __font)
    }
    createRows(drawData, content, style)
    if (padding) {
      padAutoText(padding, drawData, style, width, height)
    }
    layoutText(drawData, style)
    layoutChar(drawData, style, width)
    if (drawData.overflow) {
      clipText(drawData, style)
    }
    if (textDecoration !== 'none') {
      decorationText(drawData, style)
    }
    return drawData
  }

  function decorationText(drawData, style) {
    const { fontSize } = style
    drawData.decorationHeight = fontSize / 11
    switch (style.textDecoration) {
      case 'under':
        drawData.decorationY = fontSize * 0.15
        break
      case 'delete':
        drawData.decorationY = -fontSize * 0.35
    }
  }

  function clipText(drawData, style) {
    const { rows, overflow } = drawData
    let { textOverflow } = style
    rows.splice(overflow)
    if (textOverflow !== 'hide') {
      if (textOverflow === 'ellipsis') textOverflow = '...'
      let char, charRight
      const ellipsisWidth = Platform.canvas.measureText(textOverflow).width
      const right = style.x + style.width - ellipsisWidth
      const list = style.textWrap === 'none' ? rows : [rows[overflow - 1]]
      list.forEach(row => {
        if (row.isOverflow && row.data) {
          let end = row.data.length - 1
          for (let i = end; i > -1; i--) {
            char = row.data[i]
            charRight = char.x + char.width
            if (i === end && charRight < right) {
              break
            } else if (charRight < right && char.char !== ' ') {
              row.data.splice(i + 1)
              row.width -= char.width
              break
            }
            row.width -= char.width
          }
          row.width += ellipsisWidth
          row.data.push({ char: textOverflow, x: charRight })
          if (row.textMode) {
            row
          }
        }
      })
    }
  }

  function addWord() {
    rowWidth += wordWidth
    word.width = wordWidth
    row.words.push(word)
    word = { data: [] }
    wordWidth = 0
  }
  const TextRowHelper = {
    trimRight(row) {
      const { words } = row
      let trimRight = 0,
        len = words.length,
        char
      for (let i = len - 1; i > -1; i--) {
        char = words[i].data[0]
        if (char.char === ' ') {
          trimRight++
          row.width -= char.width
        } else {
          break
        }
      }
      if (trimRight) words.splice(len - trimRight, trimRight)
    }
  }

  const { trimRight } = TextRowHelper
  function addRow() {
    if (paraStart) {
      textDrawData.paraNumber++
      row.paraStart = true
      paraStart = false
    }
    if (charSize) {
      row.startCharSize = startCharSize
      row.endCharSize = charSize
      startCharSize = 0
    }
    row.width = rowWidth
    if (bounds.width) {
      trimRight(row)
    }
    rows.push(row)
    row = { words: [] }
    rowWidth = 0
  }

  let textDrawData,
    rows = [],
    bounds

  let word, row, wordWidth, rowWidth, realWidth
  let char, charWidth, startCharSize, charSize, charType, lastCharType, langBreak, afterBreak, paraStart

  const money = '¥￥＄€£￡¢￠'
  const letter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz'
  const langBefore = '《（「〈『〖【〔｛┌＜‘“＝' + money
  const langAfter = '》）」〉』〗】〕｝┐＞’”！？，、。：；‰'
  const langSymbol = '≮≯≈≠＝…'
  const langBreak$1 = '—／～｜┆·'
  const beforeChar = '{[(<\'"' + langBefore
  const afterChar = '>)]}%!?,.:;\'"' + langAfter
  const symbolChar = afterChar + '_#~&*+\\=|' + langSymbol
  const breakChar = '- ' + langBreak$1
  const cjkRangeList = [
    [0x4e00, 0x9fff],
    [0x3400, 0x4dbf],
    [0x20000, 0x2a6df],
    [0x2a700, 0x2b73f],
    [0x2b740, 0x2b81f],
    [0x2b820, 0x2ceaf],
    [0x2ceb0, 0x2ebef],
    [0x30000, 0x3134f],
    [0x31350, 0x323af],
    [0x2e80, 0x2eff],
    [0x2f00, 0x2fdf],
    [0x2ff0, 0x2fff],
    [0x3000, 0x303f],
    [0x31c0, 0x31ef],
    [0x3200, 0x32ff],
    [0x3300, 0x33ff],
    [0xf900, 0xfaff],
    [0xfe30, 0xfe4f],
    [0x1f200, 0x1f2ff],
    [0x2f800, 0x2fa1f]
  ]
  const cjkReg = new RegExp(
    cjkRangeList.map(([start, end]) => `[\\u${start.toString(16)}-\\u${end.toString(16)}]`).join('|')
  )
  function mapChar(str) {
    const map = {}
    str.split('').forEach(char => (map[char] = true))
    return map
  }
  const letterMap = mapChar(letter)
  const beforeMap = mapChar(beforeChar)
  const afterMap = mapChar(afterChar)
  const symbolMap = mapChar(symbolChar)
  const breakMap = mapChar(breakChar)

  var CharType
  ;(function (CharType) {
    CharType[(CharType['Letter'] = 0)] = 'Letter'
    CharType[(CharType['Single'] = 1)] = 'Single'
    CharType[(CharType['Before'] = 2)] = 'Before'
    CharType[(CharType['After'] = 3)] = 'After'
    CharType[(CharType['Symbol'] = 4)] = 'Symbol'
    CharType[(CharType['Break'] = 5)] = 'Break'
  })(CharType || (CharType = {}))

  const {
    Letter: Letter$1,
    Single: Single$1,
    Before: Before$1,
    After: After$1,
    Symbol: Symbol$1,
    Break: Break$1
  } = CharType

  function getCharType(char) {
    if (letterMap[char]) {
      return Letter$1
    } else if (breakMap[char]) {
      return Break$1
    } else if (beforeMap[char]) {
      return Before$1
    } else if (afterMap[char]) {
      return After$1
    } else if (symbolMap[char]) {
      return Symbol$1
    } else if (cjkReg.test(char)) {
      return Single$1
    } else {
      return Letter$1
    }
  }

  function getTextCase(char, textCase, firstChar) {
    switch (textCase) {
      case 'title':
        return firstChar ? char.toUpperCase() : char
      case 'upper':
        return char.toUpperCase()
      case 'lower':
        return char.toLowerCase()
      default:
        return char
    }
  }
  function addChar(char, width) {
    if (charSize && !startCharSize) startCharSize = charSize
    word.data.push({ char, width })
    wordWidth += width
  }
  const { Letter, Single, Before, After, Symbol, Break } = CharType
  function createRows(drawData, content, style) {
    textDrawData = drawData
    rows = drawData.rows
    bounds = drawData.bounds
    const { __letterSpacing, paraIndent, textCase } = style
    const { canvas } = Platform
    const { width, height } = bounds
    const charMode = width || height || __letterSpacing || textCase !== 'none'
    if (charMode) {
      const wrap = style.textWrap !== 'none'
      const breakAll = style.textWrap === 'break'
      paraStart = true
      lastCharType = null
      startCharSize = charWidth = charSize = wordWidth = rowWidth = 0
      ;(word = { data: [] }), (row = { words: [] })
      for (let i = 0, len = content.length; i < len; i++) {
        char = content[i]
        if (char === '\n') {
          if (wordWidth) {
            addWord()
          }
          row.paraEnd = true
          addRow()
          paraStart = true
        } else {
          charType = getCharType(char)
          if (charType === Letter && textCase !== 'none') char = getTextCase(char, textCase, !wordWidth)
          charWidth = canvas.measureText(char).width
          if (__letterSpacing) {
            if (__letterSpacing < 0) charSize = charWidth
            charWidth += __letterSpacing
          }
          langBreak =
            (charType === Single && (lastCharType === Single || lastCharType === Letter)) ||
            (lastCharType === Single && charType !== After)
          afterBreak =
            (charType === Before || charType === Single) && (lastCharType === Symbol || lastCharType === After)
          realWidth = paraStart && paraIndent ? width - paraIndent : width
          if (wrap && width && rowWidth + wordWidth + charWidth > realWidth) {
            if (breakAll) {
              if (wordWidth) addWord()
              addRow()
            } else {
              if (!afterBreak) afterBreak = charType === Letter && lastCharType == After
              if (
                langBreak ||
                afterBreak ||
                charType === Break ||
                charType === Before ||
                charType === Single ||
                wordWidth + charWidth > realWidth
              ) {
                if (wordWidth) addWord()
                addRow()
              } else {
                addRow()
              }
            }
          }
          if (char === ' ' && paraStart !== true && rowWidth + wordWidth === 0) {
          } else {
            if (charType === Break) {
              if (char === ' ' && wordWidth) addWord()
              addChar(char, charWidth)
              addWord()
            } else if (langBreak || afterBreak) {
              if (wordWidth) addWord()
              addChar(char, charWidth)
            } else {
              addChar(char, charWidth)
            }
          }
          lastCharType = charType
        }
      }
      if (wordWidth) addWord()
      if (rowWidth) addRow()
      rows.length > 0 && (rows[rows.length - 1].paraEnd = true)
    } else {
      content.split('\n').forEach(content => {
        textDrawData.paraNumber++
        rows.push({
          x: paraIndent || 0,
          text: content,
          width: canvas.getContext('2d').measureText(content).width,
          paraStart: true
        })
      })
    }
  }

  // ---

  function padAutoText(padding, drawData, style, width, height) {
    if (!width) {
      switch (style.textAlign) {
        case 'left':
          offsetText(drawData, 'x', padding[left])
          break
        case 'right':
          offsetText(drawData, 'x', -padding[right])

        default:
          offsetText(drawData, 'x', padding[left])
      }
    }
    if (!height) {
      switch (style.verticalAlign) {
        case 'top':
          offsetText(drawData, 'y', padding[top])
          break
        case 'bottom':
          offsetText(drawData, 'y', -padding[bottom])

        default:
          offsetText(drawData, 'y', padding[top])
      }
    }
  }

  function offsetText(drawData, attrName, value) {
    const { bounds, rows } = drawData
    bounds[attrName] += value
    for (let i = 0; i < rows.length; i++) rows[i][attrName] += value
  }

  function layoutText(drawData, style) {
    const { rows, bounds } = drawData
    const {
      __lineHeight = 20,
      __baseLine = 0,
      __letterSpacing,
      __clipText,
      textAlign,
      verticalAlign,
      paraSpacing = 0
    } = style
    let { x, y, width, height } = bounds,
      realHeight = __lineHeight * rows.length + (paraSpacing ? paraSpacing * (drawData.paraNumber - 1) : 0)
    let starY = __baseLine

    if (__clipText && realHeight > height) {
      realHeight = Math.max(height, __lineHeight)
      drawData.overflow = rows.length
    } else {
      switch (verticalAlign) {
        case 'middle':
          y += (height - realHeight) / 2
          break
        case 'bottom':
          y += height - realHeight
      }
    }
    starY += y
    let row, rowX, rowWidth
    for (let i = 0, len = rows.length; i < len; i++) {
      row = rows[i]
      row.x = x
      switch (textAlign) {
        case 'center':
          row.x += (width - row.width) / 2
          break
        case 'right':
          row.x += width - row.width
      }
      if (row.paraStart && paraSpacing && i > 0) starY += paraSpacing
      console.log(paraSpacing)
      console.log(starY)
      row.y = starY
      starY += __lineHeight
      if (drawData.overflow > i && starY > realHeight) {
        row.isOverflow = true
        drawData.overflow = i + 1
      }
      rowX = row.x
      rowWidth = row.width
      if (__letterSpacing < 0) {
        if (row.width < 0) {
          rowWidth = -row.width + style.fontSize + __letterSpacing
          rowX -= rowWidth
          rowWidth += style.fontSize
        } else {
          rowWidth -= __letterSpacing
        }
      }
      if (rowX < bounds.x) bounds.x = rowX
      if (rowWidth > bounds.width) bounds.width = rowWidth
      if (__clipText && width && width < rowWidth) {
        row.isOverflow = true
        if (!drawData.overflow) drawData.overflow = rows.length
      }
    }
    bounds.y = y
    bounds.height = realHeight
  }

  const CharMode = 0
  const WordMode = 1
  const TextMode = 2
  function layoutChar(drawData, style, width, _height) {
    const { rows } = drawData
    const { textAlign, paraIndent, letterSpacing } = style
    let charX, addWordWidth, indentWidth, mode, wordChar
    rows.forEach(row => {
      if (row.words) {
        indentWidth = paraIndent && row.paraStart ? paraIndent : 0
        addWordWidth =
          width && textAlign === 'justify' && row.words.length > 1
            ? (width - row.width - indentWidth) / (row.words.length - 1)
            : 0
        mode = letterSpacing || row.isOverflow ? CharMode : addWordWidth > 0.01 ? WordMode : TextMode
        if (row.isOverflow && !letterSpacing) row.textMode = true
        if (mode === TextMode) {
          row.x += indentWidth
          toTextChar$1(row)
        } else {
          row.x += indentWidth
          charX = row.x
          row.data = []
          row.words.forEach(word => {
            if (mode === WordMode) {
              wordChar = { char: '', x: charX }
              charX = toWordChar(word.data, charX, wordChar)
              if (wordChar.char !== ' ') row.data.push(wordChar)
            } else {
              charX = toChar(word.data, charX, row.data)
            }
            if (!row.paraEnd && addWordWidth) {
              charX += addWordWidth
              row.width += addWordWidth
            }
          })
        }
        row.words = null
      }
    })
  }

  function toTextChar$1(row) {
    row.text = ''
    row.words.forEach(word => {
      word.data.forEach(char => {
        row.text += char.char
      })
    })
  }
  function toWordChar(data, charX, wordChar) {
    data.forEach(char => {
      wordChar.char += char.char
      charX += char.width
    })
    return charX
  }
  function toChar(data, charX, rowData) {
    data.forEach(char => {
      if (char.char !== ' ') {
        char.x = charX
        rowData.push(char)
      }
      charX += char.width
    })
    return charX
  }

  function toTextChar(row) {
    row.text = ''
    row.data.forEach(char => {
      row.text += char.char
    })
    row.data = null
  }

  window.getDrawData = getDrawData
  // --
})()
