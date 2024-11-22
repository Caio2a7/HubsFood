// src/ui/utils/vendorsFetcher.ts
import { Vendor } from "@/ui/types/vendor";
import { getHubs } from "@/ui/utils/hubsFetcher"; // Usando a função getHubs já criada
import { Hub } from "../types/hub";

// Função para buscar um vendedor pelo ID
export async function getVendorById(vendorId: number): Promise<Vendor | undefined> {
  // Buscando todos os hubs
  const hubs: Hub[] = await getHubs();
  
  // Procurando o vendedor dentro de cada hub
  for (const hub of hubs) {
    const vendor = hub.vendors.find((vendor) => vendor.id === vendorId);
    if (vendor) {
      return vendor; // Retorna o vendedor encontrado
    }
  }
  return undefined; // Retorna undefined caso o vendedor não seja encontrado
}
