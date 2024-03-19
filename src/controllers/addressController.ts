import schema from '../validations/schemas/addressSchema'
import validate from '../validations'
import { IContext } from "../interfaces/IContext"
import { IContact } from '../interfaces/IContact'
import addressOperations from '../operations/addressOperations'

export async function address(ctx:IContext){

    const userId = ctx.state.userId

    const body = {
        firstName: ctx.request.body.firstName,
        lastName: ctx.request.body.lastName,
        phoneNo: ctx.request.body.phoneNo,
        address: ctx.request.body.address,
    }

    await validate(schema.address, body)

    const input: IContact = {
        firstName: body.firstName,
        lastName: body.lastName,
        phoneNo: body.phoneNo,
        address: body.address,
        userId: userId
    }

    const address = await addressOperations.create(input)

    ctx.status = 200
    ctx.body = address

}