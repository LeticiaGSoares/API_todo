import "dotenv/config"
import express from "express"
import cors from "cors"

import tarefaRouter from './routes/tarefaRouter.js'

const PORT = process.env.PORT || 3333
const app = express()

app.use(cors())
app.use(express.urlencoded({extended: true}))

app.use("/tarefas", tarefaRouter)

app.get("*", (req, res) => {
    res.status(404).json({message: "Página não encontrado"})
})

app.listen(PORT, () => {
    console.log("Rodando na porta: http://localhost:" + PORT)
})