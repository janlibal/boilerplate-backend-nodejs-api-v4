import { IContact, IContactData, IUserData } from "../interfaces/IContact"
import logger from "../utils/logger"

async function create(input: IContact) {
    
    logger.info('create address started')

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