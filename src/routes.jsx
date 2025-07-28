import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from './pages/telasDeLogin/login/IndexLogin'
import Usuari from './pages/TelaUsuario/indexUsuario' // Assuming this is your dashboard for logged-in users
import CadastroNovoUsuari from './pages/telasDeLogin/cadastro/IndexCadastro'

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}></Route>
                <Route path="/Usuario" element={<Usuari/>}></Route>
                <Route path="/CadastroNovoUsuario" element={<CadastroNovoUsuari/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes