"use client";

import { useEffect, useState } from "react";
import { getUserById } from "@/services/users/userGET";
import { updateUser } from "@/services/users/userPUT";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import Header from "@/ui/components/Header";
import Footer from "@/ui/components/Footer";

export default function ProfilePage() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editingProfile, setEditingProfile] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [cardInfo, setCardInfo] = useState({
    nameOnCard: "",
    cardNumber: "",
    cvv: "",
    expirationDate: "",
  });

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

        // Defina os valores padrão ao carregar o usuário
        setUsername(userData.username || "");
        setEmail(userData.email || "");
        setCardInfo(userData.cardInfo || {
          nameOnCard: "",
          cardNumber: "",
          cvv: "",
          expirationDate: "",
        });
      } catch (err) {
        setError("Erro ao buscar os dados do usuário.");
      } finally {
        setLoading(false);
      }
    };

    fetchClientId();
  }, []);

  const handleSaveProfile = async () => {
    if (!user) return;
    try {
      const updatedUser = await updateUser(user.id, { username, email });
      setUser(updatedUser);
      setEditingProfile(false);
    } catch (err) {
      alert("Erro ao atualizar o perfil.");
    }
  };

  const handleSaveCardInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      const updatedUser = await updateUser(user.id, { cardInfo });
      setUser(updatedUser);
      alert("Informações do cartão salvas com sucesso!");
    } catch (err) {
      alert("Erro ao salvar informações do cartão.");
    }
  };

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
  <div>
    {/* Imagem do Usuário */}
    <img
      src={user.imagePath || "/imagens/photoUser.png"}
      alt="Foto do Usuário"
      className="w-24 h-24 rounded-full border-4 border-[#FF7A55] shadow-md"
    />
  </div>
  <div className="flex-1">
    {editingProfile ? (
      <>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Nome de Usuário</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#FF7A55] focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#FF7A55] focus:outline-none"
          />
        </div>
        <button
          onClick={handleSaveProfile}
          className="bg-[#FF7A55] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#ff4f4f] transition"
        >
          Salvar
        </button>
      </>
    ) : (
      <>
        {/* Nome e Email */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{user.username}</h2>
        <p className="text-lg text-gray-600">
          <strong>Email:</strong> {user.email}
        </p>
        {/* Role */}
        <p className="text-lg text-gray-600">
          <strong>Role:</strong> {user.role || "N/A"}
        </p>
        <button
          onClick={() => setEditingProfile(true)}
          className="bg-[#FF7A55] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#ff4f4f] transition"
        >
          Editar Informações
        </button>
      </>
    )}
  </div>
</div>


        {/* Formulário de Cadastro de Cartão */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-[#FF7A55] mb-4">Cadastrar Cartão de Crédito</h2>
          <form onSubmit={handleSaveCardInfo} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nome no Cartão</label>
              <input
                type="text"
                value={cardInfo.nameOnCard || ""}
                onChange={(e) => setCardInfo({ ...cardInfo, nameOnCard: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#FF7A55] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Número do Cartão</label>
              <input
                type="text"
                value={cardInfo.cardNumber || ""}
                onChange={(e) => setCardInfo({ ...cardInfo, cardNumber: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#FF7A55] focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">CVV</label>
                <input
                  type="text"
                  value={cardInfo.cvv || ""}
                  onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#FF7A55] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Data de Expiração</label>
                <input
                  type="text"
                  value={cardInfo.expirationDate || ""}
                  onChange={(e) => setCardInfo({ ...cardInfo, expirationDate: e.target.value })}
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
