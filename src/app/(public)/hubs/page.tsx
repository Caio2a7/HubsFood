// src/app/(public)/hubs/page.tsx
import { Hub } from "@/ui/types/hub";
import { getHubs } from "@/services/hubs/hubGET";
import Link from "next/link";

// Gerando os parâmetros estáticos (SSG) com os IDs dos hubs
export const generateStaticParams = async () => {
  const hubs = await getHubs(); // Obtemos todos os hubs
  return hubs.map((hub) => ({ id: hub.id.toString() })); // Gerando os parâmetros necessários para cada hub
};

// Página de exibição dos hubs
export default async function HubsPage() {
  const hubs: Hub[] = await getHubs(); // Pegamos os hubs

  return (
    <main>
      <h1>Hubs</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {hubs.map((hub) => (
          <Link key={hub.id} href={`/hubs/${hub.id}`} style={{ textDecoration: 'none', color: 'black', margin: '10px' }}>
            <div
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '20px',
                width: '200px',
                cursor: 'pointer',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h2>{hub.name}</h2>
              <p>{`${hub.location.street}, ${hub.location.city}, ${hub.location.state}, CEP: ${hub.location.zipCode}`}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
