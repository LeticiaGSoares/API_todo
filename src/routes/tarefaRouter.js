import { Router } from "express"
import { getAll, create, updateTarefa } from "../controllers/tarefaControllers.js"

const router = Router()

router.get("/", getAll)
router.post("/", create)
router.put("/:tarefa_id", updateTarefa)

export default router;