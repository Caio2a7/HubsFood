// src/app/(public)/hubs/[hubId]/page.tsx
import { Hub } from "@/ui/types/hub";
import { getHubs, getHubById } from "@/ui/utils/hubsFetcher";
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
  const hub = await getHubById(hubId); // Buscando os dados do hub pelo ID

  if (!hub) {
    return <div>Hub não encontrado.</div>;
  }

  return (
    <main>
      <h1>{hub.name}</h1>
      <p><strong>Location:</strong> {hub.location.street}, {hub.location.city}, {hub.location.state}</p>
      <h2>Vendedores</h2>
      <ul>
        {hub.vendors.map((vendor) => (
          <li key={vendor.id}>
            <h3>{vendor.name}</h3>
            <p>{vendor.description}</p>
            <Link href={`/hubs/${hubId}/vendors/${vendor.id}`} passHref>
              <button>Ver detalhes do vendedor</button>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
