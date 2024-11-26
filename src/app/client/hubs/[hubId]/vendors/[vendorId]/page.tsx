'use client';

import { useState, useEffect } from 'react';
import { Vendor } from "@/ui/types/vendor";
import { getVendorById } from "@/ui/utils/vendorsFetcher";
import { postOrder } from "@/services/orders/orderPOST";
import Link from "next/link";
import Script from 'next/script';
import Head from 'next/head';
import '@/ui/assets/css/geral/style-header-footer.css';
import '@/ui/assets/css/geral/style-body.css';
import '@/ui/assets/css/componentes/style-carousel.css';
// Página do Vendedor
export default function VendorPage({ params }: { params: Promise<{ hubId: string, vendorId: string }> }) {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [hubId, setHubId] = useState<number | null>(null);
  const [vendorId, setVendorId] = useState<number | null>(null);

  const clientId = 1; // Defina o clientId conforme necessário (Ex: usuário autenticado)

  useEffect(() => {
    // Função para pegar os parâmetros de maneira assíncrona
    const fetchParams = async () => {
      const resolvedParams = await params;
      setHubId(parseInt(resolvedParams.hubId, 10));
      setVendorId(parseInt(resolvedParams.vendorId, 10));
    };

    fetchParams();
  }, [params]);

  // Carregar o vendedor ao montar o componente
  useEffect(() => {
    if (vendorId !== null) {
      const fetchVendor = async () => {
        const fetchedVendor = await getVendorById(vendorId);
        setVendor(fetchedVendor);
      };

      fetchVendor();
    }
  }, [vendorId]);

  // Função para lidar com o pedido
  const handleOrder = async (productId: number) => {
    try {
      // Chamando a função de criar pedido
      const response = await postOrder(clientId, productId);
      alert('Pedido realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer pedido:', error);
      alert('Erro ao fazer o pedido.');
    }
  };

  if (hubId === null || vendorId === null || !vendor) {
    return <p>Carregando informações do vendedor...</p>;
  }

  return (
    <div>
      <h1>{vendor.name}</h1>
      <p>{vendor.description}</p>
      <h2>Produtos</h2>
      <ul>
        {vendor.products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong>: {product.description} - Preço: R${product.price}
            <Link href={`/client/hubs/${hubId}/vendors/${vendor.id}/product/${product.id}`} passHref>
              <button>Ver detalhes do produto</button>
            </Link>
            <button onClick={() => handleOrder(product.id)}>Fazer Pedido</button>
          </li>
        ))}
      </ul>
      <div>
      <div className="header container">
    <div className="container">
        <div>
            <img src="/imagens/logoMenuSuperior.png" alt="" />
        </div>
        <div>
            <ul>
                <li><a href="../indexLogado.html">Início</a></li>
                <li><a href="../hubsLogado.html">Hubs</a></li>
                <li><a href="../sobreLogado.html">Sobre</a></li>
                <li><a href="../contatosLogado.html">Contatos</a></li>
            </ul>
        </div>
    </div>
    <div className="user">
        <div className="loginIcons"><a href="#item2"><img src="/imagens/iconAlarm.png" alt="Notificações" /></a></div>
        <div className="loginIcons"><a href="carrinho.html"><img src="/imagens/iconCarrinho.png" alt="Carrinho" /></a></div>
        <div className="menu-container">
            <img src="/imagens/photoUser.png" alt="Foto de Perfil" className="menu-trigger" />
            <div className="menu" id="menu">
                <a href="../configuracoesCliente/perfilCliente.html">Perfil</a>
                <a href="../configuracoesCliente/pedidosCliente.html">Meus pedidos</a>
                <a href="../../areaNaoLogada/index.html">Sair</a>
            </div>
        </div>
        <span>João Domingus</span>
    </div>
</div>

<div className="main" style={{backgroundImage: 'none'}}>
    <div className="head_estabelecimento">
        <div className="head_estabLeft">
            <div>
                <img src="/imagens/iconBobs.png" alt="Perfil Bob's" />
            </div>
            <div>
                <ul>
                    <li>Hub:<span>Midway Mall</span></li>
                    <li>Telefone:<span>(84) 9 8888-8888</span></li>
                    <li>Horário de funcionamento:<span>10h às 22h</span></li>
                    <li>Aberto</li>
                </ul>
            </div>
        </div>
        <div className="faleLoja"><button>Chat</button></div>
    </div>
    <div className="empty"></div>
    <div className="body-carousel">
        <h3>Combo 1</h3>
        <div className="owl-carousel" id="carousel1">
            <div>
                <a href="pagProduto.html"><img src="/imagens/comboFood.png" alt="Comida 1" /></a>
                <span>Especial 1</span>
                <span className="preco">R$25,00 <span className="precoRiscado"></span></span>
            </div>
            <div>
                <a href="pagProduto.html"><img src="/imagens/comboFood.png" alt="Comida 2" /></a>
                <span>Especial 2</span>
                <span className="preco">R$28,00 <span className="precoRiscado">R$35,00</span></span>
            </div>
            <div>
                <a href="pagProduto.html"><img src="/imagens/comboFood.png" alt="Comida 3" /></a>
                <span>Especial 3</span>
                <span className="preco">R$30,00 <span className="precoRiscado">R$35,00</span></span>
            </div>
            <div>
                <a href="pagProduto.html"><img src="/imagens/comboFood.png" alt="Comida 4" /></a>
                <span>Especial 4</span>
                <span className="preco">R$40,00 <span className="precoRiscado"></span></span>
            </div>
        </div>
        <div className="custom-nav">
            <button className="custom-prev" id="carousel1-prev">←</button>
            <button className="custom-next" id="carousel1-next">→</button>
        </div>
    </div>
</div>

<div className="footer container">
    <div className="logo">
        <img src="/imagens/logoInferior.png" alt="" />
    </div>
    <div className="container">
        <div>
            <ul>
                <li className="footer-header">Links:</li>
                <li><img src="/imagens/logoInstagram.png" alt="" /><a href="https://www.instagram.com/"><span>Instagram</span></a></li>
                <li><img src="/imagens/logoPinterest.png" alt="" /><a href="https://br.pinterest.com/"><span>Pinterest</span></a></li>
            </ul>
        </div>
        <div>
            <ul>
                <li className="footer-header">Contatos:</li>
                <li><img src="/imagens/pinLocation.png" alt="" /><span>3º piso do Instituto Metrópole Digital</span></li>
                <li><img src="/imagens/pinPhone.png" alt="" /><span>(84) 9 8888-8888</span></li>
                <li><img src="/imagens/pinEmail.png" alt="" /><span>hubsfood@gmail.com</span></li>
                <li><img src="/imagens/pinHorario.png" alt="" /><span>24h</span></li>
            </ul>
        </div>
    </div>
</div>

<div className="end">
    <span>Copyright @ 2024 All rights reserved</span>
</div>

      </div>
    </div>
  );
}
