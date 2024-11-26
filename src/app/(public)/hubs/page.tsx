"use client";

import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import "@/ui/assets/css/geral/style-header-footer.css";
import "@/ui/assets/css/geral/style-body.css";
import "@/ui/assets/css/componentes/style-carousel.css";

const hubs = [
  { id: 1, name: "Midway Mall", image: "/imagens/icon_midway.png" },
  { id: 2, name: "Natal Shopping", image: "/imagens/icon_natalShopping.png" },
  { id: 3, name: "Partage Norte Shopping", image: "/imagens/icon_partage.png" },
  { id: 4, name: "Praia Shopping", image: "/imagens/icon_praiaShopping.png" },
];

const regions = ["Capim Macio", "Ponta Negra", "Potengi", "Candelária", "Tirol"];

export default function HubsPage() {
  useEffect(() => {
    const initializeCarousel = () => {
      if (typeof window !== "undefined" && typeof $ !== "undefined") {
        $(".owl-carousel").owlCarousel({
          loop: true,
          margin: 10,
          nav: true,
          dots: true,
          navText: ["←", "→"],
          responsive: {
            0: { items: 1 },
            600: { items: 2 },
            1000: { items: 3 },
          },
        });
      }
    };

    initializeCarousel();
  }, []);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Hubs</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css"
        />
        <script
          src="https://code.jquery.com/jquery-3.6.0.min.js"
          defer
        ></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"
          defer
        ></script>
        <style>{`
          .main {
            background-image: url("/imagens/fachadaHubs.png");
          }
          .empty {
            height: 320px;
          }
        `}</style>
      </Head>

      {/* Header */}
      <header className="header container">
        <div className="container">
          <div>
            <img src="/imagens/logoMenuSuperior.png" alt="Logo" />
          </div>
          <div>
            <ul>
              <li><Link href="/">Início</Link></li>
              <li><Link href="/hubs">Hubs</Link></li>
              <li><Link href="/sobre">Sobre</Link></li>
              <li><Link href="/contatos">Contatos</Link></li>
            </ul>
          </div>
        </div>
        <div className="user">
          <button>Logar</button>
          <img src="/imagens/User.png" alt="Foto de Perfil" />
        </div>
      </header>

      {/* Main Content */}
      <div className="main">
        <div className="empty"></div>

        {regions.map((region, index) => (
          <div className="body-carousel" key={index}>
            <h3>Hubs {region}</h3>
            <div className="owl-carousel">
              {hubs.map((hub) => (
                <div key={hub.id}>
                  <img src={hub.image} alt={`${hub.name} Icon`} />
                  <span>{hub.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="footer container">
        <div className="logo">
          <img src="/imagens/logoInferior.png" alt="Logo Inferior" />
        </div>
        <div className="container">
          <div>
            <ul>
              <li className="footer-header">Links:</li>
              <li>
                <img src="/imagens/logoInstagram.png" alt="Instagram" />
                <a href="https://www.instagram.com/">Instagram</a>
              </li>
              <li>
                <img src="/imagens/logoPinterest.png" alt="Pinterest" />
                <a href="https://br.pinterest.com/">Pinterest</a>
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
                <img src="/imagens/pinEmail.png" alt="E-mail" />
                <span>hubsfood@gmail.com</span>
              </li>
              <li>
                <img src="/imagens/pinHorario.png" alt="Horário" />
                <span>24h</span>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className="end">
        <span>Copyright © 2024 All rights reserved</span>
      </div>
    </>
  );
}
