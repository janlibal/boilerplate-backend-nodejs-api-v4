import config from './config'
import logger from './utils/logger'
import createServer from './utils/server'

export async function server(){

  let server: any
  const srvPort = config.server.port


  try {

    server = createServer
    logger.info(`Server is listening on ${srvPort}. `)

  } catch (err:any) {

    process.exitCode = 1
    logger.fatal('FATAL ERROR WHILE STARTING SERVER!')

  } finally {
    if (!server){
      logger.debug("Closing server...")
      await server.close()
      logger.debug("Server closed")
    }

  }

}

server()
