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
import '@/ui/assets/css/paginas/styleperfilCliente.css';

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
        <div>
            <ul>
                <li><a href="../indexLogado.html">Início</a></li>
                <li><a href="../hubsLogado.html">Hubs</a></li>
                <li><a href="../sobreLogado.html">Sobre</a></li>
                <li><a href="../contatosLogado.html">Contatos</a></li>
            </ul>
        </div>
    </div>
    <div className="user">
        <div className="loginIcons"><a href="#item2"><img src="/imagens/iconAlarm.png" alt="Notificações" /></a></div>
        <div className="loginIcons"><a href="carrinho.html"><img src="/imagens/iconCarrinho.png" alt="Carrinho" /></a></div>
        <div className="menu-container">
            <img src="/imagens/photoUser.png" alt="Foto de Perfil" className="menu-trigger" />
            <div className="menu" id="menu">
                <a href="../configuracoesCliente/perfilCliente.html">Perfil</a>
                <a href="../configuracoesCliente/pedidosCliente.html">Meus pedidos</a>
                <a href="../../areaNaoLogada/index.html">Sair</a>
            </div>
        </div>
        <span>João Domingus</span>
    </div>
</div>

<main>
    <div className="empty"></div>
    <div className="informacoesPessoais">
        <div className="fotoPerfil">
            <img src="/imagens/time.png" alt="" />
        </div>
        <div className="dadosMeio">
            <h2 id="nomeUsuario">Ana Paula Oliveira de Lima</h2>
            <p id="emailUsuario"><img src="/imagens/pinEmail.png" alt="" />anapaulalima@gmail.com</p>
            <p id="enderecoUsuario"><img src="/imagens/pinLocation.png" width="25px" alt="" />Natal, RN</p>
        </div>
        <div className="dadosEsquerda">
            <img id="editorDadosPessoais" src="/imagens/icon_editar.png" alt="" />
            <p id="telefoneUsuario"><img src="/imagens/pinPhone.png" alt="" />84 99619-0041</p>
            <p id="dataEntrada"><img src="/imagens/icon_calendario.png" width="20px" alt="" />Desde 2024</p>
        </div>
    </div>
    <div className="areaCartao">
        <h2>Cadastrar Cartão de Crédito</h2>
        <form>
            <div className="conteinerCadastrarCartao">
                <h3><img src="/imagens/pincartao.png" alt="" /> Cartão de Crédito</h3>
                <input type="text" placeholder="NOME ESCRITO NO CARTÃO" />
                <input type="text" placeholder="NÚMERO DO CARTÃO" />
                <div className="input-container">
                    <input type="text" placeholder="CVV" />
                    <input type="text" placeholder="EXPIRA EM:" />
                </div>
                <button>Salvar Detalhes</button>
            </div>
        </form>
    </div>
    <div className="empty"></div>
</main>

<div className="footer container">
    <div className="logo">
        <img src="/imagens/logoInferior.png" alt="" />
    </div>
    <div className="container">
        <div>
            <ul>
                <li className="footer-header">Links:</li>
                <li><img src="/imagens/logoInstagram.png" alt="" /><a href="https://www.instagram.com/"><span>Instagram</span></a></li>
                <li><img src="/imagens/logoPinterest.png" alt="" /><a href="https://br.pinterest.com/"><span>Pinterest</span></a></li>
            </ul>
        </div>
        <div>
            <ul>
                <li className="footer-header">Contatos:</li>
                <li><img src="/imagens/pinLocation.png" alt="" /><span>3º piso do Instituto Metrópole Digital</span></li>
                <li><img src="/imagens/pinPhone.png" alt="" /><span>(84) 9 8888-8888</span></li>
                <li><img src="/imagens/pinEmail.png" alt="" /><span>hubsfood@gmail.com</span></li>
                <li><img src="/imagens/pinHorario.png" alt="" /><span>24h</span></li>
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
