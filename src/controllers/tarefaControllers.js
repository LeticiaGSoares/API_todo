import Tarefa from "../models/tarefaModel.js"
import {z} from "zod";
import {formatZodError} from "../helpers/index.js"

const createSchema = z.object({
    tarefa: z
        .string()
        .min(3, {error: "A tarefa deve ter pelo menos 3 caracteres"})
        .transform((txt)=> txt.toLowerCase()),
    descricao: z
        .string()
        .transform((txt)=> txt.toLowerCase())
})

const getSchema = z.object({
    tarefa_id: z.string().uuid()
})

export const create = async (req, res) => {
    const {tarefa, descricao} = req.body
    const bodyValidation = createSchema.safeParse(req.body)
    if(!bodyValidation.success){
        return res.status(400).json({
            message: "Erro interno do servidor",
            error: formatZodError(bodyValidation.error)
        })
    }

    const status = 1
    const novaTarefa = {
        tarefa,
        descricao,
        status
    }

    try{
        await Tarefa.create(novaTarefa)
        res.status(201).json({message: "Tarefa cadastrada"})
    }catch (error){
        console.error(error)
        res.status(500).json({message: "Erro interno do servidor"})
    }
}

//tarefas?page=3&limit=10
export const getAll = async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = 3
    const offset = (page - 1) * limit
    try{
        const tarefas = await Tarefa.findAndCountAll({
            limit,
            offset
        })

        const totalPaginas = Math.ceil(tarefas.count / limit)
        res.status(200).json({
            totalTarefas: tarefas.count,
            totalPags: totalPaginas,
            pagAtual: page,
            itensPorPag: limit,
            ProximaPag: totalPaginas === 0 ? null : `http://localhost:3333/tarefas?page=${page + 1}`,
            pagAnterior: page - 1 === 0 ? null : `http://localhost:3333/tarefas?page=${page - 1}`,
            tarefas: tarefas.rows
        });
    }catch(error){
        res.status(500).json({message: "Erro interno do servidor: "+ error})
    }
}

export const getTarefa = async (req, res) => {
    const {tarefa_id} = req.params

    const paramsValidation = getSchema.safeParse(req.params)
    if(!paramsValidation.success){
        res.status(400).json({
            message: "Id da tarefa é inválido",
            error: paramsValidation.error
        })
        return
    }

    try{
        const tarefa = await Tarefa.findByPk(tarefa_id)

        if (!tarefa) {
            return res.status(404).json({message: `Tarefa ${tarefa_id} não existe` });
        } 

        res.status(200).json({message: tarefa})
    }catch (error){
        res.status(500).json({message: "Erro interno do servidor" + error})
    }
}

export const updateTarefa = async (req, res) => {
    const {tarefa_id} = req.params
    const {tarefa, descricao, status} = req.body

    const bodyValidation = createSchema.safeParse(req.body)
    if(!bodyValidation.success){
        return res.status(500).json({
            message: "Erro interno do servidor",
            error: formatZodError(bodyValidation.error)
        })
    }
    
    const updatedTarefa = {
        tarefa, 
        descricao, 
        status
    } 
    
    try{
        const [linhasAfetadas] = await Tarefa.update(updatedTarefa, {where : {id: tarefa_id}})
        if(linhasAfetadas <= 0){ 
            return res.status(404).json({message: "Tarefa não encontrada"})
        }
        
        res.status(200).json({message: "Tarefa atualizada"})
    }catch(error){
        res.status(500).json({message: "Erro interno do seridor" + error});
    }
}

export const updateStatus = async (req, res)=> {
    const {tarefa_id} = req.params

    const paramsValidation = getSchema.safeParse(req.params)
    if(!paramsValidation.success){
        res.status(400).json({
            message: "Id da tarefa é inválido",
            error: paramsValidation.error
        })
        return
    }

    try{
        const tarefa = await Tarefa.findByPk(tarefa_id)

        if (!tarefa) {
            return res.status(404).json({message: `Tarefa ${tarefa_id} não existe` });
        }
        
        const status = tarefa.dataValues.status === "pendente"? 2 : 1

        const updatedTarefa = {
            status
        }

        const [linhasAfetadas] = await Tarefa.update(updatedTarefa, {where : {id: tarefa_id}})
        if(linhasAfetadas <= 0){ 
            return res.status(404).json({message: "Tarefa não encontrada"})
        }

        res.status(200).json({message: "Tarefa atualizada"})
    }catch(error){
        res.status(500).json({message: "Erro interno do seridor" + error});
    }
}

export const getTaskByStatus = async (req, res) => {
    const {situacao} = req.params
    
    try{
        const tarefa = await Tarefa.findAll({ where: { status: situacao}})

        if (!tarefa) {
            return res.status(404).json({message: `Tarefa com status ${situacao} não existe` });
        } 

        res.status(200).json({message: tarefa})

    }catch(error){
        res.status(500).json({message: "Erro interno do servidor" + error})
    }
}