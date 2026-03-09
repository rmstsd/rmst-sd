const { execSync } = require('child_process')
const { readFileSync } = require('fs')
const { inject } = require('postject')
// execSync('npx postject hello.exe NODE_SEA_BLOB sea-prep.blob --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2')

execSync(
  `npm exec postject -- hello.exe NODE_SEA_BLOB sea-prep.blob --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2`,
  { stdio: 'inherit' }
)

// {
//   ;(async () => {
//     const blobData = readFileSync('./sea-prep.blob')
//     await inject('hello.exe', 'NODE_SEA_BLOB', blobData, {
//       sentinelFuse: 'NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2',
//       machoSegmentName: 'NODE_SEA' // 为了兼容性保留
//     })
//   })()
// }

// macos 需要
// `lipo hello.exe -thin $(uname -m) -output hello.exe'
