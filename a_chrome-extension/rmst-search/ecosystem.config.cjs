module.exports = {
  name: 'rmst-search',
  script: 'serve',
  env: {
    PM2_SERVE_PATH: 'E:\\rmst-sd\\a_chrome-extension\\rmst-search\\dist',
    PM2_SERVE_PORT: 8083,
    PM2_SERVE_SPA: 'true',
    PM2_SERVE_HOMEPAGE: '/index.html'
  }
}
