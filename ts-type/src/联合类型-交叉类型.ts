type U = { a: number; b: number } & { b: number; c: number }

const uu: U = {
  a: 1,
  b: 2,
  c: 1
}

type V = { a: number; b: number } | { b: number; c: number }

const vv: V = { a: 1, b: 2, c: 2 }

type tt = 'a' | 'b' | (1 & string)
