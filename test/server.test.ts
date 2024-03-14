import supertest from 'supertest'
import os from 'os'
import app from '../src/utils/app'
import pkg from '../package.json'


const server = app.listen()

afterAll(async () => {
    await server.close()
})


describe('GET /', () => {
      it('<200> should always return with the API server information', async () => {
        const request = supertest(server)
        const res = await request
          .get('/')
          .expect('Content-Type', /json/)
          .expect(200)
        const info = res.body
        const status = res.status
        
        expect(status).toBe(200)
        expect(info.name).toBe(pkg.name)
        expect(info.version).toBe(pkg.version)
        expect(info.description).toBe(pkg.description)
        expect(info.environments).toBeInstanceOf(Object)
  
        const environments = info.environments
        expect(environments.hostname).toBe(os.hostname())
        expect(environments.nodeVersion).toBe(process.versions['node'])
        expect(environments.platform).toBe(`${process.platform}/${process.arch}`)
      })
   })
   