// pages/sobre.tsx
import React from 'react';
import Head from 'next/head';
import '@/ui/assets/css/geral/style-header-footer.css';
import '@/ui/assets/css/geral/style-body.css';

const Sobre = () => {
  return (
    <>
      <Head>
        <title>Sobre Nós</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>{`
          .main {
            background-image: url("/imagens/fachadaSobreNos.png");
          }
          .empty {
            height: 320px;
          }
          .whychoose h2, .whychoose p, .aboutMore h2, .aboutMore p {
            font-size: 15px;
            padding-top: 0px;
          }
          .aboutMore h2 {
            text-align: center;
          }
        `}</style>
      </Head>

      <div className="header container">
        <div className="container">
          <div>
            <img src="/imagens/logoMenuSuperior.png" alt="Logo" />
          </div>
          <div>
            <ul>
              <li><a href="/index">Início</a></li>
              <li><a href="/hubs">Hubs</a></li>
              <li><a href="/sobre">Sobre</a></li>
              <li><a href="/contatos">Contatos</a></li>
            </ul>
          </div>
        </div>

        <div className="user">
          <button>Logar</button>
          <img src="/imagens/User.png" alt="Foto de Perfil" />
        </div>
      </div>

      <div className="main">
        <div className="empty"></div>

        <div className="body-about">
          <div>
            <img src="/imagens/sobreNosDescricao.png" alt="3 imagens de restaurantes" />
          </div>
          <div>
            <h4>Nosso objetivo...</h4>
            <h2>Uma solução organizada para centros comerciais</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui volutpat fringilla bibendum. Urna, elit augue urna, vitae feugiat pretium donec id elementum. Ultrices mattis vitae mus risus. Lacus nisi, et ac dapibus sit eu velit in consequat...
            </p>
          </div>
        </div>

        <div className="whychoose">
          <h2>Por que nos escolher?</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui volutpat fringilla bibendum.</p>
          <div>
            <img src="/imagens/fachadaInferiorSobreNos.png" alt="Sobre Nós" />
          </div>
        </div>

        <div className="aboutMore">
          <div>
            <div>
              <img src="/imagens/sobreNosOrganizacao.png" alt="Organização" />
            </div>
            <h2>Organização</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui volutpat</p>
          </div>
          <div>
            <div>
              <img src="/imagens/sobreNosDestaqueCoffee.png" alt="Destaque seu estabelecimento" />
            </div>
            <h2>Destaque do seu estabelecimento</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui volutpat</p>
          </div>
          <div>
            <div>
              <img src="/imagens/sobreNosPessoa.png" alt="Lorem ipsum" />
            </div>
            <h2>Lorem ipsum</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui volutpat</p>
          </div>
        </div>

        <div className="nossoTime">
          <div>
            <img src="/imagens/time.png" alt="Ana Paula" />
            <div className="legend"><span>Ana Paula</span></div>
          </div>
          <div>
            <img src="/imagens/time.png" alt="Caio" />
            <div className="legend"><span>Caio</span></div>
          </div>
          <div>
            <img src="/imagens/time.png" alt="Camila" />
            <div className="legend"><span>Camila</span></div>
          </div>
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
              <li><img src="/imagens/logoInstagram.png" alt="Instagram" /><a href="https://www.instagram.com/"><span>Instagram</span></a></li>
              <li><img src="/imagens/logoPinterest.png" alt="Pinterest" /><a href="https://br.pinterest.com/"><span>Pinterest</span></a></li>
            </ul>
          </div>
          <div>
            <ul>
              <li className="footer-header">Contatos:</li>
              <li><img src="/imagens/pinLocation.png" alt="Localização" /><span>3º piso do Instituto Metrópole Digital</span></li>
              <li><img src="/imagens/pinPhone.png" alt="Telefone" /><span>(84) 9 8888-8888</span></li>
              <li><img src="/imagens/pinEmail.png" alt="Email" /><span>hubsfood@gmail.com</span></li>
              <li><img src="/imagens/pinHorario.png" alt="Horário" /><span>24h</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="end">
        <span>Copyright © 2024 All rights reserved</span>
      </div>
    </>
  );
};

export default Sobre;
