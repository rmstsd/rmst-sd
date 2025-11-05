// 定义颜色值
export const baseColor = { r: 0, g: 60, b: 255 }

export const overlayList = [
  { r: 255, g: 255, b: 255, a: 0.9 },
  { r: 255, g: 255, b: 255, a: 0.6 },
  { r: 255, g: 255, b: 255, a: 0.4 },
  { r: 255, g: 255, b: 255, a: 0.3 },
  { r: 255, g: 255, b: 255, a: 0.2 },
  { r: 0, g: 0, b: 0, a: 0 },
  { r: 0, g: 0, b: 0, a: 0.2 }
]

// 计算混合后的颜色
export function mixColors(base, overlay) {
  const alpha = overlay.a
  const r = Math.round(overlay.r * alpha + base.r * (1 - alpha))
  const g = Math.round(overlay.g * alpha + base.g * (1 - alpha))
  const b = Math.round(overlay.b * alpha + base.b * (1 - alpha))

  return { r, g, b }
}

const rs = overlayList.map(item => mixColors(baseColor, item))
