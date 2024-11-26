// pages/sobre.tsx
import React from 'react';
import Head from 'next/head';
import '@/ui/assets/css/geral/style-header-footer.css';
import '@/ui/assets/css/geral/style-body.css';
import Header from "@/ui/components/Header";
import Footer from "@/ui/components/Footer";

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

      <Header />

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

      <Footer />
    </>
  );
};

export default Sobre;
