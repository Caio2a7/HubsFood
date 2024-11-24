"use client";

import { useEffect, useState } from "react";
import { getOrdersByClient } from "@/services/orders/orderGET";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie"; // Usando js-cookie para manipulação de cookies

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
    </main>
  );
}
