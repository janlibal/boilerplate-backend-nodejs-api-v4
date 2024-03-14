import Router from "koa-router"
import { getApiInfo } from "../controllers/testController"

const router = new Router()

router.get('', getApiInfo)

export default router.routes()