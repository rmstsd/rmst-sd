import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'

// 先点增加，再点隐藏，会不打印？
const Child = () => {
  const [count, setCount] = useState(1)

  useEffect(() => {
    return () => {
      console.log(count)
    }
  }, [])

  return <button onClick={() => setCount(count + 1)}>增加 {count}</button>
}

const App = () => {
  const [isShow, setIsShow] = useState(true)

  return (
    <div>
      <button onClick={() => setIsShow(false)}>隐藏</button>
      {isShow && <Child />}
    </div>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
