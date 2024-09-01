var ghpages = require('gh-pages')

ghpages.publish(
  'dist',
  {
    repo: 'https://github.com/rmstsd/rmst-sd.git'
  },
  err => {
    console.log('err', err)
  }
)
