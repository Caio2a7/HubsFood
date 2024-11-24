// src/ui/utils/productFetcher.ts

import { getHubs } from "./hubsFetcher"; // Assumindo que você tem a função `getHubs` configurada

export async function getProductById(productId: number) {
  // Buscar todos os hubs (que contém os vendors e produtos)
  const hubs = await getHubs();

  // Buscar o produto pelo ID no array de vendors
  for (const hub of hubs) {
    for (const vendor of hub.vendors) {
      const product = vendor.products.find((product) => product.id === productId);
      if (product) {
        return product;
      }
    }
  }

  return undefined; // Retorna undefined se não encontrar o produto
}
