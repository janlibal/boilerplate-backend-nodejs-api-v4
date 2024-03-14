import logger from "./utils/logger"

export async function helloWorld() {
    logger.info('Logging started')
    const data= 'Hello world!'
    return data
}

helloWorld()