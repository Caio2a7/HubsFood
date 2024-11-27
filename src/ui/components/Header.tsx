"use client";

import React from "react";
import Link from "next/link";
import LoginModal from "./LoginModal";

const Header: React.FC = () => {
  return (
    <div className="w-full bg-[#FFDED5] shadow-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-2"> {/* Diminui ainda mais o height com py-2 */}
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img
            src="/imagens/logoMenuSuperior.png"
            alt="Logo HubsFood"
            className="h-10 sm:h-12 object-contain transform transition-transform duration-200 hover:scale-110" 
          />
          <h1 className="text-xl font-bold text-[#FF7A55] transition-transform duration-200 hover:scale-105"> {/* Reduzi o tamanho do título */}
            HubsFood
          </h1>
        </div>

        {/* Navegação */}
        <nav>
          <ul className="flex items-center space-x-6">
            {"Início Sobre Hubs Contatos".split(" ").map((item, index) => (
              <li className="hover:scale-105 transition-all transform duration-200 px-4 py-2 rounded-lg" key={index}>
                <Link
                  href={`/${item === "Início" ? "" : item === "Sobre" ? "about" : item === 'Contatos' ? 'contact' : item.toLowerCase()}`}
                  className="text-[#FF7A55] font-bold text-lg sm:text-xl"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Section */}
        <div className="flex items-center space-x-6 border-l-2 pl-6 border-[#FF7A55]">
          <LoginModal />
          <img
            src="/imagens/User.png"
            alt="Foto de Perfil"
            className="h-10 w-10 rounded-full object-cover border-2 border-[#FF7A55] shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
