import React from 'react'
import { Form, Button } from 'react-bootstrap';
import axios from 'axios'

const ToDoForm = () => {  
  const [tarefa, setTarefa] = React.useState("")
  const [descricao, setDescricao] = React.useState("")
  const [mensagem, setMensagem] = React.useState(null)
  
  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
        await axios.post("http://localhost:3333/tarefas", {
        tarefa,
        descricao
      })
      setDescricao("")
      setTarefa("")
      setMensagem("Tarefa registrada com sucesso!")

    }catch(error){
      console.error({err: error})
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="tarefa">
      <Form.Label>Título</Form.Label>
      <Form.Control 
        type="text" 
        placeholder="Digite o título da tarefa"
        value={tarefa}
        onChange={(e) => setTarefa(e.target.value)}
        />
    </Form.Group>
    <Form.Group className="mb-3" controlId="descricao">
      <Form.Label>Descrição</Form.Label>
      <Form.Control 
        as="textarea"
        rows={3}
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />
    </Form.Group>
    <Button type='submit'>+</Button>
    </Form>
    // {
    //   mensagem ? <p>{mensagem}</p>
    // }
  )
}

export default ToDoForm