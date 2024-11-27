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
      // Redireciona para a página de login após o registro
      window.location.href = '/auth/login'; // Ou use um router para navegação
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#FFDED5] to-[#FF7A55] min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md mx-auto bg-[#FFF5F0] p-8 rounded-lg shadow-lg mt-12">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#FF3700]">Cadastro de Usuário</h2>
        <form onSubmit={handleRegister} className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label className="text-[#FF3700] font-semibold mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-2 border border-[#FF7A55] rounded-lg focus:outline-none focus:border-[#FF3700]"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[#FF3700] font-semibold mb-2">Senha:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-2 border border-[#FF7A55] rounded-lg focus:outline-none focus:border-[#FF3700]"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[#FF3700] font-semibold mb-2">Função:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="p-2 border border-[#FF7A55] rounded-lg focus:outline-none focus:border-[#FF3700]"
            >
              <option value="client">Cliente</option>
              <option value="vendor">Estabelecimento</option>
            </select>
          </div>
          <button type="submit" className="bg-[#FF3700] text-white font-semibold py-2 rounded-lg hover:bg-[#FF7A55] transition">
            Registrar
          </button>
        </form>
        {message && (
          <p className="text-center mt-4 text-[#FF3700] font-bold">{message}</p>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
