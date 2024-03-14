import Router from 'koa-router'
import testRoutes from './testRoutes'

const router = new Router()

const test = new Router()

test.use(testRoutes)

router.use('', test.routes())

export default router