import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);
    setCarregando(true);

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate('/principal');
    } catch (falha) {
      const codigosNaoCadastrado = [
        'auth/user-not-found',
        'auth/wrong-password',
        'auth/invalid-credential',
        'auth/invalid-login-credentials',
      ];
      if (codigosNaoCadastrado.includes(falha.code)) {
        setErro('Usuário não está cadastrado.');
      } else if (falha.code === 'auth/invalid-email') {
        setErro('E-mail inválido.');
      } else {
        setErro('Não foi possível acessar. Tente novamente.');
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="page">
      <form className="card" onSubmit={handleSubmit}>
        <h1>Login</h1>

        <label>
          E-mail
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Senha
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </label>

        <button type="submit" disabled={carregando}>
          {carregando ? 'Acessando...' : 'Acessar'}
        </button>

        <button
          type="button"
          onClick={() => navigate('/cadastro')}
          disabled={carregando}
        >
          Registrar
        </button>

        {erro && <p className="msg-erro">{erro}</p>}
      </form>
    </div>
  );
}

export default Login;
