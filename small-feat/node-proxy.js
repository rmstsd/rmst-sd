import fetch from 'node-fetch'
import { HttpsProxyAgent } from 'https-proxy-agent'

import axios from 'axios'

const proxy = 'http://127.0.0.1:7890'
const ag = new HttpsProxyAgent(proxy)

// fetch('https://rmst-server.vercel.app/', { agent: ag }).then(res => {
//   res.text().then(res => {
//     console.log(res)
//   })
// })

// axios.get('https://rmst-server.vercel.app/', { httpsAgent: ag }).then(res => {
//   console.log(res.data)
// })

axios.post('https://rmst-server.vercel.app/uploadFile', null, { httpsAgent: ag }).then(res => {
  console.log(res.data)
})
