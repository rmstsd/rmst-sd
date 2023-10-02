type Line = { type: 'line'; radius: number }
type Bar = { type: 'bar'; aaa: number }
type Pie = { type: 'pie'; bbb: number }

type Shape = Line | Bar | Pie

const op: Shape = {
  type: 'bar',
  aaa: 33
}
