import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import '@/ui/assets/css/geral/style-header-footer.css';
import '@/ui/assets/css/geral/style-body.css';



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
      <div className="header container">
        <div className="container">
          <div>
            <Image src="/imagens/logoMenuSuperior.png" alt="Logo" width={100} height={50} />
          </div>
          <div>
            <ul>
              <li>
                <Link href="/index">Início</Link>
              </li>
              <li>
                <Link href="/hubs">Hubs</Link>
              </li>
              <li>
                <Link href="/sobre">Sobre</Link>
              </li>
              <li>
                <Link href="/contatos">Contatos</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="user">
          <button>Logar</button>
          <Image src="/imagens/User.png" alt="Foto de Perfil" width={50} height={50} />
        </div>
      </div>

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
      <div className="footer container">
        <div className="logo">
          <Image src="/imagens/logoInferior.png" alt="Logo Inferior" width={100} height={50} />
        </div>
        <div className="container">
          <div>
            <ul>
              <li className="footer-header">Links:</li>
              <li>
                <Image src="/imagens/logoInstagram.png" alt="Instagram" width={20} height={20} />
                <Link href="https://www.instagram.com/">
                  <span>Instagram</span>
                </Link>
              </li>
              <li>
                <Image src="/imagens/logoPinterest.png" alt="Pinterest" width={20} height={20} />
                <Link href="https://br.pinterest.com/">
                  <span>Pinterest</span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li className="footer-header">Contatos:</li>
              <li>
                <Image src="/imagens/pinLocation.png" alt="Localização" width={20} height={20} />
                <span>3º piso do Instituto Metrópole Digital</span>
              </li>
              <li>
                <Image src="/imagens/pinPhone.png" alt="Telefone" width={20} height={20} />
                <span>(84) 9 8888-8888</span>
              </li>
              <li>
                <Image src="/imagens/pinEmail.png" alt="Email" width={20} height={20} />
                <span>hubsfood@gmail.com</span>
              </li>
              <li>
                <Image src="/imagens/pinHorario.png" alt="Horário" width={20} height={20} />
                <span>24h</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* End */}
      <div className="end">
        <span>Copyright @ 2024 All rights reserved</span>
      </div>
    </>
  );
}
