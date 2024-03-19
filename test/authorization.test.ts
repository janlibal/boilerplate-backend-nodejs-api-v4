import supertest from 'supertest'
import app from '../src/utils/app'

const server = app.listen()

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZDU0M2E0YS05ZTkwLTQ1MjAtYTljNS1mMTE2YjgyMTgxOTIiLCJpYXQiOjE3MDk4MTk1MjIsImV4cCI6MTcwOTgyOTUyMiwiaXNzIjoiQ09NLkpBTkxJQkFMLmRldmVsb3BtZW50In0.12jmcKAa20PgC_l4DMYRGBdO8lzbWL1cj2xTvp7lhOk'

afterAll(async () => {
    await server.close()
})

describe('Headers tests', () => {

    it('1. AUTHORIZATION: Should return 500 for missing token', async () => {
      const request = supertest(server)
      const res = await request
      .post(`/api/v1/address`)
      .expect(500)

      const info = res.body
      const status = res.status
      expect(status).toBe(500)
      expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
      expect(info.message).toMatch('No authorization defined')
      expect(info.stack).toMatch(/Error: No authorization defined/i)
    })

    it('2. AUTHORIZATION: Should return 403 for invalid token', async () => {
        const request = supertest(server)
        const res = await request
        .post(`/api/v1/address`)
        .set('Authorization', token)
        .expect(403)
  
        const info = res.body
        const status = res.status
        expect(status).toBe(403)
        expect(info.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
        expect(info.status).toBe(403)
        expect(info.message).toMatch('Invalid Token')
        expect(info.stack).toMatch(/InvalidToken: Invalid Token/i)
    })

})