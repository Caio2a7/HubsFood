"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getClientIdFromCookie } from "@/ui/utils/getToken"; // Certifique-se de importar a função corretamente

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const clientId = getClientIdFromCookie();
    if (clientId) {
      setIsLoggedIn(true);
      setUserName("João Domingus"); // Aqui você pode personalizar o nome conforme o usuário autenticado
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className="w-full bg-[#FFDED5] shadow-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-2">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img
            src="/imagens/logoMenuSuperior.png"
            alt="Logo HubsFood"
            className="h-10 sm:h-12 object-contain transform transition-transform duration-200 hover:scale-110"
          />
          <h1 className="text-xl font-bold text-[#FF7A55] transition-transform duration-200 hover:scale-105">
            HubsFood
          </h1>
        </div>

        {/* Navegação */}
        <nav>
          <ul className="flex items-center space-x-6">
            {"Início Sobre Hubs Contatos".split(" ").map((item, index) => (
              <li
                className="hover:scale-105 transition-all transform duration-200 px-4 py-2 rounded-lg"
                key={index}
              >
                <Link
                  href={`/${item === "Início" ? "" : item === "Sobre" ? "about" : item === "Contatos" ? "contact" : item.toLowerCase()}`}
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
          {/* Ícones de Notificação e Carrinho */}
          {isLoggedIn && (
            <>
              <div className="loginIcons">
                <Link href="#item2">
                  <img
                    src="/imagens/iconAlarm.png"
                    alt="Notificações"
                    className="h-8 w-8 object-contain"
                  />
                </Link>
              </div>
              <div className="loginIcons">
                <Link href="/cart">
                  <img
                    src="/imagens/iconCarrinho.png"
                    alt="Carrinho"
                    className="h-8 w-8 object-contain"
                  />
                </Link>
              </div>
            </>
          )}

          {/* Menu de Perfil */}
          {isLoggedIn ? (
            <div className="menu-container relative">
              <img
                src="/imagens/photoUser.png" // Imagem de perfil genérica
                alt="Foto de Perfil"
                className="menu-trigger h-10 w-10 rounded-full object-cover border-2 border-[#FF7A55] shadow-lg"
              />
              <div className="menu absolute top-12 right-0 bg-white shadow-lg rounded-lg p-3 w-48 hidden group-hover:block">
                <Link href="/profile" className="block py-2 px-4 text-[#FF7A55] hover:bg-[#FFDED5] rounded">Perfil</Link>
                <Link href="/orders" className="block py-2 px-4 text-[#FF7A55] hover:bg-[#FFDED5] rounded">Meus Pedidos</Link>
                <Link href="/logout" className="block py-2 px-4 text-[#FF7A55] hover:bg-[#FFDED5] rounded">Sair</Link>
              </div>
            </div>
          ) : (
            <Link href="/login">
              <button className="bg-[#FF3700] text-white font-bold px-4 py-2 rounded-lg hover:bg-[#FF7A55] transition">
                Login
              </button>
            </Link>
          )}

          {/* Nome do Usuário */}
          {isLoggedIn && (
            <span className="text-[#FF7A55] font-semibold">{userName}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
