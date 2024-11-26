import Head from 'next/head';
import '@/ui/assets/css/geral/style-header-footer.css';
import '@/ui/assets/css/geral/style-body.css';
import '@/ui/assets/css/componentes/style-carousel.css';
import '@/ui/assets/css/geral/style-modal.css';
import React from "react";
import BigCarousel from "@/ui/components/BigCarousel";

export default function HomePage() {
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
    <>
      <Head>
        <title>HubsFood</title>
      </Head>
        <div>
          <div className="header container">
            <div className="container">
              <div>
                <img src="/imagens/logoMenuSuperior.png" alt="Logo HubsFood" />
              </div>
              <div>
                <ul>
                  <li><a href="index.html">Início</a></li>
                  <li><a href="hubs.html">Hubs</a></li>
                  <li><a href="sobre.html">Sobre</a></li>
                  <li><a href="contatos.html">Contatos</a></li>
                </ul>
              </div>
            </div>
            <div className="user">
              <button id="loginBtn">Logar</button>
              <img src="/imagens/User.png" alt="Foto de Perfil" />
            </div>
          </div>
          <div className="main">
            <div className="empty"></div>
            <div className="body-search">
              <div>
                <img src="/imagens/pinLocation.png" alt="Pin de localização" />
                <span>Pesquise o seu hub aqui!</span>
              </div>
              <div>
                <input type="search" />
              </div>
              <div>
                <button>Buscar</button>
              </div>
            </div>
            <div className="body-about">
              <div>
                <img src="/imagens/sobreNosDescricao.png" alt="3 imagens de restaurantes" />
              </div>
              <div>
                <h4>Sobre nós...</h4>
                <h2>O Seu Centralizador de Cardápios</h2>
                <p>
                  O HubsFood centraliza os cardápios de praças de alimentação, permitindo que os
                  clientes acessem menus e façam pedidos com facilidade, enquanto os restaurantes
                  gerenciam tudo de forma simples e eficiente.
                </p>
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
              <BigCarousel hubs={teste}/>  
            </div>
          </div>
          <div className="footer container">
            <div className="logo">
              <img src="/imagens/logoInferior.png" alt="Logo Inferior" />
            </div>
            <div className="container">
              <div>
                <ul>
                  <li className="footer-header">Links:</li>
                  <li>
                    <img src="/imagens/logoInstagram.png" alt="Instagram" />
                    <a href="https://www.instagram.com/"><span>Instagram</span></a>
                  </li>
                  <li>
                    <img src="/imagens/logoPinterest.png" alt="Pinterest" />
                    <a href="https://br.pinterest.com/"><span>Pinterest</span></a>
                  </li>
                </ul>
              </div>
              <div>
                <ul>
                  <li className="footer-header">Contatos:</li>
                  <li>
                    <img src="/imagens/pinLocation.png" alt="Localização" />
                    <span>3º piso do Instituto Metrópole Digital</span>
                  </li>
                  <li>
                    <img src="/imagens/pinPhone.png" alt="Telefone" />
                    <span>(84) 9 8888-8888</span>
                  </li>
                  <li>
                    <img src="/imagens/pinEmail.png" alt="Email" />
                    <span>hubsfood@gmail.com</span>
                  </li>
                  <li>
                    <img src="/imagens/pinHorario.png" alt="Horário" />
                    <span>24h</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="end">
            <span>Copyright @ 2024 All rights reserved</span>
          </div>
        </div>
    </>
  );
}
