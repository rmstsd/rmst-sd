import { Service } from 'node-windows'

var svc = new Service({
  name: 'A_Rmst_Hello World',
  description: 'The nodejs.org example web server.',
  script: 'E:\\rmst-sd\\node\\node-sea\\index.cjs' // hello.exe
  //, workingDirectory: '...'
  //, allowServiceLogon: true
})

// Listen for the "install" event, which indicates the process is available as a service.
svc.on('install', function () {
  svc.start()
})

// svc.install()

svc.uninstall()
