import type * as TypeNs from './type'
import type TypeNsde from './type'

import type { People } from './type'

type qq = TypeNs.People

let pp: People

export type NnNn = 'aa'

interface IdLabel {
  id: number /* some fields */
}
interface NameLabel {
  name: string /* other fields */
}
function createLabel(id: number): IdLabel
function createLabel(name: string): NameLabel
function createLabel(nameOrId: string | number): IdLabel | NameLabel

function createLabel(nameOrId: string | number): IdLabel | NameLabel {
  throw 'unimplemented'
}

const a = createLabel('')

function cl<T extends string | number>(p: T): T extends number ? IdLabel : NameLabel {
  throw ''
}

cl(2)

type MessageOf<t> = t extends { message: unknown } ? t['message'] : never

type m = MessageOf<{ message: string }>
type n = MessageOf<{ messagae: string }>

const arr = [1, 2, 3]

type ArrItem<T> = T extends (infer R)[] ? R : never

type it = (typeof arr)[number]
type it2 = ArrItem<typeof arr>

declare function stringOrNum(x: string): number
declare function stringOrNum(x: number): string
declare function stringOrNum(x: string | number): number | string

type T1 = ReturnType<typeof stringOrNum>

// 分布式条件类型
type Ta<T> = T extends string | number ? T[] : never
type sn = Ta<string | number>

type H = 1 extends object ? true : false

// ------------------------

type tt = 'a' | 'b' | 'c'
type uu = 'c'

type distributive1 = Extract<tt, uu>
type distributive2 = tt extends uu ? tt : never

type IsString<T> = T extends string ? true : false

type B5 = IsString<1 | 2>
// type B5 = false
type B6 = IsString<1 | '1'>
// type B6 = boolean

interface Op {
  a: any
  b: any
  c: any
  d: any
  e: any
}

type removeKey<O, Keys extends keyof O> = {
  [k in keyof O as k extends Keys ? never : k]: O[k]
}

type aas = removeKey<Op, 'a' | 'c'>

type CreateMutable<Type> = {
  [Property in keyof Type]-?: Type[Property]
}
type LockedAccount = {
  id?: string
  name: string
}
type UnlockedAccount = CreateMutable<LockedAccount>

type tuuu = keyof LockedAccount

type Getters<T> = {
  [k in keyof T as `get${Capitalize<string & k>}`]: () => T[k]
}

interface User {
  name: string
  age: number
}

type Gt = Getters<User>

//-----------------------------

type EventConfig<T extends { kind: string }> = {
  [k in T as k['kind']]: (event: k) => void
}

type SquareEvent = { kind: 'square'; x: number; y: number }
type CircleEvent = { kind: 'circle'; radius: number }
type Config = EventConfig<SquareEvent | CircleEvent>

// type Config = {
//   square: (event: SquareEvent) => void
//   circle: (event: CircleEvent) => void
// }

const fggg = (<string>(<unknown>undefined)).startsWith

interface St {
  n: string
  m: string
  k: string
}

type mp<T> = {
  [k in keyof T as `${Uppercase<string & k>}_${string & k}`]: T[k]
}

type sst = mp<St>

// ---------------------------------------------------------------------------------------------------------------------------

type PropEventSource<T> = {
  on<Key extends string & keyof T>(eventName: `${Key}Changed`, callback: (newValue: T[Key]) => void): void
}

type OnPropEventSource<T> = {
  [k in keyof T as `on${Capitalize<string & k>}`]: (newValue: T[k]) => void
}

declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type> & OnPropEventSource<Type>

const person = makeWatchedObject({
  firstName: 'Saoirse',
  lastName: 'Ronan',
  age: 26
})

person.on('firstNameChanged', newValue => {
  console.log(`firstName was changed to ${newValue}!`)
})

person.on('ageChanged', newValue => {
  console.log(`firstName was changed to ${newValue}!`)
})

person.onFirstName = newValue => {}
person.onAge = newValue => {}

function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2)
}

combine<string | number>([1], ['a'])

function mmForEach<T>(arr: T[], cb: (item: T, index: number) => void) {
  arr.forEach((item, idx) => {
    cb(item, idx)
  })
}

const arree = ['']

mmForEach(arree, (item, index) => {
  index.toString
})

type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>
type Z1 = Promise<Promise<Promise<string | boolean>>>
type T = { then: (onfulfilled: (arg: number) => any) => any }

type MyAwaited<T> = T extends PromiseLike<infer R> //
  ? R extends PromiseLike<unknown>
    ? MyAwaited<R>
    : R
  : never
