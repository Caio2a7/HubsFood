"use client";
import Head from "next/head";
import "@/ui/assets/css/geral/style-body.css";
import React, { useState, useEffect } from "react";
import BigCarousel from "@/ui/components/BigCarousel";
import Header from "@/ui/components/Header";
import Footer from "@/ui/components/Footer";
import { useRouter } from "next/navigation";
import { getHubs } from "@/services/hubs/hubGET";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filteredHubs, setFilteredHubs] = useState([]);
  const [hubs, setHubs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchHubs = async () => {
      const hubsData = await getHubs();
      setHubs(hubsData);
    };
    fetchHubs();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    if (debouncedSearch.trim() === "") {
      setFilteredHubs([]);
      return;
    }

    const results = hubs.filter((hub) =>
      hub.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    setFilteredHubs(results);
  }, [debouncedSearch, hubs]);

  const handleHubClick = (hub) => {
    router.push(`/hubs/${hub.id}`);
  };

  return (
    <>
      <Head>
        <title>HubsFood</title>
      </Head>

      <div className="bg-gray-100 min-h-screen flex flex-col">
        <Header />
        <main className="flex flex-col items-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="relative w-full max-w-4xl bg-white shadow-lg rounded-lg ps-0 p-6 mb-12">
          <div className="flex items-center gap-4 mb-4 ps-6">
            <img
              src="/imagens/pinLocation.png"
              alt="Pin de localização"
              className="w-8 h-8"
            />
            <span className="text-lg font-semibold text-[#FF3700]">
              Pesquise o seu hub aqui!
            </span>
          </div>
          <div className="relative ps-6">
            <input
              type="search"
              placeholder="Buscar hub..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF3700] focus:border-[#FF3700] w-full text-gray-700 placeholder-gray-400"
            />
            {/* <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#FF3700] text-white font-semibold px-4 py-2 rounded-full hover:bg-[#FF7A55] transition"
            >
              Buscar
            </button> */}
          </div>
          {filteredHubs.length > 0 && (
            <div className="absolute top-full mt-0 w-full bg-white border border-gray-300 shadow-xl rounded-lg max-h-60 overflow-y-auto z-50">
              {filteredHubs.map((hub) => (
                <div
                  key={hub.id}
                  onClick={() => handleHubClick(hub)}
                  className="px-4 py-3 hover:bg-[#FF3700] hover:text-white cursor-pointer transition text-gray-700"
                >
                  {hub.name}
                </div>
              ))}
            </div>
          )}
        </div>

          <div className="flex flex-col sm:flex-row bg-white shadow-lg rounded-lg p-8 mb-12 w-full max-w-4xl">
            <div className="flex-1 mb-6 sm:mb-0">
              <img
                src="/imagens/sobreNosDescricao.png"
                alt="3 imagens de restaurantes"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
            <div className="flex-1 pl-6">
              <h4 className="text-[#FF3700] font-semibold text-xl mb-2">
                Sobre nós...
              </h4>
              <h2 className="text-3xl font-bold text-[#FF3700] mb-4">
                O Seu Centralizador de Cardápios
              </h2>
              <p className="text-gray-700 leading-relaxed">
                O HubsFood centraliza os cardápios de praças de alimentação,
                permitindo que os clientes acessem menus e façam pedidos com
                facilidade, enquanto os restaurantes gerenciam tudo de forma
                simples e eficiente.
              </p>
            </div>
          </div>

          <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 mb-12">
            <h3 className="text-[#FF3700] font-semibold text-xl mb-3">
              Facilidade na sua Experiência
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Nosso objetivo é tornar sua experiência de pedido mais prática e
              eficiente. Com apenas alguns cliques, você pode acessar cardápios
              atualizados, fazer pedidos de forma direta e aproveitar um sistema
              ágil que beneficia tanto os clientes quanto os estabelecimentos.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              HubsFood não é apenas uma plataforma, é uma maneira de transformar
              a forma como você interage com a gastronomia local. Simplifique sua
              vida, encontre seus pratos favoritos e suporte os negócios locais
              com facilidade.
            </p>
          </div>

          <div className="w-full max-w-6xl mt-0 mb-20">
            <BigCarousel hubs={hubs} />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
