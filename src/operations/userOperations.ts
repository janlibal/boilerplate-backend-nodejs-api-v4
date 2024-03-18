import { IUser } from "../interfaces/IUser"
import logger from "../utils/logger"
import crypto from "../utils/crypto"
import userRepository from "../repositories/userRepository"
import * as errors from '../utils/errors'

async function create(input: IUser) {
    
    logger.info('create user started')

    const data = {
      email: input.email,
      name: input.name,
      password: await crypto.hashPassword(input.password),
    }

    const user = await userRepository.findByEmail(data.email)
        
    if (user) {
      logger.info('Resource already exists')
      throw new errors.ResourceAlreadyExists('User already registered')
    }

    let createdUser: any
    createdUser = await userRepository.saveUser(data)

    const token = await crypto.generateAccessToken(createdUser.id)
       
    logger.info({email: createdUser.email, token: token}, 'create user finished')

    return {
        email: createdUser.email,
        token
    }
    
}
export default { 
    create
}