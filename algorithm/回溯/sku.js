/*

*/

const simpleSku = [
  ['大', '小'],
  ['白', '红']
]
console.log(simpleGet(simpleSku))

function simpleGet(arr) {
  const ans = []
  backTrack(0, '')
  return ans

  function backTrack(idx, str) {
    if (idx === arr.length) ans.push(str)
    else {
      const item = arr[idx]
      for (let v of item) {
        backTrack(idx + 1, str + v)
      }
    }
  }
}

// -------------------------------------------------------------------------------------------------

const skuArr = [
  {
    attr: '尺寸',
    valueList: ['大', '小']
  },
  {
    attr: '颜色',
    valueList: ['白', '红']
  }
]

// console.log(getSku(skuArr))

function getSku(arr) {
  const len = arr.length
  if (len === 0) return []

  const ans = []
  backTrack(0, {})
  return ans

  // 以 idx 作为层数(深度 )
  function backTrack(idx, initObj) {
    if (idx === len) ans.push({ ...initObj })
    else {
      const skuItem = arr[idx]
      for (const v of skuItem.valueList) {
        initObj[skuItem.attr] = v
        backTrack(idx + 1, initObj)
      }
    }
  }
}

// 笛卡尔积
// console.log(generateBaseData(skuArr))

function generateBaseData(arr) {
  if (arr.length === 0) return []
  if (arr.length === 1) {
    let [item_spec] = arr
    return item_spec.valueList.map(x => {
      return {
        [item_spec.attr]: x
      }
    })
  }
  if (arr.length >= 1) {
    return arr.reduce((accumulator, spec_item) => {
      let acc_value_list = Array.isArray(accumulator.valueList) ? accumulator.valueList : accumulator
      let item_value_list = spec_item.valueList
      let result = []
      for (let i in acc_value_list) {
        for (let j in item_value_list) {
          let temp_data = {}
          // 如果是对象
          if (acc_value_list[i].constructor === Object) {
            temp_data = {
              ...acc_value_list[i],
              [spec_item.attr]: item_value_list[j]
            }

            // 否则如果是字符串
          } else {
            temp_data[accumulator.attr] = acc_value_list[i]
            temp_data[spec_item.attr] = item_value_list[j]
          }
          result.push(temp_data)
        }
      }
      return result
    })
  }
}

//
