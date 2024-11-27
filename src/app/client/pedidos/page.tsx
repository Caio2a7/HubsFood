"use client";

import { useEffect, useState } from "react";
import { getOrdersByClient } from "@/services/orders/orderGET";
import { getProductById } from "@/services/products/productGET";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import Header from "@/ui/components/Header";
import Footer from "@/ui/components/Footer";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [parsedOrders, setParsedOrders] = useState<any[]>([]);
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
        const decoded: any = jwt.decode(token);

        if (decoded?.id) {
          setClientId(Number(decoded.id));
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
          const clientOrders = await getOrdersByClient(clientId);
          setOrders(clientOrders);

          // Parse dos produtos para os pedidos
          const parsed = await Promise.all(
            clientOrders.map(async (order) => {
              const product = await getProductById(order.productId);
              return {
                ...order,
                productName: product[0]?.name || "Produto Desconhecido",
                productPrice: product[0]?.price || 0, // Certifique-se de que o preço seja retornado corretamente
              };
            })
          );
          setParsedOrders(parsed);
        } catch (err) {
          setError("Erro ao buscar os pedidos.");
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
    }
  }, [clientId]);

  if (loading) {
    return <div className="text-center mt-20 text-lg font-semibold">Carregando pedidos...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-lg text-red-500">{error}</div>;
  }

  if (parsedOrders.length === 0) {
    return (
      <div className="text-center mt-20 text-lg font-semibold">
        Não há pedidos para este cliente.
      </div>
    );
  }

  const statusStyles = {
    pending: "bg-yellow-300 text-yellow-900 border-yellow-500",
    accepted: "bg-purple-200 text-purple-800 border-purple-400",
    ready: "bg-green-200 text-green-800 border-green-400",
    rejected: "bg-red-200 text-red-800 border-red-400",
  };

  const statusLabels = {
    pending: "Pendente",
    accepted: "Aceito",
    ready: "Pronto",
    rejected: "Rejeitado",
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto py-10 px-6 mb-20">
        <h1 className="text-4xl font-bold text-[#FF7A55] mb-8 text-center">Meus Pedidos</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {parsedOrders.map((order) => (
            <div
              key={order.id}
              className={`border rounded-lg p-6 shadow-lg bg-white transform transition-transform hover:scale-105`}
            >
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                Pedido #{order.id}
              </h2>
              <p className="text-lg font-medium text-gray-700 mb-2">
                Produto: {order.productName}
              </p>
              <p className="text-lg text-gray-700 mb-2">
                Quantidade: {order.quantity}
              </p>
              <p className="text-lg font-semibold text-[#FF7A55] mb-4">
                Preço Total: R$ {(order.quantity * order.productPrice).toFixed(2)}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Criado em: {new Date(order.createdAt).toLocaleString()}
              </p>
              <span
                className={`inline-block text-sm font-semibold px-3 py-1 rounded-full ${statusStyles[order.status]}`}
              >
                {statusLabels[order.status]}
              </span>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
