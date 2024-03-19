import supertest from 'supertest'
import app from '../src/utils/app'

const server = app.listen()

afterAll(async () => {
    await server.close()
})


describe('POST /api/v1/address', () => {
      it('Should return to make sure the route works', async () => {
        const request = supertest(server)
        const res = await request
        .post(`/api/v1/address`)
        .expect(200)
    })
})