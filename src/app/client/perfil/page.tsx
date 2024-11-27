"use client";

import { useEffect, useState } from "react";
import { getUserById } from "@/services/users/userGET";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import Header from "@/ui/components/Header";
import Footer from "@/ui/components/Footer";

export default function ProfilePage() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientId = () => {
      const token = Cookies.get("token");

      if (!token) {
        setError("Token não encontrado nos cookies.");
        setLoading(false);
        return;
      }

      try {
        const decoded: any = jwt.decode(token);

        if (decoded?.id) {
          fetchUserDetails(decoded.id);
        } else {
          setError("Token inválido ou malformado.");
        }
      } catch (err) {
        setError("Erro ao decodificar o token.");
      } finally {
        setLoading(false);
      }
    };

    const fetchUserDetails = async (userId: string) => {
      try {
        const userData = await getUserById(userId);
        setUser(userData);
      } catch (err) {
        setError("Erro ao buscar os dados do usuário.");
      } finally {
        setLoading(false);
      }
    };

    fetchClientId();
  }, []);

  if (loading) {
    return <div className="text-center mt-20 text-lg font-semibold">Carregando perfil...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-lg text-red-500">{error}</div>;
  }

  if (!user) {
    return <div className="text-center mt-20 text-lg font-semibold">Usuário não encontrado.</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto py-10 px-6 mb-20">
        <h1 className="text-4xl font-bold text-[#FF7A55] mb-8 text-center">Perfil do Usuário</h1>

        {/* Card de Informações do Usuário */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8 flex flex-col md:flex-row items-center gap-6">
          <img
            src={user.imagePath || "/imagens/photoUser.png"}
            alt="Foto do Usuário"
            className="w-24 h-24 rounded-full border-4 border-[#FF7A55] shadow-md"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{user.username}</h2>
            <p className="text-lg text-gray-600">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Endereço:</strong> Natal, RN
            </p>
            <p className="text-lg text-gray-600">
              <strong>Telefone:</strong> (84) 99619-0041
            </p>
            <p className="text-lg text-gray-600">
              <strong>Membro desde:</strong> 2024
            </p>
          </div>
          <button className="bg-[#FF7A55] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#ff4f4f] transition">
            Editar Informações
          </button>
        </div>

        {/* Formulário de Cadastro de Cartão */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-[#FF7A55] mb-4">Cadastrar Cartão de Crédito</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Nome no Cartão
              </label>
              <input
                type="text"
                placeholder="Nome completo"
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#FF7A55] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Número do Cartão
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#FF7A55] focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#FF7A55] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Data de Expiração
                </label>
                <input
                  type="text"
                  placeholder="MM/AA"
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#FF7A55] focus:outline-none"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-[#FF7A55] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#ff4f4f] transition"
            >
              Salvar Detalhes
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
