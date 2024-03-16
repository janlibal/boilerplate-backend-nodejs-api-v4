import config from './config'
import { close, connect } from './database'
import logger from './utils/logger'
import createServer from './utils/server'

export async function server(){

  let server: any
  let db: any
  const srvPort = config.server.port
  const dbPort = config.database.connection

  try {

    db = await connect()
    logger.info(`Database connected on ${dbPort}. `)

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

    if (!db){
      logger.debug("Closing database...")
      await close()
      logger.debug("Database closed")
    }

  }

}

server()
