// @ts-check

import axios from 'axios'
import md5 from 'md5'

const url = 'https://fanyi-api.baidu.com/api/trans/vip/fieldtranslate'

const appid = '20230629001728461'
const secretKey = 'vksALO685xFe7k6rfxHB'

const domain = 'it'

const salt = '1435130289'

const q = '编辑器'

const s_1 = appid + q + salt + domain + secretKey
const sign = md5(s_1)

const data = { q: q, from: 'zh', to: 'en', appid, salt, domain, sign }

console.log(data)

axios
  .post(url, data, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
  .then(res => {
    console.log(res.data)

    console.log(res.data.trans_result[0].src)
    console.log(res.data.trans_result[0].dst)
  })

/** 
{
  from: 'en',
  to: 'en',
  trans_result: [
    {
      src: '%E8%8B%B9%E6%9E%9C%EF%BC%81',
      dst: '%E8%8B%B9%E6%9E%9C%EF%BC%81' 
    }
  ]
}
*/
