import Head from 'next/head';
import React from "react";
import Header from "@/ui/components/Header";
import Footer from "@/ui/components/Footer";

export default function VendorPage() {
  return (
    <>
      <Head>
        <title>HubsFood - Vendedores</title>
      </Head>

      <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col">
        <Header />

        <main className="flex flex-col items-center px-4 py-12 sm:px-6 lg:px-8">
          {/* Título e descrição */}
          <div className="text-center max-w-3xl mb-12">
            <h1 className="text-4xl font-bold text-[#FF3700] mb-4">Bem-vindo ao Portal do Vendedor</h1>
            <p className="text-lg text-gray-300">
              Gerencie seus produtos, pedidos e conecte-se aos clientes de forma eficiente. Descubra como nossa plataforma pode ajudar você a aumentar suas vendas e simplificar o gerenciamento do seu negócio.
            </p>
          </div>

          {/* Como funciona a plataforma */}
          <section className="w-full max-w-5xl bg-gray-800 shadow-lg rounded-lg p-6 mb-12">
            <h2 className="text-2xl font-semibold text-[#FF3700] mb-4">Como funciona a plataforma?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-700 p-6 rounded-lg hover:shadow-xl transition duration-300">
                <h3 className="text-xl font-bold text-[#FF7A55] mb-2">1. Criação de Hubs</h3>
                <p className="text-gray-300">
                  Hubs são pontos de conexão que centralizam restaurantes em locais estratégicos. Você pode se cadastrar no hub mais próximo ou criar um hub personalizado.
                </p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg hover:shadow-xl transition duration-300">
                <h3 className="text-xl font-bold text-[#FF7A55] mb-2">2. Gerenciamento de Produtos</h3>
                <p className="text-gray-300">
                  Adicione seus produtos com descrições detalhadas, preços e imagens. Deixe tudo pronto para que os clientes escolham com facilidade.
                </p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg hover:shadow-xl transition duration-300">
                <h3 className="text-xl font-bold text-[#FF7A55] mb-2">3. Recebimento de Pedidos</h3>
                <p className="text-gray-300">
                  Monitore pedidos em tempo real e receba notificações para preparar e entregar no prazo. Tudo integrado diretamente na plataforma.
                </p>
              </div>
              <div className="bg-gray-700 p-6 rounded-lg hover:shadow-xl transition duration-300">
                <h3 className="text-xl font-bold text-[#FF7A55] mb-2">4. Relatórios e Estatísticas</h3>
                <p className="text-gray-300">
                  Acompanhe o desempenho do seu negócio com relatórios detalhados de vendas, produtos mais pedidos e métricas importantes.
                </p>
              </div>
            </div>
          </section>

          {/* Links úteis */}
          <section className="w-full max-w-4xl bg-gray-800 shadow-lg rounded-lg p-6 mb-12">
            <h2 className="text-2xl font-semibold text-[#FF3700] mb-4">Documentação e Links Úteis</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>
                <a href="/docs/guia-vendedores.pdf" className="text-[#FF7A55] hover:text-[#FF3700] transition">
                  Guia para Vendedores (PDF)
                </a>
              </li>
              <li>
                <a href="/docs/termos-condicoes.pdf" className="text-[#FF7A55] hover:text-[#FF3700] transition">
                  Termos e Condições
                </a>
              </li>
              <li>
                <a href="/docs/politica-privacidade.pdf" className="text-[#FF7A55] hover:text-[#FF3700] transition">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="/docs/faq.pdf" className="text-[#FF7A55] hover:text-[#FF3700] transition">
                  FAQ - Perguntas Frequentes
                </a>
              </li>
            </ul>
          </section>

          {/* Botões de navegação */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/vendor/menu"
              className="bg-[#FF3700] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#FF7A55] transition text-center w-full sm:w-auto"
            >
              Gerenciar Menu
            </a>
            <a
              href="/vendor/pedidos"
              className="bg-[#FF3700] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#FF7A55] transition text-center w-full sm:w-auto"
            >
              Ver Pedidos
            </a>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}