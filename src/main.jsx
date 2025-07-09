import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import IndexHome from './pages/home/IndexHome'
import IndexToDo from './pages/ToDo/IndexToDo'
import IndexNote from './pages/note/IndexNote'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="layout">
      <IndexToDo />
      <IndexNote />
    </div>
  </StrictMode>
)