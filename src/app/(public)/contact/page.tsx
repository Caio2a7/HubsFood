import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import '@/ui/assets/css/geral/style-header-footer.css';
import '@/ui/assets/css/geral/style-body.css';
import Header from "@/ui/components/Header";
import Footer from "@/ui/components/Footer";


export default function Home() {
  const styles = {
    main: {
      backgroundImage: 'url("/imagens/fachadaContatos.png")',
      backgroundSize: 'cover', // Adiciona ajuste para preencher a área
      backgroundRepeat: 'no-repeat',
    },
    empty: {
      height: '360px',
    },
  };
  return (
    <>
      <Head>
        <title>Contatos</title>
      </Head>
      <Header />

      {/* Main */}
      <div className="main">
        <div className="empty"></div>
        <div className="external-contatos">
          {['Estabelecimento 1', 'Estabelecimento 2', 'Estabelecimento 3', 'Estabelecimento 4'].map(
            (estabelecimento, index) => (
              <div className="internal-contatos" key={index}>
                <h2>{estabelecimento}</h2>
                <div>
                  <ul>
                    <li>
                      <Image src="/imagens/pinEmail.png" alt="" width={20} height={20} />
                      <span>hubsfood@gmail.com</span>
                    </li>
                    <li>
                      <Image src="/imagens/pinPhone.png" alt="" width={20} height={20} />
                      <span>(84) 9 8888-8888</span>
                    </li>
                  </ul>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
