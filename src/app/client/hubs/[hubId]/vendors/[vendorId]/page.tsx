import { Vendor } from "@/ui/types/vendor";
import { getVendorById } from "@/services/vendors/vendorGET";
import { getProductById } from "@/services/products/productGET";
import Link from "next/link";

import Carousel from "@/ui/components/Carousel";
import BigCarousel from "@/ui/components/BigCarousel";
import Header from "@/ui/components/Header";
import Footer from "@/ui/components/Footer";
import Head from "next/head";

// Página do Vendedor
export default async function VendorPage({ params }: { params: { hubId: string; vendorId: string } }) {
  const hubId = parseInt(params.hubId, 10); // Obtendo o ID do Hub da URL
  const vendorId = parseInt(params.vendorId, 10); // Obtendo o ID do Vendedor da URL

  // Buscando o vendedor pelo ID
  const vendorArray = await getVendorById(vendorId);
  const vendor:Vendor = vendorArray && vendorArray.length > 0 ? vendorArray[0] : null;

  if (!vendor) {
    return <p>Vendedor não encontrado.</p>;
  }

  // Buscando os produtos do vendedor usando os IDs contidos em `vendor.products`
  const productPromises = vendor.products.map((productId: number) => getProductById(productId));
  const productsArray = await Promise.all(productPromises);
  console.log(productsArray)
  // Acessamos o primeiro item de cada array de produtos
  const products = productsArray.map((productArr: any) => productArr[0]);

  return (
    <>
      <Head>
        <title>{vendor.name} - HubsFood</title>
      </Head>
      <div className="bg-gradient-to-b from-orange-50 to-gray-100 min-h-screen flex flex-col">
        <Header />
        <header className="bg-[#f17575] text-white p-6">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
    {/* Esquerda: Imagem do Hub e informações */}
    <div className="flex items-center gap-4">
      {/* Imagem do Hub */}
      <img 
        src="/imagens/icon_midway.png" 
        alt="Imagem do Hub" 
        className="w-36 h-38  object-cover " 
      />
      {/* Informações do Hub */}
      <div>
        <h2 className="text-lg font-bold">Hub: Nome do Hub</h2>
        <p className="text-sm">Telefone: (84) 9 8888-8888</p>
        <p className="text-sm">Horário de funcionamento: 10h às 20h</p>
        <p className="text-sm font-semibold text-green-300">Aberto</p>
      </div>
    </div>

    {/* Direita: Botão de Chat */}
    <a
      href="https://wa.me/5584988888888" // Link para o WhatsApp do estabelecimento
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 md:mt-0 bg-white text-[#f17575] font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 transition"
    >
      Iniciar Chat
    </a>
  </div>
</header>


        <div className="w-full  mt-0 mb-20">
            <Carousel carouselTitle="Pizza" carouselLink={`/client/hubs/${hubId}/vendors/${vendorId}/product/`} hubs={products} />
          </div>
        <main className="px-4 py-12">

          {/* Produtos em carousel */}
          {products.length > 0 ? (
            <>
            </>
          ) : (
            <p className="text-gray-700">Não há produtos disponíveis para este vendedor.</p>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}
