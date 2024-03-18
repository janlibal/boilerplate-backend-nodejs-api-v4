import Router from "koa-router"
import { signUp } from "../controllers/userController"

const router = new Router()

router.post('/user', signUp)

export default router.routes()