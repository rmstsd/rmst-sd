/// <reference types="vite/client" />

interface ChromeRuntime {
  id?: string
  lastError?: { message?: string }
  sendMessage: (msg: unknown, cb: (response: unknown) => void) => void
}
interface ChromeAPI {
  runtime?: ChromeRuntime
}
declare const chrome: ChromeAPI | undefined
