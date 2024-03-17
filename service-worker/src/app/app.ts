export interface App {
  getCacheKey: (request: Request) => string | Request | URL | null
  addCache: (key: string | Request | URL, response: Response) => Promise<void>
  getCache: (key: string | Request | URL) => Promise<Response | null>
}
