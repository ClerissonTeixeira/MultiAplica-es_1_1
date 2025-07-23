import { useState } from 'react';
import './StyleNote.css';
import TrashExclui from '../../../assets/lixeira.png';
import TrashEdit from '../../../assets/botao_de_editar.png';

function Notes() {
    const [users, setUsers] = useState([

    ]);
    const [novaTarefa, setNovaTarefa] = useState('');

    const [editandoId, setEditandoId] = useState(null);

    const adicionarOuEditarTarefa = () => {
        if (novaTarefa.trim() === '') return;

        if (editandoId) {
            // Modo edição
            const listaAtualizada = users.map(user =>
                user.id === editandoId ? { ...user, tarefa: novaTarefa } : user
            );
            setUsers(listaAtualizada);
            setEditandoId(null); // sai do modo edição
        } else {
            // Modo adicionar
            const idsNumericos = users.map(u => parseInt(u.id));
            const proximoId = (idsNumericos.length ? Math.max(...idsNumericos) : 0) + 1;

            const agora = new Date();
            const dataFormatada = agora.toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });

            const nova = {
                id: proximoId.toString().padStart(2, '0'),
                tarefa: novaTarefa,
                data: dataFormatada,
            };

            setUsers([...users, nova]);
        }

        setNovaTarefa(''); // limpa o input
    };

    const handleEdit = (id) => {
        const tarefaParaEditar = users.find(user => user.id === id);
        if (tarefaParaEditar) {
            setNovaTarefa(tarefaParaEditar.tarefa);
            setEditandoId(id);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // impede recarregar a página
        adicionarOuEditarTarefa();
    };

    const handleDelete = (id) => {
        setUsers(users.filter(u => u.id !== id));
    };

    return (
        <div className='Notes'>
            <div className='containerNotes'>

                <form className='formNotes' onSubmit={handleSubmit}>
                    <h1>Note</h1>
                    <input
                        name='tarefa'
                        type='text'
                        placeholder="Digite uma nova Nota"
                        value={novaTarefa}
                        onChange={(e) => setNovaTarefa(e.target.value)}
                    />
                    <button
                        className='buttCadastroNotes'
                        type='submit'
                    >
                        {editandoId ? 'Salvar' : '+ Add Notas'}
                    </button>
                </form>

                <div className="listaDeTarefasNote">
                    {users.map(user => (
                        <div key={user.id} className="usercardNotes">
                            <div>
                                <p><strong>Id da Nota:</strong> {user.id}</p>
                                <p><strong>Nota:</strong> {user.tarefa}</p>
                                <p><strong>Adicionado em:</strong> {user.data}</p>
                            </div>
                            <button className='butExcluir' onClick={() => handleDelete(user.id)}>
                                <img src={TrashExclui} className="trash-icon" alt="Excluir tarefa" />
                            </button>
                            <button className='butEdit' onClick={() => handleEdit(user.id)}>
                                <img src={TrashEdit} className="trash-icon" alt="Editar tarefa" />
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default Notes;