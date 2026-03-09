import { once, EventEmitter } from 'node:events'
import process, { nextTick } from 'node:process'

const ee = new EventEmitter()

process.nextTick(() => {
  ee.emit('myevent', 42, 6)
  ee.emit('myevent', 42, 6)
})

once(ee, 'myevent')
  .then(d => {
    console.log(d)
  })
  .catch(err => {
    console.log('err 了')
  })
