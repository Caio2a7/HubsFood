import { Hub } from "@/ui/types/hub";
import { getHubs } from "@/services/hubs/hubGET";
import Link from "next/link";
import React from "react";
import Carousel from "@/ui/components/Carousel";
import Head from "next/head";
import Header from "@/ui/components/Header";
import Footer from "@/ui/components/Footer";

// Gerando os parâmetros estáticos (SSG) com os IDs dos hubs
export const generateStaticParams = async () => {
  const hubs = await getHubs();
  return hubs.map((hub) => ({ id: hub.id.toString() }));
};

// Página de exibição dos hubs
export default async function HubsPage() {
  const hubs: Hub[] = await getHubs();
  return (
    <>
      <Head>
        <title>HubsFood</title>
      </Head>
      <div className="bg-gradient-to-b from-orange-50 to-gray-100 min-h-screen flex flex-col">
        <Header />
        <main className="flex flex-col items-center px-4 py-12 sm:px-6 lg:px-8">
          {/* Seção de busca */}
          <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mb-12 flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/imagens/pinLocation.png" alt="Pin de localização" className="w-8 h-8" />
              <span className="text-lg font-semibold text-[#FF3700]">Pesquise o seu hub aqui!</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4 sm:mt-0">
              <input
                type="search"
                placeholder="Buscar hub..."
                className="px-4 py-2 border border-[#FF7A55] rounded-lg focus:outline-none focus:border-[#FF3700] w-full sm:w-64"
              />
              <button className="bg-[#FF3700] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#FF7A55] transition mt-2 sm:mt-0">
                Buscar
              </button>
            </div>
          </div>

          {/* Novo card explicativo */}
          <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 mb-12">
            <h3 className="text-[#FF3700] font-semibold text-xl mb-3">Transformando Negócios Locais</h3>
            <p className="text-gray-700 leading-relaxed">
              Os hubs foram projetados para centralizar negócios de maneira prática e moderna. Através de QR codes estrategicamente posicionados em locais físicos, você pode acessar menus completos, realizar pedidos diretamente pelo site e explorar ofertas personalizadas.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Com HubsFood, restaurantes e estabelecimentos locais ganham visibilidade digital enquanto otimizam suas operações. Já os clientes desfrutam de uma experiência fluida e acessível. Tudo isso ao alcance de um clique ou scan.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Faça parte dessa revolução e descubra como os hubs podem simplificar e modernizar sua rotina gastronômica.
            </p>
          </div>

          {/* Carousel */}
          <div className="w-full max-w-6xl mt-0 mb-20">
            <Carousel hubs={hubs} />
          </div>
          {/* Lista de hubs */}
          <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {hubs.map((hub) => (
              <Link key={hub.id} href={`/hubs/${hub.id}`} className="no-underline text-black">
                <div className="border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h2 className="text-xl font-semibold text-[#FF3700]">{hub.name}</h2>
                  <p className="text-sm text-gray-700 mt-2">
                    {`${hub.location.street}, ${hub.location.city}, ${hub.location.state}, CEP: ${hub.location.zipCode}`}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
