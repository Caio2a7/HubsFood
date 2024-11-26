"use client";

import React from "react";

const Footer: React.FC = () => {
  return (
    <>
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
              <a href="https://www.instagram.com/">
                <span>Instagram</span>
              </a>
            </li>
            <li>
              <img src="/imagens/logoPinterest.png" alt="Pinterest" />
              <a href="https://br.pinterest.com/">
                <span>Pinterest</span>
              </a>
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
      <span>Copyright @ 2024 Todos os direitos reservados</span>
    </div>
    </>
  );
};

export default Footer;
