import { useEffect, useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log(count)
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </>
  )
}
