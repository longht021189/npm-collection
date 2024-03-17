import { DEFAULT_CACHE_NAME } from "./constants"

export interface Options {
  domain: string
  cacheName: string
  staticPatterns: RegExp[]

  // when isSPA=true, the service worker will cache the SPA index
  isSPA: boolean

  // when isSPA=true and isSSR=true, the service worker will cache the SPA index after it is processed
  // it replace from startElement to endElement with <div id="<divId>" />
  isSSR: boolean
  startElement: string
  endElement: string
  divId: string
}

export const defaultOptions: Options = {
  cacheName: DEFAULT_CACHE_NAME,
  domain: "",
  staticPatterns: [],
  isSPA: false,
  isSSR: false,
  startElement: "",
  endElement: "",
  divId: ""
}