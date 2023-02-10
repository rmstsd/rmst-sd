import { useState } from 'react'

let outerCount = 1

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
          yarn 按钮一
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
