import { App } from '../app/app'

const cacheFirst = async (app: App, request: Request): Promise<Response> => {
  const key = app.getCacheKey(request)

  if (key !== null) {
    const response = await app.getCache(key)
    if (response !== null) {
      return response
    }
  }

  try {
    const result = await fetch(request)

    if (key !== null) {
      await app.addCache(key, result)
    }

    return result
  } catch {}
}

export function Fetch(this: App, event: FetchEvent) {
  event.respondWith(cacheFirst(this, event.request))
}
