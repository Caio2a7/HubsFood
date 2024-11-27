import Head from 'next/head';
import Image from 'next/image';
import Header from "@/ui/components/Header";
import Footer from "@/ui/components/Footer";
import '@/ui/assets/css/geral/style-header-footer.css';
import '@/ui/assets/css/geral/style-body.css';

export default function Contacts() {
  return (
    <>
      <Head>
        <title>Contatos - HubsFood</title>
      </Head>
      <Header />

      {/* Main container */}
      <main className="bg-gray-100 from-white to-[#FFDED5] min-h-screen p-6">
        {/* Header section */}
        <section className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-[#F05033]">Contatos</h1>
          <p className="mt-2 text-lg text-[#FA6666]">Entre em contato com nossos escritórios para mais informações!</p>
        </section>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: 'Escritório Ponta Negra', location: 'Avenida das Nações, Ponta Negra, Natal - RN', email: 'ponta.negra@hubsfood.com', phone: '(84) 9 9999-9999' },
            { name: 'Escritório Capim Macio', location: 'Rua dos Eucaliptos, Capim Macio, Natal - RN', email: 'capim.macio@hubsfood.com', phone: '(84) 9 8888-8888' },
            { name: 'Escritório Petrópolis', location: 'Rua da Independência, Petrópolis, Natal - RN', email: 'petropolis@hubsfood.com', phone: '(84) 9 7777-7777' }
          ].map((office, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 transition transform hover:scale-105 hover:shadow-2xl border border-[#FF8C6D]">
              <h2 className="text-2xl font-semibold text-[#F05033] mb-4">{office.name}</h2>
              <p className="text-gray-600 mb-4">{office.location}</p>
              <div className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Image src="/imagens/pinEmail.png" alt="Email" width={24} height={24} className="mr-2" />
                    <span className="text-gray-800">{office.email}</span>
                  </li>
                  <li className="flex items-center">
                    <Image src="/imagens/pinPhone.png" alt="Phone" width={24} height={24} className="mr-2" />
                    <span className="text-gray-800">{office.phone}</span>
                  </li>
                </ul>
                <button className="w-full bg-[#F05033] text-white font-semibold py-2 rounded-lg hover:bg-[#FA6666] transition">
                  Visite nosso site
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Contact form */}
        <section className="mt-10 bg-white p-8 rounded-lg shadow-lg border border-[#FF8C6D] mb-20">
          <h2 className="text-3xl font-bold text-[#F05033] mb-4">Entre em contato conosco</h2>
          <p className="text-gray-700 mb-6">Preencha o formulário abaixo para dúvidas, sugestões ou mais informações.</p>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Seu nome"
              className="w-full p-3 border border-[#FF8C6D] rounded-lg focus:outline-none focus:border-[#F05033] transition"
            />
            <input
              type="email"
              placeholder="Seu email"
              className="w-full p-3 border border-[#FF8C6D] rounded-lg focus:outline-none focus:border-[#F05033] transition"
            />
            <textarea
              placeholder="Sua mensagem"
              className="w-full p-3 border border-[#FF8C6D] rounded-lg focus:outline-none focus:border-[#F05033] transition"
              rows={4}
            ></textarea>
            <button className="w-full px-20 bg-[#F05033] text-white font-semibold py-2 rounded-lg hover:bg-[#FA6666] transition">
              Enviar mensagem
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
}
