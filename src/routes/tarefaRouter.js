import { Router } from "express"
import { getAll, create, getTarefa, updateTarefa } from "../controllers/tarefaControllers.js"

const router = Router()

router.get("/", getAll)
router.post("/", create)
router.get("/:tarefa_id", getTarefa)
router.put("/:tarefa_id", updateTarefa)

export default router;