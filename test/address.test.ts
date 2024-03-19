import supertest from 'supertest'
import app from '../src/utils/app'

const server = app.listen()

afterAll(async () => {
    await server.close()
})


describe('POST /api/v1/address', () => {
      it('Address test', async () => {
      
        const request = supertest(server)
        const res = await request
        .post(`/api/v1/address`)
        .expect(200)
        const info = res.body
        const status = res.status
        
        expect(info._writeTime).toBeInstanceOf(Object)
        const data = info._writeTime
        expect(data._seconds).toBeGreaterThan(10)
        expect(data._nanoseconds).toBeGreaterThan(10)
    })
})