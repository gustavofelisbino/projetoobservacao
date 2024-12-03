import React, { useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader'; 
import isTokenExpired from '../../api'
import { useLogin } from '../../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

  const { handleLogin, username, setUsername, password, setPassword, code, setCode, error, loading } = useLogin();

  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('X-AUTH-TOKEN');
    if (token && !isTokenExpired(token)) {
      navigate('/pesquisa');
    }
  }, [navigate]);


  return (
    <body>
      <div className='container-login'>
        <section>
        <h1 className='login'>Login</h1>
        <form onSubmit={handleLogin}>
          <input className='email' 
            type="email" 
            placeholder="Email" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <input className='senha'
            type="password" 
            placeholder="Senha" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <input className='codigo'
            type="text" 
            placeholder="Código" 
            value={code} 
            onChange={(e) => setCode(e.target.value)} 
          />
          <button type="submit" className='inicio'>
            {loading ? <ClipLoader size={15} color="#fff" /> : 'Entrar'}
          </button>
        </form>
        {error && <p className='error'>{error}</p>}
        </section>
      </div>
  </body>
  );
};

export default LoginPage;