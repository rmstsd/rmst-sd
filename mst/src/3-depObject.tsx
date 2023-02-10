import { useEffect, useState } from 'react'

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
