// src/app/auth/register/page.tsx
'use client';

import React, { useState } from 'react';
import { register } from '../../../services/auth/register'; // Caminho correto para o register.ts

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [message, setMessage] = useState('');

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const { success, message } = await register(email, password, role);
    setMessage(message);
    if (success) {
      // Aqui você pode redirecionar para a página de login, por exemplo:
      window.location.href = '/auth/login'; // Ou use um router para navegação
    }
  };

  return (
    <div>
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Função:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="client">Cliente</option>
            <option value="vendor">Estabelecimento</option>
          </select>
        </div>
        <button type="submit">Registrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterPage;
