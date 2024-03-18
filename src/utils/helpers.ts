import userRepository from "../repositories/userRepository"
import crypto from "./crypto"
import { randLastName, randFirstName, randPhoneNumber, randStreetAddress, randEmail } from '@ngneat/falso'



export async function createDummyAndAuthorize() {
  
  const pwd = 'Password123!'
  const name = 'Jan Libal'
  const email = 'jan.libal@libaldesign.com'

  /*const firstName = randFirstName()
  const lastName = randLastName()
  const name = firstName + ' ' + lastName
  const email = randEmail()*/
  
  const dummyUser = {
    name: name,
    email: email,
    password: await crypto.hashPassword(pwd),
  }

  let createdUser: any

  createdUser = await userRepository.saveUser(dummyUser)

  createdUser.accessToken = await crypto.generateAccessToken(createdUser.id)

  return createdUser
    
}

export const testUser = {
  name: randFirstName() + ' ' + randLastName(),
  email: randEmail(),
  password: 'Password123!'

}

export async function createDummy() {
    
  const firstName = randFirstName()
  const lastName = randLastName()
  const name = firstName + ' ' + lastName
  const email = randEmail()
  const pwd = 'Password123!'
  
  const dummyUser = {
    name: name,
    email: email,
    password: await crypto.hashPassword(pwd),
  }

  const user = await userRepository.saveUser(dummyUser)
  return user
}

