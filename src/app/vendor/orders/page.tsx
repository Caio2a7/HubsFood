"use client"

import { useEffect, useState } from "react";
import { getOrdersByVendor } from "@/services/orders/orderGET";
import { patchOrderStatus } from "@/services/orders/orderPATCH";
import { getClientIdFromCookie } from "@/ui/utils/getToken";

export default function VendorOrdersPage() {
  const [vendorId, setVendorId] = useState<number | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Obtém o VendorId do cookie
    try {
      const id = getClientIdFromCookie();
      setVendorId(Number(id));
    } catch (err) {
      setError("Erro ao buscar ID do vendedor.");
      setLoading(false);
      return;
    }
  }, []);

  useEffect(() => {
    if (vendorId === null) return;

    const fetchOrders = async () => {
      try {
        const vendorOrders = await getOrdersByVendor(vendorId);
        setOrders(vendorOrders);
      } catch (err) {
        setError("Erro ao buscar pedidos.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [vendorId]);

  const handleStatusChange = async (orderId: number, clientId: number, productId: number, newStatus: string, createdAt: string) => {
    try {
      const updatedOrder = await patchOrderStatus(orderId, clientId, productId, newStatus, createdAt);
      console.log("Pedido atualizado:", updatedOrder);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );
    } catch (err) {
      console.error("Erro ao atualizar status do pedido:", err);
      setError("Não foi possível atualizar o status do pedido.");
    }
  };

  if (loading) return <div>Carregando pedidos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main>
      <h1>Pedidos do Estabelecimento</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <p><strong>ID:</strong> {order.id}</p>
            <p><strong>Produto:</strong> {order.productId}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Cliente:</strong> {order.clientId}</p>
            <p><strong>Criado em:</strong> {new Date(order.createdAt).toLocaleString()}</p>

            <div>
              <button
                onClick={() =>
                  handleStatusChange(order.id, order.clientId, order.productId, "accepted", order.createdAt)
                }
                disabled={order.status === "accepted"}
              >
                Aceitar
              </button>
              <button
                onClick={() =>
                  handleStatusChange(order.id, order.clientId, order.productId, "ready", order.createdAt)
                }
                disabled={order.status === "ready"}
              >
                Pronto
              </button>
              <button
                onClick={() =>
                  handleStatusChange(order.id, order.clientId, order.productId, "rejected", order.createdAt)
                }
                disabled={order.status === "rejected"}
              >
                Recusar
              </button>
            </div>

          </li>
        ))}
      </ul>
    </main>
  );
}
