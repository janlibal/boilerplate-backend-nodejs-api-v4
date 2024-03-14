import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import koaBody from 'koa-body'
import requestId from 'koa-requestid'
import koaCompress from 'koa-compress'
import koaHelmet  from 'koa-helmet'
import cors from '@koa/cors'
import koaLogger from 'koa-logger'
import { koaSwagger } from 'koa2-swagger-ui'
import fs from 'fs'
import errorHandler from '../middleware/errorHandler'
import config from '../config'
import router from '../routes'

const app = new Koa()

app.use(errorHandler)
app.use(requestId())
app.use(koaCompress())
app.use(koaBody())
app.use(koaLogger())
app.use(cors({
  origin: config.server.cors.origin,
  allowMethods: config.server.cors.allowedMethods,
  allowHeaders: config.server.cors.allowedHeaders,
  exposeHeaders: config.server.cors.exposeHeaders
}))
app.use(
    koaSwagger({
      routePrefix: '/swagger',
      swaggerOptions: {
        spec: JSON.parse(fs.readFileSync('./src/spec/swagger.json', 'utf8')),
      },
    }),
  )
app.use(
  bodyParser({
    enableTypes: ["json"],
    jsonLimit: '10mb'
  }),
)
app.use(koaHelmet())
app.use(router.routes())
app.use(router.allowedMethods())

export default app