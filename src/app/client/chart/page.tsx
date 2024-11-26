import Link from "next/link";
import Script from 'next/script';
import Head from 'next/head';
import '@/ui/assets/css/geral/style-header-footer.css';
import '@/ui/assets/css/geral/style-body.css';
import '@/ui/assets/css/componentes/style-addItem.css';



export default function Chart() {
  return (
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
        <div className="loginIcons">
            <a href="carrinho.html"><img src="/imagens/iconCarrinho.png" alt="Carrinho" /></a>
        </div>
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
                <img src="/imagens/icon_midway.png" alt="Midway Mall" />
            </div>
            <div>
                <ul>
                    <li>Hub:<span>Midway Mall</span></li>
                    <li>Horário de funcionamento:<span>10h às 22h</span></li>
                    <li>Aberto</li>
                </ul>
            </div>
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
  );
}
