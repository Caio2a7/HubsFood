'use client';

import { useState, useEffect } from 'react';
import { Vendor } from "@/ui/types/vendor";
import { getVendorById } from "@/ui/utils/vendorsFetcher";
import { postOrder } from "@/services/orders/orderPOST";
import Link from "next/link";

// Página do Vendedor
export default function VendorPage({ params }: { params: Promise<{ hubId: string, vendorId: string }> }) {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [hubId, setHubId] = useState<number | null>(null);
  const [vendorId, setVendorId] = useState<number | null>(null);

  const clientId = 1; // Defina o clientId conforme necessário (Ex: usuário autenticado)

  useEffect(() => {
    // Função para pegar os parâmetros de maneira assíncrona
    const fetchParams = async () => {
      const resolvedParams = await params;
      setHubId(parseInt(resolvedParams.hubId, 10));
      setVendorId(parseInt(resolvedParams.vendorId, 10));
    };

    fetchParams();
  }, [params]);

  // Carregar o vendedor ao montar o componente
  useEffect(() => {
    if (vendorId !== null) {
      const fetchVendor = async () => {
        const fetchedVendor = await getVendorById(vendorId);
        setVendor(fetchedVendor);
      };

      fetchVendor();
    }
  }, [vendorId]);

  // Função para lidar com o pedido
  const handleOrder = async (productId: number) => {
    try {
      // Chamando a função de criar pedido
      const response = await postOrder(clientId, productId);
      alert('Pedido realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer pedido:', error);
      alert('Erro ao fazer o pedido.');
    }
  };

  if (hubId === null || vendorId === null || !vendor) {
    return <p>Carregando informações do vendedor...</p>;
  }

  return (
    <div>
      <h1>{vendor.name}</h1>
      <p>{vendor.description}</p>
      <h2>Produtos</h2>
      <ul>
        {vendor.products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong>: {product.description} - Preço: R${product.price}
            <Link href={`/client/hubs/${hubId}/vendors/${vendor.id}/product/${product.id}`} passHref>
              <button>Ver detalhes do produto</button>
            </Link>
            <button onClick={() => handleOrder(product.id)}>Fazer Pedido</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
