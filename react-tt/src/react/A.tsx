import { useEffect, useState } from 'react'

export default function App() {
  const [user, setUser] = useState({ name: 'foo' })

  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <>
      <button onClick={() => setUser({ name: 'foo' })}>{user.name}</button>
    </>
  )
}
