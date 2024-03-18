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

    it('Should return 200 to make sure the route works', async () => {
      const request = supertest(server)
      const res = await request
      .post(`/api/v1/user`)
      .expect(200)
  })
})