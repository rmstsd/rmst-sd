import { exec, spawn } from 'node:child_process'

exec('npm run preview', { shell: true, stdio: 'inherit' })
