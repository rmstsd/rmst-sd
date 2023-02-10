import { useEffect, useState } from 'react'

const App = () => {
  const [count, setCount] = useState(0)

  const Com = () => {
    useEffect(() => {
      console.log(1)
    }, [])

    return <input type="text" />
  }

  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        {count}
      </button>
      <Com />
    </div>
  )
}
