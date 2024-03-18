import  { User }  from "../database/models"

async function findByEmail(email: string) {
    let user: any
    user = await User.query().where('email', email).first()
    return user
} 

export default {
    findByEmail
}