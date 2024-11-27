"use client";

import React, { useState } from 'react';
import { login } from '../../../services/auth/login'; // Caminho correto para o login.ts
import Cookies from 'js-cookie'; // Importa o pacote js-cookie

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleLogin = async () => {
    const generatedToken = await login(email, password);
    if (generatedToken) {
      setToken(generatedToken);
      Cookies.set('token', generatedToken, { expires: 1 / 24 }); // expires: 1/24 = 1 hora
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 5000); // Esconde o popup após 5 segundos
    } else {
      setError('Credenciais inválidas.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#FF7A55] to-[#FFDED5] p-8">
      <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-[#FF3700] mb-6 text-center">Login</h1>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-[#FF3700] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7A55] text-base"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-[#FF3700] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7A55] text-base"
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center text-sm">
            <input type="checkbox" className="mr-2" /> Lembrar-me
          </label>
          <a href="#" className="text-[#FF3700] text-sm font-semibold hover:underline">Esqueceu a senha?</a>
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-[#FF3700] text-white font-semibold py-3 rounded-lg hover:bg-[#FF7A55] transition duration-300 ease-in-out"
        >
          Login
        </button>
        <hr className="my-6 border-t border-[#FF3700]" />
        <a
          href="/auth/register"
          className="block w-full text-center bg-[#FF7A55] text-white py-3 rounded-lg font-semibold hover:bg-[#FF3700] transition"
        >
          Cadastrar-se
        </a>
        {error && <p className="mt-4 text-center text-red-600">{error}</p>}
      </div>
      {showPopup && (
        <div className="fixed bottom-4 right-4 bg-[#327a10] text-white p-4 rounded-lg shadow-lg">
          <p className="font-semibold">Token gerado com sucesso!</p>
        </div>
      )}
    </div>
  );
};

export default Page;
