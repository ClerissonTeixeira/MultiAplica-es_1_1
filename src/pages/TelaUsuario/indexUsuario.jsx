import Note from './note/IndexNote'
import Tudo from './ToDo/IndexToDo'
import Team from './TeamTasks/IndexTeam'
import './Style.Usuario.css'



function Usuario() {
    return (
        <div className="usuario-container">
            <Tudo />
            <Note />
            <Team />
        </div>

    )
}

export default Usuario