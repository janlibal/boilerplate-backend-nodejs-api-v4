import { IContext } from "../interfaces/IContext"
import { IUser } from "../interfaces/IUser"
import userOperations from "../operations/userOperations"
import validate from "../validations"
import schema from '../validations/schemas/userSchema'

export async function signUp(ctx:IContext){

    const input:IUser = {
        email: ctx.request.body.email,
        name: ctx.request.body.name,
        password: ctx.request.body.password
    }

    await validate(schema.signUp, input)

    const user = await userOperations.create(input)

    ctx.status = 201
    ctx.body = user
    
}


export async function signIn(ctx:IContext){

    ctx.status = 200
    
}
