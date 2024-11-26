"use client";

import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <div className="header container">
      <div className="container">
        <div>
          <img src="/imagens/logoMenuSuperior.png" alt="Logo HubsFood" />
        </div>
        <div>
          <ul>
            <li>
              <Link href="/">Início</Link>
            </li>
            <li>
              <Link href="/hubs">Hubs</Link>
            </li>
            <li>
              <Link href="/about">Sobre</Link>
            </li>
            <li>
              <Link href="/contact">Contatos</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="user">
        <button id="loginBtn">Logar</button>
        <img src="/imagens/User.png" alt="Foto de Perfil" />
      </div>
    </div>
  );
};

export default Header;
