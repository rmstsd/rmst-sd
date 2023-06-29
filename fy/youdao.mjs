// @ts-check

import axios from 'axios'
import CryptoJS from 'crypto-js'

function truncate(q) {
  const len = q.length
  if (len <= 20) return q
  return q.substring(0, 10) + len + q.substring(len - 10, len)
}

const appKey = '2d47366206c6a48b'
const appSecretKey = 'KmHaHUUczEQDOnV3gb4qCXDCpkArcOv5'

const q = '转换'
const salt = new Date().getTime()
const curtime = Math.round(new Date().getTime() / 1000)
const from = 'zh-CHS'
const to = 'en'

const str1 = appKey + truncate(q) + salt + curtime + appSecretKey
const sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex)

const data = { q, from, to, appKey, salt, sign, signType: 'v3', curtime }

axios
  .post('https://openapi.youdao.com/api', data, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
  .then(res => {
    console.log(res.data)
  })
