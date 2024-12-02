import { Hub } from "@/ui/types/hub";
import { getHubById, getHubs } from "@/services/hubs/hubGET";
import { getVendorById } from "@/services/vendors/vendorGET";
import Link from "next/link";
import Header from "@/ui/components/Header";
import Footer from "@/ui/components/Footer";
import Head from "next/head";

export async function generateStaticParams() {
  const hubs: Hub[] = await getHubs();
  return hubs.map((hub) => ({
    hubId: hub.id.toString(),
  }));
}

export async function generateMetadata({ params }: { params: { hubId: string } }) {
  const hub = await getHubById(parseInt(params.hubId));
  return {
    title: `${hub?.name} - Detalhes`,
  };
}

export default async function HubDetailsPage({ params }: { params: { hubId: string } }) {
  const hubId = parseInt(params.hubId, 10);
  const hubs = await getHubById(hubId);
  const hub = hubs && hubs.length > 0 ? hubs[0] : null;

  if (!hub) {
    return <div>Hub não encontrado.</div>;
  }

  const vendorPromises = hub.vendors.map((vendorId: number) => getVendorById(vendorId));
  const vendorsArray = await Promise.all(vendorPromises);
  const vendors = vendorsArray.map((vendorArr: any) => vendorArr[0]);

  return (
    <main className="bg-gradient-to-b from-gray-100 to-gray-50 min-h-screen flex flex-col">
      <Head>
        <title>{hub.name} - Detalhes</title>
      </Head>
      <Header />

      <div className="flex flex-col items-center px-4 py-12 sm:px-6 lg:px-8">
        {/* Card Principal */}
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl flex overflow-hidden border border-gray-300 hover:shadow-2xl transition-shadow duration-300">
          {/* Imagem com bordas arredondadas */}
          <div
            className="w-1/3 bg-cover bg-center rounded-l-xl"
            style={{ backgroundImage: `url(${hub.imagePath})` }}
          ></div>
          <div className="w-2/3 p-8 flex flex-col justify-center space-y-4">
            <h1 className="text-3xl font-bold text-[#FF3700]">{hub.name}</h1>
            <div className="flex items-center text-gray-700 space-x-4">
              <span className="material-icons text-[#FF3700]">Localização</span>
              <p>
                {hub.location.street}, {hub.location.number}, {hub.location.city} - {hub.location.state}
                <br />
                CEP: {hub.location.cep}
              </p>
            </div>
            <div className="flex items-center text-gray-700 space-x-4">
              <span className="material-icons text-[#FF3700]">Detalhes</span>
              <p>{hub.details || "Descrição do hub não disponível."}</p>
            </div>
          </div>
        </div>

        {/* Lista de Restaurantes */}
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-8 mt-10 border border-gray-300">
          <h2 className="text-2xl font-semibold text-[#FF3700] mb-6">Estabelecimentos</h2>
          {vendors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {vendors.map((vendor) => (
                <div
                  key={vendor.id}
                  className="relative group border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={vendor.imagePath}
                    alt={vendor.name}
                    className="w-full h-48 object-cover rounded-lg mb-4 group-hover:opacity-90 transition-opacity duration-300"
                  />
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#FF3700] transition-colors duration-300">
                    {vendor.name}
                  </h3>
                  <p className="text-sm text-gray-600">{vendor.description}</p>
                  <Link href={`/client/hubs/${hubId}/vendors/${vendor.id}`}>
                    <button className="absolute top-2 right-2 bg-[#FF3700] text-white font-semibold px-4 py-2 rounded-full shadow-md hover:bg-[#FF7A55] transition-colors duration-300">
                      Ver detalhes
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-700">Nenhum estabelecimento encontrado para este hub.</p>
          )}
        </div>

        <Link href={`/client/hubs`} passHref>
          <button className="bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-600 mt-8 transition-colors">
            Voltar para os hubs
          </button>
        </Link>
      </div>

      <Footer />
    </main>
  );
}
