Reflect.defineProperty(Object.prototype, 'gg', {
  get() {
    return this
  }
})

const person = (function () {
  const a = {
    name: 'jack',
    age: 18
  }

  return {
    gghjk(key) {
      return a[key]
    }
  }
})()

console.log(person.gghjk('name'))
person.gghjk('gg').name = 'qwer'
console.log(person.gghjk('name'))
