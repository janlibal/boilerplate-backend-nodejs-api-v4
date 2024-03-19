import { IContact, IContactData, IUserData } from "../interfaces/IContact"
import logger from "../utils/logger"

async function create(input: IContact) {
    
    logger.info('create address started')

    const fullName = input.lastName + ', ' + input.firstName
     
    const contactData: IContactData = {
        firstName: input.firstName,
        lastName: input.lastName,
        phoneNo: input.phoneNo,
        address: input.address,
    }

    const userData: IUserData = {
        fullName: fullName,
        userId: input.userId.toString(),
    }

    const _writeTime = {
        _seconds: 10000,
        _nanoseconds: 10000
    }   

    const contact = {
        _writeTime
    }

    logger.info('create address finished')
    
    return contact

}

export default {
     create
}