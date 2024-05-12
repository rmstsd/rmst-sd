;(() => {
  let i = 1
  with ({
    get a() {
      return i++
    }
  }) {
    if (a == 1 && a == 2 && a == 3) {
      console.log('hello medium')
    }
  }
})()

//
;(() => {
  let i = 1

  let a = {
    valueOf() {
      return i++
    }
  }

  if (a == 1 && a == 2 && a == 3) {
    console.log('hello medium')
  }
})()

//
;(() => {
  const a = {
    i: 1,
    [Symbol.toPrimitive]() {
      return this.i++
    }
  }

  if (a == 1 && a == 2 && a == 3) {
    console.log('hello medium') // hello medium
  }
})()

//
;(() => {
  let a = new Proxy(
    { i: 1 },
    {
      get(target) {
        return () => target.i++
      }
    }
  )

  if (a == 1 && a == 2 && a == 3) {
    console.log('hello medium') // hello medium
  }
})()

console.log('---------------')

let uu = 10
const aoo = {
  get bv() {
    uu += 10
    return uu
  }
}

console.log(aoo.bv)
console.log(aoo)

console.log('-----------')

// [@@toPrimitive]()（将 default 作为 hint 值）、valueOf() 和 toString()
;(() => {
  const o = {
    [Symbol.toPrimitive]() {
      return 1
    },
    // valueOf() {
    //   return 2
    // },
    toString() {
      return 3
    }
  }

  console.log(o == 1)

  // console.log(o)
  // console.log(o + 1)
})()
