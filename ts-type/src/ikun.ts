// 类型安全 保证成员始终可用、
// 谁在收参数 谁在给参数

interface Fans {
  call: any // 打 call
}

interface IKun extends Fans {
  sing: any
  dance: any
  basketball: any
}

interface SuperIKun extends IKun {
  rap: any
}

// SuperIKun < IKun < Fans

let fans_1: Fans = { call: '' }

let ikun_1: IKun = fans_1 // 不能保证成员始终可用, 所以 ts 给了报错

//

let Ikun_2: IKun = { call: '', sing: '', dance: '', basketball: '' }

let fans_2: Fans = ikun_1 // 可以保证大类型的成员始终是可用的 保证了类型安全

// 协变: 小类型 给 大类型 是安全的

//

type Transform = (x: IKun) => IKun
type SuperIKunTransform = (x: SuperIKun) => SuperIKun

const superTransform: SuperIKunTransform = x => x as any

const transform: Transform = superTransform // 小类型有一些大类型里没有的东西, IKun 里没有 SuperIKun 里的 rap 属性, 造成类型不安全

transform(Ikun_2)

// 逆变: 小类型 给 大类型 是不安全的
