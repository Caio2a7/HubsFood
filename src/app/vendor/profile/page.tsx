"use client";

import { useEffect, useState } from "react";
import { getUserById } from "@/services/users/userGET";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie"; // Usando js-cookie para manipulação de cookies
import Link from "next/link";
import Script from 'next/script';
import Head from 'next/head';
import '@/ui/assets/css/geral/style-header-footer.css';
import '@/ui/assets/css/geral/style-body.css';
import '@/ui/assets/css/paginas/styleperfilEstabelecimento.css';


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
      <div>
      <div className="header container">
    <div className="container">
        <div>
            <img src="/imagens/logoMenuSuperior.png" alt="" />
        </div>
    </div>
    <div className="user">
        <div className="menu-container">
            <img src="/imagens/userEstabelecimento.png" alt="Foto de Perfil" className="menu-trigger" />
            <div className="menu" id="menu">
                <a href="perfilEstabelecimento.html">Perfil</a>
                <a href="registrocardapioEstabelecimento.html">Cardápio</a>
                <a href="#item3">Pedidos</a>
                <a href="../../templates/areaNaoLogada/index.html">Sair</a>
            </div>
        </div>
        <span>Bob's</span>
    </div>
</div>

<main>
    <div className="containerEstabelecimento">
        <div><img src="/imagens/userEstabelecimento.png" alt="Foto de Perfil" /></div>
        <h2>Perfil do estabelecimento</h2>
        <div className="form-container">
            <form id="storeForm">
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="storeName">Nome da Loja</label>
                        <input type="text" id="storeName" placeholder="Ex: Loja ABC" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="responsibleName">Nome do Responsável</label>
                        <input type="text" id="responsibleName" placeholder="Ex: João Silva" />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Descrição</label>
                    <textarea id="description" placeholder="Breve descrição do estabelecimento"></textarea>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="hub">Hub Cadastrado</label>
                        <select id="hub">
                            <option value="">Selecione o hub</option>
                            <option value="midway">Midway Mall</option>
                            <option value="shopping">Shopping Center</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="storeType">Tipo de Estabelecimento</label>
                        <select id="storeType">
                            <option value="">Selecione o tipo</option>
                            <option value="restaurante">Restaurante</option>
                            <option value="lanchonete">Lanchonete</option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="storePhone">Telefone do Estabelecimento</label>
                        <input type="tel" id="storePhone" placeholder="(XX) XXXX-XXXX" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="responsiblePhone">Celular do Responsável</label>
                        <input type="tel" id="responsiblePhone" placeholder="(XX) 9XXXX-XXXX" />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="day">Dia</label>
                        <select id="day">
                            <option value="">Selecione</option>
                            <option value="segunda">Segunda-feira</option>
                            <option value="terca">Terça-feira</option>
                            <option value="quarta">Quarta-feira</option>
                            <option value="quinta">Quinta-feira</option>
                            <option value="sexta">Sexta-feira</option>
                            <option value="sabado">Sábado</option>
                            <option value="domingo">Domingo</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="openTime">Hora da Abertura</label>
                        <input type="time" id="openTime" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="closeTime">Hora do Fechamento</label>
                        <input type="time" id="closeTime" />
                    </div>
                    <div className="form-group">
                        <button type="button" id="addSchedule" className="add-btn">Adicionar</button>
                    </div>
                </div>
                <div id="scheduleList" className="horario-list"></div>
                <div>
                    <button type="submit" id="saveBtn" className="save-btn">Salvar Configurações</button>
                </div>
            </form>
            <div id="message" className="message"></div>
        </div>
    </div>
</main>

<div className="footer container">
    <div className="logo">
        <img src="/imagens/logoInferior.png" alt="Logo Inferior" />
    </div>
    <div className="container">
        <div>
            <ul>
                <li className="footer-header">Links:</li>
                <li><img src="/imagens/logoInstagram.png" alt="Instagram" /><a href="https://www.instagram.com/"><span>Instagram</span></a></li>
                <li><img src="/imagens/logoPinterest.png" alt="Pinterest" /><a href="https://br.pinterest.com/"><span>Pinterest</span></a></li>
            </ul>
        </div>
        <div>
            <ul>
                <li className="footer-header">Contatos:</li>
                <li><img src="/imagens/pinLocation.png" alt="Pin" /><span>3º piso do Instituto Metrópole Digital</span></li>
                <li><img src="/imagens/pinPhone.png" alt="Phone" /><span>(84) 9 8888-8888</span></li>
                <li><img src="/imagens/pinEmail.png" alt="Email" /><span>hubsfood@gmail.com</span></li>
                <li><img src="/imagens/pinHorario.png" alt="Horário" /><span>24h</span></li>
            </ul>
        </div>
    </div>
</div>

<div className="end">
    <span>Copyright @ 2024 All rights reserved</span>
</div>

      </div>
    </main>
  );
}
