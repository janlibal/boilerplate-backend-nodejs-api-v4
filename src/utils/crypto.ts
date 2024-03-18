import crypto from 'crypto'
import config from '../config'
import bcrypt from 'bcryptjs'

async function hashPassword(password: string) {
    return bcrypt.hash(peperify(password), config.auth.saltRounds)
}

function peperify(password: string) {
    return crypto.createHmac('sha1', config.auth.secret)
      .update(password)
      .digest('hex')
}



export default {
    hashPassword
}
