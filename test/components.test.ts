import { close, connect } from "../src/database"

describe('Postgres DB Connection', () => {
    it('should establish a successful DB connection', async () => {
      
      const db = await connect()
        
      expect(db).toBeTruthy()
        
      close()
    })
})
  