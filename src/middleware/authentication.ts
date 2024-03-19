import { Next } from "koa"
import { IContext } from "../interfaces/IContext"
import logger from "../utils/logger"
import * as errors from '../utils/errors'

async function parseHeader(hdrValue:string) {

    if (!hdrValue || typeof hdrValue !== 'string') {
      return null
    }
  
    const matches = hdrValue.match(/(\S+)\s+(\S+)/u)
      
    const data =  matches && {
      scheme: matches[0],
      value: matches[1],
    }
  
    return data
  }


async function getAuthPayload(authorization:string) {
  
    const parsedHeader = await parseHeader(authorization)

    if (!parsedHeader
        || !parsedHeader.value
        || !parsedHeader.scheme
        //|| parsedHeader.scheme.toLowerCase() !== 'jwt'
        || parsedHeader.value.toLowerCase() !== 'jwt' 
    ) {
        return null
    }
        
    return true
     
   }

export async function authenticate(ctx:IContext, next:Next) {

    if (!ctx.header.authorization) {
        logger.info('No authorization defined')
        throw new Error('No authorization defined')
    }

    const jwtToken = ctx.header.authorization!

    const data = await getAuthPayload(jwtToken)
    if (!data) {
        throw new errors.InvalidToken()
    }

    return next()
  }
  