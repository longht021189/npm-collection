import { Options, defaultOptions } from './app/options'
import { createApp } from './app/default-app'
import { Install } from './listener/install'
import { Activate } from './listener/activate'
import { Message } from './listener/message'
import { Sync } from './listener/sync'
import { Push } from './listener/push'
import { Fetch } from './listener/fetch'

const launch = (self: ServiceWorkerGlobalScope, options: Partial<Options>) => {
  const app = createApp({
    ...defaultOptions,
    ...options,
  })

  self.addEventListener('install', Install.bind(app))
  self.addEventListener('activate', Activate.bind(app))
  self.addEventListener('message', Message.bind(app))
  self.addEventListener('fetch', Fetch.bind(app))
  self.addEventListener('sync', Sync.bind(app))
  self.addEventListener('push', Push.bind(app))
}

export default launch
export { Options }