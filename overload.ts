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
type Ta<T> = [T] extends [string | number] ? T[] : never
type sn = Ta<string | number>

type H = 1 extends object ? true : false
