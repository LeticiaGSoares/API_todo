import Tarefa from "../models/tarefaModel.js"

export const getAll = async (req, res) => {
    try{
        const tarefas = await Tarefa.findAll()
        res.status(200).json(tarefas)
    } catch(error){
        res.status(500).json({message: "Erro ao listar tarefas"})
    }
}

export const create = async (req, res) => {
    const {tarefa, descricao} = req.body
    const status = "pedente"

    if(!tarefa){
        res.status(400).json({validationError: "A tarefa é obrigatória"})
    }
    if(!descricao){
        res.status(400).json({validationError: "A descricao é obrigatória"})
    }

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