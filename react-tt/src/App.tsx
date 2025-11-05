import { json } from './json'

import './color'
import { baseColor, mixColors, overlayList } from './color'

const App = () => {
  const PaintStyles = json.LocalPaintStyles.map(item => {
    if (item.name.includes('Brand')) {
      return null
    }

    const name = item.name.split('/')[1]

    const { r, g, b, a } = item.paints[0].color
    const value = `${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${Math.round(a * 100) / 100}`

    const rgba = `rgba(${value})`

    const stylText = `${name} = ${rgba};`

    return { name, value: rgba, stylText }
  })
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name))

  const PaintStylesText = PaintStyles.reduce((acc, item) => acc + item.stylText + '\n', '')

  const TextStyles = json.LocalTextStyles.map(item => {
    const name = item.name.split('/')[1]

    let stylText = `${name}()
  font-size: ${item.fontSize}px;
  line-height: ${item.lineHeight.value}px;`

    if (item.fontName.style === 'Bold') {
      stylText += `
  font-weight: bold;`
    }

    return { name, stylText }
  })
    .sort((a, b) => a.name.localeCompare(b.name))
    .reduce((acc, item) => acc + item.stylText + '\n', '')

  const rs = overlayList.map(item => mixColors(baseColor, item))
  const rs_2 = overlayList.map(item => mixColors({ r: 213, g: 244, b: 75 }, item)) // rgba(213, 244, 75, 1)

  return (
    <div className="content">
      <div className="flex">
        {rs.toReversed().map(item => (
          <div key={item.r + item.g + item.b} className="flex gap-3 m-2">
            <div style={{ width: 40, height: 40, backgroundColor: `rgb(${item.r}, ${item.g}, ${item.b})` }}></div>
          </div>
        ))}
      </div>

      <div className="flex">
        {rs_2.toReversed().map((item, index) => (
          <div key={index} className="flex gap-3 m-2">
            <div style={{ width: 40, height: 40, backgroundColor: `rgb(${item.r}, ${item.g}, ${item.b})` }}></div>
          </div>
        ))}
      </div>

      <div className="m-4">
        {PaintStyles.map(item => (
          <div key={item.name} className="flex gap-3 m-2">
            {item.name}: {item.value}
            <div style={{ width: 40, height: 40, backgroundColor: item.value }}></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
