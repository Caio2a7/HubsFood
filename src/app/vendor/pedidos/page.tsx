"use client";

import { useEffect, useState } from "react";
import { getOrdersByVendor } from "@/services/orders/orderGET";
import { getUserById } from "@/services/users/userGET";
import { getProductById } from "@/services/products/productGET";
import { getClientIdFromCookie } from "@/ui/utils/getToken";
import { useRouter } from "next/navigation";
import Header from "@/ui/components/Header";
import Footer from "@/ui/components/Footer";

const VendorOrders = () => {
  const [mainOrders, setMainOrders] = useState([]); // Pedidos pendentes e aceitos
  const [otherOrders, setOtherOrders] = useState([]); // Pedidos rejeitados, cancelados e prontos
  const [clients, setClients] = useState({});
  const [products, setProducts] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showOtherOrders, setShowOtherOrders] = useState(false);
  const router = useRouter();
  const vendorId = getClientIdFromCookie();

  const translateStatus = (status: string) => {
    const translations: Record<string, string> = {
      pending: "Pendente",
      accepted: "Aceito",
      ready: "Pronto",
      rejected: "Rejeitado",
      canceled: "Cancelado",
    };
    return translations[status] || "Desconhecido";
  };

  useEffect(() => {
    const fetchOrdersAndDetails = async () => {
      if (vendorId) {
        try {
          const ordersData = await getOrdersByVendor(vendorId);

          // Separar pedidos por status
          const pendingAndAccepted = ordersData.filter(
            (order: any) => order.status === "pending" || order.status === "accepted"
          );

          const rejectedCanceledReady = ordersData.filter(
            (order: any) =>
              order.status === "rejected" ||
              order.status === "canceled" ||
              order.status === "ready"
          );

          const clientPromises = ordersData.map(async (order: any) => {
            if (order.clientId) {
              const clientData = await getUserById(order.clientId);
              return { [order.clientId]: clientData };
            }
            return null;
          });

          const productPromises = ordersData.map(async (order: any) => {
            if (order.productId) {
              const productData = await getProductById(Number(order.productId));
              return { [order.productId]: productData[0] };
            }
            return null;
          });

          const clientResults = await Promise.all(clientPromises);
          const productResults = await Promise.all(productPromises);

          const clientMap = clientResults.reduce(
            (acc, client) => ({ ...acc, ...client }),
            {}
          );

          const productMap = productResults.reduce(
            (acc, product) => ({ ...acc, ...product }),
            {}
          );

          setMainOrders(pendingAndAccepted);
          setOtherOrders(rejectedCanceledReady);
          setClients(clientMap);
          setProducts(productMap);
        } catch (err) {
          console.error(err);
        }
      } else {
        router.push("/login");
      }
    };

    fetchOrdersAndDetails();
  }, [vendorId, router]);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-blue-100 text-blue-800";
      case "ready":
        return "bg-green-100 text-green-800";
      case "rejected":
      case "canceled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredOrders = [...mainOrders, ...(showOtherOrders ? otherOrders : [])].filter(
    (order) =>
      `${clients[order.clientId]?.username || ""} ${products[order.productId]?.name || ""} ${
        order.id
      }`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-[#FF7A55] mb-6">
            Meus Pedidos
          </h1>

          {/* Barra de pesquisa */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Pesquisar pedidos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A55]"
            />
          </div>

          {/* Botão para mostrar outros pedidos */}
          {!showOtherOrders && otherOrders.length > 0 && (
            <div className="mb-6 text-center">
              <button
                onClick={() => setShowOtherOrders(true)}
                className="px-6 py-2 bg-[#FF7A55] text-white rounded-md shadow hover:bg-[#FF5722] transition"
              >
                Mostrar Outros Pedidos
              </button>
            </div>
          )}

          {/* Cards de pedidos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map((order: any) => (
              <div
                key={order.id}
                className="relative bg-white shadow-lg rounded-lg p-6 border border-[#FF7A55] hover:shadow-xl transition transform hover:scale-105 cursor-pointer"
                onClick={() => router.push(`/vendor/pedidos/${order.id}`)}
              >
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-[#FF7A55]">
                    Pedido #{order.id}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Cliente: {clients[order.clientId]?.username || "Não informado"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Produto: {products[order.productId]?.name || "Não informado"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Quantidade: {order.quantity}
                  </p>
                  <p className="text-sm text-gray-600">
                    Data: {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <p
                  className={`inline-block px-3 py-1 text-xs font-medium rounded ${getStatusStyles(
                    order.status
                  )}`}
                >
                  {translateStatus(order.status)}
                </p>

                {/* Botão Ver Detalhes */}
                <button
                  className="absolute bottom-4 right-4 px-4 py-2 bg-[#FF7A55] text-white rounded-md shadow hover:bg-[#FF5722] focus:ring-2 focus:ring-[#FF7A55] transition"
                >
                  Ver Detalhes
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VendorOrders;
