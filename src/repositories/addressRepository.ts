import { IContactData, IUserData } from '../interfaces/IContact'

async function save(contactData: IContactData, userData:IUserData) {
    const _writeTime = {
        _seconds: 10000,
        _nanoseconds: 10000
    }   

    const contact = {
        _writeTime
    }

    return
}

export default {
 save
}