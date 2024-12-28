function calc(...rest) {
  return rest.reduce((acc, curr) => acc + curr, 0)
}

calc(1, 2, 3, 4, 5)
