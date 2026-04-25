import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

function Cadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [mensagem, setMensagem] = useState(null);
  const [carregando, setCarregando] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem(null);
    setCarregando(true);

    try {
      const credenciais = await createUserWithEmailAndPassword(auth, email, senha);
      const { uid } = credenciais.user;

      await setDoc(doc(db, 'usuarios', uid), {
        uid,
        email,
        nome,
        sobrenome,
        dataNascimento,
        criadoEm: new Date().toISOString(),
      });

      setMensagem({ tipo: 'sucesso', texto: 'Usuário cadastrado com sucesso!' });
      setTimeout(() => navigate('/login'), 1500);
    } catch (erro) {
      let texto = 'Erro ao cadastrar usuário.';
      if (erro.code === 'auth/email-already-in-use') texto = 'E-mail já cadastrado.';
      else if (erro.code === 'auth/invalid-email') texto = 'E-mail inválido.';
      else if (erro.code === 'auth/weak-password') texto = 'A senha deve ter pelo menos 6 caracteres.';
      setMensagem({ tipo: 'erro', texto });
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="page">
      <form className="card" onSubmit={handleSubmit}>
        <h1>Cadastro</h1>

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
            minLength={6}
          />
        </label>

        <label>
          Nome
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </label>

        <label>
          Sobrenome
          <input
            type="text"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
            required
          />
        </label>

        <label>
          Data de nascimento
          <input
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            required
          />
        </label>

        <button type="submit" disabled={carregando}>
          {carregando ? 'Cadastrando...' : 'Cadastrar'}
        </button>

        {mensagem && (
          <p className={mensagem.tipo === 'erro' ? 'msg-erro' : 'msg-sucesso'}>
            {mensagem.texto}
          </p>
        )}

        <p className="link-secundario">
          Já possui conta? <Link to="/login">Entrar</Link>
        </p>
      </form>
    </div>
  );
}

export default Cadastro;
