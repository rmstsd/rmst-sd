import { useEffect, useState } from 'react'

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
