import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

function formatarData(iso) {
  if (!iso) return '';
  const [ano, mes, dia] = iso.split('-');
  if (!ano || !mes || !dia) return iso;
  return `${dia}/${mes}/${ano}`;
}

function Principal() {
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (usuario) => {
      if (!usuario) {
        navigate('/login');
        return;
      }

      try {
        const snapshot = await getDoc(doc(db, 'usuarios', usuario.uid));
        if (snapshot.exists()) {
          setDados(snapshot.data());
        } else {
          setErro('Dados do usuário não encontrados no Firestore.');
        }
      } catch (falha) {
        setErro('Erro ao carregar os dados do usuário.');
      } finally {
        setCarregando(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSair = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div className="page">
      <div className="card">
        <h1>Principal</h1>

        {carregando && <p>Carregando...</p>}

        {!carregando && erro && <p className="msg-erro">{erro}</p>}

        {!carregando && dados && (
          <>
            <p>Bem-vindo(a)!</p>
            <ul className="dados-usuario">
              <li><strong>Nome:</strong> {dados.nome}</li>
              <li><strong>Sobrenome:</strong> {dados.sobrenome}</li>
              <li><strong>Data de nascimento:</strong> {formatarData(dados.dataNascimento)}</li>
            </ul>
          </>
        )}

        <button type="button" onClick={handleSair}>Sair</button>
      </div>
    </div>
  );
}

export default Principal;
