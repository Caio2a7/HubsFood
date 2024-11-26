// src/app/(public)/hubs/page.tsx
import { Hub } from "@/ui/types/hub";
import { getHubs } from "@/ui/utils/hubsFetcher";
import Link from "next/link";
import React from "react";
import Carousel from "@/ui/components/Carousel";
import Script from 'next/script';
import Head from 'next/head';
import '@/ui/assets/css/geral/style-header-footer.css';
import '@/ui/assets/css/geral/style-body.css';
import '@/ui/assets/css/componentes/style-carousel.css';
// Gerando os parâmetros estáticos (SSG) com os IDs dos hubs
export const generateStaticParams = async () => {
  const hubs = await getHubs(); // Obtemos todos os hubs
  return hubs.map((hub) => ({ id: hub.id.toString() })); // Gerando os parâmetros necessários para cada hub
};

// Página de exibição dos hubs
export default async function HubsPage() {
  const hubs: Hub[] = await getHubs(); // Pegamos os hubs
  const teste = [
    { name: "Midway Mall", imagePath: "/imagens/icon_midway.png" },
    { name: "Natal Shopping", imagePath: "/imagens/icon_natalShopping.png" },
    { name: "Partage Norte Shopping", imagePath: "/imagens/icon_partage.png" },
    { name: "Praia Shopping", imagePath: "/imagens/icon_praiaShopping.png" },
    { name: "Hub Extra", imagePath: "/imagens/icon_midway.png" },
    { name: "Hub Novo", imagePath: "/imagens/icon_natalShopping.png" },
    { name: "Outro Hub", imagePath: "/imagens/icon_partage.png" },
    { name: "Mais Hubs", imagePath: "/imagens/icon_praiaShopping.png" },
  ];
  return (
    <main>
      <h1>Hubs</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {hubs.map((hub) => (
          <Link key={hub.id} href={`/hubs/${hub.id}`} style={{ textDecoration: 'none', color: 'black', margin: '10px' }}>
            <div
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '20px',
                width: '200px',
                cursor: 'pointer',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h2>{hub.name}</h2>
              <p>{`${hub.location.street}, ${hub.location.city}, ${hub.location.state}, CEP: ${hub.location.zipCode}`}</p>
            </div>
          </Link>
        ))}
      </div>
      <div>
      <div className="header container">

<div className="container">
    <div>
        <img src="../../imagens/logoMenuSuperior.png" alt="" />
    </div>
    <div>
        <ul>
            <li><a href="indexLogado.html">Início</a></li>
            <li><a href="hubsLogado.html">Hubs</a></li>
            <li><a href="sobreLogado.html">Sobre</a></li>
            <li><a href="contatosLogado.html">Contatos</a></li>
        </ul>
    </div>
</div>

<div className="user">
    <div className="loginIcons"><a href="#item2"><img src="../../imagens/iconAlarm.png" alt="Notificações" /></a></div>
    <div className="loginIcons"><a href="carrinho.html"><img src="../../imagens/iconCarrinho.png" alt="Carrinho" /></a></div>
    <div className="menu-container">
        <img src="../../imagens/photoUser.png" alt="Foto de Perfil" className="menu-trigger" />
        <div className="menu" id="menu">
            <a href="configuracoesCliente/perfilCliente.html">Perfil</a>
            <a href="configuracoesCliente/pedidosCliente.html">Meus pedidos</a>
            <a href="../areaNaoLogada/index.html">Sair</a>
        </div>
    </div>
    <span>João Domingus</span>
</div>

</div>

<div className="main">

<div className="empty"></div>

<div>
      <Carousel hubs={teste} />
    </div>

{/* Repita a estrutura das carousels aqui, aplicando as mesmas mudanças */}

</div>

<div className="footer container">
<div className="logo">
    <img src="imagens/logoInferior.png" alt="" />
</div>
<div className="container">
    <div>
        <ul>
            <li className="footer-header">Links:</li>
            <li><img src="../../imagens/logoInstagram.png" alt="" /><a href="https://www.instagram.com/"><span>Instagram</span></a></li>
            <li><img src="../../imagens/logoPinterest.png" alt="" /><a href="https://br.pinterest.com/"><span>Pinterest</span></a></li>
        </ul>
    </div>
    <div>
        <ul>
            <li className="footer-header">Contatos:</li>
            <li><img src="../../imagens/pinLocation.png" alt="" /><span>3º piso do Instituto Metrópole Digital</span></li>
            <li><img src="../../imagens/pinPhone.png" alt="" /><span>(84) 9 8888-8888</span></li>
            <li><img src="../../imagens/pinEmail.png" alt="" /><span>hubsfood@gmail.com</span></li>
            <li><img src="../../imagens/pinHorario.png" alt="" /><span>24h</span></li>
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
