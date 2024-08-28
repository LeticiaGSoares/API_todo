import { Router } from "express"
import { getAll, create, getTarefa } from "../controllers/tarefaControllers.js"

const router = Router()

router.get("/", getAll)
router.post("/", create)
router.get("/:tarefa_id", getTarefa)

export default router;