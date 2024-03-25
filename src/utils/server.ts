
import config from '../config'
import { server } from './app';

const port = config.server.port || 8080

const createServer = server.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
})

export default createServer