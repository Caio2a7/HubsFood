"use client";

import { useEffect, useState } from "react";
import { getOrdersByClient } from "@/services/orders/orderGET";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie"; // Usando js-cookie para manipulação de cookies
import Link from "next/link";
import Script from 'next/script';
import Head from 'next/head';
import '@/ui/assets/css/geral/style-header-footer.css';
import '@/ui/assets/css/geral/style-body.css';
import '@/ui/assets/css/paginas/style-pedidosCliente.css';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clientId, setClientId] = useState<number | null>(null);

  useEffect(() => {
    const fetchClientId = () => {
      const token = Cookies.get("token");
      if (!token) {
        setError("Token não encontrado nos cookies.");
        setLoading(false);
        return;
      }

      try {
        const decoded: any = jwt.decode(token); // Decodificar sem validar

        if (decoded?.id) { // Alterando para `id` que está no token
          setClientId(Number(decoded.id)); // Ajustando para usar o `id`
        } else {
          setError("Token inválido ou malformado.");
        }
      } catch (err) {
        setError("Erro ao decodificar o token.");
      } finally {
        setLoading(false);
      }
    };

    fetchClientId();
  }, []);

  useEffect(() => {
    if (clientId !== null) {
      const fetchOrders = async () => {
        try {
          console.log("Buscando pedidos para o cliente:", clientId); // Log do clientId
          const clientOrders = await getOrdersByClient(clientId);
          setOrders(clientOrders);
        } catch (err) {
          console.error("Erro ao buscar pedidos:", err); // Log de erro
          setError("Erro ao buscar os pedidos.");
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
    }
  }, [clientId]);

  if (loading) {
    return <div>Carregando pedidos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (orders.length === 0) {
    return <div>Não há pedidos para este cliente.</div>;
  }

  return (
    <main>
      <h1>Pedidos do Cliente {clientId}</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <p><strong>ID do Pedido:</strong> {order.id}</p>
            <p><strong>Produto:</strong> {order.productId}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Criado em:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
      <div>
      <div className="header container">
    <div className="container">
        <div>
            <img src="/imagens/logoMenuSuperior.png" alt="" />
        </div>
        <div>
            <ul>
                <li><a href="../indexLogado.html">Início</a></li>
                <li><a href="../hubsLogado.html">Hubs</a></li>
                <li><a href="../sobreLogado.html">Sobre</a></li>
                <li><a href="../contatosLogado.html">Contatos</a></li>
            </ul>
        </div>
    </div>
    <div className="user">
        <div className="loginIcons"><a href="#item2"><img src="/imagens/iconAlarm.png" alt="Notificações" /></a></div>
        <div className="loginIcons"><a href="carrinho.html"><img src="/imagens/iconCarrinho.png" alt="Carrinho" /></a></div>
        <div className="menu-container">
            <img src="/imagens/photoUser.png" alt="Foto de Perfil" className="menu-trigger" />
            <div className="menu" id="menu">
                <a href="../configuracoesCliente/perfilCliente.html">Perfil</a>
                <a href="../configuracoesCliente/pedidosCliente.html">Meus pedidos</a>
                <a href="../../areaNaoLogada/index.html">Sair</a>
            </div>
        </div>
        <span>João Domingus</span>
    </div>
</div>

<main>
    <table id="filaPedidos">
        <caption>Meus Pedidos</caption>
        <thead>
            <tr>
                <th>Hub</th>
                <th>Loja</th>
                <th>Itens</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Hub 1</td>
                <td>Loja A</td>
                <td>Produto 1, Produto 2</td>
                <td>Em andamento</td>
            </tr>
            <tr>
                <td>Hub 2</td>
                <td>Loja B</td>
                <td>Produto 3</td>
                <td>Entregue</td>
            </tr>
            <tr>
                <td>Hub 3</td>
                <td>Loja C</td>
                <td>Produto 4, Produto 5</td>
                <td>Cancelado</td>
            </tr>
        </tbody>
    </table>
</main>

<div className="footer container">
    <div className="logo">
        <img src="/imagens/logoInferior.png" alt="" />
    </div>
    <div className="container">
        <div>
            <ul>
                <li className="footer-header">Links:</li>
                <li><img src="/imagens/logoInstagram.png" alt="" /><a href="https://www.instagram.com/"><span>Instagram</span></a></li>
                <li><img src="/imagens/logoPinterest.png" alt="" /><a href="https://br.pinterest.com/"><span>Pinterest</span></a></li>
            </ul>
        </div>
        <div>
            <ul>
                <li className="footer-header">Contatos:</li>
                <li><img src="/imagens/pinLocation.png" alt="" /><span>3º piso do Instituto Metrópole Digital</span></li>
                <li><img src="/imagens/pinPhone.png" alt="" /><span>(84) 9 8888-8888</span></li>
                <li><img src="/imagens/pinEmail.png" alt="" /><span>hubsfood@gmail.com</span></li>
                <li><img src="/imagens/pinHorario.png" alt="" /><span>24h</span></li>
            </ul>
        </div>
    </div>
</div>

<div className="end">
    <span>Copyright @ 2024 All rights reserved</span>
</div>

      </div>
    </main>
  );
}
