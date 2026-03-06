import bSpline from 'b-spline'
import { realData } from './data'

const controls = [
  { x: 0.617, y: 1.974, weight: 10 },
  { x: 1.483, y: 2.396, weight: 10 },
  { x: 2.266, y: 1.229, weight: 10 },
  { x: 2.841, y: 3.003, weight: 10 },
  { x: 3.4, y: 0.941, weight: 10 },
  { x: 4.417, y: 1.974, weight: 10 }
]

console.log(bSpline)

// Here the curve is called non-uniform as the knots are not equally spaced

var knots = [0, 0, 0, 0.375, 0.5, 0.625, 1, 1, 1]

// and rational as its control points have varying weights

var weights = controls.map(item => item.weight)
var degree = 2

const controlsPoints = controls.map(item => [item.x, item.y])
let points = []
for (var t = 0; t < 1; t += 0.01) {
  var point = bSpline(t, degree, controlsPoints, knots, weights)
  points.push(point)
}

console.log(points)

const realDataPoints = realData.map(item => [item.x, item.y])

// points 和 realDataPoints 保留两位小数后比较
const pointsRounded = points.map(item => item.map(coord => Number(coord.toFixed(2))))
const realDataPointsRounded = realDataPoints.map(item => item.map(coord => Number(coord.toFixed(2))))

// console.log(JSON.stringify(pointsRounded) === JSON.stringify(realDataPointsRounded))

// bSpline(t, degree, points[, knots, weights])

import verb from 'verb-nurbs'

console.log(verb)

{
  // 创建曲线
  const data = {
    degree: 3,
    controlPoints: [
      [0, 0, 0],
      [5, 10, 0],
      [10, 0, 0],
      [15, 10, 0]
    ],
    knots: [0, 0, 0, 0, 1, 1, 1, 1],
    weights: [1, 1, 1, 1]
  }
  const curve = verb.geom.NurbsCurve.byKnotsControlPointsWeights(data.degree, data.knots, data.controlPoints, data.weights)
  console.log(curve)

  // 计算总长度
  const length = curve.length()

  // 手动进行等距采样：利用 verb 的 divideByLength 或针对参数 u 进行重映射
  const divideData = curve.divideByEqualArcLength(50)
  // console.log(divideData)

  console.log(divideData.map(item => curve.point(item.u)))
}
