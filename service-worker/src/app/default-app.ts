import { App } from './app'
import { SPA_INDEX_KEY, spaIndexPathPattern } from './constants'
import { Options } from './options'
import { CacheMiddleware, GetCacheKeyType, Key } from './types'

const getDomain = (hostname: string) => {
  if (hostname.startsWith('www.')) {
    return hostname.slice(4)
  }
  return hostname
}

function staticCache(this: Options, request: Request): Key {
  const url = new URL(request.url)

  for (const pattern of this.staticPatterns) {
    if (pattern.test(url.pathname)) {
      return request
    }
  }

  return null
}

function spaIndexCache(this: Options, request: Request): Key {
  const url = new URL(request.url)
  const domain = getDomain(url.hostname)

  if (domain !== this.domain) {
    return null
  }

  if (spaIndexPathPattern.test(url.pathname)) {
    return SPA_INDEX_KEY
  }

  return null
}

async function processSPAIndex(this: Options, key: Key, response: Response): Promise<Response> {
  if (key === SPA_INDEX_KEY) {
    const originResponse = response.clone()
    const html = await response.text()
    const startIndex = html.indexOf(this.startElement)
    const endIndex = html.indexOf(this.endElement)
    
    if (startIndex >= 0 && endIndex > startIndex) {
      const element = html.slice(startIndex, endIndex + this.endElement.length)
      const newHtml = html.replace(element, `<div id="${this.divId}" />`)
      const newResponse = new Response(newHtml, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      })

      return newResponse
    } else {
      return originResponse
    }
  }
  return response
}

export const createApp = (options: Options): App => {
  const appCache = caches.open(options.cacheName)
  const cacheKeyGetters: GetCacheKeyType[] = []

  let cacheMiddleware: CacheMiddleware = async (key, response) => response

  if (options.staticPatterns.length > 0) {
    cacheKeyGetters.push(staticCache.bind(options))
  }
  if (options.isSPA) {
    cacheKeyGetters.push(spaIndexCache.bind(options))

    if (options.isSSR) {
      cacheMiddleware = processSPAIndex.bind(options)
    }
  }

  const app: App = {
    getCacheKey: (request: Request) => {
      for (const getter of cacheKeyGetters) {
        const result = getter(request)
        if (result !== null) {
          return result
        }
      }
      return null
    },
    addCache: async (key, response) => {
      (await appCache).put(key, await cacheMiddleware(key, response))
    },
    getCache: async (key) => {
      return (await (await appCache).match(key)) ?? null
    },
  }

  return app
}
