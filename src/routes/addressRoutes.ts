import Router from "koa-router"
import { address } from "../controllers/addressController"

const router = new Router()

router.post('/address', address)

export default router.routes()