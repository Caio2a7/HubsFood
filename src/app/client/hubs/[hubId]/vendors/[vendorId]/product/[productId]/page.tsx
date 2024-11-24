"use client";

import { useState, useEffect } from "react";
import { getProductById } from "@/ui/utils/productFetcher";
import { Product } from "@/ui/types/product";
import { postOrder } from "@/services/orders/orderPOST";

export default function ProductDetailsPage({ params }: { params: Promise<{ hubId: string; vendorId: string; productId: string; clientId: string }> }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [orderStatus, setOrderStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const resolvedParams = await params;
      const productId = parseInt(resolvedParams.productId, 10);
      const clientId = parseInt(resolvedParams.clientId, 10);

      try {
        const fetchedProduct = await getProductById(productId);
        setProduct({ ...fetchedProduct, clientId }); // Inclui clientId se necessário
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  const handleOrder = async () => {
    if (!product) return;
    try {
      await postOrder(product.clientId, product.id);
      setOrderStatus("Pedido realizado com sucesso!");
    } catch (error) {
      setOrderStatus("Erro ao realizar o pedido.");
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!product) {
    return <div>Produto não encontrado.</div>;
  }

  return (
    <main>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p><strong>Preço:</strong> R${product.price}</p>
      <p><strong>Disponibilidade:</strong> {product.available ? 'Disponível' : 'Indisponível'}</p>
      
      {product.available && (
        <button onClick={handleOrder}>Fazer Pedido</button>
      )}
      
      {orderStatus && <p>{orderStatus}</p>}
    </main>
  );
}
