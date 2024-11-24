import { Hub } from "@/ui/types/hub";
import { getHubById, getHubs } from "@/services/hubs/hubGET";
import { getVendorById } from "@/services/vendors/vendorGET";  // Supondo que você tenha esse método
import Link from "next/link";

// Preload and generate static paths for hubs
export async function generateStaticParams() {
  const hubs: Hub[] = await getHubs();
  return hubs.map((hub) => ({
    hubId: hub.id.toString(),
  }));
}

// Fetch data for a specific hub and generate metadata
export async function generateMetadata({ params }: { params: { hubId: string } }) {
  const hub = await getHubById(parseInt(params.hubId));
  return {
    title: `${hub?.name} - Details`,
  };
}

// HubDetailsPage component
export default async function HubDetailsPage({ params }: { params: { hubId: string } }) {
  const hubId = parseInt(params.hubId, 10); // Obtendo o ID do hub da URL
  const hubs = await getHubById(hubId); // Buscando os dados do hub pelo ID
  
  // Como o JSON retornado é um array de tamanho 1, acessamos o primeiro elemento do array
  const hub = hubs && hubs.length > 0 ? hubs[0] : null; 

  if (!hub) {
    return <div>Hub não encontrado.</div>;
  }

  // Buscar os dados dos vendedores usando os IDs contidos em `hub.vendors`
  const vendorPromises = hub.vendors.map((vendorId: number) => getVendorById(vendorId));
  const vendorsArray = await Promise.all(vendorPromises);

  // Acessamos o primeiro item de cada array de vendedores
  const vendors = vendorsArray.map((vendorArr: any) => vendorArr[0]);

  return (
    <main>
      <h1>{hub.name}</h1>
      {hub.location ? (
        <p><strong>Location:</strong> {hub.location.street}, {hub.location.city}, {hub.location.state}</p>
      ) : (
        <p>Localização não disponível</p>
      )}
      <h2>Vendedores</h2>
      <ul>
        {vendors.length > 0 ? (
          vendors.map((vendor) => (
            <li key={vendor.id}>
              <h3>{vendor.name}</h3>
              <p>{vendor.description}</p>
              <Link href={`/hubs/${hubId}/vendors/${vendor.id}`} passHref>
                <button>Ver detalhes do vendedor</button>
              </Link>
            </li>
          ))
        ) : (
          <p>Não há vendedores para este hub.</p>
        )}
      </ul>
      <Link href={`/hubs`} passHref>
        <button>Voltar para os hubs</button>
      </Link>
    </main>
  );
}
