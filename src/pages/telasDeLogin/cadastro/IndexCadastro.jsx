import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './StyleCadastro.css';

function IndexCadastro() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
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
      const response = await fetch(`${API_BASE_URL}/register`, { // Assuming a /register endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao registrar usuário.');
      }

      // Assuming successful registration, you might want to redirect to login
      alert('Usuário registrado com sucesso!');
      navigate('/'); // Redirect to login page

    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Ocorreu um erro ao tentar registrar. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Faça Seu Cadastro</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="input-nome"
            type="text"
            placeholder="Nome Completo"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="input-email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="input-passw"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="button-group">
            <button className="butt-cadastro" type="submit" disabled={loading}>
              {loading ? 'Registrando...' : 'Registrar Novo Usuário'}
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default IndexCadastro;