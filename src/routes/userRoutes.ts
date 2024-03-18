import Router from "koa-router"

const router = new Router()

router.post('/user', signUp)

export default router.routes()