import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './StyleLogin.css';

function IndexLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const API_BASE_URL = 'https://api-todo-list-448o.onrender.com'; // Replace with your actual API base URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/login`, { // Assuming a /login endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Credenciais inválidas.');
      }

      const data = await response.json();
      // Assuming your API returns a token or user info
      console.log('Login successful:', data);
      // You would typically store the token in localStorage or context
      localStorage.setItem('userToken', data.token); // Example
  
        alert('Login realizado com sucesso!');
        navigate('/Usuario'); // Redirect to user dashboard
    

    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Erro ao fazer login. Por favor, verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  const handleCadastrarClick = () => {
    navigate('/CadastroNovoUsuario');
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Bem-vindo, Faça Seu Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="input-username"
            type="username"
            placeholder="Nome"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="input-password"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="button-group">
            <button className="butt-login" type="submit" disabled={loading} >
              {loading ? 'Entrando...' : 'Login'}
            </button>
            <button className="butt-cadastro" type="button" onClick={handleCadastrarClick}>
              Cadastrar
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default IndexLogin;