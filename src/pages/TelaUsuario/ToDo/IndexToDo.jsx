import { useState } from 'react';
import { useTaskContext } from '../../../context/TaskContext'; // ⬅️ Usa o contexto
import './StyleToDo.css';
import TrashIcon from '../../../assets/lixeira.png';
import EditIcon from '../../../assets/botao_de_editar.png';

function ToDo() {
    const { tasks, setTasks } = useTaskContext(); // ⬅️ Aqui pegamos as tarefas globais
    const [novaTarefa, setNovaTarefa] = useState('');
    const [editandoId, setEditandoId] = useState(null);

    const adicionarOuEditar = () => {
        if (!novaTarefa.trim()) return;

        if (editandoId) {
            const atualizado = tasks.map((tarefa) =>
                tarefa.id === editandoId ? { ...tarefa, titulo: novaTarefa } : tarefa
            );
            setTasks(atualizado);
            setEditandoId(null);
        } else {
            const nova = {
                id: Date.now(),
                titulo: novaTarefa,
                done: false,
            };
            setTasks([...tasks, nova]);
        }
        setNovaTarefa('');
    };

    const handleEditar = (id) => {
        const tarefa = tasks.find((t) => t.id === id);
        if (tarefa) {
            setNovaTarefa(tarefa.titulo);
            setEditandoId(id);
        }
    };

    const handleExcluir = (id) => {
        setTasks(tasks.filter((t) => t.id !== id));
    };

    const handleCheckbox = (id) => {
        const atualizado = tasks.map((tarefa) =>
            tarefa.id === id ? { ...tarefa, done: !tarefa.done } : tarefa
        );
        setTasks(atualizado);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        adicionarOuEditar();
    };

    return (
        <div className="ToDo">

            <div className='containerToDo'>


                <form className="formToDo" onSubmit={handleSubmit}>
                    <h1><strong>ToDo</strong></h1>
                    <input
                        type="text"
                        placeholder="Digite uma nova tarefa"
                        value={novaTarefa}
                        onChange={(e) => setNovaTarefa(e.target.value)}
                    />
                    <button className='buttCadastroToDo' type="submit">{editandoId ? 'Salvar' : '+ Add Tarefas'}</button>
                </form>

                <div className="listaDeTarefasToDo">
                    {tasks.map((tarefa) => (
                        <div className="tarefa" key={tarefa.id}>
                            <input
                                type="checkbox"
                                checked={tarefa.done}
                                onChange={() => handleCheckbox(tarefa.id)}
                            />
                            <span className={tarefa.done ? 'concluida' : ''}>{tarefa.titulo}</span>
                            <button onClick={() => handleEditar(tarefa.id)}>
                                <img src={EditIcon} alt="Editar" />
                            </button>
                            <button onClick={() => handleExcluir(tarefa.id)}>
                                <img src={TrashIcon} alt="Excluir" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>);
}

export default ToDo;
