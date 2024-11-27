"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { getOrdersByClient } from "@/services/orders/orderGET";
import { getClientIdFromCookie } from "@/ui/utils/getToken";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState({ notifications: false, profile: false });

  useEffect(() => {
    const clientId = getClientIdFromCookie();
    if (clientId) {
      setIsLoggedIn(true);
      setUserName("João Domingus"); // Substitua pelo nome do usuário real

      // Obter quantidade de itens no carrinho
      const cartData = Cookies.get("cart");
      if (cartData) {
        const cart = JSON.parse(cartData);
        setCartCount(cart.length);
      }

      // Obter pedidos do cliente
      const fetchOrders = async () => {
        try {
          const userOrders = await getOrdersByClient(clientId);
          setOrders(userOrders);
        } catch (error) {
          console.error("Erro ao buscar pedidos:", error);
        }
      };
      fetchOrders();
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const toggleDropdown = (type: "notifications" | "profile") => {
    setDropdownOpen((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

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
          {isLoggedIn ? (
            <ul className="flex items-center space-x-6">
              {"Início Sobre Hubs Contatos Pedidos".split(" ").map((item, index) => (
                <li
                  className="hover:scale-105 transition-all transform duration-200 px-4 py-2 rounded-lg"
                  key={index}
                >
                  <Link
                    href={`/client/${item === "Início" ? "" : item === "Sobre" ? "about" : item === "Contatos" ? "contact" : item.toLowerCase()}`}
                    className="text-[#FF7A55] font-bold text-lg sm:text-xl"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
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
          )}
        </nav>

        {/* User Section */}
        <div className="flex items-center space-x-6 pl-6 relative">
          {isLoggedIn && (
            <>
              {/* Notificações */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("notifications")}
                  className="relative flex items-center"
                >
                  <img
                    src="/imagens/iconAlarm.png"
                    alt="Notificações"
                    className="h-8 w-8 object-contain"
                  />
                  {orders.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                      {orders.length}
                    </span>
                  )}
                </button>
                {dropdownOpen.notifications && (
                  <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg z-10">
                    <h3 className="text-lg font-semibold text-[#FF7A55] p-4">Notificações</h3>
                    <ul className="max-h-48 overflow-y-auto">
                      {orders.length === 0 ? (
                        <li className="text-gray-600 text-sm px-4 py-2">Sem pedidos recentes</li>
                      ) : (
                        orders.map((order) => (
                          <li
                            key={order.id}
                            className="text-gray-700 px-4 py-2 hover:bg-[#FFDED5] transition"
                          >
                            Pedido: {order.name} - {order.status}
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                )}
              </div>

              {/* Carrinho */}
              <div className="relative">
                <Link href="/client/carrinho" className="relative flex items-center">
                  <img
                    src="/imagens/iconCarrinho.png"
                    alt="Carrinho"
                    className="h-8 w-8 object-contain"
                  />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#FF7A55] text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </>
          )}

          {/* Menu de Perfil */}
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => toggleDropdown("profile")}
                className="flex items-center space-x-2"
              >
                <img
                  src="/imagens/photoUser.png"
                  alt="Foto de Perfil"
                  className="h-10 w-10 rounded-full object-cover border-2 border-[#FF7A55] shadow-lg"
                />
                <span className="text-[#FF7A55] font-semibold">{userName}</span>
                <svg
                  className="w-4 h-4 text-[#FF7A55]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {dropdownOpen.profile && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
                  <Link
                    href="/profile"
                    className="block py-2 px-4 text-[#FF7A55] hover:bg-[#FFDED5] transition"
                  >
                    Perfil
                  </Link>
                  <Link
                    href="/orders"
                    className="block py-2 px-4 text-[#FF7A55] hover:bg-[#FFDED5] transition"
                  >
                    Meus Pedidos
                  </Link>
                  <Link
                    href="/client/carrinho"
                    className="block py-2 px-4 text-[#FF7A55] hover:bg-[#FFDED5] transition"
                  >
                    Carrinho
                  </Link>
                  <Link
                    href="/settings"
                    className="block py-2 px-4 text-[#FF7A55] hover:bg-[#FFDED5] transition"
                  >
                    Configurações
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link href="/auth/login">
              <button className="bg-[#FF3700] text-white font-bold px-4 py-2 rounded-lg hover:bg-[#FF7A55] transition">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
