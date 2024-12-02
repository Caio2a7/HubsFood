"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getOrdersByVendor } from "@/services/orders/orderGET";
import { getUserById } from "@/services/users/userGET";
import { getProductById } from "@/services/products/productGET";
import { patchOrderStatus } from "@/services/orders/orderPATCH";
import Header from "@/ui/components/Header";
import Footer from "@/ui/components/Footer";

const PedidoDetalhes = ({ params }: { params: { pedidoId: string } }) => {
  const { pedidoId } = params;
  const [pedido, setPedido] = useState<any>(null);
  const [cliente, setCliente] = useState<any>(null);
  const [produto, setProduto] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
    const fetchPedidoDetalhes = async () => {
      try {
        const ordersData = await getOrdersByVendor(pedidoId);
        const pedidoData = ordersData.find((order: any) => order.id === pedidoId);

        if (!pedidoData) {
          throw new Error(`Pedido com ID ${pedidoId} não encontrado.`);
        }

        setPedido(pedidoData);

        if (pedidoData.clientId) {
          const clienteData = await getUserById(pedidoData.clientId);
          setCliente(clienteData);
        }

        if (pedidoData.productId) {
          const produtoData = await getProductById(Number(pedidoData.productId));
          setProduto(produtoData[0]);
        }
      } catch (err) {
        console.error(err);
        router.push("/vendor/pedidos"); // Redireciona para a página de pedidos em caso de erro
      } finally {
        setLoading(false);
      }
    };

    fetchPedidoDetalhes();
  }, [pedidoId, router]);

  const updateStatus = async (newStatus: string) => {
    if (!pedido) return;

    try {
      const updatedOrder = await patchOrderStatus(
        Number(pedido.id),
        pedido.clientId,
        pedido.productId,
        newStatus,
        pedido.createdAt
      );

      console.log("Pedido atualizado com sucesso:", updatedOrder);
      setPedido({ ...pedido, status: updatedOrder.status });
    } catch (err) {
      console.error("Erro ao atualizar o status do pedido:", err);
      alert("Erro ao atualizar o status do pedido. Tente novamente.");
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-[#FF7A55] mb-6">
            Detalhes do Pedido #{pedido?.id}
          </h1>
          <div className="bg-white shadow-lg rounded-lg p-6 border border-[#FF7A55]">
            {/* Foto e dados do cliente */}
            <div className="flex items-center mb-6">
              <img
                src={cliente?.imagePath || "/imagens/defaultUser.png"}
                alt={`Foto de ${cliente?.username || "Usuário"}`}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Cliente: {cliente?.username || "Não informado"}
                </h2>
                <p className="text-sm text-gray-600">{cliente?.email || ""}</p>
              </div>
            </div>

            {/* Foto e dados do produto */}
            <div className="flex items-center mb-6">
              <img
                src={produto?.imagePath || "/imagens/defaultProduct.png"}
                alt={produto?.name || "Produto"}
                className="w-16 h-16 rounded mr-4"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Produto: {produto?.name || "Não informado"}
                </h2>
                <p className="text-sm text-gray-600">
                  {produto?.description || "Sem descrição"}
                </p>
                <p className="text-sm text-gray-600">
                  Preço: R$ {produto?.price?.toFixed(2) || "0.00"}
                </p>
              </div>
            </div>

            {/* Detalhes adicionais do pedido */}
            <p className="text-gray-600 mb-2">
              <strong>Quantidade:</strong> {pedido?.quantity || "Não informado"}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Status:</strong> {translateStatus(pedido?.status) || "Não informado"}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Data do Pedido:</strong>{" "}
              {new Date(pedido?.createdAt).toLocaleString()}
            </p>

            {/* Ações para alterar status */}
            <div className="flex gap-4">
              {pedido?.status === "pending" && (
                <>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    onClick={() => updateStatus("accepted")}
                  >
                    Aceitar
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    onClick={() => updateStatus("rejected")}
                  >
                    Rejeitar
                  </button>
                </>
              )}
              {pedido?.status === "accepted" && (
                <>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    onClick={() => updateStatus("ready")}
                  >
                    Marcar como Pronto
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    onClick={() => updateStatus("canceled")}
                  >
                    Cancelar
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PedidoDetalhes;
