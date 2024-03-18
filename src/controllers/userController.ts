import { IContext } from "../interfaces/IContext"
import { IUser } from "../interfaces/IUser"
import validate from "../validations"
import schema from '../validations/schemas/userSchema'

export async function signUp(ctx:IContext){

    const input:IUser = {
        email: ctx.request.body.email,
        name: ctx.request.body.name,
        password: ctx.request.body.password
    }

    await validate(schema.signUp, input)

    const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZDU0M2E0YS05ZTkwLTQ1MjAtYTljNS1mMTE2YjgyMTgxOTIiLCJpYXQiOjE3MDk4MTk1MjIsImV4cCI6MTcwOTgyOTUyMiwiaXNzIjoiQ09NLkpBTkxJQkFMLmRldmVsb3BtZW50In0.12jmcKAa20PgC_l4DMYRGBdO8lzbWL1cj2xTvp7lhOk'
    
    const fakeUser = {
        email: 'joe.doe@joedoe.com',
        token: fakeToken
    }

    ctx.status = 201
    ctx.body = fakeUser
    
}