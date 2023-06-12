import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'

const App = () => {
  const [obj, setObj] = useState({ aa: 1 })

  useEffect(() => {
    console.log('eff')
  }, [obj])

  return (
    <div>
      <button
        onClick={() => {
          setObj({ aa: 1 })
        }}
      >
        {obj.aa}
      </button>
    </div>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
