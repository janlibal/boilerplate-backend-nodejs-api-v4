import supertest from 'supertest'
import app from '../src/utils/app'
import { knex } from '../src/database'


const server = app.listen()

afterAll(async () => {
    await server.close()
})


describe('POST /api/v1/user', () => {

  beforeEach(async() => {
      return await knex.migrate.rollback()
      .then(async () => {return await knex.migrate.latest()})
    })

    afterEach(async () => {
      return await knex.migrate.rollback()
    })

    it('1. VALIDATION: Should register user', async () => {
      const request = supertest(server)
      const userData = {
        name: 'Joe Doe',
        email: 'joe.doe@joedoe.com',
        password: 'Password.123!'
      }
      const res = await request
      .post(`/api/v1/user`)
      .send(userData)
      .expect('Content-Type', /json/)
      .expect(201)
      const info = res.body
      const status = res.status
      expect(status).toBe(201)
      expect(info.email).toMatch(/^\S+@\S+\.\S+$/)
      expect(info.token).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
    })

    it('2. VALIDATION: returns 400 for missing name', async () => {
      const request = supertest(server)
      const userData = {
        //name: testUser.name,
        email: 'joe.doe@joedoe.com',
        password: 'Password.123!'
      }
      const res = await request
      .post(`/api/v1/user`)
      .send(userData)
      .expect('Content-Type', /json/)
      .expect(400)
  
      const info = res.body
      const status = res.status
      expect(status).toBe(400)
      expect(info.status).toBe(400)
      expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
      expect(info.type).toMatch('INVALID_BODY_FORMAT')
      expect(info.message).toMatch('instance.name is required')
      expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.name is required/i)
    })
  
  
    it('3. VALIDATION: returns 400 for missing email', async () => {
      const request = supertest(server)
      const userData = {
        name: 'Joe Doe',
        //email: testUser.email,
        password: 'Passowrd.123!'
      }
      const res = await request
      .post(`/api/v1/user`)
      .send(userData)
      .expect('Content-Type', /json/)
      .expect(400)
  
      const info = res.body
      const status = res.status
      expect(status).toBe(400)
      expect(info.status).toBe(400)
      expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
      expect(info.type).toMatch('INVALID_BODY_FORMAT')
      expect(info.message).toMatch('instance.email is required')
      expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.email is required/i)
    })
  
  
    it('4. VALIDATION: returns 400 for missing password', async () => {
      const request = supertest(server)
      const userData = {
        name: 'Joe Doe',
        email: 'joe.doe@joedoe.com'
        //password: testUser.password
      }
      const res = await request
      .post(`/api/v1/user`)
      .send(userData)
      .expect('Content-Type', /json/)
      .expect(400)
  
      const info = res.body
      const status = res.status
      expect(status).toBe(400)
      expect(info.status).toBe(400)
      expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
      expect(info.type).toMatch('INVALID_BODY_FORMAT')
      expect(info.message).toMatch('instance.password is required')
      expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.password is required/i)
    })
  
  
    it('5. VALIDATION: returns 400 for missing name and email', async () => {
      const request = supertest(server)
      const userData = {
        //name: testUser.name,
        //email: testUser.email,
        password: 'Password.123!'
      }
      const res = await request
      .post(`/api/v1/user`)
      .send(userData)
      .expect('Content-Type', /json/)
      .expect(400)
  
      const info = res.body
      const status = res.status
      expect(status).toBe(400)
      expect(info.status).toBe(400)
      expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
      expect(info.type).toMatch('INVALID_BODY_FORMAT')
      expect(info.message).toMatch('instance.name is required,instance.email is required')
      expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.name is required,instance.email is required/i)
    })
  
    it('6. VALIDATION: returns 400 for missing name and password', async () => {
      const request = supertest(server)
      const userData = {
        //name: testUser.name,
        email: 'joe.doe@joedoe.com'
        //password: testUser.password
      }
      const res = await request
      .post(`/api/v1/user`)
      .send(userData)
      .expect('Content-Type', /json/)
      .expect(400)
  
      const info = res.body
      const status = res.status
      expect(status).toBe(400)
      expect(info.status).toBe(400)
      expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
      expect(info.type).toMatch('INVALID_BODY_FORMAT')
      expect(info.message).toMatch('instance.name is required,instance.password is required')
      expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.name is required,instance.password is required/i)
      
    })
  
  
    it('7. VALIDATION: returns 400 for missing email and password', async () => {
      const request = supertest(server)
      const userData = {
        name: 'Joe Doe', 
        //email: 'joe.doe@joedoe.com' //testUser.email,
        //password: testUser.password
      }
      const res = await request
      .post(`/api/v1/user`)
      .send(userData)
      .expect('Content-Type', /json/)
      .expect(400)
  
      const info = res.body
      const status = res.status
      expect(status).toBe(400)
      expect(info.status).toBe(400)
      expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
      expect(info.type).toMatch('INVALID_BODY_FORMAT')
      expect(info.message).toMatch('instance.email is required,instance.password is required')
      expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.email is required,instance.password is required/i)
      
    })
  
    it('8. VALIDATION: returns 400 for missing email and name', async () => {
      const request = supertest(server)
      const userData = {
        //name: testUser.name,
        //email: 'joe.doe@joedoe.com' //testUser.email,
        password: 'Password.123!'
      }
      const res = await request
      .post(`/api/v1/user`)
      .send(userData)
      .expect('Content-Type', /json/)
      .expect(400)
  
      const info = res.body
      const status = res.status
      expect(status).toBe(400)
      expect(info.status).toBe(400)
      expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
      expect(info.type).toMatch('INVALID_BODY_FORMAT')
      expect(info.message).toMatch('instance.name is required,instance.email is required')
      expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.name is required,instance.email is required/i)
      
    })

    it('9. REGISTER: User already exists', async () => {
      const request = supertest(server)
      const userData = {
        name: 'Joe Doe',
        email: 'joe.doe@joedoe.com', //testUser.email,
        password: 'Password.123!'
      }
 
      const createUser = await request
      .post(`/api/v1/user`)
      .send(userData)
  
      const res = await request
      .post(`/api/v1/user`)
      .send(userData)
      .expect('Content-Type', /json/)
      .expect(409)
  
      const info = res.body
      const status = res.status
      expect(status).toBe(409)
      expect(info.status).toBe(409)
      expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
      expect(info.type).toMatch('RESOURCE_ALREADY_EXISTS')
      expect(info.message).toMatch('User already registered')
      expect(info.stack).toMatch(/ResourceAlreadyExists: User already registered/i)
      
      
    })

})


describe('POST /api/v1/login', () => {

  beforeEach(async() => {
      return await knex.migrate.rollback()
      .then(async () => {return await knex.migrate.latest()})
    })

    afterEach(async () => {
      return await knex.migrate.rollback()
    })

    it('Should return 200 to make sure the route works', async () => {
      const request = supertest(server)
      
      const res = await request
      .post(`/api/v1/user`)
      .expect('Content-Type', /json/)
      .expect(200)
    })

})
