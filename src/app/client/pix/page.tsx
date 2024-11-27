"use client";

import Header from "@/ui/components/Header";
import Footer from "@/ui/components/Footer";

export default function Pix() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto py-10 px-6">
        <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold text-[#FF7A55] mb-6">Pagamento via Pix</h1>
          <p className="text-lg text-gray-700 mb-4">
            Utilize o QR Code ou a chave Pix para realizar o pagamento.
          </p>

          {/* QR Code Section */}
          <div className="mb-6">
            <img
              src="/imagens/qrcode.png"
              alt="QR Code"
              className="w-56 h-56 object-cover rounded-lg shadow-md hover:shadow-lg transition"
            />
          </div>

          {/* Pix Key Section */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Chave Pix:</h2>
            <p className="text-lg font-medium text-gray-600 mb-4">
              estabelecimento@emailPIX.com
            </p>
            <p className="text-sm text-gray-500">
              Após o pagamento, aguarde um email de confirmação.
            </p>
          </div>

          {/* Botão para Voltar */}
          <button className="mt-8 bg-[#FF7A55] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#ff4f4f] transition">
            Voltar ao Início
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
