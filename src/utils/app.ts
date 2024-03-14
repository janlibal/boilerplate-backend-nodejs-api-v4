import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import koaBody from 'koa-body'
import requestId from 'koa-requestid'
import koaCompress from 'koa-compress'
import koaHelmet  from 'koa-helmet'
import cors from '@koa/cors'
import koaLogger from 'koa-logger'
import errorHandler from '../middleware/errorHandler'

import config from '../config'

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
  bodyParser({
    enableTypes: ["json"],
    jsonLimit: '10mb'
  }),
)
app.use(koaHelmet())

export default app