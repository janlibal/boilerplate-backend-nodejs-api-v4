import { Next } from "koa"
import { IContext } from "../interfaces/IContext"
import logger from "../utils/logger"

export async function authenticate(ctx:IContext, next:Next) {

    if (!ctx.header.authorization) {
        logger.info('No authorization defined')
        throw new Error('No authorization defined')
      }

    return next()
  }
  