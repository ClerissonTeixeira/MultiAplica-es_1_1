import './StyleLogin.css'

function IndexLogin() {

  return (

    <div class="login-wrapper">
      <div class="login-container">
        <h2>Bem Vindos Faça Seu Login</h2>
        <form>
          <input className="input-email" type="email" placeholder="Email" required />
          <input className="input-passw" type="password" placeholder="Senha" required />
          <div className="button-group">
            <button className="butt-login" type="submit">Login</button>
            <button className="butt-cadastro" type="button">Cadastrar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default IndexLogin