"use client";

import { useEffect, useState } from "react";
import { getUserById } from "@/services/users/userGET";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie"; // Usando js-cookie para manipulação de cookies

export default function ProfilePage() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientId = () => {
      // Verificar todos os cookies armazenados
      const allCookies = Cookies.get();
      console.log("Todos os cookies:", allCookies); // Verificando todos os cookies

      const token = Cookies.get("token");
      console.log("Token encontrado:", token); // Verificando o token específico

      if (!token) {
        setError("Token não encontrado nos cookies.");
        setLoading(false);
        return;
      }

      try {
        const decoded: any = jwt.decode(token); // Decodificar sem validar
        console.log("Token decodificado:", decoded); // Verificando a decodificação

        if (decoded?.id) {
          // Usar `id` do token para pegar o usuário
          fetchUserDetails(decoded.id); // Chama a função para buscar o usuário
        } else {
          setError("Token inválido ou malformado.");
        }
      } catch (err) {
        console.error("Erro ao decodificar o token:", err);
        setError("Erro ao decodificar o token.");
      } finally {
        setLoading(false);
      }
    };

    const fetchUserDetails = async (userId: string) => {
      try {
        console.log("Buscando dados do usuário:", userId); // Log para verificar o id
        const userData = await getUserById(userId);
        setUser(userData); // Armazenando os dados do usuário
      } catch (err) {
        console.error("Erro ao buscar dados do usuário:", err);
        setError("Erro ao buscar os dados do usuário.");
      }
    };

    fetchClientId();
  }, []);

  if (loading) {
    return <div>Carregando perfil...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Usuário não encontrado.</div>;
  }

  return (
    <main>
      <h1>Perfil do Usuário</h1>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Nome de Usuário:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Função:</strong> {user.role}</p>
      {/* Não exibindo a senha por questões de segurança */}
    </main>
  );
}
