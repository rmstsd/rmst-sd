import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'

const App = () => {
  const [count, setCount] = useState(0)

  const Child = () => {
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
      <Child />
    </div>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
