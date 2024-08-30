import Tarefa from "../models/tarefaModel.js"

// export const getAll = async (req, res) => {
//     try{
//         const tarefas = await Tarefa.findAll()
//         res.status(200).json(tarefas)
//     } catch(error){
//         res.status(500).json({message: "Erro ao listar tarefas"})
//     }
// }
export const create = async (req, res) => {
    const {tarefa, descricao} = req.body
    const status = 1

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
    
    //Validações
    if (!tarefa) {
        return res.status(404).json({message: `A tarefa é obrigatória` });
    } 
    if (!descricao) {
        return res.status(404).json({message: `A descricao é obrigatória` });
    } 
    if (!status) {
        return res.status(404).json({message: `O status é obrigatório` });
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