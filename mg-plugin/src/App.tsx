import React, { useState, useEffect } from 'react'
import './App.css'
import { sendMsgToPlugin, UIMessage } from '../messages/sender'

function App() {
  const [mgText] = useState('MasterGo')

  const [data, setData] = useState([])

  useEffect(() => {
    sendMsgToPlugin({
      type: UIMessage.HELLO,
      data: 'hello'
    })

    console.log('addEventListener message')

    window.addEventListener('message', evt => {
      console.log(evt.data)
      setData(evt.data)
    })
  }, [])

  const dataString = JSON.stringify(data, null, 2)

  return (
    <div className="hello">
      Hello {mgText}
      <div></div>
      <button onClick={() => navigator.clipboard.writeText(dataString)}>复制</button>
      <pre>{dataString}</pre>
    </div>
  )
}
export default App
