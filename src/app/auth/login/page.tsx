// src/app/auth/login/page.tsx

'use client'; // Direitiva que marca o componente como "cliente"

import React, { useState } from 'react';
import { login } from '../../../services/auth/login'; // Caminho correto para o login.ts
import Cookies from 'js-cookie'; // Importa o pacote js-cookie

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    const generatedToken = await login(email, password);
    if (generatedToken) {
      setToken(generatedToken);

      // Armazena o token no cookie (com uma expiração de 1 hora, por exemplo)
      Cookies.set('token', generatedToken, { expires: 1 / 24 }); // expires: 1/24 = 1 hora

      // Se preferir, pode também definir o caminho e outras opções:
      // Cookies.set('token', generatedToken, { expires: 1 / 24, path: '/' });
    } else {
      setError('Credenciais inválidas.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {token && <p>Token gerado: {token}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Page;
