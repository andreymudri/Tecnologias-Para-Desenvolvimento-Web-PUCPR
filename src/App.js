import { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginState, setLoginState] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginState(username === 'eduardo.lino@pucpr.br' && password === '123456');
  }
  return (
    <div className="App">
      <header className="App-header">
        <div>
          Login
        </div>
        <form>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
          <button type="submit" onClick={handleSubmit}>Login</button>
           {loginState === null && <div></div> }
          {loginState === true && <div>Acessado com sucesso!</div> }
           {loginState === false && <div>Usuário ou senha incorretos!</div> }
        </form>
      </header>
    </div>
  );
}

export default App;
