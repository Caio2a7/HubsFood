"use client"
import Head from 'next/head';
import '@/ui/assets/css/geral/style-body.css';
import React from "react";
import BigCarousel from "@/ui/components/BigCarousel";
import Header from "@/ui/components/Header";
import Footer from "@/ui/components/Footer";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { getHubByName } from '@/services/hubs/hubGET';

export default function HomePage() {
  const getHub = async (hubName:string) => {
    const hub = await getHubByName(hubName);
    console.log(hub)
    return hub
  }
  const router = useRouter();
  const handleSearch = async (hubName:string) => {
    const hub = await getHub(hubName)
    console.log(hub)
    router.push(`/hubs/${hub.id}`)
  }
  const hubsCard = [
    { name: "Midway Mall", imagePath: "/imagens/icon_midway.png" },
    { name: "Natal Shopping", imagePath: "/imagens/icon_natalShopping.png" },
    { name: "Partage Norte Shopping", imagePath: "/imagens/icon_partage.png" },
    { name: "Praia Shopping", imagePath: "/imagens/icon_praiaShopping.png" },
    { name: "Hub Extra", imagePath: "/imagens/icon_midway.png" },
    { name: "Hub Novo", imagePath: "/imagens/icon_natalShopping.png" },
    { name: "Outro Hub", imagePath: "/imagens/icon_partage.png" },
    { name: "Mais Hubs", imagePath: "/imagens/icon_praiaShopping.png" },
  ];
  const [search, setSearch] = useState("");
  return (
    <>
      <Head>
        <title>HubsFood</title>
      </Head>
      
      <div className="bg-gray-100 min-h-screen flex flex-col">
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
                value={search}
                onChange={(e) => {setSearch(e.target.value)}}
                className="px-4 py-2 border border-[#FF7A55] rounded-lg focus:outline-none focus:border-[#FF3700] w-full sm:w-64"
              />
              <button onClick={() => { handleSearch(search)  }} className="bg-[#FF3700] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#FF7A55] transition mt-2 sm:mt-0">
                Buscar
              </button>
            </div>
          </div>

          {/* Seção sobre nós */}
          <div className="flex flex-col sm:flex-row bg-white shadow-lg rounded-lg p-8 mb-12 w-full max-w-4xl">
            <div className="flex-1 mb-6 sm:mb-0">
              <img src="/imagens/sobreNosDescricao.png" alt="3 imagens de restaurantes" className="w-full h-auto rounded-lg shadow-md" />
            </div>
            <div className="flex-1 pl-6">
              <h4 className="text-[#FF3700] font-semibold text-xl mb-2">Sobre nós...</h4>
              <h2 className="text-3xl font-bold text-[#FF3700] mb-4">O Seu Centralizador de Cardápios</h2>
              <p className="text-gray-700 leading-relaxed">
                O HubsFood centraliza os cardápios de praças de alimentação, permitindo que os
                clientes acessem menus e façam pedidos com facilidade, enquanto os restaurantes
                gerenciam tudo de forma simples e eficiente.
              </p>
            </div>
          </div>

          {/* Novo card explicativo */}
          <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 mb-12">
            <h3 className="text-[#FF3700] font-semibold text-xl mb-3">Facilidade na sua Experiência</h3>
            <p className="text-gray-700 leading-relaxed">
              Nosso objetivo é tornar sua experiência de pedido mais prática e eficiente. Com apenas alguns cliques, você pode acessar cardápios atualizados, fazer pedidos de forma direta e aproveitar um sistema ágil que beneficia tanto os clientes quanto os estabelecimentos.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              HubsFood não é apenas uma plataforma, é uma maneira de transformar a forma como você interage com a gastronomia local. Simplifique sua vida, encontre seus pratos favoritos e suporte os negócios locais com facilidade.
            </p>
          </div>

          {/* Carousel */}
          <div className="w-full max-w-6xl mt-0 mb-20">
            <BigCarousel hubs={hubsCard} />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
