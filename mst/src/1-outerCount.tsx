import { useState } from 'react'

let outerCount = 1

// 先点按钮一，再点按钮二，最终 outerCount，和 innerCount 的渲染结果是什么？
const App = () => {
  const [innerCount, setInnerCount] = useState(1)

  return (
    <div>
      <>
        <button
          onClick={() => {
            outerCount = outerCount + 1
          }}
        >
          按钮一
        </button>
        <span>{outerCount}</span>
      </>
      <hr />
      <>
        <button onClick={() => setInnerCount(innerCount + 1)}>按钮二</button>
        <span>{innerCount}</span>
      </>
    </div>
  )
}
