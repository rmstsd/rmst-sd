export const replaceNbspToSpace = text => {
  text = encodeURI(text).replace(/%C2%A0/g, '%20')
  text = decodeURI(text)

  return text
}

export function copyText(text: string) {
  navigator.clipboard.writeText(text)
}