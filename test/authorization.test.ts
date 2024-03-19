import supertest from 'supertest'
import app from '../src/utils/app'

const server = app.listen()

const token = ''

afterAll(async () => {
    await server.close()
})

describe('Headers tests', () => {

    it('Should return error for missing token', async () => {
      const request = supertest(server)
      const res = await request
      .post(`/api/v1/address`)
      .set('Authorization', token)
      .expect(500)

      const info = res.body
      const status = res.status
      expect(status).toBe(500)
      expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
      expect(info.message).toMatch('No authorization defined')
      expect(info.stack).toMatch(/Error: No authorization defined/i)
    })

})