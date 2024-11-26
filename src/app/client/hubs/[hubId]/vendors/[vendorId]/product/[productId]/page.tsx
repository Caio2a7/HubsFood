"use client";

import { useState, useEffect } from "react";
import { getProductById } from "@/ui/utils/productFetcher";
import { Product } from "@/ui/types/product";
import { postOrder } from "@/services/orders/orderPOST";
import Link from "next/link";
import Script from 'next/script';
import Head from 'next/head';
import '@/ui/assets/css/geral/style-header-footer.css';
import '@/ui/assets/css/geral/style-body.css';
import '@/ui/assets/css/componentes/style-addItem.css';

export default function ProductDetailsPage({ params }: { params: Promise<{ hubId: string; vendorId: string; productId: string; clientId: string }> }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [orderStatus, setOrderStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const resolvedParams = await params;
      const productId = parseInt(resolvedParams.productId, 10);
      const clientId = parseInt(resolvedParams.clientId, 10);

      try {
        const fetchedProduct = await getProductById(productId);
        setProduct({ ...fetchedProduct, clientId }); // Inclui clientId se necessário
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  const handleOrder = async () => {
    if (!product) return;
    try {
      await postOrder(product.clientId, product.id);
      setOrderStatus("Pedido realizado com sucesso!");
    } catch (error) {
      setOrderStatus("Erro ao realizar o pedido.");
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!product) {
    return <div>Produto não encontrado.</div>;
  }

  return (
    <main>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p><strong>Preço:</strong> R${product.price}</p>
      <p><strong>Disponibilidade:</strong> {product.available ? 'Disponível' : 'Indisponível'}</p>
      
      {product.available && (
        <button onClick={handleOrder}>Fazer Pedido</button>
      )}
      
      {orderStatus && <p>{orderStatus}</p>}
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
    <div className="itemDescriptionContainer">
        <div className="itemDescription">
            <img src="/imagens/comboFood.png" alt="Combo 1" />
            <div>
                <ul>
                    <li className="itemTopico">Combo Especial 1</li>
                    <li><span>1 sanduíche de frango</span></li>
                    <li><span>1 Refil de coca</span></li>
                    <li><span>1 Batata Média</span></li>
                    <li><span>R$28,00</span></li>
                </ul>
            </div>
        </div>
        <div className="counter-container">
            <button id="decrementBtn" className="button decrement">-</button>
            <span id="itemCount" className="counter">0</span>
            <button id="incrementBtn" className="button increment">+</button>
        </div>
        <div><button id="addToCartBtn" className="button add-to-cart">Adicionar ao Carrinho</button></div>
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
    </main>
  );
}
