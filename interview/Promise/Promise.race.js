// @ts-check

const genP = count => {
  return new Promise((resolve, reject) => {
    if (count > 5) resolve({ code: 200, value: count })
    else reject({ code: 500, value: count })
  })
}

const arr = [genP(1), genP(2), genP(6)]

console.log(race(arr))

function race(array) {
  return new Promise((resolve, reject) => {
    array.forEach(pItem => {
      pItem.then(resolve, reject)
    })
  })
}
