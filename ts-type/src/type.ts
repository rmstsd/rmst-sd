/// <reference path="./namespace.ts" />

type A = string
type B = number

export type { A, B }

class People {
  eat() {}
}

export { type People }

Utils.isString

add(1, 2)

interface Window {
  asdf: string
}

declare global {
  interface Window {
    foo: string
  }

  interface String {
    toAa(): void
  }
}

declare let __Asd__: number

__Asd__ = 1

document.title

type kk = keyof ['a', 'b']

function Prop<O, T extends keyof O>(obj: O, k: T) {
  return obj[k]
}

const vv = Prop({ a: 1 }, 'a')

type Ua = 'a' | 'b' | 'c'

type FooObj = {
  [k in Ua]: string
}

interface Animalaaa {
  age: number
}

interface Dogdd extends Animalaaa {
  bark: () => void
}

let animal: Animalaaa
let dog: Dogdd

animal = dog

class Cat {
  miao: any
  animal: any
}

let cca: Cat

class Dog {
  animal: any
}

let cc: Cat
let dd: Dog

cc = null

dd = cc

function ff() {
  let cc: string

  return cc
}
