import { Next } from "koa"
import { IContext } from "../interfaces/IContext"
import logger from "../utils/logger"

export async function authenticate(ctx:IContext, next:Next) {

    return next()
  }
  