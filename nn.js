fetch('https://test-jet-iota-65.vercel.app/get-test', { method: 'post' }).then(res => {
  res.text().then(oo => {
    console.log(oo)
  })
})
