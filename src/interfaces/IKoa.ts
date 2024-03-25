import { BaseContext } from "koa"

export interface KoaConfig {
    nodeEnv: string
    port: number
  }
  
  export interface KoaMiddleware {
    ctx: BaseContext;
    next(): Promise<any>
  }