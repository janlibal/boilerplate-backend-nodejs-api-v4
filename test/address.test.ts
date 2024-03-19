import supertest from 'supertest'
import app from '../src/utils/app'
import { knex } from '../src/database'
import { createDummyAndAuthorize } from '../src/utils/helpers'


const server = app.listen()

let usr: any

afterAll(async () => {
    await server.close()
})

describe('POST /api/v1/address', () => {

  beforeEach(async() => {
    return await knex.migrate.rollback()
    .then(async () => {return await knex.migrate.latest()})
    .then(async () => { usr = await createDummyAndAuthorize() })
  })

  afterEach(async () => {
    return await knex.migrate.rollback()
  })

  it('1. ADDRESS: Should return 200', async () => {

    const contact = {
      firstName: 'Joe',
      lastName: 'Doe',
      phoneNo: '+1 (415) 200-0186',
      address: '1 Post Street, Suite 400. San Francisco, CA 94104.',
    }

    const request = supertest(server)
    const res = await request
    .post(`/api/v1/address`)
    .set('Authorization', `jwt ${usr.accessToken}`)
    .send(contact)
    .expect(200)
  })


  it('1. ADDRESS schema validation: Should return 200 when input provided correctly', async () => {

    const contact = {
      firstName: 'Joe',
      lastName: 'Doe',
      phoneNo: '+1 (415) 200-0186',
      address: '1 Post Street, Suite 400. San Francisco, CA 94104.',
    }

    const request = supertest(server)
    const res = await request
    .post(`/api/v1/address`)
    .set('Authorization', `jwt ${usr.accessToken}`)
    .send(contact)
    .expect(200)
    /*const info = res.body
    const status = res.status
    expect(info.userId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)*/
  })

  it('2. ADDRESS schema validation: Should return 400 for missing firstName', async () => {

    const contact = {
      //firstName: 'Joe',
      lastName: 'Doe',
      phoneNo: '+1 (415) 200-0186',
      address: '1 Post Street, Suite 400. San Francisco, CA 94104.',
    }

    const request = supertest(server)
    const res = await request
    .post(`/api/v1/address`)
    .set('Authorization', `jwt ${usr.accessToken}`)
    .send(contact)
    .expect(400)
    const info = res.body
    const status = res.status
    expect(info.status).toBe(400)
    expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    expect(info.type).toMatch('INVALID_BODY_FORMAT')
    expect(info.message).toMatch('instance.firstName is required')
    expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.firstName is required/i)
  })

  it('3. ADDRESS schema validation: Should return 400 for missing lastName', async () => {

    const contact = {
      firstName: 'Joe',
      //lastName: 'Doe',
      phoneNo: '+1 (415) 200-0186',
      address: '1 Post Street, Suite 400. San Francisco, CA 94104.',
    }

    const request = supertest(server)
    const res = await request
    .post(`/api/v1/address`)
    .set('Authorization', `jwt ${usr.accessToken}`)
    .send(contact)
    .expect(400)
    const info = res.body
    const status = res.status
    expect(info.status).toBe(400)
    expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    expect(info.type).toMatch('INVALID_BODY_FORMAT')
    expect(info.message).toMatch('instance.lastName is required')
    expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.lastName is required/i)
  })

  it('4. ADDRESS schema validation: Should return 400 for missing phoneNo', async () => {

    const contact = {
      firstName: 'Joe',
      lastName: 'Doe',
      //phoneNo: '+1 (415) 200-0186',
      address: '1 Post Street, Suite 400. San Francisco, CA 94104.',
    }

    const request = supertest(server)
    const res = await request
    .post(`/api/v1/address`)
    .set('Authorization', `jwt ${usr.accessToken}`)
    .send(contact)
    .expect(400)
    const info = res.body
    const status = res.status
    expect(info.status).toBe(400)
    expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    expect(info.type).toMatch('INVALID_BODY_FORMAT')
    expect(info.message).toMatch('instance.phoneNo is required')
    expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.phoneNo is required/i)
  })

  it('5. ADDRESS schema validation: Should return 400 for missing address', async () => {

    const contact = {
      firstName: 'Joe',
      lastName: 'Doe',
      phoneNo: '+1 (415) 200-0186',
      //address: '1 Post Street, Suite 400. San Francisco, CA 94104.',
    }

    const request = supertest(server)
    const res = await request
    .post(`/api/v1/address`)
    .set('Authorization', `jwt ${usr.accessToken}`)
    .send(contact)
    .expect(400)
    const info = res.body
    const status = res.status
    expect(info.status).toBe(400)
    expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    expect(info.type).toMatch('INVALID_BODY_FORMAT')
    expect(info.message).toMatch('instance.address is required')
    expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.address is required/i)
  })

  it('6. ADDRESS schema validation: Should return 400 for missing firstName and lastName', async () => {

    const contact = {
      //firstName: 'Joe',
      //lastName: 'Doe',
      phoneNo: '+1 (415) 200-0186',
      address: '1 Post Street, Suite 400. San Francisco, CA 94104.',
    }

    const request = supertest(server)
    const res = await request
    .post(`/api/v1/address`)
    .set('Authorization', `jwt ${usr.accessToken}`)
    .send(contact)
    .expect(400)
    const info = res.body
    const status = res.status
    expect(info.status).toBe(400)
    expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    expect(info.type).toMatch('INVALID_BODY_FORMAT')
    expect(info.message).toMatch('instance.firstName is required,instance.lastName is required')
    expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.firstName is required,instance.lastName is required/i)
  })

  it('7. ADDRESS schema validation: Should return 400 for missing firstName and phoneNo', async () => {

    const contact = {
      //firstName: 'Joe',
      lastName: 'Doe',
      //phoneNo: '+1 (415) 200-0186',
      address: '1 Post Street, Suite 400. San Francisco, CA 94104.',
    }

    const request = supertest(server)
    const res = await request
    .post(`/api/v1/address`)
    .set('Authorization', `jwt ${usr.accessToken}`)
    .send(contact)
    .expect(400)
    const info = res.body
    const status = res.status
    expect(info.status).toBe(400)
    expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    expect(info.type).toMatch('INVALID_BODY_FORMAT')
    expect(info.message).toMatch('instance.firstName is required,instance.phoneNo is required')
    expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.firstName is required,instance.phoneNo is required/i)
  })

  it('8. ADDRESS schema validation: Should return 400 for missing firstName and address', async () => {

    const contact = {
      //firstName: 'Joe',
      lastName: 'Doe',
      phoneNo: '+1 (415) 200-0186',
      //address: '1 Post Street, Suite 400. San Francisco, CA 94104.',
    }

    const request = supertest(server)
    const res = await request
    .post(`/api/v1/address`)
    .set('Authorization', `jwt ${usr.accessToken}`)
    .send(contact)
    .expect(400)
    const info = res.body
    const status = res.status
    expect(info.status).toBe(400)
    expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    expect(info.type).toMatch('INVALID_BODY_FORMAT')
    expect(info.message).toMatch('instance.firstName is required,instance.address is required')
    expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.firstName is required,instance.address is required/i)
  })

  it('8. ADDRESS schema validation: Should return 400 for missing lastName and phoneNo', async () => {

    const contact = {
      firstName: 'Joe',
      //lastName: 'Doe',
      //phoneNo: '+1 (415) 200-0186',
      address: '1 Post Street, Suite 400. San Francisco, CA 94104.',
    }

    const request = supertest(server)
    const res = await request
    .post(`/api/v1/address`)
    .set('Authorization', `jwt ${usr.accessToken}`)
    .send(contact)
    .expect(400)
    const info = res.body
    const status = res.status
    expect(info.status).toBe(400)
    expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    expect(info.type).toMatch('INVALID_BODY_FORMAT')
    expect(info.message).toMatch('instance.lastName is required,instance.phoneNo is required')
    expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.lastName is required,instance.phoneNo is required/i)
  })

  it('9. ADDRESS schema validation: Should return 400 for missing lastName and address', async () => {

    const contact = {
      firstName: 'Joe',
      //lastName: 'Doe',
      phoneNo: '+1 (415) 200-0186',
      //address: '1 Post Street, Suite 400. San Francisco, CA 94104.',
    }

    const request = supertest(server)
    const res = await request
    .post(`/api/v1/address`)
    .set('Authorization', `jwt ${usr.accessToken}`)
    .send(contact)
    .expect(400)
    const info = res.body
    const status = res.status
    expect(info.status).toBe(400)
    expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    expect(info.type).toMatch('INVALID_BODY_FORMAT')
    expect(info.message).toMatch('instance.lastName is required,instance.address is required')
    expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.lastName is required,instance.address is required/i)
  })

  it('10. ADDRESS schema validation: Should return 400 for missing phoneNo and address', async () => {

    const contact = {
      firstName: 'Joe',
      lastName: 'Doe',
      //phoneNo: '+1 (415) 200-0186',
      //address: '1 Post Street, Suite 400. San Francisco, CA 94104.',
    }

    const request = supertest(server)
    const res = await request
    .post(`/api/v1/address`)
    .set('Authorization', `jwt ${usr.accessToken}`)
    .send(contact)
    .expect(400)
    const info = res.body
    const status = res.status
    expect(info.status).toBe(400)
    expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    expect(info.type).toMatch('INVALID_BODY_FORMAT')
    expect(info.message).toMatch('instance.phoneNo is required,instance.address is required')
    expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.phoneNo is required,instance.address is required/i)
  })

  it('11. ADDRESS schema validation: Should return 400 for missing firstName, lastName, phoneNo, address', async () => {

    const contact = {
      //firstName: 'Joe',
      //lastName: 'Doe',
      //phoneNo: '+1 (415) 200-0186',
      //address: '1 Post Street, Suite 400. San Francisco, CA 94104.',
    }

    const request = supertest(server)
    const res = await request
    .post(`/api/v1/address`)
    .set('Authorization', `jwt ${usr.accessToken}`)
    .send(contact)
    .expect(400)
    const info = res.body
    const status = res.status
    expect(info.status).toBe(400)
    expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    expect(info.type).toMatch('INVALID_BODY_FORMAT')
    expect(info.message).toMatch('instance.firstName is required,instance.lastName is required,instance.phoneNo is required')
    expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.firstName is required,instance.lastName is required,instance.phoneNo is required,instance.address is required/i)
  })

  it('12. ADDRESS schema validation: Should return 400 for missing lastName, phoneNo, address', async () => {

    const contact = {
      firstName: 'Joe',
      //lastName: 'Doe',
      //phoneNo: '+1 (415) 200-0186',
      //address: '1 Post Street, Suite 400. San Francisco, CA 94104.',
    }

    const request = supertest(server)
    const res = await request
    .post(`/api/v1/address`)
    .set('Authorization', `jwt ${usr.accessToken}`)
    .send(contact)
    .expect(400)
    const info = res.body
    const status = res.status
    expect(info.status).toBe(400)
    expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    expect(info.type).toMatch('INVALID_BODY_FORMAT')
    expect(info.message).toMatch('instance.lastName is required,instance.phoneNo is required,instance.address is required')
    expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.lastName is required,instance.phoneNo is required,instance.address is required/i)
  })

  it('13. ADDRESS schema validation: Should return 400 for missing firstName, phoneNo, address', async () => {

    const contact = {
      //firstName: 'Joe',
      lastName: 'Doe',
      //phoneNo: '+1 (415) 200-0186',
      //address: '1 Post Street, Suite 400. San Francisco, CA 94104.',
    }

    const request = supertest(server)
    const res = await request
    .post(`/api/v1/address`)
    .set('Authorization', `jwt ${usr.accessToken}`)
    .send(contact)
    .expect(400)
    const info = res.body
    const status = res.status
    expect(info.status).toBe(400)
    expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    expect(info.type).toMatch('INVALID_BODY_FORMAT')
    expect(info.message).toMatch('instance.firstName is required,instance.phoneNo is required,instance.address is required')
    expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.firstName is required,instance.phoneNo is required,instance.address is required/i)
  })

  it('14. ADDRESS schema validation: Should return 400 for missing firstName, lastName, address', async () => {

    const contact = {
      //firstName: 'Joe',
      //lastName: 'Doe',
      phoneNo: '+1 (415) 200-0186',
      //address: '1 Post Street, Suite 400. San Francisco, CA 94104.',
    }

    const request = supertest(server)
    const res = await request
    .post(`/api/v1/address`)
    .set('Authorization', `jwt ${usr.accessToken}`)
    .send(contact)
    .expect(400)
    const info = res.body
    const status = res.status
    expect(info.status).toBe(400)
    expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    expect(info.type).toMatch('INVALID_BODY_FORMAT')
    expect(info.message).toMatch('instance.firstName is required,instance.lastName is required,instance.address is required')
    expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.firstName is required,instance.lastName is required,instance.address is required/i)
  })


  it('15. ADDRESS schema validation: Should return 400 for missing firstName, lastName, phoneNo', async () => {

    const contact = {
      //firstName: 'Joe',
      //lastName: 'Doe',
      //phoneNo: '+1 (415) 200-0186',
      address: '1 Post Street, Suite 400. San Francisco, CA 94104.',
    }

    const request = supertest(server)
    const res = await request
    .post(`/api/v1/address`)
    .set('Authorization', `jwt ${usr.accessToken}`)
    .send(contact)
    .expect(400)
    const info = res.body
    const status = res.status
    expect(info.status).toBe(400)
    expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    expect(info.type).toMatch('INVALID_BODY_FORMAT')
    expect(info.message).toMatch('instance.firstName is required,instance.lastName is required,instance.phoneNo is required')
    expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.firstName is required,instance.lastName is required,instance.phoneNo is required/i)
  })

  it('16. ADDRESS schema validation: Should return 400 for firstName being invalid type', async () => {

    const contact = {
      firstName: 123,
      lastName: 'Doe',
      phoneNo: '+1 (415) 200-0186',
      address: '1 Post Street, Suite 400. San Francisco, CA 94104.',
    }

    const request = supertest(server)
    const res = await request
    .post(`/api/v1/address`)
    .set('Authorization', `jwt ${usr.accessToken}`)
    .send(contact)
    .expect(400)
    const info = res.body
    const status = res.status
    expect(info.status).toBe(400)
    expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    expect(info.type).toMatch('INVALID_BODY_FORMAT')
    expect(info.message).toMatch('instance.firstName is not of a type\(s\) string')
    expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.firstName is not of a type\(s\) string/i)
  })

  it('17. ADDRESS schema validation: Should return 400 for lastName being invalid type', async () => {

    const contact = {
      firstName: 'Joe',
      lastName: 132,
      phoneNo: '+1 (415) 200-0186',
      address: '1 Post Street, Suite 400. San Francisco, CA 94104.',
    }

    const request = supertest(server)
    const res = await request
    .post(`/api/v1/address`)
    .set('Authorization', `jwt ${usr.accessToken}`)
    .send(contact)
    .expect(400)
    const info = res.body
    const status = res.status
    expect(info.status).toBe(400)
    expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    expect(info.type).toMatch('INVALID_BODY_FORMAT')
    expect(info.message).toMatch('instance.lastName is not of a type\(s\) string')
    expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.lastName is not of a type\(s\) string/i)
  })

  it('18. ADDRESS schema validation: Should return 400 for phoneNo being invalid type', async () => {

    const contact = {
      firstName: 'Joe',
      lastName: 'Doe',
      phoneNo: 123,
      address: '1 Post Street, Suite 400. San Francisco, CA 94104.',
    }

    const request = supertest(server)
    const res = await request
    .post(`/api/v1/address`)
    .set('Authorization', `jwt ${usr.accessToken}`)
    .send(contact)
    .expect(400)
    const info = res.body
    const status = res.status
    expect(info.status).toBe(400)
    expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    expect(info.type).toMatch('INVALID_BODY_FORMAT')
    expect(info.message).toMatch('instance.phoneNo is not of a type\(s\) string')
    expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.phoneNo is not of a type\(s\) string/i)
  })

  it('19. ADDRESS schema validation: Should return 400 for address being invalid type', async () => {

    const contact = {
      firstName: 'Joe',
      lastName: 'Doe',
      phoneNo: '+1 (415) 200-0186',
      address: 132,
    }

    const request = supertest(server)
    const res = await request
    .post(`/api/v1/address`)
    .set('Authorization', `jwt ${usr.accessToken}`)
    .send(contact)
    .expect(400)
    const info = res.body
    const status = res.status
    expect(info.status).toBe(400)
    expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    expect(info.type).toMatch('INVALID_BODY_FORMAT')
    expect(info.message).toMatch('instance.address is not of a type\(s\) string')
    expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.address is not of a type\(s\) string/i)
  })

  it('20. ADDRESS schema validation: Should return 400 for firstName, lastName being invalid type', async () => {

    const contact = {
      firstName: 123,
      lastName: 132,
      phoneNo: '+1 (415) 200-0186',
      address: '1 Post Street, Suite 400. San Francisco, CA 94104.',
    }

    const request = supertest(server)
    const res = await request
    .post(`/api/v1/address`)
    .set('Authorization', `jwt ${usr.accessToken}`)
    .send(contact)
    .expect(400)
    const info = res.body
    const status = res.status
    expect(info.status).toBe(400)
    expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    expect(info.type).toMatch('INVALID_BODY_FORMAT')
    expect(info.message).toMatch('instance.firstName is not of a type\(s\) string,instance.lastName is not of a type\(s\) string')
    expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.firstName is not of a type\(s\) string,instance.lastName is not of a type\(s\) string/i)
  })

  it('20. ADDRESS schema validation: Should return 400 for firstName, phoneNo being invalid type', async () => {

    const contact = {
      firstName: 123,
      lastName: 'Doe',
      phoneNo: 132,
      address: '1 Post Street, Suite 400. San Francisco, CA 94104.',
    }

    const request = supertest(server)
    const res = await request
    .post(`/api/v1/address`)
    .set('Authorization', `jwt ${usr.accessToken}`)
    .send(contact)
    .expect(400)
    const info = res.body
    const status = res.status
    expect(info.status).toBe(400)
    expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    expect(info.type).toMatch('INVALID_BODY_FORMAT')
    expect(info.message).toMatch('instance.firstName is not of a type\(s\) string,instance.phoneNo is not of a type\(s\) string')
    expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.firstName is not of a type\(s\) string,instance.phoneNo is not of a type\(s\) string/i)
  })

  it('21. ADDRESS schema validation: Should return 400 for firstName, address being invalid type', async () => {

    const contact = {
      firstName: 123,
      lastName: 'Doe',
      phoneNo: '+1 (415) 200-0186',
      address: 132,
    }

    const request = supertest(server)
    const res = await request
    .post(`/api/v1/address`)
    .set('Authorization', `jwt ${usr.accessToken}`)
    .send(contact)
    .expect(400)
    const info = res.body
    const status = res.status
    expect(info.status).toBe(400)
    expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    expect(info.type).toMatch('INVALID_BODY_FORMAT')
    expect(info.message).toMatch('instance.firstName is not of a type\(s\) string,instance.address is not of a type\(s\) string')
    expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.firstName is not of a type\(s\) string,instance.address is not of a type\(s\) string/i)
  })

  it('22. ADDRESS schema validation: Should return 400 for firstName, lastName, phoneNo being invalid type', async () => {

    const contact = {
      firstName: 123,
      lastName: 132,
      phoneNo: 123,
      address: '1 Post Street, Suite 400. San Francisco, CA 94104.',
    }

    const request = supertest(server)
    const res = await request
    .post(`/api/v1/address`)
    .set('Authorization', `jwt ${usr.accessToken}`)
    .send(contact)
    .expect(400)
    const info = res.body
    const status = res.status
    expect(info.status).toBe(400)
    expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    expect(info.type).toMatch('INVALID_BODY_FORMAT')
    expect(info.message).toMatch('instance.firstName is not of a type\(s\) string,instance.lastName is not of a type\(s\) string,instance.phoneNo is not of a type\(s\) string')
    expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.firstName is not of a type\(s\) string,instance.lastName is not of a type\(s\) string,instance.phoneNo is not of a type\(s\) string/i)
  })

  it('23. ADDRESS schema validation: Should return 400 for firstName, lastName, address being invalid type', async () => {

    const contact = {
      firstName: 123,
      lastName: 132,
      phoneNo: '+1 (415) 200-0186',
      address: 123,
    }

    const request = supertest(server)
    const res = await request
    .post(`/api/v1/address`)
    .set('Authorization', `jwt ${usr.accessToken}`)
    .send(contact)
    .expect(400)
    const info = res.body
    const status = res.status
    expect(info.status).toBe(400)
    expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    expect(info.type).toMatch('INVALID_BODY_FORMAT')
    expect(info.message).toMatch('instance.firstName is not of a type\(s\) string,instance.lastName is not of a type\(s\) string,instance.address is not of a type\(s\) string')
    expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.firstName is not of a type\(s\) string,instance.lastName is not of a type\(s\) string,instance.address is not of a type\(s\) string/i)
  })

  it('24. ADDRESS schema validation: Should return 400 for firstName, address, phoneNo being invalid type', async () => {

    const contact = {
      firstName: 123,
      lastName: 'Doe',
      phoneNo: 123,
      address: 123,
    }

    const request = supertest(server)
    const res = await request
    .post(`/api/v1/address`)
    .set('Authorization', `jwt ${usr.accessToken}`)
    .send(contact)
    .expect(400)
    const info = res.body
    const status = res.status
    expect(info.status).toBe(400)
    expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    expect(info.type).toMatch('INVALID_BODY_FORMAT')
    expect(info.message).toMatch('instance.firstName is not of a type\(s\) string,instance.phoneNo is not of a type\(s\) string,instance.address is not of a type\(s\) string')
    expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.firstName is not of a type\(s\) string,instance.phoneNo is not of a type\(s\) string,instance.address is not of a type\(s\) string/i)
  })

  it('25. ADDRESS schema validation: Should return 400 for lastName, phoneNo, address being invalid type', async () => {

    const contact = {
      firstName: 'Joe',
      lastName: 123,
      phoneNo: 123,
      address: 123,
    }

    const request = supertest(server)
    const res = await request
    .post(`/api/v1/address`)
    .set('Authorization', `jwt ${usr.accessToken}`)
    .send(contact)
    .expect(400)
    const info = res.body
    const status = res.status
    expect(info.status).toBe(400)
    expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    expect(info.type).toMatch('INVALID_BODY_FORMAT')
    expect(info.message).toMatch('instance.lastName is not of a type\(s\) string,instance.phoneNo is not of a type\(s\) string,instance.address is not of a type\(s\) string')
    expect(info.stack).toMatch(/InvalidRequestBodyFormat: instance.lastName is not of a type\(s\) string,instance.phoneNo is not of a type\(s\) string,instance.address is not of a type\(s\) string/i)
  })



})