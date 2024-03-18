import  { User }  from "../database/models"
import { IUser } from "../interfaces/IUser"

async function findByEmail(email: string) {
    let user: any
    user = await User.query().where('email', email).first()
    return user
} 

async function saveUser(attributes:IUser) {
    let user: any
    user = await User.query().insertAndFetch(attributes)
    return user
}

export default {
    findByEmail,
    saveUser
}