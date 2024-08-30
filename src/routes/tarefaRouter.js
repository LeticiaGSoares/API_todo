import { Router } from "express"
import { getAll, create, getTarefa, updateTarefa, getTaskByStatus,updateStatus } from "../controllers/tarefaControllers.js"

const router = Router()

router.get("/", getAll)
router.post("/", create)
router.get("/:tarefa_id", getTarefa)
router.get("/status/:situacao", getTaskByStatus)
router.put("/:tarefa_id", updateTarefa)
router.put("/status/:tarefa_id", updateStatus)

export default router;