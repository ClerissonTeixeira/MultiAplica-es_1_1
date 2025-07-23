import './StyleCadastro.css'

function IndexCadastro() {

  return (

    <div class="login-wrapper">
      <div class="login-container">
        <h2>Faça Seu Cadastro</h2>
        <form>
          <input className="input-nome" type="text" placeholder="Nome Completo" required /> 
          <input className="input-email" type="email" placeholder="Email" required />      
          <input className="input-passw" type="password" placeholder="Senha" required />    
                   
          <div className="button-group">
            <button className="butt-cadastro" type="submit">Registrar Novo Usuário</button>           
          </div>
        </form>
      </div>
    </div>
  )
}

export default IndexCadastro
