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

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZDU0M2E0YS05ZTkwLTQ1MjAtYTljNS1mMTE2YjgyMTgxOTIiLCJpYXQiOjE3MDk4MTk1MjIsImV4cCI6MTcwOTgyOTUyMiwiaXNzIjoiQ09NLkpBTkxJQkFMLmRldmVsb3BtZW50In0.12jmcKAa20PgC_l4DMYRGBdO8lzbWL1cj2xTvp7lhOk'
    
    const fakeUser = {
        email: 'joe.doe@joedoe.com',
        token
    }
       
    logger.info({email: fakeUser.email, token: token}, 'create user finished')

    return {
        email: fakeUser.email,
        token
    }
    
}
export default { 
    create
}