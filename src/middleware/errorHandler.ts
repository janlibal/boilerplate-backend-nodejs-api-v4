import { IContext } from "../interfaces/IContext"
import config from "../config"

async function errorHandler(ctx: IContext, next: () => Promise<any>) {
    try {
 
       await next()
 
      } catch (error: any) {

        const stack = error.stack ? error.stack.split('\n') : error.stack
        
        const isDevelopment = ['development', 'test', 'staging', 'production'].includes(config.server.environment)

        ctx.status = error.status || 500
        ctx.body = { 
            requestId: ctx.state.id,
            status: error.status,
            type: error.type,
            message: error.message,
            stack: stack && stack.length > 2 ? `${stack[0]}  ${stack[1]}` : stack
        }
        
    }

}

export default errorHandler
