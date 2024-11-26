// src/app/(public)/hubs/[hubId]/page.tsx
import { Hub } from "@/ui/types/hub";
import { getHubs, getHubById } from "@/ui/utils/hubsFetcher";
import Link from "next/link";
import Script from 'next/script';
import Head from 'next/head';
import '@/ui/assets/css/geral/style-header-footer.css';
import '@/ui/assets/css/geral/style-body.css';
import '@/ui/assets/css/componentes/style-carousel.css';
// Preload and generate static paths for hubs
export async function generateStaticParams() {
  const hubs: Hub[] = await getHubs();
  return hubs.map((hub) => ({
    hubId: hub.id.toString(),
  }));
}

// Fetch data for a specific hub and generate metadata
export async function generateMetadata({ params }: { params: { hubId: string } }) {
  const hub = await getHubById(parseInt(params.hubId));
  return {
    title: `${hub?.name} - Details`,
  };
}

// HubDetailsPage component
export default async function HubDetailsPage({ params }: { params: { hubId: string } }) {
  const hubId = parseInt(params.hubId, 10); // Obtendo o ID do hub da URL
  const hub = await getHubById(hubId); // Buscando os dados do hub pelo ID

  if (!hub) {
    return <div>Hub não encontrado.</div>;
  }

  return (
    <main>
      <h1>{hub.name}</h1>
      <p><strong>Location:</strong> {hub.location.street}, {hub.location.city}, {hub.location.state}</p>
      <h2>Vendedores</h2>
      <ul>
        {hub.vendors.map((vendor) => (
          <li key={vendor.id}>
            <h3>{vendor.name}</h3>
            <p>{vendor.description}</p>
            <Link href={`/hubs/${hubId}/vendors/${vendor.id}`} passHref>
              <button>Ver detalhes do vendedor</button>
            </Link>
          </li>
        ))}
      </ul>
      <div>
      <div className="header container">

<div className="container">
    <div>
        <img src="../../../imagens/logoMenuSuperior.png" alt="" />
    </div>
    <div>
        <ul>
            <li><a href="../index.html">Início</a></li>
            <li><a href="../hubs.html">Hubs</a></li>
            <li><a href="../sobre.html">Sobre</a></li>
            <li><a href="../contatos.html">Contatos</a></li>
        </ul>
    </div>
</div>

<div className="user">
    <div className="loginIcons"><a href="contatos.html"><img src="../../../imagens/iconAlarm.png" alt="Notificações" /></a></div>
    <div className="loginIcons"><a href="carrinho.html"><img src="../../../imagens/iconCarrinho.png" alt="Carrinho" /></a></div>
    <div className="menu-container">
        <img src="../../../imagens/photoUser.png" alt="Foto de Perfil" className="menu-trigger" />
        <div className="menu" id="menu">
            <a href="../configuracoesCliente/perfilCliente.html">Perfil</a>
            <a href="../configuracoesCliente/pedidosCliente.html">Meus pedidos</a>
            <a href="../../areaNaoLogada/index.html">Sair</a>
        </div>
    </div>
    <span>João Domingus</span>
</div>

</div>

<div className="main">

<div className="empty"></div>

<div className="body-carousel">
    <h3>Fast-food</h3>
    <div className="owl-carousel" id="carousel1">
        <div>
            <a href="pagEstabelecimento.html"><img src="../../../imagens/iconBobs.png" alt="Bob's" /></a>
            <span>Bob's</span>
        </div>
        <div>
            <a href="pagEstabelecimento.html"><img src="../../../imagens/iconMcDonalds.png" alt="McDonald's" /></a>
            <span>McDonald's</span>
        </div>
        <div>
            <a href="pagEstabelecimento.html"><img src="../../../imagens/iconPitsBurger.png" alt="Pit's Burger" /></a>
            <span>Pit's Burger</span>
        </div>
        <div>
            <a href="pagEstabelecimento.html"><img src="../../../imagens/iconGiraffas.png" alt="Giraffa's" /></a>
            <span>Giraffa's</span>
        </div>
    </div>
    <div className="custom-nav">
        <button className="custom-prev" id="carousel1-prev">← </button>
        <button className="custom-next" id="carousel1-next"> →</button>
    </div>
</div>

<div className="body-carousel">
    <h3>Comidas regionais brasileiras</h3>
    <div className="owl-carousel" id="carousel2">
        <div>
            <a href="pagEstabelecimento.html"><img src="../../../imagens/iconBobs.png" alt="Bob's" /></a>
            <span>Bob's</span>
        </div>
    </div>
    <div className="custom-nav">
        <button className="custom-prev" id="carousel2-prev">← </button>
        <button className="custom-next" id="carousel2-next"> →</button>
    </div>
</div>
</div>

<div className="footer container">
<div className="logo">
    <img src="imagens/logoInferior.png" alt="" />
</div>

<div className="container">
    <div>
        <ul>
            <li className="footer-header">Links:</li>
            <li><img src="../../../imagens/logoInstagram.png" alt="" /><a href="https://www.instagram.com/"><span>Instagram</span></a></li>
            <li><img src="../../../imagens/logoPinterest.png" alt="" /><a href="https://br.pinterest.com/"><span>Pinterest</span></a></li>
        </ul>
    </div>
    <div>
        <ul>
            <li className="footer-header">Contatos:</li>
            <li><img src="../../../imagens/pinLocation.png" alt="" /><span>3º piso do Instituto Metrópole Digital</span></li>
            <li><img src="../../../imagens/pinPhone.png" alt="" /><span>(84) 9 8888-8888</span></li>
            <li><img src="../../../imagens/pinEmail.png" alt="" /><span>hubsfood@gmail.com</span></li>
            <li><img src="../../../imagens/pinHorario.png" alt="" /><span>24h</span></li>
        </ul>
    </div>
</div>
</div>

<div className="end">
<span>Copyright @ 2024 All rights reserved</span>
</div>

      </div>
    </main>
  );
}
