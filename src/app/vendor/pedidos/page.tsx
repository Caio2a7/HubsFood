"use client";

import { useEffect, useState } from "react";
import { getOrdersByVendor } from "@/services/orders/orderGET";
import { getProductById } from "@/services/products/productGET";
import { patchOrderStatus } from "@/services/orders/orderPATCH";
import { getClientIdFromCookie } from "@/ui/utils/getToken";
import Header from "@/ui/components/Header";
import Footer from "@/ui/components/Footer";

export default function VendorOrdersPage() {
  const [vendorId, setVendorId] = useState<number | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
        const detailedOrders = await Promise.all(
          vendorOrders.map(async (order: any, index: number) => {
            const product = await getProductById(order.productId);
            return {
              ...order,
              orderNumber: index + 1,
              productDetails: product,
            };
          })
        );
        setOrders(detailedOrders);
        setFilteredOrders(detailedOrders);
      } catch (err) {
        setError("Erro ao buscar pedidos.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [vendorId]);

  const handleStatusChange = async (
    orderId: number,
    clientId: number,
    productId: number,
    newStatus: string,
    createdAt: string
  ) => {
    try {
      const updatedOrder = await patchOrderStatus(
        orderId,
        clientId,
        productId,
        newStatus,
        createdAt
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );
      setFilteredOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );
    } catch (err) {
      console.error("Erro ao atualizar status do pedido:", err);
      setError("Não foi possível atualizar o status do pedido.");
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setFilteredOrders(
      orders.filter((order) =>
        order.productDetails.name
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        order.status.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  if (loading) return <div className="text-center mt-10">Carregando pedidos...</div>;
  if (error) return <div className="text-center text-red-600 mt-10">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center text-[#FF3700] mb-8">Pedidos do Estabelecimento</h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Pesquisar por produto ou status..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <li
              key={order.id}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between hover:scale-105 hover:shadow-xl transition-transform"
            >
              <p>
                <strong>Pedido:</strong> #{order.orderNumber}
              </p>
              <p>
                <strong>Produto:</strong> {order.productDetails.name ? order.productDetails.name : 'Hamburguer'}
              </p>
              <p>
                <strong>Quantidade:</strong> {order.quantity}
              </p>
              <p>
                <strong>Status:</strong> {order.status === 'pending' ? 'pendente' : order.status === 'accepted' ? 'aceito' : 'pronto'}
              </p>
              <p>
                <strong>Cliente:</strong> {order.clientId}
              </p>
              <p>
                <strong>Criado em:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>

              <div className="mt-4">
                <select
                  onChange={(e) =>
                    handleStatusChange(
                      order.id,
                      order.clientId,
                      order.productDetails.id,
                      e.target.value,
                      order.createdAt
                    )
                  }
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={order.status}
                >
                  <option value="accepted" disabled={order.status !== "pending"}>
                    Aceito
                  </option>
                  <option value="ready" disabled={order.status !== "accepted"}>
                    Pronto
                  </option>
                  <option value="rejected" disabled={order.status !== "pending"}>
                    Rejeitado
                  </option>
                </select>
              </div>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}
