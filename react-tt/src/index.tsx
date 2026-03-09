import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import './b-line/b-line'

const rootEl = document.getElementById('root')
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl)
  root.render(<App />)
}
