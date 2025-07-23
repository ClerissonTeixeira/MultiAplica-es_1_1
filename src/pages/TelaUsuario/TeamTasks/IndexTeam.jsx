import './StyleTeam.css';
import { useTaskContext } from '../../../context/TaskContext';

function Team() {
  const { tasks } = useTaskContext();

  const total = tasks.length;
  const concluidas = tasks.filter(t => t.done).length;
  const porcentagem = total === 0 ? 0 : Math.round((concluidas / total) * 100);

  return (
    <div className='team-container'>
      <div className='perfil'>
        <h2>Perfil</h2>
        <img className="avatar" src="https://i.pravatar.cc/100" alt="avatar" />
        <p>Bem-vindo, <strong>Usuário</strong></p>
      </div>

      <div className='dashboard'>
        <h3>Dashboard - Progresso</h3>
        <div className='life-bar'>
          <div className='life-fill' style={{ width: `${porcentagem}%` }}>
            {porcentagem}%
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;
