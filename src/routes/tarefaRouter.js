import { Router } from "express"
import { getAll } from "../controllers/tarefaControllers.js"

const router = Router()

router.get("/", getAll)

export default router;