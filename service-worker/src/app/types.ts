export type Key = string | Request | URL | null
export type GetCacheKeyType = (request: Request) => Key
export type CacheMiddleware = (key: Key, response: Response) => Promise<Response>
