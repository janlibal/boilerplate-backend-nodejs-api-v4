import crypto from 'crypto'
import config from '../config'
import bcrypt from 'bcryptjs'
import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken'

const signOptions: SignOptions = {
    algorithm: config.auth.createOptions.algorithm, 
    expiresIn: config.auth.createOptions.expiresIn,
    issuer: `${config.auth.createOptions.issuer}.${config.server.environment}`
}

const verifyOptions: VerifyOptions = {
    algorithms: [config.auth.createOptions.algorithm],
    issuer: `${config.auth.createOptions.issuer}.${config.server.environment}`,
}

async function comparePasswords(candidatePassword:string, userPassword:string) {
    return bcrypt.compare(peperify(candidatePassword), userPassword)
}

async function hashPassword(password: string) {
    return bcrypt.hash(peperify(password), config.auth.saltRounds)
}

function peperify(password: string) {
    return crypto.createHmac('sha1', config.auth.secret)
      .update(password)
      .digest('hex')
}

async function generateAccessToken(userId: string) {
    const payload = { userId }
     return jwt.sign(payload, config.auth.secret, signOptions)
}

async function verifyToken(token: string) {
    try {
        const data = await jwt.verify(token, config.auth.secret, verifyOptions)
        return data
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError || err instanceof SyntaxError) {
            return null
        }
    throw err
    }
}



export default {
    hashPassword,
    generateAccessToken,
    comparePasswords,
    verifyToken
}
