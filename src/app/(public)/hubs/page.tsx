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
import Header from "@/ui/components/Header";
import Footer from "@/ui/components/Footer";
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
<Header />

<div className="main">
            <div className="empty" style={{marginBottom: '140px'}}></div>
            <div className="body-about">
              <div>
                <h4>Sobre os Hubs...</h4>
                <h2>Locais para centralizar</h2>
                <p>
                  O HubsFood centraliza os cardápios de praças de alimentação, permitindo que os
                  clientes acessem menus e façam pedidos com facilidade, enquanto os restaurantes
                  gerenciam tudo de forma simples e eficiente.
                </p>
              </div>
              <div>
                <img src="/imagens/sobreNosDescricao.png" alt="3 imagens de restaurantes" />
              </div>
            </div>
            {/* Modais */}
            <div id="modal" className="modal" style={{ display: "none" }}>
              <div className="modal-content">
                <span className="close-btn">&times;</span>
                <h2>Entrar na conta</h2>
                <input type="text" placeholder="Email" />
                <input type="password" placeholder="Senha" />
                <div className="lembrar-me">
                  <input type="checkbox" id="lembrar-me" />
                  <label htmlFor="lembrar-me">Lembrar-me</label>
                </div>
                <button type="button" id="entrar">
                  <a id="link-entrar" href="indexLogado.html">Entrar</a>
                </button>
                <h3 id="senhaEsquecida">
                  <a href="...">Esqueceu a senha?</a>
                </h3>
                <hr />
                <button id="criarConta">Criar Nova conta</button>
              </div>
            </div>
            {/* Carousel */}
            <div style={{margin: '50px'}}>
              <Carousel hubs={teste}/>  
            </div>
          </div>

<Footer/>

      </div>
    </main>
  );
}
